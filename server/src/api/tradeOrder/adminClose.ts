import ApiResponseHandler from '../apiResponseHandler';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import TradeOrder from '../../database/models/tradeOrder';
import Wallet from '../../database/models/wallet';
import Error404 from '../../errors/Error404';

const CONTRACT_SIZE = 100;

export default async (req, res, next) => {
  try {
    const currentTenant = MongooseRepository.getCurrentTenant(req);

    const { id } = req.params;
    const { profitPercent, control } = req.body;

    if (profitPercent === undefined || profitPercent === null) {
      return res.status(400).json({ errors: [{ message: 'profitPercent is required' }] });
    }
    if (!control || !['profit', 'loss'].includes(control)) {
      return res.status(400).json({ errors: [{ message: 'control must be "profit" or "loss"' }] });
    }

    const pct = Math.max(0, Math.min(100, Number(profitPercent)));
    if (pct <= 0) {
      return res.status(400).json({ errors: [{ message: 'profitPercent must be greater than 0' }] });
    }

    const TradeOrderModel = TradeOrder(req.database);
    const order = await TradeOrderModel.findById(id);

    if (!order || String(order.tenant) !== String(currentTenant.id)) throw new Error404();
    if (order.status !== 'active') {
      return res.status(400).json({ errors: [{ message: `Cannot close order with status: ${order.status}` }] });
    }

    // ── Calculate P&L from margin percentage ─────────────────────────────
    const pnlAbs = parseFloat((order.margin * pct / 100).toFixed(5));
    const netPnl = control === 'profit' ? pnlAbs : -pnlAbs;

    // Derive a synthetic closePrice that is consistent with the netPnl
    // netPnl = (priceDiff * lots * CONTRACT_SIZE) - fee
    // priceDiff = (netPnl + fee) / (lots * CONTRACT_SIZE)
    const priceDiff = (netPnl + (order.fee || 0)) / ((order.lots || 1) * CONTRACT_SIZE);
    const rawClose  = order.direction === 'buy'
      ? (order.entryPrice || 0) + priceDiff
      : (order.entryPrice || 0) - priceDiff;
    const closePrice = parseFloat(rawClose.toFixed(5));

    // ── Update the trade order ────────────────────────────────────────────
    await TradeOrderModel.updateOne(
      { _id: id, tenant: currentTenant.id, status: 'active' },
      {
        $set: {
          status:      'closed',
          closePrice,
          closeReason: 'manual',
          closeTime:   new Date(),
          pnl:         netPnl,
        },
      }
    );

    // ── Update the trade owner's wallet ───────────────────────────────────
    if (netPnl !== 0) {
      const WalletModel = Wallet(req.database);
      await WalletModel.findOneAndUpdate(
        {
          user:        order.user,
          symbol:      'USDT',
          tenant:      currentTenant.id,
          accountType: 'exchange',
        },
        { $inc: { amount: netPnl } },
        { upsert: false }
      );
    }

    const updated = await TradeOrderModel.findById(id);
    await ApiResponseHandler.success(req, res, updated);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
