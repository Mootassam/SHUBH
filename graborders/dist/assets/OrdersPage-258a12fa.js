import{o as V,p as Z,i as l,U as N,j as s}from"./index-650658a7.js";import{g as ee,b as T,a as F}from"./wsUrl-86362af9.js";const P=a=>`~m~${a.length}~m~${a}`;function se(a){const c=[];let d=a;for(;d.length>0&&d.startsWith("~m~");){const g=d.indexOf("~m~",3),f=parseInt(d.substring(3,g));c.push(d.substring(g+3,g+3+f)),d=d.substring(g+3+f)}return c}function te(a){try{return JSON.parse(a.replace(/^=\{/,"{")).symbol??a}catch{return a}}function u(a){return a==null?"—":a>=1e4?a.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):a>=100?a.toFixed(2):a>=10?a.toFixed(3):a.toFixed(5)}function S(a){return`${a>=0?"+":""}${a.toFixed(2)}`}function w(a){if(!a)return"—";try{const c=new Date(a);return`${c.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"})} ${c.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`}catch{return a}}function q(a,c){if(!a.entryPrice)return 0;const d=a.direction==="buy"?c-a.entryPrice:a.entryPrice-c;return parseFloat((d*a.lots*100-a.fee).toFixed(5))}const oe=()=>{const a=V(Z.selectCurrentTenant),c=a==null?void 0:a.id,[d,g]=l.useState("positions"),[f,_]=l.useState([]),[J,H]=l.useState(!0),[G,E]=l.useState(null),[X,I]=l.useState(null),[i,C]=l.useState(null),[h,Y]=l.useState({}),b=l.useRef(null),D=l.useRef(null),k=l.useRef(new Set),z=l.useRef(null),U=l.useRef([]),$=l.useRef(new Set),L=l.useRef(new Set),x=l.useCallback(async()=>{if(c)try{const{data:e}=await N.get(`/tenant/${c}/trade-orders`);_((e==null?void 0:e.rows)??[])}catch{_([])}finally{H(!1)}},[c]);l.useEffect(()=>{x()},[x]);const A=l.useCallback(e=>{const n=b.current,t=D.current;!n||n.readyState!==WebSocket.OPEN||!t||e.forEach(o=>{k.current.has(o)||(n.send(P(JSON.stringify({m:"quote_add_symbols",p:[t,o]}))),k.current.add(o))})},[]);l.useEffect(()=>{const e=[...new Set(f.filter(n=>n.status==="active"||n.status==="waiting").map(n=>n.symbol))];U.current=e,A(e)},[f,A]);const O=l.useCallback(()=>{b.current&&(b.current.close(),b.current=null);const e=new WebSocket(ee());b.current=e,e.onopen=()=>{const n="qs_"+Math.random().toString(36).substring(2,12);D.current=n,k.current=new Set,e.send(P(JSON.stringify({m:"quote_create_session",p:[n]}))),e.send(P(JSON.stringify({m:"quote_set_fields",p:[n,"lp","ask","bid"]}))),U.current.forEach(t=>{e.send(P(JSON.stringify({m:"quote_add_symbols",p:[n,t]}))),k.current.add(t)})},e.onmessage=n=>{const t=n.data;if(t.startsWith("~h~")){e.send(t);return}se(t).forEach(o=>{try{const r=JSON.parse(o);if(r.m!=="qsd")return;const p=r.p[1],M=te(p.n),m=p.v;if(!m)return;let j=null;typeof m.lp=="number"&&m.lp>0?j=m.lp:typeof m.ask=="number"&&typeof m.bid=="number"&&m.ask>0&&(j=(m.ask+m.bid)/2),j!==null&&Y(R=>R[M]===j?R:{...R,[M]:j})}catch{}})},e.onclose=n=>{n.wasClean||(z.current=setTimeout(O,3e3))},e.onerror=()=>{}},[]);l.useEffect(()=>(O(),()=>{var e;z.current&&clearTimeout(z.current),(e=b.current)==null||e.close()}),[O]),l.useEffect(()=>{if(!c)return;const e=f.filter(t=>t.status==="active"),n=f.filter(t=>t.status==="waiting");e.forEach(t=>{const o=h[t.symbol];if(o==null)return;const r=t.id||t._id;if($.current.has(r))return;let p=null;t.takeProfit&&(t.direction==="buy"&&o>=t.takeProfit&&(p="tp"),t.direction==="sell"&&o<=t.takeProfit&&(p="tp")),!p&&t.stopLoss&&(t.direction==="buy"&&o<=t.stopLoss&&(p="sl"),t.direction==="sell"&&o>=t.stopLoss&&(p="sl")),p&&($.current.add(r),N.put(`/tenant/${c}/trade-orders/${r}/close`,{closePrice:o,closeReason:p}).then(()=>x()).finally(()=>$.current.delete(r)))}),n.forEach(t=>{const o=h[t.symbol];if(o==null||t.targetPrice==null)return;const r=t.id||t._id;if(L.current.has(r))return;(t.triggerAbove?o>=t.targetPrice:o<=t.targetPrice)&&(L.current.add(r),N.put(`/tenant/${c}/trade-orders/${r}/execute`,{executionPrice:o}).then(()=>x()).finally(()=>L.current.delete(r)))})},[h,f,c,x]);const K=l.useCallback(async e=>{if(!c)return;const n=h[e.symbol];if(n==null)return;const t=e.id||e._id;E(t);try{await N.put(`/tenant/${c}/trade-orders/${t}/close`,{closePrice:n,closeReason:"manual"}),await x()}catch{alert("Failed to close position. Please try again.")}finally{E(null)}},[c,h,x]),Q=l.useCallback(async e=>{if(!c)return;const n=e.id||e._id;I(n);try{await N.put(`/tenant/${c}/trade-orders/${n}/cancel`),await x()}catch{alert("Failed to cancel order. Please try again.")}finally{I(null)}},[c,x]),y=f.filter(e=>e.status==="active"),v=f.filter(e=>e.status==="waiting"),B=f.filter(e=>e.status==="closed"||e.status==="cancelled"),W=y.reduce((e,n)=>{const t=h[n.symbol];return e+(t!=null?q(n,t):0)},0);return s.jsxs(s.Fragment,{children:[s.jsx("style",{children:ne}),s.jsxs("div",{className:"op-page",children:[s.jsx("div",{className:"op-header",children:s.jsx("div",{className:"op-title",children:"Orders"})}),s.jsxs("div",{className:"op-card",children:[s.jsxs("div",{className:"op-tabs",children:[s.jsxs("button",{className:`op-tab ${d==="positions"?"active":""}`,onClick:()=>g("positions"),children:["Positions",y.length>0&&s.jsx("span",{className:"op-badge",children:y.length})]}),s.jsxs("button",{className:`op-tab ${d==="pending"?"active":""}`,onClick:()=>g("pending"),children:["Pending",v.length>0&&s.jsx("span",{className:"op-badge",children:v.length})]}),s.jsx("button",{className:`op-tab ${d==="history"?"active":""}`,onClick:()=>g("history"),children:"History"})]}),J?s.jsx("div",{className:"op-skeleton-list",children:[1,2,3].map(e=>s.jsx("div",{className:"op-skeleton-row"},e))}):d==="positions"?s.jsxs(s.Fragment,{children:[y.length>0&&s.jsxs("div",{className:"op-summary",children:[s.jsx("span",{className:"op-summary-label",children:"Floating P&L"}),s.jsx("span",{className:`op-summary-val ${W>=0?"green":"red"}`,children:S(W)})]}),y.length===0?s.jsx("div",{className:"op-empty",children:"No open positions"}):y.map(e=>{const n=e.id||e._id,t=h[e.symbol]??null,o=t!=null?q(e,t):null,r=G===n,p=T(e.symbol)??{symbol:e.symbol,name:e.symbol};return s.jsxs("div",{className:"op-order-card",children:[s.jsxs("div",{className:"op-order-top",children:[s.jsxs("div",{className:"op-order-left",children:[s.jsx(F,{pair:p,size:"sm"}),s.jsx("span",{className:"op-sym",children:e.symbol}),e.orderType==="pending"&&s.jsx("span",{className:"op-tag op-tag-executed",children:"Executed"})]}),s.jsxs("div",{className:"op-badges",children:[s.jsx("span",{className:`op-dir ${e.direction}`,children:e.direction==="buy"?"Buy":"Sell"}),s.jsxs("span",{className:"op-lots",children:[e.lots," Lots"]}),s.jsxs("span",{className:"op-lots",children:[e.multiplier,"×"]})]})]}),s.jsxs("div",{className:"op-price-row",children:[s.jsx("span",{className:"op-open-price",children:u(e.entryPrice)}),s.jsx("span",{className:"op-arrow",children:"→"}),t!=null?s.jsx("span",{className:"op-live-price",children:u(t)}):s.jsx("span",{className:"op-price-loading",children:s.jsx("span",{className:"op-dot-pulse"})})]}),(e.takeProfit||e.stopLoss)&&s.jsxs("div",{className:"op-sltp-row",children:[e.takeProfit&&s.jsxs("span",{className:"op-tp",children:["TP: ",u(e.takeProfit)]}),e.stopLoss&&s.jsxs("span",{className:"op-sl",children:["SL: ",u(e.stopLoss)]})]}),s.jsxs("div",{className:"op-order-footer",children:[s.jsxs("div",{className:"op-footer-left",children:[s.jsx("span",{className:`op-pnl ${o==null?"muted":o>=0?"green":"red"}`,children:o!=null?S(o):"—"}),s.jsx("span",{className:"op-date",children:w(e.openTime??e.createdAt)})]}),s.jsx("button",{className:"op-close-btn",onClick:()=>K(e),disabled:r||t==null,children:r?"Closing…":"Close Position"})]})]},n)})]}):d==="pending"?s.jsx(s.Fragment,{children:v.length===0?s.jsx("div",{className:"op-empty",children:"No pending orders"}):v.map(e=>{const n=e.id||e._id,t=h[e.symbol]??null,o=X===n,r=T(e.symbol)??{symbol:e.symbol,name:e.symbol},p=e.targetPrice&&e.referencePrice&&t!=null?(Math.abs(e.targetPrice-t)/e.referencePrice*100).toFixed(2):null;return s.jsxs("div",{className:"op-order-card",children:[s.jsxs("div",{className:"op-order-top",children:[s.jsxs("div",{className:"op-order-left",children:[s.jsx(F,{pair:r,size:"sm"}),s.jsx("span",{className:"op-sym",children:e.symbol}),s.jsx("span",{className:"op-tag op-tag-waiting",children:"Waiting"})]}),s.jsxs("div",{className:"op-badges",children:[s.jsx("span",{className:`op-dir ${e.direction}`,children:e.direction==="buy"?"Buy":"Sell"}),s.jsxs("span",{className:"op-lots",children:[e.lots," Lots"]}),s.jsxs("span",{className:"op-lots",children:[e.multiplier,"×"]})]})]}),s.jsxs("div",{className:"op-pending-prices",children:[s.jsxs("div",{className:"op-pending-row",children:[s.jsx("span",{className:"op-pending-label",children:"Trigger at"}),s.jsx("span",{className:"op-pending-target",children:u(e.targetPrice)})]}),s.jsxs("div",{className:"op-pending-row",children:[s.jsx("span",{className:"op-pending-label",children:"Current price"}),t!=null?s.jsx("span",{className:"op-live-price",children:u(t)}):s.jsx("span",{className:"op-price-loading",children:s.jsx("span",{className:"op-dot-pulse"})})]}),p&&s.jsxs("div",{className:"op-pending-row",children:[s.jsx("span",{className:"op-pending-label",children:"Distance"}),s.jsxs("span",{className:"op-pending-dist",children:[p,"%"]})]})]}),(e.takeProfit||e.stopLoss)&&s.jsxs("div",{className:"op-sltp-row",children:[e.takeProfit&&s.jsxs("span",{className:"op-tp",children:["TP: ",u(e.takeProfit)]}),e.stopLoss&&s.jsxs("span",{className:"op-sl",children:["SL: ",u(e.stopLoss)]})]}),s.jsxs("div",{className:"op-order-footer",children:[s.jsx("div",{className:"op-footer-left",children:s.jsx("span",{className:"op-date",children:w(e.createdAt)})}),s.jsx("button",{className:"op-cancel-btn",onClick:()=>Q(e),disabled:o,children:o?"Cancelling…":"Cancel Order"})]})]},n)})}):B.length===0?s.jsx("div",{className:"op-empty",children:"No order history yet"}):B.map(e=>{const n=e.id||e._id,t=e.pnl??0,o=T(e.symbol)??{symbol:e.symbol,name:e.symbol};return s.jsxs("div",{className:"op-history-card",onClick:()=>C(e),children:[s.jsxs("div",{className:"op-order-top",children:[s.jsxs("div",{className:"op-order-left",children:[s.jsx(F,{pair:o,size:"sm"}),s.jsx("span",{className:"op-sym",children:e.symbol}),e.status==="cancelled"&&s.jsx("span",{className:"op-tag op-tag-cancelled",children:"Cancelled"})]}),e.status!=="cancelled"&&s.jsx("span",{className:`op-pnl ${t>=0?"green":"red"}`,children:S(t)})]}),s.jsxs("div",{className:"op-price-row",children:[s.jsx("span",{className:"op-open-price",children:u(e.entryPrice)}),e.status!=="cancelled"&&e.closePrice&&s.jsxs(s.Fragment,{children:[s.jsx("span",{className:"op-arrow",children:"→"}),s.jsx("span",{className:"op-live-price",children:u(e.closePrice)})]})]}),s.jsxs("div",{className:"op-hist-meta",children:[s.jsx("span",{className:`op-dir ${e.direction}`,children:e.direction==="buy"?"Buy":"Sell"}),s.jsxs("span",{children:[e.lots," Lots · ",e.multiplier,"×"]}),e.closeReason&&e.closeReason!=="manual"&&s.jsx("span",{className:`op-close-reason op-cr-${e.closeReason}`,children:e.closeReason.toUpperCase()}),s.jsx("span",{children:w(e.closeTime??e.createdAt)})]})]},n)})]})]}),i&&s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"op-overlay",onClick:()=>C(null)}),s.jsxs("div",{className:"op-detail-sheet",children:[s.jsx("div",{className:"op-detail-handle"}),s.jsx("button",{className:"op-detail-x",onClick:()=>C(null),children:"✕"}),s.jsx("div",{className:"op-detail-heading",children:"Order Details"}),[["Pair",i.symbol],["Direction",i.direction==="buy"?"Buy":"Sell",i.direction],["Order Type",i.orderType==="market"?"Market":"Pending"],["Status",i.status.charAt(0).toUpperCase()+i.status.slice(1)],["Lots",String(i.lots)],["Multiplier",`${i.multiplier}×`],["Margin",`$${(i.margin??0).toFixed(2)}`],["Fee",`$${(i.fee??0).toFixed(5)}`],i.entryPrice?["Open Price",u(i.entryPrice)]:null,i.closePrice?["Close Price",u(i.closePrice)]:null,i.targetPrice?["Trigger Price",u(i.targetPrice)]:null,i.status!=="cancelled"&&i.pnl!=null?["P&L",S(i.pnl),i.pnl>=0?"buy":"sell"]:null,i.takeProfit?["Take Profit",u(i.takeProfit)]:null,i.stopLoss?["Stop Loss",u(i.stopLoss)]:null,i.closeReason?["Close Reason",i.closeReason.toUpperCase()]:null,["Order #",i.orderNumber],["Opened",w(i.openTime??i.createdAt)],i.closeTime?["Closed",w(i.closeTime)]:null].filter(Boolean).map(([e,n,t])=>s.jsxs("div",{className:"op-detail-row",children:[s.jsx("span",{className:"op-detail-label",children:e}),s.jsx("span",{className:`op-detail-val ${t==="buy"?"green":t==="sell"?"red":""}`,children:n})]},e))]})]})]})},ne=`
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .op-page {
    max-width: 400px;
    margin: 0 auto;
    min-height: 100vh;
    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

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
    gap: 6px;
    margin-bottom: 4px;
  }
  .op-tab {
    flex: 1;
    padding: 10px 4px;
    border-radius: 20px;
    border: none;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    background: #f0f2f5;
    color: #555;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .op-tab.active {
    background: #106cf5;
    color: white;
    font-weight: 600;
  }

  /* Count badge in tab */
  .op-badge {
    background: rgba(255,255,255,0.3);
    color: inherit;
    font-size: 10px;
    font-weight: 700;
    padding: 1px 5px;
    border-radius: 8px;
    min-width: 16px;
    text-align: center;
  }
  .op-tab:not(.active) .op-badge {
    background: #106cf5;
    color: white;
  }

  /* P&L summary banner */
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

  /* Order cards */
  .op-order-card {
    background: #f8f9fb;
    border: 1px solid #edeef1;
    border-radius: 12px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
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
  .op-order-top  { display: flex; justify-content: space-between; align-items: center; }
  .op-order-left { display: flex; align-items: center; gap: 6px; }
  .op-sym        { font-size: 15px; font-weight: 600; color: #1a1a1a; }

  /* Tags */
  .op-tag {
    font-size: 9px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .op-tag-waiting   { background: #fff3cd; color: #856404; }
  .op-tag-executed  { background: #d1ecf1; color: #0c5460; }
  .op-tag-cancelled { background: #f8d7da; color: #721c24; }

  /* Badges row */
  .op-badges { display: flex; align-items: center; gap: 5px; }
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
    padding: 3px 7px;
    border-radius: 8px;
  }

  /* Price row */
  .op-price-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }
  .op-open-price { color: #888; font-weight: 500; }
  .op-arrow      { color: #ccc; font-size: 13px; }
  .op-live-price { color: #106cf5; font-weight: 600; }

  /* Pulsing dot */
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

  /* TP/SL row */
  .op-sltp-row {
    display: flex;
    gap: 10px;
    font-size: 12px;
  }
  .op-tp { color: #28a228; font-weight: 500; }
  .op-sl { color: #e03030; font-weight: 500; }

  /* Pending price rows */
  .op-pending-prices {
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: white;
    border-radius: 8px;
    padding: 10px 12px;
    border: 1px solid #f0f0f0;
  }
  .op-pending-row    { display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
  .op-pending-label  { color: #888; }
  .op-pending-target { color: #1a1a1a; font-weight: 600; }
  .op-pending-dist   { color: #f0a500; font-weight: 600; }

  /* Footer row */
  .op-order-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #f0f0f0;
    padding-top: 10px;
  }
  .op-footer-left { display: flex; flex-direction: column; gap: 3px; }
  .op-pnl {
    font-size: 22px;
    font-weight: 700;
    line-height: 1;
  }
  .op-pnl.muted { font-size: 18px; color: #bbb; }
  .op-date { font-size: 11px; color: #aaa; white-space: nowrap; }

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

  /* Cancel button */
  .op-cancel-btn {
    background: #fff1f1;
    color: #e03030;
    border: 1px solid #f8d7da;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    white-space: nowrap;
  }
  .op-cancel-btn:disabled { opacity: 0.4; cursor: default; }
  .op-cancel-btn:hover:not(:disabled) { background: #ffe0e0; }

  /* History meta row */
  .op-hist-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    font-size: 12px;
    color: #888;
  }

  /* Close reason pill */
  .op-close-reason {
    font-size: 10px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 6px;
    text-transform: uppercase;
  }
  .op-cr-tp         { background: rgba(40,162,40,0.12); color: #28a228; }
  .op-cr-sl         { background: rgba(224,48,48,0.12);  color: #e03030; }
  .op-cr-cancelled  { background: #f8d7da; color: #721c24; }

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

  /* Skeleton */
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

  /* Detail bottom sheet */
  .op-detail-sheet {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 400px;
    background: white;
    border-radius: 24px 24px 0 0;
    padding: 20px 24px 48px;
    z-index: 201;
    animation: slideUp 0.3s ease;
    max-height: 85vh;
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

  @keyframes fadeIn  { from { opacity: 0; }                       to { opacity: 1; } }
  @keyframes slideUp { from { transform: translate(-50%, 100%); } to { transform: translate(-50%, 0); } }

  @media (min-width: 768px) { .op-card { border-radius: 30px 30px 0 0; } }
`;export{oe as default};
