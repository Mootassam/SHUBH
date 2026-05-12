import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CoinSelectorSidebar from "src/view/shared/modals/CoinSelectorSidebar";
import FuturesModal from "src/shared/modal/FuturesModal";
import futuresListAction from "src/modules/futures/list/futuresListActions";
import futuresListSelectors from "src/modules/futures/list/futuresListSelectors";
import assetsListAction from "src/modules/assets/list/assetsListActions";
import selector from "src/modules/assets/list/assetsListSelectors";
import { i18n } from '../../../i18n';
import TradingViewChart from "../Market/TradingViewChart";
import authSelectors from "src/modules/auth/authSelectors";
import { getPairInfo, PairIcon } from "src/view/shared/pairConfig";
import { getTvWsUrl } from "src/view/shared/wsUrl";

// ----------------------------------------------------------------------
// Types & Helpers
// ----------------------------------------------------------------------
interface MarketData {
  symbol: string;
  ask: number;
  bid: number;
}


const availableCoins = [
  { symbol: "XAUUSD", name: "Gold" },
  { symbol: "EURUSD", name: "EUR / USD" },
  { symbol: "GBPUSD", name: "GBP / USD" },
  { symbol: "BTCUSD", name: "Bitcoin" },
  { symbol: "ETHUSD", name: "Ethereum" },
  { symbol: "XAGUSD", name: "Silver" },
  { symbol: "AUDUSD", name: "AUD / USD" },
  { symbol: "USDJPY", name: "USD / JPY" },
  { symbol: "NZDUSD", name: "NZD / USD" },
  { symbol: "USDCHF", name: "USD / CHF" },
  { symbol: "USDCAD", name: "USD / CAD" },
  { symbol: "LTCUSD", name: "Litecoin" },
  { symbol: "USOIL", name: "US Oil" },
  { symbol: "UKOIL", name: "UK Oil" },
  { symbol: "EURJPY", name: "EUR / JPY" },
  { symbol: "EURCHF", name: "EUR / CHF" },
  { symbol: "AUDNZD", name: "AUD / NZD" },
  { symbol: "GBPAUD", name: "GBP / AUD" },
  { symbol: "AUDJPY", name: "AUD / JPY" },
  { symbol: "EURNZD", name: "EUR / NZD" },
  { symbol: "CADJPY", name: "CAD / JPY" },
  { symbol: "NZDJPY", name: "NZD / JPY" },
  { symbol: "EURAUD", name: "EUR / AUD" },
  { symbol: "GBPJPY", name: "GBP / JPY" },
  { symbol: "EURCAD", name: "EUR / CAD" },
  { symbol: "GBPNZD", name: "GBP / NZD" },
  { symbol: "EURGBP", name: "EUR / GBP" },
  { symbol: "NAS100", name: "Nasdaq 100" },
  { symbol: "AUS200", name: "ASX 200" },
  { symbol: "ESP35", name: "IBEX 35" },
  { symbol: "FRA40", name: "CAC 40" },
  { symbol: "GER30", name: "DAX 30" },
  { symbol: "SPX500", name: "S&P 500" },
  { symbol: "US30", name: "Dow Jones 30" },
  { symbol: "UK100", name: "FTSE 100" },
  { symbol: "JPN225", name: "Nikkei 225" },
];

interface Order {
  id: number;
  pair: string;
  direction: string;
  status: string;
  investment: number;
  openPrice: number;
  openTime: string;
  leverage: number;
  pnl?: number;
  closePrice?: number;
  closeTime?: string;
  currentPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  orderType: string;
  margin: number;
  fee: number;
}

