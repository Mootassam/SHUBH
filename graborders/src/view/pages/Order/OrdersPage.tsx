import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import authSelectors from 'src/modules/auth/authSelectors';
import authAxios from 'src/modules/shared/axios/authAxios';
import { PairIcon, getPairInfo } from 'src/view/shared/pairConfig';
import { getTvWsUrl } from 'src/view/shared/wsUrl';

// ── Types ──────────────────────────────────────────────────────────────────

interface FuturesOrder {
  id: string;
  _id: string;
  coin: string;
  price: number;
  direction: 'buy' | 'sell';
  lots: number;
  multiplier: number;
  amount: number;
  tradeStatus: 'pending' | 'closed';
  closePrice?: number;
  pnl?: number;
  number: string;
  createdAt: string;
}

// ── WebSocket helpers ──────────────────────────────────────────────────────

const encode = (msg: string) => `~m~${msg.length}~m~${msg}`;

function parseWsMessages(data: string): string[] {
  const out: string[] = [];
  let buf = data;
  while (buf.length > 0) {
    if (!buf.startsWith('~m~')) break;
    const second = buf.indexOf('~m~', 3);
    const len = parseInt(buf.substring(3, second));
    out.push(buf.substring(second + 3, second + 3 + len));
    buf = buf.substring(second + 3 + len);
  }
  return out;
}

