import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authSelectors from 'src/modules/auth/authSelectors';
import assetsListActions from 'src/modules/assets/list/assetsListActions';
import assetsListSelectors from 'src/modules/assets/list/assetsListSelectors';
import authAxios from 'src/modules/shared/axios/authAxios';
import { PAIRS, getPairInfo, PairIcon } from 'src/view/shared/pairConfig';
import { getTvWsUrl } from 'src/view/shared/wsUrl';
import CustomTradingChart, { PriceInjection } from 'src/view/pages/Market/CustomTradingChart';
import useSymbolInjections from 'src/view/shared/useSymbolInjections';
import { getLanguageCode, setLanguageCode } from '../../../i18n';
import PcAuthModal from './PcAuthModal';
import PcProfileModal from './PcProfileModal';
import { PC_CSS } from './pcStyles';

const CONTRACT_SIZE = 100;

interface MarketData { symbol: string; ask: number; bid: number; lp?: number; chp?: number; }

function fmtChp(v: number | null | undefined): string {
  if (v == null) return '—';
  return `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`;
}

function fmtPrice(p: number | null): string {
  if (p == null) return '—';
  if (p >= 10000) return p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (p >= 100)   return p.toFixed(2);
  if (p >= 10)    return p.toFixed(3);
  return p.toFixed(5);
}

