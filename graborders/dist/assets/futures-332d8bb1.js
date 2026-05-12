import{i as o,O as _,S as _e,N as De,T as Oe,j as e,u as Q,w as Ye,M as be,q as We,z as Ze,o as d}from"./index-2a8b97bd.js";import{C as qe}from"./CoinSelectorSidebar-11c4ce0a.js";import{T as Xe}from"./TradingViewChart-ca19b1b5.js";import{g as He,b as Ke,a as Qe}from"./wsUrl-3b12c64b.js";import{u as et}from"./useDispatch-ba86bf5e.js";const tt=({isOpen:a,onClose:m,direction:p,dispatch:f,listAssets:j,selectedCoin:O,marketPrice:A,availableBalance:g,setOpeningOrders:I,isDemoAccount:ee=!1})=>{const[k,E]=o.useState("120"),[T,L]=o.useState("20"),[i,N]=o.useState(30),[r,v]=o.useState("configuring"),[U,B]=o.useState(0),[he,S]=o.useState(null),[te,Y]=o.useState(""),[W,R]=o.useState(null),[ce,w]=o.useState(""),[oe,G]=o.useState(!1),[b,Z]=o.useState(null),se=n=>Number.isFinite(n)?n.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}):"0.00",de=(n,c)=>{E(n),L(c)};o.useEffect(()=>(a?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[a]),o.useEffect(()=>{f(_.doFetch())},[f]),o.useEffect(()=>{i<30?Y("Minimum amount is 30 USD"):i>g?Y("Insufficient balance"):Y("")},[i,g]),o.useEffect(()=>{let n=null;return r==="in-progress"&&(U>0?n=setInterval(()=>{B(c=>c-1)},1e3):(async()=>await pe())()),()=>{n&&clearInterval(n)}},[r,U]);const ye=async()=>{if(!(!p||i<30||i>g)){G(!0);try{const n=parseFloat(A||"0")||0,c=await ue();if(!c||!c.id){G(!1);return}R(c.id),Z({futuresAmount:i,contractDuration:k,futuresStatus:p==="up"?"long":"short",openPositionPrice:n,closePositionPrice:null,leverage:1,openPositionTime:new Date,closePositionTime:null}),I(h=>[...h,{id:c.id,futuresAmount:i,contractDuration:k,futuresStatus:p==="up"?"long":"short",openPositionPrice:n,closePositionPrice:null,leverage:1,openPositionTime:new Date().toISOString(),closePositionTime:null}]);const u=parseInt(k,10)||0;B(u),v("in-progress")}catch(n){console.error("startTrade error",n)}finally{G(!1)}}},pe=async()=>{if(I([]),!W){S("loss"),w(`-${i.toFixed(2)} USD`),v("completed");return}try{const n=await f(_e.doFind(W)),c=n&&n.payload?n.payload:n;if(!c){S("loss"),w(`-${i.toFixed(2)} USD`),v("completed");return}if(c.finalized){const F=c.control==="profit",xe=Number(c.profitAndLossAmount??(F?J(i,1,T):-i));S(F?"win":"loss"),w(`${F?"+":""}${xe.toFixed(2)} USD`),v("completed"),f(_.doFetchPending()),f(_.doFetch());return}const u=c.futuresStatus==="long",h=1,q=parseInt(T,10),z=new Date;let D;ee?D=Math.random()<.85:D=Math.random()<.3;const y=c.openPositionPrice,re=.002+Math.random()*(.005-.002),$=y*(re/100);let C;D?C=u?y+$:y-$:C=u?y-$:y+$;const X=i*h*q/100,H=D?i+X:-i,ie={control:D?"profit":"loss",closePositionPrice:C,closePositionTime:z.toISOString(),profitAndLossAmount:H};try{await f(De.doUpdate(W,ie)),S(D?"win":"loss"),w(`${D?"+":""}${H.toFixed(2)} USD`),v("completed"),f(_.doFetchPending()),f(_.doFetch())}catch(F){console.error("Error finalizing trade:",F),S("loss"),w(`-${i.toFixed(2)} USD`),v("completed")}}catch(n){console.error("completeTrade error",n),S("loss"),w(`-${i.toFixed(2)} USD`),v("completed")}},ue=async()=>{const n=parseFloat(A||"0")||0,c={futuresStatus:p==="up"?"long":"short",profitAndLossAmount:"",leverage:1,control:"loss",operate:"low",futureCoin:O.replace("USD","/USD"),closePositionTime:"",closePositionPrice:"",openPositionTime:new Date().toISOString(),openPositionPrice:n,contractDuration:k,futuresAmount:i};try{const u=await f(De.doCreate(c)),h=u&&u.id?u:u&&u.payload?u.payload:null;return h&&h.id?(R(h.id),h):(console.warn("Create did not return created record"),null)}catch(u){return console.error("create error",u),null}},je=()=>{v("configuring"),I([]),S(null),B(0),R(null),w(""),Z(null),N(30),L("20"),E("120")},J=(n,c,u)=>{const h=Number.isFinite(n)?n:0,q=typeof c=="number"?c:parseInt(c,10)||0,z=parseInt(u,10)||0;return h*q*z/100},ne=()=>{if(r!=="in-progress")return 0;const n=parseInt(k,10)||1;return(n-U)/n*100},V=n=>{const c=Math.floor(n/60),u=n%60;return`${c.toString().padStart(2,"0")}:${u.toString().padStart(2,"0")}`},ae=n=>n?new Date(n).toLocaleTimeString():"-",me=n=>{const c=parseInt(n.target.value,10)||0;N(c)};return a?Oe.createPortal(e.jsxs("div",{className:"modal-overlay",onClick:m,children:[e.jsxs("div",{className:`modal-container ${p==="up"?"up-theme":"down-theme"}`,onClick:n=>n.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{className:"pair-info",children:e.jsx("div",{className:"pair-name",children:O.replace("USD","/USD")})}),e.jsx("button",{className:"close-btn",onClick:m,children:"×"})]}),r!=="configuring"&&e.jsxs("div",{className:"trade-progress-section",children:[e.jsx("div",{className:"progress-container",children:e.jsx("div",{className:"circular-progress",style:{background:`conic-gradient(${p==="up"?"#00C076":"#FF6838"} ${ne()}%, #3a3a3a ${ne()}%)`},children:e.jsxs("div",{className:"progress-inner",children:[e.jsx("div",{className:"progress-time",children:V(U)}),e.jsx("div",{className:"progress-label",children:"Remaining"})]})})}),b&&e.jsxs("div",{className:"trade-details",children:[e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Futures Amount:"}),e.jsxs("span",{children:[b.futuresAmount," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Contract Duration:"}),e.jsxs("span",{children:[b.contractDuration,"s"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Future Type:"}),e.jsx("span",{className:b.futuresStatus==="long"?"up-text":"down-text",children:b.futuresStatus.toUpperCase()})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Position Price:"}),e.jsxs("span",{children:[b.openPositionPrice.toFixed(4)," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Position Price:"}),e.jsxs("span",{children:[b.closePositionPrice?b.closePositionPrice.toFixed(4):"-"," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Leverage:"}),e.jsxs("span",{children:[b.leverage,"x"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Time:"}),e.jsx("span",{children:ae(b.openPositionTime)})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Time:"}),e.jsx("span",{children:ae(b.closePositionTime)})]})]}),e.jsxs("div",{className:"trade-actions",children:[r==="in-progress"&&e.jsx("button",{className:"trade-action-btn keep-buying",onClick:m,children:"Keep Buying"}),r==="completed"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"trade-action-btn secondary",onClick:m,children:"Close"}),e.jsx("button",{className:"trade-action-btn primary",onClick:je,children:"New Trade"})]})]})]}),r==="configuring"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`direction-indicator ${p}-indicator`,children:p==="up"?"Predicting price will go UP":"Predicting price will go DOWN"}),e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"section",children:[e.jsxs("div",{className:"section-title",children:[e.jsx("span",{children:"Contract Duration"}),e.jsx("span",{children:"Payout"})]}),e.jsx("div",{className:"options-container",children:[{duration:"60",payout:"10"},{duration:"120",payout:"20"},{duration:"180",payout:"40"},{duration:"240",payout:"80"}].map(n=>e.jsxs("button",{className:`option-btn ${k===n.duration?"selected":""}`,onClick:()=>de(n.duration,n.payout),children:[n.duration,"s (",n.payout,"%)"]},n.duration))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Futures Amount (USD)"})}),e.jsxs("div",{className:"amount-control",children:[e.jsx("button",{className:"amount-btn",onClick:()=>N(n=>Math.max(1,n-1)),children:"-"}),e.jsx("input",{type:"number",className:"amount-inputs",value:i,onChange:me,min:"1",placeholder:"Enter amount"}),e.jsx("button",{className:"amount-btn",onClick:()=>N(n=>n+1),children:"+"})]}),e.jsxs("div",{className:"balance-info",children:["Available: ",se(g)," USD"]}),te&&e.jsx("div",{className:"error-message",style:{color:"#FF6838",fontSize:"12px",marginTop:"5px"},children:te})]}),e.jsxs("div",{className:"profit-info",children:["Projected Profit: ",J(i,1,T).toFixed(2)," USD"]}),e.jsx("button",{className:"confirm-btn",onClick:ye,disabled:!p||i<30||i>g||oe,style:{opacity:!p||i<30||i>g?.5:1,cursor:!p||i<30||i>g?"not-allowed":"pointer"},children:oe?"CREATING...":i>g?"INSUFFICIENT BALANCE":"CONFIRM ORDER"})]})]})]}),e.jsx("style",{children:` 
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
`})]}),document.body):null},Fe=[{symbol:"XAUUSD",name:"Gold"},{symbol:"EURUSD",name:"EUR / USD"},{symbol:"GBPUSD",name:"GBP / USD"},{symbol:"BTCUSD",name:"Bitcoin"},{symbol:"ETHUSD",name:"Ethereum"},{symbol:"XAGUSD",name:"Silver"},{symbol:"AUDUSD",name:"AUD / USD"},{symbol:"USDJPY",name:"USD / JPY"},{symbol:"NZDUSD",name:"NZD / USD"},{symbol:"USDCHF",name:"USD / CHF"},{symbol:"USDCAD",name:"USD / CAD"},{symbol:"LTCUSD",name:"Litecoin"},{symbol:"USOIL",name:"US Oil"},{symbol:"UKOIL",name:"UK Oil"},{symbol:"EURJPY",name:"EUR / JPY"},{symbol:"EURCHF",name:"EUR / CHF"},{symbol:"AUDNZD",name:"AUD / NZD"},{symbol:"GBPAUD",name:"GBP / AUD"},{symbol:"AUDJPY",name:"AUD / JPY"},{symbol:"EURNZD",name:"EUR / NZD"},{symbol:"CADJPY",name:"CAD / JPY"},{symbol:"NZDJPY",name:"NZD / JPY"},{symbol:"EURAUD",name:"EUR / AUD"},{symbol:"GBPJPY",name:"GBP / JPY"},{symbol:"EURCAD",name:"EUR / CAD"},{symbol:"GBPNZD",name:"GBP / NZD"},{symbol:"EURGBP",name:"EUR / GBP"},{symbol:"NAS100",name:"Nasdaq 100"},{symbol:"AUS200",name:"ASX 200"},{symbol:"ESP35",name:"IBEX 35"},{symbol:"FRA40",name:"CAC 40"},{symbol:"GER30",name:"DAX 30"},{symbol:"SPX500",name:"S&P 500"},{symbol:"US30",name:"Dow Jones 30"},{symbol:"UK100",name:"FTSE 100"},{symbol:"JPN225",name:"Nikkei 225"}];function ct(){const a=et(),m=Q(Ye.selectRows),p=Q(be.pendingRows);Q(be.pendingcount);const f=Q(be.pendingLoading);Q(We.selectCurrentUser);const j=o.useRef(null),O=o.useRef(null),A=o.useRef(null),g=o.useRef(null),[I,ee]=o.useState([]),[x,k]=o.useState(null),[E,T]=o.useState(null),L=o.useRef({}),i=o.useRef({}),N=o.useRef({}),[r,v]=o.useState("EURUSD"),[U,B]=o.useState("marketPrice"),[he,S]=o.useState(!1),[te,Y]=o.useState(null),[W,R]=o.useState(!1),[ce,w]=o.useState(null),[oe,G]=o.useState(!1),[b,Z]=o.useState(!0),[se,de]=o.useState(0),[ye,pe]=o.useState([]),[ue,je]=o.useState(!1),[J,ne]=o.useState(100),[V,ae]=o.useState(!1),[me,n]=o.useState(0),[c,u]=o.useState(!1),[h,q]=o.useState(0),[z,D]=o.useState(.01),y=o.useCallback(t=>`~m~${t.length}~m~${t}`,[]),re=o.useCallback(t=>{const s=[];let l=t;for(;l.length>0&&l.startsWith("~m~");){const M=l.indexOf("~m~",3),le=parseInt(l.substring(3,M)),K=l.substr(M+3,le);s.push(K),l=l.substr(M+3+le)}return s},[]),$=o.useCallback(t=>{try{const s=t.replace(/^=\{/,"{");return JSON.parse(s).symbol||"UNKNOWN"}catch{return t}},[]),C=o.useCallback(t=>{const s=j.current,l=O.current;!s||s.readyState!==WebSocket.OPEN||!l||A.current!==t&&(A.current&&s.send(y(JSON.stringify({m:"quote_remove_symbols",p:[l,A.current]}))),s.send(y(JSON.stringify({m:"quote_add_symbols",p:[l,t]}))),A.current=t,ee([]),k(null),T(null),Z(!0),delete i.current[t],delete N.current[t],delete L.current[t])},[y]),X=o.useCallback(()=>{j.current&&(j.current.close(),j.current=null);const t=new WebSocket(He());j.current=t,t.onopen=()=>{const s="qs_"+Math.random().toString(36).substring(2,12);O.current=s,t.send(y(JSON.stringify({m:"quote_create_session",p:[s]}))),t.send(y(JSON.stringify({m:"quote_set_fields",p:[s,"ask","bid"]})));const l=H.current;C(l)},t.onmessage=s=>{const l=s.data;if(l.startsWith("~h~")){t.send(l);return}re(l).forEach(le=>{try{const K=JSON.parse(le);if(K.m==="qsd"){const ke=K.p[1],Se=$(ke.n),ge=ke.v;if(!ge)return;const Ge={symbol:Se,ask:ge.ask??0,bid:ge.bid??0};ee(Je=>[...Je.filter(Ve=>Ve.symbol!==Se),Ge])}}catch{}})},t.onclose=s=>{A.current=null,s.wasClean||(g.current=setTimeout(()=>X(),3e3))},t.onerror=s=>console.error("WebSocket error:",s)},[y,re,$,C]),H=o.useRef(r);o.useEffect(()=>{H.current=r},[r]),o.useEffect(()=>(X(),()=>{g.current&&clearTimeout(g.current),j.current&&j.current.close()}),[X]),o.useEffect(()=>{C(r)},[r,C]),o.useEffect(()=>{const t=I.find(l=>l.symbol===r);if(!t||!t.ask||!t.bid)return;const s=(t.ask+t.bid)/2;if(k(s),Z(!1),L.current[r]===void 0)L.current[r]=s,T(0);else{const l=L.current[r],M=(s-l)/l*100;T(M)}(!i.current[r]||s>i.current[r])&&(i.current[r]=s),(!N.current[r]||s<N.current[r])&&(N.current[r]=s)},[I,r]);const ie=o.useCallback(()=>{if((m==null?void 0:m.length)>0){const t=m.find(s=>s.symbol==="USDT");de((t==null?void 0:t.amount)||0)}},[m]);o.useEffect(()=>{ie()},[ie]),o.useEffect(()=>{a(_.doFetchPending()),a(Ze.doFetch())},[a]);const F=o.useCallback((t,s)=>{if(t==null)return"0.00";const l=typeof t=="string"?parseFloat(t):t;return isNaN(l)?"0.00":l.toFixed(s??5)},[]);o.useCallback(t=>{if(!t)return d("pages.assetsDetail.status.pending");try{const s=new Date(t);if(isNaN(s.getTime()))return t;const l=new Date;return s.toDateString()===l.toDateString()?d("pages.history.dateFormats.today",s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):d("pages.history.dateFormats.yesterday",s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))}catch{return t}},[]);const xe=o.useCallback(t=>{if(!t)return d("pages.assetsDetail.status.pending");try{const s=new Date(t);return isNaN(s.getTime())?t:`${s.toLocaleDateString([],{year:"numeric",month:"short",day:"numeric"})} ${s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}`}catch{return t}},[]),Pe=o.useCallback((t,s=2)=>{if(t==null)return"0.00";const l=typeof t=="string"?parseFloat(t):t;return isNaN(l)?"0.00":l.toFixed(s)},[]),Ae=()=>R(!0),Ue=()=>R(!1),Ce=t=>{v(t),R(!1)},Ee=()=>{S(!1),Y(null)},Te=t=>{w(t),G(!0)},Le=()=>{G(!1),w(null)},fe=o.useMemo(()=>{const t=Fe.find(s=>s.symbol===r);return(t==null?void 0:t.name)||r.replace(/(.{3})(.{3})/,"$1 / $2")},[r]),Re=o.useMemo(()=>Ke(r)||{symbol:r,name:fe},[r,fe]),ze=i.current[r]??x??0,$e=N.current[r]??x??0,Ne=t=>{V&&n(s=>Math.max(0,+(s+t).toFixed(5)))},ve=t=>{c&&q(s=>Math.max(0,+(s+t).toFixed(5)))},we=t=>{D(s=>Math.max(.01,+(s+t).toFixed(2)))},Me=o.useMemo(()=>`1 Lots = ${(100*(x??0)).toFixed(2)} ${r.replace(/(.{3})/,"$1")}`,[x,r]),Ie="0.000012",Be=o.useMemo(()=>{const t=x??0;return(z*100*t/J).toFixed(6)},[z,x,J]);return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-top",children:[e.jsxs("div",{className:"market-info",children:[e.jsx(Qe,{pair:Re,size:"md"}),e.jsx("div",{className:"market-name",children:fe}),e.jsx("div",{className:"market-change",style:{color:(E??0)<0?"#ff4d4d":"#36f936"},children:x!==null?`${(E??0)>0?"+":""}${(E??0).toFixed(2)}%`:e.jsx("div",{className:"loading-placeholder",style:{width:"50px",height:"16px"}})})]}),e.jsx("div",{className:"additional-actions",onClick:Ae,children:e.jsx("i",{className:"fas fa-filter"})})]}),e.jsx("div",{className:"market-price",style:{color:(E??0)<0?"#ff4d4d":"#36f936"},children:x!==null?`$${F(x)}`:e.jsx("div",{className:"loading-placeholder",style:{width:"120px",height:"28px"}})}),e.jsxs("div",{className:"market-stats",children:[e.jsxs("span",{children:[d("pages.marketDetail.stats.high"),":"," ",x!==null?`$${F(ze)}`:e.jsx("div",{className:"loading-placeholder",style:{width:"80px",height:"12px"}})]}),e.jsxs("span",{children:[d("pages.marketDetail.stats.low"),":"," ",x!==null?`$${F($e)}`:e.jsx("div",{className:"loading-placeholder",style:{width:"80px",height:"12px"}})]})]})]}),e.jsxs("div",{className:"content-card",children:[e.jsx(Xe,{symbol:r,height:400},r),e.jsxs("div",{className:"pill-tabs",children:[e.jsx("div",{className:`pill-tab ${U==="marketPrice"?"active":""}`,onClick:()=>B("marketPrice"),children:"Market Price"}),e.jsx("div",{className:`pill-tab ${U==="pendingOrders"?"active":""}`,onClick:()=>B("pendingOrders"),children:"Pending Orders"})]}),U==="marketPrice"?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"trading-form",children:[e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Multiplier"}),e.jsxs("div",{className:"multiplier-input",children:[e.jsx("input",{type:"number",className:"multiplier-value",value:J,onChange:t=>ne(Math.max(1,+t.target.value))}),e.jsx("i",{className:"fas fa-chevron-right arrow-icon"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("div",{className:"checkbox-container",children:e.jsx("input",{type:"checkbox",checked:V,onChange:t=>ae(t.target.checked),className:"form-checkbox"})}),e.jsx("span",{className:"form-label",children:"Set Loss"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>Ne(-1e-5),disabled:!V,children:"−"}),e.jsx("span",{className:"step-value",children:me.toFixed(5)}),e.jsx("button",{className:"step-btn",onClick:()=>Ne(1e-5),disabled:!V,children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("div",{className:"checkbox-container",children:e.jsx("input",{type:"checkbox",checked:c,onChange:t=>u(t.target.checked),className:"form-checkbox"})}),e.jsx("span",{className:"form-label",children:"Take Profit"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>ve(-1e-5),disabled:!c,children:"−"}),e.jsx("span",{className:"step-value",children:h.toFixed(5)}),e.jsx("button",{className:"step-btn",onClick:()=>ve(1e-5),disabled:!c,children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Lots (Step:0.01)"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>we(-.01),children:"−"}),e.jsx("span",{className:"step-value",children:z.toFixed(2)}),e.jsx("button",{className:"step-btn",onClick:()=>we(.01),children:"+"})]})]})]}),e.jsx("div",{className:"form-divider"}),e.jsxs("div",{className:"info-section",children:[e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Each Lots"}),e.jsx("span",{className:"info-value",children:Me})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Estimated Handling Fee"}),e.jsx("span",{className:"info-value",children:Ie})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Estimated Margin"}),e.jsx("span",{className:"info-value",children:Be})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Balance"}),e.jsx("span",{className:"info-value",children:se.toFixed(2)})]})]}),e.jsxs("div",{className:"future-action-buttons",children:[e.jsx("button",{className:"action-button buy-button",children:d("pages.futures.actions.buyUp")}),e.jsx("button",{className:"action-button sell-button",children:d("pages.futures.actions.buyDown")})]})]}):e.jsx("div",{className:"pending-orders-container",children:f?e.jsx("div",{className:"loading-placeholder",style:{height:"200px"}}):p&&p.length>0?p.map(t=>e.jsxs("div",{className:"order-card",onClick:()=>Te(t),children:[e.jsxs("div",{className:"order-header",children:[e.jsx("span",{className:"order-pair",children:t.symbol||t.pair}),e.jsx("span",{className:`order-direction ${t.futuresStatus==="long"||t.direction==="BUY UP"?"buy":"sell"}`,children:t.futuresStatus==="long"?d("pages.futures.actions.buyUp"):t.futuresStatus==="short"?d("pages.futures.actions.buyDown"):t.direction})]}),e.jsx("div",{className:"order-status open",children:"● Open"}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:"Amount"}),e.jsxs("span",{className:"order-value",children:[t.futuresAmount||t.investment," USD"]})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:"Open Price"}),e.jsx("span",{className:"order-value",children:t.openPositionPrice||t.openPrice})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:"Leverage"}),e.jsxs("span",{className:"order-value",children:[t.leverage,"X"]})]})]})]},t.id)):e.jsxs("div",{className:"no-orders",children:[e.jsx("i",{className:"fas fa-inbox"}),"No pending orders"]})}),oe&&ce&&e.jsx(ot,{selectedOrder:ce,onClose:Le,formatDateTimeDetailed:xe,safeToFixed:Pe})]}),e.jsx(tt,{isOpen:he,onClose:Ee,direction:te,dispatch:a,listAssets:m,selectedCoin:r,marketPrice:(x==null?void 0:x.toString())??"0",availableBalance:se,setOpeningOrders:pe,isDemoAccount:ue}),e.jsx(qe,{isOpen:W,onClose:Ue,selectedCoin:r,onCoinSelect:Ce,availableCoins:Fe.map(t=>({symbol:t.symbol,name:t.name})),title:d("pages.marketDetail.coinSelector.title")}),e.jsx("style",{children:`
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

        .multiplier-input {
          display: flex;
          align-items: center;
          flex: 1;
          background: #f0f2f5;
          border-radius: 8px;
          padding: 6px 10px;
        }

        .multiplier-value {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          text-align: center;
          outline: none;
        }

        .arrow-icon {
          color: #aaa;
          font-size: 12px;
          margin-left: 4px;
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

        /* Responsive */
        @media (max-width: 380px) {
          .header { padding: 16px; min-height: 50px; }
          .content-card { padding: 25px 16px 100px; }
        }
        @media (min-width: 768px) {
          .content-card { border-radius: 30px 30px 0 0; }
        }
      `})]})}const ot=({selectedOrder:a,onClose:m,formatDateTimeDetailed:p,safeToFixed:f})=>e.jsx("div",{className:"modal-overlays",onClick:m,children:e.jsxs("div",{className:"modal-content",onClick:j=>j.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{children:d("pages.futures.orderDetails.title")}),e.jsx("button",{className:"modal-close",onClick:m,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"order-detail-section",children:[e.jsxs("div",{className:"detail-header",children:[e.jsx("span",{className:"detail-pair",children:a.symbol||a.pair}),e.jsx("span",{className:`detail-direction ${a.futuresStatus==="long"||a.direction==="BUY UP"?"buy":"sell"}`,children:a.futuresStatus==="long"?d("pages.futures.actions.buyUp"):a.futuresStatus==="short"?d("pages.futures.actions.buyDown"):a.direction})]}),e.jsxs("div",{className:`detail-status ${a.finalized?"closed":"open"}`,children:["● ",a.finalized?d("pages.futures.orderDetails.closed"):d("pages.futures.orderDetails.open")]})]}),e.jsxs("div",{className:"order-detail-section",children:[e.jsx(P,{label:d("pages.futures.orderDetails.futuresAmount"),value:`${a.futuresAmount||a.investment} USD`}),a.contractDuration&&e.jsx(P,{label:d("pages.futures.orderDetails.contractDuration"),value:`${a.contractDuration} ${d("pages.futures.orderDetails.seconds")}`}),e.jsx(P,{label:d("pages.futures.orderDetails.futuresStatus"),value:a.closePositionTime?d("pages.futures.orderDetails.completed"):d("pages.futures.orderDetails.open")}),e.jsx(P,{label:d("pages.futures.orderDetails.openPositionPrice"),value:a.openPositionPrice||a.openPrice}),e.jsx(P,{label:d("pages.futures.orderDetails.openPositionTime"),value:p(a.openPositionTime||a.openTime)}),a.closePositionPrice&&e.jsx(P,{label:d("pages.futures.orderDetails.closePositionPrice"),value:a.closePositionPrice}),a.closePositionTime&&e.jsx(P,{label:d("pages.futures.orderDetails.closePositionTime"),value:p(a.closePositionTime)}),e.jsx(P,{label:d("pages.futures.orderDetails.profitLossAmount"),value:a.profitAndLossAmount||a.pnl?`${f(a.profitAndLossAmount||a.pnl,2)} USD`:"__",className:a.control==="profit"?"profit":"loss"}),e.jsx(P,{label:d("pages.futures.orderDetails.leverage"),value:`${a.leverage}X`})]})]}),e.jsx("div",{className:"modal-footer",children:e.jsx("button",{className:"modal-button",onClick:m,children:d("pages.futures.orderDetails.done")})})]})}),P=({label:a,value:m,className:p=""})=>e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:a}),e.jsx("span",{className:`detail-value ${p}`,children:m})]});export{ct as default};
