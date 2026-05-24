import{i as s,N as Q,S as ct,M as Ve,T as dt,j as e,u as pt,o as K,t as ut,K as De,p as _e,x as mt,n as p,U as ft}from"./index-650658a7.js";import{C as xt}from"./CoinSelectorSidebar-05a8db6e.js";import{T as bt}from"./TradingViewChart-de4122d7.js";import{g as gt,b as ht,a as yt}from"./wsUrl-86362af9.js";import{u as jt}from"./useDispatch-985f96c1.js";const Nt=({isOpen:i,onClose:y,direction:u,dispatch:f,listAssets:ee,selectedCoin:E,marketPrice:V,availableBalance:j,setOpeningOrders:_,isDemoAccount:r=!1})=>{const[N,Y]=s.useState("120"),[L,z]=s.useState("20"),[c,l]=s.useState(30),[P,x]=s.useState("configuring"),[$,te]=s.useState(0),[Ce,D]=s.useState(null),[ie,se]=s.useState(""),[I,W]=s.useState(null),[Ae,C]=s.useState(""),[le,ce]=s.useState(!1),[b,Z]=s.useState(null),je=n=>Number.isFinite(n)?n.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}):"0.00",Ue=(n,d)=>{Y(n),z(d)};s.useEffect(()=>(i?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[i]),s.useEffect(()=>{f(Q.doFetch())},[f]),s.useEffect(()=>{c<30?se("Minimum amount is 30 USD"):c>j?se("Insufficient balance"):se("")},[c,j]),s.useEffect(()=>{let n=null;return P==="in-progress"&&($>0?n=setInterval(()=>{te(d=>d-1)},1e3):(async()=>await ke())()),()=>{n&&clearInterval(n)}},[P,$]);const Ne=async()=>{if(!(!u||c<30||c>j)){ce(!0);try{const n=parseFloat(V||"0")||0,d=await Te();if(!d||!d.id){ce(!1);return}W(d.id),Z({futuresAmount:c,contractDuration:N,futuresStatus:u==="up"?"long":"short",openPositionPrice:n,closePositionPrice:null,leverage:1,openPositionTime:new Date,closePositionTime:null}),_(g=>[...g,{id:d.id,futuresAmount:c,contractDuration:N,futuresStatus:u==="up"?"long":"short",openPositionPrice:n,closePositionPrice:null,leverage:1,openPositionTime:new Date().toISOString(),closePositionTime:null}]);const m=parseInt(N,10)||0;te(m),x("in-progress")}catch(n){console.error("startTrade error",n)}finally{ce(!1)}}},ke=async()=>{if(_([]),!I){D("loss"),C(`-${c.toFixed(2)} USD`),x("completed");return}try{const n=await f(ct.doFind(I)),d=n&&n.payload?n.payload:n;if(!d){D("loss"),C(`-${c.toFixed(2)} USD`),x("completed");return}if(d.finalized){const M=d.control==="profit",re=Number(d.profitAndLossAmount??(M?oe(c,1,L):-c));D(M?"win":"loss"),C(`${M?"+":""}${re.toFixed(2)} USD`),x("completed"),f(Q.doFetchPending()),f(Q.doFetch());return}const m=d.futuresStatus==="long",g=1,v=parseInt(L,10),ne=new Date;let A;r?A=Math.random()<.85:A=Math.random()<.3;const S=d.openPositionPrice,ae=.002+Math.random()*(.005-.002),X=S*(ae/100);let U;A?U=m?S+X:S-X:U=m?S-X:S+X;const ve=c*g*v/100,B=A?c+ve:-c,pe={control:A?"profit":"loss",closePositionPrice:U,closePositionTime:ne.toISOString(),profitAndLossAmount:B};try{await f(Ve.doUpdate(I,pe)),D(A?"win":"loss"),C(`${A?"+":""}${B.toFixed(2)} USD`),x("completed"),f(Q.doFetchPending()),f(Q.doFetch())}catch(M){console.error("Error finalizing trade:",M),D("loss"),C(`-${c.toFixed(2)} USD`),x("completed")}}catch(n){console.error("completeTrade error",n),D("loss"),C(`-${c.toFixed(2)} USD`),x("completed")}},Te=async()=>{const n=parseFloat(V||"0")||0,d={futuresStatus:u==="up"?"long":"short",profitAndLossAmount:"",leverage:1,control:"loss",operate:"low",futureCoin:E.replace("USD","/USD"),closePositionTime:"",closePositionPrice:"",openPositionTime:new Date().toISOString(),openPositionPrice:n,contractDuration:N,futuresAmount:c};try{const m=await f(Ve.doCreate(d)),g=m&&m.id?m:m&&m.payload?m.payload:null;return g&&g.id?(W(g.id),g):(console.warn("Create did not return created record"),null)}catch(m){return console.error("create error",m),null}},R=()=>{x("configuring"),_([]),D(null),te(0),W(null),C(""),Z(null),l(30),z("20"),Y("120")},oe=(n,d,m)=>{const g=Number.isFinite(n)?n:0,v=typeof d=="number"?d:parseInt(d,10)||0,ne=parseInt(m,10)||0;return g*v*ne/100},k=()=>{if(P!=="in-progress")return 0;const n=parseInt(N,10)||1;return(n-$)/n*100},we=n=>{const d=Math.floor(n/60),m=n%60;return`${d.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}`},H=n=>n?new Date(n).toLocaleTimeString():"-",de=n=>{const d=parseInt(n.target.value,10)||0;l(d)};return i?dt.createPortal(e.jsxs("div",{className:"modal-overlay",onClick:y,children:[e.jsxs("div",{className:`modal-container ${u==="up"?"up-theme":"down-theme"}`,onClick:n=>n.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{className:"pair-info",children:e.jsx("div",{className:"pair-name",children:E.replace("USD","/USD")})}),e.jsx("button",{className:"close-btn",onClick:y,children:"×"})]}),P!=="configuring"&&e.jsxs("div",{className:"trade-progress-section",children:[e.jsx("div",{className:"progress-container",children:e.jsx("div",{className:"circular-progress",style:{background:`conic-gradient(${u==="up"?"#00C076":"#FF6838"} ${k()}%, #3a3a3a ${k()}%)`},children:e.jsxs("div",{className:"progress-inner",children:[e.jsx("div",{className:"progress-time",children:we($)}),e.jsx("div",{className:"progress-label",children:"Remaining"})]})})}),b&&e.jsxs("div",{className:"trade-details",children:[e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Futures Amount:"}),e.jsxs("span",{children:[b.futuresAmount," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Contract Duration:"}),e.jsxs("span",{children:[b.contractDuration,"s"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Future Type:"}),e.jsx("span",{className:b.futuresStatus==="long"?"up-text":"down-text",children:b.futuresStatus.toUpperCase()})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Position Price:"}),e.jsxs("span",{children:[b.openPositionPrice.toFixed(4)," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Position Price:"}),e.jsxs("span",{children:[b.closePositionPrice?b.closePositionPrice.toFixed(4):"-"," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Leverage:"}),e.jsxs("span",{children:[b.leverage,"x"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Time:"}),e.jsx("span",{children:H(b.openPositionTime)})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Time:"}),e.jsx("span",{children:H(b.closePositionTime)})]})]}),e.jsxs("div",{className:"trade-actions",children:[P==="in-progress"&&e.jsx("button",{className:"trade-action-btn keep-buying",onClick:y,children:"Keep Buying"}),P==="completed"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"trade-action-btn secondary",onClick:y,children:"Close"}),e.jsx("button",{className:"trade-action-btn primary",onClick:R,children:"New Trade"})]})]})]}),P==="configuring"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`direction-indicator ${u}-indicator`,children:u==="up"?"Predicting price will go UP":"Predicting price will go DOWN"}),e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"section",children:[e.jsxs("div",{className:"section-title",children:[e.jsx("span",{children:"Contract Duration"}),e.jsx("span",{children:"Payout"})]}),e.jsx("div",{className:"options-container",children:[{duration:"60",payout:"10"},{duration:"120",payout:"20"},{duration:"180",payout:"40"},{duration:"240",payout:"80"}].map(n=>e.jsxs("button",{className:`option-btn ${N===n.duration?"selected":""}`,onClick:()=>Ue(n.duration,n.payout),children:[n.duration,"s (",n.payout,"%)"]},n.duration))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Futures Amount (USD)"})}),e.jsxs("div",{className:"amount-control",children:[e.jsx("button",{className:"amount-btn",onClick:()=>l(n=>Math.max(1,n-1)),children:"-"}),e.jsx("input",{type:"number",className:"amount-inputs",value:c,onChange:de,min:"1",placeholder:"Enter amount"}),e.jsx("button",{className:"amount-btn",onClick:()=>l(n=>n+1),children:"+"})]}),e.jsxs("div",{className:"balance-info",children:["Available: ",je(j)," USD"]}),ie&&e.jsx("div",{className:"error-message",style:{color:"#FF6838",fontSize:"12px",marginTop:"5px"},children:ie})]}),e.jsxs("div",{className:"profit-info",children:["Projected Profit: ",oe(c,1,L).toFixed(2)," USD"]}),e.jsx("button",{className:"confirm-btn",onClick:Ne,disabled:!u||c<30||c>j||le,style:{opacity:!u||c<30||c>j?.5:1,cursor:!u||c<30||c>j?"not-allowed":"pointer"},children:le?"CREATING...":c>j?"INSUFFICIENT BALANCE":"CONFIRM ORDER"})]})]})]}),e.jsx("style",{children:` 
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
`})]}),document.body):null},Ye=[{symbol:"XAUUSD",name:"Gold"},{symbol:"EURUSD",name:"EUR / USD"},{symbol:"GBPUSD",name:"GBP / USD"},{symbol:"BTCUSD",name:"Bitcoin"},{symbol:"ETHUSD",name:"Ethereum"},{symbol:"XAGUSD",name:"Silver"},{symbol:"AUDUSD",name:"AUD / USD"},{symbol:"USDJPY",name:"USD / JPY"},{symbol:"NZDUSD",name:"NZD / USD"},{symbol:"USDCHF",name:"USD / CHF"},{symbol:"USDCAD",name:"USD / CAD"},{symbol:"LTCUSD",name:"Litecoin"},{symbol:"USOIL",name:"US Oil"},{symbol:"UKOIL",name:"UK Oil"},{symbol:"EURJPY",name:"EUR / JPY"},{symbol:"EURCHF",name:"EUR / CHF"},{symbol:"AUDNZD",name:"AUD / NZD"},{symbol:"GBPAUD",name:"GBP / AUD"},{symbol:"AUDJPY",name:"AUD / JPY"},{symbol:"EURNZD",name:"EUR / NZD"},{symbol:"CADJPY",name:"CAD / JPY"},{symbol:"NZDJPY",name:"NZD / JPY"},{symbol:"EURAUD",name:"EUR / AUD"},{symbol:"GBPJPY",name:"GBP / JPY"},{symbol:"EURCAD",name:"EUR / CAD"},{symbol:"GBPNZD",name:"GBP / NZD"},{symbol:"EURGBP",name:"EUR / GBP"},{symbol:"NAS100",name:"Nasdaq 100"},{symbol:"AUS200",name:"ASX 200"},{symbol:"ESP35",name:"IBEX 35"},{symbol:"FRA40",name:"CAC 40"},{symbol:"GER30",name:"DAX 30"},{symbol:"SPX500",name:"S&P 500"},{symbol:"US30",name:"Dow Jones 30"},{symbol:"UK100",name:"FTSE 100"},{symbol:"JPN225",name:"Nikkei 225"}];function Ct(){const i=jt(),y=pt(),u=K(ut.selectRows);K(De.pendingRows),K(De.pendingcount),K(De.pendingLoading),K(_e.selectCurrentUser);const f=s.useRef(null),ee=s.useRef(null),E=s.useRef(null),V=s.useRef(null),[j,_]=s.useState([]),[r,ye]=s.useState(null),[N,Y]=s.useState(null),L=s.useRef({}),z=s.useRef({}),c=s.useRef({}),[l,P]=s.useState("EURUSD"),[x,$]=s.useState("marketPrice"),[te,Ce]=s.useState(!1),[D,ie]=s.useState(null),[se,I]=s.useState(!1),[W,Ae]=s.useState(null),[C,le]=s.useState(!1),[ce,b]=s.useState(!0),[Z,je]=s.useState(0),[Ue,Ne]=s.useState([]),[ke,Te]=s.useState(!1),[R,oe]=s.useState(100),[k,we]=s.useState(!1),[H,de]=s.useState(0),[n,d]=s.useState(!1),[m,g]=s.useState(0),[v,ne]=s.useState(.01),[A,S]=s.useState(!1),[ae,X]=s.useState("buy"),[U,ve]=s.useState("market"),[B,pe]=s.useState(!1),[M,re]=s.useState(null),[G,Ee]=s.useState(0),q=s.useCallback(t=>`~m~${t.length}~m~${t}`,[]),Le=s.useCallback(t=>{const o=[];let a=t;for(;a.length>0&&a.startsWith("~m~");){const w=a.indexOf("~m~",3),h=parseInt(a.substring(3,w)),J=a.substring(w+3,w+3+h);o.push(J),a=a.substring(w+3+h)}return o},[]),ze=s.useCallback(t=>{try{const o=t.replace(/^=\{/,"{");return JSON.parse(o).symbol||"UNKNOWN"}catch{return t}},[]),ue=s.useCallback(t=>{const o=f.current,a=ee.current;!o||o.readyState!==WebSocket.OPEN||!a||E.current!==t&&(E.current&&o.send(q(JSON.stringify({m:"quote_remove_symbols",p:[a,E.current]}))),o.send(q(JSON.stringify({m:"quote_add_symbols",p:[a,t]}))),E.current=t,_([]),ye(null),Y(null),b(!0),delete z.current[t],delete c.current[t],delete L.current[t])},[q]),Se=s.useCallback(()=>{f.current&&(f.current.close(),f.current=null);const t=new WebSocket(gt());f.current=t,t.onopen=()=>{const o="qs_"+Math.random().toString(36).substring(2,12);ee.current=o,t.send(q(JSON.stringify({m:"quote_create_session",p:[o]}))),t.send(q(JSON.stringify({m:"quote_set_fields",p:[o,"ask","bid"]})));const a=Re.current;ue(a)},t.onmessage=o=>{const a=o.data;if(a.startsWith("~h~")){t.send(a);return}Le(a).forEach(h=>{try{const J=JSON.parse(h);if(J.m==="qsd"){const Oe=J.p[1],Je=ze(Oe.n),Pe=Oe.v;if(!Pe)return;const rt={symbol:Je,ask:Pe.ask??0,bid:Pe.bid??0};_(it=>[...it.filter(lt=>lt.symbol!==Je),rt])}}catch{}})},t.onclose=o=>{E.current=null,o.wasClean||(V.current=setTimeout(()=>Se(),3e3))},t.onerror=o=>console.error("WebSocket error:",o)},[q,Le,ze,ue]),Re=s.useRef(l);s.useEffect(()=>{Re.current=l},[l]),s.useEffect(()=>(Se(),()=>{V.current&&clearTimeout(V.current),f.current&&f.current.close()}),[Se]),s.useEffect(()=>{ue(l)},[l,ue]),s.useEffect(()=>{const t=j.find(a=>a.symbol===l);if(!t||!t.ask||!t.bid)return;const o=(t.ask+t.bid)/2;if(ye(o),b(!1),L.current[l]===void 0)L.current[l]=o,Y(0);else{const a=L.current[l],w=(o-a)/a*100;Y(w)}(!z.current[l]||o>z.current[l])&&(z.current[l]=o),(!c.current[l]||o<c.current[l])&&(c.current[l]=o)},[j,l]);const Me=s.useCallback(()=>{if((u==null?void 0:u.length)>0){const t=u.find(o=>o.symbol==="USDT");je((t==null?void 0:t.amount)||0)}},[u]);s.useEffect(()=>{Me()},[Me]),s.useEffect(()=>{i(Q.doFetchPending()),i(mt.doFetch())},[i]);const Fe=s.useCallback((t,o)=>{if(t==null)return"0.00";const a=typeof t=="string"?parseFloat(t):t;return isNaN(a)?"0.00":a.toFixed(o??5)},[]);s.useCallback(t=>{if(!t)return p("pages.assetsDetail.status.pending");try{const o=new Date(t);if(isNaN(o.getTime()))return t;const a=new Date;return o.toDateString()===a.toDateString()?p("pages.history.dateFormats.today",o.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):p("pages.history.dateFormats.yesterday",o.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))}catch{return t}},[]);const We=s.useCallback(t=>{if(!t)return p("pages.assetsDetail.status.pending");try{const o=new Date(t);return isNaN(o.getTime())?t:`${o.toLocaleDateString([],{year:"numeric",month:"short",day:"numeric"})} ${o.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}`}catch{return t}},[]),Ze=s.useCallback((t,o=2)=>{if(t==null)return"0.00";const a=typeof t=="string"?parseFloat(t):t;return isNaN(a)?"0.00":a.toFixed(o)},[]),me=K(_e.selectCurrentTenant),fe=(t,o="market")=>{X(t),ve(o),re(null),S(!0)},He=async()=>{var t,o,a,w;if(!(!(me!=null&&me.id)||r===null)){pe(!0),re(null);try{const h={orderType:U,symbol:l,symbolName:xe,direction:ae,lots:v,multiplier:R,takeProfit:n?m:null,stopLoss:k?H:null};U==="market"?h.entryPrice=r:(h.targetPrice=G,h.referencePrice=r),await ft.post(`/tenant/${me.id}/trade-orders`,h),S(!1)}catch(h){const J=((w=(a=(o=(t=h==null?void 0:h.response)==null?void 0:t.data)==null?void 0:o.errors)==null?void 0:a[0])==null?void 0:w.message)||"Failed to place order. Please try again.";re(J)}finally{pe(!1)}}},Xe=()=>I(!0),qe=()=>I(!1),Ke=t=>{P(t),I(!1)},Qe=()=>{Ce(!1),ie(null)},et=()=>{le(!1),Ae(null)},xe=s.useMemo(()=>{const t=Ye.find(o=>o.symbol===l);return(t==null?void 0:t.name)||l.replace(/(.{3})(.{3})/,"$1 / $2")},[l]),tt=s.useMemo(()=>ht(l)||{symbol:l,name:xe},[l,xe]),st=z.current[l]??r??0,ot=c.current[l]??r??0,F=s.useMemo(()=>{const t=r??1;return t>=1e4?1:t>=100?.01:t>=10?.001:1e-5},[r]),O=s.useCallback(t=>{if(t===0)return"0";const o=r??t;return o>=1e4?t.toFixed(2):o>=100||o>=10?t.toFixed(3):t.toFixed(5)},[r]),$e=s.useCallback(t=>{we(t),de(t&&r!==null?r:0)},[r]),Ie=s.useCallback(t=>{d(t),g(t&&r!==null?r:0)},[r]),be=t=>{k&&de(o=>{const a=o+t;return a<0?0:+a.toFixed(10)})},ge=t=>{n&&g(o=>{const a=o+t;return a<0?0:+a.toFixed(10)})},he=t=>{ne(o=>Math.max(.01,+(o+t).toFixed(2)))},Be=t=>{Ee(o=>{const a=o+t;return a<=0?0:+a.toFixed(10)})};s.useEffect(()=>{x==="pendingOrders"&&r!==null&&G===0&&Ee(r)},[x,r]);const nt=`1 Lots = 100 ${l}`,at="0.000012",Ge=s.useMemo(()=>{const t=r??0,o=R/100,a=t*100*v/o;return a===0?"0.00":a>=1e4?a.toFixed(2):a>=100?a.toFixed(3):a>=10?a.toFixed(4):a.toFixed(5)},[v,r,R]);return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-top",children:[e.jsxs("div",{className:"market-info",children:[e.jsx(yt,{pair:tt,size:"md"}),e.jsx("div",{className:"market-name",children:xe}),e.jsx("div",{className:"market-change",style:{color:(N??0)<0?"#ff4d4d":"#36f936"},children:r!==null?`${(N??0)>0?"+":""}${(N??0).toFixed(2)}%`:e.jsx("div",{className:"loading-placeholder",style:{width:"50px",height:"16px"}})})]}),e.jsx("div",{className:"additional-actions",onClick:Xe,children:e.jsx("i",{className:"fas fa-filter"})})]}),e.jsx("div",{className:"market-price",style:{color:(N??0)<0?"#ff4d4d":"#36f936"},children:r!==null?`$${Fe(r)}`:e.jsx("div",{className:"loading-placeholder",style:{width:"120px",height:"28px"}})}),e.jsxs("div",{className:"market-stats",children:[e.jsxs("span",{children:[p("pages.marketDetail.stats.high"),":"," ",r!==null?`$${Fe(st)}`:e.jsx("div",{className:"loading-placeholder",style:{width:"80px",height:"12px"}})]}),e.jsxs("span",{children:[p("pages.marketDetail.stats.low"),":"," ",r!==null?`$${Fe(ot)}`:e.jsx("div",{className:"loading-placeholder",style:{width:"80px",height:"12px"}})]})]})]}),e.jsxs("div",{className:"content-card",children:[e.jsx(bt,{symbol:l,height:400},l),e.jsxs("div",{className:"pill-tabs",children:[e.jsx("div",{className:`pill-tab ${x==="marketPrice"?"active":""}`,onClick:()=>$("marketPrice"),children:"Market Price"}),e.jsx("div",{className:`pill-tab ${x==="pendingOrders"?"active":""}`,onClick:()=>$("pendingOrders"),children:"Pending Orders"})]}),x==="marketPrice"?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"trading-form",children:[e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Multiplier"}),e.jsx("select",{className:"multiplier-select",value:R,onChange:t=>oe(+t.target.value),children:[100,200,300,400,500].map(t=>e.jsxs("option",{value:t,children:[t,"×"]},t))})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("div",{className:"checkbox-container",children:e.jsx("input",{type:"checkbox",checked:k,onChange:t=>$e(t.target.checked),className:"form-checkbox"})}),e.jsx("span",{className:"form-label",children:"Set Loss"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>be(-F),disabled:!k,children:"−"}),e.jsx("span",{className:"step-value",children:O(H)}),e.jsx("button",{className:"step-btn",onClick:()=>be(F),disabled:!k,children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("div",{className:"checkbox-container",children:e.jsx("input",{type:"checkbox",checked:n,onChange:t=>Ie(t.target.checked),className:"form-checkbox"})}),e.jsx("span",{className:"form-label",children:"Take Profit"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>ge(-F),disabled:!n,children:"−"}),e.jsx("span",{className:"step-value",children:O(m)}),e.jsx("button",{className:"step-btn",onClick:()=>ge(F),disabled:!n,children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Lots (Step:0.01)"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>he(-.01),children:"−"}),e.jsx("span",{className:"step-value",children:v.toFixed(2)}),e.jsx("button",{className:"step-btn",onClick:()=>he(.01),children:"+"})]})]})]}),e.jsx("div",{className:"form-divider"}),e.jsxs("div",{className:"info-section",children:[e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Each Lots"}),e.jsx("span",{className:"info-value",children:nt})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Estimated Handling Fee"}),e.jsx("span",{className:"info-value",children:at})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Estimated Margin"}),e.jsx("span",{className:"info-value",children:Ge})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Balance"}),e.jsx("span",{className:"info-value",children:Z.toFixed(2)})]})]}),e.jsxs("div",{className:"future-action-buttons",children:[e.jsx("button",{className:"action-button buy-button",onClick:()=>fe("buy"),disabled:r===null,children:p("pages.futures.actions.buyUp")}),e.jsx("button",{className:"action-button sell-button",onClick:()=>fe("sell"),disabled:r===null,children:p("pages.futures.actions.buyDown")})]})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"trading-form",children:[e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Multiplier"}),e.jsx("select",{className:"multiplier-select",value:R,onChange:t=>oe(+t.target.value),children:[100,200,300,400,500].map(t=>e.jsxs("option",{value:t,children:[t,"×"]},t))})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Trigger Price"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>Be(-F),children:"−"}),e.jsx("span",{className:"step-value",children:O(G)}),e.jsx("button",{className:"step-btn",onClick:()=>Be(F),children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("div",{className:"checkbox-container",children:e.jsx("input",{type:"checkbox",checked:k,onChange:t=>$e(t.target.checked),className:"form-checkbox"})}),e.jsx("span",{className:"form-label",children:"Set Loss"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>be(-F),disabled:!k,children:"−"}),e.jsx("span",{className:"step-value",children:O(H)}),e.jsx("button",{className:"step-btn",onClick:()=>be(F),disabled:!k,children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("div",{className:"checkbox-container",children:e.jsx("input",{type:"checkbox",checked:n,onChange:t=>Ie(t.target.checked),className:"form-checkbox"})}),e.jsx("span",{className:"form-label",children:"Take Profit"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>ge(-F),disabled:!n,children:"−"}),e.jsx("span",{className:"step-value",children:O(m)}),e.jsx("button",{className:"step-btn",onClick:()=>ge(F),disabled:!n,children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Lots (Step:0.01)"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>he(-.01),children:"−"}),e.jsx("span",{className:"step-value",children:v.toFixed(2)}),e.jsx("button",{className:"step-btn",onClick:()=>he(.01),children:"+"})]})]})]}),e.jsx("div",{className:"form-divider"}),e.jsxs("div",{className:"info-section",children:[e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Current Price"}),e.jsx("span",{className:"info-value",children:r!==null?r.toFixed(5):"—"})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Trigger at"}),e.jsx("span",{className:"info-value",style:{color:"#106cf5"},children:O(G)})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Estimated Margin"}),e.jsx("span",{className:"info-value",children:Ge})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Balance"}),e.jsx("span",{className:"info-value",children:Z.toFixed(2)})]})]}),e.jsxs("div",{className:"future-action-buttons",children:[e.jsx("button",{className:"action-button buy-button",onClick:()=>fe("buy","pending"),disabled:r===null||G<=0,children:"Buy Pending"}),e.jsx("button",{className:"action-button sell-button",onClick:()=>fe("sell","pending"),disabled:r===null||G<=0,children:"Sell Pending"})]})]}),C&&W&&e.jsx(kt,{selectedOrder:W,onClose:et,formatDateTimeDetailed:We,safeToFixed:Ze})]}),A&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"confirm-overlay",onClick:()=>!B&&S(!1)}),e.jsxs("div",{className:"confirm-sheet",children:[e.jsx("div",{className:"confirm-handle"}),e.jsx("div",{className:"confirm-title",children:U==="market"?"Confirm Market Order":"Confirm Pending Order"}),e.jsxs("div",{className:"confirm-summary",children:[e.jsxs("span",{className:`confirm-dir ${ae==="buy"?"buy":"sell"}`,children:[ae==="buy"?"Buy":"Sell",U==="pending"?" Pending":""]}),e.jsx("span",{className:"confirm-pair",children:l}),e.jsxs("span",{className:"confirm-meta",children:[v.toFixed(2)," Lots · ",R,"×"]}),U==="market"?e.jsxs("span",{className:"confirm-price",children:["@ ",r!==null?r.toFixed(5):"—"," (market)"]}):e.jsxs("span",{className:"confirm-price",children:["Trigger @ ",O(G)," · Now ",r!==null?r.toFixed(5):"—"]})]}),M&&e.jsx("div",{className:"confirm-error",children:M}),e.jsxs("div",{className:"confirm-buttons",children:[e.jsx("button",{className:"confirm-btn-primary",onClick:He,disabled:B,children:B?"Placing…":"Confirmation"}),e.jsx("button",{className:"confirm-btn-secondary",onClick:()=>{S(!1),y.push("/ordersPage")},disabled:B,children:"Order Page"})]})]})]}),e.jsx(Nt,{isOpen:te,onClose:Qe,direction:D,dispatch:i,listAssets:u,selectedCoin:l,marketPrice:(r==null?void 0:r.toString())??"0",availableBalance:Z,setOpeningOrders:Ne,isDemoAccount:ke}),e.jsx(xt,{isOpen:se,onClose:qe,selectedCoin:l,onCoinSelect:Ke,availableCoins:Ye.map(t=>({symbol:t.symbol,name:t.name})),title:p("pages.marketDetail.coinSelector.title")}),e.jsx("style",{children:`
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
      `})]})}const kt=({selectedOrder:i,onClose:y,formatDateTimeDetailed:u,safeToFixed:f})=>e.jsx("div",{className:"modal-overlays",onClick:y,children:e.jsxs("div",{className:"modal-content",onClick:ee=>ee.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{children:p("pages.futures.orderDetails.title")}),e.jsx("button",{className:"modal-close",onClick:y,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"order-detail-section",children:[e.jsxs("div",{className:"detail-header",children:[e.jsx("span",{className:"detail-pair",children:i.symbol||i.pair}),e.jsx("span",{className:`detail-direction ${i.futuresStatus==="long"||i.direction==="BUY UP"?"buy":"sell"}`,children:i.futuresStatus==="long"?p("pages.futures.actions.buyUp"):i.futuresStatus==="short"?p("pages.futures.actions.buyDown"):i.direction})]}),e.jsxs("div",{className:`detail-status ${i.finalized?"closed":"open"}`,children:["● ",i.finalized?p("pages.futures.orderDetails.closed"):p("pages.futures.orderDetails.open")]})]}),e.jsxs("div",{className:"order-detail-section",children:[e.jsx(T,{label:p("pages.futures.orderDetails.futuresAmount"),value:`${i.futuresAmount||i.investment} USD`}),i.contractDuration&&e.jsx(T,{label:p("pages.futures.orderDetails.contractDuration"),value:`${i.contractDuration} ${p("pages.futures.orderDetails.seconds")}`}),e.jsx(T,{label:p("pages.futures.orderDetails.futuresStatus"),value:i.closePositionTime?p("pages.futures.orderDetails.completed"):p("pages.futures.orderDetails.open")}),e.jsx(T,{label:p("pages.futures.orderDetails.openPositionPrice"),value:i.openPositionPrice||i.openPrice}),e.jsx(T,{label:p("pages.futures.orderDetails.openPositionTime"),value:u(i.openPositionTime||i.openTime)}),i.closePositionPrice&&e.jsx(T,{label:p("pages.futures.orderDetails.closePositionPrice"),value:i.closePositionPrice}),i.closePositionTime&&e.jsx(T,{label:p("pages.futures.orderDetails.closePositionTime"),value:u(i.closePositionTime)}),e.jsx(T,{label:p("pages.futures.orderDetails.profitLossAmount"),value:i.profitAndLossAmount||i.pnl?`${f(i.profitAndLossAmount||i.pnl,2)} USD`:"__",className:i.control==="profit"?"profit":"loss"}),e.jsx(T,{label:p("pages.futures.orderDetails.leverage"),value:`${i.leverage}X`})]})]}),e.jsx("div",{className:"modal-footer",children:e.jsx("button",{className:"modal-button",onClick:y,children:p("pages.futures.orderDetails.done")})})]})}),T=({label:i,value:y,className:u=""})=>e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:i}),e.jsx("span",{className:`detail-value ${u}`,children:y})]});export{Ct as default};