export default function PcTrading() {
  const dispatch      = useDispatch();
  const currentUser   = useSelector(authSelectors.selectCurrentUser);
  const currentTenant = useSelector(authSelectors.selectCurrentTenant);
  const listAssets    = useSelector(assetsListSelectors.selectRows);

  // ── UI state ────────────────────────────────────────────────────────────
  const [selectedCoin, setSelectedCoin] = useState('XAUUSD');
  const [search, setSearch]   = useState('');
  const [filter, setFilter]   = useState('All');
  const [authModal, setAuthModal]       = useState<null | 'login' | 'register'>(null);
  const [profileOpen, setProfileOpen]   = useState(false);
  const [lang, setLang] = useState(getLanguageCode());

  // ── Trade form ──────────────────────────────────────────────────────────
  const [multiplier, setMultiplier]       = useState(100);
  const [lots, setLots]                   = useState(0.01);
  const [useStopLoss, setUseStopLoss]     = useState(false);
  const [stopLossValue, setStopLossValue] = useState(0);
  const [useTakeProfit, setUseTakeProfit] = useState(false);
  const [takeProfitValue, setTakeProfitValue] = useState(0);
  const [confirm, setConfirm] = useState<null | 'buy' | 'sell'>(null);
  const [placing, setPlacing] = useState(false);
  const [toast, setToast]     = useState<string | null>(null);

  // ── Prices via WebSocket (all pairs for the list + selected) ─────────────
  const [markets, setMarkets] = useState<Record<string, MarketData>>({});
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const encode = (m: string) => `~m~${m.length}~m~${m}`;
  const parseMsgs = (data: string): string[] => {
    const out: string[] = []; let buf = data;
    while (buf.length > 0) {
      if (!buf.startsWith('~m~')) break;
      const second = buf.indexOf('~m~', 3);
      const len = parseInt(buf.substring(3, second));
      out.push(buf.substring(second + 3, second + 3 + len));
      buf = buf.substring(second + 3 + len);
    }
    return out;
  };
  const extractSym = (raw: string): string => {
    try { return JSON.parse(raw.replace(/^=\{/, '{')).symbol || raw; } catch { return raw; }
  };

  const connectWs = useCallback(() => {
    if (wsRef.current) { wsRef.current.close(); wsRef.current = null; }
    const ws = new WebSocket(getTvWsUrl());
    wsRef.current = ws;
    ws.onopen = () => {
      const session = 'qs_' + Math.random().toString(36).substring(2, 12);
      ws.send(encode(JSON.stringify({ m: 'quote_create_session', p: [session] })));
      ws.send(encode(JSON.stringify({ m: 'quote_set_fields', p: [session, 'lp', 'ask', 'bid', 'chp'] })));
      ws.send(encode(JSON.stringify({ m: 'quote_add_symbols', p: [session, ...PAIRS.map(p => p.symbol)] })));
    };
    ws.onmessage = (event) => {
      const raw: string = event.data;
      if (raw.startsWith('~h~')) { ws.send(raw); return; }
      parseMsgs(raw).forEach(msg => {
        try {
          const json = JSON.parse(msg);
          if (json.m !== 'qsd') return;
          const payload = json.p[1];
          const sym = extractSym(payload.n);
          const v = payload.v;
          if (!v) return;
          setMarkets(prev => {
            const ex = prev[sym] || { symbol: sym, ask: 0, bid: 0 };
            const next: MarketData = {
              symbol: sym,
              ask: v.ask ?? ex.ask,
              bid: v.bid ?? ex.bid,
              lp:  typeof v.lp === 'number' ? v.lp : ex.lp,
              chp: typeof v.chp === 'number' ? v.chp : ex.chp,
            };
            if (ex.ask === next.ask && ex.bid === next.bid && ex.lp === next.lp && ex.chp === next.chp) return prev;
            return { ...prev, [sym]: next };
          });
        } catch { /* ignore */ }
      });
    };
    ws.onclose = (e) => { if (!e.wasClean) reconnectRef.current = setTimeout(connectWs, 3000); };
    ws.onerror = () => {};
  }, []);

  useEffect(() => {
    connectWs();
    return () => { if (reconnectRef.current) clearTimeout(reconnectRef.current); wsRef.current?.close(); };
  }, [connectWs]);

  // ── Global injections (shared with all users / visitors) ─────────────────
  const symbolInjections = useSymbolInjections();
  const serverInj = symbolInjections[selectedCoin];

  // Live price of selected coin (prefer last-price, fall back to mid)
  const realPrice = useMemo(() => {
    const m = markets[selectedCoin];
    if (!m) return null;
    if (m.lp && m.lp > 0) return m.lp;
    if (m.ask && m.bid) return (m.ask + m.bid) / 2;
    return null;
  }, [markets, selectedCoin]);

  // Full-height chart sizing
  const [chartHeight, setChartHeight] = useState(() =>
    typeof window !== 'undefined' ? Math.max(360, window.innerHeight - 60 - 88) : 480
  );
  useEffect(() => {
    const onResize = () => setChartHeight(Math.max(360, window.innerHeight - 60 - 88));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const livePriceRef = useRef<number | null>(null);
  useEffect(() => { livePriceRef.current = realPrice; }, [realPrice]);

  const priceInjection: PriceInjection | null = useMemo(() => {
    if (!serverInj) return null;
    return {
      symbol: serverInj.symbol, entryPrice: serverInj.entryPrice, targetPrice: serverInj.targetPrice,
      startedAt: serverInj.startedAt, durationMs: serverInj.durationMs, seed: serverInj.seed,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverInj?.symbol, serverInj?.startedAt, serverInj?.targetPrice, serverInj?.durationMs, serverInj?.entryPrice, serverInj?.seed]);

  // ── Balance ──────────────────────────────────────────────────────────────
  const [USDBalance, setUSDBalance] = useState(0);
  useEffect(() => {
    if (currentUser) dispatch(assetsListActions.doFetch());
  }, [dispatch, currentUser]);
  useEffect(() => {
    const usdt = listAssets?.find((a: any) => a.symbol === 'USDT');
    setUSDBalance(usdt?.amount || 0);
  }, [listAssets]);

  // ── Derived ────────────────────────────────────────────────────────────
  const currentPair = getPairInfo(selectedCoin) || { symbol: selectedCoin, name: selectedCoin } as any;
  const displayPrice = serverInj
    ? (livePriceRef.current ?? serverInj.targetPrice) // chart shows animation; header roughly tracks
    : realPrice;

  const estimatedMargin = useMemo(() => {
    const price = realPrice ?? 0;
    const leverage = multiplier / 100;
    const margin = (price * 100 * lots) / leverage;
    return margin;
  }, [realPrice, lots, multiplier]);

  const marginStr = estimatedMargin >= 100 ? estimatedMargin.toFixed(3) : estimatedMargin.toFixed(5);
  const insufficient = currentUser ? USDBalance < estimatedMargin && estimatedMargin > 0 : false;

  // ── Market list (filtered) ───────────────────────────────────────────────
  const filtered = useMemo(() => {
    return PAIRS.filter(p => {
      if (search && !(`${p.symbol} ${p.name}`.toLowerCase().includes(search.toLowerCase()))) return false;
      if (filter === 'All') return true;
      if (filter === 'Forex')   return !!p.baseFlag && !p.badgeColor && !/OIL|100|200|225|30|35|40|500|SPX|NAS|US30/.test(p.symbol);
      if (filter === 'Crypto')  return !!p.badgeColor && /BTC|ETH|LTC/.test(p.symbol);
      if (filter === 'Metals')  return /XAU|XAG/.test(p.symbol);
      if (filter === 'Indices') return /100|200|225|30|35|40|500|SPX|NAS|US30/.test(p.symbol);
      return true;
    });
  }, [search, filter]);

  // ── Order placement (reuses the trade-orders endpoint) ───────────────────
  const openConfirm = (dir: 'buy' | 'sell') => {
    if (!currentUser) { setAuthModal('login'); return; }
    setConfirm(dir);
  };

  const placeOrder = async () => {
    if (!confirm || !currentTenant?.id || realPrice == null) return;
    setPlacing(true);
    try {
      await authAxios.post(`/tenant/${currentTenant.id}/trade-orders`, {
        orderType:  'market',
        symbol:     selectedCoin,
        symbolName: currentPair.name,
        direction:  confirm,
        lots,
        multiplier,
        entryPrice: realPrice,
        takeProfit: useTakeProfit ? takeProfitValue : null,
        stopLoss:   useStopLoss ? stopLossValue : null,
      });
      setUSDBalance(prev => Math.max(0, prev - estimatedMargin));
      dispatch(assetsListActions.doFetch());
      setConfirm(null);
      setToast(`${confirm === 'buy' ? 'Buy' : 'Sell'} order placed on ${selectedCoin}`);
      setTimeout(() => setToast(null), 3500);
    } catch (e: any) {
      alert(e?.response?.data?.errors?.[0]?.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  const changeLang = (code: string) => { setLang(code); setLanguageCode(code); };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="pc-root">
      <style>{PC_CSS}</style>

      {/* ===== HEADER ===== */}
      <header className="pc-header">
        <div className="pc-header-left">
<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAyIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMjAyIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNTIuMjc0NyAzMC4xNTMzVjExLjE5NTZINTUuODYxNVYxMi44NjMyQzU2LjQ3MyAxMS44MDcxIDU4LjAwMTkgMTAuODg5OCA2MC4wNTk4IDEwLjg4OThDNjQuMDYyOSAxMC44ODk4IDY2LjM3MDMgMTMuOTQ3NSA2Ni4zNzAzIDE4LjAwNUM2Ni4zNzAzIDIyLjE0NyA2My43ODUzIDI1LjIwNDcgNTkuOTIxIDI1LjIwNDdDNTguMDMgMjUuMjA0NyA1Ni42NCAyNC40NTQzIDU1Ljk3NDEgMjMuNTM3VjMwLjE1MzNINTIuMjc0N1pNNTkuMzM1NiAxNC4xOTlDNTcuNDQ0NiAxNC4xOTkgNTUuOTE1OCAxNS42MTcyIDU1LjkxNTggMTguMDM1MkM1NS45MTU4IDIwLjQ1MzIgNTcuNDQ0NiAyMS44OTk1IDU5LjMzNTYgMjEuODk5NUM2MS4yMjY1IDIxLjg5OTUgNjIuNzI3MiAyMC40ODEzIDYyLjcyNzIgMTguMDM1MkM2Mi43MjcyIDE1LjYxNTIgNjEuMjI2NSAxNC4xOTkgNTkuMzM1NiAxNC4xOTlaTTgwLjg0IDIwLjk1NDFDODAuMTQ2IDIzLjMxNTggNzcuOTc3NSAyNS4yOTEyIDc0LjYxNCAyNS4yOTEyQzcwLjg2MjMgMjUuMjkxMiA2Ny41NTMxIDIyLjU5NTYgNjcuNTUzMSAxNy45ODA5QzY3LjU1MzEgMTMuNjE3NiA3MC43Nzc4IDEwLjc4MTIgNzQuMjgwMSAxMC43ODEyQzc4LjUwNDUgMTAuNzgxMiA4MS4wMzUyIDEzLjQ3NjggODEuMDM1MiAxNy44NzAyQzgxLjAzNTIgMTguMzk3MyA4MC45Nzg4IDE4Ljk1NDUgODAuOTc4OCAxOS4wMDg4SDcxLjE5NDJDNzEuMjc2NyAyMC44MTUzIDcyLjgwNTUgMjIuMTIyOCA3NC42NDAyIDIyLjEyMjhDNzYuMzY0MSAyMi4xMjI4IDc3LjMwOTYgMjEuMjYxOSA3Ny43NTQyIDIwLjAzODhMODAuODQgMjAuOTU0MVpNNzcuMzk0MSAxNi40NzgyQzc3LjMzNzggMTUuMTE2MyA3Ni40NDg2IDEzLjc4MjYgNzQuMzM2NCAxMy43ODI2QzcyLjQxNzMgMTMuNzgyNiA3MS4zNjEyIDE1LjIyODkgNzEuMjc4NyAxNi40NzgySDc3LjM5NDFaTTgyLjQwNTEgMzAuMTUzM1YxMS4xOTU2SDg1Ljk5MTlWMTIuODYzMkM4Ni42MDM0IDExLjgwNzEgODguMTMyMiAxMC44ODk4IDkwLjE5MDIgMTAuODg5OEM5NC4xOTMzIDEwLjg4OTggOTYuNTAwNyAxMy45NDc1IDk2LjUwMDcgMTguMDA1Qzk2LjUwMDcgMjIuMTQ3IDkzLjkxNTcgMjUuMjA0NyA5MC4wNTEzIDI1LjIwNDdDODguMTYwNCAyNS4yMDQ3IDg2Ljc3MDQgMjQuNDU0MyA4Ni4xMDQ1IDIzLjUzN1YzMC4xNTMzSDgyLjQwNTFaTTg5LjQ2NCAxNC4xOTlDODcuNTczIDE0LjE5OSA4Ni4wNDQyIDE1LjYxNzIgODYuMDQ0MiAxOC4wMzUyQzg2LjA0NDIgMjAuNDUzMiA4Ny41NzMgMjEuODk5NSA4OS40NjQgMjEuODk5NUM5MS4zNTQ5IDIxLjg5OTUgOTIuODU1NiAyMC40ODEzIDkyLjg1NTYgMTguMDM1MkM5Mi44NTU2IDE1LjYxNTIgOTEuMzU0OSAxNC4xOTkgODkuNDY0IDE0LjE5OVpNOTcuODM0NCAzMC4wNTI3VjExLjA5NUgxMDEuNDIxVjEyLjc2MjdDMTAyLjAzMyAxMS43MDY2IDEwMy41NjIgMTAuNzg5MiAxMDUuNjE5IDEwLjc4OTJDMTA5LjYyMyAxMC43ODkyIDExMS45MyAxMy44NDY5IDExMS45MyAxNy45MDQ0QzExMS45MyAyMi4wNDY0IDEwOS4zNDUgMjUuMTA0MSAxMDUuNDgxIDI1LjEwNDFDMTAzLjU5IDI1LjEwNDEgMTAyLjIgMjQuMzUzOCAxMDEuNTM0IDIzLjQzNjRWMzAuMDUyN0g5Ny44MzQ0Wk0xMDQuODkzIDE0LjA5NjRDMTAzLjAwMiAxNC4wOTY0IDEwMS40NzMgMTUuNTE0NiAxMDEuNDczIDE3LjkzMjZDMTAxLjQ3MyAyMC4zNTA2IDEwMy4wMDIgMjEuNzk2OSAxMDQuODkzIDIxLjc5NjlDMTA2Ljc4NCAyMS43OTY5IDEwOC4yODUgMjAuMzc4NyAxMDguMjg1IDE3LjkzMjZDMTA4LjI4NSAxNS41MTQ2IDEwNi43ODQgMTQuMDk2NCAxMDQuODkzIDE0LjA5NjRaTTEyNi4zOTggMjAuOTU0MUMxMjUuNzA0IDIzLjMxNTggMTIzLjUzNSAyNS4yOTEyIDEyMC4xNzIgMjUuMjkxMkMxMTYuNDIgMjUuMjkxMiAxMTMuMTExIDIyLjU5NTYgMTEzLjExMSAxNy45ODA5QzExMy4xMTEgMTMuNjE3NiAxMTYuMzM1IDEwLjc4MTIgMTE5LjgzOCAxMC43ODEyQzEyNC4wNjIgMTAuNzgxMiAxMjYuNTkzIDEzLjQ3NjggMTI2LjU5MyAxNy44NzAyQzEyNi41OTMgMTguMzk3MyAxMjYuNTM3IDE4Ljk1NDUgMTI2LjUzNyAxOS4wMDg4SDExNi43NTJDMTE2LjgzNCAyMC44MTUzIDExOC4zNjMgMjIuMTIyOCAxMjAuMTk4IDIyLjEyMjhDMTIxLjkyMiAyMi4xMjI4IDEyMi44NjcgMjEuMjYxOSAxMjMuMzEyIDIwLjAzODhMMTI2LjM5OCAyMC45NTQxWk0xMjIuOTUyIDE2LjQ3ODJDMTIyLjg5NSAxNS4xMTYzIDEyMi4wMDYgMTMuNzgyNiAxMTkuODk0IDEzLjc4MjZDMTE3Ljk3NSAxMy43ODI2IDExNi45MTkgMTUuMjI4OSAxMTYuODM2IDE2LjQ3ODJIMTIyLjk1MlpNMTM2LjU4MSAxNC44NjQ4QzEzNi4xNjQgMTQuNzgyNCAxMzUuODAyIDE0Ljc1NDIgMTM1LjQ2OCAxNC43NTQyQzEzMy41NzcgMTQuNzU0MiAxMzEuOTM4IDE1LjY3MTUgMTMxLjkzOCAxOC42MTg2VjI0Ljg3MjhIMTI4LjI0VjExLjE5NTZIMTMxLjgyN1YxMy4yMjUzQzEzMi42NiAxMS40MTg5IDEzNC41NTEgMTEuMDg1IDEzNS43MiAxMS4wODVDMTM2LjAyNSAxMS4wODUgMTM2LjMwMyAxMS4xMTMxIDEzNi41ODEgMTEuMTQxM1YxNC44NjQ4Wk0xNDAuMDY5IDIwLjM2ODdDMTQwLjE1MSAyMS40NTMgMTQwLjk1OCAyMi40NTI3IDE0Mi41NzEgMjIuNDUyN0MxNDMuNzk0IDIyLjQ1MjcgMTQ0LjM3OCAyMS44MTMxIDE0NC4zNzggMjEuMDkwOUMxNDQuMzc4IDIwLjQ3OTMgMTQzLjk2MSAxOS45Nzg0IDE0Mi45MDUgMTkuNzU3MkwxNDEuMDk5IDE5LjM0MDdDMTM4LjQ1OCAxOC43NTc0IDEzNy4yNjMgMTcuMTcyMiAxMzcuMjYzIDE1LjI1NTFDMTM3LjI2MyAxMi44MDg5IDEzOS40MzEgMTAuNzc5MiAxNDIuMzc4IDEwLjc3OTJDMTQ2LjI3MSAxMC43NzkyIDE0Ny41NzYgMTMuMjUzNSAxNDcuNzQzIDE0LjcyNkwxNDQuNjU3IDE1LjQyQzE0NC41NDcgMTQuNjEzNCAxNDMuOTYzIDEzLjU4NTQgMTQyLjQwNiAxMy41ODU0QzE0MS40MzMgMTMuNTg1NCAxNDAuNjU0IDE0LjE2ODggMTQwLjY1NCAxNC45NDczQzE0MC42NTQgMTUuNjE1MiAxNDEuMTU1IDE2LjAzMTYgMTQxLjkwNSAxNi4xNzA0TDE0My44NTEgMTYuNTg2OEMxNDYuNTQ2IDE3LjE0MiAxNDcuOTA4IDE4Ljc4MzUgMTQ3LjkwOCAyMC43ODUxQzE0Ny45MDggMjMuMDEgMTQ2LjE4NCAyNS4yODkyIDE0Mi41OTkgMjUuMjg5MkMxMzguNDg2IDI1LjI4OTIgMTM3LjA2NyAyMi42MTk3IDEzNi45IDIxLjA2NDdMMTQwLjA2OSAyMC4zNjg3Wk0xNTQuODMyIDExLjE5NTZIMTU3LjU4NFYxNC40NzY2SDE1NC44MzJWMjAuMjAzN0MxNTQuODMyIDIxLjM5ODYgMTU1LjM4OCAyMS43ODg5IDE1Ni40NDYgMjEuNzg4OUMxNTYuODkgMjEuNzg4OSAxNTcuMzkxIDIxLjczMjYgMTU3LjU4NCAyMS42NzgzVjI0LjczNkMxNTcuMjUgMjQuODc0OCAxNTYuNTg0IDI1LjA2OTkgMTU1LjUgMjUuMDY5OUMxNTIuODMzIDI1LjA2OTkgMTUxLjE2MyAyMy40ODQ3IDE1MS4xNjMgMjAuODQ1NFYxNC40ODA2SDE0OC42ODlWMTEuMTk5NkgxNDkuMzgzQzE1MC44MjkgMTEuMTk5NiAxNTEuNDk1IDEwLjI1NDEgMTUxLjQ5NSA5LjAzMTA3VjcuMTExOTZIMTU0LjgzVjExLjE5NTZIMTU0LjgzMlpNMTcyLjQxIDE4LjAzNTJDMTcyLjQxIDIyLjIzMzUgMTY5LjMyNCAyNS4yOTEyIDE2NS4yMzkgMjUuMjkxMkMxNjEuMTUzIDI1LjI5MTIgMTU4LjA2NyAyMi4yMzM1IDE1OC4wNjcgMTguMDM1MkMxNTguMDY3IDEzLjgxMDcgMTYxLjE1MyAxMC43ODEyIDE2NS4yMzkgMTAuNzgxMkMxNjkuMzI0IDEwLjc3OTIgMTcyLjQxIDEzLjgwODcgMTcyLjQxIDE4LjAzNTJaTTE2OC43MTMgMTguMDM1MkMxNjguNzEzIDE1LjQ1MDIgMTY3LjA0NSAxNC4xNDI2IDE2NS4yMzkgMTQuMTQyNkMxNjMuNDMyIDE0LjE0MjYgMTYxLjc2NCAxNS40NDgyIDE2MS43NjQgMTguMDM1MkMxNjEuNzY0IDIwLjU5MiAxNjMuNDMyIDIxLjkyNzcgMTY1LjIzOSAyMS45Mjc3QzE2Ny4wNDUgMjEuOTI3NyAxNjguNzEzIDIwLjYyMDEgMTY4LjcxMyAxOC4wMzUyWk0xNzcuNDE1IDI0Ljg3MjhIMTczLjcxOFYxMS4xOTU2SDE3Ny4zMDRWMTIuODkxNEMxNzguMTM3IDExLjQ3MzIgMTc5Ljc3OSAxMC44MzM1IDE4MS4yNTEgMTAuODMzNUMxODQuNjQzIDEwLjgzMzUgMTg2LjIgMTMuMjUxNSAxODYuMiAxNi4yNTQ5VjI0Ljg3MjhIMTgyLjUwMlYxNi44OTQ2QzE4Mi41MDIgMTUuMzY1NyAxODEuNzUyIDE0LjE3MDggMTc5Ljk3NCAxNC4xNzA4QzE3OC4zNjIgMTQuMTcwOCAxNzcuNDE3IDE1LjQyMjEgMTc3LjQxNyAxNy4wMDUyVjI0Ljg3MjhIMTc3LjQxNVpNMjAwLjk3MyAyMC45NTQxQzIwMC4yNzkgMjMuMzE1OCAxOTguMTExIDI1LjI5MTIgMTk0Ljc0NyAyNS4yOTEyQzE5MC45OTYgMjUuMjkxMiAxODcuNjg2IDIyLjU5NTYgMTg3LjY4NiAxNy45ODA5QzE4Ny42ODYgMTMuNjE3NiAxOTAuOTExIDEwLjc4MTIgMTk0LjQxMyAxMC43ODEyQzE5OC42MzggMTAuNzgxMiAyMDEuMTY4IDEzLjQ3NjggMjAxLjE2OCAxNy44NzAyQzIwMS4xNjggMTguMzk3MyAyMDEuMTEyIDE4Ljk1NDUgMjAxLjExMiAxOS4wMDg4SDE5MS4zMjhDMTkxLjQxIDIwLjgxNTMgMTkyLjkzOSAyMi4xMjI4IDE5NC43NzMgMjIuMTIyOEMxOTYuNDk3IDIyLjEyMjggMTk3LjQ0MyAyMS4yNjE5IDE5Ny44ODcgMjAuMDM4OEwyMDAuOTczIDIwLjk1NDFaTTE5Ny41MjcgMTYuNDc4MkMxOTcuNDcxIDE1LjExNjMgMTk2LjU4MiAxMy43ODI2IDE5NC40NyAxMy43ODI2QzE5Mi41NTEgMTMuNzgyNiAxOTEuNDk0IDE1LjIyODkgMTkxLjQxMiAxNi40NzgySDE5Ny41MjdaIiBmaWxsPSIjMTUxNTE1Ii8+CjxwYXRoIGQ9Ik0zNy45MjE2IDcuNDk2MTlDMzAuODQ0NyAzLjQyODY1IDE2LjEwOTQgMC4yMzIxNDggOC4zMDgyNCAwLjAyNDk0ODhDMC41MDUwNzggLTAuMTgyMjUgLTAuMzY1OTYyIDIuNTk3ODQgMC4xMTA3OTcgOC45MjY0N0MwLjU4OTU2OCAxNS4yNTcxIDIuNDE0MTMgMjUuMTM0MyA2LjQ0MTQ0IDMxLjQ0MjhDMTAuNDY2NyAzNy43NTEzIDE2LjY5MjggNDAuNDkxMSAyMy4yOTMgMzguMjMwMUMyOS44OTEyIDM1Ljk2NyAzNi44NjU1IDI4LjcwMjkgNDAuNjQxNCAyMi42MDE2QzQ0LjQxNzIgMTYuNTA0MyA0NC45OTg2IDExLjU2MzcgMzcuOTIxNiA3LjQ5NjE5Wk0yNC4wNjc1IDI0Ljg3ODhIMTkuMTA0N1YzMy4xMzI2SDE0LjA1MTVWMTQuNzcwM0gxOS4xMDQ3VjE5LjgyMzVIMjQuMDY3NVYxOS44MDk1QzI2LjE0OTUgMTkuNzczMyAyNy44MjcyIDE4LjA3NzQgMjcuODI3MiAxNS45ODczQzI3LjgyNzIgMTMuODk3MiAyNi4xNDk1IDEyLjE5OTQgMjQuMDY3NSAxMi4xNjUyVjEyLjE2MTJINy43MzI5MUw5LjU3OTYgNy4xMDc5NUgyNC4wNjU0QzI4Ljk4MTkgNy4xMDc5NSAzMi45NjkgMTEuMDk1IDMyLjk2OSAxNi4wMTE1QzMyLjk3MSAyMC45Mjk5IDI4Ljk4MzkgMjQuODc4OCAyNC4wNjc1IDI0Ljg3ODhaIiBmaWxsPSIjMDA2NEZBIi8+CjxwYXRoIGQ9Ik0yNC4wNjc1IDI0Ljg3ODhIMTkuMTA0N1YzMy4xMzI2SDE0LjA1MTVWMTQuNzcwM0gxOS4xMDQ3VjE5LjgyMzVIMjQuMDY3NVYxOS44MDk1QzI2LjE0OTUgMTkuNzczMyAyNy44MjcyIDE4LjA3NzQgMjcuODI3MiAxNS45ODczQzI3LjgyNzIgMTMuODk3MiAyNi4xNDk1IDEyLjE5OTQgMjQuMDY3NSAxMi4xNjUyVjEyLjE2MTJINy43MzI5MUw5LjU3OTYgNy4xMDc5NUgyNC4wNjU0QzI4Ljk4MTkgNy4xMDc5NSAzMi45NjkgMTEuMDk1IDMyLjk2OSAxNi4wMTE1QzMyLjk3MSAyMC45Mjk5IDI4Ljk4MzkgMjQuODc4OCAyNC4wNjc1IDI0Ljg3ODhaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" alt="" />
        </div>

        <div className="pc-header-center">
      
        </div>

        <div className="pc-header-right">
          <select className="pc-lang" value={lang} onChange={(e) => changeLang(e.target.value)}>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>

          {currentUser ? (
            <>
              <button className="pc-btn-ghost" onClick={() => setProfileOpen(true)}>
                <i className="fas fa-user" /> Profile
              </button>
            </>
          ) : (
            <>
              <button className="pc-btn-ghost" onClick={() => setAuthModal('login')}>Login</button>
              <button className="pc-btn-primary" onClick={() => setAuthModal('register')}>Register</button>
            </>
          )}
        </div>
      </header>

      {/* ===== MAIN ===== */}
      <div className="pc-main">
        {/* LEFT: market list (coin selector) */}
        <aside className="pc-left">
          <div className="pc-search">
            <i className="fas fa-search" />
            <input placeholder="Search markets…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="pc-filter">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              {['All', 'Forex', 'Crypto', 'Metals', 'Indices'].map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
          <div className="pc-market-list">
            {filtered.map(p => {
              const m = markets[p.symbol];
              const wsPrice = m ? (m.lp && m.lp > 0 ? m.lp : (m.ask && m.bid ? (m.ask + m.bid) / 2 : null)) : null;
              const inj = symbolInjections[p.symbol];
              // During an injection show the animated price + synthetic change; else real-time
              const shown = inj ? inj.targetPrice : wsPrice;
              const chp = inj
                ? ((inj.targetPrice - inj.entryPrice) / inj.entryPrice) * 100
                : (m?.chp ?? null);
              const pos = (chp ?? 0) >= 0;
              return (
                <div
                  key={p.symbol}
                  className={`pc-market-item ${selectedCoin === p.symbol ? 'active' : ''}`}
                  onClick={() => setSelectedCoin(p.symbol)}
                >
                  <PairIcon pair={p} size="sm" />
                  <div className="pc-market-info">
                    <div className="pc-market-symbol">{p.symbol}</div>
                    <div className="pc-market-name">{p.name}</div>
                  </div>
                  <div className="pc-market-px">
                    <div className="pc-market-price">{fmtPrice(shown)}</div>
                    <div className={`pc-market-chg ${pos ? 'pos' : 'neg'}`}>
                      {pos ? '▲' : '▼'} {fmtChp(chp)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* CENTER: full-height chart */}
        <section className="pc-center">
          <div className="pc-chart-head">
            <div className="pc-chart-asset">
              <PairIcon pair={currentPair} size="md" />
              <div>
                <div className="pc-chart-name">{selectedCoin}</div>
                <div className="pc-chart-sub">{currentPair.name}</div>
              </div>
            </div>
            <div className="pc-chart-price" style={{ color: serverInj ? (serverInj.targetPrice >= serverInj.entryPrice ? '#10b981' : '#ef4444') : '#1a1d23' }}>
              {fmtPrice(displayPrice)}
            </div>
          </div>

          <div className="pc-chart-wrap">
            <CustomTradingChart
              key={selectedCoin}
              symbol={selectedCoin}
              livePrice={realPrice}
              height={chartHeight}
              priceInjection={priceInjection}
            />
          </div>
        </section>

        {/* RIGHT: funds + trade options */}
        <aside className="pc-right">
          <div className="pc-funds">
            <div>
              <div className="pc-funds-label">Available Funds</div>
              <div className="pc-funds-amount">{currentUser ? `$${USDBalance.toFixed(2)}` : '****'}</div>
            </div>
            <div className="pc-funds-icon">💳</div>
          </div>

          {/* ===== Trade options (from futures page) ===== */}
          <div className="pc-trade-panel">
            <div className="pc-trade-row">
              <label>Multiplier</label>
              <select value={multiplier} onChange={(e) => setMultiplier(+e.target.value)}>
                {[100, 200, 300, 400, 500].map(v => <option key={v} value={v}>{v}×</option>)}
              </select>
            </div>

            <div className="pc-trade-row">
              <label><input type="checkbox" checked={useStopLoss} onChange={(e) => { setUseStopLoss(e.target.checked); setStopLossValue(e.target.checked && realPrice ? realPrice : 0); }} /> Stop Loss</label>
              <input type="number" step="any" min="0" disabled={!useStopLoss} value={stopLossValue} onChange={(e) => setStopLossValue(parseFloat(e.target.value) || 0)} />
            </div>

            <div className="pc-trade-row">
              <label><input type="checkbox" checked={useTakeProfit} onChange={(e) => { setUseTakeProfit(e.target.checked); setTakeProfitValue(e.target.checked && realPrice ? realPrice : 0); }} /> Take Profit</label>
              <input type="number" step="any" min="0" disabled={!useTakeProfit} value={takeProfitValue} onChange={(e) => setTakeProfitValue(parseFloat(e.target.value) || 0)} />
            </div>

            <div className="pc-trade-row">
              <label>Lots (0.01)</label>
              <div className="pc-stepper">
                <button onClick={() => setLots(v => Math.max(0.01, +(v - 0.01).toFixed(2)))}>−</button>
                <input type="number" step="0.01" min="0.01" value={lots} onChange={(e) => { const v = parseFloat(e.target.value); setLots(isNaN(v) || v < 0.01 ? 0.01 : Math.round(v * 100) / 100); }} />
                <button onClick={() => setLots(v => +(v + 0.01).toFixed(2))}>+</button>
              </div>
            </div>

            <div className="pc-trade-info">
              <span>Estimated Margin</span>
              <strong style={{ color: insufficient ? '#ef4444' : '#1a1d23' }}>${marginStr}</strong>
            </div>

            {insufficient && <div className="pc-insufficient">⚠ Insufficient balance. Need ${marginStr}, you have ${USDBalance.toFixed(2)}.</div>}

            <div className="pc-trade-actions">
              <button className="pc-buy" disabled={realPrice == null || insufficient} onClick={() => openConfirm('buy')}>▲ Buy Up</button>
              <button className="pc-sell" disabled={realPrice == null || insufficient} onClick={() => openConfirm('sell')}>▼ Buy Down</button>
            </div>
          </div>
        </aside>
      </div>

      {/* ===== Confirm order ===== */}
      {confirm && (
        <div className="pc-modal-overlay" onClick={() => !placing && setConfirm(null)}>
          <div className="pc-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="pc-confirm-title">Confirm {confirm === 'buy' ? 'Buy Up' : 'Buy Down'}</div>
            <div className="pc-summary-row"><span>Symbol</span><strong>{selectedCoin}</strong></div>
            <div className="pc-summary-row"><span>Direction</span><strong className={confirm === 'buy' ? 'pos' : 'neg'}>{confirm === 'buy' ? 'Buy' : 'Sell'}</strong></div>
            <div className="pc-summary-row"><span>Price</span><strong>{fmtPrice(realPrice)}</strong></div>
            <div className="pc-summary-row"><span>Lots · Mult</span><strong>{lots.toFixed(2)} · {multiplier}×</strong></div>
            <div className="pc-summary-row"><span>Est. Margin</span><strong>${marginStr}</strong></div>
            <div className="pc-confirm-actions">
              <button className="pc-btn-ghost" onClick={() => setConfirm(null)} disabled={placing}>Cancel</button>
              <button className="pc-btn-primary" onClick={placeOrder} disabled={placing}>{placing ? 'Placing…' : 'Confirm'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Toast ===== */}
      {toast && <div className="pc-toast">✓ {toast}</div>}

      {/* ===== Auth / Profile modals ===== */}
      {authModal && <PcAuthModal initialMode={authModal} onClose={() => setAuthModal(null)} />}
      {profileOpen && <PcProfileModal onClose={() => setProfileOpen(false)} />}
    </div>
  );
}
