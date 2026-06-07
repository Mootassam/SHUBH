import{t as re,F as ce,as as oe,j as i,n as t,G as le,E as m}from"./index-b20680d3.js";import{C as de}from"./CustomTradingChart-90ffd54f.js";import{u as ue,c as me,g as pe,P as he,a as xe,b as fe}from"./useSymbolInjections-b8b989e1.js";import{C as be}from"./CoinSelectorSidebar-27ee1d27.js";function ge(){const C=ce(),{id:O}=oe(),f=i.useRef(null),$=i.useRef(null),y=i.useRef(null),P=i.useRef(null),z=i.useRef(O||"EURUSD"),[q,I]=i.useState([]),[p,F]=i.useState(null),[Z,T]=i.useState(null),k=i.useRef({}),[r,ee]=i.useState(O||"EURUSD"),[b,L]=i.useState(null),[X,W]=i.useState([]),[v,G]=i.useState("orderBook"),[_,A]=i.useState(!1),[Ne,H]=i.useState(!0),n=ue()[r]??null,[,te]=i.useState(0);i.useEffect(()=>{const e=setInterval(()=>te(s=>s+1),1e3);return()=>clearInterval(e)},[]);const E=n?me(n):null,se=i.useMemo(()=>n?{symbol:n.symbol,entryPrice:n.entryPrice,targetPrice:n.targetPrice,startedAt:n.startedAt,durationMs:n.durationMs,seed:n.seed}:null,[n==null?void 0:n.symbol,n==null?void 0:n.startedAt,n==null?void 0:n.targetPrice,n==null?void 0:n.durationMs,n==null?void 0:n.entryPrice,n==null?void 0:n.seed]);i.useEffect(()=>{z.current=r},[r]);const g=i.useCallback(e=>`~m~${e.length}~m~${e}`,[]),J=i.useCallback(e=>{const s=[];let a=e;for(;a.length>0&&a.startsWith("~m~");){const o=a.indexOf("~m~",3),u=parseInt(a.substring(3,o)),d=a.substring(o+3,o+3+u);s.push(d),a=a.substring(o+3+u)}return s},[]),K=i.useCallback(e=>{try{const s=e.replace(/^=\{/,"{");return JSON.parse(s).symbol||"UNKNOWN"}catch{return e}},[]),j=i.useCallback(e=>{const s=f.current,a=$.current;!s||s.readyState!==WebSocket.OPEN||!a||y.current!==e&&(y.current&&s.send(g(JSON.stringify({m:"quote_remove_symbols",p:[a,y.current]}))),s.send(g(JSON.stringify({m:"quote_add_symbols",p:[a,e]}))),y.current=e,I([]),F(null),T(null),H(!0),delete k.current[e])},[g]),R=i.useCallback(()=>{f.current&&(f.current.close(),f.current=null);const e=new WebSocket(pe());f.current=e,e.onopen=()=>{const s="qs_"+Math.random().toString(36).substring(2,12);$.current=s,e.send(g(JSON.stringify({m:"quote_create_session",p:[s]}))),e.send(g(JSON.stringify({m:"quote_set_fields",p:[s,"ask","bid"]}))),j(z.current)},e.onmessage=s=>{const a=s.data;if(a.startsWith("~h~")){e.send(a);return}J(a).forEach(u=>{try{const d=JSON.parse(u);if(d.m==="qsd"){const c=d.p[1],l=K(c.n),h=c.v;if(!h)return;const x={symbol:l,ask:h.ask??0,bid:h.bid??0};I(B=>[...B.filter(ne=>ne.symbol!==l),x])}}catch{}})},e.onclose=s=>{y.current=null,s.wasClean||(P.current=setTimeout(()=>{R()},3e3))},e.onerror=s=>{console.error("WebSocket error:",s)}},[g,J,K,j]);i.useEffect(()=>(R(),()=>{P.current&&clearTimeout(P.current),f.current&&(f.current.close(),f.current=null)}),[R]),i.useEffect(()=>{j(r)},[r,j]),i.useEffect(()=>{const e=q.find(a=>a.symbol===r);if(!e||!e.ask||!e.bid)return;const s=(e.ask+e.bid)/2;if(F(s),H(!1),k.current[r]===void 0)k.current[r]=s,T(0);else{const a=k.current[r],o=(s-a)/a*100;T(o)}},[q,r]);const N=i.useCallback(e=>["XAUUSD","XAUEUR","XAUGBP"].includes(e)||["XAGUSD","XAGEUR","XAGGBP"].includes(e)||["XPTUSD","XPTEUR"].includes(e)||["XPDUSD"].includes(e)||["USOIL","UKOIL","BRENT","WTI","CRUDE"].includes(e)?2:["NGAS","HEAT","GAS"].includes(e)?3:["BTCUSD","ETHUSD"].includes(e)?2:["XRPUSD","ADAUSD","DOGEUSD","MATICUSD","UNIUSD","THETAUSD","CHZUSD","APEUSD"].includes(e)?4:["LTCUSD","BCHUSD","FILUSD","AXSUSD","SANDUSD","MANAUSD","ENJUSD"].includes(e)||["DOTUSD","AVAXUSD","LINKUSD","ATOMUSD","NEARUSD"].includes(e)?2:["ALGOUSD","VETUSD"].includes(e)?4:["US30","US500","NAS100","US2000","GER40","UK100","FRA40","EU50","JP225","HK50","AUS200","TWII","KR100","IN50","TECH100"].includes(e)?0:e.endsWith("JPY")?3:e.includes("USD")&&!e.startsWith("USD")?5:2,[]),w=i.useCallback((e,s)=>{if(e===null||isNaN(e))return"0.00000";const a=s?N(s):5;return e.toFixed(a)},[N]),M=i.useCallback(e=>e===null||isNaN(e)?"0.00":e>=1e6?(e/1e6).toFixed(2)+"M":e>=1e3?(e/1e3).toFixed(2)+"K":e.toFixed(2),[]),D=i.useCallback((e,s)=>{const a=N(s),o=e*2e-4,u=[],d=[];for(let c=1;c<=10;c++){const l=e-o*c*(.5+Math.random()*.5),h=e+o*c*(.5+Math.random()*.5),x=Math.random()*1e6+5e5;u.push([Number(l.toFixed(a)),Number(x.toFixed(2))]),d.push([Number(h.toFixed(a)),Number(x.toFixed(2))])}return u.sort((c,l)=>l[0]-c[0]),d.sort((c,l)=>c[0]-l[0]),{lastUpdateId:Date.now(),bids:u,asks:d}},[N]),U=i.useCallback((e,s,a=10)=>{const o=[],u=N(s),d=Date.now();for(let c=0;c<a;c++){const l=Math.random()>.5?"buy":"sell",h=(Math.random()*2-1)*1e-4*e,x=e+h,B=Math.random()*1e5+5e4;o.push({id:`${d-c*1e3}-${c}`,price:Number(x.toFixed(u)),quantity:Number(B.toFixed(2)),time:d-c*1e3,side:l})}return o.sort((c,l)=>l.time-c.time)},[N]);i.useEffect(()=>{if(p===null)return;const e=setInterval(()=>{L(D(p,r)),W(U(p,r,10))},2e3);return()=>clearInterval(e)},[p,r,D,U]),i.useEffect(()=>{p!==null&&(L(D(p,r)),W(U(p,r,10)))},[p,r,D,U]);const ae=he.map(e=>({symbol:e.symbol,name:e.name}));i.useCallback(()=>C.goBack(),[C]);const ie=e=>{if(e===r){A(!1);return}ee(e),C.push(`/market/detail/${e}`)},V=()=>A(e=>!e),Q=i.useMemo(()=>xe(r)||{symbol:r,name:r.replace(/(.{3})(.{3})/,"$1 / $2")},[r]),S=({width:e="100%",height:s="1em"})=>t.jsx("div",{className:"loading-placeholder",style:{width:e,height:s}}),Y=i.useMemo(()=>{if(!b||!b.bids.length||!b.asks.length)return{buySide:[],sellSide:[]};const e=o=>{if(!o.length)return[];const u=o.map(l=>l[1]),d=Math.max(...u),c=Math.min(...u);return o.slice(0,10).map(l=>{const h=l[1];let x=d>c?(h-c)/(d-c)*100:0;return x=Math.max(x,10),{amount:M(h),price:w(l[0],r),intensity:Math.min(x,95)}})},s=e(b.bids),a=e(b.asks);for(;s.length<10;)s.push({amount:"0.00",price:"0.00000",intensity:10});for(;a.length<10;)a.push({amount:"0.00",price:"0.00000",intensity:10});return{buySide:s,sellSide:a}},[b,r,w,M]);return t.jsxs("div",{className:"market-detail-container",children:[t.jsx("div",{className:"header",children:t.jsxs("div",{className:"nav-bar",children:[t.jsx(le,{className:"back-arrow",to:"/market",children:t.jsx("i",{className:"fas fa-arrow-left"})}),t.jsxs("div",{className:"trading-pair",onClick:V,children:[t.jsx(fe,{pair:Q,size:"sm"}),Q.name,t.jsx("i",{className:`fas fa-chevron-down dropdown-arrow ${_?"rotate":""}`})]}),t.jsx("div",{className:"header-icon",onClick:V,children:t.jsx("i",{className:"fas fa-bars"})})]})}),t.jsxs("div",{className:"content-card",children:[(()=>{const e=E??p,s=n&&E!=null?(E-n.entryPrice)/n.entryPrice*100:null,a=s??Z,o=a!==null&&a<0;return t.jsx("div",{className:"price-section",children:t.jsx("div",{className:"price-main-row",children:t.jsxs("div",{className:"price-left-section",children:[t.jsx("div",{className:"current-price",children:e!==null?t.jsx("span",{style:{color:o?"#f56c6c":"#37b66a"},children:w(e,r)}):t.jsx(S,{width:"120px",height:"28px"})}),t.jsxs("div",{className:"price-info-row",children:[t.jsx("div",{className:"usd-price",children:e!==null?`$${e.toFixed(2)}`:"$0.00"}),t.jsx("div",{className:"price-change",style:{color:o?"#f56c6c":"#37b66a"},children:a!==null?`${a<0?"−":"+"}${Math.abs(a).toFixed(2)}%`:t.jsx(S,{width:"60px",height:"16px"})})]})]})})})})(),t.jsx("div",{className:"chart-section",children:t.jsx(de,{symbol:r,livePrice:p,height:400,priceInjection:se},r)}),t.jsxs("div",{className:"tabs-section",children:[t.jsxs("div",{className:"tabs-header",children:[t.jsx("div",{className:`tab ${v==="orderBook"?"active":""}`,onClick:()=>G("orderBook"),children:m("pages.marketDetail.tabs.orderBook")}),t.jsx("div",{className:`tab ${v==="transactions"?"active":""}`,onClick:()=>G("transactions"),children:m("pages.marketDetail.tabs.transactions")})]}),t.jsxs("div",{className:"tab-content",children:[v==="orderBook"&&t.jsx("div",{className:"modern-order-book",children:t.jsxs("div",{className:"order-book-table",children:[t.jsxs("div",{className:"table-header",children:[t.jsxs("div",{className:"buy-section",children:[t.jsx("div",{className:"column-header",children:m("pages.marketDetail.orderBook.buy")}),t.jsx("div",{className:"column-header",children:m("pages.marketDetail.orderBook.quantity")}),t.jsx("div",{className:"column-header",children:m("pages.marketDetail.orderBook.price")})]}),t.jsxs("div",{className:"sell-section",children:[t.jsx("div",{className:"column-header",children:m("pages.marketDetail.orderBook.price")}),t.jsx("div",{className:"column-header",children:m("pages.marketDetail.orderBook.quantity")}),t.jsx("div",{className:"column-header",style:{textAlign:"right"},children:m("pages.marketDetail.orderBook.sell")})]})]}),t.jsx("div",{className:"table-body",children:Y.buySide.map((e,s)=>{const a=Y.sellSide[s]||{amount:"0.00",price:"0.00000",intensity:10};return t.jsxs("div",{className:"table-row",children:[t.jsxs("div",{className:"buy-section",children:[t.jsx("div",{className:"cell buy-cell",children:s+1}),t.jsx("div",{className:"cell quantity",children:e.amount}),t.jsxs("div",{className:"cell price-cell",children:[t.jsx("div",{className:"heatmap-bar buy-heatmap",style:{width:`${e.intensity}%`}}),t.jsx("span",{className:"price-value buy-price",children:e.price})]})]}),t.jsxs("div",{className:"sell-section",children:[t.jsxs("div",{className:"cell price-cell",children:[t.jsx("div",{className:"heatmap-bar sell-heatmap",style:{width:`${a.intensity}%`}}),t.jsx("span",{className:"price-value sell-price",children:a.price})]}),t.jsx("div",{className:"cell quantity",children:a.amount}),t.jsx("div",{className:"cell sell-cell",children:s+1})]})]},s)})})]})}),v==="transactions"&&t.jsxs("div",{className:"transactions-container",children:[t.jsxs("div",{className:"transactions-header",children:[t.jsx("div",{className:"header-item",children:m("pages.marketDetail.recentTrades.time")}),t.jsx("div",{className:"header-item",children:m("pages.marketDetail.recentTrades.price")}),t.jsx("div",{className:"header-item",children:m("pages.marketDetail.recentTrades.amount")})]}),t.jsx("div",{className:"transactions-list",children:X.length>0?X.slice(0,10).map(e=>t.jsxs("div",{className:"transaction-item",children:[t.jsx("div",{className:"transaction-time",children:new Date(e.time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}),t.jsx("div",{className:`transaction-price ${e.side==="buy"?"buy":"sell"}`,children:w(e.price,r)}),t.jsx("div",{className:"transaction-amount",children:M(e.quantity)})]},e.id)):Array.from({length:5}).map((e,s)=>t.jsxs("div",{className:"transaction-item",children:[t.jsx("div",{className:"transaction-time",children:t.jsx(S,{width:"50px",height:"14px"})}),t.jsx("div",{className:"transaction-price",children:t.jsx(S,{width:"60px",height:"14px"})}),t.jsx("div",{className:"transaction-amount",children:t.jsx(S,{width:"50px",height:"14px"})})]},s))})]})]})]})]}),t.jsx(be,{isOpen:_,onClose:()=>A(!1),selectedCoin:r,onCoinSelect:ie,availableCoins:ae,title:m("pages.marketDetail.coinSelector.title")}),t.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        body {
          background-color: #f5f7fa;
          color: #333;
          line-height: 1.6;
          overflow-x: hidden;
        }

        .market-detail-container {
          
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header – identical to LoginPassword */
        .header {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          min-height: 60px;
          position: relative;
          padding: 20px;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          color: white;
          font-size: 20px;
          font-weight: 300;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }

        .back-arrow:hover {
          opacity: 0.8;
        }

        .trading-pair {
          color: white;
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .trading-pair:hover {
          opacity: 0.9;
        }

        .dropdown-arrow {
          font-size: 14px;
          transition: transform 0.2s;
        }

        .dropdown-arrow.rotate {
          transform: rotate(180deg);
        }

        .header-icon {
          color: white;
          font-size: 20px;
          cursor: pointer;
        }

        .header-icon:hover {
          opacity: 0.8;
        }

        /* Content Card – white, rounded top, same as LoginPassword */
        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 30px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        /* Price Section */
        .price-section {
          margin-bottom: 20px;
        }

        .price-main-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .price-left-section {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .current-price {
          font-size: 28px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .price-info-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .usd-price {
          font-size: 14px;
          color: #888;
        }

        .price-change {
          font-size: 14px;
          font-weight: 500;
        }

        /* Chart Section */
        .chart-section {
          margin-bottom: 20px;
          background-color: #fff;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #e7eaee;
        }

        /* Tabs Section */
        .tabs-section {
          background-color: #fff;
          border-radius: 12px;
          border: 1px solid #e7eaee;
          overflow: hidden;
        }

        .tabs-header {
          display: flex;
          border-bottom: 1px solid #e7eaee;
        }

        .tab {
          flex: 1;
          padding: 12px;
          text-align: center;
          font-size: 13px;
          font-weight: 500;
          color: #888;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab.active {
          color: #106cf5;
          border-bottom: 2px solid #106cf5;
          font-weight: 600;
        }

        .tab:hover:not(.active) {
          color: #333;
        }

        .tab-content {
          padding: 16px;
        }

        /* Order Book */
        .modern-order-book {
          width: 100%;
        }

        .order-book-table {
          display: flex;
          flex-direction: column;
        }

        .table-header {
          display: flex;
          margin-bottom: 8px;
          font-size: 11px;
          color: #888;
          font-weight: 500;
        }

        .buy-section {
          flex: 1;
          display: flex;
          gap: 8px;
        }

        .sell-section {
          flex: 1;
          display: flex;
          gap: 8px;
        }

        .column-header {
          flex: 1;
          text-align: left;
        }

        .table-body {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .table-row {
          display: flex;
          align-items: center;
          font-size: 12px;
        }

        .cell {
          flex: 1;
          text-align: left;
          padding: 4px 0;
          color: #333;
        }

        .price-cell {
          position: relative;
          display: flex;
          align-items: center;
        }

        .heatmap-bar {
          position: absolute;
          left: 0;
          height: 100%;
          opacity: 0.12;
          z-index: 0;
          border-radius: 2px;
        }

        .buy-heatmap {
          background-color: #37b66a;
        }

        .sell-heatmap {
          background-color: #f56c6c;
        }

        .price-value {
          position: relative;
          z-index: 1;
        }

        .buy-price {
          color: #37b66a;
        }

        .sell-price {
          color: #f56c6c;
        }

        .buy-cell, .sell-cell {
          color: #888;
          font-size: 11px;
        }

        .quantity {
          color: #555;
        }

        /* Transactions */
        .transactions-container {
          width: 100%;
        }

        .transactions-header {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 11px;
          color: #888;
          border-bottom: 1px solid #e7eaee;
          margin-bottom: 8px;
        }

        .header-item {
          flex: 1;
          text-align: left;
        }

        .transactions-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .transaction-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 12px;
          border-bottom: 1px solid #f0f2f5;
        }

        .transaction-time {
          flex: 1;
          color: #888;
        }

        .transaction-price {
          flex: 1;
          font-weight: 500;
        }

        .transaction-price.buy {
          color: #37b66a;
        }

        .transaction-price.sell {
          color: #f56c6c;
        }

        .transaction-amount {
          flex: 1;
          text-align: right;
          color: #333;
        }

        /* Loading Placeholder */
        .loading-placeholder {
          animation: pulse 1.5s ease-in-out infinite;
          background-color: #e9ebef;
          border-radius: 4px;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        /* Responsive */
        @media (max-width: 380px) {
          .header {
            padding: 16px;
            min-height: 50px;
          }
          .content-card {
            padding: 25px 16px 100px;
          }
          .current-price {
            font-size: 24px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }
        }
      `})]})}const De=re.memo(ge);export{De as default};
