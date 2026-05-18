import{i as o,O as J,S as it,N as Ie,T as lt,j as e,p as ct,u as O,w as dt,M as Se,q as Be,z as pt,o as d,U as ut}from"./index-0260459c.js";import{C as mt}from"./CoinSelectorSidebar-61fb9ebc.js";import{T as ft}from"./TradingViewChart-bbbee885.js";import{g as xt,b as gt,a as bt}from"./wsUrl-e823bb4f.js";import{u as ht}from"./useDispatch-381907c5.js";const yt=({isOpen:i,onClose:y,direction:u,dispatch:f,listAssets:Q,selectedCoin:w,marketPrice:V,availableBalance:x,setOpeningOrders:E,isDemoAccount:ee=!1})=>{const[l,_]=o.useState("120"),[D,$]=o.useState("20"),[c,N]=o.useState(30),[b,r]=o.useState("configuring"),[M,T]=o.useState(0),[pe,v]=o.useState(null),[te,Y]=o.useState(""),[W,Z]=o.useState(null),[oe,k]=o.useState(""),[X,q]=o.useState(!1),[g,ue]=o.useState(null),se=n=>Number.isFinite(n)?n.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}):"0.00",ne=(n,p)=>{_(n),$(p)};o.useEffect(()=>(i?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[i]),o.useEffect(()=>{f(J.doFetch())},[f]),o.useEffect(()=>{c<30?Y("Minimum amount is 30 USD"):c>x?Y("Insufficient balance"):Y("")},[c,x]),o.useEffect(()=>{let n=null;return b==="in-progress"&&(M>0?n=setInterval(()=>{T(p=>p-1)},1e3):(async()=>await Fe())()),()=>{n&&clearInterval(n)}},[b,M]);const me=async()=>{if(!(!u||c<30||c>x)){q(!0);try{const n=parseFloat(V||"0")||0,p=await fe();if(!p||!p.id){q(!1);return}Z(p.id),ue({futuresAmount:c,contractDuration:l,futuresStatus:u==="up"?"long":"short",openPositionPrice:n,closePositionPrice:null,leverage:1,openPositionTime:new Date,closePositionTime:null}),E(j=>[...j,{id:p.id,futuresAmount:c,contractDuration:l,futuresStatus:u==="up"?"long":"short",openPositionPrice:n,closePositionPrice:null,leverage:1,openPositionTime:new Date().toISOString(),closePositionTime:null}]);const m=parseInt(l,10)||0;T(m),r("in-progress")}catch(n){console.error("startTrade error",n)}finally{q(!1)}}},Fe=async()=>{if(E([]),!W){v("loss"),k(`-${c.toFixed(2)} USD`),r("completed");return}try{const n=await f(it.doFind(W)),p=n&&n.payload?n.payload:n;if(!p){v("loss"),k(`-${c.toFixed(2)} USD`),r("completed");return}if(p.finalized){const A=p.control==="profit",H=Number(p.profitAndLossAmount??(A?ge(c,1,D):-c));v(A?"win":"loss"),k(`${A?"+":""}${H.toFixed(2)} USD`),r("completed"),f(J.doFetchPending()),f(J.doFetch());return}const m=p.futuresStatus==="long",j=1,I=parseInt(D,10),B=new Date;let h;ee?h=Math.random()<.85:h=Math.random()<.3;const L=p.openPositionPrice,ye=.002+Math.random()*(.005-.002),S=L*(ye/100);let z;h?z=m?L+S:L-S:z=m?L-S:L+S;const je=c*j*I/100,R=h?c+je:-c,ae={control:h?"profit":"loss",closePositionPrice:z,closePositionTime:B.toISOString(),profitAndLossAmount:R};try{await f(Ie.doUpdate(W,ae)),v(h?"win":"loss"),k(`${h?"+":""}${R.toFixed(2)} USD`),r("completed"),f(J.doFetchPending()),f(J.doFetch())}catch(A){console.error("Error finalizing trade:",A),v("loss"),k(`-${c.toFixed(2)} USD`),r("completed")}}catch(n){console.error("completeTrade error",n),v("loss"),k(`-${c.toFixed(2)} USD`),r("completed")}},fe=async()=>{const n=parseFloat(V||"0")||0,p={futuresStatus:u==="up"?"long":"short",profitAndLossAmount:"",leverage:1,control:"loss",operate:"low",futureCoin:w.replace("USD","/USD"),closePositionTime:"",closePositionPrice:"",openPositionTime:new Date().toISOString(),openPositionPrice:n,contractDuration:l,futuresAmount:c};try{const m=await f(Ie.doCreate(p)),j=m&&m.id?m:m&&m.payload?m.payload:null;return j&&j.id?(Z(j.id),j):(console.warn("Create did not return created record"),null)}catch(m){return console.error("create error",m),null}},xe=()=>{r("configuring"),E([]),v(null),T(0),Z(null),k(""),ue(null),N(30),$("20"),_("120")},ge=(n,p,m)=>{const j=Number.isFinite(n)?n:0,I=typeof p=="number"?p:parseInt(p,10)||0,B=parseInt(m,10)||0;return j*I*B/100},P=()=>{if(b!=="in-progress")return 0;const n=parseInt(l,10)||1;return(n-M)/n*100},be=n=>{const p=Math.floor(n/60),m=n%60;return`${p.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}`},C=n=>n?new Date(n).toLocaleTimeString():"-",he=n=>{const p=parseInt(n.target.value,10)||0;N(p)};return i?lt.createPortal(e.jsxs("div",{className:"modal-overlay",onClick:y,children:[e.jsxs("div",{className:`modal-container ${u==="up"?"up-theme":"down-theme"}`,onClick:n=>n.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{className:"pair-info",children:e.jsx("div",{className:"pair-name",children:w.replace("USD","/USD")})}),e.jsx("button",{className:"close-btn",onClick:y,children:"×"})]}),b!=="configuring"&&e.jsxs("div",{className:"trade-progress-section",children:[e.jsx("div",{className:"progress-container",children:e.jsx("div",{className:"circular-progress",style:{background:`conic-gradient(${u==="up"?"#00C076":"#FF6838"} ${P()}%, #3a3a3a ${P()}%)`},children:e.jsxs("div",{className:"progress-inner",children:[e.jsx("div",{className:"progress-time",children:be(M)}),e.jsx("div",{className:"progress-label",children:"Remaining"})]})})}),g&&e.jsxs("div",{className:"trade-details",children:[e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Futures Amount:"}),e.jsxs("span",{children:[g.futuresAmount," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Contract Duration:"}),e.jsxs("span",{children:[g.contractDuration,"s"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Future Type:"}),e.jsx("span",{className:g.futuresStatus==="long"?"up-text":"down-text",children:g.futuresStatus.toUpperCase()})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Position Price:"}),e.jsxs("span",{children:[g.openPositionPrice.toFixed(4)," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Position Price:"}),e.jsxs("span",{children:[g.closePositionPrice?g.closePositionPrice.toFixed(4):"-"," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Leverage:"}),e.jsxs("span",{children:[g.leverage,"x"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Time:"}),e.jsx("span",{children:C(g.openPositionTime)})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Time:"}),e.jsx("span",{children:C(g.closePositionTime)})]})]}),e.jsxs("div",{className:"trade-actions",children:[b==="in-progress"&&e.jsx("button",{className:"trade-action-btn keep-buying",onClick:y,children:"Keep Buying"}),b==="completed"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"trade-action-btn secondary",onClick:y,children:"Close"}),e.jsx("button",{className:"trade-action-btn primary",onClick:xe,children:"New Trade"})]})]})]}),b==="configuring"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`direction-indicator ${u}-indicator`,children:u==="up"?"Predicting price will go UP":"Predicting price will go DOWN"}),e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"section",children:[e.jsxs("div",{className:"section-title",children:[e.jsx("span",{children:"Contract Duration"}),e.jsx("span",{children:"Payout"})]}),e.jsx("div",{className:"options-container",children:[{duration:"60",payout:"10"},{duration:"120",payout:"20"},{duration:"180",payout:"40"},{duration:"240",payout:"80"}].map(n=>e.jsxs("button",{className:`option-btn ${l===n.duration?"selected":""}`,onClick:()=>ne(n.duration,n.payout),children:[n.duration,"s (",n.payout,"%)"]},n.duration))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Futures Amount (USD)"})}),e.jsxs("div",{className:"amount-control",children:[e.jsx("button",{className:"amount-btn",onClick:()=>N(n=>Math.max(1,n-1)),children:"-"}),e.jsx("input",{type:"number",className:"amount-inputs",value:c,onChange:he,min:"1",placeholder:"Enter amount"}),e.jsx("button",{className:"amount-btn",onClick:()=>N(n=>n+1),children:"+"})]}),e.jsxs("div",{className:"balance-info",children:["Available: ",se(x)," USD"]}),te&&e.jsx("div",{className:"error-message",style:{color:"#FF6838",fontSize:"12px",marginTop:"5px"},children:te})]}),e.jsxs("div",{className:"profit-info",children:["Projected Profit: ",ge(c,1,D).toFixed(2)," USD"]}),e.jsx("button",{className:"confirm-btn",onClick:me,disabled:!u||c<30||c>x||X,style:{opacity:!u||c<30||c>x?.5:1,cursor:!u||c<30||c>x?"not-allowed":"pointer"},children:X?"CREATING...":c>x?"INSUFFICIENT BALANCE":"CONFIRM ORDER"})]})]})]}),e.jsx("style",{children:` 
  .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100000;
      padding: 20px;
      height: 100%;
  }

  .modal-container {
      background-color: #2a2a2a;
      border-radius: 12px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
      overflow: hidden;
      overflow-y: auto;
  }

  .up-theme {
      border-top: 4px solid #00C076;
  }

  .down-theme {
      border-top: 4px solid #FF6838;
  }

  /* Header Section */
  .modal-header {
      background-color: #1a1a1a;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #3a3a3a;
  }

  .pair-info {
      display: flex;
      align-items: center;
      gap: 10px;
  }

  .pair-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #F3BA2F;
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .pair-icon i {
      color: #000;
      font-size: 16px;
  }

  .pair-name {
      font-weight: bold;
      font-size: 18px;
      color: #FBFBFB;
  }

  .close-btn {
      background: none;
      border: none;
      color: #AAAAAA;
      font-size: 20px;
      cursor: pointer;
      padding: 5px;
  }

  .close-btn:hover {
      color: #FFFFFF;
  }

  /* Direction Indicator */
  .direction-indicator {
      padding: 10px 15px;
      text-align: center;
      font-weight: bold;
      font-size: 16px;
  }

  .up-indicator {
      background-color: rgba(0, 192, 118, 0.2);
      color: #00C076;
  }

  .down-indicator {
      background-color: rgba(255, 104, 56, 0.2);
      color: #FF6838;
  }

  /* Modal Content */
  .modal-content {
      padding: 15px;
  }

  .section {
      margin-bottom: 20px;
  }

  .section-title {
      font-size: 14px;
      color: #AAAAAA;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
  }

  .options-container {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
  }

  .option-btn {
      background-color: #3a3a3a;
      border: 1px solid #4a4a4a;
      border-radius: 6px;
      padding: 8px 12px;
      color: #FFFFFF;
      font-size: 14px;
      cursor: pointer;
      flex: 1;
      min-width: 70px;
      text-align: center;
      transition: all 0.2s;
  }

  .option-btn:hover {
      background-color: #4a4a4a;
  }

  .option-btn.selected {
      background-color: #00C076;
      border-color: #00C076;
      color: #000;
      font-weight: bold;
  }

  .down-theme .option-btn.selected {
      background-color: #FF6838;
      border-color: #FF6838;
  }

  .amount-control {
      display: flex;
      align-items: center;
      background-color: #3a3a3a;
      border-radius: 6px;
      padding: 5px;
      margin-top: 10px;
  }

  .amount-btn {
      background: none;
      border: none;
      color: #AAAAAA;
      font-size: 20px;
      width: 40px;
      height: 40px;
      cursor: pointer;
      border-radius: 5px;
  }

  .amount-btn:hover {
      background-color: #4a4a4a;
      color: #FFFFFF;
  }

  .amount-inputs {
      flex: 1;
      background: none;
      border: none;
      color: #FFFFFF;
      font-size: 16px;
      text-align: center;
      padding: 10px 0;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }

  input[type="number"] {
      -moz-appearance: textfield;
  }

  .balance-info {
      font-size: 14px;
      color: #AAAAAA;
      text-align: right;
      margin-top: 5px;
  }

  .profit-info {
      text-align: center;
      font-size: 14px;
      color: #AAAAAA;
      margin: 20px 0;
  }

  .confirm-btn {
      background-color: #00C076;
      color: white;
      display: block;
      width: 100%;
      padding: 15px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
  }

  .confirm-btn:hover:not(:disabled) {
      background-color: #00a466;
  }

  .confirm-btn:disabled {
      background-color: #3a3a3a;
      color: #777;
      cursor: not-allowed;
  }

  .down-theme .confirm-btn {
      background-color: #FF6838;
  }

  .down-theme .confirm-btn:hover:not(:disabled) {
      background-color: #e55a2b;
  }
      
  /* Trade Progress Section */
  .trade-progress-section {
      padding: 20px;
      text-align: center;
  }

  .progress-container {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
  }

  .circular-progress {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 1s linear;
  }

  .progress-inner {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background-color: #2a2a2a;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }

  .progress-time {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 5px;
      color: #FFFFFF;
  }

  .progress-label {
      font-size: 12px;
      color: #AAAAAA;
  }

  /* Trade Details */
  .trade-details {
      background-color: #1e1e1e;
      border-radius: 8px;
      padding: 15px;
      margin: 15px 0;
      text-align: left;
      display:flex;
      flex-direction:column
  }

  .trade-details-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 14px;
  }

  .trade-details-row:last-child {
      margin-bottom: 0;
  }

  .trade-details-row span:first-child {
      color: #AAAAAA;
  }

  .trade-details-row span:last-child {
      color: #FFFFFF;
      font-weight: 500;
  }

  .up-text {
      color: #00C076 !important;
  }

  .down-text {
      color: #FF6838 !important;
  }

  .trade-result {
      font-size: 16px;
      font-weight: bold;
      margin: 15px 0;
      padding: 10px;
      border-radius: 6px;
  }

  .trade-result.win {
      background-color: rgba(0, 192, 118, 0.2);
      color: #00C076;
  }

  .trade-result.loss {
      background-color: rgba(255, 104, 56, 0.2);
      color: #FF6838;
  }

  .trade-actions {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-top: 20px;
  }

  .trade-action-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
  }

  .trade-action-btn.primary {
      background-color: #F3BA2F;
      color: #000;
  }

  .trade-action-btn.primary:hover {
      background-color: #e4ab25;
  }

  .trade-action-btn.secondary {
      background-color: #3a3a3a;
      color: #FFFFFF;
  }

  .trade-action-btn.secondary:hover {
      background-color: #4a4a4a;
  }

  .trade-action-btn.keep-buying {
      background-color: #00C076;
      color: white;
  }

  .trade-action-btn.keep-buying:hover {
      background-color: #00a466;
  }

  .down-theme .trade-action-btn.keep-buying {
      background-color: #FF6838;
  }

  .down-theme .trade-action-btn.keep-buying:hover {
      background-color: #e55a2b;
  }
`})]}),document.body):null},Ge=[{symbol:"XAUUSD",name:"Gold"},{symbol:"EURUSD",name:"EUR / USD"},{symbol:"GBPUSD",name:"GBP / USD"},{symbol:"BTCUSD",name:"Bitcoin"},{symbol:"ETHUSD",name:"Ethereum"},{symbol:"XAGUSD",name:"Silver"},{symbol:"AUDUSD",name:"AUD / USD"},{symbol:"USDJPY",name:"USD / JPY"},{symbol:"NZDUSD",name:"NZD / USD"},{symbol:"USDCHF",name:"USD / CHF"},{symbol:"USDCAD",name:"USD / CAD"},{symbol:"LTCUSD",name:"Litecoin"},{symbol:"USOIL",name:"US Oil"},{symbol:"UKOIL",name:"UK Oil"},{symbol:"EURJPY",name:"EUR / JPY"},{symbol:"EURCHF",name:"EUR / CHF"},{symbol:"AUDNZD",name:"AUD / NZD"},{symbol:"GBPAUD",name:"GBP / AUD"},{symbol:"AUDJPY",name:"AUD / JPY"},{symbol:"EURNZD",name:"EUR / NZD"},{symbol:"CADJPY",name:"CAD / JPY"},{symbol:"NZDJPY",name:"NZD / JPY"},{symbol:"EURAUD",name:"EUR / AUD"},{symbol:"GBPJPY",name:"GBP / JPY"},{symbol:"EURCAD",name:"EUR / CAD"},{symbol:"GBPNZD",name:"GBP / NZD"},{symbol:"EURGBP",name:"EUR / GBP"},{symbol:"NAS100",name:"Nasdaq 100"},{symbol:"AUS200",name:"ASX 200"},{symbol:"ESP35",name:"IBEX 35"},{symbol:"FRA40",name:"CAC 40"},{symbol:"GER30",name:"DAX 30"},{symbol:"SPX500",name:"S&P 500"},{symbol:"US30",name:"Dow Jones 30"},{symbol:"UK100",name:"FTSE 100"},{symbol:"JPN225",name:"Nikkei 225"}];function Dt(){const i=ht(),y=ct(),u=O(dt.selectRows),f=O(Se.pendingRows);O(Se.pendingcount);const Q=O(Se.pendingLoading);O(Be.selectCurrentUser);const w=o.useRef(null),V=o.useRef(null),x=o.useRef(null),E=o.useRef(null),[ee,de]=o.useState([]),[l,_]=o.useState(null),[D,$]=o.useState(null),c=o.useRef({}),N=o.useRef({}),b=o.useRef({}),[r,M]=o.useState("EURUSD"),[T,pe]=o.useState("marketPrice"),[v,te]=o.useState(!1),[Y,W]=o.useState(null),[Z,oe]=o.useState(!1),[k,X]=o.useState(null),[q,g]=o.useState(!1),[ue,se]=o.useState(!0),[ne,me]=o.useState(0),[Fe,fe]=o.useState([]),[xe,ge]=o.useState(!1),[P,be]=o.useState(100),[C,he]=o.useState(!1),[n,p]=o.useState(0),[m,j]=o.useState(!1),[I,B]=o.useState(0),[h,L]=o.useState(.01),[ye,S]=o.useState(!1),[z,je]=o.useState("buy"),[R,ae]=o.useState(!1),[A,H]=o.useState(null),G=o.useCallback(t=>`~m~${t.length}~m~${t}`,[]),De=o.useCallback(t=>{const s=[];let a=t;for(;a.length>0&&a.startsWith("~m~");){const U=a.indexOf("~m~",3),ce=parseInt(a.substring(3,U)),K=a.substring(U+3,U+3+ce);s.push(K),a=a.substring(U+3+ce)}return s},[]),Pe=o.useCallback(t=>{try{const s=t.replace(/^=\{/,"{");return JSON.parse(s).symbol||"UNKNOWN"}catch{return t}},[]),re=o.useCallback(t=>{const s=w.current,a=V.current;!s||s.readyState!==WebSocket.OPEN||!a||x.current!==t&&(x.current&&s.send(G(JSON.stringify({m:"quote_remove_symbols",p:[a,x.current]}))),s.send(G(JSON.stringify({m:"quote_add_symbols",p:[a,t]}))),x.current=t,de([]),_(null),$(null),se(!0),delete N.current[t],delete b.current[t],delete c.current[t])},[G]),we=o.useCallback(()=>{w.current&&(w.current.close(),w.current=null);const t=new WebSocket(xt());w.current=t,t.onopen=()=>{const s="qs_"+Math.random().toString(36).substring(2,12);V.current=s,t.send(G(JSON.stringify({m:"quote_create_session",p:[s]}))),t.send(G(JSON.stringify({m:"quote_set_fields",p:[s,"ask","bid"]})));const a=Ce.current;re(a)},t.onmessage=s=>{const a=s.data;if(a.startsWith("~h~")){t.send(a);return}De(a).forEach(ce=>{try{const K=JSON.parse(ce);if(K.m==="qsd"){const $e=K.p[1],Me=Pe($e.n),ve=$e.v;if(!ve)return;const nt={symbol:Me,ask:ve.ask??0,bid:ve.bid??0};de(at=>[...at.filter(rt=>rt.symbol!==Me),nt])}}catch{}})},t.onclose=s=>{x.current=null,s.wasClean||(E.current=setTimeout(()=>we(),3e3))},t.onerror=s=>console.error("WebSocket error:",s)},[G,De,Pe,re]),Ce=o.useRef(r);o.useEffect(()=>{Ce.current=r},[r]),o.useEffect(()=>(we(),()=>{E.current&&clearTimeout(E.current),w.current&&w.current.close()}),[we]),o.useEffect(()=>{re(r)},[r,re]),o.useEffect(()=>{const t=ee.find(a=>a.symbol===r);if(!t||!t.ask||!t.bid)return;const s=(t.ask+t.bid)/2;if(_(s),se(!1),c.current[r]===void 0)c.current[r]=s,$(0);else{const a=c.current[r],U=(s-a)/a*100;$(U)}(!N.current[r]||s>N.current[r])&&(N.current[r]=s),(!b.current[r]||s<b.current[r])&&(b.current[r]=s)},[ee,r]);const Ae=o.useCallback(()=>{if((u==null?void 0:u.length)>0){const t=u.find(s=>s.symbol==="USDT");me((t==null?void 0:t.amount)||0)}},[u]);o.useEffect(()=>{Ae()},[Ae]),o.useEffect(()=>{i(J.doFetchPending()),i(pt.doFetch())},[i]);const Ne=o.useCallback((t,s)=>{if(t==null)return"0.00";const a=typeof t=="string"?parseFloat(t):t;return isNaN(a)?"0.00":a.toFixed(s??5)},[]);o.useCallback(t=>{if(!t)return d("pages.assetsDetail.status.pending");try{const s=new Date(t);if(isNaN(s.getTime()))return t;const a=new Date;return s.toDateString()===a.toDateString()?d("pages.history.dateFormats.today",s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):d("pages.history.dateFormats.yesterday",s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))}catch{return t}},[]);const Oe=o.useCallback(t=>{if(!t)return d("pages.assetsDetail.status.pending");try{const s=new Date(t);return isNaN(s.getTime())?t:`${s.toLocaleDateString([],{year:"numeric",month:"short",day:"numeric"})} ${s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}`}catch{return t}},[]),Je=o.useCallback((t,s=2)=>{if(t==null)return"0.00";const a=typeof t=="string"?parseFloat(t):t;return isNaN(a)?"0.00":a.toFixed(s)},[]),ie=O(Be.selectCurrentTenant),Ue=t=>{je(t),H(null),S(!0)},Ve=async()=>{if(ie!=null&&ie.id){ae(!0),H(null);try{await ut.post(`/tenant/${ie.id}/futures-orders`,{coin:r,price:l,direction:z,lots:h,multiplier:P,amount:parseFloat(Re),stopLoss:C?n:null,takeProfit:m?I:null}),S(!1)}catch{H("Failed to place order. Please try again.")}finally{ae(!1)}}},_e=()=>oe(!0),Ye=()=>oe(!1),We=t=>{M(t),oe(!1)},Ze=()=>{te(!1),W(null)},Xe=t=>{X(t),g(!0)},qe=()=>{g(!1),X(null)},ke=o.useMemo(()=>{const t=Ge.find(s=>s.symbol===r);return(t==null?void 0:t.name)||r.replace(/(.{3})(.{3})/,"$1 / $2")},[r]),He=o.useMemo(()=>gt(r)||{symbol:r,name:ke},[r,ke]),Ke=N.current[r]??l??0,Qe=b.current[r]??l??0,le=o.useMemo(()=>{const t=l??1;return t>=1e4?1:t>=100?.01:t>=10?.001:1e-5},[l]),Ee=o.useCallback(t=>{if(t===0)return"0";const s=l??t;return s>=1e4?t.toFixed(2):s>=100||s>=10?t.toFixed(3):t.toFixed(5)},[l]),et=o.useCallback(t=>{he(t),p(t&&l!==null?l:0)},[l]),tt=o.useCallback(t=>{j(t),B(t&&l!==null?l:0)},[l]),Te=t=>{C&&p(s=>{const a=s+t;return a<0?0:+a.toFixed(10)})},Le=t=>{m&&B(s=>{const a=s+t;return a<0?0:+a.toFixed(10)})},ze=t=>{L(s=>Math.max(.01,+(s+t).toFixed(2)))},ot=`1 Lots = 100 ${r}`,st="0.000012",Re=o.useMemo(()=>{const t=l??0,s=P/100,a=t*100*h/s;return a===0?"0.00":a>=1e4?a.toFixed(2):a>=100?a.toFixed(3):a>=10?a.toFixed(4):a.toFixed(5)},[h,l,P]);return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-top",children:[e.jsxs("div",{className:"market-info",children:[e.jsx(bt,{pair:He,size:"md"}),e.jsx("div",{className:"market-name",children:ke}),e.jsx("div",{className:"market-change",style:{color:(D??0)<0?"#ff4d4d":"#36f936"},children:l!==null?`${(D??0)>0?"+":""}${(D??0).toFixed(2)}%`:e.jsx("div",{className:"loading-placeholder",style:{width:"50px",height:"16px"}})})]}),e.jsx("div",{className:"additional-actions",onClick:_e,children:e.jsx("i",{className:"fas fa-filter"})})]}),e.jsx("div",{className:"market-price",style:{color:(D??0)<0?"#ff4d4d":"#36f936"},children:l!==null?`$${Ne(l)}`:e.jsx("div",{className:"loading-placeholder",style:{width:"120px",height:"28px"}})}),e.jsxs("div",{className:"market-stats",children:[e.jsxs("span",{children:[d("pages.marketDetail.stats.high"),":"," ",l!==null?`$${Ne(Ke)}`:e.jsx("div",{className:"loading-placeholder",style:{width:"80px",height:"12px"}})]}),e.jsxs("span",{children:[d("pages.marketDetail.stats.low"),":"," ",l!==null?`$${Ne(Qe)}`:e.jsx("div",{className:"loading-placeholder",style:{width:"80px",height:"12px"}})]})]})]}),e.jsxs("div",{className:"content-card",children:[e.jsx(ft,{symbol:r,height:400},r),e.jsxs("div",{className:"pill-tabs",children:[e.jsx("div",{className:`pill-tab ${T==="marketPrice"?"active":""}`,onClick:()=>pe("marketPrice"),children:"Market Price"}),e.jsx("div",{className:`pill-tab ${T==="pendingOrders"?"active":""}`,onClick:()=>pe("pendingOrders"),children:"Pending Orders"})]}),T==="marketPrice"?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"trading-form",children:[e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Multiplier"}),e.jsx("select",{className:"multiplier-select",value:P,onChange:t=>be(+t.target.value),children:[100,200,300,400,500].map(t=>e.jsxs("option",{value:t,children:[t,"×"]},t))})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("div",{className:"checkbox-container",children:e.jsx("input",{type:"checkbox",checked:C,onChange:t=>et(t.target.checked),className:"form-checkbox"})}),e.jsx("span",{className:"form-label",children:"Set Loss"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>Te(-le),disabled:!C,children:"−"}),e.jsx("span",{className:"step-value",children:Ee(n)}),e.jsx("button",{className:"step-btn",onClick:()=>Te(le),disabled:!C,children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("div",{className:"checkbox-container",children:e.jsx("input",{type:"checkbox",checked:m,onChange:t=>tt(t.target.checked),className:"form-checkbox"})}),e.jsx("span",{className:"form-label",children:"Take Profit"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>Le(-le),disabled:!m,children:"−"}),e.jsx("span",{className:"step-value",children:Ee(I)}),e.jsx("button",{className:"step-btn",onClick:()=>Le(le),disabled:!m,children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Lots (Step:0.01)"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>ze(-.01),children:"−"}),e.jsx("span",{className:"step-value",children:h.toFixed(2)}),e.jsx("button",{className:"step-btn",onClick:()=>ze(.01),children:"+"})]})]})]}),e.jsx("div",{className:"form-divider"}),e.jsxs("div",{className:"info-section",children:[e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Each Lots"}),e.jsx("span",{className:"info-value",children:ot})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Estimated Handling Fee"}),e.jsx("span",{className:"info-value",children:st})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Estimated Margin"}),e.jsx("span",{className:"info-value",children:Re})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Balance"}),e.jsx("span",{className:"info-value",children:ne.toFixed(2)})]})]}),e.jsxs("div",{className:"future-action-buttons",children:[e.jsx("button",{className:"action-button buy-button",onClick:()=>Ue("buy"),disabled:l===null,children:d("pages.futures.actions.buyUp")}),e.jsx("button",{className:"action-button sell-button",onClick:()=>Ue("sell"),disabled:l===null,children:d("pages.futures.actions.buyDown")})]})]}):e.jsx("div",{className:"pending-orders-container",children:Q?e.jsx("div",{className:"loading-placeholder",style:{height:"200px"}}):f&&f.length>0?f.map(t=>e.jsxs("div",{className:"order-card",onClick:()=>Xe(t),children:[e.jsxs("div",{className:"order-header",children:[e.jsx("span",{className:"order-pair",children:t.symbol||t.pair}),e.jsx("span",{className:`order-direction ${t.futuresStatus==="long"||t.direction==="BUY UP"?"buy":"sell"}`,children:t.futuresStatus==="long"?d("pages.futures.actions.buyUp"):t.futuresStatus==="short"?d("pages.futures.actions.buyDown"):t.direction})]}),e.jsx("div",{className:"order-status open",children:"● Open"}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:"Amount"}),e.jsxs("span",{className:"order-value",children:[t.futuresAmount||t.investment," USD"]})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:"Open Price"}),e.jsx("span",{className:"order-value",children:t.openPositionPrice||t.openPrice})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:"Leverage"}),e.jsxs("span",{className:"order-value",children:[t.leverage,"X"]})]})]})]},t.id)):e.jsxs("div",{className:"no-orders",children:[e.jsx("i",{className:"fas fa-inbox"}),"No pending orders"]})}),q&&k&&e.jsx(jt,{selectedOrder:k,onClose:qe,formatDateTimeDetailed:Oe,safeToFixed:Je})]}),ye&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"confirm-overlay",onClick:()=>!R&&S(!1)}),e.jsxs("div",{className:"confirm-sheet",children:[e.jsx("div",{className:"confirm-handle"}),e.jsx("div",{className:"confirm-title",children:"Your order has been confirmed"}),e.jsxs("div",{className:"confirm-summary",children:[e.jsx("span",{className:`confirm-dir ${z==="buy"?"buy":"sell"}`,children:z==="buy"?"Buy":"Sell"}),e.jsx("span",{className:"confirm-pair",children:r}),e.jsxs("span",{className:"confirm-meta",children:[h.toFixed(2)," Lots · ",P,"×"]}),e.jsxs("span",{className:"confirm-price",children:["@ ",l!==null?l.toFixed(5):"—"]})]}),A&&e.jsx("div",{className:"confirm-error",children:A}),e.jsxs("div",{className:"confirm-buttons",children:[e.jsx("button",{className:"confirm-btn-primary",onClick:Ve,disabled:R,children:R?"Placing…":"Confirmation"}),e.jsx("button",{className:"confirm-btn-secondary",onClick:()=>{S(!1),y.push("/ordersPage")},disabled:R,children:"Order Page"})]})]})]}),e.jsx(yt,{isOpen:v,onClose:Ze,direction:Y,dispatch:i,listAssets:u,selectedCoin:r,marketPrice:(l==null?void 0:l.toString())??"0",availableBalance:ne,setOpeningOrders:fe,isDemoAccount:xe}),e.jsx(mt,{isOpen:Z,onClose:Ye,selectedCoin:r,onCoinSelect:We,availableCoins:Ge.map(t=>({symbol:t.symbol,name:t.name})),title:d("pages.marketDetail.coinSelector.title")}),e.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          position: relative;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex;
          flex-direction: column;
        }

        .header {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          min-height: 60px;
          padding: 20px;
          position: sticky;
          top: 0;
          z-index: 100;
          color: white;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .market-info {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
        }

        .market-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          overflow: hidden;
          background: rgba(255,255,255,0.2);
          flex-shrink: 0;
        }

        .market-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .market-name {
          font-weight: 600;
          font-size: 17px;
          white-space: nowrap;
        }

        .market-change {
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
          margin-left: 8px;
        }

        .additional-actions {
          color: rgba(255,255,255,0.8);
          font-size: 20px;
          cursor: pointer;
          padding: 4px;
        }

        .additional-actions:hover {
          color: white;
        }

        .market-price {
          font-size: 24px;
          font-weight: 700;
          margin: 8px 0 4px;
          color: white;
        }

        .market-stats {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: rgba(255,255,255,0.7);
          flex-wrap: wrap;
          gap: 8px;
        }

        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 30px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* ✅ Pill-shaped tabs */
        .pill-tabs {
          display: flex;
          gap: 8px;
          margin-top: 0;
          padding: 0;
        }

        .pill-tab {
          flex: 1;
          text-align: center;
          padding: 10px 0;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          background: #f0f2f5;
          color: #555;
          transition: all 0.2s;
        }

        .pill-tab.active {
          background: #106cf5;
          color: white;
          font-weight: 600;
        }

        /* ✅ Trading form */
        .trading-form {
          background: white;
          border-radius: 12px;
          padding: 0 4px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .form-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
        }

        .form-label {
          flex: 0 0 100px;
          color: #555;
          font-weight: 500;
        }

        .multiplier-select {
          margin-left: auto;
          background: #f0f2f5;
          border: 1.5px solid #e0e3e8;
          border-radius: 8px;
          padding: 7px 28px 7px 14px;
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          cursor: pointer;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          transition: border-color 0.2s, background-color 0.2s;
          min-width: 90px;
        }

        .multiplier-select:focus {
          border-color: #106cf5;
          background-color: #fff;
        }

        .checkbox-container {
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .form-checkbox {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .stepper {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-left: auto;
        }

        .step-btn {
          width: 28px;
          height: 28px;
          border: 1px solid #ddd;
          background: #f8f9fb;
          border-radius: 6px;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #333;
          transition: all 0.2s;
        }

        .step-btn:hover:not(:disabled) {
          background: #e6efff;
        }

        .step-btn:disabled {
          opacity: 0.4;
          cursor: default;
        }

        .step-value {
          min-width: 50px;
          text-align: center;
          font-weight: 600;
          color: #1a1a1a;
          font-size: 14px;
        }

        .form-divider {
          height: 1px;
          background: #edeef1;
          margin: 4px 0;
        }

        /* Info section */
        .info-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
        }

        .info-label {
          color: #777;
        }

        .info-value {
          color: #1a1a1a;
          font-weight: 500;
        }

        .future-action-buttons {
          display: flex;
          gap: 12px;
          margin: 6px 0 0;
        }

        .action-button {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .buy-button { background: #36f936; color: white; }
        .sell-button { background: #ff4d4d; color: white; }

        .action-button:hover { opacity: 0.9; }

        /* Pending orders list */
        .pending-orders-container {
          margin-top: 4px;
        }

        .order-card {
          background: #f8f9fb;
          border: 1px solid #edeef1;
          border-radius: 8px;
          padding: 14px;
          margin-bottom: 8px;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
        }
        .order-card:hover {
          background: #f0f2f5;
          transform: translateY(-1px);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .order-pair {
          font-weight: 600;
          color: #1a1a1a;
          font-size: 15px;
        }

        .order-direction {
          font-size: 11px;
          padding: 3px 8px;
          border-radius: 4px;
          font-weight: 600;
        }
        .order-direction.buy { background: rgba(54,249,54,0.15); color: #36f936; }
        .order-direction.sell { background: rgba(255,77,77,0.15); color: #ff4d4d; }

        .order-status.open { color: #36f936; font-size: 12px; margin-bottom: 8px; }

        .order-details { border-top: 1px solid #edeef1; padding-top: 10px; }

        .order-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
          font-size: 13px;
        }

        .order-label { color: #777; }
        .order-value { font-weight: 500; color: #1a1a1a; }

        .no-orders {
          text-align: center;
          padding: 30px 0;
          color: #999;
        }

        /* Loading placeholder */
        .loading-placeholder {
          animation: shimmer 1.4s infinite linear;
          background: linear-gradient(90deg, #f0f2f5 25%, #e5e8ec 50%, #f0f2f5 75%);
          background-size: 200% 100%;
          border-radius: 4px;
          display: inline-block;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* Modals – dark style kept for contrast */
        .modal-overlays {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: #1c1c1c;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          border: 1px solid #2a2a2a;
          color: #ffffff;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #2a2a2a;
        }

        .modal-header h2 { font-size: 18px; font-weight: 600; }

        .modal-close {
          background: none; border: none; color: #aaa; font-size: 20px; cursor: pointer;
        }

        .modal-close:hover { color: #36f936; }

        .modal-body { padding: 20px; }

        .modal-footer {
          display: flex; justify-content: flex-end; padding: 20px; border-top: 1px solid #2a2a2a;
          gap: 10px;
        }

        .modal-button {
          background: #2a2a2a; color: white; border: none; border-radius: 6px; padding: 10px 20px;
          cursor: pointer; font-weight: 600;
        }

        .modal-button:hover { background: #106cf5; }

        .close-order-button {
          background: #ff4d4d; color: white; border: none; border-radius: 6px; padding: 10px 20px;
          cursor: pointer; font-weight: 600;
        }

        .close-order-button:hover { background: #ff3333; }

        .order-detail-section { margin-bottom: 20px; }

        .order-detail-section h3 {
          font-size: 14px; color: #aaaaaa; margin-bottom: 12px; text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-header {
          display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;
        }

        .detail-pair { font-weight: 600; font-size: 18px; color: #ffffff; }

        .detail-direction {
          font-size: 14px; padding: 4px 8px; border-radius: 4px; font-weight: 600;
        }

        .detail-direction.buy { background: rgba(54,249,54,0.15); color: #36f936; }
        .detail-direction.sell { background: rgba(255,77,77,0.15); color: #ff4d4d; }

        .detail-status { font-size: 14px; margin-bottom: 15px; }
        .detail-status.open { color: #36f936; }
        .detail-status.closed { color: #999; }

        .detail-row {
          display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px;
        }

        .detail-label { color: #aaaaaa; }
        .detail-value { font-weight: 500; color: #ffffff; }
        .detail-value.profit { color: #36f936; }
        .detail-value.loss { color: #ff4d4d; }

        /* ── Order Confirmation Modal ── */
        .confirm-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.55);
          z-index: 7999;
          animation: fadeIn 0.2s ease;
        }

        .confirm-sheet {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 400px;
          background: white;
          border-radius: 24px 24px 0 0;
          padding: 20px 24px 40px;
          z-index: 8000;
          animation: slideUp 0.3s ease;
        }

        .confirm-handle {
          width: 40px; height: 4px;
          background: #ddd; border-radius: 2px;
          margin: 0 auto 20px;
        }

        .confirm-title {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          text-align: center;
          margin-bottom: 20px;
        }

        .confirm-summary {
          background: #f8f9fb;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
          font-size: 14px;
        }

        .confirm-dir {
          font-size: 16px;
          font-weight: 700;
        }
        .confirm-dir.buy  { color: #36c836; }
        .confirm-dir.sell { color: #ff4d4d; }

        .confirm-pair  { font-weight: 600; color: #1a1a1a; }
        .confirm-meta  { color: #666; }
        .confirm-price { color: #106cf5; font-weight: 600; }

        .confirm-error {
          color: #ff4d4d;
          font-size: 13px;
          text-align: center;
          margin-bottom: 12px;
        }

        .confirm-buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .confirm-btn-primary {
          width: 100%;
          padding: 15px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .confirm-btn-primary:disabled { opacity: 0.6; cursor: default; }
        .confirm-btn-primary:hover:not(:disabled) { opacity: 0.9; }

        .confirm-btn-secondary {
          width: 100%;
          padding: 15px;
          background: white;
          color: #106cf5;
          border: 1.5px solid #106cf5;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .confirm-btn-secondary:disabled { opacity: 0.6; cursor: default; }
        .confirm-btn-secondary:hover:not(:disabled) { background: #f0f6ff; }

        @keyframes fadeIn  { from { opacity: 0; }               to { opacity: 1; } }
        @keyframes slideUp { from { transform: translate(-50%, 100%); } to { transform: translate(-50%, 0); } }

        /* Responsive */
        @media (max-width: 380px) {
          .header { padding: 16px; min-height: 50px; }
          .content-card { padding: 25px 16px 100px; }
        }
        @media (min-width: 768px) {
          .content-card { border-radius: 30px 30px 0 0; }
        }
      `})]})}const jt=({selectedOrder:i,onClose:y,formatDateTimeDetailed:u,safeToFixed:f})=>e.jsx("div",{className:"modal-overlays",onClick:y,children:e.jsxs("div",{className:"modal-content",onClick:Q=>Q.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{children:d("pages.futures.orderDetails.title")}),e.jsx("button",{className:"modal-close",onClick:y,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"order-detail-section",children:[e.jsxs("div",{className:"detail-header",children:[e.jsx("span",{className:"detail-pair",children:i.symbol||i.pair}),e.jsx("span",{className:`detail-direction ${i.futuresStatus==="long"||i.direction==="BUY UP"?"buy":"sell"}`,children:i.futuresStatus==="long"?d("pages.futures.actions.buyUp"):i.futuresStatus==="short"?d("pages.futures.actions.buyDown"):i.direction})]}),e.jsxs("div",{className:`detail-status ${i.finalized?"closed":"open"}`,children:["● ",i.finalized?d("pages.futures.orderDetails.closed"):d("pages.futures.orderDetails.open")]})]}),e.jsxs("div",{className:"order-detail-section",children:[e.jsx(F,{label:d("pages.futures.orderDetails.futuresAmount"),value:`${i.futuresAmount||i.investment} USD`}),i.contractDuration&&e.jsx(F,{label:d("pages.futures.orderDetails.contractDuration"),value:`${i.contractDuration} ${d("pages.futures.orderDetails.seconds")}`}),e.jsx(F,{label:d("pages.futures.orderDetails.futuresStatus"),value:i.closePositionTime?d("pages.futures.orderDetails.completed"):d("pages.futures.orderDetails.open")}),e.jsx(F,{label:d("pages.futures.orderDetails.openPositionPrice"),value:i.openPositionPrice||i.openPrice}),e.jsx(F,{label:d("pages.futures.orderDetails.openPositionTime"),value:u(i.openPositionTime||i.openTime)}),i.closePositionPrice&&e.jsx(F,{label:d("pages.futures.orderDetails.closePositionPrice"),value:i.closePositionPrice}),i.closePositionTime&&e.jsx(F,{label:d("pages.futures.orderDetails.closePositionTime"),value:u(i.closePositionTime)}),e.jsx(F,{label:d("pages.futures.orderDetails.profitLossAmount"),value:i.profitAndLossAmount||i.pnl?`${f(i.profitAndLossAmount||i.pnl,2)} USD`:"__",className:i.control==="profit"?"profit":"loss"}),e.jsx(F,{label:d("pages.futures.orderDetails.leverage"),value:`${i.leverage}X`})]})]}),e.jsx("div",{className:"modal-footer",children:e.jsx("button",{className:"modal-button",onClick:y,children:d("pages.futures.orderDetails.done")})})]})}),F=({label:i,value:y,className:u=""})=>e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:i}),e.jsx("span",{className:`detail-value ${u}`,children:y})]});export{Dt as default};
