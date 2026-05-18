import{u as B,q as M,i as n,U as E,j as s}from"./index-0260459c.js";import{g as G,b as I,a as W}from"./wsUrl-e823bb4f.js";const N=o=>`~m~${o.length}~m~${o}`;function X(o){const r=[];let c=o;for(;c.length>0&&c.startsWith("~m~");){const d=c.indexOf("~m~",3),x=parseInt(c.substring(3,d));r.push(c.substring(d+3,d+3+x)),c=c.substring(d+3+x)}return r}function Y(o){try{return JSON.parse(o.replace(/^=\{/,"{")).symbol??o}catch{return o}}function f(o){return o==null?"—":o>=1e4?o.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):o>=100?o.toFixed(2):o>=10?o.toFixed(3):o.toFixed(5)}function v(o){return`${o>=0?"+":""}${o.toFixed(2)}`}function C(o){try{const r=new Date(o);return`${r.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"})} ${r.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`}catch{return o}}function q(o,r){return(o.direction==="buy"?r-o.price:o.price-r)*o.lots*100}const Z=()=>{const o=B(M.selectCurrentTenant),[r,c]=n.useState("positions"),[d,x]=n.useState([]),[H,J]=n.useState(!0),[T,O]=n.useState(null),[l,k]=n.useState(null),[h,U]=n.useState({}),u=n.useRef(null),$=n.useRef(null),b=n.useRef(new Set),S=n.useRef(null),F=n.useRef([]),y=n.useCallback(async()=>{if(o!=null&&o.id)try{const{data:e}=await E.get(`/tenant/${o.id}/futures-orders`);x((e==null?void 0:e.rows)??[])}catch{x([])}finally{J(!1)}},[o]);n.useEffect(()=>{y()},[y]);const R=n.useCallback(e=>{const t=u.current,i=$.current;!t||t.readyState!==WebSocket.OPEN||!i||e.forEach(a=>{b.current.has(a)||(t.send(N(JSON.stringify({m:"quote_add_symbols",p:[i,a]}))),b.current.add(a))})},[]);n.useEffect(()=>{const e=[...new Set(d.filter(t=>t.tradeStatus==="pending").map(t=>t.coin))];F.current=e,R(e)},[d,R]);const z=n.useCallback(()=>{u.current&&(u.current.close(),u.current=null);const e=new WebSocket(G());u.current=e,e.onopen=()=>{const t="qs_"+Math.random().toString(36).substring(2,12);$.current=t,b.current=new Set,e.send(N(JSON.stringify({m:"quote_create_session",p:[t]}))),e.send(N(JSON.stringify({m:"quote_set_fields",p:[t,"lp","ask","bid"]}))),F.current.forEach(a=>{e.send(N(JSON.stringify({m:"quote_add_symbols",p:[t,a]}))),b.current.add(a)})},e.onmessage=t=>{const i=t.data;if(i.startsWith("~h~")){e.send(i);return}X(i).forEach(a=>{try{const m=JSON.parse(a);if(m.m!=="qsd")return;const w=m.p[1],D=Y(w.n),p=w.v;if(!p)return;let g=null;typeof p.lp=="number"&&p.lp>0?g=p.lp:typeof p.ask=="number"&&typeof p.bid=="number"&&p.ask>0&&(g=(p.ask+p.bid)/2),g!==null&&U(P=>P[D]===g?P:{...P,[D]:g})}catch{}})},e.onclose=t=>{t.wasClean||(S.current=setTimeout(z,3e3))},e.onerror=()=>{}},[]);n.useEffect(()=>(z(),()=>{var e;S.current&&clearTimeout(S.current),(e=u.current)==null||e.close()}),[z]);const A=n.useCallback(async e=>{if(!(o!=null&&o.id))return;const t=h[e.coin];if(t==null)return;const i=e.id||e._id;O(i);try{await E.put(`/tenant/${o.id}/futures-orders/${i}/close`,{closePrice:t}),await y()}catch{alert("Failed to close position. Please try again.")}finally{O(null)}},[o,h,y]),j=d.filter(e=>e.tradeStatus==="pending"),_=d.filter(e=>e.tradeStatus==="closed"),L=j.reduce((e,t)=>{const i=h[t.coin];return e+(i!=null?q(t,i):0)},0);return s.jsxs(s.Fragment,{children:[s.jsx("style",{children:K}),s.jsxs("div",{className:"op-page",children:[s.jsx("div",{className:"op-header",children:s.jsx("div",{className:"op-title",children:"Orders"})}),s.jsxs("div",{className:"op-card",children:[s.jsxs("div",{className:"op-tabs",children:[s.jsx("button",{className:`op-tab ${r==="positions"?"active":""}`,onClick:()=>c("positions"),children:"Position Holding"}),s.jsx("button",{className:`op-tab ${r==="history"?"active":""}`,onClick:()=>c("history"),children:"History"})]}),H?s.jsx("div",{className:"op-skeleton-list",children:[1,2,3].map(e=>s.jsx("div",{className:"op-skeleton-row"},e))}):r==="positions"?s.jsxs(s.Fragment,{children:[j.length>0&&s.jsxs("div",{className:"op-summary",children:[s.jsx("span",{className:"op-summary-label",children:"Floating P&L"}),s.jsx("span",{className:`op-summary-val ${L>=0?"green":"red"}`,children:v(L)})]}),j.length===0?s.jsx("div",{className:"op-empty",children:"No open positions"}):j.map(e=>{const t=e.id||e._id,i=h[e.coin]??null,a=i!=null?q(e,i):null,m=T===t,w=I(e.coin)??{symbol:e.coin,name:e.coin};return s.jsxs("div",{className:"op-order-card",children:[s.jsxs("div",{className:"op-order-top",children:[s.jsxs("div",{className:"op-order-left",children:[s.jsx(W,{pair:w,size:"sm"}),s.jsx("span",{className:"op-sym",children:e.coin})]}),s.jsxs("div",{className:"op-badges",children:[s.jsx("span",{className:`op-dir ${e.direction}`,children:e.direction==="buy"?"Buy":"Sell"}),s.jsxs("span",{className:"op-lots",children:[e.lots," Lots"]})]})]}),s.jsxs("div",{className:"op-price-row",children:[s.jsx("span",{className:"op-open-price",children:f(e.price)}),s.jsx("span",{className:"op-arrow",children:"→"}),i!=null?s.jsx("span",{className:"op-live-price",children:f(i)}):s.jsx("span",{className:"op-price-loading",children:s.jsx("span",{className:"op-dot-pulse"})})]}),s.jsxs("div",{className:"op-order-footer",children:[s.jsxs("div",{className:"op-footer-left",children:[s.jsx("span",{className:`op-pnl ${a==null?"muted":a>=0?"green":"red"}`,children:a!=null?v(a):"—"}),s.jsx("span",{className:"op-date",children:C(e.createdAt)})]}),s.jsx("button",{className:"op-close-btn",onClick:()=>A(e),disabled:m||i==null,children:m?"Closing…":"Close Position"})]})]},t)})]}):_.length===0?s.jsx("div",{className:"op-empty",children:"No closed orders yet"}):_.map(e=>{const t=e.id||e._id,i=e.pnl??0,a=I(e.coin)??{symbol:e.coin,name:e.coin};return s.jsxs("div",{className:"op-history-card",onClick:()=>k(e),children:[s.jsxs("div",{className:"op-order-top",children:[s.jsxs("div",{className:"op-order-left",children:[s.jsx(W,{pair:a,size:"sm"}),s.jsx("span",{className:"op-sym",children:e.coin})]}),s.jsx("span",{className:`op-pnl ${i>=0?"green":"red"}`,children:v(i)})]}),s.jsxs("div",{className:"op-price-row",children:[s.jsx("span",{className:"op-open-price",children:f(e.price)}),s.jsx("span",{className:"op-arrow",children:"→"}),s.jsx("span",{className:"op-live-price",children:f(e.closePrice)})]}),s.jsxs("div",{className:"op-hist-meta",children:[s.jsx("span",{className:`op-dir ${e.direction}`,children:e.direction==="buy"?"Buy":"Sell"}),s.jsxs("span",{children:[e.lots," Lots"]}),s.jsx("span",{children:C(e.createdAt)})]})]},t)})]})]}),l&&s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"op-overlay",onClick:()=>k(null)}),s.jsxs("div",{className:"op-detail-sheet",children:[s.jsx("div",{className:"op-detail-handle"}),s.jsx("button",{className:"op-detail-x",onClick:()=>k(null),children:"✕"}),s.jsx("div",{className:"op-detail-heading",children:"Order Details"}),[["Pair",l.coin],["Direction",l.direction==="buy"?"Buy":"Sell",l.direction],["Lots",String(l.lots)],["Multiplier",`${l.multiplier}×`],["Open Price",f(l.price)],["Close Price",f(l.closePrice)],["P&L",v(l.pnl??0),(l.pnl??0)>=0?"buy":"sell"],["Order ID",l.number],["Date",C(l.createdAt)]].map(([e,t,i])=>s.jsxs("div",{className:"op-detail-row",children:[s.jsx("span",{className:"op-detail-label",children:e}),s.jsx("span",{className:`op-detail-val ${i==="buy"?"green":i==="sell"?"red":""}`,children:t})]},e))]})]})]})},K=`
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
`;export{Z as default};
