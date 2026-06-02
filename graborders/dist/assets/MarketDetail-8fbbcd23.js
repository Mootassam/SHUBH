import{R as ie,u as ne,ak as re,i,j as t,L as ce,n as p}from"./index-71178c99.js";import{C as oe}from"./CustomTradingChart-2d73da5e.js";import{C as le}from"./CoinSelectorSidebar-ca0fb084.js";import{g as de,P as ue,b as pe,a as me}from"./wsUrl-d859e1a0.js";function he(){const R=ne(),{id:O}=re(),x=i.useRef(null),$=i.useRef(null),v=i.useRef(null),T=i.useRef(null),z=i.useRef(O||"EURUSD"),[q,L]=i.useState([]),[d,F]=i.useState(null),[g,A]=i.useState(null),y=i.useRef({}),[n,ee]=i.useState(O||"EURUSD"),[b,W]=i.useState(null),[X,G]=i.useState([]),[j,_]=i.useState("orderBook"),[J,E]=i.useState(!1),[xe,H]=i.useState(!0),[f,w]=i.useState(null);i.useEffect(()=>{const e=()=>{try{const a=localStorage.getItem(`lcp_${n}`);if(!a){w(null);return}const c=JSON.parse(a);Date.now()-c.ts<8e3?w(c.p):w(null)}catch{w(null)}};e();const s=setInterval(e,2e3);return()=>clearInterval(s)},[n]),i.useEffect(()=>{z.current=n},[n]);const N=i.useCallback(e=>`~m~${e.length}~m~${e}`,[]),K=i.useCallback(e=>{const s=[];let a=e;for(;a.length>0&&a.startsWith("~m~");){const c=a.indexOf("~m~",3),u=parseInt(a.substring(3,c)),l=a.substring(c+3,c+3+u);s.push(l),a=a.substring(c+3+u)}return s},[]),V=i.useCallback(e=>{try{const s=e.replace(/^=\{/,"{");return JSON.parse(s).symbol||"UNKNOWN"}catch{return e}},[]),D=i.useCallback(e=>{const s=x.current,a=$.current;!s||s.readyState!==WebSocket.OPEN||!a||v.current!==e&&(v.current&&s.send(N(JSON.stringify({m:"quote_remove_symbols",p:[a,v.current]}))),s.send(N(JSON.stringify({m:"quote_add_symbols",p:[a,e]}))),v.current=e,L([]),F(null),A(null),H(!0),delete y.current[e])},[N]),I=i.useCallback(()=>{x.current&&(x.current.close(),x.current=null);const e=new WebSocket(de());x.current=e,e.onopen=()=>{const s="qs_"+Math.random().toString(36).substring(2,12);$.current=s,e.send(N(JSON.stringify({m:"quote_create_session",p:[s]}))),e.send(N(JSON.stringify({m:"quote_set_fields",p:[s,"ask","bid"]}))),D(z.current)},e.onmessage=s=>{const a=s.data;if(a.startsWith("~h~")){e.send(a);return}K(a).forEach(u=>{try{const l=JSON.parse(u);if(l.m==="qsd"){const r=l.p[1],o=V(r.n),m=r.v;if(!m)return;const h={symbol:o,ask:m.ask??0,bid:m.bid??0};L(M=>[...M.filter(ae=>ae.symbol!==o),h])}}catch{}})},e.onclose=s=>{v.current=null,s.wasClean||(T.current=setTimeout(()=>{I()},3e3))},e.onerror=s=>{console.error("WebSocket error:",s)}},[N,K,V,D]);i.useEffect(()=>(I(),()=>{T.current&&clearTimeout(T.current),x.current&&(x.current.close(),x.current=null)}),[I]),i.useEffect(()=>{D(n)},[n,D]),i.useEffect(()=>{const e=q.find(a=>a.symbol===n);if(!e||!e.ask||!e.bid)return;const s=(e.ask+e.bid)/2;if(F(s),H(!1),y.current[n]===void 0)y.current[n]=s,A(0);else{const a=y.current[n],c=(s-a)/a*100;A(c)}},[q,n]);const k=i.useCallback(e=>["XAUUSD","XAUEUR","XAUGBP"].includes(e)||["XAGUSD","XAGEUR","XAGGBP"].includes(e)||["XPTUSD","XPTEUR"].includes(e)||["XPDUSD"].includes(e)||["USOIL","UKOIL","BRENT","WTI","CRUDE"].includes(e)?2:["NGAS","HEAT","GAS"].includes(e)?3:["BTCUSD","ETHUSD"].includes(e)?2:["XRPUSD","ADAUSD","DOGEUSD","MATICUSD","UNIUSD","THETAUSD","CHZUSD","APEUSD"].includes(e)?4:["LTCUSD","BCHUSD","FILUSD","AXSUSD","SANDUSD","MANAUSD","ENJUSD"].includes(e)||["DOTUSD","AVAXUSD","LINKUSD","ATOMUSD","NEARUSD"].includes(e)?2:["ALGOUSD","VETUSD"].includes(e)?4:["US30","US500","NAS100","US2000","GER40","UK100","FRA40","EU50","JP225","HK50","AUS200","TWII","KR100","IN50","TECH100"].includes(e)?0:e.endsWith("JPY")?3:e.includes("USD")&&!e.startsWith("USD")?5:2,[]),U=i.useCallback((e,s)=>{if(e===null||isNaN(e))return"0.00000";const a=s?k(s):5;return e.toFixed(a)},[k]),B=i.useCallback(e=>e===null||isNaN(e)?"0.00":e>=1e6?(e/1e6).toFixed(2)+"M":e>=1e3?(e/1e3).toFixed(2)+"K":e.toFixed(2),[]),C=i.useCallback((e,s)=>{const a=k(s),c=e*2e-4,u=[],l=[];for(let r=1;r<=10;r++){const o=e-c*r*(.5+Math.random()*.5),m=e+c*r*(.5+Math.random()*.5),h=Math.random()*1e6+5e5;u.push([Number(o.toFixed(a)),Number(h.toFixed(2))]),l.push([Number(m.toFixed(a)),Number(h.toFixed(2))])}return u.sort((r,o)=>o[0]-r[0]),l.sort((r,o)=>r[0]-o[0]),{lastUpdateId:Date.now(),bids:u,asks:l}},[k]),P=i.useCallback((e,s,a=10)=>{const c=[],u=k(s),l=Date.now();for(let r=0;r<a;r++){const o=Math.random()>.5?"buy":"sell",m=(Math.random()*2-1)*1e-4*e,h=e+m,M=Math.random()*1e5+5e4;c.push({id:`${l-r*1e3}-${r}`,price:Number(h.toFixed(u)),quantity:Number(M.toFixed(2)),time:l-r*1e3,side:o})}return c.sort((r,o)=>o.time-r.time)},[k]);i.useEffect(()=>{if(d===null)return;const e=setInterval(()=>{W(C(d,n)),G(P(d,n,10))},2e3);return()=>clearInterval(e)},[d,n,C,P]),i.useEffect(()=>{d!==null&&(W(C(d,n)),G(P(d,n,10)))},[d,n,C,P]);const te=ue.map(e=>({symbol:e.symbol,name:e.name}));i.useCallback(()=>R.goBack(),[R]);const se=e=>{if(e===n){E(!1);return}ee(e),R.push(`/market/detail/${e}`)},Q=()=>E(e=>!e),Y=i.useMemo(()=>pe(n)||{symbol:n,name:n.replace(/(.{3})(.{3})/,"$1 / $2")},[n]),S=({width:e="100%",height:s="1em"})=>t.jsx("div",{className:"loading-placeholder",style:{width:e,height:s}}),Z=i.useMemo(()=>{if(!b||!b.bids.length||!b.asks.length)return{buySide:[],sellSide:[]};const e=c=>{if(!c.length)return[];const u=c.map(o=>o[1]),l=Math.max(...u),r=Math.min(...u);return c.slice(0,10).map(o=>{const m=o[1];let h=l>r?(m-r)/(l-r)*100:0;return h=Math.max(h,10),{amount:B(m),price:U(o[0],n),intensity:Math.min(h,95)}})},s=e(b.bids),a=e(b.asks);for(;s.length<10;)s.push({amount:"0.00",price:"0.00000",intensity:10});for(;a.length<10;)a.push({amount:"0.00",price:"0.00000",intensity:10});return{buySide:s,sellSide:a}},[b,n,U,B]);return t.jsxs("div",{className:"market-detail-container",children:[t.jsx("div",{className:"header",children:t.jsxs("div",{className:"nav-bar",children:[t.jsx(ce,{className:"back-arrow",to:"/market",children:t.jsx("i",{className:"fas fa-arrow-left"})}),t.jsxs("div",{className:"trading-pair",onClick:Q,children:[t.jsx(me,{pair:Y,size:"sm"}),Y.name,t.jsx("i",{className:`fas fa-chevron-down dropdown-arrow ${J?"rotate":""}`})]}),t.jsx("div",{className:"header-icon",onClick:Q,children:t.jsx("i",{className:"fas fa-bars"})})]})}),t.jsxs("div",{className:"content-card",children:[t.jsx("div",{className:"price-section",children:t.jsx("div",{className:"price-main-row",children:t.jsxs("div",{className:"price-left-section",children:[t.jsx("div",{className:"current-price",children:(f??d)!==null?t.jsx("span",{style:{color:f!=null?"#ff8c00":g!==null&&g<0?"#f56c6c":"#37b66a"},children:U(f??d,n)}):t.jsx(S,{width:"120px",height:"28px"})}),t.jsxs("div",{className:"price-info-row",children:[t.jsx("div",{className:"usd-price",style:{color:f!=null?"#ff8c00":void 0},children:(f??d)!==null?`$${(f??d).toFixed(2)}`:"$0.00"}),f!=null?t.jsxs("div",{style:{fontSize:12,fontWeight:700,color:"#ff8c00",background:"rgba(255,140,0,0.1)",borderRadius:5,padding:"2px 8px",display:"flex",alignItems:"center",gap:4},children:[t.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:"#ff8c00",display:"inline-block",animation:"mdPulse 1.2s infinite"}}),"CLOSING"]}):t.jsx("div",{className:"price-change",style:{color:g!==null&&g<0?"#f56c6c":"#37b66a"},children:g!==null?`${g<0?"−":"+"}${Math.abs(g).toFixed(2)}%`:t.jsx(S,{width:"60px",height:"16px"})})]})]})})}),t.jsx("div",{className:"chart-section",children:t.jsx(oe,{symbol:n,livePrice:f??d,height:400},n)}),t.jsx("style",{children:"@keyframes mdPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }"}),t.jsxs("div",{className:"tabs-section",children:[t.jsxs("div",{className:"tabs-header",children:[t.jsx("div",{className:`tab ${j==="orderBook"?"active":""}`,onClick:()=>_("orderBook"),children:p("pages.marketDetail.tabs.orderBook")}),t.jsx("div",{className:`tab ${j==="transactions"?"active":""}`,onClick:()=>_("transactions"),children:p("pages.marketDetail.tabs.transactions")})]}),t.jsxs("div",{className:"tab-content",children:[j==="orderBook"&&t.jsx("div",{className:"modern-order-book",children:t.jsxs("div",{className:"order-book-table",children:[t.jsxs("div",{className:"table-header",children:[t.jsxs("div",{className:"buy-section",children:[t.jsx("div",{className:"column-header",children:p("pages.marketDetail.orderBook.buy")}),t.jsx("div",{className:"column-header",children:p("pages.marketDetail.orderBook.quantity")}),t.jsx("div",{className:"column-header",children:p("pages.marketDetail.orderBook.price")})]}),t.jsxs("div",{className:"sell-section",children:[t.jsx("div",{className:"column-header",children:p("pages.marketDetail.orderBook.price")}),t.jsx("div",{className:"column-header",children:p("pages.marketDetail.orderBook.quantity")}),t.jsx("div",{className:"column-header",style:{textAlign:"right"},children:p("pages.marketDetail.orderBook.sell")})]})]}),t.jsx("div",{className:"table-body",children:Z.buySide.map((e,s)=>{const a=Z.sellSide[s]||{amount:"0.00",price:"0.00000",intensity:10};return t.jsxs("div",{className:"table-row",children:[t.jsxs("div",{className:"buy-section",children:[t.jsx("div",{className:"cell buy-cell",children:s+1}),t.jsx("div",{className:"cell quantity",children:e.amount}),t.jsxs("div",{className:"cell price-cell",children:[t.jsx("div",{className:"heatmap-bar buy-heatmap",style:{width:`${e.intensity}%`}}),t.jsx("span",{className:"price-value buy-price",children:e.price})]})]}),t.jsxs("div",{className:"sell-section",children:[t.jsxs("div",{className:"cell price-cell",children:[t.jsx("div",{className:"heatmap-bar sell-heatmap",style:{width:`${a.intensity}%`}}),t.jsx("span",{className:"price-value sell-price",children:a.price})]}),t.jsx("div",{className:"cell quantity",children:a.amount}),t.jsx("div",{className:"cell sell-cell",children:s+1})]})]},s)})})]})}),j==="transactions"&&t.jsxs("div",{className:"transactions-container",children:[t.jsxs("div",{className:"transactions-header",children:[t.jsx("div",{className:"header-item",children:p("pages.marketDetail.recentTrades.time")}),t.jsx("div",{className:"header-item",children:p("pages.marketDetail.recentTrades.price")}),t.jsx("div",{className:"header-item",children:p("pages.marketDetail.recentTrades.amount")})]}),t.jsx("div",{className:"transactions-list",children:X.length>0?X.slice(0,10).map(e=>t.jsxs("div",{className:"transaction-item",children:[t.jsx("div",{className:"transaction-time",children:new Date(e.time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}),t.jsx("div",{className:`transaction-price ${e.side==="buy"?"buy":"sell"}`,children:U(e.price,n)}),t.jsx("div",{className:"transaction-amount",children:B(e.quantity)})]},e.id)):Array.from({length:5}).map((e,s)=>t.jsxs("div",{className:"transaction-item",children:[t.jsx("div",{className:"transaction-time",children:t.jsx(S,{width:"50px",height:"14px"})}),t.jsx("div",{className:"transaction-price",children:t.jsx(S,{width:"60px",height:"14px"})}),t.jsx("div",{className:"transaction-amount",children:t.jsx(S,{width:"50px",height:"14px"})})]},s))})]})]})]})]}),t.jsx(le,{isOpen:J,onClose:()=>E(!1),selectedCoin:n,onCoinSelect:se,availableCoins:te,title:p("pages.marketDetail.coinSelector.title")}),t.jsx("style",{children:`
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
          max-width: 400px;
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
      `})]})}const ve=ie.memo(he);export{ve as default};
