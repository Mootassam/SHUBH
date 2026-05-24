import ApiResponseHandler from '../apiResponseHandler';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import TradeOrder from '../../database/models/tradeOrder';
import Wallet from '../../database/models/wallet';
import Error404 from '../../errors/Error404';

const CONTRACT_SIZE = 100;

export default async (req, res, next) => {
  try {
    const currentTenant = MongooseRepository.getCurrentTenant(req);
    const currentUser   = MongooseRepository.getCurrentUser(req);

    const { id } = req.params;
    const { closePrice, closeReason = 'manual' } = req.body;

    if (!closePrice) {
      return res.status(400).json({ errors: [{ message: 'closePrice is required' }] });
    }

    const TradeOrderModel = TradeOrder(req.database);
    const order = await TradeOrderModel.findById(id);

    if (!order || String(order.tenant) !== String(currentTenant.id)) throw new Error404();
    if (order.status !== 'active') {
      return res.status(400).json({ errors: [{ message: `Cannot close order with status: ${order.status}` }] });
    }

    // ── P&L calculation ─────────────────────────────────────────────────────
    const priceDiff = order.direction === 'buy'
      ? closePrice - order.entryPrice
      : order.entryPrice - closePrice;

    const grossPnl = priceDiff * order.lots * CONTRACT_SIZE;
    const netPnl   = parseFloat((grossPnl - order.fee).toFixed(5));

    // ── Update order ────────────────────────────────────────────────────────
    await TradeOrderModel.updateOne(
      { _id: id, tenant: currentTenant.id, status: 'active' },
      {
        $set: {
          status:      'closed',
          closePrice,
          closeReason,
          closeTime:   new Date(),
          pnl:         netPnl,
          updatedBy:   currentUser.id,
        },
      }
    );

    // ── Update wallet (credit/debit P&L) ────────────────────────────────────
    const WalletModel = Wallet(req.database);
    await WalletModel.findOneAndUpdate(
      { user: currentUser.id, symbol: 'USDT', tenant: currentTenant.id, accountType: 'exchange' },
      { $inc: { amount: netPnl } },
      { upsert: false }
    );

    const updated = await TradeOrderModel.findById(id);
    await ApiResponseHandler.success(req, res, updated);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
