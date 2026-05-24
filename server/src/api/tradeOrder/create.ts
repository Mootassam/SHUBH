import ApiResponseHandler from '../apiResponseHandler';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import TradeOrder from '../../database/models/tradeOrder';
import Wallet from '../../database/models/wallet';

const CONTRACT_SIZE = 100;

export default async (req, res, next) => {
  try {
    const currentTenant = MongooseRepository.getCurrentTenant(req);
    const currentUser   = MongooseRepository.getCurrentUser(req);

    const {
      orderType,      // 'market' | 'pending'
      symbol,
      symbolName,
      direction,      // 'buy' | 'sell'
      lots,
      multiplier,
      entryPrice,     // market order open price
      targetPrice,    // pending order trigger price
      referencePrice, // live price at creation time (pending only)
      takeProfit,
      stopLoss,
    } = req.body;

    // ── Validation ──────────────────────────────────────────────────────────
    if (!orderType || !symbol || !direction || !lots || !multiplier) {
      return res.status(400).json({ errors: [{ message: 'Missing required fields' }] });
    }
    if (orderType === 'market' && !entryPrice) {
      return res.status(400).json({ errors: [{ message: 'entryPrice required for market orders' }] });
    }
    if (orderType === 'pending' && (!targetPrice || !referencePrice)) {
      return res.status(400).json({ errors: [{ message: 'targetPrice and referencePrice required for pending orders' }] });
    }

    const price       = orderType === 'market' ? entryPrice : referencePrice;
    const notional    = price * lots * CONTRACT_SIZE;
    const margin      = notional / multiplier;
    const fee         = notional * 0.0001;  // 0.01% of notional

    // ── Balance check ───────────────────────────────────────────────────────
    const WalletModel = Wallet(req.database);
    const wallet = await WalletModel.findOne({
      user:        currentUser.id,
      symbol:      'USDT',
      tenant:      currentTenant.id,
      accountType: 'exchange',
    });

    if (!wallet || wallet.amount < margin) {
      return res.status(400).json({
        errors: [{ message: `Insufficient balance. Required: $${margin.toFixed(2)}, Available: $${(wallet?.amount ?? 0).toFixed(2)}` }],
      });
    }

    // ── Build order ─────────────────────────────────────────────────────────
    const orderNumber = `TRD-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;
    const now         = new Date();

    const payload: any = {
      user:       currentUser.id,
      tenant:     currentTenant.id,
      orderType,
      symbol,
      symbolName: symbolName || symbol,
      direction,
      lots,
      multiplier,
      margin:     parseFloat(margin.toFixed(5)),
      fee:        parseFloat(fee.toFixed(5)),
      takeProfit: takeProfit || null,
      stopLoss:   stopLoss   || null,
      pnl:        0,
      orderNumber,
      createdBy:  currentUser.id,
      updatedBy:  currentUser.id,
    };

    if (orderType === 'market') {
      payload.status     = 'active';
      payload.entryPrice = entryPrice;
      payload.openTime   = now;
    } else {
      payload.status         = 'waiting';
      payload.targetPrice    = targetPrice;
      payload.referencePrice = referencePrice;
      payload.triggerAbove   = targetPrice > referencePrice;
    }

    const TradeOrderModel = TradeOrder(req.database);
    const [order] = await TradeOrderModel.create([payload]);

    await ApiResponseHandler.success(req, res, order);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
