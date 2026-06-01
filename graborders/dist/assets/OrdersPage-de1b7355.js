import{o as te,p as ne,i as c,U as k,j as s}from"./index-8e1efb76.js";import{g as ae,b as F,a as _}from"./wsUrl-25d72a6f.js";const C=a=>`~m~${a.length}~m~${a}`;function oe(a){const r=[];let u=a;for(;u.length>0&&u.startsWith("~m~");){const b=u.indexOf("~m~",3),x=parseInt(u.substring(3,b));r.push(u.substring(b+3,b+3+x)),u=u.substring(b+3+x)}return r}function ie(a){try{return JSON.parse(a.replace(/^=\{/,"{")).symbol??a}catch{return a}}function d(a){return a==null?"—":a>=1e4?a.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):a>=100?a.toFixed(2):a>=10?a.toFixed(3):a.toFixed(5)}function $(a){return`${a>=0?"+":""}${a.toFixed(2)}`}function v(a){if(!a)return"—";try{const r=new Date(a);return`${r.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"})} ${r.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`}catch{return a}}function q(a,r){if(!a.entryPrice)return 0;const u=a.direction==="buy"?r-a.entryPrice:a.entryPrice-r;return parseFloat((u*a.lots*100-a.fee).toFixed(5))}const pe=()=>{const a=te(ne.selectCurrentTenant),r=a==null?void 0:a.id,[u,b]=c.useState("positions"),[x,E]=c.useState([]),[H,G]=c.useState(!0),[X,I]=c.useState(null),[Y,D]=c.useState(null),[o,z]=c.useState(null),[y,K]=c.useState({}),[A,Q]=c.useState({}),w=c.useRef(null),M=c.useRef(null),P=c.useRef(new Set),O=c.useRef(null),U=c.useRef([]),L=c.useRef(new Set),R=c.useRef(new Set),h=c.useCallback(async()=>{if(r)try{const{data:e}=await k.get(`/tenant/${r}/trade-orders`);E((e==null?void 0:e.rows)??[])}catch{E([])}finally{G(!1)}},[r]);c.useEffect(()=>{h()},[h]),c.useEffect(()=>{const e=()=>{const t={};try{for(let i=0;i<localStorage.length;i++){const l=localStorage.key(i);if(!(l!=null&&l.startsWith("lcp_")))continue;const p=l.substring(4),f=localStorage.getItem(l);if(!f)continue;const g=JSON.parse(f);Date.now()-g.ts<8e3&&(t[p]=g.p)}}catch{}Q(t)};e();const n=setInterval(e,2e3);return()=>clearInterval(n)},[]);const W=c.useCallback(e=>{const n=w.current,t=M.current;!n||n.readyState!==WebSocket.OPEN||!t||e.forEach(i=>{P.current.has(i)||(n.send(C(JSON.stringify({m:"quote_add_symbols",p:[t,i]}))),P.current.add(i))})},[]);c.useEffect(()=>{const e=[...new Set(x.filter(n=>n.status==="active"||n.status==="waiting").map(n=>n.symbol))];U.current=e,W(e)},[x,W]);const T=c.useCallback(()=>{w.current&&(w.current.close(),w.current=null);const e=new WebSocket(ae());w.current=e,e.onopen=()=>{const n="qs_"+Math.random().toString(36).substring(2,12);M.current=n,P.current=new Set,e.send(C(JSON.stringify({m:"quote_create_session",p:[n]}))),e.send(C(JSON.stringify({m:"quote_set_fields",p:[n,"lp","ask","bid"]}))),U.current.forEach(t=>{e.send(C(JSON.stringify({m:"quote_add_symbols",p:[n,t]}))),P.current.add(t)})},e.onmessage=n=>{const t=n.data;if(t.startsWith("~h~")){e.send(t);return}oe(t).forEach(i=>{try{const l=JSON.parse(i);if(l.m!=="qsd")return;const p=l.p[1],f=ie(p.n),g=p.v;if(!g)return;let m=null;typeof g.lp=="number"&&g.lp>0?m=g.lp:typeof g.ask=="number"&&typeof g.bid=="number"&&g.ask>0&&(m=(g.ask+g.bid)/2),m!==null&&K(j=>j[f]===m?j:{...j,[f]:m})}catch{}})},e.onclose=n=>{n.wasClean||(O.current=setTimeout(T,3e3))},e.onerror=()=>{}},[]);c.useEffect(()=>(T(),()=>{var e;O.current&&clearTimeout(O.current),(e=w.current)==null||e.close()}),[T]),c.useEffect(()=>{if(!r)return;const e=x.filter(t=>t.status==="active"),n=x.filter(t=>t.status==="waiting");e.forEach(t=>{const i=y[t.symbol];if(i==null)return;const l=t.id||t._id;if(L.current.has(l))return;let p=null;t.takeProfit&&(t.direction==="buy"&&i>=t.takeProfit&&(p="tp"),t.direction==="sell"&&i<=t.takeProfit&&(p="tp")),!p&&t.stopLoss&&(t.direction==="buy"&&i<=t.stopLoss&&(p="sl"),t.direction==="sell"&&i>=t.stopLoss&&(p="sl")),p&&(L.current.add(l),k.put(`/tenant/${r}/trade-orders/${l}/close`,{closePrice:i,closeReason:p}).then(()=>h()).finally(()=>L.current.delete(l)))}),n.forEach(t=>{const i=y[t.symbol];if(i==null||t.targetPrice==null)return;const l=t.id||t._id;if(R.current.has(l))return;(t.triggerAbove?i>=t.targetPrice:i<=t.targetPrice)&&(R.current.add(l),k.put(`/tenant/${r}/trade-orders/${l}/execute`,{executionPrice:i}).then(()=>h()).finally(()=>R.current.delete(l)))})},[y,x,r,h]);const V=c.useCallback(async e=>{if(!r)return;const n=y[e.symbol];if(n==null)return;const t=e.id||e._id;I(t);try{await k.put(`/tenant/${r}/trade-orders/${t}/close`,{closePrice:n,closeReason:"manual"}),await h()}catch{alert("Failed to close position. Please try again.")}finally{I(null)}},[r,y,h]),Z=c.useCallback(async e=>{if(!r)return;const n=e.id||e._id;D(n);try{await k.put(`/tenant/${r}/trade-orders/${n}/cancel`),await h()}catch{alert("Failed to cancel order. Please try again.")}finally{D(null)}},[r,h]),N=x.filter(e=>e.status==="active"||e.status==="closing"),S=x.filter(e=>e.status==="waiting"),B=x.filter(e=>e.status==="closed"||e.status==="cancelled"),J=N.reduce((e,n)=>{const t=A[n.symbol]??y[n.symbol];return e+(t!=null?q(n,t):0)},0);return s.jsxs(s.Fragment,{children:[s.jsx("style",{children:le}),s.jsxs("div",{className:"op-page",children:[s.jsx("div",{className:"op-header",children:s.jsx("div",{className:"op-title",children:"Orders"})}),s.jsxs("div",{className:"op-card",children:[s.jsxs("div",{className:"op-tabs",children:[s.jsxs("button",{className:`op-tab ${u==="positions"?"active":""}`,onClick:()=>b("positions"),children:["Positions",N.length>0&&s.jsx("span",{className:"op-badge",children:N.length})]}),s.jsxs("button",{className:`op-tab ${u==="pending"?"active":""}`,onClick:()=>b("pending"),children:["Pending",S.length>0&&s.jsx("span",{className:"op-badge",children:S.length})]}),s.jsx("button",{className:`op-tab ${u==="history"?"active":""}`,onClick:()=>b("history"),children:"History"})]}),H?s.jsx("div",{className:"op-skeleton-list",children:[1,2,3].map(e=>s.jsx("div",{className:"op-skeleton-row"},e))}):u==="positions"?s.jsxs(s.Fragment,{children:[N.length>0&&s.jsxs("div",{className:"op-summary",children:[s.jsx("span",{className:"op-summary-label",children:"Floating P&L"}),s.jsx("span",{className:`op-summary-val ${J>=0?"green":"red"}`,children:$(J)})]}),N.length===0?s.jsx("div",{className:"op-empty",children:"No open positions"}):N.map(e=>{const n=e.id||e._id,t=A[e.symbol]??null,i=t??y[e.symbol]??null,l=i!=null?q(e,i):null,p=X===n,f=e.status==="closing",g=F(e.symbol)??{symbol:e.symbol,name:e.symbol};let m="";if(f&&e.closeScheduledAt){const j=new Date(e.closeScheduledAt).getTime()-Date.now();if(j>0){const ee=Math.floor(j/6e4),se=Math.floor(j%6e4/1e3);m=`${ee}m ${se}s`}else m="Finalizing…"}return s.jsxs("div",{className:`op-order-card${f?" op-card-closing":""}`,children:[s.jsxs("div",{className:"op-order-top",children:[s.jsxs("div",{className:"op-order-left",children:[s.jsx(_,{pair:g,size:"sm"}),s.jsx("span",{className:"op-sym",children:e.symbol}),f?s.jsx("span",{className:"op-tag op-tag-closing",children:"Closing"}):e.orderType==="pending"?s.jsx("span",{className:"op-tag op-tag-executed",children:"Executed"}):null]}),s.jsxs("div",{className:"op-badges",children:[s.jsx("span",{className:`op-dir ${e.direction}`,children:e.direction==="buy"?"Buy":"Sell"}),s.jsxs("span",{className:"op-lots",children:[e.lots," Lots"]}),s.jsxs("span",{className:"op-lots",children:[e.multiplier,"×"]})]})]}),s.jsxs("div",{className:"op-price-row",children:[s.jsx("span",{className:"op-open-price",children:d(e.entryPrice)}),s.jsx("span",{className:"op-arrow",children:"→"}),i!=null?s.jsx("span",{className:`op-live-price${t!=null?" op-price-injected":""}`,children:d(i)}):s.jsx("span",{className:"op-price-loading",children:s.jsx("span",{className:"op-dot-pulse"})}),f&&e.closePrice!=null&&s.jsxs("span",{className:"op-target-arrow",children:["→ ",s.jsx("span",{className:`op-close-target ${(e.pnl??0)>=0?"green":"red"}`,children:d(e.closePrice)})]})]}),f&&s.jsxs("div",{className:"op-closing-bar",children:[s.jsx("div",{className:"op-closing-pulse"}),s.jsxs("span",{className:"op-closing-label",children:["Position closing",m?` in ${m}`:"…"]})]}),(e.takeProfit||e.stopLoss)&&s.jsxs("div",{className:"op-sltp-row",children:[e.takeProfit&&s.jsxs("span",{className:"op-tp",children:["TP: ",d(e.takeProfit)]}),e.stopLoss&&s.jsxs("span",{className:"op-sl",children:["SL: ",d(e.stopLoss)]})]}),s.jsxs("div",{className:"op-order-footer",children:[s.jsxs("div",{className:"op-footer-left",children:[s.jsx("span",{className:`op-pnl ${l==null?"muted":l>=0?"green":"red"}`,children:l!=null?$(l):"—"}),s.jsx("span",{className:"op-date",children:v(e.openTime??e.createdAt)})]}),f?s.jsxs("div",{className:"op-closing-chip",children:[s.jsx("span",{className:"op-closing-dot"}),"Closing…"]}):s.jsx("button",{className:"op-close-btn",onClick:()=>V(e),disabled:p||i==null,children:p?"Closing…":"Close Position"})]})]},n)})]}):u==="pending"?s.jsx(s.Fragment,{children:S.length===0?s.jsx("div",{className:"op-empty",children:"No pending orders"}):S.map(e=>{const n=e.id||e._id,t=y[e.symbol]??null,i=Y===n,l=F(e.symbol)??{symbol:e.symbol,name:e.symbol},p=e.targetPrice&&e.referencePrice&&t!=null?(Math.abs(e.targetPrice-t)/e.referencePrice*100).toFixed(2):null;return s.jsxs("div",{className:"op-order-card",children:[s.jsxs("div",{className:"op-order-top",children:[s.jsxs("div",{className:"op-order-left",children:[s.jsx(_,{pair:l,size:"sm"}),s.jsx("span",{className:"op-sym",children:e.symbol}),s.jsx("span",{className:"op-tag op-tag-waiting",children:"Waiting"})]}),s.jsxs("div",{className:"op-badges",children:[s.jsx("span",{className:`op-dir ${e.direction}`,children:e.direction==="buy"?"Buy":"Sell"}),s.jsxs("span",{className:"op-lots",children:[e.lots," Lots"]}),s.jsxs("span",{className:"op-lots",children:[e.multiplier,"×"]})]})]}),s.jsxs("div",{className:"op-pending-prices",children:[s.jsxs("div",{className:"op-pending-row",children:[s.jsx("span",{className:"op-pending-label",children:"Trigger at"}),s.jsx("span",{className:"op-pending-target",children:d(e.targetPrice)})]}),s.jsxs("div",{className:"op-pending-row",children:[s.jsx("span",{className:"op-pending-label",children:"Current price"}),t!=null?s.jsx("span",{className:"op-live-price",children:d(t)}):s.jsx("span",{className:"op-price-loading",children:s.jsx("span",{className:"op-dot-pulse"})})]}),p&&s.jsxs("div",{className:"op-pending-row",children:[s.jsx("span",{className:"op-pending-label",children:"Distance"}),s.jsxs("span",{className:"op-pending-dist",children:[p,"%"]})]})]}),(e.takeProfit||e.stopLoss)&&s.jsxs("div",{className:"op-sltp-row",children:[e.takeProfit&&s.jsxs("span",{className:"op-tp",children:["TP: ",d(e.takeProfit)]}),e.stopLoss&&s.jsxs("span",{className:"op-sl",children:["SL: ",d(e.stopLoss)]})]}),s.jsxs("div",{className:"op-order-footer",children:[s.jsx("div",{className:"op-footer-left",children:s.jsx("span",{className:"op-date",children:v(e.createdAt)})}),s.jsx("button",{className:"op-cancel-btn",onClick:()=>Z(e),disabled:i,children:i?"Cancelling…":"Cancel Order"})]})]},n)})}):B.length===0?s.jsx("div",{className:"op-empty",children:"No order history yet"}):B.map(e=>{const n=e.id||e._id,t=e.pnl??0,i=F(e.symbol)??{symbol:e.symbol,name:e.symbol};return s.jsxs("div",{className:"op-history-card",onClick:()=>z(e),children:[s.jsxs("div",{className:"op-order-top",children:[s.jsxs("div",{className:"op-order-left",children:[s.jsx(_,{pair:i,size:"sm"}),s.jsx("span",{className:"op-sym",children:e.symbol}),e.status==="cancelled"&&s.jsx("span",{className:"op-tag op-tag-cancelled",children:"Cancelled"})]}),e.status!=="cancelled"&&s.jsx("span",{className:`op-pnl ${t>=0?"green":"red"}`,children:$(t)})]}),s.jsxs("div",{className:"op-price-row",children:[s.jsx("span",{className:"op-open-price",children:d(e.entryPrice)}),e.status!=="cancelled"&&e.closePrice&&s.jsxs(s.Fragment,{children:[s.jsx("span",{className:"op-arrow",children:"→"}),s.jsx("span",{className:"op-live-price",children:d(e.closePrice)})]})]}),s.jsxs("div",{className:"op-hist-meta",children:[s.jsx("span",{className:`op-dir ${e.direction}`,children:e.direction==="buy"?"Buy":"Sell"}),s.jsxs("span",{children:[e.lots," Lots · ",e.multiplier,"×"]}),e.closeReason&&e.closeReason!=="manual"&&s.jsx("span",{className:`op-close-reason op-cr-${e.closeReason}`,children:e.closeReason.toUpperCase()}),s.jsx("span",{children:v(e.closeTime??e.createdAt)})]})]},n)})]})]}),o&&s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"op-overlay",onClick:()=>z(null)}),s.jsxs("div",{className:"op-detail-sheet",children:[s.jsx("div",{className:"op-detail-handle"}),s.jsx("button",{className:"op-detail-x",onClick:()=>z(null),children:"✕"}),s.jsx("div",{className:"op-detail-heading",children:"Order Details"}),[["Pair",o.symbol],["Direction",o.direction==="buy"?"Buy":"Sell",o.direction],["Order Type",o.orderType==="market"?"Market":"Pending"],["Status",o.status.charAt(0).toUpperCase()+o.status.slice(1)],["Lots",String(o.lots)],["Multiplier",`${o.multiplier}×`],["Margin",`$${(o.margin??0).toFixed(2)}`],["Fee",`$${(o.fee??0).toFixed(5)}`],o.entryPrice?["Open Price",d(o.entryPrice)]:null,o.closePrice?["Close Price",d(o.closePrice)]:null,o.targetPrice?["Trigger Price",d(o.targetPrice)]:null,o.status!=="cancelled"&&o.pnl!=null?["P&L",$(o.pnl),o.pnl>=0?"buy":"sell"]:null,o.takeProfit?["Take Profit",d(o.takeProfit)]:null,o.stopLoss?["Stop Loss",d(o.stopLoss)]:null,o.closeReason?["Close Reason",o.closeReason.toUpperCase()]:null,["Order #",o.orderNumber],["Opened",v(o.openTime??o.createdAt)],o.closeTime?["Closed",v(o.closeTime)]:null].filter(Boolean).map(([e,n,t])=>s.jsxs("div",{className:"op-detail-row",children:[s.jsx("span",{className:"op-detail-label",children:e}),s.jsx("span",{className:`op-detail-val ${t==="buy"?"green":t==="sell"?"red":""}`,children:n})]},e))]})]})]})},le=`
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
  .op-tag-closing   {
    background: rgba(255,140,0,0.15); color: #ff8c00;
    animation: opClosingPulse 1.5s ease-in-out infinite;
  }
  @keyframes opClosingPulse { 0%,100%{opacity:1} 50%{opacity:0.5} }

  /* Closing order card */
  .op-card-closing { border-left: 3px solid #ff8c00 !important; }

  /* Injected / animated price */
  .op-price-injected { color: #ff8c00 !important; }

  /* Target close price label */
  .op-target-arrow { font-size: 12px; color: #aaa; margin-left: 4px; }
  .op-close-target { font-weight: 700; }
  .op-close-target.green { color: #36c836; }
  .op-close-target.red   { color: #e03030; }

  /* Closing progress bar */
  .op-closing-bar {
    display: flex; align-items: center; gap: 7px;
    background: rgba(255,140,0,0.07); border-radius: 6px;
    padding: 6px 10px; margin: 4px 0;
  }
  .op-closing-pulse {
    width: 8px; height: 8px; border-radius: 50%; background: #ff8c00; flex-shrink: 0;
    animation: opClosingPulse 1.2s ease-in-out infinite;
  }
  .op-closing-label { font-size: 12px; color: #ff8c00; font-weight: 600; }

  /* Closing chip (replaces Close button) */
  .op-closing-chip {
    display: flex; align-items: center; gap: 5px;
    font-size: 12px; font-weight: 700; color: #ff8c00;
    background: rgba(255,140,0,0.1); border-radius: 8px;
    padding: 8px 14px;
  }
  .op-closing-dot {
    width: 7px; height: 7px; border-radius: 50%; background: #ff8c00;
    animation: opClosingPulse 1.2s ease-in-out infinite;
  }

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
`;export{pe as default};
