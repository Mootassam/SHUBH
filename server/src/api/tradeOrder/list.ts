import ApiResponseHandler from '../apiResponseHandler';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import TradeOrder from '../../database/models/tradeOrder';
import Wallet from '../../database/models/wallet';

export default async (req, res, next) => {
  try {
    const currentTenant = MongooseRepository.getCurrentTenant(req);
    const currentUser   = MongooseRepository.getCurrentUser(req);

    const { status, orderType } = req.query;

    const TradeOrderModel = TradeOrder(req.database);
    const WalletModel     = Wallet(req.database);

    // ── Lazy finalization: transition expired 'closing' orders → 'closed' ──
    // This runs on every list fetch so no background job is needed.
    const expired = await TradeOrderModel.find({
      tenant:          currentTenant.id,
      user:            currentUser.id,
      status:          'closing',
      closeScheduledAt: { $lte: new Date() },
    });

    for (const order of expired) {
      await TradeOrderModel.updateOne(
        { _id: order._id },
        { $set: { status: 'closed', closeTime: new Date() } }
      );
      const estMargin = (order as any).estimatedMargin ?? (order as any).margin ?? 0;
      const netPnl    = (order as any).pnl || 0;
      await WalletModel.findOneAndUpdate(
        { user: currentUser.id, symbol: 'USDT', tenant: currentTenant.id, accountType: 'exchange' },
        { $inc: { amount: estMargin + netPnl } },
        { upsert: false }
      );
    }
    // ─────────────────────────────────────────────────────────────────────

    const filter: any = {
      tenant: currentTenant.id,
      user:   currentUser.id,
    };

    if (status)    filter.status    = status;
    if (orderType) filter.orderType = orderType;

    const rows = await TradeOrderModel
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(500);

    await ApiResponseHandler.success(req, res, { rows, count: rows.length });
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
