import{R as se,u as ae,ak as ie,i,j as t,L as re,n as p}from"./index-83c73f4f.js";import{T as ne}from"./TradingViewChart-75269475.js";import{C as ce}from"./CoinSelectorSidebar-121a76ca.js";import{g as oe,P as le,b as de,a as ue}from"./wsUrl-e82b14b0.js";function pe(){const C=ae(),{id:M}=ie(),x=i.useRef(null),I=i.useRef(null),k=i.useRef(null),T=i.useRef(null),O=i.useRef(M||"EURUSD"),[$,z]=i.useState([]),[u,q]=i.useState(null),[f,P]=i.useState(null),S=i.useRef({}),[r,Y]=i.useState(M||"EURUSD"),[b,F]=i.useState(null),[L,X]=i.useState([]),[j,W]=i.useState("orderBook"),[G,R]=i.useState(!1),[me,_]=i.useState(!0);i.useEffect(()=>{O.current=r},[r]);const g=i.useCallback(e=>`~m~${e.length}~m~${e}`,[]),H=i.useCallback(e=>{const s=[];let a=e;for(;a.length>0&&a.startsWith("~m~");){const c=a.indexOf("~m~",3),d=parseInt(a.substring(3,c)),l=a.substring(c+3,c+3+d);s.push(l),a=a.substring(c+3+d)}return s},[]),J=i.useCallback(e=>{try{const s=e.replace(/^=\{/,"{");return JSON.parse(s).symbol||"UNKNOWN"}catch{return e}},[]),y=i.useCallback(e=>{const s=x.current,a=I.current;!s||s.readyState!==WebSocket.OPEN||!a||k.current!==e&&(k.current&&s.send(g(JSON.stringify({m:"quote_remove_symbols",p:[a,k.current]}))),s.send(g(JSON.stringify({m:"quote_add_symbols",p:[a,e]}))),k.current=e,z([]),q(null),P(null),_(!0),delete S.current[e])},[g]),A=i.useCallback(()=>{x.current&&(x.current.close(),x.current=null);const e=new WebSocket(oe());x.current=e,e.onopen=()=>{const s="qs_"+Math.random().toString(36).substring(2,12);I.current=s,e.send(g(JSON.stringify({m:"quote_create_session",p:[s]}))),e.send(g(JSON.stringify({m:"quote_set_fields",p:[s,"ask","bid"]}))),y(O.current)},e.onmessage=s=>{const a=s.data;if(a.startsWith("~h~")){e.send(a);return}H(a).forEach(d=>{try{const l=JSON.parse(d);if(l.m==="qsd"){const n=l.p[1],o=J(n.n),m=n.v;if(!m)return;const h={symbol:o,ask:m.ask??0,bid:m.bid??0};z(B=>[...B.filter(te=>te.symbol!==o),h])}}catch{}})},e.onclose=s=>{k.current=null,s.wasClean||(T.current=setTimeout(()=>{A()},3e3))},e.onerror=s=>{console.error("WebSocket error:",s)}},[g,H,J,y]);i.useEffect(()=>(A(),()=>{T.current&&clearTimeout(T.current),x.current&&(x.current.close(),x.current=null)}),[A]),i.useEffect(()=>{y(r)},[r,y]),i.useEffect(()=>{const e=$.find(a=>a.symbol===r);if(!e||!e.ask||!e.bid)return;const s=(e.ask+e.bid)/2;if(q(s),_(!1),S.current[r]===void 0)S.current[r]=s,P(0);else{const a=S.current[r],c=(s-a)/a*100;P(c)}},[$,r]);const N=i.useCallback(e=>["XAUUSD","XAUEUR","XAUGBP"].includes(e)||["XAGUSD","XAGEUR","XAGGBP"].includes(e)||["XPTUSD","XPTEUR"].includes(e)||["XPDUSD"].includes(e)||["USOIL","UKOIL","BRENT","WTI","CRUDE"].includes(e)?2:["NGAS","HEAT","GAS"].includes(e)?3:["BTCUSD","ETHUSD"].includes(e)?2:["XRPUSD","ADAUSD","DOGEUSD","MATICUSD","UNIUSD","THETAUSD","CHZUSD","APEUSD"].includes(e)?4:["LTCUSD","BCHUSD","FILUSD","AXSUSD","SANDUSD","MANAUSD","ENJUSD"].includes(e)||["DOTUSD","AVAXUSD","LINKUSD","ATOMUSD","NEARUSD"].includes(e)?2:["ALGOUSD","VETUSD"].includes(e)?4:["US30","US500","NAS100","US2000","GER40","UK100","FRA40","EU50","JP225","HK50","AUS200","TWII","KR100","IN50","TECH100"].includes(e)?0:e.endsWith("JPY")?3:e.includes("USD")&&!e.startsWith("USD")?5:2,[]),w=i.useCallback((e,s)=>{if(e===null||isNaN(e))return"0.00000";const a=s?N(s):5;return e.toFixed(a)},[N]),E=i.useCallback(e=>e===null||isNaN(e)?"0.00":e>=1e6?(e/1e6).toFixed(2)+"M":e>=1e3?(e/1e3).toFixed(2)+"K":e.toFixed(2),[]),D=i.useCallback((e,s)=>{const a=N(s),c=e*2e-4,d=[],l=[];for(let n=1;n<=10;n++){const o=e-c*n*(.5+Math.random()*.5),m=e+c*n*(.5+Math.random()*.5),h=Math.random()*1e6+5e5;d.push([Number(o.toFixed(a)),Number(h.toFixed(2))]),l.push([Number(m.toFixed(a)),Number(h.toFixed(2))])}return d.sort((n,o)=>o[0]-n[0]),l.sort((n,o)=>n[0]-o[0]),{lastUpdateId:Date.now(),bids:d,asks:l}},[N]),U=i.useCallback((e,s,a=10)=>{const c=[],d=N(s),l=Date.now();for(let n=0;n<a;n++){const o=Math.random()>.5?"buy":"sell",m=(Math.random()*2-1)*1e-4*e,h=e+m,B=Math.random()*1e5+5e4;c.push({id:`${l-n*1e3}-${n}`,price:Number(h.toFixed(d)),quantity:Number(B.toFixed(2)),time:l-n*1e3,side:o})}return c.sort((n,o)=>o.time-n.time)},[N]);i.useEffect(()=>{if(u===null)return;const e=setInterval(()=>{F(D(u,r)),X(U(u,r,10))},2e3);return()=>clearInterval(e)},[u,r,D,U]),i.useEffect(()=>{u!==null&&(F(D(u,r)),X(U(u,r,10)))},[u,r,D,U]);const Z=le.map(e=>({symbol:e.symbol,name:e.name}));i.useCallback(()=>C.goBack(),[C]);const ee=e=>{if(e===r){R(!1);return}Y(e),C.push(`/market/detail/${e}`)},K=()=>R(e=>!e),V=i.useMemo(()=>de(r)||{symbol:r,name:r.replace(/(.{3})(.{3})/,"$1 / $2")},[r]),v=({width:e="100%",height:s="1em"})=>t.jsx("div",{className:"loading-placeholder",style:{width:e,height:s}}),Q=i.useMemo(()=>{if(!b||!b.bids.length||!b.asks.length)return{buySide:[],sellSide:[]};const e=c=>{if(!c.length)return[];const d=c.map(o=>o[1]),l=Math.max(...d),n=Math.min(...d);return c.slice(0,10).map(o=>{const m=o[1];let h=l>n?(m-n)/(l-n)*100:0;return h=Math.max(h,10),{amount:E(m),price:w(o[0],r),intensity:Math.min(h,95)}})},s=e(b.bids),a=e(b.asks);for(;s.length<10;)s.push({amount:"0.00",price:"0.00000",intensity:10});for(;a.length<10;)a.push({amount:"0.00",price:"0.00000",intensity:10});return{buySide:s,sellSide:a}},[b,r,w,E]);return t.jsxs("div",{className:"market-detail-container",children:[t.jsx("div",{className:"header",children:t.jsxs("div",{className:"nav-bar",children:[t.jsx(re,{className:"back-arrow",to:"/market",children:t.jsx("i",{className:"fas fa-arrow-left"})}),t.jsxs("div",{className:"trading-pair",onClick:K,children:[t.jsx(ue,{pair:V,size:"sm"}),V.name,t.jsx("i",{className:`fas fa-chevron-down dropdown-arrow ${G?"rotate":""}`})]}),t.jsx("div",{className:"header-icon",onClick:K,children:t.jsx("i",{className:"fas fa-bars"})})]})}),t.jsxs("div",{className:"content-card",children:[t.jsx("div",{className:"price-section",children:t.jsx("div",{className:"price-main-row",children:t.jsxs("div",{className:"price-left-section",children:[t.jsx("div",{className:"current-price",children:u!==null?t.jsx("span",{style:{color:f!==null&&f<0?"#f56c6c":"#37b66a"},children:w(u,r)}):t.jsx(v,{width:"120px",height:"28px"})}),t.jsxs("div",{className:"price-info-row",children:[t.jsx("div",{className:"usd-price",children:u!==null?`$${u.toFixed(2)}`:"$0.00"}),t.jsx("div",{className:"price-change",style:{color:f!==null&&f<0?"#f56c6c":"#37b66a"},children:f!==null?`${f<0?"−":"+"}${Math.abs(f).toFixed(2)}%`:t.jsx(v,{width:"60px",height:"16px"})})]})]})})}),t.jsx("div",{className:"chart-section",children:t.jsx(ne,{symbol:r,height:400},r)}),t.jsxs("div",{className:"tabs-section",children:[t.jsxs("div",{className:"tabs-header",children:[t.jsx("div",{className:`tab ${j==="orderBook"?"active":""}`,onClick:()=>W("orderBook"),children:p("pages.marketDetail.tabs.orderBook")}),t.jsx("div",{className:`tab ${j==="transactions"?"active":""}`,onClick:()=>W("transactions"),children:p("pages.marketDetail.tabs.transactions")})]}),t.jsxs("div",{className:"tab-content",children:[j==="orderBook"&&t.jsx("div",{className:"modern-order-book",children:t.jsxs("div",{className:"order-book-table",children:[t.jsxs("div",{className:"table-header",children:[t.jsxs("div",{className:"buy-section",children:[t.jsx("div",{className:"column-header",children:p("pages.marketDetail.orderBook.buy")}),t.jsx("div",{className:"column-header",children:p("pages.marketDetail.orderBook.quantity")}),t.jsx("div",{className:"column-header",children:p("pages.marketDetail.orderBook.price")})]}),t.jsxs("div",{className:"sell-section",children:[t.jsx("div",{className:"column-header",children:p("pages.marketDetail.orderBook.price")}),t.jsx("div",{className:"column-header",children:p("pages.marketDetail.orderBook.quantity")}),t.jsx("div",{className:"column-header",style:{textAlign:"right"},children:p("pages.marketDetail.orderBook.sell")})]})]}),t.jsx("div",{className:"table-body",children:Q.buySide.map((e,s)=>{const a=Q.sellSide[s]||{amount:"0.00",price:"0.00000",intensity:10};return t.jsxs("div",{className:"table-row",children:[t.jsxs("div",{className:"buy-section",children:[t.jsx("div",{className:"cell buy-cell",children:s+1}),t.jsx("div",{className:"cell quantity",children:e.amount}),t.jsxs("div",{className:"cell price-cell",children:[t.jsx("div",{className:"heatmap-bar buy-heatmap",style:{width:`${e.intensity}%`}}),t.jsx("span",{className:"price-value buy-price",children:e.price})]})]}),t.jsxs("div",{className:"sell-section",children:[t.jsxs("div",{className:"cell price-cell",children:[t.jsx("div",{className:"heatmap-bar sell-heatmap",style:{width:`${a.intensity}%`}}),t.jsx("span",{className:"price-value sell-price",children:a.price})]}),t.jsx("div",{className:"cell quantity",children:a.amount}),t.jsx("div",{className:"cell sell-cell",children:s+1})]})]},s)})})]})}),j==="transactions"&&t.jsxs("div",{className:"transactions-container",children:[t.jsxs("div",{className:"transactions-header",children:[t.jsx("div",{className:"header-item",children:p("pages.marketDetail.recentTrades.time")}),t.jsx("div",{className:"header-item",children:p("pages.marketDetail.recentTrades.price")}),t.jsx("div",{className:"header-item",children:p("pages.marketDetail.recentTrades.amount")})]}),t.jsx("div",{className:"transactions-list",children:L.length>0?L.slice(0,10).map(e=>t.jsxs("div",{className:"transaction-item",children:[t.jsx("div",{className:"transaction-time",children:new Date(e.time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}),t.jsx("div",{className:`transaction-price ${e.side==="buy"?"buy":"sell"}`,children:w(e.price,r)}),t.jsx("div",{className:"transaction-amount",children:E(e.quantity)})]},e.id)):Array.from({length:5}).map((e,s)=>t.jsxs("div",{className:"transaction-item",children:[t.jsx("div",{className:"transaction-time",children:t.jsx(v,{width:"50px",height:"14px"})}),t.jsx("div",{className:"transaction-price",children:t.jsx(v,{width:"60px",height:"14px"})}),t.jsx("div",{className:"transaction-amount",children:t.jsx(v,{width:"50px",height:"14px"})})]},s))})]})]})]})]}),t.jsx(ce,{isOpen:G,onClose:()=>R(!1),selectedCoin:r,onCoinSelect:ee,availableCoins:Z,title:p("pages.marketDetail.coinSelector.title")}),t.jsx("style",{children:`
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
      `})]})}const Ne=se.memo(pe);export{Ne as default};
