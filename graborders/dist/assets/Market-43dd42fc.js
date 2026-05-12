import{j as n,i as m,L as j}from"./index-ac60ec8a.js";import{P as y,a as v}from"./pairConfig-17143209.js";const N=`
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
`,h=e=>`~m~${e.length}~m~${e}`;function S(e){const s=[];let t=e;for(;t.length>0&&t.startsWith("~m~");){const a=t.indexOf("~m~",3),o=parseInt(t.substring(3,a)),r=t.substr(a+3,o);s.push(r),t=t.substr(a+3+o)}return s}function R(e){try{return JSON.parse(e.replace(/^=\{/,"{")).symbol||"UNKNOWN"}catch{return e}}function O(){const[e,s]=m.useState({}),t=m.useRef(null),a=m.useRef(null),o=m.useCallback(()=>{t.current&&(t.current.close(),t.current=null);const r=new WebSocket("wss://widgetdata.tradingview.com/socket.io/websocket");t.current=r,r.onopen=()=>{const l="qs_"+Math.random().toString(36).substring(2,12);r.send(h(JSON.stringify({m:"quote_create_session",p:[l]}))),r.send(h(JSON.stringify({m:"quote_set_fields",p:[l,"lp","ask","bid","chp"]}))),r.send(h(JSON.stringify({m:"quote_add_symbols",p:[l,...y.map(d=>d.symbol)]})))},r.onmessage=l=>{const d=l.data;if(d.startsWith("~h~")){r.send(d);return}S(d).forEach(w=>{try{const g=JSON.parse(w);if(g.m!=="qsd")return;const b=g.p[1],k=R(b.n),i=b.v;if(!i)return;let p=null;typeof i.lp=="number"&&i.lp>0?p=i.lp:typeof i.ask=="number"&&typeof i.bid=="number"&&i.ask>0&&i.bid>0&&(p=(i.ask+i.bid)/2);const x=typeof i.chp=="number"?i.chp:null;if(p===null&&x===null)return;s(u=>{const c=u[k],f={price:p!==null?p:(c==null?void 0:c.price)??null,chp:x!==null?x:(c==null?void 0:c.chp)??null};return c&&c.price===f.price&&c.chp===f.chp?u:{...u,[k]:f}})}catch{}})},r.onclose=l=>{l.wasClean||(a.current=setTimeout(o,3e3))},r.onerror=()=>{}},[]);return m.useEffect(()=>(o(),()=>{var r;a.current&&clearTimeout(a.current),(r=t.current)==null||r.close()}),[o]),e}function z(e){return e===null?"—":e>=1e4?e.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):e>=100?e.toFixed(2):e>=10?e.toFixed(3):e.toFixed(5)}function F(e){return e===null?"—":`${e>=0?"+":""}${e.toFixed(2)}%`}const D=()=>n.jsxs("div",{className:"skeleton-row",children:[n.jsxs("div",{className:"skeleton-left",children:[n.jsx("div",{className:"skeleton-flags"}),n.jsx("div",{className:"skeleton-symbol"})]}),n.jsxs("div",{className:"skeleton-right",children:[n.jsx("div",{className:"skeleton-price"}),n.jsx("div",{className:"skeleton-change"})]})]}),M=({pair:e,data:s})=>{const t=(s==null?void 0:s.price)??null,a=(s==null?void 0:s.chp)??null,o=(a??0)>=0;return n.jsx(j,{to:`/market/detail/${e.symbol}`,className:"row-link",children:n.jsxs("div",{className:"currency-row",children:[n.jsxs("div",{className:"left-section",children:[n.jsx(v,{pair:e,size:"sm"}),n.jsx("span",{className:"symbol-name",children:e.name})]}),n.jsxs("div",{className:"right-section",children:[n.jsx("span",{className:"price-value",children:z(t)}),n.jsxs("span",{className:`change-percent ${o?"green":"red"}`,children:[n.jsx("span",{className:"arrow",children:o?"▲":"▼"}),F(a)]})]})]})})},q=()=>{const e=O(),s=Object.keys(e).length>0;return n.jsxs(n.Fragment,{children:[n.jsx("style",{children:N}),n.jsxs("div",{className:"market-page",children:[n.jsx("div",{className:"market-header",children:n.jsx("div",{className:"nav-bar",children:n.jsx("div",{className:"page-title",children:"Market"})})}),n.jsx("div",{className:"content-card",children:n.jsx("div",{className:"market-container",children:y.map(t=>s?n.jsx(M,{pair:t,data:e[t.symbol]},t.symbol):n.jsx(D,{},t.symbol))})})]})]})};export{q as default};
