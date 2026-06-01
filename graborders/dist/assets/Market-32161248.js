import{i as f,j as e,L as j}from"./index-8e1efb76.js";import{P as w,g as v,a as N}from"./wsUrl-25d72a6f.js";const S=`
  :root {
    --green: #36f936;
    --red:   #ff4d4d;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: #f5f7fa;
    color: #333;
    line-height: 1.6;
    overflow-x: hidden;
  }

  .market-page {
    max-width: 400px;
    margin: 0 auto;
    position: relative;
    min-height: 100vh;
    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
  }

  .market-header {
    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
    min-height: 60px;
    position: relative;
    padding: 20px;
  }

  .nav-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .page-title {
    color: white;
    font-size: 17px;
    font-weight: 600;
  }

  .content-card {
    background: white;
    border-radius: 40px 40px 0 0;
    padding: 24px 16px 100px;
    box-shadow: 0 -5px 20px rgba(0,0,0,0.05);
    min-height: calc(100vh - 60px);
  }

  .market-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  /* Skeleton */
  .skeleton-row {
    border-radius: 8px;
    padding: 10px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation: shimmer 1.4s infinite linear;
    background: linear-gradient(90deg, #f0f2f5 25%, #e5e8ec 50%, #f0f2f5 75%);
    background-size: 200% 100%;
  }

  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }

  .skeleton-left  { display: flex; align-items: center; gap: 10px; flex: 1; }
  .skeleton-flags { width: 34px; height: 26px; border-radius: 4px; background: #e0e3e8; }
  .skeleton-symbol { width: 90px; height: 12px; border-radius: 6px; background: #e0e3e8; }
  .skeleton-right { display: flex; align-items: center; gap: 10px; }
  .skeleton-price  { width: 65px; height: 12px; border-radius: 6px; background: #e0e3e8; }
  .skeleton-change { width: 55px; height: 12px; border-radius: 6px; background: #e0e3e8; }

  /* Row */
  .row-link { text-decoration: none; color: inherit; display: block; }

  .currency-row {
    background: #f8f9fb;
    border-radius: 8px;
    padding: 8px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 0.15s, transform 0.1s;
    border: 1px solid #edeef1;
  }

  .currency-row:hover { background: #f0f2f5; transform: translateY(-1px); }

  .left-section  { display: flex; align-items: center; gap: 10px; }
  .right-section { display: flex; align-items: center; gap: 10px; }

  .symbol-name {
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
    white-space: nowrap;
  }

  .price-value {
    font-size: 13px;
    font-weight: 600;
    color: #1a1a1a;
    white-space: nowrap;
    min-width: 72px;
    text-align: right;
  }

  .change-percent {
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 2px;
    min-width: 58px;
    justify-content: flex-end;
  }

  .arrow { font-size: 10px; line-height: 1; }
  .green { color: var(--green); }
  .red   { color: var(--red); }

  @media (max-width: 380px) {
    .market-header { padding: 16px; min-height: 50px; }
    .content-card  { padding: 20px 12px 100px; }
  }

  @media (min-width: 768px) {
    .content-card { border-radius: 30px 30px 0 0; }
  }
`,y=n=>`~m~${n.length}~m~${n}`;function O(n){const i=[];let t=n;for(;t.length>0&&t.startsWith("~m~");){const l=t.indexOf("~m~",3),r=parseInt(t.substring(3,l)),s=t.substring(l+3,l+3+r);i.push(s),t=t.substring(l+3+r)}return i}function z(n){try{return JSON.parse(n.replace(/^=\{/,"{")).symbol||"UNKNOWN"}catch{return n}}function R(){const[n,i]=f.useState({}),t=f.useRef(null),l=f.useRef(null),r=f.useCallback(()=>{t.current&&(t.current.close(),t.current=null);const s=new WebSocket(v());t.current=s,s.onopen=()=>{const o="qs_"+Math.random().toString(36).substring(2,12);s.send(y(JSON.stringify({m:"quote_create_session",p:[o]}))),s.send(y(JSON.stringify({m:"quote_set_fields",p:[o,"lp","ask","bid","chp"]}))),s.send(y(JSON.stringify({m:"quote_add_symbols",p:[o,...w.map(a=>a.symbol)]})))},s.onmessage=o=>{const a=o.data;if(a.startsWith("~h~")){s.send(a);return}O(a).forEach(p=>{try{const h=JSON.parse(p);if(h.m!=="qsd")return;const u=h.p[1],m=z(u.n),c=u.v;if(!c)return;let x=null;typeof c.lp=="number"&&c.lp>0?x=c.lp:typeof c.ask=="number"&&typeof c.bid=="number"&&c.ask>0&&c.bid>0&&(x=(c.ask+c.bid)/2);const g=typeof c.chp=="number"?c.chp:null;if(x===null&&g===null)return;i(b=>{const d=b[m],k={price:x!==null?x:(d==null?void 0:d.price)??null,chp:g!==null?g:(d==null?void 0:d.chp)??null};return d&&d.price===k.price&&d.chp===k.chp?b:{...b,[m]:k}})}catch{}})},s.onclose=o=>{o.wasClean||(l.current=setTimeout(r,3e3))},s.onerror=()=>{}},[]);return f.useEffect(()=>(r(),()=>{var s;l.current&&clearTimeout(l.current),(s=t.current)==null||s.close()}),[r]),n}function D(n){return n===null?"—":n>=1e4?n.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):n>=100?n.toFixed(2):n>=10?n.toFixed(3):n.toFixed(5)}function I(n){return n===null?"—":`${n>=0?"+":""}${n.toFixed(2)}%`}const F=()=>e.jsxs("div",{className:"skeleton-row",children:[e.jsxs("div",{className:"skeleton-left",children:[e.jsx("div",{className:"skeleton-flags"}),e.jsx("div",{className:"skeleton-symbol"})]}),e.jsxs("div",{className:"skeleton-right",children:[e.jsx("div",{className:"skeleton-price"}),e.jsx("div",{className:"skeleton-change"})]})]}),W=({pair:n,data:i,injectedPrice:t})=>{const l=(i==null?void 0:i.price)??null,r=t??l,s=t==null?(i==null?void 0:i.chp)??null:null,o=(s??0)>=0,a=t!=null;return e.jsx(j,{to:`/market/detail/${n.symbol}`,className:"row-link",children:e.jsxs("div",{className:"currency-row",children:[e.jsxs("div",{className:"left-section",children:[e.jsx(N,{pair:n,size:"sm"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:1},children:[e.jsx("span",{className:"symbol-name",children:n.name}),a&&e.jsx("span",{style:{fontSize:9,fontWeight:700,color:"#ff8c00",letterSpacing:"0.4px",lineHeight:1},children:"● CLOSING"})]})]}),e.jsxs("div",{className:"right-section",children:[e.jsx("span",{className:"price-value",style:{color:a?"#ff8c00":void 0},children:D(r)}),a?e.jsx("span",{style:{fontSize:11,color:"#ff8c00",fontWeight:600},children:"…"}):e.jsxs("span",{className:`change-percent ${o?"green":"red"}`,children:[e.jsx("span",{className:"arrow",children:o?"▲":"▼"}),I(s)]})]})]})})},P=()=>{const n=R(),i=Object.keys(n).length>0,[t,l]=f.useState({});return f.useEffect(()=>{const r=()=>{const o={};try{for(let a=0;a<localStorage.length;a++){const p=localStorage.key(a);if(!(p!=null&&p.startsWith("lcp_")))continue;const h=p.substring(4),u=localStorage.getItem(p);if(!u)continue;const m=JSON.parse(u);Date.now()-m.ts<8e3&&(o[h]=m.p)}}catch{}l(o)};r();const s=setInterval(r,2e3);return()=>clearInterval(s)},[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:S}),e.jsxs("div",{className:"market-page",children:[e.jsx("div",{className:"market-header",children:e.jsx("div",{className:"nav-bar",children:e.jsx("div",{className:"page-title",children:"Market"})})}),e.jsx("div",{className:"content-card",children:e.jsx("div",{className:"market-container",children:w.map(r=>i?e.jsx(W,{pair:r,data:n[r.symbol],injectedPrice:t[r.symbol]??null},r.symbol):e.jsx(F,{},r.symbol))})})]})]})};export{P as default};
