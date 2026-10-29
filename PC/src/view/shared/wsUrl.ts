/**
 * Returns the WebSocket URL for the TradingView data feed.
 *
 * In development  → ws://localhost:PORT/ws/socket.io/websocket
 *                   Vite proxies this to wss://widgetdata.tradingview.com
 *
 * In production   → ws://VPS_IP:PORT/ws/socket.io/websocket
 *                   Nginx proxies this to wss://widgetdata.tradingview.com
 *                   with Origin: https://www.tradingview.com  (required by TV)
 *
 * Never connect directly to widgetdata.tradingview.com from the browser —
 * TradingView rejects unknown Origin headers.
 */
export function getTvWsUrl(): string {
  // On a real domain, live prices use ws.<main domain> (set up by nginx-site.sh): a proxy in
  // front of the site, like Namecheap's HTTPS, blocks WebSockets. Works for any domain.
  const host = window.location.hostname;
  if (window.location.protocol === 'https:' && host.includes('.') && !/^[\d.]+$/.test(host)) {
    const base = host.split('.').slice(-2).join('.');
    return `wss://ws.${base}/ws/socket.io/websocket`;
  }
  const proto = window.location.protocol === 'https:' ? 'wss' : 'ws';
  return `${proto}://${window.location.host}/ws/socket.io/websocket`;
}
