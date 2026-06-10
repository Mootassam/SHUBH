import{u as $,i as ae,j as a,k as Z,A as ye,n as e,o as s,p as Se,q as Qe,t as Ue,R as Ye,v as Fe,L as Pe,S as Ve,w as Re,x as le,y as We,z as Be,B as $e,C as Je,D as be,E as qe,F as Ze}from"./index-2251a5d2.js";import{g as He,P as De,u as _e,a as Ke,b as Te}from"./useSymbolInjections-e7a2341e.js";import{C as Xe}from"./CustomTradingChart-aa938491.js";import{l as Ge}from"./layoutActions-257c1439.js";import{u as ge}from"./useDispatch-966e01a1.js";function et({initialMode:n="login",onClose:h}){const p=ge(),M=$(ae.selectLoading),u=$(ae.selectErrorMessage),[k,D]=a.useState(n),[j,f]=a.useState(""),[m,T]=a.useState(""),[z,H]=a.useState(!0),[C,_]=a.useState(""),[U,I]=a.useState(""),[i,o]=a.useState(null),[x,K]=a.useState(""),[Y,A]=a.useState(!1),[S,F]=a.useState(!1),[P,w]=a.useState(!1),[ie,X]=a.useState(!1),[V,y]=a.useState(null);a.useEffect(()=>{p(Z.doClearErrorMessage())},[p]);const E=r=>{D(r),o(null),y(null),p(Z.doClearErrorMessage())},J=a.useCallback(async()=>{var r,L,O,R;if(o(null),y(null),!j||!/^\S+@\S+\.\S+$/.test(j)){o("Please enter a valid email address first.");return}w(!0);try{await ye.sendOtp(j),A(!0),F(!1),K(""),y("We sent a 6-digit code to your email.")}catch(v){o(((R=(O=(L=(r=v==null?void 0:v.response)==null?void 0:r.data)==null?void 0:L.errors)==null?void 0:O[0])==null?void 0:R.message)||"Failed to send code. Try again.")}finally{w(!1)}},[j]),oe=a.useCallback(async()=>{var r,L,O,R;if(o(null),y(null),!x||x.length<4){o("Enter the code from your email.");return}X(!0);try{await ye.verifyOtp(j,x),F(!0),y("Email verified ✓")}catch(v){F(!1),o(((R=(O=(L=(r=v==null?void 0:v.response)==null?void 0:r.data)==null?void 0:L.errors)==null?void 0:O[0])==null?void 0:R.message)||"Invalid code.")}finally{X(!1)}},[j,x]),re=r=>{if(r.preventDefault(),o(null),!j||!m){o(s("pc.emailPwRequired"));return}p(Z.doSigninWithEmailAndPassword(j,m,z))},ce=r=>{if(r.preventDefault(),o(null),!j||!m||!C){o(s("pc.fillRequired"));return}if(m.length<8){o(s("pc.pwMin"));return}if(m!==U){o(s("pc.pwMismatch"));return}if(!S){o("Please verify your email before signing up.");return}p(Z.doRegisterEmailAndPassword(j,m,C))},G=()=>p(Z.doDemoLogin()),ee=i||u;return e.jsxs("div",{className:"pc-modal-overlay",onClick:h,children:[e.jsxs("div",{className:"pc-auth-modal",onClick:r=>r.stopPropagation(),children:[e.jsx("button",{className:"pc-modal-x",onClick:h,children:"✕"}),e.jsxs("div",{className:"pc-auth-tabs",children:[e.jsx("button",{className:k==="login"?"active":"",onClick:()=>E("login"),children:s("pc.login")}),e.jsx("button",{className:k==="register"?"active":"",onClick:()=>E("register"),children:s("pc.register")})]}),ee&&e.jsx("div",{className:"pc-auth-error",children:ee}),!ee&&V&&e.jsx("div",{className:"pc-auth-ok",children:V}),k==="login"?e.jsxs("form",{className:"pc-auth-form",onSubmit:re,children:[e.jsx("label",{children:s("pc.email")}),e.jsx("input",{type:"email",value:j,onChange:r=>f(r.target.value),placeholder:"you@example.com",autoComplete:"email",autoFocus:!0}),e.jsx("label",{children:s("pc.password")}),e.jsx("input",{type:"password",value:m,onChange:r=>T(r.target.value),placeholder:"••••••••",autoComplete:"current-password"}),e.jsx("div",{className:"pc-auth-remember",children:e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",checked:z,onChange:r=>H(r.target.checked)})," ",s("pc.rememberMe")]})}),e.jsx("button",{type:"submit",className:"pc-auth-submit",disabled:M,children:M?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"})," ",s("pc.signingIn")]}):s("pc.login")}),e.jsx("button",{type:"button",className:"pc-auth-demo",onClick:G,disabled:M,children:M?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"})," ",s("pc.loading")]}):s("pc.demoLogin")})]}):e.jsxs("form",{className:"pc-auth-form",onSubmit:ce,children:[e.jsx("label",{children:s("pc.email")}),e.jsxs("div",{className:"pc-otp-email-row",children:[e.jsx("input",{type:"email",value:j,onChange:r=>f(r.target.value),placeholder:"you@example.com",autoComplete:"email",autoFocus:!0}),e.jsx("button",{type:"button",className:"pc-otp-send",onClick:J,disabled:P||S,children:S?"Verified":P?"Sending…":Y?"Resend":"Send Code"})]}),Y&&e.jsxs(e.Fragment,{children:[e.jsx("label",{children:"Email Verification Code"}),e.jsxs("div",{className:"pc-otp-code-row",children:[e.jsx("input",{type:"text",inputMode:"numeric",maxLength:6,value:x,onChange:r=>{K(r.target.value.replace(/[^0-9]/g,"")),F(!1)},placeholder:"6-digit code",disabled:S}),e.jsx("button",{type:"button",className:"pc-otp-verify",onClick:oe,disabled:ie||S,children:S?"✓":ie?"…":"Verify"})]})]}),e.jsx("label",{children:s("pc.phone")}),e.jsx("input",{type:"tel",value:C,onChange:r=>_(r.target.value),placeholder:s("pc.phone"),autoComplete:"tel"}),e.jsx("label",{children:s("pc.password")}),e.jsx("input",{type:"password",value:m,onChange:r=>T(r.target.value),placeholder:s("pc.passwordHint"),autoComplete:"new-password"}),e.jsx("label",{children:s("pc.confirmPassword")}),e.jsx("input",{type:"password",value:U,onChange:r=>I(r.target.value),placeholder:s("pc.reenterPassword"),autoComplete:"new-password"}),e.jsx("button",{type:"submit",className:"pc-auth-submit",disabled:M,children:M?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"})," ",s("pc.creatingAccount")]}):s("pc.createAccount")})]}),e.jsx("div",{className:"pc-auth-switch",children:k==="login"?e.jsxs("span",{children:[s("pc.noAccount")," ",e.jsx("a",{onClick:()=>E("register"),children:s("pc.register")})]}):e.jsxs("span",{children:[s("pc.haveAccount")," ",e.jsx("a",{onClick:()=>E("login"),children:s("pc.login")})]})})]}),e.jsx("style",{children:`
        .pc-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.55);
          backdrop-filter: blur(4px); z-index: 10000;
          display: flex; align-items: center; justify-content: center;
        }
        .pc-auth-modal {
          background: #fff; border-radius: 16px; width: 400px; max-width: 92vw;
          padding: 28px; position: relative; box-shadow: 0 24px 64px rgba(0,0,0,0.25);
          max-height: 92vh; overflow-y: auto;
        }
        .pc-modal-x { position: absolute; top: 14px; right: 16px; border: none; background: none; font-size: 18px; color: #9ca3af; cursor: pointer; }
        .pc-auth-tabs { display: flex; gap: 8px; margin-bottom: 18px; }
        .pc-auth-tabs button { flex: 1; padding: 10px; border: none; border-radius: 8px; cursor: pointer; background: #f0f2f5; color: #6b7280; font-weight: 600; font-size: 14px; }
        .pc-auth-tabs button.active { background: #0064FA; color: #fff; }
        .pc-auth-form { display: flex; flex-direction: column; gap: 5px; }
        .pc-auth-form label { font-size: 12px; color: #6b7280; font-weight: 600; margin-top: 8px; }
        .pc-auth-form input[type=email], .pc-auth-form input[type=password], .pc-auth-form input[type=tel], .pc-auth-form input[type=text] {
          padding: 11px 13px; border: 1.5px solid #e5e7eb; border-radius: 8px; font-size: 14px; outline: none; transition: border-color .15s; width: 100%;
        }
        .pc-auth-form input:focus { border-color: #0064FA; }
        .pc-auth-remember { margin-top: 10px; font-size: 13px; color: #6b7280; }
        .pc-auth-remember label { display: flex; align-items: center; gap: 6px; cursor: pointer; }
        /* OTP email verification */
        .pc-otp-email-row, .pc-otp-code-row { display: flex; gap: 8px; align-items: stretch; }
        .pc-otp-email-row input, .pc-otp-code-row input { flex: 1; }
        .pc-otp-code-row input { letter-spacing: 4px; font-weight: 700; }
        .pc-otp-send, .pc-otp-verify {
          flex: 0 0 auto; padding: 0 14px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; white-space: nowrap;
        }
        .pc-otp-send { border: none; background: #0064FA; color: #fff; }
        .pc-otp-send:hover:not(:disabled) { background: #0052d4; }
        .pc-otp-verify { border: 1.5px solid #0064FA; background: #fff; color: #0064FA; }
        .pc-otp-verify:hover:not(:disabled) { background: #e8f0ff; }
        .pc-otp-send:disabled, .pc-otp-verify:disabled { opacity: .6; cursor: default; }
        .pc-auth-error { color: #dc2626; font-size: 13px; margin-bottom: 12px; padding: 9px 12px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; }
        .pc-auth-ok { color: #15803d; font-size: 13px; margin-bottom: 12px; padding: 9px 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; }
        .pc-auth-submit { margin-top: 16px; padding: 13px; border: none; border-radius: 10px; background: #0064FA; color: #fff; font-weight: 700; font-size: 15px; cursor: pointer; }
        .pc-auth-submit:disabled { opacity: .6; cursor: default; }
        .pc-auth-demo { margin-top: 10px; padding: 12px; border: 1.5px solid #0064FA; border-radius: 10px; background: #fff; color: #0064FA; font-weight: 700; font-size: 14px; cursor: pointer; }
        .pc-auth-demo:hover:not(:disabled) { background: #e8f0ff; }
        .pc-auth-demo:disabled { opacity: .6; cursor: default; }
        .pc-auth-switch { text-align: center; margin-top: 16px; font-size: 13px; color: #6b7280; }
        .pc-auth-switch a { color: #0064FA; cursor: pointer; font-weight: 600; }
      `})]})}const tt=[{icon:"fas fa-id-card",name:s("pc.kyc"),path:"/proof",lockWhenVerified:!0},{icon:"fas fa-link",name:s("pc.bindAccount"),path:"/bind-account"},{icon:"fas fa-list",name:s("pc.orders"),path:"/ordersPage"},{icon:"fas fa-money-bill",name:s("pc.deposit"),path:"/deposit",requiresKyc:!0},{icon:"fas fa-arrow-up",name:s("pc.withdraw"),path:"/Withdraw",requiresKyc:!0},{icon:"fas fa-shield-alt",name:s("pc.password"),path:"/typepassword",requiresKyc:!0},{icon:"fas fa-file-alt",name:s("pc.history"),path:"/history",requiresKyc:!0},{icon:"fas fa-bell",name:s("pc.notifications"),path:"/notification"},{icon:"fas fa-headset",name:s("pc.onlineService"),path:"/online-service"},{icon:"fas fa-building",name:s("pc.aboutUs"),path:"/about"},{icon:"fas fa-question-circle",name:s("pc.help"),path:"/support"}],ke=new Set,st=[...le.privateRoutes,...le.screenRoutes,...le.routeswithoutmobilemenue,...le.navRoutes].filter(n=>!(n!=null&&n.path)||ke.has(n.path)?!1:(ke.add(n.path),!0)).map(n=>({path:n.path,Component:We({loader:n.loader})}));function at({onClose:n}){var I;const h=ge(),p=$(ae.selectCurrentUser),M=$(Se.selectKycStatus);a.useEffect(()=>{h(Qe.doFetch())},[h]),a.useEffect(()=>{const i=Be(),o={push:i.push,replace:i.replace,go:i.go,goBack:i.goBack,goForward:i.goForward},x=()=>{};return i.push=x,i.replace=x,i.go=x,i.goBack=x,i.goForward=x,()=>{i.push=o.push,i.replace=o.replace,i.go=o.go,i.goBack=o.goBack,i.goForward=o.goForward}},[]);const u=M==="success",k=(p==null?void 0:p.accountType)==="demo",D=a.useMemo(()=>tt.map(i=>({...i,disabled:i.requiresKyc?!u||k:i.lockWhenVerified?u:!1})),[u,k]),j=((I=D.find(i=>!i.disabled))==null?void 0:I.path)||"/proof",[f,m]=a.useState({path:j,n:0}),T=a.useMemo(()=>Ue({initialEntries:[f.path]}),[f]),[z,H]=a.useState(!1);a.useEffect(()=>{const i=()=>H(T.index>0);return i(),T.listen(i)},[T]);const C=i=>{i.disabled||m(o=>({path:i.path,n:o.n+1}))};a.useEffect(()=>{const i=D.find(o=>o.path===f.path);if(i!=null&&i.disabled){const o=D.find(x=>!x.disabled);o&&m(x=>({path:o.path,n:x.n+1}))}},[D,f.path]);const _=M==="success"?s("pc.verified"):M==="pending"?s("pc.pendingReview"):s("pc.notVerified"),U=M==="success"?"#10b981":M==="pending"?"#f59e0b":"#ef4444";return e.jsxs("div",{className:"pc-modal-overlay",onClick:n,children:[e.jsxs("div",{className:"pc-profile-modal",onClick:i=>i.stopPropagation(),children:[e.jsx("button",{className:"pc-modal-x",onClick:n,children:"✕"}),e.jsxs("aside",{className:"pc-profile-side",children:[e.jsxs("div",{className:"pc-profile-user",children:[e.jsx("div",{className:"pc-profile-avatar",children:((p==null?void 0:p.firstName)||(p==null?void 0:p.email)||"U").charAt(0).toUpperCase()}),e.jsx("div",{className:"pc-profile-email",children:(p==null?void 0:p.email)||"—"}),e.jsxs("div",{className:"pc-kyc-badge",style:{color:U,borderColor:U},children:[e.jsx("i",{className:M==="success"?"fas fa-check-circle":M==="pending"?"fas fa-clock":"fas fa-exclamation-circle"}),_]})]}),!u&&e.jsx("div",{className:"pc-kyc-hint",children:k?s("pc.demoNoFeatures"):s("pc.completeKyc")}),e.jsxs("nav",{className:"pc-profile-menu",children:[D.map(i=>e.jsxs("button",{className:`${f.path===i.path?"active":""} ${i.disabled?"disabled":""}`,onClick:()=>C(i),disabled:i.disabled,children:[e.jsx("i",{className:i.icon})," ",e.jsx("span",{children:i.name}),i.disabled&&e.jsx("i",{className:"fas fa-lock pc-lock"})]},i.name)),e.jsxs("button",{className:"pc-profile-logout",onClick:()=>{h(Z.doSignout()),n()},children:[e.jsx("i",{className:"fas fa-sign-out-alt"})," ",e.jsx("span",{children:s("pc.logout")})]})]})]}),e.jsxs("section",{className:`pc-profile-content ${z?"pc-nav-sub":"pc-nav-root"}`,children:[z&&e.jsx("div",{className:"pc-nav-bar",children:e.jsxs("button",{className:"pc-nav-back",onClick:()=>T.goBack(),children:[e.jsx("span",{className:"pc-nav-back-ico",children:"←"})," ",s("pc.back")]})}),e.jsx(Ye,{history:T,children:e.jsx(Fe.Suspense,{fallback:e.jsx(Pe,{}),children:e.jsx(Ve,{children:st.map(i=>e.jsx(Re,{exact:!0,path:i.path,component:i.Component},i.path))})})},`mem-${f.n}`)]})]}),e.jsx("style",{children:`
        .pc-profile-modal {
          background: #fff; border-radius: 16px; width: 1000px; max-width: 96vw;
          height: 660px; max-height: 92vh; position: relative; display: flex;
          overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,0.28);
        }
        .pc-modal-x { position: absolute; top: 12px; right: 16px; border: none; background: none; font-size: 18px; color: #9ca3af; cursor: pointer; z-index: 5; }
        .pc-profile-side {
          width: 250px; flex-shrink: 0; background: #f7f8fa; border-right: 1px solid #e5e7eb;
          padding: 22px 14px; display: flex; flex-direction: column;
        }
        .pc-profile-user { text-align: center; margin-bottom: 14px; }
        .pc-profile-avatar {
          width: 56px; height: 56px; border-radius: 50%; background: #0064FA; color: #fff;
          font-size: 24px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;
        }
        .pc-profile-email { font-size: 12px; color: #6b7280; word-break: break-all; margin-bottom: 8px; }
        .pc-kyc-badge {
          display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700;
          border: 1.5px solid; border-radius: 20px; padding: 3px 12px;
        }
        .pc-kyc-hint {
          background: #fff7ed; border: 1px solid #fed7aa; color: #c2410c; font-size: 11px;
          border-radius: 8px; padding: 8px 10px; margin-bottom: 12px; line-height: 1.4; text-align: center;
        }
        .pc-profile-menu { display: flex; flex-direction: column; gap: 4px; flex: 1; overflow-y: auto; }
        .pc-profile-menu button {
          display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: none;
          background: none; border-radius: 8px; cursor: pointer; font-size: 14px; color: #374151;
          text-align: left; transition: background .15s; width: 100%;
        }
        .pc-profile-menu button i:first-child { width: 18px; color: #6b7280; }
        .pc-profile-menu button:hover:not(.disabled):not(.pc-profile-logout) { background: #eef1f5; }
        .pc-profile-menu button.active { background: #e8f0ff; color: #0064FA; font-weight: 600; }
        .pc-profile-menu button.active i:first-child { color: #0064FA; }
        .pc-profile-menu button.disabled { opacity: 0.45; cursor: not-allowed; }
        .pc-lock { margin-left: auto; font-size: 11px; color: #9ca3af; }
        .pc-profile-logout { margin-top: auto; color: #ef4444 !important; }
        .pc-profile-logout i { color: #ef4444 !important; }

        .pc-profile-content { flex: 1; overflow-y: auto; background: #fff; position: relative; }
        .pc-profile-content .container,
        .pc-profile-content .market-detail-container,
        .pc-profile-content .op-page,
        .pc-profile-content .profile-page,
        .pc-profile-content .withdraw-container { max-width: 100% !important; min-height: auto !important; }

        /* In-modal back bar (only on sub-pages) */
        .pc-nav-bar { position: sticky; top: 0; z-index: 6; background: #fff; border-bottom: 1px solid #eef1f5; padding: 8px 14px; }
        .pc-nav-back { display: inline-flex; align-items: center; gap: 8px; border: none; background: #f0f2f5; color: #0064FA; font-weight: 700; font-size: 13px; padding: 7px 14px; border-radius: 8px; cursor: pointer; }
        .pc-nav-back:hover { background: #e8f0ff; }
        .pc-nav-back-ico { font-size: 16px; line-height: 1; }

        /* Always hide the embedded pages' own back-arrows. Top-level pages are
           switched via the left menu; sub-pages use the single in-modal back bar
           above. This avoids duplicate/confusing back controls. */
        .pc-profile-content .back-arrow,
        .pc-profile-content .header-left,
        .pc-profile-content .back-button,
        .pc-profile-content .nav-back,
        .pc-profile-content .fa-arrow-left { display: none !important; }
      `})]})}const it=`
  .pc-root {
    --primary: #0064FA; --green: #10b981; --red: #ef4444;
    --bg: #ffffff; --bg-light: #f7f8fa; --border: #e5e7eb; --text: #1a1d23; --muted: #6b7280;
    font-family: 'Inter','Segoe UI',system-ui,-apple-system,sans-serif;
    height: 100vh; display: flex; flex-direction: column; background: var(--bg-light); color: var(--text);
  }
  .pc-root * { box-sizing: border-box; }

  /* Header */
  .pc-header {
    height: 60px; flex-shrink: 0; background: #fff; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between; padding: 0 20px;
  }
  .pc-logo { font-size: 18px; font-weight: 800; color: var(--primary); display: flex; align-items: center; gap: 6px; }
  .pc-logo span { color: var(--text); }
  .pc-header-center { flex: 1; display: flex; justify-content: center; }
  .pc-asset-chip { display: flex; align-items: center; gap: 8px; background: var(--bg-light); padding: 6px 14px; border-radius: 10px; font-size: 14px; }
  .pc-asset-price { font-weight: 700; color: var(--primary); }
  .pc-header-right { display: flex; align-items: center; gap: 10px; }
  .pc-lang { padding: 7px 10px; border: 1px solid var(--border); border-radius: 8px; font-size: 13px; background: #fff; cursor: pointer; outline: none; }
  .pc-btn-ghost { padding: 8px 16px; border: 1px solid var(--border); border-radius: 8px; background: #fff; color: var(--text); font-weight: 600; font-size: 14px; cursor: pointer; }
  .pc-btn-ghost:hover { border-color: var(--primary); color: var(--primary); }
  .pc-btn-primary { padding: 8px 18px; border: none; border-radius: 8px; background: var(--primary); color: #fff; font-weight: 700; font-size: 14px; cursor: pointer; }
  .pc-btn-primary:disabled { opacity: .6; cursor: default; }

  /* Main layout */
  .pc-main { flex: 1; display: flex; overflow: hidden; }

  /* Left */
  .pc-left { width: 290px; flex-shrink: 0; background: #fff; border-right: 1px solid var(--border); display: flex; flex-direction: column; }
  .pc-search { display: flex; align-items: center; gap: 8px; padding: 12px 14px; border-bottom: 1px solid var(--border); }
  .pc-search i { color: var(--muted); font-size: 13px; }
  .pc-search input { flex: 1; border: none; outline: none; font-size: 14px; }
  .pc-filter { padding: 10px 14px; border-bottom: 1px solid var(--border); }
  .pc-filter select { width: 100%; padding: 8px 10px; border: 1px solid var(--border); border-radius: 8px; font-size: 13px; outline: none; cursor: pointer; }
  .pc-market-list { flex: 1; overflow-y: auto; }
  .pc-market-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; cursor: pointer; border-bottom: 1px solid #f4f5f7; transition: background .12s; }
  .pc-market-item:hover { background: var(--bg-light); }
  .pc-market-item.active { background: #e8f0ff; }
  .pc-market-info { flex: 1; min-width: 0; }
  .pc-market-symbol { font-weight: 700; font-size: 13px; }
  .pc-market-name { font-size: 11px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .pc-market-px { text-align: right; }
  .pc-market-price { font-weight: 600; font-size: 13px; font-family: monospace; }
  .pc-market-chg { font-size: 11px; }
  .pc-market-chg.pos { color: var(--green); }
  .pc-market-chg.neg { color: var(--red); }

  /* Center */
  .pc-center { flex: 1; display: flex; flex-direction: column; overflow: hidden; padding: 16px; gap: 14px; min-width: 0; }
  .pc-chart-head { display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
  .pc-chart-asset { display: flex; align-items: center; gap: 12px; }
  .pc-chart-name { font-size: 18px; font-weight: 800; }
  .pc-chart-sub { font-size: 12px; color: var(--muted); }
  .pc-chart-price { font-size: 26px; font-weight: 800; font-family: monospace; }
  .pc-chart-wrap { flex: 1; min-height: 0; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; background: #fff; display: flex; flex-direction: column; }
  .pc-chart-wrap > div { flex: 1; }

  /* Trade panel */
  .pc-trade-panel { background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; }
  .pc-trade-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; font-size: 14px; }
  .pc-trade-row label { color: var(--muted); font-weight: 600; display: flex; align-items: center; gap: 6px; }
  .pc-trade-row select, .pc-trade-row > input { padding: 8px 12px; border: 1.5px solid var(--border); border-radius: 8px; font-size: 14px; outline: none; width: 160px; text-align: right; }
  .pc-trade-row select:focus, .pc-trade-row > input:focus { border-color: var(--primary); }
  .pc-stepper { display: flex; align-items: center; gap: 6px; }
  .pc-stepper button { width: 30px; height: 30px; border: 1px solid var(--border); background: var(--bg-light); border-radius: 7px; cursor: pointer; font-size: 16px; }
  .pc-stepper input { width: 84px; text-align: center; border: 1.5px solid var(--border); border-radius: 7px; padding: 6px; font-weight: 600; outline: none; }
  .pc-trade-info { display: flex; justify-content: space-between; align-items: center; padding-top: 6px; border-top: 1px solid var(--border); font-size: 14px; color: var(--muted); }
  .pc-insufficient { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; border-radius: 8px; padding: 9px 12px; font-size: 13px; font-weight: 500; text-align: center; }
  .pc-trade-actions, .pc-binary-actions { display: flex; gap: 12px; }
  .pc-buy, .pc-sell { flex: 1; padding: 13px; border: none; border-radius: 10px; font-weight: 700; font-size: 15px; cursor: pointer; color: #fff; }
  .pc-buy { background: var(--green); }
  .pc-sell { background: var(--red); }
  .pc-buy:disabled, .pc-sell:disabled { opacity: .5; cursor: default; }

  /* Right */
  .pc-right { width: 320px; flex-shrink: 0; background: #fff; border-left: 1px solid var(--border); padding: 12px; display: flex; flex-direction: column; gap: 10px; overflow-y: auto; }

  /* Available funds card (centered, blue) */
  .pc-funds { background: var(--primary); color: #fff; border-radius: 12px; padding: 12px; text-align: center; }
  .pc-funds-label { font-size: 12px; font-weight: 600; opacity: .95; }
  .pc-funds-amount { font-size: 20px; font-weight: 700; margin-top: 4px; letter-spacing: .5px; }

  /* Trade/order panel */
  .pc-trade-panel { border: 1px solid var(--border); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; }
  .pc-tp-symbol { font-size: 14px; font-weight: 700; color: var(--text); }
  .pc-tp-price { font-size: 19px; font-weight: 700; color: var(--primary); margin: 1px 0 8px; }
  .pc-tp-select {
    width: 100%; padding: 7px 12px; border: 1px solid var(--border); border-radius: 8px;
    font-size: 13px; color: var(--text); background: #fff; outline: none; cursor: pointer; margin-bottom: 8px;
    appearance: none; -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 12px center;
  }
  .pc-tp-select:focus { border-color: var(--primary); }
  .pc-tp-label { font-size: 12px; font-weight: 600; color: var(--text); margin-bottom: 5px; }

  /* Toggle row (Set Loss / Take Profit) */
  .pc-tp-toggle-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px; }
  .pc-tp-toggle-row span { font-size: 12px; font-weight: 600; color: var(--text); }
  .pc-switch { position: relative; display: inline-block; width: 38px; height: 20px; }
  .pc-switch input { opacity: 0; width: 0; height: 0; }
  .pc-slider { position: absolute; inset: 0; background: #d1d5db; border-radius: 20px; transition: .2s; cursor: pointer; }
  .pc-slider::before { content: ''; position: absolute; height: 15px; width: 15px; left: 3px; bottom: 2.5px; background: #fff; border-radius: 50%; transition: .2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
  .pc-switch input:checked + .pc-slider { background: var(--primary); }
  .pc-switch input:checked + .pc-slider::before { transform: translateX(18px); }

  /* Stepper (full-width) */
  .pc-stepper.full { display: flex; align-items: stretch; gap: 0; margin-bottom: 9px; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
  .pc-stepper.full button {
    width: 38px; border: none; background: var(--bg-light); color: #374151; font-size: 17px; cursor: pointer; flex-shrink: 0;
  }
  .pc-stepper.full button:disabled { opacity: .5; cursor: default; }
  .pc-stepper.full input {
    flex: 1; min-width: 0; border: none; border-left: 1px solid var(--border); border-right: 1px solid var(--border);
    text-align: center; font-size: 13px; font-weight: 600; color: var(--text); outline: none; padding: 7px 6px;
  }
  .pc-stepper.full input:disabled { background: var(--bg-light); color: #9ca3af; }
  .pc-stepper.full input::-webkit-outer-spin-button, .pc-stepper.full input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }

  /* Info rows */
  .pc-tp-info { display: flex; flex-direction: column; gap: 5px; margin: 2px 0 10px; }
  .pc-tp-info-row { display: flex; align-items: center; justify-content: space-between; font-size: 11.5px; color: var(--muted); }
  .pc-tp-info-row b { color: var(--text); font-weight: 600; }

  /* Buy / Sell pills */
  .pc-tp-actions { display: flex; gap: 10px; }
  .pc-buy2, .pc-sell2 { flex: 1; padding: 10px; border: none; border-radius: 22px; font-size: 14px; font-weight: 700; color: #fff; cursor: pointer; transition: opacity .15s; }
  .pc-buy2 { background: var(--primary); }
  .pc-sell2 { background: var(--red); }
  .pc-buy2:hover:not(:disabled), .pc-sell2:hover:not(:disabled) { opacity: .9; }
  .pc-buy2:disabled, .pc-sell2:disabled { opacity: .5; cursor: default; }
  .pc-insufficient { margin-bottom: 9px; padding: 7px 10px; font-size: 11.5px; }

  /* Confirm modal rows */
  .pc-summary-row { display: flex; justify-content: space-between; font-size: 13px; padding: 6px 0; color: var(--muted); }
  .pc-summary-row strong { color: var(--text); }
  .pc-summary-row strong.pos { color: var(--green); }
  .pc-summary-row strong.neg { color: var(--red); }

  /* Modals shared */
  .pc-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.55); backdrop-filter: blur(4px); z-index: 10000; display: flex; align-items: center; justify-content: center; }
  .pc-confirm { background: #fff; border-radius: 14px; width: 360px; max-width: 92vw; padding: 22px; }
  .pc-confirm-title { font-size: 17px; font-weight: 800; margin-bottom: 16px; text-align: center; }
  .pc-confirm-actions { display: flex; gap: 10px; margin-top: 18px; }
  .pc-confirm-actions button { flex: 1; }

  /* Toast */
  .pc-toast { position: fixed; top: 76px; right: 20px; background: #fff; border-left: 4px solid var(--green); box-shadow: 0 8px 32px rgba(0,0,0,0.15); border-radius: 10px; padding: 14px 18px; font-weight: 600; font-size: 14px; z-index: 11000; }
`;function ot(n){return n==null?"—":`${n>=0?"+":""}${n.toFixed(2)}%`}function pe(n){return n==null?"—":n>=1e4?n.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):n>=100?n.toFixed(2):n>=10?n.toFixed(3):n.toFixed(5)}function dt(){const n=ge(),h=$(ae.selectCurrentUser),p=$(ae.selectCurrentTenant),M=$($e.selectRows),[u,k]=a.useState("XAUUSD"),[D,j]=a.useState(""),[f,m]=a.useState("All"),[T,z]=a.useState(null),[H,C]=a.useState(!1),[_,U]=a.useState(Je()),[I,i]=a.useState(100),[o,x]=a.useState(.01),[K,Y]=a.useState("0.01"),[A,S]=a.useState(!1),[F,P]=a.useState(0),[w,ie]=a.useState(!1),[X,V]=a.useState(0),[y,E]=a.useState(null),[J,oe]=a.useState(!1),[re,ce]=a.useState(null),[G,ee]=a.useState({}),r=a.useRef(null),L=a.useRef(null),O=t=>`~m~${t.length}~m~${t}`,R=t=>{const c=[];let d=t;for(;d.length>0&&d.startsWith("~m~");){const N=d.indexOf("~m~",3),b=parseInt(d.substring(3,N));c.push(d.substring(N+3,N+3+b)),d=d.substring(N+3+b)}return c},v=t=>{try{return JSON.parse(t.replace(/^=\{/,"{")).symbol||t}catch{return t}},de=a.useCallback(()=>{r.current&&(r.current.close(),r.current=null);const t=new WebSocket(He());r.current=t,t.onopen=()=>{const c="qs_"+Math.random().toString(36).substring(2,12);t.send(O(JSON.stringify({m:"quote_create_session",p:[c]}))),t.send(O(JSON.stringify({m:"quote_set_fields",p:[c,"lp","ask","bid","chp"]}))),t.send(O(JSON.stringify({m:"quote_add_symbols",p:[c,...De.map(d=>d.symbol)]})))},t.onmessage=c=>{const d=c.data;if(d.startsWith("~h~")){t.send(d);return}R(d).forEach(N=>{try{const b=JSON.parse(N);if(b.m!=="qsd")return;const te=b.p[1],W=v(te.n),B=te.v;if(!B)return;ee(Me=>{const Q=Me[W]||{symbol:W,ask:0,bid:0},se={symbol:W,ask:B.ask??Q.ask,bid:B.bid??Q.bid,lp:typeof B.lp=="number"?B.lp:Q.lp,chp:typeof B.chp=="number"?B.chp:Q.chp};return Q.ask===se.ask&&Q.bid===se.bid&&Q.lp===se.lp&&Q.chp===se.chp?Me:{...Me,[W]:se}})}catch{}})},t.onclose=c=>{c.wasClean||(L.current=setTimeout(de,3e3))},t.onerror=()=>{}},[]);a.useEffect(()=>(de(),()=>{var t;L.current&&clearTimeout(L.current),(t=r.current)==null||t.close()}),[de]);const fe=_e(),l=fe[u],g=a.useMemo(()=>{const t=G[u];return t?t.lp&&t.lp>0?t.lp:t.ask&&t.bid?(t.ask+t.bid)/2:null:null},[G,u]),[ze,Ie]=a.useState(()=>typeof window<"u"?Math.max(360,window.innerHeight-60-88):480);a.useEffect(()=>{const t=()=>Ie(Math.max(360,window.innerHeight-60-88));return window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]);const je=a.useRef(null);a.useEffect(()=>{je.current=g},[g]);const we=a.useMemo(()=>l?{symbol:l.symbol,entryPrice:l.entryPrice,targetPrice:l.targetPrice,startedAt:l.startedAt,durationMs:l.durationMs,seed:l.seed}:null,[l==null?void 0:l.symbol,l==null?void 0:l.startedAt,l==null?void 0:l.targetPrice,l==null?void 0:l.durationMs,l==null?void 0:l.entryPrice,l==null?void 0:l.seed]),[Ne,he]=a.useState(0);a.useEffect(()=>{h&&n(be.doFetch())},[n,h]),a.useEffect(()=>{const t=M==null?void 0:M.find(c=>c.symbol==="USDT");he((t==null?void 0:t.amount)||0)},[M]);const ue=Ke(u)||{symbol:u,name:u},Ae=l?je.current??l.targetPrice:g,q=a.useMemo(()=>{const t=g??0,c=I/100;return t*100*o/c},[g,o,I]),xe=q>=100?q.toFixed(3):q.toFixed(5),ne=h?Ne<q&&q>0:!1,Ee=a.useMemo(()=>((g??0)*o*100*1e-5).toFixed(6),[g,o]),Le=`1 Lots = 100 ${u}`,Oe=a.useMemo(()=>De.filter(t=>D&&!`${t.symbol} ${t.name}`.toLowerCase().includes(D.toLowerCase())?!1:f==="All"?!0:f==="Forex"?!!t.baseFlag&&!t.badgeColor&&!/OIL|100|200|225|30|35|40|500|SPX|NAS|US30/.test(t.symbol):f==="Crypto"?!!t.badgeColor&&/BTC|ETH|LTC/.test(t.symbol):f==="Metals"?/XAU|XAG/.test(t.symbol):f==="Indices"?/100|200|225|30|35|40|500|SPX|NAS|US30/.test(t.symbol):!0),[D,f]),me=t=>{if(!h){z("login");return}E(t)},ve=async()=>{var t,c,d,N;if(!(!y||!(p!=null&&p.id)||g==null)){oe(!0);try{await Ze.post(`/tenant/${p.id}/trade-orders`,{orderType:"market",symbol:u,symbolName:ue.name,direction:y,lots:o,multiplier:I,entryPrice:g,takeProfit:w?X:null,stopLoss:A?F:null}),he(b=>Math.max(0,b-q)),n(be.doFetch()),E(null),ce(`${y==="buy"?s("pc.buy"):s("pc.sell")} — ${s("pc.orderPlaced")} ${u}`),setTimeout(()=>ce(null),3500)}catch(b){alert(((N=(d=(c=(t=b==null?void 0:b.response)==null?void 0:t.data)==null?void 0:c.errors)==null?void 0:d[0])==null?void 0:N.message)||"Failed to place order")}finally{oe(!1)}}},Ce=t=>{U(t),Ge.doChangeLanguage(t)};return e.jsxs("div",{className:"pc-root",children:[e.jsx("style",{children:it}),e.jsxs("header",{className:"pc-header",children:[e.jsx("div",{className:"pc-header-left",children:e.jsx("img",{src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAyIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMjAyIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNTIuMjc0NyAzMC4xNTMzVjExLjE5NTZINTUuODYxNVYxMi44NjMyQzU2LjQ3MyAxMS44MDcxIDU4LjAwMTkgMTAuODg5OCA2MC4wNTk4IDEwLjg4OThDNjQuMDYyOSAxMC44ODk4IDY2LjM3MDMgMTMuOTQ3NSA2Ni4zNzAzIDE4LjAwNUM2Ni4zNzAzIDIyLjE0NyA2My43ODUzIDI1LjIwNDcgNTkuOTIxIDI1LjIwNDdDNTguMDMgMjUuMjA0NyA1Ni42NCAyNC40NTQzIDU1Ljk3NDEgMjMuNTM3VjMwLjE1MzNINTIuMjc0N1pNNTkuMzM1NiAxNC4xOTlDNTcuNDQ0NiAxNC4xOTkgNTUuOTE1OCAxNS42MTcyIDU1LjkxNTggMTguMDM1MkM1NS45MTU4IDIwLjQ1MzIgNTcuNDQ0NiAyMS44OTk1IDU5LjMzNTYgMjEuODk5NUM2MS4yMjY1IDIxLjg5OTUgNjIuNzI3MiAyMC40ODEzIDYyLjcyNzIgMTguMDM1MkM2Mi43MjcyIDE1LjYxNTIgNjEuMjI2NSAxNC4xOTkgNTkuMzM1NiAxNC4xOTlaTTgwLjg0IDIwLjk1NDFDODAuMTQ2IDIzLjMxNTggNzcuOTc3NSAyNS4yOTEyIDc0LjYxNCAyNS4yOTEyQzcwLjg2MjMgMjUuMjkxMiA2Ny41NTMxIDIyLjU5NTYgNjcuNTUzMSAxNy45ODA5QzY3LjU1MzEgMTMuNjE3NiA3MC43Nzc4IDEwLjc4MTIgNzQuMjgwMSAxMC43ODEyQzc4LjUwNDUgMTAuNzgxMiA4MS4wMzUyIDEzLjQ3NjggODEuMDM1MiAxNy44NzAyQzgxLjAzNTIgMTguMzk3MyA4MC45Nzg4IDE4Ljk1NDUgODAuOTc4OCAxOS4wMDg4SDcxLjE5NDJDNzEuMjc2NyAyMC44MTUzIDcyLjgwNTUgMjIuMTIyOCA3NC42NDAyIDIyLjEyMjhDNzYuMzY0MSAyMi4xMjI4IDc3LjMwOTYgMjEuMjYxOSA3Ny43NTQyIDIwLjAzODhMODAuODQgMjAuOTU0MVpNNzcuMzk0MSAxNi40NzgyQzc3LjMzNzggMTUuMTE2MyA3Ni40NDg2IDEzLjc4MjYgNzQuMzM2NCAxMy43ODI2QzcyLjQxNzMgMTMuNzgyNiA3MS4zNjEyIDE1LjIyODkgNzEuMjc4NyAxNi40NzgySDc3LjM5NDFaTTgyLjQwNTEgMzAuMTUzM1YxMS4xOTU2SDg1Ljk5MTlWMTIuODYzMkM4Ni42MDM0IDExLjgwNzEgODguMTMyMiAxMC44ODk4IDkwLjE5MDIgMTAuODg5OEM5NC4xOTMzIDEwLjg4OTggOTYuNTAwNyAxMy45NDc1IDk2LjUwMDcgMTguMDA1Qzk2LjUwMDcgMjIuMTQ3IDkzLjkxNTcgMjUuMjA0NyA5MC4wNTEzIDI1LjIwNDdDODguMTYwNCAyNS4yMDQ3IDg2Ljc3MDQgMjQuNDU0MyA4Ni4xMDQ1IDIzLjUzN1YzMC4xNTMzSDgyLjQwNTFaTTg5LjQ2NCAxNC4xOTlDODcuNTczIDE0LjE5OSA4Ni4wNDQyIDE1LjYxNzIgODYuMDQ0MiAxOC4wMzUyQzg2LjA0NDIgMjAuNDUzMiA4Ny41NzMgMjEuODk5NSA4OS40NjQgMjEuODk5NUM5MS4zNTQ5IDIxLjg5OTUgOTIuODU1NiAyMC40ODEzIDkyLjg1NTYgMTguMDM1MkM5Mi44NTU2IDE1LjYxNTIgOTEuMzU0OSAxNC4xOTkgODkuNDY0IDE0LjE5OVpNOTcuODM0NCAzMC4wNTI3VjExLjA5NUgxMDEuNDIxVjEyLjc2MjdDMTAyLjAzMyAxMS43MDY2IDEwMy41NjIgMTAuNzg5MiAxMDUuNjE5IDEwLjc4OTJDMTA5LjYyMyAxMC43ODkyIDExMS45MyAxMy44NDY5IDExMS45MyAxNy45MDQ0QzExMS45MyAyMi4wNDY0IDEwOS4zNDUgMjUuMTA0MSAxMDUuNDgxIDI1LjEwNDFDMTAzLjU5IDI1LjEwNDEgMTAyLjIgMjQuMzUzOCAxMDEuNTM0IDIzLjQzNjRWMzAuMDUyN0g5Ny44MzQ0Wk0xMDQuODkzIDE0LjA5NjRDMTAzLjAwMiAxNC4wOTY0IDEwMS40NzMgMTUuNTE0NiAxMDEuNDczIDE3LjkzMjZDMTAxLjQ3MyAyMC4zNTA2IDEwMy4wMDIgMjEuNzk2OSAxMDQuODkzIDIxLjc5NjlDMTA2Ljc4NCAyMS43OTY5IDEwOC4yODUgMjAuMzc4NyAxMDguMjg1IDE3LjkzMjZDMTA4LjI4NSAxNS41MTQ2IDEwNi43ODQgMTQuMDk2NCAxMDQuODkzIDE0LjA5NjRaTTEyNi4zOTggMjAuOTU0MUMxMjUuNzA0IDIzLjMxNTggMTIzLjUzNSAyNS4yOTEyIDEyMC4xNzIgMjUuMjkxMkMxMTYuNDIgMjUuMjkxMiAxMTMuMTExIDIyLjU5NTYgMTEzLjExMSAxNy45ODA5QzExMy4xMTEgMTMuNjE3NiAxMTYuMzM1IDEwLjc4MTIgMTE5LjgzOCAxMC43ODEyQzEyNC4wNjIgMTAuNzgxMiAxMjYuNTkzIDEzLjQ3NjggMTI2LjU5MyAxNy44NzAyQzEyNi41OTMgMTguMzk3MyAxMjYuNTM3IDE4Ljk1NDUgMTI2LjUzNyAxOS4wMDg4SDExNi43NTJDMTE2LjgzNCAyMC44MTUzIDExOC4zNjMgMjIuMTIyOCAxMjAuMTk4IDIyLjEyMjhDMTIxLjkyMiAyMi4xMjI4IDEyMi44NjcgMjEuMjYxOSAxMjMuMzEyIDIwLjAzODhMMTI2LjM5OCAyMC45NTQxWk0xMjIuOTUyIDE2LjQ3ODJDMTIyLjg5NSAxNS4xMTYzIDEyMi4wMDYgMTMuNzgyNiAxMTkuODk0IDEzLjc4MjZDMTE3Ljk3NSAxMy43ODI2IDExNi45MTkgMTUuMjI4OSAxMTYuODM2IDE2LjQ3ODJIMTIyLjk1MlpNMTM2LjU4MSAxNC44NjQ4QzEzNi4xNjQgMTQuNzgyNCAxMzUuODAyIDE0Ljc1NDIgMTM1LjQ2OCAxNC43NTQyQzEzMy41NzcgMTQuNzU0MiAxMzEuOTM4IDE1LjY3MTUgMTMxLjkzOCAxOC42MTg2VjI0Ljg3MjhIMTI4LjI0VjExLjE5NTZIMTMxLjgyN1YxMy4yMjUzQzEzMi42NiAxMS40MTg5IDEzNC41NTEgMTEuMDg1IDEzNS43MiAxMS4wODVDMTM2LjAyNSAxMS4wODUgMTM2LjMwMyAxMS4xMTMxIDEzNi41ODEgMTEuMTQxM1YxNC44NjQ4Wk0xNDAuMDY5IDIwLjM2ODdDMTQwLjE1MSAyMS40NTMgMTQwLjk1OCAyMi40NTI3IDE0Mi41NzEgMjIuNDUyN0MxNDMuNzk0IDIyLjQ1MjcgMTQ0LjM3OCAyMS44MTMxIDE0NC4zNzggMjEuMDkwOUMxNDQuMzc4IDIwLjQ3OTMgMTQzLjk2MSAxOS45Nzg0IDE0Mi45MDUgMTkuNzU3MkwxNDEuMDk5IDE5LjM0MDdDMTM4LjQ1OCAxOC43NTc0IDEzNy4yNjMgMTcuMTcyMiAxMzcuMjYzIDE1LjI1NTFDMTM3LjI2MyAxMi44MDg5IDEzOS40MzEgMTAuNzc5MiAxNDIuMzc4IDEwLjc3OTJDMTQ2LjI3MSAxMC43NzkyIDE0Ny41NzYgMTMuMjUzNSAxNDcuNzQzIDE0LjcyNkwxNDQuNjU3IDE1LjQyQzE0NC41NDcgMTQuNjEzNCAxNDMuOTYzIDEzLjU4NTQgMTQyLjQwNiAxMy41ODU0QzE0MS40MzMgMTMuNTg1NCAxNDAuNjU0IDE0LjE2ODggMTQwLjY1NCAxNC45NDczQzE0MC42NTQgMTUuNjE1MiAxNDEuMTU1IDE2LjAzMTYgMTQxLjkwNSAxNi4xNzA0TDE0My44NTEgMTYuNTg2OEMxNDYuNTQ2IDE3LjE0MiAxNDcuOTA4IDE4Ljc4MzUgMTQ3LjkwOCAyMC43ODUxQzE0Ny45MDggMjMuMDEgMTQ2LjE4NCAyNS4yODkyIDE0Mi41OTkgMjUuMjg5MkMxMzguNDg2IDI1LjI4OTIgMTM3LjA2NyAyMi42MTk3IDEzNi45IDIxLjA2NDdMMTQwLjA2OSAyMC4zNjg3Wk0xNTQuODMyIDExLjE5NTZIMTU3LjU4NFYxNC40NzY2SDE1NC44MzJWMjAuMjAzN0MxNTQuODMyIDIxLjM5ODYgMTU1LjM4OCAyMS43ODg5IDE1Ni40NDYgMjEuNzg4OUMxNTYuODkgMjEuNzg4OSAxNTcuMzkxIDIxLjczMjYgMTU3LjU4NCAyMS42NzgzVjI0LjczNkMxNTcuMjUgMjQuODc0OCAxNTYuNTg0IDI1LjA2OTkgMTU1LjUgMjUuMDY5OUMxNTIuODMzIDI1LjA2OTkgMTUxLjE2MyAyMy40ODQ3IDE1MS4xNjMgMjAuODQ1NFYxNC40ODA2SDE0OC42ODlWMTEuMTk5NkgxNDkuMzgzQzE1MC44MjkgMTEuMTk5NiAxNTEuNDk1IDEwLjI1NDEgMTUxLjQ5NSA5LjAzMTA3VjcuMTExOTZIMTU0LjgzVjExLjE5NTZIMTU0LjgzMlpNMTcyLjQxIDE4LjAzNTJDMTcyLjQxIDIyLjIzMzUgMTY5LjMyNCAyNS4yOTEyIDE2NS4yMzkgMjUuMjkxMkMxNjEuMTUzIDI1LjI5MTIgMTU4LjA2NyAyMi4yMzM1IDE1OC4wNjcgMTguMDM1MkMxNTguMDY3IDEzLjgxMDcgMTYxLjE1MyAxMC43ODEyIDE2NS4yMzkgMTAuNzgxMkMxNjkuMzI0IDEwLjc3OTIgMTcyLjQxIDEzLjgwODcgMTcyLjQxIDE4LjAzNTJaTTE2OC43MTMgMTguMDM1MkMxNjguNzEzIDE1LjQ1MDIgMTY3LjA0NSAxNC4xNDI2IDE2NS4yMzkgMTQuMTQyNkMxNjMuNDMyIDE0LjE0MjYgMTYxLjc2NCAxNS40NDgyIDE2MS43NjQgMTguMDM1MkMxNjEuNzY0IDIwLjU5MiAxNjMuNDMyIDIxLjkyNzcgMTY1LjIzOSAyMS45Mjc3QzE2Ny4wNDUgMjEuOTI3NyAxNjguNzEzIDIwLjYyMDEgMTY4LjcxMyAxOC4wMzUyWk0xNzcuNDE1IDI0Ljg3MjhIMTczLjcxOFYxMS4xOTU2SDE3Ny4zMDRWMTIuODkxNEMxNzguMTM3IDExLjQ3MzIgMTc5Ljc3OSAxMC44MzM1IDE4MS4yNTEgMTAuODMzNUMxODQuNjQzIDEwLjgzMzUgMTg2LjIgMTMuMjUxNSAxODYuMiAxNi4yNTQ5VjI0Ljg3MjhIMTgyLjUwMlYxNi44OTQ2QzE4Mi41MDIgMTUuMzY1NyAxODEuNzUyIDE0LjE3MDggMTc5Ljk3NCAxNC4xNzA4QzE3OC4zNjIgMTQuMTcwOCAxNzcuNDE3IDE1LjQyMjEgMTc3LjQxNyAxNy4wMDUyVjI0Ljg3MjhIMTc3LjQxNVpNMjAwLjk3MyAyMC45NTQxQzIwMC4yNzkgMjMuMzE1OCAxOTguMTExIDI1LjI5MTIgMTk0Ljc0NyAyNS4yOTEyQzE5MC45OTYgMjUuMjkxMiAxODcuNjg2IDIyLjU5NTYgMTg3LjY4NiAxNy45ODA5QzE4Ny42ODYgMTMuNjE3NiAxOTAuOTExIDEwLjc4MTIgMTk0LjQxMyAxMC43ODEyQzE5OC42MzggMTAuNzgxMiAyMDEuMTY4IDEzLjQ3NjggMjAxLjE2OCAxNy44NzAyQzIwMS4xNjggMTguMzk3MyAyMDEuMTEyIDE4Ljk1NDUgMjAxLjExMiAxOS4wMDg4SDE5MS4zMjhDMTkxLjQxIDIwLjgxNTMgMTkyLjkzOSAyMi4xMjI4IDE5NC43NzMgMjIuMTIyOEMxOTYuNDk3IDIyLjEyMjggMTk3LjQ0MyAyMS4yNjE5IDE5Ny44ODcgMjAuMDM4OEwyMDAuOTczIDIwLjk1NDFaTTE5Ny41MjcgMTYuNDc4MkMxOTcuNDcxIDE1LjExNjMgMTk2LjU4MiAxMy43ODI2IDE5NC40NyAxMy43ODI2QzE5Mi41NTEgMTMuNzgyNiAxOTEuNDk0IDE1LjIyODkgMTkxLjQxMiAxNi40NzgySDE5Ny41MjdaIiBmaWxsPSIjMTUxNTE1Ii8+CjxwYXRoIGQ9Ik0zNy45MjE2IDcuNDk2MTlDMzAuODQ0NyAzLjQyODY1IDE2LjEwOTQgMC4yMzIxNDggOC4zMDgyNCAwLjAyNDk0ODhDMC41MDUwNzggLTAuMTgyMjUgLTAuMzY1OTYyIDIuNTk3ODQgMC4xMTA3OTcgOC45MjY0N0MwLjU4OTU2OCAxNS4yNTcxIDIuNDE0MTMgMjUuMTM0MyA2LjQ0MTQ0IDMxLjQ0MjhDMTAuNDY2NyAzNy43NTEzIDE2LjY5MjggNDAuNDkxMSAyMy4yOTMgMzguMjMwMUMyOS44OTEyIDM1Ljk2NyAzNi44NjU1IDI4LjcwMjkgNDAuNjQxNCAyMi42MDE2QzQ0LjQxNzIgMTYuNTA0MyA0NC45OTg2IDExLjU2MzcgMzcuOTIxNiA3LjQ5NjE5Wk0yNC4wNjc1IDI0Ljg3ODhIMTkuMTA0N1YzMy4xMzI2SDE0LjA1MTVWMTQuNzcwM0gxOS4xMDQ3VjE5LjgyMzVIMjQuMDY3NVYxOS44MDk1QzI2LjE0OTUgMTkuNzczMyAyNy44MjcyIDE4LjA3NzQgMjcuODI3MiAxNS45ODczQzI3LjgyNzIgMTMuODk3MiAyNi4xNDk1IDEyLjE5OTQgMjQuMDY3NSAxMi4xNjUyVjEyLjE2MTJINy43MzI5MUw5LjU3OTYgNy4xMDc5NUgyNC4wNjU0QzI4Ljk4MTkgNy4xMDc5NSAzMi45NjkgMTEuMDk1IDMyLjk2OSAxNi4wMTE1QzMyLjk3MSAyMC45Mjk5IDI4Ljk4MzkgMjQuODc4OCAyNC4wNjc1IDI0Ljg3ODhaIiBmaWxsPSIjMDA2NEZBIi8+CjxwYXRoIGQ9Ik0yNC4wNjc1IDI0Ljg3ODhIMTkuMTA0N1YzMy4xMzI2SDE0LjA1MTVWMTQuNzcwM0gxOS4xMDQ3VjE5LjgyMzVIMjQuMDY3NVYxOS44MDk1QzI2LjE0OTUgMTkuNzczMyAyNy44MjcyIDE4LjA3NzQgMjcuODI3MiAxNS45ODczQzI3LjgyNzIgMTMuODk3MiAyNi4xNDk1IDEyLjE5OTQgMjQuMDY3NSAxMi4xNjUyVjEyLjE2MTJINy43MzI5MUw5LjU3OTYgNy4xMDc5NUgyNC4wNjU0QzI4Ljk4MTkgNy4xMDc5NSAzMi45NjkgMTEuMDk1IDMyLjk2OSAxNi4wMTE1QzMyLjk3MSAyMC45Mjk5IDI4Ljk4MzkgMjQuODc4OCAyNC4wNjc1IDI0Ljg3ODhaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K",alt:""})}),e.jsx("div",{className:"pc-header-center"}),e.jsxs("div",{className:"pc-header-right",children:[e.jsx("select",{className:"pc-lang",value:_,onChange:t=>Ce(t.target.value),children:qe().map(t=>e.jsx("option",{value:t.id,children:t.label},t.id))}),h?e.jsx(e.Fragment,{children:e.jsxs("button",{className:"pc-btn-ghost",onClick:()=>C(!0),children:[e.jsx("i",{className:"fas fa-user"})," ",s("pc.profile")]})}):e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"pc-btn-ghost",onClick:()=>z("login"),children:s("pc.login")}),e.jsx("button",{className:"pc-btn-primary",onClick:()=>z("register"),children:s("pc.register")})]})]})]}),e.jsxs("div",{className:"pc-main",children:[e.jsxs("aside",{className:"pc-left",children:[e.jsxs("div",{className:"pc-search",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("input",{placeholder:s("pc.searchMarkets"),value:D,onChange:t=>j(t.target.value)})]}),e.jsx("div",{className:"pc-filter",children:e.jsx("select",{value:f,onChange:t=>m(t.target.value),children:[["All","pc.all"],["Forex","pc.forex"],["Crypto","pc.crypto"],["Metals","pc.metals"],["Indices","pc.indices"]].map(([t,c])=>e.jsx("option",{value:t,children:s(c)},t))})}),e.jsx("div",{className:"pc-market-list",children:Oe.map(t=>{const c=G[t.symbol],d=c?c.lp&&c.lp>0?c.lp:c.ask&&c.bid?(c.ask+c.bid)/2:null:null,N=fe[t.symbol],b=N?N.targetPrice:d,te=N?(N.targetPrice-N.entryPrice)/N.entryPrice*100:(c==null?void 0:c.chp)??null,W=(te??0)>=0;return e.jsxs("div",{className:`pc-market-item ${u===t.symbol?"active":""}`,onClick:()=>k(t.symbol),children:[e.jsx(Te,{pair:t,size:"sm"}),e.jsxs("div",{className:"pc-market-info",children:[e.jsx("div",{className:"pc-market-symbol",children:t.symbol}),e.jsx("div",{className:"pc-market-name",children:t.name})]}),e.jsxs("div",{className:"pc-market-px",children:[e.jsx("div",{className:"pc-market-price",children:pe(b)}),e.jsxs("div",{className:`pc-market-chg ${W?"pos":"neg"}`,children:[W?"▲":"▼"," ",ot(te)]})]})]},t.symbol)})})]}),e.jsxs("section",{className:"pc-center",children:[e.jsxs("div",{className:"pc-chart-head",children:[e.jsxs("div",{className:"pc-chart-asset",children:[e.jsx(Te,{pair:ue,size:"md"}),e.jsxs("div",{children:[e.jsx("div",{className:"pc-chart-name",children:u}),e.jsx("div",{className:"pc-chart-sub",children:ue.name})]})]}),e.jsx("div",{className:"pc-chart-price",style:{color:l?l.targetPrice>=l.entryPrice?"#10b981":"#ef4444":"#1a1d23"},children:pe(Ae)})]}),e.jsx("div",{className:"pc-chart-wrap",children:e.jsx(Xe,{symbol:u,livePrice:g,height:ze,priceInjection:we},u)})]}),e.jsxs("aside",{className:"pc-right",children:[e.jsxs("div",{className:"pc-funds",children:[e.jsx("div",{className:"pc-funds-label",children:s("pc.availableFunds")}),e.jsx("div",{className:"pc-funds-amount",children:h?`$${Ne.toFixed(2)}`:"----"})]}),e.jsxs("div",{className:"pc-trade-panel",children:[e.jsx("div",{className:"pc-tp-symbol",children:u}),e.jsx("div",{className:"pc-tp-price",children:pe(g)}),e.jsx("select",{className:"pc-tp-select",children:e.jsx("option",{children:s("pc.marketPrice")})}),e.jsx("div",{className:"pc-tp-label",children:s("pc.multiplier")}),e.jsx("select",{className:"pc-tp-select",value:I,onChange:t=>i(+t.target.value),children:[100,200,300,400,500].map(t=>e.jsx("option",{value:t,children:t},t))}),e.jsxs("div",{className:"pc-tp-toggle-row",children:[e.jsx("span",{children:s("pc.setLoss")}),e.jsxs("label",{className:"pc-switch",children:[e.jsx("input",{type:"checkbox",checked:A,onChange:t=>{S(t.target.checked),P(t.target.checked&&g?g:0)}}),e.jsx("span",{className:"pc-slider"})]})]}),e.jsxs("div",{className:"pc-stepper full",children:[e.jsx("button",{onClick:()=>A&&P(t=>Math.max(0,+(t-.01).toFixed(5))),disabled:!A,children:"−"}),e.jsx("input",{type:"number",step:"any",min:"0",disabled:!A,value:F,onChange:t=>P(parseFloat(t.target.value)||0)}),e.jsx("button",{onClick:()=>A&&P(t=>+(t+.01).toFixed(5)),disabled:!A,children:"+"})]}),e.jsxs("div",{className:"pc-tp-toggle-row",children:[e.jsx("span",{children:s("pc.takeProfit")}),e.jsxs("label",{className:"pc-switch",children:[e.jsx("input",{type:"checkbox",checked:w,onChange:t=>{ie(t.target.checked),V(t.target.checked&&g?g:0)}}),e.jsx("span",{className:"pc-slider"})]})]}),e.jsxs("div",{className:"pc-stepper full",children:[e.jsx("button",{onClick:()=>w&&V(t=>Math.max(0,+(t-.01).toFixed(5))),disabled:!w,children:"−"}),e.jsx("input",{type:"number",step:"any",min:"0",disabled:!w,value:X,onChange:t=>V(parseFloat(t.target.value)||0)}),e.jsx("button",{onClick:()=>w&&V(t=>+(t+.01).toFixed(5)),disabled:!w,children:"+"})]}),e.jsx("div",{className:"pc-tp-label",children:s("pc.lots")}),e.jsxs("div",{className:"pc-stepper full",children:[e.jsx("button",{onClick:()=>{const t=Math.max(.01,+(o-.01).toFixed(2));x(t),Y(String(t))},children:"−"}),e.jsx("input",{type:"text",inputMode:"decimal",value:K,onChange:t=>{const c=t.target.value.replace(/[^0-9.]/g,"");Y(c);const d=parseFloat(c);!isNaN(d)&&d>0&&x(d)},onBlur:()=>{let t=parseFloat(K);(isNaN(t)||t<.01)&&(t=.01),t=Math.round(t*100)/100,x(t),Y(String(t))}}),e.jsx("button",{onClick:()=>{const t=+(o+.01).toFixed(2);x(t),Y(String(t))},children:"+"})]}),e.jsxs("div",{className:"pc-tp-info",children:[e.jsxs("div",{className:"pc-tp-info-row",children:[e.jsx("span",{children:s("pc.eachLots")}),e.jsx("b",{children:Le})]}),e.jsxs("div",{className:"pc-tp-info-row",children:[e.jsx("span",{children:s("pc.handlingFee")}),e.jsx("b",{children:Ee})]}),e.jsxs("div",{className:"pc-tp-info-row",children:[e.jsx("span",{children:s("pc.estimatedMargin")}),e.jsx("b",{style:{color:ne?"#ef4444":"#1a1d23"},children:xe})]})]}),ne&&e.jsxs("div",{className:"pc-insufficient",children:["⚠ ",s("pc.insufficient")," ($",xe,")"]}),e.jsxs("div",{className:"pc-tp-actions",children:[e.jsx("button",{className:"pc-buy2",disabled:g==null||ne,onClick:()=>me("buy"),children:s("pc.buy")}),e.jsx("button",{className:"pc-sell2",disabled:g==null||ne,onClick:()=>me("sell"),children:s("pc.sell")})]})]})]})]}),y&&e.jsx("div",{className:"pc-modal-overlay",onClick:()=>!J&&E(null),children:e.jsxs("div",{className:"pc-confirm",onClick:t=>t.stopPropagation(),children:[e.jsx("div",{className:"pc-confirm-title",children:y==="buy"?s("pc.confirmBuy"):s("pc.confirmSell")}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:s("pc.symbol")}),e.jsx("strong",{children:u})]}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:s("pc.direction")}),e.jsx("strong",{className:y==="buy"?"pos":"neg",children:y==="buy"?s("pc.buy"):s("pc.sell")})]}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:s("pc.price")}),e.jsx("strong",{children:pe(g)})]}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:s("pc.lotsMult")}),e.jsxs("strong",{children:[o.toFixed(2)," · ",I,"×"]})]}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:s("pc.estimatedMargin")}),e.jsxs("strong",{children:["$",xe]})]}),e.jsxs("div",{className:"pc-confirm-actions",children:[e.jsx("button",{className:"pc-btn-ghost",onClick:()=>E(null),disabled:J,children:s("pc.cancel")}),e.jsx("button",{className:"pc-btn-primary",onClick:ve,disabled:J,children:J?s("pc.placing"):s("pc.confirm")})]})]})}),re&&e.jsxs("div",{className:"pc-toast",children:["✓ ",re]}),T&&e.jsx(et,{initialMode:T,onClose:()=>z(null)}),H&&e.jsx(at,{onClose:()=>C(!1)})]})}export{dt as default};
