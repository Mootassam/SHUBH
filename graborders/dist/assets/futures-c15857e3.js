import{i as o,O as ee,T as Pt,N as nt,U as Ct,j as e,u as Dt,o as Q,t as At,M as Je,p as at,x as rt,n as p,I as Ut}from"./index-de378889.js";import{i as Ye,C as Tt}from"./marketHours-6ca7b293.js";import{C as Et}from"./CustomTradingChart-85eb8025.js";import{u as zt,a as Lt,g as Mt,c as Rt,b as $t}from"./useSymbolInjections-16e759ab.js";import{u as It}from"./useDispatch-0bc9e051.js";const Bt=({isOpen:l,onClose:N,direction:m,dispatch:x,listAssets:S,selectedCoin:te,marketPrice:I,availableBalance:k,setOpeningOrders:V,isDemoAccount:de=!1})=>{const[F,ue]=o.useState("120"),[B,W]=o.useState("20"),[c,P]=o.useState(30),[h,r]=o.useState("configuring"),[X,T]=o.useState(0),[Ae,E]=o.useState(null),[pe,se]=o.useState(""),[oe,ne]=o.useState(null),[me,C]=o.useState(""),[fe,ae]=o.useState(!1),[y,Ue]=o.useState(null),xe=n=>Number.isFinite(n)?n.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}):"0.00",z=(n,u)=>{ue(n),W(u)};o.useEffect(()=>(l?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[l]),o.useEffect(()=>{x(ee.doFetch())},[x]),o.useEffect(()=>{c<30?se("Minimum amount is 30 USD"):c>k?se("Insufficient balance"):se("")},[c,k]),o.useEffect(()=>{let n=null;return h==="in-progress"&&(X>0?n=setInterval(()=>{T(u=>u-1)},1e3):(async()=>await _e())()),()=>{n&&clearInterval(n)}},[h,X]);const be=async()=>{if(!(!m||c<30||c>k)){ae(!0);try{const n=parseFloat(I||"0")||0,u=await Te();if(!u||!u.id){ae(!1);return}ne(u.id),Ue({futuresAmount:c,contractDuration:F,futuresStatus:m==="up"?"long":"short",openPositionPrice:n,closePositionPrice:null,leverage:1,openPositionTime:new Date,closePositionTime:null}),V(b=>[...b,{id:u.id,futuresAmount:c,contractDuration:F,futuresStatus:m==="up"?"long":"short",openPositionPrice:n,closePositionPrice:null,leverage:1,openPositionTime:new Date().toISOString(),closePositionTime:null}]);const f=parseInt(F,10)||0;T(f),r("in-progress")}catch(n){console.error("startTrade error",n)}finally{ae(!1)}}},_e=async()=>{if(V([]),!oe){E("loss"),C(`-${c.toFixed(2)} USD`),r("completed");return}try{const n=await x(Pt.doFind(oe)),u=n&&n.payload?n.payload:n;if(!u){E("loss"),C(`-${c.toFixed(2)} USD`),r("completed");return}if(u.finalized){const J=u.control==="profit",q=Number(u.profitAndLossAmount??(J?ze(c,1,B):-c));E(J?"win":"loss"),C(`${J?"+":""}${q.toFixed(2)} USD`),r("completed"),x(ee.doFetchPending()),x(ee.doFetch());return}const f=u.futuresStatus==="long",b=1,g=parseInt(B,10),re=new Date;let v;de?v=Math.random()<.85:v=Math.random()<.3;const D=u.openPositionPrice,Z=.002+Math.random()*(.005-.002),O=D*(Z/100);let G;v?G=f?D+O:D-O:G=f?D-O:D+O;const ie=c*b*g/100,le=v?c+ie:-c,ye={control:v?"profit":"loss",closePositionPrice:G,closePositionTime:re.toISOString(),profitAndLossAmount:le};try{await x(nt.doUpdate(oe,ye)),E(v?"win":"loss"),C(`${v?"+":""}${le.toFixed(2)} USD`),r("completed"),x(ee.doFetchPending()),x(ee.doFetch())}catch(J){console.error("Error finalizing trade:",J),E("loss"),C(`-${c.toFixed(2)} USD`),r("completed")}}catch(n){console.error("completeTrade error",n),E("loss"),C(`-${c.toFixed(2)} USD`),r("completed")}},Te=async()=>{const n=parseFloat(I||"0")||0,u={futuresStatus:m==="up"?"long":"short",profitAndLossAmount:"",leverage:1,control:"loss",operate:"low",futureCoin:te.replace("USD","/USD"),closePositionTime:"",closePositionPrice:"",openPositionTime:new Date().toISOString(),openPositionPrice:n,contractDuration:F,futuresAmount:c};try{const f=await x(nt.doCreate(u)),b=f&&f.id?f:f&&f.payload?f.payload:null;return b&&b.id?(ne(b.id),b):(console.warn("Create did not return created record"),null)}catch(f){return console.error("create error",f),null}},Ee=()=>{r("configuring"),V([]),E(null),T(0),ne(null),C(""),Ue(null),P(30),W("20"),ue("120")},ze=(n,u,f)=>{const b=Number.isFinite(n)?n:0,g=typeof u=="number"?u:parseInt(u,10)||0,re=parseInt(f,10)||0;return b*g*re/100},ge=()=>{if(h!=="in-progress")return 0;const n=parseInt(F,10)||1;return(n-X)/n*100},Le=n=>{const u=Math.floor(n/60),f=n%60;return`${u.toString().padStart(2,"0")}:${f.toString().padStart(2,"0")}`},L=n=>n?new Date(n).toLocaleTimeString():"-",he=n=>{const u=parseInt(n.target.value,10)||0;P(u)};return l?Ct.createPortal(e.jsxs("div",{className:"modal-overlay",onClick:N,children:[e.jsxs("div",{className:`modal-container ${m==="up"?"up-theme":"down-theme"}`,onClick:n=>n.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{className:"pair-info",children:e.jsx("div",{className:"pair-name",children:te.replace("USD","/USD")})}),e.jsx("button",{className:"close-btn",onClick:N,children:"×"})]}),h!=="configuring"&&e.jsxs("div",{className:"trade-progress-section",children:[e.jsx("div",{className:"progress-container",children:e.jsx("div",{className:"circular-progress",style:{background:`conic-gradient(${m==="up"?"#00C076":"#FF6838"} ${ge()}%, #3a3a3a ${ge()}%)`},children:e.jsxs("div",{className:"progress-inner",children:[e.jsx("div",{className:"progress-time",children:Le(X)}),e.jsx("div",{className:"progress-label",children:"Remaining"})]})})}),y&&e.jsxs("div",{className:"trade-details",children:[e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Futures Amount:"}),e.jsxs("span",{children:[y.futuresAmount," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Contract Duration:"}),e.jsxs("span",{children:[y.contractDuration,"s"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Future Type:"}),e.jsx("span",{className:y.futuresStatus==="long"?"up-text":"down-text",children:y.futuresStatus.toUpperCase()})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Position Price:"}),e.jsxs("span",{children:[y.openPositionPrice.toFixed(4)," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Position Price:"}),e.jsxs("span",{children:[y.closePositionPrice?y.closePositionPrice.toFixed(4):"-"," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Leverage:"}),e.jsxs("span",{children:[y.leverage,"x"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Time:"}),e.jsx("span",{children:L(y.openPositionTime)})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Time:"}),e.jsx("span",{children:L(y.closePositionTime)})]})]}),e.jsxs("div",{className:"trade-actions",children:[h==="in-progress"&&e.jsx("button",{className:"trade-action-btn keep-buying",onClick:N,children:"Keep Buying"}),h==="completed"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"trade-action-btn secondary",onClick:N,children:"Close"}),e.jsx("button",{className:"trade-action-btn primary",onClick:Ee,children:"New Trade"})]})]})]}),h==="configuring"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`direction-indicator ${m}-indicator`,children:m==="up"?"Predicting price will go UP":"Predicting price will go DOWN"}),e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"section",children:[e.jsxs("div",{className:"section-title",children:[e.jsx("span",{children:"Contract Duration"}),e.jsx("span",{children:"Payout"})]}),e.jsx("div",{className:"options-container",children:[{duration:"60",payout:"10"},{duration:"120",payout:"20"},{duration:"180",payout:"40"},{duration:"240",payout:"80"}].map(n=>e.jsxs("button",{className:`option-btn ${F===n.duration?"selected":""}`,onClick:()=>z(n.duration,n.payout),children:[n.duration,"s (",n.payout,"%)"]},n.duration))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Futures Amount (USD)"})}),e.jsxs("div",{className:"amount-control",children:[e.jsx("button",{className:"amount-btn",onClick:()=>P(n=>Math.max(1,n-1)),children:"-"}),e.jsx("input",{type:"number",className:"amount-inputs",value:c,onChange:he,min:"1",placeholder:"Enter amount"}),e.jsx("button",{className:"amount-btn",onClick:()=>P(n=>n+1),children:"+"})]}),e.jsxs("div",{className:"balance-info",children:["Available: ",xe(k)," USD"]}),pe&&e.jsx("div",{className:"error-message",style:{color:"#FF6838",fontSize:"12px",marginTop:"5px"},children:pe})]}),e.jsxs("div",{className:"profit-info",children:["Projected Profit: ",ze(c,1,B).toFixed(2)," USD"]}),e.jsx("button",{className:"confirm-btn",onClick:be,disabled:!m||c<30||c>k||fe,style:{opacity:!m||c<30||c>k?.5:1,cursor:!m||c<30||c>k?"not-allowed":"pointer"},children:fe?"CREATING...":c>k?"INSUFFICIENT BALANCE":"CONFIRM ORDER"})]})]})]}),e.jsx("style",{children:` 
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
`})]}),document.body):null},it=[{symbol:"XAUUSD",name:"Gold"},{symbol:"EURUSD",name:"EUR / USD"},{symbol:"GBPUSD",name:"GBP / USD"},{symbol:"BTCUSD",name:"Bitcoin"},{symbol:"ETHUSD",name:"Ethereum"},{symbol:"XAGUSD",name:"Silver"},{symbol:"AUDUSD",name:"AUD / USD"},{symbol:"USDJPY",name:"USD / JPY"},{symbol:"NZDUSD",name:"NZD / USD"},{symbol:"USDCHF",name:"USD / CHF"},{symbol:"USDCAD",name:"USD / CAD"},{symbol:"LTCUSD",name:"Litecoin"},{symbol:"USOIL",name:"US Oil"},{symbol:"UKOIL",name:"UK Oil"},{symbol:"EURJPY",name:"EUR / JPY"},{symbol:"EURCHF",name:"EUR / CHF"},{symbol:"AUDNZD",name:"AUD / NZD"},{symbol:"GBPAUD",name:"GBP / AUD"},{symbol:"AUDJPY",name:"AUD / JPY"},{symbol:"EURNZD",name:"EUR / NZD"},{symbol:"CADJPY",name:"CAD / JPY"},{symbol:"NZDJPY",name:"NZD / JPY"},{symbol:"EURAUD",name:"EUR / AUD"},{symbol:"GBPJPY",name:"GBP / JPY"},{symbol:"EURCAD",name:"EUR / CAD"},{symbol:"GBPNZD",name:"GBP / NZD"},{symbol:"EURGBP",name:"EUR / GBP"},{symbol:"NAS100",name:"Nasdaq 100"},{symbol:"AUS200",name:"ASX 200"},{symbol:"ESP35",name:"IBEX 35"},{symbol:"FRA40",name:"CAC 40"},{symbol:"GER30",name:"DAX 30"},{symbol:"SPX500",name:"S&P 500"},{symbol:"US30",name:"Dow Jones 30"},{symbol:"UK100",name:"FTSE 100"},{symbol:"JPN225",name:"Nikkei 225"}];function Xt(){const l=It(),N=Dt(),m=Q(At.selectRows);Q(Je.pendingRows),Q(Je.pendingcount),Q(Je.pendingLoading),Q(at.selectCurrentUser);const x=Q(at.selectCurrentTenant),S=o.useRef(null),te=o.useRef(null),I=o.useRef(null),k=o.useRef(null),[V,de]=o.useState([]),[i,F]=o.useState(null),ue=o.useRef(null),[B,W]=o.useState(null),c=o.useRef({}),P=o.useRef({}),h=o.useRef({}),[r,X]=o.useState("EURUSD"),[T,Ae]=o.useState("marketPrice"),[E,pe]=o.useState(!1),[se,oe]=o.useState(null),[ne,me]=o.useState(!1),[C,fe]=o.useState(null),[ae,y]=o.useState(!1),[Ue,xe]=o.useState(!0),[z,be]=o.useState(0),[_e,Te]=o.useState([]),[Ee,ze]=o.useState(!1),ge=zt(),[,Le]=o.useState(0);o.useEffect(()=>{const t=setInterval(()=>Le(s=>s+1),1e3);return()=>clearInterval(t)},[]);const[L,he]=o.useState(100),[n,u]=o.useState(!1),[f,b]=o.useState(0),[g,re]=o.useState(!1),[v,D]=o.useState(0),[Z,O]=o.useState(.01),[G,ie]=o.useState("0.01"),le=t=>{const s=t.target.value;ie(s);const a=parseFloat(s);!isNaN(a)&&a>0&&O(Math.round(a*100)/100)},ye=()=>{const t=parseFloat(G),s=isNaN(t)||t<.01?.01:Math.round(t*100)/100;O(s),ie(s.toString())},[J,q]=o.useState(!1),[je,lt]=o.useState("buy"),[H,ct]=o.useState("market"),[Ne,Ve]=o.useState(!1),[We,ke]=o.useState(null),[Y,Me]=o.useState(0),[ce,Re]=o.useState(null),$e=o.useRef(null),K=o.useCallback(t=>`~m~${t.length}~m~${t}`,[]),Xe=o.useCallback(t=>{const s=[];let a=t;for(;a.length>0&&a.startsWith("~m~");){const w=a.indexOf("~m~",3),j=parseInt(a.substring(3,w)),R=a.substring(w+3,w+3+j);s.push(R),a=a.substring(w+3+j)}return s},[]),Ze=o.useCallback(t=>{try{const s=t.replace(/^=\{/,"{");return JSON.parse(s).symbol||"UNKNOWN"}catch{return t}},[]),ve=o.useCallback(t=>{const s=S.current,a=te.current;!s||s.readyState!==WebSocket.OPEN||!a||I.current!==t&&(I.current&&s.send(K(JSON.stringify({m:"quote_remove_symbols",p:[a,I.current]}))),s.send(K(JSON.stringify({m:"quote_add_symbols",p:[a,t]}))),I.current=t,de([]),F(null),W(null),xe(!0),delete P.current[t],delete h.current[t],delete c.current[t])},[K]),Ie=o.useCallback(()=>{S.current&&(S.current.close(),S.current=null);const t=new WebSocket(Lt());S.current=t,t.onopen=()=>{const s="qs_"+Math.random().toString(36).substring(2,12);te.current=s,t.send(K(JSON.stringify({m:"quote_create_session",p:[s]}))),t.send(K(JSON.stringify({m:"quote_set_fields",p:[s,"ask","bid"]})));const a=qe.current;ve(a)},t.onmessage=s=>{const a=s.data;if(a.startsWith("~h~")){t.send(a);return}Xe(a).forEach(j=>{try{const R=JSON.parse(j);if(R.m==="qsd"){const st=R.p[1],ot=Ze(st.n),Ge=st.v;if(!Ge)return;const wt={symbol:ot,ask:Ge.ask??0,bid:Ge.bid??0};de(St=>[...St.filter(Ft=>Ft.symbol!==ot),wt])}}catch{}})},t.onclose=s=>{I.current=null,s.wasClean||(k.current=setTimeout(()=>Ie(),3e3))},t.onerror=s=>console.error("WebSocket error:",s)},[K,Xe,Ze,ve]),qe=o.useRef(r);o.useEffect(()=>{qe.current=r},[r]),o.useEffect(()=>{ue.current=i},[i]),o.useEffect(()=>(Ie(),()=>{k.current&&clearTimeout(k.current),S.current&&S.current.close()}),[Ie]),o.useEffect(()=>{ve(r)},[r,ve]),o.useEffect(()=>{const t=V.find(a=>a.symbol===r);if(!t||!t.ask||!t.bid)return;const s=(t.ask+t.bid)/2;if(F(s),xe(!1),c.current[r]===void 0)c.current[r]=s,W(0);else{const a=c.current[r],w=(s-a)/a*100;W(w)}(!P.current[r]||s>P.current[r])&&(P.current[r]=s),(!h.current[r]||s<h.current[r])&&(h.current[r]=s)},[V,r]);const He=o.useCallback(()=>{if((m==null?void 0:m.length)>0){const t=m.find(s=>s.symbol==="USDT");be((t==null?void 0:t.amount)||0)}},[m]);o.useEffect(()=>{He()},[He]),o.useEffect(()=>{l(ee.doFetchPending()),l(rt.doFetch())},[l]);const d=ge[r],dt=o.useMemo(()=>d?{symbol:d.symbol,entryPrice:d.entryPrice,targetPrice:d.targetPrice,startedAt:d.startedAt,durationMs:d.durationMs,seed:d.seed}:null,[d==null?void 0:d.symbol,d==null?void 0:d.startedAt,d==null?void 0:d.targetPrice,d==null?void 0:d.durationMs,d==null?void 0:d.entryPrice,d==null?void 0:d.seed]),Be=d?Mt(d):null,we=o.useCallback((t,s)=>{if(t==null)return"0.00";const a=typeof t=="string"?parseFloat(t):t;return isNaN(a)?"0.00":a.toFixed(s??5)},[]);o.useCallback(t=>{if(!t)return p("pages.assetsDetail.status.pending");try{const s=new Date(t);if(isNaN(s.getTime()))return t;const a=new Date;return s.toDateString()===a.toDateString()?p("pages.history.dateFormats.today",s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):p("pages.history.dateFormats.yesterday",s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))}catch{return t}},[]);const ut=o.useCallback(t=>{if(!t)return p("pages.assetsDetail.status.pending");try{const s=new Date(t);return isNaN(s.getTime())?t:`${s.toLocaleDateString([],{year:"numeric",month:"short",day:"numeric"})} ${s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}`}catch{return t}},[]),pt=o.useCallback((t,s=2)=>{if(t==null)return"0.00";const a=typeof t=="string"?parseFloat(t):t;return isNaN(a)?"0.00":a.toFixed(s)},[]),Se=(t,s="market")=>{Ye(r)&&(lt(t),ct(s),ke(M?`Insufficient balance. Required: $${_}, Available: $${z.toFixed(2)}`:null),q(!0))},mt=async()=>{var t,s,a,w;if(!(!(x!=null&&x.id)||i===null)){if(!Ye(r)){ke("Market closed. Forex, metals, oil and indices trade Monday–Friday only.");return}Ve(!0),ke(null);try{const j={orderType:H,symbol:r,symbolName:Fe,direction:je,lots:Z,multiplier:L,takeProfit:g?v:null,stopLoss:n?f:null};H==="market"?j.entryPrice=i:(j.targetPrice=Y,j.referencePrice=i),await Ut.post(`/tenant/${x.id}/trade-orders`,j),be(R=>Math.max(0,R-Oe)),l(rt.doFetch()),q(!1),$e.current&&clearTimeout($e.current),Re({type:H,direction:je,symbol:r}),$e.current=setTimeout(()=>Re(null),4e3)}catch(j){const R=((w=(a=(s=(t=j==null?void 0:j.response)==null?void 0:t.data)==null?void 0:s.errors)==null?void 0:a[0])==null?void 0:w.message)||"Failed to place order. Please try again.";ke(R)}finally{Ve(!1)}}},ft=()=>me(!0),xt=()=>me(!1),bt=t=>{F(null),X(t),me(!1)},gt=()=>{pe(!1),oe(null)},ht=()=>{y(!1),fe(null)},Fe=o.useMemo(()=>{const t=it.find(s=>s.symbol===r);return(t==null?void 0:t.name)||r.replace(/(.{3})(.{3})/,"$1 / $2")},[r]),yt=o.useMemo(()=>Rt(r)||{symbol:r,name:Fe},[r,Fe]),A=Ye(r),jt=P.current[r]??i??0,Nt=h.current[r]??i??0,U=o.useMemo(()=>{const t=i??1;return t>=1e4?1:t>=100?.01:t>=10?.001:1e-5},[i]),Ke=o.useCallback(t=>{if(t===0)return"0";const s=i??t;return s>=1e4?t.toFixed(2):s>=100||s>=10?t.toFixed(3):t.toFixed(5)},[i]),Qe=o.useCallback(t=>{u(t),b(t&&i!==null?i:0)},[i]),et=o.useCallback(t=>{re(t),D(t&&i!==null?i:0)},[i]),Pe=t=>{n&&b(s=>{const a=s+t;return a<0?0:+a.toFixed(10)})},Ce=t=>{g&&D(s=>{const a=s+t;return a<0?0:+a.toFixed(10)})},De=t=>{O(s=>{const a=Math.max(.01,+(s+t).toFixed(2));return ie(a.toString()),a})},tt=t=>{Me(s=>{const a=s+t;return a<=0?0:+a.toFixed(10)})};o.useEffect(()=>{T==="pendingOrders"&&i!==null&&Y===0&&Me(i)},[T,i]);const kt=`1 Lots = 100 ${r}`,vt="0.000012",_=o.useMemo(()=>{const t=i??0,s=L/100,a=t*100*Z/s;return a===0?"0.00":a>=1e4?a.toFixed(2):a>=100?a.toFixed(3):a>=10?a.toFixed(4):a.toFixed(5)},[Z,i,L]),Oe=parseFloat(_)||0,M=z<Oe&&Oe>0;return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-top",children:[e.jsxs("div",{className:"market-info",children:[e.jsx($t,{pair:yt,size:"md"}),e.jsx("div",{className:"market-name",children:Fe}),e.jsx("div",{className:"market-change",style:{color:(B??0)<0?"#ff4d4d":"#36f936"},children:i!==null?`${(B??0)>0?"+":""}${(B??0).toFixed(2)}%`:e.jsx("div",{className:"loading-placeholder",style:{width:"50px",height:"16px"}})})]}),e.jsx("div",{className:"additional-actions",onClick:ft,children:e.jsx("i",{className:"fas fa-filter"})})]}),e.jsx("div",{className:"market-price",style:{color:Be!=null?d&&d.targetPrice>=d.entryPrice?"#36f936":"#ff4d4d":(B??0)<0?"#ff4d4d":"#36f936"},children:Be!=null?`$${we(Be)}`:i!==null?`$${we(i)}`:e.jsx("div",{className:"loading-placeholder",style:{width:"120px",height:"28px"}})}),e.jsxs("div",{className:"market-stats",children:[e.jsxs("span",{children:[p("pages.marketDetail.stats.high"),":"," ",i!==null?`$${we(jt)}`:e.jsx("div",{className:"loading-placeholder",style:{width:"80px",height:"12px"}})]}),e.jsxs("span",{children:[p("pages.marketDetail.stats.low"),":"," ",i!==null?`$${we(Nt)}`:e.jsx("div",{className:"loading-placeholder",style:{width:"80px",height:"12px"}})]})]})]}),e.jsxs("div",{className:"content-card",children:[e.jsx(Et,{symbol:r,livePrice:i,height:400,priceInjection:dt},r),e.jsxs("div",{className:"pill-tabs",children:[e.jsx("div",{className:`pill-tab ${T==="marketPrice"?"active":""}`,onClick:()=>Ae("marketPrice"),children:"Market Price"}),e.jsx("div",{className:`pill-tab ${T==="pendingOrders"?"active":""}`,onClick:()=>Ae("pendingOrders"),children:"Pending Orders"})]}),T==="marketPrice"?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"trading-form",children:[e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Multiplier"}),e.jsx("select",{className:"multiplier-select",value:L,onChange:t=>he(+t.target.value),children:[100,200,300,400,500].map(t=>e.jsxs("option",{value:t,children:[t,"×"]},t))})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("div",{className:"checkbox-container",children:e.jsx("input",{type:"checkbox",checked:n,onChange:t=>Qe(t.target.checked),className:"form-checkbox"})}),e.jsx("span",{className:"form-label",children:"Set Loss"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>Pe(-U),disabled:!n,children:"−"}),e.jsx("input",{type:"number",className:"step-value",value:f,onChange:t=>{const s=parseFloat(t.target.value);!isNaN(s)&&s>=0&&b(s)},disabled:!n,step:"any",min:"0"}),e.jsx("button",{className:"step-btn",onClick:()=>Pe(U),disabled:!n,children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("div",{className:"checkbox-container",children:e.jsx("input",{type:"checkbox",checked:g,onChange:t=>et(t.target.checked),className:"form-checkbox"})}),e.jsx("span",{className:"form-label",children:"Take Profit"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>Ce(-U),disabled:!g,children:"−"}),e.jsx("input",{type:"number",className:"step-value",value:v,onChange:t=>{const s=parseFloat(t.target.value);!isNaN(s)&&s>=0&&D(s)},disabled:!g,step:"any",min:"0"}),e.jsx("button",{className:"step-btn",onClick:()=>Ce(U),disabled:!g,children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Lots (Step:0.01)"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>De(-.01),children:"−"}),e.jsx("input",{type:"number",className:"step-value",value:G,onChange:le,onBlur:ye,step:"0.01",min:"0.01"}),e.jsx("button",{className:"step-btn",onClick:()=>De(.01),children:"+"})]})]})]}),e.jsx("div",{className:"form-divider"}),e.jsxs("div",{className:"info-section",children:[e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Each Lots"}),e.jsx("span",{className:"info-value",children:kt})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Estimated Handling Fee"}),e.jsx("span",{className:"info-value",children:vt})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Estimated Margin"}),e.jsxs("span",{className:"info-value",style:{color:M?"#ff4d4d":void 0},children:["$",_]})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Balance"}),e.jsxs("span",{className:"info-value",children:["$",z.toFixed(2)]})]})]}),M&&e.jsxs("div",{className:"balance-insufficient-msg",children:["⚠ Insufficient balance. Need $",_,", you have $",z.toFixed(2),"."]}),!A&&e.jsx("div",{className:"balance-insufficient-msg",children:"Market closed — forex trading resumes Monday."}),e.jsxs("div",{className:"future-action-buttons",children:[e.jsx("button",{className:"action-button buy-button",onClick:()=>Se("buy"),disabled:i===null||M||!A,children:A?p("pages.futures.actions.buyUp"):"Market Closed"}),e.jsx("button",{className:"action-button sell-button",onClick:()=>Se("sell"),disabled:i===null||M||!A,children:A?p("pages.futures.actions.buyDown"):"Market Closed"})]})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"trading-form",children:[e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Multiplier"}),e.jsx("select",{className:"multiplier-select",value:L,onChange:t=>he(+t.target.value),children:[100,200,300,400,500].map(t=>e.jsxs("option",{value:t,children:[t,"×"]},t))})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Trigger Price"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>tt(-U),children:"−"}),e.jsx("input",{type:"number",className:"step-value",value:Y,onChange:t=>{const s=parseFloat(t.target.value);!isNaN(s)&&s>=0&&Me(s)},step:"any",min:"0"}),e.jsx("button",{className:"step-btn",onClick:()=>tt(U),children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("div",{className:"checkbox-container",children:e.jsx("input",{type:"checkbox",checked:n,onChange:t=>Qe(t.target.checked),className:"form-checkbox"})}),e.jsx("span",{className:"form-label",children:"Set Loss"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>Pe(-U),disabled:!n,children:"−"}),e.jsx("input",{type:"number",className:"step-value",value:f,onChange:t=>{const s=parseFloat(t.target.value);!isNaN(s)&&s>=0&&b(s)},disabled:!n,step:"any",min:"0"}),e.jsx("button",{className:"step-btn",onClick:()=>Pe(U),disabled:!n,children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("div",{className:"checkbox-container",children:e.jsx("input",{type:"checkbox",checked:g,onChange:t=>et(t.target.checked),className:"form-checkbox"})}),e.jsx("span",{className:"form-label",children:"Take Profit"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>Ce(-U),disabled:!g,children:"−"}),e.jsx("input",{type:"number",className:"step-value",value:v,onChange:t=>{const s=parseFloat(t.target.value);!isNaN(s)&&s>=0&&D(s)},disabled:!g,step:"any",min:"0"}),e.jsx("button",{className:"step-btn",onClick:()=>Ce(U),disabled:!g,children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Lots (Step:0.01)"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>De(-.01),children:"−"}),e.jsx("input",{type:"number",className:"step-value",value:G,onChange:le,onBlur:ye,step:"0.01",min:"0.01"}),e.jsx("button",{className:"step-btn",onClick:()=>De(.01),children:"+"})]})]})]}),e.jsx("div",{className:"form-divider"}),e.jsxs("div",{className:"info-section",children:[e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Current Price"}),e.jsx("span",{className:"info-value",children:i!==null?i.toFixed(5):"—"})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Trigger at"}),e.jsx("span",{className:"info-value",style:{color:"#106cf5"},children:Ke(Y)})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Estimated Margin"}),e.jsxs("span",{className:"info-value",style:{color:M?"#ff4d4d":void 0},children:["$",_]})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Balance"}),e.jsxs("span",{className:"info-value",children:["$",z.toFixed(2)]})]})]}),M&&e.jsxs("div",{className:"balance-insufficient-msg",children:["⚠ Insufficient balance. Need $",_,", you have $",z.toFixed(2),"."]}),!A&&e.jsx("div",{className:"balance-insufficient-msg",children:"Market closed — forex trading resumes Monday."}),e.jsxs("div",{className:"future-action-buttons",children:[e.jsx("button",{className:"action-button buy-button",onClick:()=>Se("buy","pending"),disabled:i===null||Y<=0||M||!A,children:A?"Buy Pending":"Market Closed"}),e.jsx("button",{className:"action-button sell-button",onClick:()=>Se("sell","pending"),disabled:i===null||Y<=0||M||!A,children:A?"Sell Pending":"Market Closed"})]})]}),ae&&C&&e.jsx(Ot,{selectedOrder:C,onClose:ht,formatDateTimeDetailed:ut,safeToFixed:pt})]}),J&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"confirm-overlay",onClick:()=>!Ne&&q(!1)}),e.jsxs("div",{className:"confirm-sheet",children:[e.jsx("div",{className:"confirm-handle"}),e.jsx("div",{className:"confirm-title",children:H==="market"?"Confirm Market Order":"Confirm Pending Order"}),e.jsxs("div",{className:"confirm-summary",children:[e.jsxs("span",{className:`confirm-dir ${je==="buy"?"buy":"sell"}`,children:[je==="buy"?"Buy":"Sell",H==="pending"?" Pending":""]}),e.jsx("span",{className:"confirm-pair",children:r}),e.jsxs("span",{className:"confirm-meta",children:[Z.toFixed(2)," Lots · ",L,"×"]}),H==="market"?e.jsxs("span",{className:"confirm-price",children:["@ ",i!==null?i.toFixed(5):"—"," (market)"]}):e.jsxs("span",{className:"confirm-price",children:["Trigger @ ",Ke(Y)," · Now ",i!==null?i.toFixed(5):"—"]}),e.jsxs("span",{className:"confirm-margin",children:["Estimated Margin: ",e.jsxs("strong",{children:["$",_]})]})]}),We&&e.jsx("div",{className:"confirm-error",children:We}),e.jsxs("div",{className:"confirm-buttons",children:[e.jsx("button",{className:"confirm-btn-primary",onClick:mt,disabled:Ne,children:Ne?"Placing…":"Confirmation"}),e.jsx("button",{className:"confirm-btn-secondary",onClick:()=>{q(!1),N.push("/ordersPage")},disabled:Ne,children:"Order Page"})]})]})]}),e.jsx(Bt,{isOpen:E,onClose:gt,direction:se,dispatch:l,listAssets:m,selectedCoin:r,marketPrice:(i==null?void 0:i.toString())??"0",availableBalance:z,setOpeningOrders:Te,isDemoAccount:Ee}),e.jsx(Tt,{isOpen:ne,onClose:xt,selectedCoin:r,onCoinSelect:bt,availableCoins:it.map(t=>({symbol:t.symbol,name:t.name})),title:p("pages.marketDetail.coinSelector.title")}),ce&&e.jsxs("div",{className:"success-toast",onClick:()=>Re(null),children:[e.jsx("div",{className:"success-toast-icon",children:"✓"}),e.jsxs("div",{className:"success-toast-body",children:[e.jsx("div",{className:"success-toast-title",children:"Order Placed Successfully!"}),e.jsxs("div",{className:"success-toast-sub",children:[ce.direction==="buy"?"Buy":"Sell"," ",ce.type==="pending"?"Pending":"Market"," · ",ce.symbol]}),e.jsx("div",{className:"success-toast-note",children:ce.type==="market"?"Your position is now active. Track it in Orders.":"Your pending order is waiting for the trigger price."})]})]}),e.jsx("style",{children:`
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
      `})]})}const Ot=({selectedOrder:l,onClose:N,formatDateTimeDetailed:m,safeToFixed:x})=>e.jsx("div",{className:"modal-overlays",onClick:N,children:e.jsxs("div",{className:"modal-content",onClick:S=>S.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{children:p("pages.futures.orderDetails.title")}),e.jsx("button",{className:"modal-close",onClick:N,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"order-detail-section",children:[e.jsxs("div",{className:"detail-header",children:[e.jsx("span",{className:"detail-pair",children:l.symbol||l.pair}),e.jsx("span",{className:`detail-direction ${l.futuresStatus==="long"||l.direction==="BUY UP"?"buy":"sell"}`,children:l.futuresStatus==="long"?p("pages.futures.actions.buyUp"):l.futuresStatus==="short"?p("pages.futures.actions.buyDown"):l.direction})]}),e.jsxs("div",{className:`detail-status ${l.finalized?"closed":"open"}`,children:["● ",l.finalized?p("pages.futures.orderDetails.closed"):p("pages.futures.orderDetails.open")]})]}),e.jsxs("div",{className:"order-detail-section",children:[e.jsx($,{label:p("pages.futures.orderDetails.futuresAmount"),value:`${l.futuresAmount||l.investment} USD`}),l.contractDuration&&e.jsx($,{label:p("pages.futures.orderDetails.contractDuration"),value:`${l.contractDuration} ${p("pages.futures.orderDetails.seconds")}`}),e.jsx($,{label:p("pages.futures.orderDetails.futuresStatus"),value:l.closePositionTime?p("pages.futures.orderDetails.completed"):p("pages.futures.orderDetails.open")}),e.jsx($,{label:p("pages.futures.orderDetails.openPositionPrice"),value:l.openPositionPrice||l.openPrice}),e.jsx($,{label:p("pages.futures.orderDetails.openPositionTime"),value:m(l.openPositionTime||l.openTime)}),l.closePositionPrice&&e.jsx($,{label:p("pages.futures.orderDetails.closePositionPrice"),value:l.closePositionPrice}),l.closePositionTime&&e.jsx($,{label:p("pages.futures.orderDetails.closePositionTime"),value:m(l.closePositionTime)}),e.jsx($,{label:p("pages.futures.orderDetails.profitLossAmount"),value:l.profitAndLossAmount||l.pnl?`${x(l.profitAndLossAmount||l.pnl,2)} USD`:"__",className:l.control==="profit"?"profit":"loss"}),e.jsx($,{label:p("pages.futures.orderDetails.leverage"),value:`${l.leverage}X`})]})]}),e.jsx("div",{className:"modal-footer",children:e.jsx("button",{className:"modal-button",onClick:N,children:p("pages.futures.orderDetails.done")})})]})}),$=({label:l,value:N,className:m=""})=>e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:l}),e.jsx("span",{className:`detail-value ${m}`,children:N})]});export{Xt as default};
