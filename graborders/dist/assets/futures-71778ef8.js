import{i as o,N as oe,S as xt,M as Ze,T as bt,j as e,u as gt,o as se,t as ht,K as ze,p as qe,x as He,n as p,U as yt}from"./index-83c73f4f.js";import{C as jt}from"./CoinSelectorSidebar-121a76ca.js";import{T as Nt}from"./TradingViewChart-75269475.js";import{g as vt,b as kt,a as wt}from"./wsUrl-e82b14b0.js";import{u as St}from"./useDispatch-027e97b5.js";const Ft=({isOpen:r,onClose:j,direction:u,dispatch:f,listAssets:ne,selectedCoin:R,marketPrice:W,availableBalance:N,setOpeningOrders:X,isDemoAccount:i=!1})=>{const[v,Z]=o.useState("120"),[$,M]=o.useState("20"),[c,l]=o.useState(30),[D,b]=o.useState("configuring"),[O,ae]=o.useState(0),[Le,A]=o.useState(null),[de,re]=o.useState(""),[G,q]=o.useState(null),[Re,U]=o.useState(""),[pe,ue]=o.useState(!1),[g,w]=o.useState(null),me=n=>Number.isFinite(n)?n.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}):"0.00",$e=(n,d)=>{Z(n),M(d)};o.useEffect(()=>(r?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[r]),o.useEffect(()=>{f(oe.doFetch())},[f]),o.useEffect(()=>{c<30?re("Minimum amount is 30 USD"):c>N?re("Insufficient balance"):re("")},[c,N]),o.useEffect(()=>{let n=null;return D==="in-progress"&&(O>0?n=setInterval(()=>{ae(d=>d-1)},1e3):(async()=>await we())()),()=>{n&&clearInterval(n)}},[D,O]);const ke=async()=>{if(!(!u||c<30||c>N)){ue(!0);try{const n=parseFloat(W||"0")||0,d=await Me();if(!d||!d.id){ue(!1);return}q(d.id),w({futuresAmount:c,contractDuration:v,futuresStatus:u==="up"?"long":"short",openPositionPrice:n,closePositionPrice:null,leverage:1,openPositionTime:new Date,closePositionTime:null}),X(x=>[...x,{id:d.id,futuresAmount:c,contractDuration:v,futuresStatus:u==="up"?"long":"short",openPositionPrice:n,closePositionPrice:null,leverage:1,openPositionTime:new Date().toISOString(),closePositionTime:null}]);const m=parseInt(v,10)||0;ae(m),b("in-progress")}catch(n){console.error("startTrade error",n)}finally{ue(!1)}}},we=async()=>{if(X([]),!G){A("loss"),U(`-${c.toFixed(2)} USD`),b("completed");return}try{const n=await f(xt.doFind(G)),d=n&&n.payload?n.payload:n;if(!d){A("loss"),U(`-${c.toFixed(2)} USD`),b("completed");return}if(d.finalized){const B=d.control==="profit",le=Number(d.profitAndLossAmount??(B?ie(c,1,$):-c));A(B?"win":"loss"),U(`${B?"+":""}${le.toFixed(2)} USD`),b("completed"),f(oe.doFetchPending()),f(oe.doFetch());return}const m=d.futuresStatus==="long",x=1,S=parseInt($,10),J=new Date;let T;i?T=Math.random()<.85:T=Math.random()<.3;const F=d.openPositionPrice,Q=.002+Math.random()*(.005-.002),ee=F*(Q/100);let P;T?P=m?F+ee:F-ee:P=m?F-ee:F+ee;const Fe=c*x*S/100,V=T?c+Fe:-c,fe={control:T?"profit":"loss",closePositionPrice:P,closePositionTime:J.toISOString(),profitAndLossAmount:V};try{await f(Ze.doUpdate(G,fe)),A(T?"win":"loss"),U(`${T?"+":""}${V.toFixed(2)} USD`),b("completed"),f(oe.doFetchPending()),f(oe.doFetch())}catch(B){console.error("Error finalizing trade:",B),A("loss"),U(`-${c.toFixed(2)} USD`),b("completed")}}catch(n){console.error("completeTrade error",n),A("loss"),U(`-${c.toFixed(2)} USD`),b("completed")}},Me=async()=>{const n=parseFloat(W||"0")||0,d={futuresStatus:u==="up"?"long":"short",profitAndLossAmount:"",leverage:1,control:"loss",operate:"low",futureCoin:R.replace("USD","/USD"),closePositionTime:"",closePositionPrice:"",openPositionTime:new Date().toISOString(),openPositionPrice:n,contractDuration:v,futuresAmount:c};try{const m=await f(Ze.doCreate(d)),x=m&&m.id?m:m&&m.payload?m.payload:null;return x&&x.id?(q(x.id),x):(console.warn("Create did not return created record"),null)}catch(m){return console.error("create error",m),null}},I=()=>{b("configuring"),X([]),A(null),ae(0),q(null),U(""),w(null),l(30),M("20"),Z("120")},ie=(n,d,m)=>{const x=Number.isFinite(n)?n:0,S=typeof d=="number"?d:parseInt(d,10)||0,J=parseInt(m,10)||0;return x*S*J/100},h=()=>{if(D!=="in-progress")return 0;const n=parseInt(v,10)||1;return(n-O)/n*100},Se=n=>{const d=Math.floor(n/60),m=n%60;return`${d.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}`},H=n=>n?new Date(n).toLocaleTimeString():"-",K=n=>{const d=parseInt(n.target.value,10)||0;l(d)};return r?bt.createPortal(e.jsxs("div",{className:"modal-overlay",onClick:j,children:[e.jsxs("div",{className:`modal-container ${u==="up"?"up-theme":"down-theme"}`,onClick:n=>n.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{className:"pair-info",children:e.jsx("div",{className:"pair-name",children:R.replace("USD","/USD")})}),e.jsx("button",{className:"close-btn",onClick:j,children:"×"})]}),D!=="configuring"&&e.jsxs("div",{className:"trade-progress-section",children:[e.jsx("div",{className:"progress-container",children:e.jsx("div",{className:"circular-progress",style:{background:`conic-gradient(${u==="up"?"#00C076":"#FF6838"} ${h()}%, #3a3a3a ${h()}%)`},children:e.jsxs("div",{className:"progress-inner",children:[e.jsx("div",{className:"progress-time",children:Se(O)}),e.jsx("div",{className:"progress-label",children:"Remaining"})]})})}),g&&e.jsxs("div",{className:"trade-details",children:[e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Futures Amount:"}),e.jsxs("span",{children:[g.futuresAmount," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Contract Duration:"}),e.jsxs("span",{children:[g.contractDuration,"s"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Future Type:"}),e.jsx("span",{className:g.futuresStatus==="long"?"up-text":"down-text",children:g.futuresStatus.toUpperCase()})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Position Price:"}),e.jsxs("span",{children:[g.openPositionPrice.toFixed(4)," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Position Price:"}),e.jsxs("span",{children:[g.closePositionPrice?g.closePositionPrice.toFixed(4):"-"," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Leverage:"}),e.jsxs("span",{children:[g.leverage,"x"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Time:"}),e.jsx("span",{children:H(g.openPositionTime)})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Time:"}),e.jsx("span",{children:H(g.closePositionTime)})]})]}),e.jsxs("div",{className:"trade-actions",children:[D==="in-progress"&&e.jsx("button",{className:"trade-action-btn keep-buying",onClick:j,children:"Keep Buying"}),D==="completed"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"trade-action-btn secondary",onClick:j,children:"Close"}),e.jsx("button",{className:"trade-action-btn primary",onClick:I,children:"New Trade"})]})]})]}),D==="configuring"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`direction-indicator ${u}-indicator`,children:u==="up"?"Predicting price will go UP":"Predicting price will go DOWN"}),e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"section",children:[e.jsxs("div",{className:"section-title",children:[e.jsx("span",{children:"Contract Duration"}),e.jsx("span",{children:"Payout"})]}),e.jsx("div",{className:"options-container",children:[{duration:"60",payout:"10"},{duration:"120",payout:"20"},{duration:"180",payout:"40"},{duration:"240",payout:"80"}].map(n=>e.jsxs("button",{className:`option-btn ${v===n.duration?"selected":""}`,onClick:()=>$e(n.duration,n.payout),children:[n.duration,"s (",n.payout,"%)"]},n.duration))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Futures Amount (USD)"})}),e.jsxs("div",{className:"amount-control",children:[e.jsx("button",{className:"amount-btn",onClick:()=>l(n=>Math.max(1,n-1)),children:"-"}),e.jsx("input",{type:"number",className:"amount-inputs",value:c,onChange:K,min:"1",placeholder:"Enter amount"}),e.jsx("button",{className:"amount-btn",onClick:()=>l(n=>n+1),children:"+"})]}),e.jsxs("div",{className:"balance-info",children:["Available: ",me(N)," USD"]}),de&&e.jsx("div",{className:"error-message",style:{color:"#FF6838",fontSize:"12px",marginTop:"5px"},children:de})]}),e.jsxs("div",{className:"profit-info",children:["Projected Profit: ",ie(c,1,$).toFixed(2)," USD"]}),e.jsx("button",{className:"confirm-btn",onClick:ke,disabled:!u||c<30||c>N||pe,style:{opacity:!u||c<30||c>N?.5:1,cursor:!u||c<30||c>N?"not-allowed":"pointer"},children:pe?"CREATING...":c>N?"INSUFFICIENT BALANCE":"CONFIRM ORDER"})]})]})]}),e.jsx("style",{children:` 
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
`})]}),document.body):null},Ke=[{symbol:"XAUUSD",name:"Gold"},{symbol:"EURUSD",name:"EUR / USD"},{symbol:"GBPUSD",name:"GBP / USD"},{symbol:"BTCUSD",name:"Bitcoin"},{symbol:"ETHUSD",name:"Ethereum"},{symbol:"XAGUSD",name:"Silver"},{symbol:"AUDUSD",name:"AUD / USD"},{symbol:"USDJPY",name:"USD / JPY"},{symbol:"NZDUSD",name:"NZD / USD"},{symbol:"USDCHF",name:"USD / CHF"},{symbol:"USDCAD",name:"USD / CAD"},{symbol:"LTCUSD",name:"Litecoin"},{symbol:"USOIL",name:"US Oil"},{symbol:"UKOIL",name:"UK Oil"},{symbol:"EURJPY",name:"EUR / JPY"},{symbol:"EURCHF",name:"EUR / CHF"},{symbol:"AUDNZD",name:"AUD / NZD"},{symbol:"GBPAUD",name:"GBP / AUD"},{symbol:"AUDJPY",name:"AUD / JPY"},{symbol:"EURNZD",name:"EUR / NZD"},{symbol:"CADJPY",name:"CAD / JPY"},{symbol:"NZDJPY",name:"NZD / JPY"},{symbol:"EURAUD",name:"EUR / AUD"},{symbol:"GBPJPY",name:"GBP / JPY"},{symbol:"EURCAD",name:"EUR / CAD"},{symbol:"GBPNZD",name:"GBP / NZD"},{symbol:"EURGBP",name:"EUR / GBP"},{symbol:"NAS100",name:"Nasdaq 100"},{symbol:"AUS200",name:"ASX 200"},{symbol:"ESP35",name:"IBEX 35"},{symbol:"FRA40",name:"CAC 40"},{symbol:"GER30",name:"DAX 30"},{symbol:"SPX500",name:"S&P 500"},{symbol:"US30",name:"Dow Jones 30"},{symbol:"UK100",name:"FTSE 100"},{symbol:"JPN225",name:"Nikkei 225"}];function zt(){const r=St(),j=gt(),u=se(ht.selectRows);se(ze.pendingRows),se(ze.pendingcount),se(ze.pendingLoading),se(qe.selectCurrentUser);const f=o.useRef(null),ne=o.useRef(null),R=o.useRef(null),W=o.useRef(null),[N,X]=o.useState([]),[i,ve]=o.useState(null),[v,Z]=o.useState(null),$=o.useRef({}),M=o.useRef({}),c=o.useRef({}),[l,D]=o.useState("EURUSD"),[b,O]=o.useState("marketPrice"),[ae,Le]=o.useState(!1),[A,de]=o.useState(null),[re,G]=o.useState(!1),[q,Re]=o.useState(null),[U,pe]=o.useState(!1),[ue,g]=o.useState(!0),[w,me]=o.useState(0),[$e,ke]=o.useState([]),[we,Me]=o.useState(!1),[I,ie]=o.useState(100),[h,Se]=o.useState(!1),[H,K]=o.useState(0),[n,d]=o.useState(!1),[m,x]=o.useState(0),[S,J]=o.useState(.01),[T,F]=o.useState(!1),[Q,ee]=o.useState("buy"),[P,Fe]=o.useState("market"),[V,fe]=o.useState(!1),[B,le]=o.useState(null),[Y,Pe]=o.useState(0),[ce,Ce]=o.useState(null),De=o.useRef(null),te=o.useCallback(t=>`~m~${t.length}~m~${t}`,[]),Ie=o.useCallback(t=>{const s=[];let a=t;for(;a.length>0&&a.startsWith("~m~");){const k=a.indexOf("~m~",3),y=parseInt(a.substring(3,k)),z=a.substring(k+3,k+3+y);s.push(z),a=a.substring(k+3+y)}return s},[]),Be=o.useCallback(t=>{try{const s=t.replace(/^=\{/,"{");return JSON.parse(s).symbol||"UNKNOWN"}catch{return t}},[]),xe=o.useCallback(t=>{const s=f.current,a=ne.current;!s||s.readyState!==WebSocket.OPEN||!a||R.current!==t&&(R.current&&s.send(te(JSON.stringify({m:"quote_remove_symbols",p:[a,R.current]}))),s.send(te(JSON.stringify({m:"quote_add_symbols",p:[a,t]}))),R.current=t,X([]),ve(null),Z(null),g(!0),delete M.current[t],delete c.current[t],delete $.current[t])},[te]),Ae=o.useCallback(()=>{f.current&&(f.current.close(),f.current=null);const t=new WebSocket(vt());f.current=t,t.onopen=()=>{const s="qs_"+Math.random().toString(36).substring(2,12);ne.current=s,t.send(te(JSON.stringify({m:"quote_create_session",p:[s]}))),t.send(te(JSON.stringify({m:"quote_set_fields",p:[s,"ask","bid"]})));const a=Oe.current;xe(a)},t.onmessage=s=>{const a=s.data;if(a.startsWith("~h~")){t.send(a);return}Ie(a).forEach(y=>{try{const z=JSON.parse(y);if(z.m==="qsd"){const We=z.p[1],Xe=Be(We.n),Ee=We.v;if(!Ee)return;const ut={symbol:Xe,ask:Ee.ask??0,bid:Ee.bid??0};X(mt=>[...mt.filter(ft=>ft.symbol!==Xe),ut])}}catch{}})},t.onclose=s=>{R.current=null,s.wasClean||(W.current=setTimeout(()=>Ae(),3e3))},t.onerror=s=>console.error("WebSocket error:",s)},[te,Ie,Be,xe]),Oe=o.useRef(l);o.useEffect(()=>{Oe.current=l},[l]),o.useEffect(()=>(Ae(),()=>{W.current&&clearTimeout(W.current),f.current&&f.current.close()}),[Ae]),o.useEffect(()=>{xe(l)},[l,xe]),o.useEffect(()=>{const t=N.find(a=>a.symbol===l);if(!t||!t.ask||!t.bid)return;const s=(t.ask+t.bid)/2;if(ve(s),g(!1),$.current[l]===void 0)$.current[l]=s,Z(0);else{const a=$.current[l],k=(s-a)/a*100;Z(k)}(!M.current[l]||s>M.current[l])&&(M.current[l]=s),(!c.current[l]||s<c.current[l])&&(c.current[l]=s)},[N,l]);const Ge=o.useCallback(()=>{if((u==null?void 0:u.length)>0){const t=u.find(s=>s.symbol==="USDT");me((t==null?void 0:t.amount)||0)}},[u]);o.useEffect(()=>{Ge()},[Ge]),o.useEffect(()=>{r(oe.doFetchPending()),r(He.doFetch())},[r]);const Ue=o.useCallback((t,s)=>{if(t==null)return"0.00";const a=typeof t=="string"?parseFloat(t):t;return isNaN(a)?"0.00":a.toFixed(s??5)},[]);o.useCallback(t=>{if(!t)return p("pages.assetsDetail.status.pending");try{const s=new Date(t);if(isNaN(s.getTime()))return t;const a=new Date;return s.toDateString()===a.toDateString()?p("pages.history.dateFormats.today",s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):p("pages.history.dateFormats.yesterday",s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))}catch{return t}},[]);const Qe=o.useCallback(t=>{if(!t)return p("pages.assetsDetail.status.pending");try{const s=new Date(t);return isNaN(s.getTime())?t:`${s.toLocaleDateString([],{year:"numeric",month:"short",day:"numeric"})} ${s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}`}catch{return t}},[]),et=o.useCallback((t,s=2)=>{if(t==null)return"0.00";const a=typeof t=="string"?parseFloat(t):t;return isNaN(a)?"0.00":a.toFixed(s)},[]),be=se(qe.selectCurrentTenant),ge=(t,s="market")=>{ee(t),Fe(s),le(E?`Insufficient balance. Required: $${_}, Available: $${w.toFixed(2)}`:null),F(!0)},tt=async()=>{var t,s,a,k;if(!(!(be!=null&&be.id)||i===null)){fe(!0),le(null);try{const y={orderType:P,symbol:l,symbolName:he,direction:Q,lots:S,multiplier:I,takeProfit:n?m:null,stopLoss:h?H:null};P==="market"?y.entryPrice=i:(y.targetPrice=Y,y.referencePrice=i),await yt.post(`/tenant/${be.id}/trade-orders`,y),me(z=>Math.max(0,z-Te)),r(He.doFetch()),F(!1),De.current&&clearTimeout(De.current),Ce({type:P,direction:Q,symbol:l}),De.current=setTimeout(()=>Ce(null),4e3)}catch(y){const z=((k=(a=(s=(t=y==null?void 0:y.response)==null?void 0:t.data)==null?void 0:s.errors)==null?void 0:a[0])==null?void 0:k.message)||"Failed to place order. Please try again.";le(z)}finally{fe(!1)}}},st=()=>G(!0),ot=()=>G(!1),nt=t=>{D(t),G(!1)},at=()=>{Le(!1),de(null)},rt=()=>{pe(!1),Re(null)},he=o.useMemo(()=>{const t=Ke.find(s=>s.symbol===l);return(t==null?void 0:t.name)||l.replace(/(.{3})(.{3})/,"$1 / $2")},[l]),it=o.useMemo(()=>kt(l)||{symbol:l,name:he},[l,he]),lt=M.current[l]??i??0,ct=c.current[l]??i??0,C=o.useMemo(()=>{const t=i??1;return t>=1e4?1:t>=100?.01:t>=10?.001:1e-5},[i]),Je=o.useCallback(t=>{if(t===0)return"0";const s=i??t;return s>=1e4?t.toFixed(2):s>=100||s>=10?t.toFixed(3):t.toFixed(5)},[i]),Ve=o.useCallback(t=>{Se(t),K(t&&i!==null?i:0)},[i]),Ye=o.useCallback(t=>{d(t),x(t&&i!==null?i:0)},[i]),ye=t=>{h&&K(s=>{const a=s+t;return a<0?0:+a.toFixed(10)})},je=t=>{n&&x(s=>{const a=s+t;return a<0?0:+a.toFixed(10)})},Ne=t=>{J(s=>Math.max(.01,+(s+t).toFixed(2)))},_e=t=>{Pe(s=>{const a=s+t;return a<=0?0:+a.toFixed(10)})};o.useEffect(()=>{b==="pendingOrders"&&i!==null&&Y===0&&Pe(i)},[b,i]);const dt=`1 Lots = 100 ${l}`,pt="0.000012",_=o.useMemo(()=>{const t=i??0,s=I/100,a=t*100*S/s;return a===0?"0.00":a>=1e4?a.toFixed(2):a>=100?a.toFixed(3):a>=10?a.toFixed(4):a.toFixed(5)},[S,i,I]),Te=parseFloat(_)||0,E=w<Te&&Te>0;return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-top",children:[e.jsxs("div",{className:"market-info",children:[e.jsx(wt,{pair:it,size:"md"}),e.jsx("div",{className:"market-name",children:he}),e.jsx("div",{className:"market-change",style:{color:(v??0)<0?"#ff4d4d":"#36f936"},children:i!==null?`${(v??0)>0?"+":""}${(v??0).toFixed(2)}%`:e.jsx("div",{className:"loading-placeholder",style:{width:"50px",height:"16px"}})})]}),e.jsx("div",{className:"additional-actions",onClick:st,children:e.jsx("i",{className:"fas fa-filter"})})]}),e.jsx("div",{className:"market-price",style:{color:(v??0)<0?"#ff4d4d":"#36f936"},children:i!==null?`$${Ue(i)}`:e.jsx("div",{className:"loading-placeholder",style:{width:"120px",height:"28px"}})}),e.jsxs("div",{className:"market-stats",children:[e.jsxs("span",{children:[p("pages.marketDetail.stats.high"),":"," ",i!==null?`$${Ue(lt)}`:e.jsx("div",{className:"loading-placeholder",style:{width:"80px",height:"12px"}})]}),e.jsxs("span",{children:[p("pages.marketDetail.stats.low"),":"," ",i!==null?`$${Ue(ct)}`:e.jsx("div",{className:"loading-placeholder",style:{width:"80px",height:"12px"}})]})]})]}),e.jsxs("div",{className:"content-card",children:[e.jsx(Nt,{symbol:l,height:400},l),e.jsxs("div",{className:"pill-tabs",children:[e.jsx("div",{className:`pill-tab ${b==="marketPrice"?"active":""}`,onClick:()=>O("marketPrice"),children:"Market Price"}),e.jsx("div",{className:`pill-tab ${b==="pendingOrders"?"active":""}`,onClick:()=>O("pendingOrders"),children:"Pending Orders"})]}),b==="marketPrice"?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"trading-form",children:[e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Multiplier"}),e.jsx("select",{className:"multiplier-select",value:I,onChange:t=>ie(+t.target.value),children:[100,200,300,400,500].map(t=>e.jsxs("option",{value:t,children:[t,"×"]},t))})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("div",{className:"checkbox-container",children:e.jsx("input",{type:"checkbox",checked:h,onChange:t=>Ve(t.target.checked),className:"form-checkbox"})}),e.jsx("span",{className:"form-label",children:"Set Loss"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>ye(-C),disabled:!h,children:"−"}),e.jsx("input",{type:"number",className:"step-value",value:H,onChange:t=>{const s=parseFloat(t.target.value);!isNaN(s)&&s>=0&&K(s)},disabled:!h,step:"any",min:"0"}),e.jsx("button",{className:"step-btn",onClick:()=>ye(C),disabled:!h,children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("div",{className:"checkbox-container",children:e.jsx("input",{type:"checkbox",checked:n,onChange:t=>Ye(t.target.checked),className:"form-checkbox"})}),e.jsx("span",{className:"form-label",children:"Take Profit"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>je(-C),disabled:!n,children:"−"}),e.jsx("input",{type:"number",className:"step-value",value:m,onChange:t=>{const s=parseFloat(t.target.value);!isNaN(s)&&s>=0&&x(s)},disabled:!n,step:"any",min:"0"}),e.jsx("button",{className:"step-btn",onClick:()=>je(C),disabled:!n,children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Lots (Step:0.01)"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>Ne(-.01),children:"−"}),e.jsx("input",{type:"number",className:"step-value",value:S,onChange:t=>{const s=parseFloat(t.target.value);J(isNaN(s)||s<.01?.01:Math.round(s*100)/100)},step:"0.01",min:"0.01"}),e.jsx("button",{className:"step-btn",onClick:()=>Ne(.01),children:"+"})]})]})]}),e.jsx("div",{className:"form-divider"}),e.jsxs("div",{className:"info-section",children:[e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Each Lots"}),e.jsx("span",{className:"info-value",children:dt})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Estimated Handling Fee"}),e.jsx("span",{className:"info-value",children:pt})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Estimated Margin"}),e.jsxs("span",{className:"info-value",style:{color:E?"#ff4d4d":void 0},children:["$",_]})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Balance"}),e.jsxs("span",{className:"info-value",children:["$",w.toFixed(2)]})]})]}),E&&e.jsxs("div",{className:"balance-insufficient-msg",children:["⚠ Insufficient balance. Need $",_,", you have $",w.toFixed(2),"."]}),e.jsxs("div",{className:"future-action-buttons",children:[e.jsx("button",{className:"action-button buy-button",onClick:()=>ge("buy"),disabled:i===null||E,children:p("pages.futures.actions.buyUp")}),e.jsx("button",{className:"action-button sell-button",onClick:()=>ge("sell"),disabled:i===null||E,children:p("pages.futures.actions.buyDown")})]})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"trading-form",children:[e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Multiplier"}),e.jsx("select",{className:"multiplier-select",value:I,onChange:t=>ie(+t.target.value),children:[100,200,300,400,500].map(t=>e.jsxs("option",{value:t,children:[t,"×"]},t))})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Trigger Price"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>_e(-C),children:"−"}),e.jsx("input",{type:"number",className:"step-value",value:Y,onChange:t=>{const s=parseFloat(t.target.value);!isNaN(s)&&s>=0&&Pe(s)},step:"any",min:"0"}),e.jsx("button",{className:"step-btn",onClick:()=>_e(C),children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("div",{className:"checkbox-container",children:e.jsx("input",{type:"checkbox",checked:h,onChange:t=>Ve(t.target.checked),className:"form-checkbox"})}),e.jsx("span",{className:"form-label",children:"Set Loss"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>ye(-C),disabled:!h,children:"−"}),e.jsx("input",{type:"number",className:"step-value",value:H,onChange:t=>{const s=parseFloat(t.target.value);!isNaN(s)&&s>=0&&K(s)},disabled:!h,step:"any",min:"0"}),e.jsx("button",{className:"step-btn",onClick:()=>ye(C),disabled:!h,children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("div",{className:"checkbox-container",children:e.jsx("input",{type:"checkbox",checked:n,onChange:t=>Ye(t.target.checked),className:"form-checkbox"})}),e.jsx("span",{className:"form-label",children:"Take Profit"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>je(-C),disabled:!n,children:"−"}),e.jsx("input",{type:"number",className:"step-value",value:m,onChange:t=>{const s=parseFloat(t.target.value);!isNaN(s)&&s>=0&&x(s)},disabled:!n,step:"any",min:"0"}),e.jsx("button",{className:"step-btn",onClick:()=>je(C),disabled:!n,children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Lots (Step:0.01)"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>Ne(-.01),children:"−"}),e.jsx("input",{type:"number",className:"step-value",value:S,onChange:t=>{const s=parseFloat(t.target.value);J(isNaN(s)||s<.01?.01:Math.round(s*100)/100)},step:"0.01",min:"0.01"}),e.jsx("button",{className:"step-btn",onClick:()=>Ne(.01),children:"+"})]})]})]}),e.jsx("div",{className:"form-divider"}),e.jsxs("div",{className:"info-section",children:[e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Current Price"}),e.jsx("span",{className:"info-value",children:i!==null?i.toFixed(5):"—"})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Trigger at"}),e.jsx("span",{className:"info-value",style:{color:"#106cf5"},children:Je(Y)})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Estimated Margin"}),e.jsxs("span",{className:"info-value",style:{color:E?"#ff4d4d":void 0},children:["$",_]})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Balance"}),e.jsxs("span",{className:"info-value",children:["$",w.toFixed(2)]})]})]}),E&&e.jsxs("div",{className:"balance-insufficient-msg",children:["⚠ Insufficient balance. Need $",_,", you have $",w.toFixed(2),"."]}),e.jsxs("div",{className:"future-action-buttons",children:[e.jsx("button",{className:"action-button buy-button",onClick:()=>ge("buy","pending"),disabled:i===null||Y<=0||E,children:"Buy Pending"}),e.jsx("button",{className:"action-button sell-button",onClick:()=>ge("sell","pending"),disabled:i===null||Y<=0||E,children:"Sell Pending"})]})]}),U&&q&&e.jsx(Pt,{selectedOrder:q,onClose:rt,formatDateTimeDetailed:Qe,safeToFixed:et})]}),T&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"confirm-overlay",onClick:()=>!V&&F(!1)}),e.jsxs("div",{className:"confirm-sheet",children:[e.jsx("div",{className:"confirm-handle"}),e.jsx("div",{className:"confirm-title",children:P==="market"?"Confirm Market Order":"Confirm Pending Order"}),e.jsxs("div",{className:"confirm-summary",children:[e.jsxs("span",{className:`confirm-dir ${Q==="buy"?"buy":"sell"}`,children:[Q==="buy"?"Buy":"Sell",P==="pending"?" Pending":""]}),e.jsx("span",{className:"confirm-pair",children:l}),e.jsxs("span",{className:"confirm-meta",children:[S.toFixed(2)," Lots · ",I,"×"]}),P==="market"?e.jsxs("span",{className:"confirm-price",children:["@ ",i!==null?i.toFixed(5):"—"," (market)"]}):e.jsxs("span",{className:"confirm-price",children:["Trigger @ ",Je(Y)," · Now ",i!==null?i.toFixed(5):"—"]}),e.jsxs("span",{className:"confirm-margin",children:["Estimated Margin: ",e.jsxs("strong",{children:["$",_]})]})]}),B&&e.jsx("div",{className:"confirm-error",children:B}),e.jsxs("div",{className:"confirm-buttons",children:[e.jsx("button",{className:"confirm-btn-primary",onClick:tt,disabled:V,children:V?"Placing…":"Confirmation"}),e.jsx("button",{className:"confirm-btn-secondary",onClick:()=>{F(!1),j.push("/ordersPage")},disabled:V,children:"Order Page"})]})]})]}),e.jsx(Ft,{isOpen:ae,onClose:at,direction:A,dispatch:r,listAssets:u,selectedCoin:l,marketPrice:(i==null?void 0:i.toString())??"0",availableBalance:w,setOpeningOrders:ke,isDemoAccount:we}),e.jsx(jt,{isOpen:re,onClose:ot,selectedCoin:l,onCoinSelect:nt,availableCoins:Ke.map(t=>({symbol:t.symbol,name:t.name})),title:p("pages.marketDetail.coinSelector.title")}),ce&&e.jsxs("div",{className:"success-toast",onClick:()=>Ce(null),children:[e.jsx("div",{className:"success-toast-icon",children:"✓"}),e.jsxs("div",{className:"success-toast-body",children:[e.jsx("div",{className:"success-toast-title",children:"Order Placed Successfully!"}),e.jsxs("div",{className:"success-toast-sub",children:[ce.direction==="buy"?"Buy":"Sell"," ",ce.type==="pending"?"Pending":"Market"," · ",ce.symbol]}),e.jsx("div",{className:"success-toast-note",children:ce.type==="market"?"Your position is now active. Track it in Orders.":"Your pending order is waiting for the trigger price."})]})]}),e.jsx("style",{children:`
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
          width: 80px;
          min-width: 60px;
          text-align: center;
          font-weight: 600;
          color: #1a1a1a;
          font-size: 14px;
          border: 1.5px solid #e0e3e8;
          border-radius: 7px;
          padding: 5px 6px;
          background: #f8f9fb;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          -moz-appearance: textfield;
        }
        .step-value::-webkit-inner-spin-button,
        .step-value::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .step-value:focus {
          border-color: #106cf5;
          background: #fff;
          box-shadow: 0 0 0 2px rgba(16, 108, 245, 0.12);
        }
        .step-value:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          background: #f0f2f5;
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

        .confirm-pair   { font-weight: 600; color: #1a1a1a; }
        .confirm-meta   { color: #666; }
        .confirm-price  { color: #106cf5; font-weight: 600; }
        .confirm-margin { color: #555; font-size: 13px; }
        .confirm-margin strong { color: #1a1a1a; }

        .balance-insufficient-msg {
          background: #fff3f3;
          border: 1px solid #ffb3b3;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          color: #cc0000;
          font-weight: 500;
          text-align: center;
        }

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

        /* ── Success Toast ── */
        .success-toast {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 32px);
          max-width: 368px;
          background: #fff;
          border-radius: 16px;
          padding: 16px 18px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(16,108,245,0.10);
          border-left: 5px solid #22c55e;
          z-index: 9999;
          cursor: pointer;
          animation: toastIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .success-toast-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          font-size: 20px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .success-toast-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .success-toast-title {
          font-size: 15px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .success-toast-sub {
          font-size: 13px;
          font-weight: 600;
          color: #106cf5;
        }

        .success-toast-note {
          font-size: 12px;
          color: #666;
          margin-top: 2px;
          line-height: 1.4;
        }

        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-20px) scale(0.95); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)      scale(1);    }
        }

        /* Responsive */
        @media (max-width: 380px) {
          .header { padding: 16px; min-height: 50px; }
          .content-card { padding: 25px 16px 100px; }
        }
        @media (min-width: 768px) {
          .content-card { border-radius: 30px 30px 0 0; }
        }
      `})]})}const Pt=({selectedOrder:r,onClose:j,formatDateTimeDetailed:u,safeToFixed:f})=>e.jsx("div",{className:"modal-overlays",onClick:j,children:e.jsxs("div",{className:"modal-content",onClick:ne=>ne.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{children:p("pages.futures.orderDetails.title")}),e.jsx("button",{className:"modal-close",onClick:j,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"order-detail-section",children:[e.jsxs("div",{className:"detail-header",children:[e.jsx("span",{className:"detail-pair",children:r.symbol||r.pair}),e.jsx("span",{className:`detail-direction ${r.futuresStatus==="long"||r.direction==="BUY UP"?"buy":"sell"}`,children:r.futuresStatus==="long"?p("pages.futures.actions.buyUp"):r.futuresStatus==="short"?p("pages.futures.actions.buyDown"):r.direction})]}),e.jsxs("div",{className:`detail-status ${r.finalized?"closed":"open"}`,children:["● ",r.finalized?p("pages.futures.orderDetails.closed"):p("pages.futures.orderDetails.open")]})]}),e.jsxs("div",{className:"order-detail-section",children:[e.jsx(L,{label:p("pages.futures.orderDetails.futuresAmount"),value:`${r.futuresAmount||r.investment} USD`}),r.contractDuration&&e.jsx(L,{label:p("pages.futures.orderDetails.contractDuration"),value:`${r.contractDuration} ${p("pages.futures.orderDetails.seconds")}`}),e.jsx(L,{label:p("pages.futures.orderDetails.futuresStatus"),value:r.closePositionTime?p("pages.futures.orderDetails.completed"):p("pages.futures.orderDetails.open")}),e.jsx(L,{label:p("pages.futures.orderDetails.openPositionPrice"),value:r.openPositionPrice||r.openPrice}),e.jsx(L,{label:p("pages.futures.orderDetails.openPositionTime"),value:u(r.openPositionTime||r.openTime)}),r.closePositionPrice&&e.jsx(L,{label:p("pages.futures.orderDetails.closePositionPrice"),value:r.closePositionPrice}),r.closePositionTime&&e.jsx(L,{label:p("pages.futures.orderDetails.closePositionTime"),value:u(r.closePositionTime)}),e.jsx(L,{label:p("pages.futures.orderDetails.profitLossAmount"),value:r.profitAndLossAmount||r.pnl?`${f(r.profitAndLossAmount||r.pnl,2)} USD`:"__",className:r.control==="profit"?"profit":"loss"}),e.jsx(L,{label:p("pages.futures.orderDetails.leverage"),value:`${r.leverage}X`})]})]}),e.jsx("div",{className:"modal-footer",children:e.jsx("button",{className:"modal-button",onClick:j,children:p("pages.futures.orderDetails.done")})})]})}),L=({label:r,value:j,className:u=""})=>e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:r}),e.jsx("span",{className:`detail-value ${u}`,children:j})]});export{zt as default};