function Futures() {
  const dispatch = useDispatch();

  // Redux
  const listAssets = useSelector(selector.selectRows);
  const pendingList = useSelector(futuresListSelectors.pendingRows);
  const pendingCount = useSelector(futuresListSelectors.pendingcount);
  const pendingLoading = useSelector(futuresListSelectors.pendingLoading);
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  // ----- WebSocket real‑time data -----
  const wsRef = useRef<WebSocket | null>(null);
  const sessionRef = useRef<string | null>(null);
  const subscribedSymbolRef = useRef<string | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [markets, setMarkets] = useState<MarketData[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [priceChangePercent, setPriceChangePercent] = useState<number | null>(null);
  const initialPriceRef = useRef<{ [symbol: string]: number }>({});
  const highRef = useRef<{ [symbol: string]: number }>({});
  const lowRef = useRef<{ [symbol: string]: number }>({});

  // UI state
  const [selectedCoin, setSelectedCoin] = useState("EURUSD");
  const [activeInfoTab, setActiveInfoTab] = useState<"marketPrice" | "pendingOrders">("marketPrice"); // ✅ new tabs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tradeDirection, setTradeDirection] = useState<"up" | "down" | null>(null);
  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [USDBalance, setUSDBalance] = useState<number>(0);
  const [openingOrders, setOpeningOrders] = useState<any[]>([]);

  const [isDemoAccount, setIsDemoAccount] = useState<boolean>(false);

  // Trading form state – new
  const [multiplier, setMultiplier] = useState(100);
  const [useStopLoss, setUseStopLoss] = useState(false);
  const [stopLossValue, setStopLossValue] = useState(0);
  const [useTakeProfit, setUseTakeProfit] = useState(false);
  const [takeProfitValue, setTakeProfitValue] = useState(0);
  const [lots, setLots] = useState(0.01);

  // ----------------------------------------------------------------------
  // WebSocket and price logic (unchanged)
  // ----------------------------------------------------------------------
  const encode = useCallback((msg: string) => `~m~${msg.length}~m~${msg}`, []);
  const parseMessages = useCallback((data: string): string[] => {
    const result: string[] = [];
    let buffer = data;
    while (buffer.length > 0) {
      if (!buffer.startsWith("~m~")) break;
      const second = buffer.indexOf("~m~", 3);
      const length = parseInt(buffer.substring(3, second));
      const message = buffer.substr(second + 3, length);
      result.push(message);
      buffer = buffer.substr(second + 3 + length);
    }
    return result;
  }, []);

  const extractSymbol = useCallback((raw: string): string => {
    try {
      const cleaned = raw.replace(/^=\{/, "{");
      const obj = JSON.parse(cleaned);
      return obj.symbol || "UNKNOWN";
    } catch {
      return raw;
    }
  }, []);

  const subscribeToSymbol = useCallback((symbol: string) => {
    const ws = wsRef.current;
    const session = sessionRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN || !session) return;
    if (subscribedSymbolRef.current === symbol) return;
    if (subscribedSymbolRef.current) {
      ws.send(encode(JSON.stringify({ m: "quote_remove_symbols", p: [session, subscribedSymbolRef.current] })));
    }
    ws.send(encode(JSON.stringify({ m: "quote_add_symbols", p: [session, symbol] })));
    subscribedSymbolRef.current = symbol;
    setMarkets([]);
    setCurrentPrice(null);
    setPriceChangePercent(null);
    setIsLoading(true);
    delete highRef.current[symbol];
    delete lowRef.current[symbol];
    delete initialPriceRef.current[symbol];
  }, [encode]);

  const connectWebSocket = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    const ws = new WebSocket(getTvWsUrl());
    wsRef.current = ws;
    ws.onopen = () => {
      const session = "qs_" + Math.random().toString(36).substring(2, 12);
      sessionRef.current = session;
      ws.send(encode(JSON.stringify({ m: "quote_create_session", p: [session] })));
      ws.send(encode(JSON.stringify({ m: "quote_set_fields", p: [session, "ask", "bid"] })));
      const currentSymbol = selectedCoinRef.current;
      subscribeToSymbol(currentSymbol);
    };
    ws.onmessage = (event) => {
      const raw = event.data;
      if (raw.startsWith("~h~")) {
        ws.send(raw);
        return;
      }
      const messages = parseMessages(raw);
      messages.forEach((msg) => {
        try {
          const json = JSON.parse(msg);
          if (json.m === "qsd") {
            const payload = json.p[1];
            const symbol = extractSymbol(payload.n);
            const values = payload.v;
            if (!values) return;
            const market: MarketData = {
              symbol,
              ask: values.ask ?? 0,
              bid: values.bid ?? 0,
            };
            setMarkets((prev) => {
              const filtered = prev.filter((m) => m.symbol !== symbol);
              return [...filtered, market];
            });
          }
        } catch (err) { }
      });
    };
    ws.onclose = (event) => {
      subscribedSymbolRef.current = null;
      if (!event.wasClean) {
        reconnectTimeoutRef.current = setTimeout(() => connectWebSocket(), 3000);
      }
    };
    ws.onerror = (err) => console.error("WebSocket error:", err);
  }, [encode, parseMessages, extractSymbol, subscribeToSymbol]);

  const selectedCoinRef = useRef(selectedCoin);
  useEffect(() => { selectedCoinRef.current = selectedCoin; }, [selectedCoin]);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, [connectWebSocket]);

  useEffect(() => { subscribeToSymbol(selectedCoin); }, [selectedCoin, subscribeToSymbol]);

  useEffect(() => {
    const market = markets.find((m) => m.symbol === selectedCoin);
    if (!market || !market.ask || !market.bid) return;
    const midPrice = (market.ask + market.bid) / 2;
    setCurrentPrice(midPrice);
    setIsLoading(false);
    if (initialPriceRef.current[selectedCoin] === undefined) {
      initialPriceRef.current[selectedCoin] = midPrice;
      setPriceChangePercent(0);
    } else {
      const initial = initialPriceRef.current[selectedCoin];
      const change = ((midPrice - initial) / initial) * 100;
      setPriceChangePercent(change);
    }
    if (!highRef.current[selectedCoin] || midPrice > highRef.current[selectedCoin])
      highRef.current[selectedCoin] = midPrice;
    if (!lowRef.current[selectedCoin] || midPrice < lowRef.current[selectedCoin])
      lowRef.current[selectedCoin] = midPrice;
  }, [markets, selectedCoin]);

  // Balance
  const calculateBalances = useCallback(() => {
    if (listAssets?.length > 0) {
      const USDAsset = listAssets.find((asset: any) => asset.symbol === 'USDT');
      setUSDBalance(USDAsset?.amount || 0);
    }
  }, [listAssets]);
  useEffect(() => { calculateBalances(); }, [calculateBalances]);

  // Fetch pending orders on mount
  useEffect(() => {
    dispatch(futuresListAction.doFetchPending());
    dispatch(assetsListAction.doFetch());
  }, [dispatch]);

  // Formatting helpers
  const formatNumber = useCallback((num: any, decimals?: number): string => {
    if (num === null || num === undefined) return "0.00";
    const numValue = typeof num === "string" ? parseFloat(num) : num;
    if (isNaN(numValue)) return "0.00";
    return numValue.toFixed(decimals ?? 5);
  }, []);

  const formatDateTime = useCallback((dateString: string): string => {
    if (!dateString) return i18n('pages.assetsDetail.status.pending');
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      const now = new Date();
      const isToday = date.toDateString() === now.toDateString();
      if (isToday) {
        return i18n('pages.history.dateFormats.today', date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      }
      return i18n('pages.history.dateFormats.yesterday', date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    } catch (error) {
      return dateString;
    }
  }, []);

  const formatDateTimeDetailed = useCallback((dateString: string): string => {
    if (!dateString) return i18n('pages.assetsDetail.status.pending');
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return `${date.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" })} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`;
    } catch (error) {
      return dateString;
    }
  }, []);

  const safeToFixed = useCallback((value: any, decimals: number = 2): string => {
    if (value === null || value === undefined) return "0.00";
    const num = typeof value === "string" ? parseFloat(value) : value;
    return isNaN(num) ? "0.00" : num.toFixed(decimals);
  }, []);


  // Modal handlers
  const handleOpenCoinModal = () => setIsCoinModalOpen(true);
  const handleCloseCoinModal = () => setIsCoinModalOpen(false);
  const handleSelectCoin = (coin: string) => {
    setSelectedCoin(coin);
    setIsCoinModalOpen(false);
  };

  const handleOpenModal = (direction: "up" | "down") => {
    dispatch(assetsListAction.doFetch());
    setTradeDirection(direction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTradeDirection(null);
  };

  const handleOpenOrderModal = (order: any) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };
  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedOrder(null);
  };

  // Derived values
  const displayName = useMemo(() => {
    const coin = availableCoins.find(c => c.symbol === selectedCoin);
    return coin?.name || selectedCoin.replace(/(.{3})(.{3})/, "$1 / $2");
  }, [selectedCoin]);

  const currentPair = useMemo(
    () => getPairInfo(selectedCoin) || { symbol: selectedCoin, name: displayName },
    [selectedCoin, displayName]
  );

  const high = highRef.current[selectedCoin] ?? (currentPrice ?? 0);
  const low = lowRef.current[selectedCoin] ?? (currentPrice ?? 0);

  // ----- New trading form helpers -----
  const stepStopLoss = (delta: number) => {
    if (!useStopLoss) return;
    setStopLossValue(prev => Math.max(0, +(prev + delta).toFixed(5)));
  };
  const stepTakeProfit = (delta: number) => {
    if (!useTakeProfit) return;
    setTakeProfitValue(prev => Math.max(0, +(prev + delta).toFixed(5)));
  };
  const stepLots = (delta: number) => {
    setLots(prev => Math.max(0.01, +(prev + delta).toFixed(2)));
  };

  // Mock info data (replace with real calculations later)
  const eachLotValue = useMemo(() => {
    const price = currentPrice ?? 0;
    return `1 Lots = ${(100 * price).toFixed(2)} ${selectedCoin.replace(/(.{3})/, '$1')}`;
  }, [currentPrice, selectedCoin]);

  const handlingFee = "0.000012";
  const estimatedMargin = useMemo(() => {
    const price = currentPrice ?? 0;
    return ((lots * 100 * price) / multiplier).toFixed(6);
  }, [lots, currentPrice, multiplier]);

  return (
    <div className="container">
      {/* Header – transparent, inheriting the gradient from the container */}
      <div className="header">
        <div className="header-top">
          <div className="market-info">
            <PairIcon pair={currentPair} size="md" />
            <div className="market-name">{displayName}</div>
            <div
              className="market-change"
              style={{ color: (priceChangePercent ?? 0) < 0 ? '#ff4d4d' : '#36f936' }}
            >
              {currentPrice !== null ? (
                `${(priceChangePercent ?? 0) > 0 ? '+' : ''}${(priceChangePercent ?? 0).toFixed(2)}%`
              ) : (
                <div className="loading-placeholder" style={{ width: '50px', height: '16px' }} />
              )}
            </div>
          </div>
          <div className="additional-actions" onClick={handleOpenCoinModal}>
            <i className="fas fa-filter" />
          </div>
        </div>
        <div
          className="market-price"
          style={{ color: (priceChangePercent ?? 0) < 0 ? '#ff4d4d' : '#36f936' }}
        >
          {currentPrice !== null ? (
            `$${formatNumber(currentPrice)}`
          ) : (
            <div className="loading-placeholder" style={{ width: '120px', height: '28px' }} />
          )}
        </div>
        <div className="market-stats">
          <span>
            {i18n('pages.marketDetail.stats.high')}:{' '}
            {currentPrice !== null ? `$${formatNumber(high)}` : <div className="loading-placeholder" style={{ width: '80px', height: '12px' }} />}
          </span>
          <span>
            {i18n('pages.marketDetail.stats.low')}:{' '}
            {currentPrice !== null ? `$${formatNumber(low)}` : <div className="loading-placeholder" style={{ width: '80px', height: '12px' }} />}
          </span>
        </div>
      </div>

      {/* White content card */}
      <div className="content-card">
        <TradingViewChart key={selectedCoin} symbol={selectedCoin} height={400} />

        {/* ✅ New pill-shaped tabs */}
        <div className="pill-tabs">
          <div
            className={`pill-tab ${activeInfoTab === "marketPrice" ? "active" : ""}`}
            onClick={() => setActiveInfoTab("marketPrice")}
          >
            Market Price
          </div>
          <div
            className={`pill-tab ${activeInfoTab === "pendingOrders" ? "active" : ""}`}
            onClick={() => setActiveInfoTab("pendingOrders")}
          >
            Pending Orders
          </div>
        </div>

        {/* ✅ Content based on active tab */}
        {activeInfoTab === "marketPrice" ? (
          <>
            {/* Trading Form */}
            <div className="trading-form">
              {/* Multiplier row */}
              <div className="form-row">
                <span className="form-label">Multiplier</span>
                <div className="multiplier-input">
                  <input
                    type="number"
                    className="multiplier-value"
                    value={multiplier}
                    onChange={(e) => setMultiplier(Math.max(1, +e.target.value))}
                  />
                  <i className="fas fa-chevron-right arrow-icon"></i>
                </div>
              </div>

              {/* Set Loss row */}
              <div className="form-row">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={useStopLoss}
                    onChange={(e) => setUseStopLoss(e.target.checked)}
                    className="form-checkbox"
                  />
                </div>
                <span className="form-label">Set Loss</span>
                <div className="stepper">
                  <button
                    className="step-btn"
                    onClick={() => stepStopLoss(-0.00001)}
                    disabled={!useStopLoss}
                  >
                    −
                  </button>
                  <span className="step-value">{stopLossValue.toFixed(5)}</span>
                  <button
                    className="step-btn"
                    onClick={() => stepStopLoss(0.00001)}
                    disabled={!useStopLoss}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Take Profit row */}
              <div className="form-row">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={useTakeProfit}
                    onChange={(e) => setUseTakeProfit(e.target.checked)}
                    className="form-checkbox"
                  />
                </div>
                <span className="form-label">Take Profit</span>
                <div className="stepper">
                  <button
                    className="step-btn"
                    onClick={() => stepTakeProfit(-0.00001)}
                    disabled={!useTakeProfit}
                  >
                    −
                  </button>
                  <span className="step-value">{takeProfitValue.toFixed(5)}</span>
                  <button
                    className="step-btn"
                    onClick={() => stepTakeProfit(0.00001)}
                    disabled={!useTakeProfit}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Lots (Step:0.01) row */}
              <div className="form-row">
                <span className="form-label">Lots (Step:0.01)</span>
                <div className="stepper">
                  <button className="step-btn" onClick={() => stepLots(-0.01)}>−</button>
                  <span className="step-value">{lots.toFixed(2)}</span>
                  <button className="step-btn" onClick={() => stepLots(0.01)}>+</button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="form-divider"></div>

            {/* Information section */}
            <div className="info-section">
              <div className="info-row">
                <span className="info-label">Each Lots</span>
                <span className="info-value">{eachLotValue}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Estimated Handling Fee</span>
                <span className="info-value">{handlingFee}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Estimated Margin</span>
                <span className="info-value">{estimatedMargin}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Balance</span>
                <span className="info-value">{USDBalance.toFixed(2)}</span>
              </div>
            </div>

            {/* Keep the action buttons (buy up/down) as they launch the modal */}
            <div className="future-action-buttons">
              <button className="action-button buy-button" >
                {i18n('pages.futures.actions.buyUp')}
              </button>
              <button className="action-button sell-button" >
                {i18n('pages.futures.actions.buyDown')}
              </button>
            </div>
          </>
        ) : (
          /* Pending Orders list – simplified version */
          <div className="pending-orders-container">
            {pendingLoading ? (
              <div className="loading-placeholder" style={{ height: '200px' }} />
            ) : pendingList && pendingList.length > 0 ? (
              pendingList.map((order: any) => (
                <div
                  key={order.id}
                  className="order-card"
                  onClick={() => handleOpenOrderModal(order)}
                >
                  <div className="order-header">
                    <span className="order-pair">{order.symbol || order.pair}</span>
                    <span className={`order-direction ${order.futuresStatus === "long" || order.direction === "BUY UP" ? "buy" : "sell"}`}>
                      {order.futuresStatus === "long"
                        ? i18n('pages.futures.actions.buyUp')
                        : order.futuresStatus === "short"
                          ? i18n('pages.futures.actions.buyDown')
                          : order.direction}
                    </span>
                  </div>
                  <div className="order-status open">● Open</div>
                  <div className="order-details">
                    <div className="order-row">
                      <span className="order-label">Amount</span>
                      <span className="order-value">{order.futuresAmount || order.investment} USD</span>
                    </div>
                    <div className="order-row">
                      <span className="order-label">Open Price</span>
                      <span className="order-value">{order.openPositionPrice || order.openPrice}</span>
                    </div>
                    <div className="order-row">
                      <span className="order-label">Leverage</span>
                      <span className="order-value">{order.leverage}X</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-orders">
                <i className="fas fa-inbox"></i>
                No pending orders
              </div>
            )}
          </div>
        )}

        {/* Order detail modal (unchanged) */}
        {isOrderModalOpen && selectedOrder && (
          <OrderDetailModal
            selectedOrder={selectedOrder}
            onClose={handleCloseOrderModal}
            formatDateTimeDetailed={formatDateTimeDetailed}
            safeToFixed={safeToFixed}
          />
        )}
      </div>

      <FuturesModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        direction={tradeDirection}
        dispatch={dispatch}
        listAssets={listAssets}
        selectedCoin={selectedCoin}
        marketPrice={currentPrice?.toString() ?? "0"}
        availableBalance={USDBalance}
        setOpeningOrders={setOpeningOrders}
        isDemoAccount={isDemoAccount}
      />

      <CoinSelectorSidebar
        isOpen={isCoinModalOpen}
        onClose={handleCloseCoinModal}
        selectedCoin={selectedCoin}
        onCoinSelect={handleSelectCoin}
        availableCoins={availableCoins.map(c => ({ symbol: c.symbol, name: c.name }))}
        title={i18n('pages.marketDetail.coinSelector.title')}
      />

      {/* CSS – updated with new styles */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          position: relative;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex;
          flex-direction: column;
        }

        .header {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          min-height: 60px;
          padding: 20px;
          position: sticky;
          top: 0;
          z-index: 100;
          color: white;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .market-info {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
        }

        .market-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          overflow: hidden;
          background: rgba(255,255,255,0.2);
          flex-shrink: 0;
        }

        .market-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .market-name {
          font-weight: 600;
          font-size: 17px;
          white-space: nowrap;
        }

        .market-change {
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
          margin-left: 8px;
        }

        .additional-actions {
          color: rgba(255,255,255,0.8);
          font-size: 20px;
          cursor: pointer;
          padding: 4px;
        }

        .additional-actions:hover {
          color: white;
        }

        .market-price {
          font-size: 24px;
          font-weight: 700;
          margin: 8px 0 4px;
          color: white;
        }

        .market-stats {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: rgba(255,255,255,0.7);
          flex-wrap: wrap;
          gap: 8px;
        }

        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 30px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* ✅ Pill-shaped tabs */
        .pill-tabs {
          display: flex;
          gap: 8px;
          margin-top: 0;
          padding: 0;
        }

        .pill-tab {
          flex: 1;
          text-align: center;
          padding: 10px 0;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          background: #f0f2f5;
          color: #555;
          transition: all 0.2s;
        }

        .pill-tab.active {
          background: #106cf5;
          color: white;
          font-weight: 600;
        }

        /* ✅ Trading form */
        .trading-form {
          background: white;
          border-radius: 12px;
          padding: 0 4px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .form-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
        }

        .form-label {
          flex: 0 0 100px;
          color: #555;
          font-weight: 500;
        }

        .multiplier-input {
          display: flex;
          align-items: center;
          flex: 1;
          background: #f0f2f5;
          border-radius: 8px;
          padding: 6px 10px;
        }

        .multiplier-value {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          text-align: center;
          outline: none;
        }

        .arrow-icon {
          color: #aaa;
          font-size: 12px;
          margin-left: 4px;
        }

        .checkbox-container {
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .form-checkbox {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .stepper {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-left: auto;
        }

        .step-btn {
          width: 28px;
          height: 28px;
          border: 1px solid #ddd;
          background: #f8f9fb;
          border-radius: 6px;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #333;
          transition: all 0.2s;
        }

        .step-btn:hover:not(:disabled) {
          background: #e6efff;
        }

        .step-btn:disabled {
          opacity: 0.4;
          cursor: default;
        }

        .step-value {
          min-width: 50px;
          text-align: center;
          font-weight: 600;
          color: #1a1a1a;
          font-size: 14px;
        }

        .form-divider {
          height: 1px;
          background: #edeef1;
          margin: 4px 0;
        }

        /* Info section */
        .info-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
        }

        .info-label {
          color: #777;
        }

        .info-value {
          color: #1a1a1a;
          font-weight: 500;
        }

        .future-action-buttons {
          display: flex;
          gap: 12px;
          margin: 6px 0 0;
        }

        .action-button {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .buy-button { background: #36f936; color: white; }
        .sell-button { background: #ff4d4d; color: white; }

        .action-button:hover { opacity: 0.9; }

        /* Pending orders list */
        .pending-orders-container {
          margin-top: 4px;
        }

        .order-card {
          background: #f8f9fb;
          border: 1px solid #edeef1;
          border-radius: 8px;
          padding: 14px;
          margin-bottom: 8px;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
        }
        .order-card:hover {
          background: #f0f2f5;
          transform: translateY(-1px);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .order-pair {
          font-weight: 600;
          color: #1a1a1a;
          font-size: 15px;
        }

        .order-direction {
          font-size: 11px;
          padding: 3px 8px;
          border-radius: 4px;
          font-weight: 600;
        }
        .order-direction.buy { background: rgba(54,249,54,0.15); color: #36f936; }
        .order-direction.sell { background: rgba(255,77,77,0.15); color: #ff4d4d; }

        .order-status.open { color: #36f936; font-size: 12px; margin-bottom: 8px; }

        .order-details { border-top: 1px solid #edeef1; padding-top: 10px; }

        .order-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
          font-size: 13px;
        }

        .order-label { color: #777; }
        .order-value { font-weight: 500; color: #1a1a1a; }

        .no-orders {
          text-align: center;
          padding: 30px 0;
          color: #999;
        }

        /* Loading placeholder */
        .loading-placeholder {
          animation: shimmer 1.4s infinite linear;
          background: linear-gradient(90deg, #f0f2f5 25%, #e5e8ec 50%, #f0f2f5 75%);
          background-size: 200% 100%;
          border-radius: 4px;
          display: inline-block;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* Modals – dark style kept for contrast */
        .modal-overlays {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: #1c1c1c;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          border: 1px solid #2a2a2a;
          color: #ffffff;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #2a2a2a;
        }

        .modal-header h2 { font-size: 18px; font-weight: 600; }

        .modal-close {
          background: none; border: none; color: #aaa; font-size: 20px; cursor: pointer;
        }

        .modal-close:hover { color: #36f936; }

        .modal-body { padding: 20px; }

        .modal-footer {
          display: flex; justify-content: flex-end; padding: 20px; border-top: 1px solid #2a2a2a;
          gap: 10px;
        }

        .modal-button {
          background: #2a2a2a; color: white; border: none; border-radius: 6px; padding: 10px 20px;
          cursor: pointer; font-weight: 600;
        }

        .modal-button:hover { background: #106cf5; }

        .close-order-button {
          background: #ff4d4d; color: white; border: none; border-radius: 6px; padding: 10px 20px;
          cursor: pointer; font-weight: 600;
        }

        .close-order-button:hover { background: #ff3333; }

        .order-detail-section { margin-bottom: 20px; }

        .order-detail-section h3 {
          font-size: 14px; color: #aaaaaa; margin-bottom: 12px; text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-header {
          display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;
        }

        .detail-pair { font-weight: 600; font-size: 18px; color: #ffffff; }

        .detail-direction {
          font-size: 14px; padding: 4px 8px; border-radius: 4px; font-weight: 600;
        }

        .detail-direction.buy { background: rgba(54,249,54,0.15); color: #36f936; }
        .detail-direction.sell { background: rgba(255,77,77,0.15); color: #ff4d4d; }

        .detail-status { font-size: 14px; margin-bottom: 15px; }
        .detail-status.open { color: #36f936; }
        .detail-status.closed { color: #999; }

        .detail-row {
          display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px;
        }

        .detail-label { color: #aaaaaa; }
        .detail-value { font-weight: 500; color: #ffffff; }
        .detail-value.profit { color: #36f936; }
        .detail-value.loss { color: #ff4d4d; }

        /* Responsive */
        @media (max-width: 380px) {
          .header { padding: 16px; min-height: 50px; }
          .content-card { padding: 25px 16px 100px; }
        }
        @media (min-width: 768px) {
          .content-card { border-radius: 30px 30px 0 0; }
        }
      `}</style>
    </div>
  );
}

// ---------- OrderDetailModal (unchanged) ----------
const OrderDetailModal = ({
  selectedOrder,
  onClose,
  formatDateTimeDetailed,
  safeToFixed
}: any) => (
  <div className="modal-overlays" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h2>{i18n('pages.futures.orderDetails.title')}</h2>
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times" />
        </button>
      </div>
      <div className="modal-body">
        <div className="order-detail-section">
          <div className="detail-header">
            <span className="detail-pair">{selectedOrder.symbol || selectedOrder.pair}</span>
            <span className={`detail-direction ${selectedOrder.futuresStatus === "long" || selectedOrder.direction === "BUY UP" ? "buy" : "sell"}`}>
              {selectedOrder.futuresStatus === "long"
                ? i18n('pages.futures.actions.buyUp')
                : selectedOrder.futuresStatus === "short"
                  ? i18n('pages.futures.actions.buyDown')
                  : selectedOrder.direction}
            </span>
          </div>
          <div className={`detail-status ${selectedOrder.finalized ? "closed" : "open"}`}>
            ● {selectedOrder.finalized ? i18n('pages.futures.orderDetails.closed') : i18n('pages.futures.orderDetails.open')}
          </div>
        </div>
        <div className="order-detail-section">
          <OrderDetailRow label={i18n('pages.futures.orderDetails.futuresAmount')} value={`${selectedOrder.futuresAmount || selectedOrder.investment} USD`} />
          {selectedOrder.contractDuration && (
            <OrderDetailRow label={i18n('pages.futures.orderDetails.contractDuration')} value={`${selectedOrder.contractDuration} ${i18n('pages.futures.orderDetails.seconds')}`} />
          )}
          <OrderDetailRow label={i18n('pages.futures.orderDetails.futuresStatus')} value={selectedOrder.closePositionTime ? i18n('pages.futures.orderDetails.completed') : i18n('pages.futures.orderDetails.open')} />
          <OrderDetailRow label={i18n('pages.futures.orderDetails.openPositionPrice')} value={selectedOrder.openPositionPrice || selectedOrder.openPrice} />
          <OrderDetailRow label={i18n('pages.futures.orderDetails.openPositionTime')} value={formatDateTimeDetailed(selectedOrder.openPositionTime || selectedOrder.openTime)} />
          {selectedOrder.closePositionPrice && <OrderDetailRow label={i18n('pages.futures.orderDetails.closePositionPrice')} value={selectedOrder.closePositionPrice} />}
          {selectedOrder.closePositionTime && <OrderDetailRow label={i18n('pages.futures.orderDetails.closePositionTime')} value={formatDateTimeDetailed(selectedOrder.closePositionTime)} />}
          <OrderDetailRow label={i18n('pages.futures.orderDetails.profitLossAmount')} value={(selectedOrder.profitAndLossAmount || selectedOrder.pnl) ? `${safeToFixed(selectedOrder.profitAndLossAmount || selectedOrder.pnl, 2)} USD` : "__"} className={selectedOrder.control === "profit" ? "profit" : "loss"} />
          <OrderDetailRow label={i18n('pages.futures.orderDetails.leverage')} value={`${selectedOrder.leverage}X`} />
        </div>
      </div>
      <div className="modal-footer">
        <button className="modal-button" onClick={onClose}>{i18n('pages.futures.orderDetails.done')}</button>
      </div>
    </div>
  </div>
);

const OrderDetailRow = ({ label, value, className = "" }: any) => (
  <div className="detail-row">
    <span className="detail-label">{label}</span>
    <span className={`detail-value ${className}`}>{value}</span>
  </div>
);

export default Futures;