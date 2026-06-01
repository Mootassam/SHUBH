import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createChart, CandlestickSeries } from 'lightweight-charts';

// ── Public types ──────────────────────────────────────────────────────────────

export interface PriceInjection {
  symbol:      string;
  entryPrice:  number;   // chart price at injection start
  targetPrice: number;   // close price set by admin
  startedAt:   number;   // Date.now()
  durationMs:  number;   // total animation window
}

// ── Internal types ────────────────────────────────────────────────────────────

type TF = '1m' | '30m' | '1h' | 'D';

interface TFConfig { bucketMs: number; count: number; }

const TF_CONFIG: Record<TF, TFConfig> = {
  '1m':  { bucketMs:           60_000, count: 200 },
  '30m': { bucketMs:    30 * 60_000,   count: 200 },
  '1h':  { bucketMs:    60 * 60_000,   count: 200 },
  'D':   { bucketMs: 24 * 60 * 60_000, count: 150 },
};

interface OHLC { open: number; high: number; low: number; close: number; }

interface Props {
  symbol:          string;
  livePrice:       number | null;
  height?:         number;
  priceInjection?: PriceInjection | null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getBucket(ms: number, bucketMs: number): number {
  return Math.floor(ms / bucketMs) * (bucketMs / 1000); // unix seconds
}

/** Per-symbol base 1-minute volatility (fraction of price) */
function baseVol(symbol: string): number {
  const s = symbol.toUpperCase();
  if (/BTC|ETH/.test(s))                                   return 0.0007;
  if (/LTC|SOL|ADA|DOT|AVAX|LINK|MATIC/.test(s))          return 0.0005;
  if (/XAU|GOLD/.test(s))                                  return 0.00015;
  if (/XAG|SILVER/.test(s))                                return 0.00020;
  if (/JPY/.test(s))                                        return 0.00022;
  if (/US30|NAS100|SPX|GER|UK100|FRA|AUS200|JPN/.test(s)) return 0.00025;
  if (/OIL|BRENT|WTI|CRUDE/.test(s))                      return 0.00035;
  return 0.0001;
}

const TF_VOL_SCALE: Record<TF, number> = { '1m': 1, '30m': 5.48, '1h': 7.75, 'D': 21.9 };

function generateHistory(currentPrice: number, symbol: string, tf: TF) {
  const { bucketMs, count } = TF_CONFIG[tf];
  const vol   = baseVol(symbol) * TF_VOL_SCALE[tf];
  const nowMs = Date.now();

  const closes: number[] = [currentPrice];
  for (let i = 1; i <= count; i++) {
    const prev  = closes[i - 1];
    const delta = (Math.random() - 0.5) * 2 * vol * prev;
    closes.push(Math.max(prev * 0.5, prev - delta));
  }
  closes.reverse();

  const bars: (OHLC & { time: number })[] = [];
  for (let i = 0; i < count; i++) {
    const timeMs = nowMs - (count - i) * bucketMs;
    const bucket = getBucket(timeMs, bucketMs);
    const open   = closes[i];
    const close  = closes[i + 1];
    const body   = Math.abs(close - open);
    const floor  = currentPrice * 0.00005;
    const wick   = Math.max(body, floor) * (0.5 + Math.random() * 2);
    bars.push({
      time:  bucket,
      open,
      high:  Math.max(open, close) + wick * (0.15 + Math.random() * 0.7),
      low:   Math.min(open, close) - wick * (0.15 + Math.random() * 0.7),
      close,
    });
  }
  return bars;
}

// ── localStorage persistence ──────────────────────────────────────────────────

const LS_KEY      = (sym: string) => `lca_${sym}`;
const LS_VERSION  = 3; // bump to invalidate all prior saved animation data

/** Save 1-minute animation candles (from injection startedAt onward) */
function saveAnimCandles(symbol: string, candles: Map<number, OHLC>, startedAt: number) {
  try {
    const minBucket = getBucket(startedAt, 60_000);
    const entries = Array.from(candles.entries())
      .filter(([t]) => t >= minBucket)
      .sort(([a], [b]) => a - b)
      .map(([t, c]) => ({
        t,
        o: parseFloat(c.open.toFixed(7)),
        h: parseFloat(c.high.toFixed(7)),
        l: parseFloat(c.low.toFixed(7)),
        c: parseFloat(c.close.toFixed(7)),
      }));
    if (!entries.length) return;
    localStorage.setItem(LS_KEY(symbol), JSON.stringify({ v: LS_VERSION, entries, ts: Date.now() }));
  } catch {}
}

/** Remove any saved animation data for a symbol (called when a fresh animation begins) */
function clearAnimCandles(symbol: string) {
  try { localStorage.removeItem(LS_KEY(symbol)); } catch {}
}

/**
 * Load saved animation candles and aggregate them to the target timeframe.
 * Saved data is always 1-minute resolution; aggregated on the fly for higher TFs.
 */
function loadAnimCandles(symbol: string, targetBucketMs: number): Map<number, OHLC> {
  const result = new Map<number, OHLC>();
  try {
    const raw = localStorage.getItem(LS_KEY(symbol));
    if (!raw) return result;
    const data = JSON.parse(raw);
    if (!data.ts || Date.now() - data.ts > 48 * 3600_000) return result;
    if (data.v !== LS_VERSION) return result; // incompatible old format

    (data.entries as { t: number; o: number; h: number; l: number; c: number }[]).forEach(e => {
      // e.t is already unix-seconds at a 1-min boundary
      const bucket = getBucket(e.t * 1000, targetBucketMs);
      if (result.has(bucket)) {
        const ex = result.get(bucket)!;
        ex.high  = Math.max(ex.high, e.h);
        ex.low   = Math.min(ex.low,  e.l);
        ex.close = e.c; // last close wins
      } else {
        result.set(bucket, { open: e.o, high: e.h, low: e.l, close: e.c });
      }
    });
  } catch {}
  return result;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function CustomTradingChart({
  symbol, livePrice, height = 400, priceInjection,
}: Props) {

  const [tf, setTF] = useState<TF>('1m');

  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef     = useRef<any>(null);
  const seriesRef    = useRef<any>(null);

  const livePriceRef  = useRef<number | null>(livePrice);
  const tfRef         = useRef<TF>('1m');
  const injRef        = useRef<PriceInjection | null>(null);
  const injPriceRef   = useRef<number | null>(null);
  const prevInjRef    = useRef<PriceInjection | null>(null); // for detecting injection end
  const candlesRef    = useRef<Map<number, OHLC>>(new Map());
  const prevLenRef    = useRef(0);
  const tickCountRef  = useRef(0);
  const tickRef       = useRef<ReturnType<typeof setInterval> | null>(null);

  // History-load guard (only load after livePrice transitions null → value)
  const seenNullRef   = useRef(false);
  const histLoadedRef = useRef(false);

  useEffect(() => { livePriceRef.current = livePrice; }, [livePrice]);
  useEffect(() => { tfRef.current = tf; }, [tf]);

  useEffect(() => {
    if (priceInjection && priceInjection.symbol === symbol) {
      // New injection starting: clear any stale saved data so old bad candles
      // don't override the fresh animation
      if (!prevInjRef.current || prevInjRef.current.startedAt !== priceInjection.startedAt) {
        clearAnimCandles(priceInjection.symbol);
        tickCountRef.current = 0;
      }
      injRef.current      = priceInjection;
      injPriceRef.current = priceInjection.entryPrice;
    } else {
      // Injection just ended → final save + clear broadcast
      if (prevInjRef.current && !priceInjection) {
        saveAnimCandles(prevInjRef.current.symbol, candlesRef.current, prevInjRef.current.startedAt);
        try { localStorage.removeItem(`lcp_${prevInjRef.current.symbol}`); } catch {}
      }
      injRef.current      = null;
      injPriceRef.current = null;
    }
    prevInjRef.current = priceInjection ?? null;
  }, [priceInjection, symbol]);

  // ── History: load on null→price transition ────────────────────────────────
  useEffect(() => {
    if (livePrice === null) { seenNullRef.current = true; return; }
    if (!seenNullRef.current || histLoadedRef.current || !seriesRef.current) return;

    histLoadedRef.current = true;
    _loadHistory(livePrice, symbol, tf);
  }, [livePrice, symbol]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── History: reload on TF change ─────────────────────────────────────────
  useEffect(() => {
    if (!histLoadedRef.current) return;
    const price = livePriceRef.current;
    if (!price || !seriesRef.current) return;
    _loadHistory(price, symbol, tf);
  }, [tf, symbol]); // eslint-disable-line react-hooks/exhaustive-deps

  function _loadHistory(price: number, sym: string, timeframe: TF) {
    const { bucketMs } = TF_CONFIG[timeframe];
    const bars = generateHistory(price, sym, timeframe);

    // Start with synthetic candles
    const merged = new Map<number, OHLC>();
    bars.forEach(b => merged.set(b.time, { open: b.open, high: b.high, low: b.low, close: b.close }));

    // Override with saved animation candles (they're "real" historical movement)
    const saved = loadAnimCandles(sym, bucketMs);
    saved.forEach((c, t) => merged.set(t, c));

    const sorted = Array.from(merged.entries())
      .sort(([a], [b]) => a - b)
      .map(([time, c]) => ({ time: time as any, ...c }));

    candlesRef.current = merged;
    prevLenRef.current = sorted.length;
    seriesRef.current!.setData(sorted);
    chartRef.current?.timeScale().scrollToPosition(5, false);
  }

  // ── Init chart ─────────────────────────────────────────────────────────────
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      width:  containerRef.current.clientWidth,
      height,
      layout: { background: { color: '#ffffff' }, textColor: '#666', fontSize: 12 },
      grid:   { vertLines: { color: '#f0f2f5' }, horzLines: { color: '#f0f2f5' } },
      crosshair: { mode: 1 },
      rightPriceScale: { borderColor: '#e0e3e8', scaleMargins: { top: 0.08, bottom: 0.08 } },
      timeScale: {
        borderColor: '#e0e3e8', timeVisible: true, secondsVisible: false,
        rightOffset: 6, lockVisibleTimeRangeOnResize: true,
      },
      handleScroll: true,
      handleScale:  true,
    });

    const series = chart.addSeries(CandlestickSeries as any, {
      upColor:       '#26a69a',
      downColor:     '#ef5350',
      borderVisible: false,
      wickUpColor:   '#26a69a',
      wickDownColor: '#ef5350',
    });

    chartRef.current  = chart;
    seriesRef.current = series;

    const onResize = () => {
      if (containerRef.current)
        chart.applyOptions({ width: containerRef.current.clientWidth });
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      chart.remove();
      chartRef.current  = null;
      seriesRef.current = null;
    };
  }, [height]);

  // ── Real-time tick (price engine + candle builder) ─────────────────────────
  useEffect(() => {
    if (tickRef.current) clearInterval(tickRef.current);

    tickRef.current = setInterval(() => {
      const series = seriesRef.current;
      if (!series) return;

      const inj = injRef.current;
      let price: number | null;

      if (inj) {
        const elapsed = Date.now() - inj.startedAt;
        const prog    = Math.min(1, elapsed / inj.durationMs);
        const cur     = injPriceRef.current ?? inj.entryPrice;

        if (prog >= 1) {
          // Animation complete – snap exactly to target
          price = inj.targetPrice;
        } else {
          // ── Mean-reversion around expected linear trajectory ────────────
          //
          //   expectedPrice(t) = entryPrice + prog × totalDist
          //
          //   At every tick the formula:
          //     1. Measures how far the actual price has drifted from the
          //        expected trajectory (the "error").
          //     2. Applies a spring-like correction that pulls the price
          //        back toward the trajectory.  The spring stiffness grows
          //        over time so convergence is guaranteed.
          //     3. Adds realistic noise (proportional to per-symbol vol)
          //        that decays toward the end so the price doesn't
          //        over-shoot when it's close to the target.
          //
          //   Result: genuine up-and-down market movement that gradually
          //   centres on the correct close price and arrives exactly there.
          // ──────────────────────────────────────────────────────────────
          const totalDist    = inj.targetPrice - inj.entryPrice;
          const expected     = inj.entryPrice + prog * totalDist;
          const error        = expected - cur;                          // positive = cur is below trajectory

          // Spring stiffness: weak at start (5 %), strong at end (80 %)
          const stiffness    = 0.05 + prog * prog * 0.75;
          const correction   = error * stiffness;

          // Noise: 2.5 × per-symbol vol at start, decays to near-zero at end
          const volPerTick   = baseVol(inj.symbol) * inj.entryPrice;
          const noiseMag     = volPerTick * 2.5 * Math.max(0.04, 1 - prog * 0.92);
          const noise        = (Math.random() - 0.5) * 2 * noiseMag;

          price = cur + correction + noise;
        }
        injPriceRef.current = price;

        // ── Broadcast injected price to other pages via localStorage ────
        try {
          localStorage.setItem(`lcp_${inj.symbol}`, JSON.stringify({ p: price, ts: Date.now() }));
        } catch {}

        // ── Persist animation candles every ~10 s (5 × 2 s ticks) ──────
        tickCountRef.current++;
        if (tickCountRef.current % 5 === 0) {
          saveAnimCandles(inj.symbol, candlesRef.current, inj.startedAt);
        }
      } else {
        price = livePriceRef.current;
      }

      if (!price || price <= 0) return;

      const bucketMs = TF_CONFIG[tfRef.current].bucketMs;
      const bucket   = getBucket(Date.now(), bucketMs);
      const candles  = candlesRef.current;

      if (candles.has(bucket)) {
        const c = candles.get(bucket)!;
        c.high  = Math.max(c.high, price);
        c.low   = Math.min(c.low,  price);
        c.close = price;
      } else {
        const keys      = Array.from(candles.keys()).sort((a, b) => a - b);
        const prevClose = keys.length ? candles.get(keys[keys.length - 1])!.close : price;
        candles.set(bucket, {
          open:  prevClose,
          high:  Math.max(prevClose, price),
          low:   Math.min(prevClose, price),
          close: price,
        });
        if (candles.size > 400) candles.delete(keys[0]);
      }

      const currentLen = candles.size;
      const bar = { time: bucket as any, ...candles.get(bucket)! };

      if (currentLen !== prevLenRef.current) {
        const sorted = Array.from(candles.entries())
          .sort(([a], [b]) => a - b)
          .map(([t, c]) => ({ time: t as any, ...c }));
        series.setData(sorted);
        prevLenRef.current = currentLen;
      } else {
        series.update(bar);
      }
    }, 2000);

    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, []); // reads all state via refs

  // ── Overlay values ────────────────────────────────────────────────────────
  const isInjecting = !!(priceInjection && priceInjection.symbol === symbol);
  const injPct = isInjecting
    ? Math.min(100, Math.round((Date.now() - priceInjection!.startedAt) / priceInjection!.durationMs * 100))
    : 0;
  const injUp = isInjecting && priceInjection!.targetPrice >= priceInjection!.entryPrice;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ position: 'relative', width: '100%', background: '#fff', borderRadius: 12, overflow: 'hidden' }}>

      {/* Timeframe toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 2,
        padding: '6px 10px 4px', borderBottom: '1px solid #f0f2f5',
      }}>
        {(['1m', '30m', '1h', 'D'] as TF[]).map(t => (
          <button key={t} onClick={() => setTF(t)} style={{
            padding: '4px 10px', borderRadius: 6, border: 'none',
            background: tf === t ? '#106cf5' : 'transparent',
            color:      tf === t ? '#fff'    : '#888',
            fontSize: 12, fontWeight: tf === t ? 700 : 500,
            cursor: 'pointer', transition: 'all 0.15s',
          }}>
            {t}
          </button>
        ))}
        <div style={{ width: 1, height: 14, background: '#e0e3e8', margin: '0 6px' }} />
        <span style={{ fontSize: 11, color: '#bbb', userSelect: 'none', fontWeight: 600 }}>
          {symbol}
        </span>
      </div>

      {/* Chart canvas */}
      <div
        id={`chart-${symbol.replace(/[^a-zA-Z0-9]/g, '')}`}
        ref={containerRef}
        style={{ width: '100%', height }}
      />

      {/* Closing animation badge */}
      {isInjecting && (
        <div style={{
          position: 'absolute', top: 48, right: 10,
          background: 'rgba(16,108,245,0.92)', color: '#fff',
          borderRadius: 8, padding: '5px 12px', fontSize: 12, fontWeight: 700,
          backdropFilter: 'blur(6px)', pointerEvents: 'none',
          display: 'flex', alignItems: 'center', gap: 7,
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        }}>
          <span style={{
            display: 'inline-block', width: 8, height: 8,
            borderRadius: '50%', background: '#fff',
            animation: 'chartPulse 1.2s ease-in-out infinite',
          }} />
          {injUp ? '▲' : '▼'} Closing… {injPct}%
        </div>
      )}

      {/* Target price label */}
      {isInjecting && (
        <div style={{
          position: 'absolute', bottom: 36, left: 10,
          background: injUp ? 'rgba(38,166,154,0.93)' : 'rgba(239,83,80,0.93)',
          color: '#fff', borderRadius: 6, padding: '4px 10px',
          fontSize: 11, fontWeight: 700, pointerEvents: 'none',
          boxShadow: '0 1px 6px rgba(0,0,0,0.15)',
        }}>
          {injUp ? '▲' : '▼'} Target: {priceInjection!.targetPrice.toFixed(5)}
        </div>
      )}

      <style>{`
        @keyframes chartPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.3; transform: scale(0.75); }
        }
      `}</style>
    </div>
  );
}