function extractSym(n: string): string {
  try { return JSON.parse(n.replace(/^=\{/, '{')).symbol ?? n; }
  catch { return n; }
}

// ── Formatting ─────────────────────────────────────────────────────────────

function fmtPrice(p: number | null | undefined): string {
  if (p == null) return '—';
  if (p >= 10000) return p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (p >= 100) return p.toFixed(2);
  if (p >= 10)  return p.toFixed(3);
  return p.toFixed(5);
}

function fmtPnl(pnl: number): string {
  return `${pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}`;
}

function fmtDate(iso: string): string {
  try {
    const d = new Date(iso);
    return `${d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } catch { return iso; }
}

function calcPnl(order: FuturesOrder, livePrice: number): number {
  const diff = order.direction === 'buy'
    ? livePrice - order.price
    : order.price - livePrice;
  return diff * order.lots * 100;
}

// ── Component ──────────────────────────────────────────────────────────────

const OrdersPage: React.FC = () => {
  const currentTenant = useSelector(authSelectors.selectCurrentTenant);

  const [activeTab, setActiveTab] = useState<'positions' | 'history'>('positions');
  const [orders, setOrders]       = useState<FuturesOrder[]>([]);
  const [loading, setLoading]     = useState(true);
  const [closingId, setClosingId] = useState<string | null>(null);
  const [historyOrder, setHistoryOrder] = useState<FuturesOrder | null>(null);

  // Live prices: symbol → mid price
  const [livePrices, setLivePrices] = useState<Record<string, number>>({});

  // WS refs
  const wsRef           = useRef<WebSocket | null>(null);
  const sessionRef      = useRef<string | null>(null);
  const subscribedRef   = useRef<Set<string>>(new Set());
  const reconnectRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Symbols we want live — updated whenever orders load
  const wantedSymsRef   = useRef<string[]>([]);

  // ── Fetch orders ────────────────────────────────────────────────────────

  const fetchOrders = useCallback(async () => {
    if (!currentTenant?.id) return;
    try {
      const { data } = await authAxios.get(`/tenant/${currentTenant.id}/futures-orders`);
      setOrders(data?.rows ?? []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [currentTenant]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  // ── Subscribe helper (safe to call anytime) ─────────────────────────────

  const subscribeSymbols = useCallback((syms: string[]) => {
    const ws      = wsRef.current;
    const session = sessionRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN || !session) return;
    syms.forEach(sym => {
      if (!subscribedRef.current.has(sym)) {
        ws.send(encode(JSON.stringify({ m: 'quote_add_symbols', p: [session, sym] })));
        subscribedRef.current.add(sym);
      }
    });
  }, []);

  // ── When orders change, update wanted symbols and try subscribing ────────

  useEffect(() => {
    const syms = [...new Set(orders.filter(o => o.tradeStatus === 'pending').map(o => o.coin))];
    wantedSymsRef.current = syms;
    subscribeSymbols(syms);
  }, [orders, subscribeSymbols]);

  // ── WebSocket ────────────────────────────────────────────────────────────

  const connectWs = useCallback(() => {
    if (wsRef.current) { wsRef.current.close(); wsRef.current = null; }

    const ws = new WebSocket(getTvWsUrl());
    wsRef.current = ws;

    ws.onopen = () => {
      const session = 'qs_' + Math.random().toString(36).substring(2, 12);
      sessionRef.current  = session;
      subscribedRef.current = new Set();

      ws.send(encode(JSON.stringify({ m: 'quote_create_session', p: [session] })));
      ws.send(encode(JSON.stringify({ m: 'quote_set_fields',     p: [session, 'lp', 'ask', 'bid'] })));

      // Subscribe to any symbols we already know about (orders loaded before WS opened)
      const syms = wantedSymsRef.current;
      syms.forEach(sym => {
        ws.send(encode(JSON.stringify({ m: 'quote_add_symbols', p: [session, sym] })));
        subscribedRef.current.add(sym);
      });
    };

    ws.onmessage = (event) => {
      const raw: string = event.data;
      if (raw.startsWith('~h~')) { ws.send(raw); return; }

      parseWsMessages(raw).forEach(msg => {
        try {
          const json = JSON.parse(msg);
          if (json.m !== 'qsd') return;
          const payload = json.p[1];
          const sym     = extractSym(payload.n);
          const v       = payload.v;
          if (!v) return;

          let price: number | null = null;
          if (typeof v.lp  === 'number' && v.lp  > 0) price = v.lp;
          else if (typeof v.ask === 'number' && typeof v.bid === 'number' && v.ask > 0)
            price = (v.ask + v.bid) / 2;

          if (price !== null) {
            setLivePrices(prev =>
              prev[sym] === price ? prev : { ...prev, [sym]: price }
            );
          }
        } catch { /* ignore malformed frames */ }
      });
    };

    ws.onclose = (e) => {
      if (!e.wasClean) {
        reconnectRef.current = setTimeout(connectWs, 3000);
      }
    };

    ws.onerror = () => {};
  }, []);  // stable — no deps that change

  useEffect(() => {
    connectWs();
    return () => {
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
      wsRef.current?.close();
    };
  }, [connectWs]);

  // ── Close position ───────────────────────────────────────────────────────

  const handleClose = useCallback(async (order: FuturesOrder) => {
    if (!currentTenant?.id) return;
    const livePrice = livePrices[order.coin];
    if (livePrice == null) return;

    const oid = order.id || order._id;
    setClosingId(oid);
    try {
      await authAxios.put(
        `/tenant/${currentTenant.id}/futures-orders/${oid}/close`,
        { closePrice: livePrice }
      );
      await fetchOrders();
    } catch {
      alert('Failed to close position. Please try again.');
    } finally {
      setClosingId(null);
    }
  }, [currentTenant, livePrices, fetchOrders]);

  // ── Derived data ─────────────────────────────────────────────────────────

  const pendingOrders = orders.filter(o => o.tradeStatus === 'pending');
  const closedOrders  = orders.filter(o => o.tradeStatus === 'closed');

  const totalPnl = pendingOrders.reduce((sum, o) => {
    const lp = livePrices[o.coin];
    return sum + (lp != null ? calcPnl(o, lp) : 0);
  }, 0);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{CSS}</style>
      <div className="op-page">

        {/* ── Header ── */}
        <div className="op-header">
          <div className="op-title">Orders</div>
        </div>

        {/* ── White content card ── */}
        <div className="op-card">

          {/* Tabs */}
          <div className="op-tabs">
            <button className={`op-tab ${activeTab === 'positions' ? 'active' : ''}`} onClick={() => setActiveTab('positions')}>
              Position Holding
            </button>
            <button className={`op-tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
              History
            </button>
          </div>

          {loading ? (
            /* Skeleton */
            <div className="op-skeleton-list">
              {[1, 2, 3].map(i => <div key={i} className="op-skeleton-row" />)}
            </div>

          ) : activeTab === 'positions' ? (
            <>
              {/* Floating P&L summary banner */}
              {pendingOrders.length > 0 && (
                <div className="op-summary">
                  <span className="op-summary-label">Floating P&amp;L</span>
                  <span className={`op-summary-val ${totalPnl >= 0 ? 'green' : 'red'}`}>
                    {fmtPnl(totalPnl)}
                  </span>
                </div>
              )}

              {pendingOrders.length === 0 ? (
                <div className="op-empty">No open positions</div>
              ) : pendingOrders.map(order => {
                const oid       = order.id || order._id;
                const lp        = livePrices[order.coin] ?? null;
                const pnl       = lp != null ? calcPnl(order, lp) : null;
                const isClosing = closingId === oid;
                const pair      = getPairInfo(order.coin) ?? { symbol: order.coin, name: order.coin };

                return (
                  <div key={oid} className="op-order-card">

                    {/* Top row: icon + symbol + direction/lots badges */}
                    <div className="op-order-top">
                      <div className="op-order-left">
                        <PairIcon pair={pair as any} size="sm" />
                        <span className="op-sym">{order.coin}</span>
                      </div>
                      <div className="op-badges">
                        <span className={`op-dir ${order.direction}`}>
                          {order.direction === 'buy' ? 'Buy' : 'Sell'}
                        </span>
                        <span className="op-lots">{order.lots} Lots</span>
                      </div>
                    </div>

                    {/* Price row: open → live */}
                    <div className="op-price-row">
                      <span className="op-open-price">{fmtPrice(order.price)}</span>
                      <span className="op-arrow">→</span>
                      {lp != null
                        ? <span className="op-live-price">{fmtPrice(lp)}</span>
                        : <span className="op-price-loading"><span className="op-dot-pulse" /></span>
                      }
                    </div>

                    {/* Bottom row: P&L + close button + date */}
                    <div className="op-order-footer">
                      <div className="op-footer-left">
                        <span className={`op-pnl ${pnl == null ? 'muted' : pnl >= 0 ? 'green' : 'red'}`}>
                          {pnl != null ? fmtPnl(pnl) : '—'}
                        </span>
                        <span className="op-date">{fmtDate(order.createdAt)}</span>
                      </div>
                      <button
                        className="op-close-btn"
                        onClick={() => handleClose(order)}
                        disabled={isClosing || lp == null}
                      >
                        {isClosing ? 'Closing…' : 'Close Position'}
                      </button>
                    </div>

                  </div>
                );
              })}
            </>

          ) : (
            /* ── History tab ── */
            closedOrders.length === 0 ? (
              <div className="op-empty">No closed orders yet</div>
            ) : closedOrders.map(order => {
              const oid  = order.id || order._id;
              const pnl  = order.pnl ?? 0;
              const pair = getPairInfo(order.coin) ?? { symbol: order.coin, name: order.coin };

              return (
                <div key={oid} className="op-history-card" onClick={() => setHistoryOrder(order)}>
                  <div className="op-order-top">
                    <div className="op-order-left">
                      <PairIcon pair={pair as any} size="sm" />
                      <span className="op-sym">{order.coin}</span>
                    </div>
                    <span className={`op-pnl ${pnl >= 0 ? 'green' : 'red'}`}>{fmtPnl(pnl)}</span>
                  </div>
                  <div className="op-price-row">
                    <span className="op-open-price">{fmtPrice(order.price)}</span>
                    <span className="op-arrow">→</span>
                    <span className="op-live-price">{fmtPrice(order.closePrice)}</span>
                  </div>
                  <div className="op-hist-meta">
                    <span className={`op-dir ${order.direction}`}>{order.direction === 'buy' ? 'Buy' : 'Sell'}</span>
                    <span>{order.lots} Lots</span>
                    <span>{fmtDate(order.createdAt)}</span>
                  </div>
                </div>
              );
            })
          )}

        </div>{/* /op-card */}
      </div>{/* /op-page */}

      {/* ── History detail bottom-sheet modal ── */}
      {historyOrder && (
        <>
          <div className="op-overlay" onClick={() => setHistoryOrder(null)} />
          <div className="op-detail-sheet">
            <div className="op-detail-handle" />
            <button className="op-detail-x" onClick={() => setHistoryOrder(null)}>✕</button>
            <div className="op-detail-heading">Order Details</div>

            {[
              ['Pair',        historyOrder.coin],
              ['Direction',   historyOrder.direction === 'buy' ? 'Buy' : 'Sell', historyOrder.direction],
              ['Lots',        String(historyOrder.lots)],
              ['Multiplier',  `${historyOrder.multiplier}×`],
              ['Open Price',  fmtPrice(historyOrder.price)],
              ['Close Price', fmtPrice(historyOrder.closePrice)],
              ['P&L',         fmtPnl(historyOrder.pnl ?? 0), (historyOrder.pnl ?? 0) >= 0 ? 'buy' : 'sell'],
              ['Order ID',    historyOrder.number],
              ['Date',        fmtDate(historyOrder.createdAt)],
            ].map(([label, value, cls]) => (
              <div key={label} className="op-detail-row">
                <span className="op-detail-label">{label}</span>
                <span className={`op-detail-val ${cls === 'buy' ? 'green' : cls === 'sell' ? 'red' : ''}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

// ── CSS ────────────────────────────────────────────────────────────────────

const CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f5f7fa;
  }

  .op-page {
    max-width: 400px;
    margin: 0 auto;
    min-height: 100vh;
    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
  }

  /* Header */
  .op-header {
    padding: 20px;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .op-title {
    color: white;
    font-size: 17px;
    font-weight: 600;
  }

  /* White card */
  .op-card {
    background: white;
    border-radius: 40px 40px 0 0;
    padding: 24px 16px 100px;
    min-height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  /* Tabs */
  .op-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 4px;
  }
  .op-tab {
    flex: 1;
    padding: 10px 0;
    border-radius: 20px;
    border: none;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    background: #f0f2f5;
    color: #555;
    transition: all 0.2s;
  }
  .op-tab.active {
    background: #106cf5;
    color: white;
    font-weight: 600;
  }

  /* Summary banner */
  .op-summary {
    background: #f0f6ff;
    border: 1px solid #cce0ff;
    border-radius: 12px;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .op-summary-label { font-size: 13px; color: #555; }
  .op-summary-val   { font-size: 20px; font-weight: 700; }

  /* Order card */
  .op-order-card {
    background: #f8f9fb;
    border: 1px solid #edeef1;
    border-radius: 12px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  /* History card */
  .op-history-card {
    background: #f8f9fb;
    border: 1px solid #edeef1;
    border-radius: 12px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s;
  }
  .op-history-card:hover { background: #f0f2f5; transform: translateY(-1px); }

  /* Top row */
  .op-order-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .op-order-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .op-sym {
    font-size: 15px;
    font-weight: 600;
    color: #1a1a1a;
  }

  /* Direction / lots badges */
  .op-badges { display: flex; align-items: center; gap: 6px; }
  .op-dir {
    font-size: 11px;
    font-weight: 600;
    padding: 3px 9px;
    border-radius: 8px;
  }
  .op-dir.buy  { background: rgba(40,162,40,0.12); color: #28a228; }
  .op-dir.sell { background: rgba(224,48,48,0.12);  color: #e03030; }
  .op-lots {
    font-size: 11px;
    color: #666;
    background: white;
    border: 1px solid #ddd;
    padding: 3px 8px;
    border-radius: 8px;
  }

  /* Price row */
  .op-price-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }
  .op-open-price  { color: #888; font-weight: 500; }
  .op-arrow       { color: #ccc; font-size: 13px; }
  .op-live-price  { color: #106cf5; font-weight: 600; }

  /* Pulsing loading dot while waiting for first WS tick */
  .op-price-loading { display: flex; align-items: center; }
  .op-dot-pulse {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #106cf5;
    animation: pulse 1.2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.25; transform: scale(0.8); }
    50%       { opacity: 1;    transform: scale(1.1); }
  }

  /* Footer row: P&L + date on left, close button on right */
  .op-order-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #f0f0f0;
    padding-top: 10px;
  }
  .op-footer-left {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .op-pnl {
    font-size: 22px;
    font-weight: 700;
    line-height: 1;
  }
  .op-pnl.muted { font-size: 18px; color: #bbb; }
  .op-date {
    font-size: 11px;
    color: #aaa;
    white-space: nowrap;
  }

  /* Close button */
  .op-close-btn {
    background: #106cf5;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
    white-space: nowrap;
  }
  .op-close-btn:disabled { opacity: 0.4; cursor: default; }
  .op-close-btn:hover:not(:disabled) { opacity: 0.85; }

  /* History meta row */
  .op-hist-meta {
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 12px;
    color: #888;
  }

  /* Colors */
  .green { color: #28a228; }
  .red   { color: #e03030; }

  /* Empty state */
  .op-empty {
    text-align: center;
    padding: 48px 0;
    color: #bbb;
    font-size: 14px;
  }

  /* Skeleton loader */
  .op-skeleton-list { display: flex; flex-direction: column; gap: 10px; }
  .op-skeleton-row {
    height: 110px;
    border-radius: 12px;
    background: linear-gradient(90deg, #f0f2f5 25%, #e5e8ec 50%, #f0f2f5 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite linear;
  }
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }

  /* Overlay */
  .op-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 200;
    animation: fadeIn 0.2s ease;
  }

  /* History detail bottom sheet */
  .op-detail-sheet {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 400px;
    background: white;
    border-radius: 24px 24px 0 0;
    padding: 20px 24px 44px;
    z-index: 201;
    animation: slideUp 0.3s ease;
    max-height: 80vh;
    overflow-y: auto;
  }
  .op-detail-handle {
    width: 40px; height: 4px;
    background: #ddd; border-radius: 2px;
    margin: 0 auto 18px;
  }
  .op-detail-x {
    position: absolute;
    top: 18px; right: 18px;
    background: none; border: none;
    font-size: 18px; color: #aaa; cursor: pointer;
  }
  .op-detail-x:hover { color: #106cf5; }
  .op-detail-heading {
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 16px;
  }
  .op-detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 11px 0;
    border-bottom: 1px solid #f4f4f4;
    font-size: 14px;
  }
  .op-detail-label { color: #888; }
  .op-detail-val   { font-weight: 600; color: #1a1a1a; }

  @keyframes fadeIn  { from { opacity: 0; }                        to { opacity: 1; } }
  @keyframes slideUp { from { transform: translate(-50%, 100%); }  to { transform: translate(-50%, 0); } }

  @media (min-width: 768px) { .op-card { border-radius: 30px 30px 0 0; } }
`;

export default OrdersPage;
