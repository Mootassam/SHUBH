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
    const { executionPrice } = req.body; // live market price when trigger hit

    if (!executionPrice) {
      return res.status(400).json({ errors: [{ message: 'executionPrice is required' }] });
    }

    const TradeOrderModel = TradeOrder(req.database);
    const order = await TradeOrderModel.findById(id);

    if (!order || String(order.tenant) !== String(currentTenant.id)) throw new Error404();
    if (order.status !== 'waiting') {
      return res.status(400).json({ errors: [{ message: `Cannot execute order with status: ${order.status}` }] });
    }

    // ── Balance check at execution time ─────────────────────────────────────
    const notional = executionPrice * order.lots * CONTRACT_SIZE;
    const margin   = notional / order.multiplier;
    const fee      = notional * 0.0001;

    const WalletModel = Wallet(req.database);
    const wallet = await WalletModel.findOne({
      user: currentUser.id, symbol: 'USDT', tenant: currentTenant.id, accountType: 'exchange',
    });

    if (!wallet || wallet.amount < margin) {
      // Cancel the order — insufficient balance at execution time
      await TradeOrderModel.updateOne(
        { _id: id },
        { $set: { status: 'cancelled', closeReason: 'cancelled', closeTime: new Date(), updatedBy: currentUser.id } }
      );
      return res.status(400).json({ errors: [{ message: 'Insufficient balance at execution time. Order cancelled.' }] });
    }

    // ── Execute: transition waiting → active ─────────────────────────────────
    await TradeOrderModel.updateOne(
      { _id: id, tenant: currentTenant.id, status: 'waiting' },
      {
        $set: {
          status:     'active',
          entryPrice: executionPrice,
          openTime:   new Date(),
          margin:     parseFloat(margin.toFixed(5)),
          fee:        parseFloat(fee.toFixed(5)),
          updatedBy:  currentUser.id,
        },
      }
    );

    const updated = await TradeOrderModel.findById(id);
    await ApiResponseHandler.success(req, res, updated);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
