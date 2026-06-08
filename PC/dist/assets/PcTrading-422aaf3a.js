import{u as Y,i as Z,j as c,k as V,n as e,o as a,p as Oe,q as ve,t as Ce,R as Se,v as Qe,L as Ue,S as Ye,w as Fe,x as _,y as Pe,z as Ve,A as Re,B as We,C as fe,D as Be,E as $e}from"./index-1271e741.js";import{g as Je,P as je,u as qe,a as Ze,b as Ne}from"./useSymbolInjections-87154a26.js";import{C as He}from"./CustomTradingChart-3e825781.js";import{l as Ke}from"./layoutActions-62cf3707.js";import{u as ne}from"./useDispatch-8152c815.js";function _e({initialMode:o="login",onClose:N}){const l=ne(),x=Y(Z.selectLoading),d=Y(Z.selectErrorMessage),[z,y]=c.useState(o),[I,g]=c.useState(""),[h,D]=c.useState(""),[k,R]=c.useState(!0),[O,W]=c.useState(""),[C,A]=c.useState(""),[s,p]=c.useState(""),[f,L]=c.useState(""),[G,T]=c.useState(null),w=c.useCallback(()=>{const r="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";let S="";for(let B=0;B<6;B++)S+=r.charAt(Math.floor(Math.random()*r.length));L(S),p("")},[]);c.useEffect(()=>{l(V.doClearErrorMessage()),w()},[l,w]);const b=r=>{y(r),T(null),l(V.doClearErrorMessage()),r==="register"&&w()},ee=r=>{if(r.preventDefault(),T(null),!I||!h){T(a("pc.emailPwRequired"));return}l(V.doSigninWithEmailAndPassword(I,h,k))},H=r=>{if(r.preventDefault(),T(null),!I||!h||!O){T(a("pc.fillRequired"));return}if(h.length<8){T(a("pc.pwMin"));return}if(h!==C){T(a("pc.pwMismatch"));return}if(s!==f){T(a("pc.captchaMismatch")),w();return}l(V.doRegisterEmailAndPassword(I,h,O))},F=()=>l(V.doDemoLogin()),E=G||d;return e.jsxs("div",{className:"pc-modal-overlay",onClick:N,children:[e.jsxs("div",{className:"pc-auth-modal",onClick:r=>r.stopPropagation(),children:[e.jsx("button",{className:"pc-modal-x",onClick:N,children:"✕"}),e.jsxs("div",{className:"pc-auth-tabs",children:[e.jsx("button",{className:z==="login"?"active":"",onClick:()=>b("login"),children:a("pc.login")}),e.jsx("button",{className:z==="register"?"active":"",onClick:()=>b("register"),children:a("pc.register")})]}),E&&e.jsx("div",{className:"pc-auth-error",children:E}),z==="login"?e.jsxs("form",{className:"pc-auth-form",onSubmit:ee,children:[e.jsx("label",{children:a("pc.email")}),e.jsx("input",{type:"email",value:I,onChange:r=>g(r.target.value),placeholder:"you@example.com",autoComplete:"email",autoFocus:!0}),e.jsx("label",{children:a("pc.password")}),e.jsx("input",{type:"password",value:h,onChange:r=>D(r.target.value),placeholder:"••••••••",autoComplete:"current-password"}),e.jsx("div",{className:"pc-auth-remember",children:e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",checked:k,onChange:r=>R(r.target.checked)})," ",a("pc.rememberMe")]})}),e.jsx("button",{type:"submit",className:"pc-auth-submit",disabled:x,children:x?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"})," ",a("pc.signingIn")]}):a("pc.login")}),e.jsx("button",{type:"button",className:"pc-auth-demo",onClick:F,disabled:x,children:x?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"})," ",a("pc.loading")]}):a("pc.demoLogin")})]}):e.jsxs("form",{className:"pc-auth-form",onSubmit:H,children:[e.jsx("label",{children:a("pc.email")}),e.jsx("input",{type:"email",value:I,onChange:r=>g(r.target.value),placeholder:"you@example.com",autoComplete:"email",autoFocus:!0}),e.jsx("label",{children:a("pc.phone")}),e.jsx("input",{type:"tel",value:O,onChange:r=>W(r.target.value),placeholder:a("pc.phone"),autoComplete:"tel"}),e.jsx("label",{children:a("pc.captcha")}),e.jsxs("div",{className:"pc-captcha-wrap",children:[e.jsxs("div",{className:"pc-captcha-display",onClick:w,title:"↻",children:[e.jsx("span",{className:"pc-captcha-text",children:f}),e.jsx("span",{className:"pc-captcha-refresh",children:e.jsx("i",{className:"fas fa-sync-alt"})})]}),e.jsx("input",{type:"text",value:s,onChange:r=>p(r.target.value),placeholder:a("pc.enterCaptcha")})]}),e.jsx("label",{children:a("pc.password")}),e.jsx("input",{type:"password",value:h,onChange:r=>D(r.target.value),placeholder:a("pc.passwordHint"),autoComplete:"new-password"}),e.jsx("label",{children:a("pc.confirmPassword")}),e.jsx("input",{type:"password",value:C,onChange:r=>A(r.target.value),placeholder:a("pc.reenterPassword"),autoComplete:"new-password"}),e.jsx("button",{type:"submit",className:"pc-auth-submit",disabled:x,children:x?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"})," ",a("pc.creatingAccount")]}):a("pc.createAccount")})]}),e.jsx("div",{className:"pc-auth-switch",children:z==="login"?e.jsxs("span",{children:[a("pc.noAccount")," ",e.jsx("a",{onClick:()=>b("register"),children:a("pc.register")})]}):e.jsxs("span",{children:[a("pc.haveAccount")," ",e.jsx("a",{onClick:()=>b("login"),children:a("pc.login")})]})})]}),e.jsx("style",{children:`
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
        .pc-captcha-wrap { display: flex; gap: 8px; align-items: stretch; }
        .pc-captcha-display {
          display: flex; align-items: center; gap: 8px; padding: 0 12px; border-radius: 8px; cursor: pointer; user-select: none;
          background: linear-gradient(135deg,#e8f0ff,#dbe7ff); border: 1.5px dashed #0064FA;
        }
        .pc-captcha-text { font-family: monospace; font-size: 18px; font-weight: 800; letter-spacing: 3px; color: #0052d4; font-style: italic; }
        .pc-captcha-refresh { color: #0064FA; font-size: 13px; }
        .pc-captcha-wrap input { flex: 1; }
        .pc-auth-error { color: #dc2626; font-size: 13px; margin-bottom: 12px; padding: 9px 12px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; }
        .pc-auth-submit { margin-top: 16px; padding: 13px; border: none; border-radius: 10px; background: #0064FA; color: #fff; font-weight: 700; font-size: 15px; cursor: pointer; }
        .pc-auth-submit:disabled { opacity: .6; cursor: default; }
        .pc-auth-demo { margin-top: 10px; padding: 12px; border: 1.5px solid #0064FA; border-radius: 10px; background: #fff; color: #0064FA; font-weight: 700; font-size: 14px; cursor: pointer; }
        .pc-auth-demo:hover:not(:disabled) { background: #e8f0ff; }
        .pc-auth-demo:disabled { opacity: .6; cursor: default; }
        .pc-auth-switch { text-align: center; margin-top: 16px; font-size: 13px; color: #6b7280; }
        .pc-auth-switch a { color: #0064FA; cursor: pointer; font-weight: 600; }
      `})]})}const Xe=[{icon:"fas fa-id-card",name:a("pc.kyc"),path:"/proof",lockWhenVerified:!0},{icon:"fas fa-link",name:a("pc.bindAccount"),path:"/bind-account"},{icon:"fas fa-list",name:a("pc.orders"),path:"/ordersPage"},{icon:"fas fa-money-bill",name:a("pc.deposit"),path:"/deposit",requiresKyc:!0},{icon:"fas fa-arrow-up",name:a("pc.withdraw"),path:"/Withdraw",requiresKyc:!0},{icon:"fas fa-shield-alt",name:a("pc.password"),path:"/typepassword",requiresKyc:!0},{icon:"fas fa-file-alt",name:a("pc.history"),path:"/history",requiresKyc:!0},{icon:"fas fa-bell",name:a("pc.notifications"),path:"/notification"},{icon:"fas fa-headset",name:a("pc.onlineService"),path:"/online-service"},{icon:"fas fa-building",name:a("pc.aboutUs"),path:"/about"},{icon:"fas fa-question-circle",name:a("pc.help"),path:"/support"}],he=new Set,Ge=[..._.privateRoutes,..._.screenRoutes,..._.routeswithoutmobilemenue,..._.navRoutes].filter(o=>!(o!=null&&o.path)||he.has(o.path)?!1:(he.add(o.path),!0)).map(o=>({path:o.path,Component:Pe({loader:o.loader})}));function et({onClose:o}){var A;const N=ne(),l=Y(Z.selectCurrentUser),x=Y(Oe.selectKycStatus);c.useEffect(()=>{N(ve.doFetch())},[N]),c.useEffect(()=>{const s=Ve(),p={push:s.push,replace:s.replace,go:s.go,goBack:s.goBack,goForward:s.goForward},f=()=>{};return s.push=f,s.replace=f,s.go=f,s.goBack=f,s.goForward=f,()=>{s.push=p.push,s.replace=p.replace,s.go=p.go,s.goBack=p.goBack,s.goForward=p.goForward}},[]);const d=x==="success",z=(l==null?void 0:l.accountType)==="demo",y=c.useMemo(()=>Xe.map(s=>({...s,disabled:s.requiresKyc?!d||z:s.lockWhenVerified?d:!1})),[d,z]),I=((A=y.find(s=>!s.disabled))==null?void 0:A.path)||"/proof",[g,h]=c.useState({path:I,n:0}),D=c.useMemo(()=>Ce({initialEntries:[g.path]}),[g]),[k,R]=c.useState(!1);c.useEffect(()=>{const s=()=>R(D.index>0);return s(),D.listen(s)},[D]);const O=s=>{s.disabled||h(p=>({path:s.path,n:p.n+1}))};c.useEffect(()=>{const s=y.find(p=>p.path===g.path);if(s!=null&&s.disabled){const p=y.find(f=>!f.disabled);p&&h(f=>({path:p.path,n:f.n+1}))}},[y,g.path]);const W=x==="success"?a("pc.verified"):x==="pending"?a("pc.pendingReview"):a("pc.notVerified"),C=x==="success"?"#10b981":x==="pending"?"#f59e0b":"#ef4444";return e.jsxs("div",{className:"pc-modal-overlay",onClick:o,children:[e.jsxs("div",{className:"pc-profile-modal",onClick:s=>s.stopPropagation(),children:[e.jsx("button",{className:"pc-modal-x",onClick:o,children:"✕"}),e.jsxs("aside",{className:"pc-profile-side",children:[e.jsxs("div",{className:"pc-profile-user",children:[e.jsx("div",{className:"pc-profile-avatar",children:((l==null?void 0:l.firstName)||(l==null?void 0:l.email)||"U").charAt(0).toUpperCase()}),e.jsx("div",{className:"pc-profile-email",children:(l==null?void 0:l.email)||"—"}),e.jsxs("div",{className:"pc-kyc-badge",style:{color:C,borderColor:C},children:[e.jsx("i",{className:x==="success"?"fas fa-check-circle":x==="pending"?"fas fa-clock":"fas fa-exclamation-circle"}),W]})]}),!d&&e.jsx("div",{className:"pc-kyc-hint",children:z?a("pc.demoNoFeatures"):a("pc.completeKyc")}),e.jsxs("nav",{className:"pc-profile-menu",children:[y.map(s=>e.jsxs("button",{className:`${g.path===s.path?"active":""} ${s.disabled?"disabled":""}`,onClick:()=>O(s),disabled:s.disabled,children:[e.jsx("i",{className:s.icon})," ",e.jsx("span",{children:s.name}),s.disabled&&e.jsx("i",{className:"fas fa-lock pc-lock"})]},s.name)),e.jsxs("button",{className:"pc-profile-logout",onClick:()=>{N(V.doSignout()),o()},children:[e.jsx("i",{className:"fas fa-sign-out-alt"})," ",e.jsx("span",{children:a("pc.logout")})]})]})]}),e.jsxs("section",{className:`pc-profile-content ${k?"pc-nav-sub":"pc-nav-root"}`,children:[k&&e.jsx("div",{className:"pc-nav-bar",children:e.jsxs("button",{className:"pc-nav-back",onClick:()=>D.goBack(),children:[e.jsx("span",{className:"pc-nav-back-ico",children:"←"})," ",a("pc.back")]})}),e.jsx(Se,{history:D,children:e.jsx(Qe.Suspense,{fallback:e.jsx(Ue,{}),children:e.jsx(Ye,{children:Ge.map(s=>e.jsx(Fe,{exact:!0,path:s.path,component:s.Component},s.path))})})},`mem-${g.n}`)]})]}),e.jsx("style",{children:`
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
      `})]})}const tt=`
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
`;function at(o){return o==null?"—":`${o>=0?"+":""}${o.toFixed(2)}%`}function X(o){return o==null?"—":o>=1e4?o.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):o>=100?o.toFixed(2):o>=10?o.toFixed(3):o.toFixed(5)}function nt(){const o=ne(),N=Y(Z.selectCurrentUser),l=Y(Z.selectCurrentTenant),x=Y(Re.selectRows),[d,z]=c.useState("XAUUSD"),[y,I]=c.useState(""),[g,h]=c.useState("All"),[D,k]=c.useState(null),[R,O]=c.useState(!1),[W,C]=c.useState(We()),[A,s]=c.useState(100),[p,f]=c.useState(.01),[L,G]=c.useState(!1),[T,w]=c.useState(0),[b,ee]=c.useState(!1),[H,F]=c.useState(0),[E,r]=c.useState(null),[S,B]=c.useState(!1),[le,pe]=c.useState(null),[te,me]=c.useState({}),$=c.useRef(null),ae=c.useRef(null),se=t=>`~m~${t.length}~m~${t}`,ye=t=>{const i=[];let u=t;for(;u.length>0&&u.startsWith("~m~");){const j=u.indexOf("~m~",3),m=parseInt(u.substring(3,j));i.push(u.substring(j+3,j+3+m)),u=u.substring(j+3+m)}return i},be=t=>{try{return JSON.parse(t.replace(/^=\{/,"{")).symbol||t}catch{return t}},ce=c.useCallback(()=>{$.current&&($.current.close(),$.current=null);const t=new WebSocket(Je());$.current=t,t.onopen=()=>{const i="qs_"+Math.random().toString(36).substring(2,12);t.send(se(JSON.stringify({m:"quote_create_session",p:[i]}))),t.send(se(JSON.stringify({m:"quote_set_fields",p:[i,"lp","ask","bid","chp"]}))),t.send(se(JSON.stringify({m:"quote_add_symbols",p:[i,...je.map(u=>u.symbol)]})))},t.onmessage=i=>{const u=i.data;if(u.startsWith("~h~")){t.send(u);return}ye(u).forEach(j=>{try{const m=JSON.parse(j);if(m.m!=="qsd")return;const J=m.p[1],Q=be(J.n),U=J.v;if(!U)return;me(oe=>{const v=oe[Q]||{symbol:Q,ask:0,bid:0},q={symbol:Q,ask:U.ask??v.ask,bid:U.bid??v.bid,lp:typeof U.lp=="number"?U.lp:v.lp,chp:typeof U.chp=="number"?U.chp:v.chp};return v.ask===q.ask&&v.bid===q.bid&&v.lp===q.lp&&v.chp===q.chp?oe:{...oe,[Q]:q}})}catch{}})},t.onclose=i=>{i.wasClean||(ae.current=setTimeout(ce,3e3))},t.onerror=()=>{}},[]);c.useEffect(()=>(ce(),()=>{var t;ae.current&&clearTimeout(ae.current),(t=$.current)==null||t.close()}),[ce]);const de=qe(),n=de[d],M=c.useMemo(()=>{const t=te[d];return t?t.lp&&t.lp>0?t.lp:t.ask&&t.bid?(t.ask+t.bid)/2:null:null},[te,d]),[De,Te]=c.useState(()=>typeof window<"u"?Math.max(360,window.innerHeight-60-88):480);c.useEffect(()=>{const t=()=>Te(Math.max(360,window.innerHeight-60-88));return window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]);const xe=c.useRef(null);c.useEffect(()=>{xe.current=M},[M]);const ze=c.useMemo(()=>n?{symbol:n.symbol,entryPrice:n.entryPrice,targetPrice:n.targetPrice,startedAt:n.startedAt,durationMs:n.durationMs,seed:n.seed}:null,[n==null?void 0:n.symbol,n==null?void 0:n.startedAt,n==null?void 0:n.targetPrice,n==null?void 0:n.durationMs,n==null?void 0:n.entryPrice,n==null?void 0:n.seed]),[ue,Me]=c.useState(0);c.useEffect(()=>{N&&o(fe.doFetch())},[o,N]),c.useEffect(()=>{const t=x==null?void 0:x.find(i=>i.symbol==="USDT");Me((t==null?void 0:t.amount)||0)},[x]);const ie=Ze(d)||{symbol:d,name:d},Ie=n?xe.current??n.targetPrice:M,P=c.useMemo(()=>{const t=M??0,i=A/100;return t*100*p/i},[M,p,A]),re=P>=100?P.toFixed(3):P.toFixed(5),K=N?ue<P&&P>0:!1,ke=c.useMemo(()=>((M??0)*p*100*1e-5).toFixed(6),[M,p]),Ae=`1 Lots = 100 ${d}`,we=c.useMemo(()=>je.filter(t=>y&&!`${t.symbol} ${t.name}`.toLowerCase().includes(y.toLowerCase())?!1:g==="All"?!0:g==="Forex"?!!t.baseFlag&&!t.badgeColor&&!/OIL|100|200|225|30|35|40|500|SPX|NAS|US30/.test(t.symbol):g==="Crypto"?!!t.badgeColor&&/BTC|ETH|LTC/.test(t.symbol):g==="Metals"?/XAU|XAG/.test(t.symbol):g==="Indices"?/100|200|225|30|35|40|500|SPX|NAS|US30/.test(t.symbol):!0),[y,g]),ge=t=>{if(!N){k("login");return}r(t)},Ee=async()=>{var t,i,u,j;if(!(!E||!(l!=null&&l.id)||M==null)){B(!0);try{await $e.post(`/tenant/${l.id}/trade-orders`,{orderType:"market",symbol:d,symbolName:ie.name,direction:E,lots:p,multiplier:A,entryPrice:M,takeProfit:b?H:null,stopLoss:L?T:null}),Me(m=>Math.max(0,m-P)),o(fe.doFetch()),r(null),pe(`${E==="buy"?a("pc.buy"):a("pc.sell")} — ${a("pc.orderPlaced")} ${d}`),setTimeout(()=>pe(null),3500)}catch(m){alert(((j=(u=(i=(t=m==null?void 0:m.response)==null?void 0:t.data)==null?void 0:i.errors)==null?void 0:u[0])==null?void 0:j.message)||"Failed to place order")}finally{B(!1)}}},Le=t=>{C(t),Ke.doChangeLanguage(t)};return e.jsxs("div",{className:"pc-root",children:[e.jsx("style",{children:tt}),e.jsxs("header",{className:"pc-header",children:[e.jsx("div",{className:"pc-header-left",children:e.jsx("img",{src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAyIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMjAyIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNTIuMjc0NyAzMC4xNTMzVjExLjE5NTZINTUuODYxNVYxMi44NjMyQzU2LjQ3MyAxMS44MDcxIDU4LjAwMTkgMTAuODg5OCA2MC4wNTk4IDEwLjg4OThDNjQuMDYyOSAxMC44ODk4IDY2LjM3MDMgMTMuOTQ3NSA2Ni4zNzAzIDE4LjAwNUM2Ni4zNzAzIDIyLjE0NyA2My43ODUzIDI1LjIwNDcgNTkuOTIxIDI1LjIwNDdDNTguMDMgMjUuMjA0NyA1Ni42NCAyNC40NTQzIDU1Ljk3NDEgMjMuNTM3VjMwLjE1MzNINTIuMjc0N1pNNTkuMzM1NiAxNC4xOTlDNTcuNDQ0NiAxNC4xOTkgNTUuOTE1OCAxNS42MTcyIDU1LjkxNTggMTguMDM1MkM1NS45MTU4IDIwLjQ1MzIgNTcuNDQ0NiAyMS44OTk1IDU5LjMzNTYgMjEuODk5NUM2MS4yMjY1IDIxLjg5OTUgNjIuNzI3MiAyMC40ODEzIDYyLjcyNzIgMTguMDM1MkM2Mi43MjcyIDE1LjYxNTIgNjEuMjI2NSAxNC4xOTkgNTkuMzM1NiAxNC4xOTlaTTgwLjg0IDIwLjk1NDFDODAuMTQ2IDIzLjMxNTggNzcuOTc3NSAyNS4yOTEyIDc0LjYxNCAyNS4yOTEyQzcwLjg2MjMgMjUuMjkxMiA2Ny41NTMxIDIyLjU5NTYgNjcuNTUzMSAxNy45ODA5QzY3LjU1MzEgMTMuNjE3NiA3MC43Nzc4IDEwLjc4MTIgNzQuMjgwMSAxMC43ODEyQzc4LjUwNDUgMTAuNzgxMiA4MS4wMzUyIDEzLjQ3NjggODEuMDM1MiAxNy44NzAyQzgxLjAzNTIgMTguMzk3MyA4MC45Nzg4IDE4Ljk1NDUgODAuOTc4OCAxOS4wMDg4SDcxLjE5NDJDNzEuMjc2NyAyMC44MTUzIDcyLjgwNTUgMjIuMTIyOCA3NC42NDAyIDIyLjEyMjhDNzYuMzY0MSAyMi4xMjI4IDc3LjMwOTYgMjEuMjYxOSA3Ny43NTQyIDIwLjAzODhMODAuODQgMjAuOTU0MVpNNzcuMzk0MSAxNi40NzgyQzc3LjMzNzggMTUuMTE2MyA3Ni40NDg2IDEzLjc4MjYgNzQuMzM2NCAxMy43ODI2QzcyLjQxNzMgMTMuNzgyNiA3MS4zNjEyIDE1LjIyODkgNzEuMjc4NyAxNi40NzgySDc3LjM5NDFaTTgyLjQwNTEgMzAuMTUzM1YxMS4xOTU2SDg1Ljk5MTlWMTIuODYzMkM4Ni42MDM0IDExLjgwNzEgODguMTMyMiAxMC44ODk4IDkwLjE5MDIgMTAuODg5OEM5NC4xOTMzIDEwLjg4OTggOTYuNTAwNyAxMy45NDc1IDk2LjUwMDcgMTguMDA1Qzk2LjUwMDcgMjIuMTQ3IDkzLjkxNTcgMjUuMjA0NyA5MC4wNTEzIDI1LjIwNDdDODguMTYwNCAyNS4yMDQ3IDg2Ljc3MDQgMjQuNDU0MyA4Ni4xMDQ1IDIzLjUzN1YzMC4xNTMzSDgyLjQwNTFaTTg5LjQ2NCAxNC4xOTlDODcuNTczIDE0LjE5OSA4Ni4wNDQyIDE1LjYxNzIgODYuMDQ0MiAxOC4wMzUyQzg2LjA0NDIgMjAuNDUzMiA4Ny41NzMgMjEuODk5NSA4OS40NjQgMjEuODk5NUM5MS4zNTQ5IDIxLjg5OTUgOTIuODU1NiAyMC40ODEzIDkyLjg1NTYgMTguMDM1MkM5Mi44NTU2IDE1LjYxNTIgOTEuMzU0OSAxNC4xOTkgODkuNDY0IDE0LjE5OVpNOTcuODM0NCAzMC4wNTI3VjExLjA5NUgxMDEuNDIxVjEyLjc2MjdDMTAyLjAzMyAxMS43MDY2IDEwMy41NjIgMTAuNzg5MiAxMDUuNjE5IDEwLjc4OTJDMTA5LjYyMyAxMC43ODkyIDExMS45MyAxMy44NDY5IDExMS45MyAxNy45MDQ0QzExMS45MyAyMi4wNDY0IDEwOS4zNDUgMjUuMTA0MSAxMDUuNDgxIDI1LjEwNDFDMTAzLjU5IDI1LjEwNDEgMTAyLjIgMjQuMzUzOCAxMDEuNTM0IDIzLjQzNjRWMzAuMDUyN0g5Ny44MzQ0Wk0xMDQuODkzIDE0LjA5NjRDMTAzLjAwMiAxNC4wOTY0IDEwMS40NzMgMTUuNTE0NiAxMDEuNDczIDE3LjkzMjZDMTAxLjQ3MyAyMC4zNTA2IDEwMy4wMDIgMjEuNzk2OSAxMDQuODkzIDIxLjc5NjlDMTA2Ljc4NCAyMS43OTY5IDEwOC4yODUgMjAuMzc4NyAxMDguMjg1IDE3LjkzMjZDMTA4LjI4NSAxNS41MTQ2IDEwNi43ODQgMTQuMDk2NCAxMDQuODkzIDE0LjA5NjRaTTEyNi4zOTggMjAuOTU0MUMxMjUuNzA0IDIzLjMxNTggMTIzLjUzNSAyNS4yOTEyIDEyMC4xNzIgMjUuMjkxMkMxMTYuNDIgMjUuMjkxMiAxMTMuMTExIDIyLjU5NTYgMTEzLjExMSAxNy45ODA5QzExMy4xMTEgMTMuNjE3NiAxMTYuMzM1IDEwLjc4MTIgMTE5LjgzOCAxMC43ODEyQzEyNC4wNjIgMTAuNzgxMiAxMjYuNTkzIDEzLjQ3NjggMTI2LjU5MyAxNy44NzAyQzEyNi41OTMgMTguMzk3MyAxMjYuNTM3IDE4Ljk1NDUgMTI2LjUzNyAxOS4wMDg4SDExNi43NTJDMTE2LjgzNCAyMC44MTUzIDExOC4zNjMgMjIuMTIyOCAxMjAuMTk4IDIyLjEyMjhDMTIxLjkyMiAyMi4xMjI4IDEyMi44NjcgMjEuMjYxOSAxMjMuMzEyIDIwLjAzODhMMTI2LjM5OCAyMC45NTQxWk0xMjIuOTUyIDE2LjQ3ODJDMTIyLjg5NSAxNS4xMTYzIDEyMi4wMDYgMTMuNzgyNiAxMTkuODk0IDEzLjc4MjZDMTE3Ljk3NSAxMy43ODI2IDExNi45MTkgMTUuMjI4OSAxMTYuODM2IDE2LjQ3ODJIMTIyLjk1MlpNMTM2LjU4MSAxNC44NjQ4QzEzNi4xNjQgMTQuNzgyNCAxMzUuODAyIDE0Ljc1NDIgMTM1LjQ2OCAxNC43NTQyQzEzMy41NzcgMTQuNzU0MiAxMzEuOTM4IDE1LjY3MTUgMTMxLjkzOCAxOC42MTg2VjI0Ljg3MjhIMTI4LjI0VjExLjE5NTZIMTMxLjgyN1YxMy4yMjUzQzEzMi42NiAxMS40MTg5IDEzNC41NTEgMTEuMDg1IDEzNS43MiAxMS4wODVDMTM2LjAyNSAxMS4wODUgMTM2LjMwMyAxMS4xMTMxIDEzNi41ODEgMTEuMTQxM1YxNC44NjQ4Wk0xNDAuMDY5IDIwLjM2ODdDMTQwLjE1MSAyMS40NTMgMTQwLjk1OCAyMi40NTI3IDE0Mi41NzEgMjIuNDUyN0MxNDMuNzk0IDIyLjQ1MjcgMTQ0LjM3OCAyMS44MTMxIDE0NC4zNzggMjEuMDkwOUMxNDQuMzc4IDIwLjQ3OTMgMTQzLjk2MSAxOS45Nzg0IDE0Mi45MDUgMTkuNzU3MkwxNDEuMDk5IDE5LjM0MDdDMTM4LjQ1OCAxOC43NTc0IDEzNy4yNjMgMTcuMTcyMiAxMzcuMjYzIDE1LjI1NTFDMTM3LjI2MyAxMi44MDg5IDEzOS40MzEgMTAuNzc5MiAxNDIuMzc4IDEwLjc3OTJDMTQ2LjI3MSAxMC43NzkyIDE0Ny41NzYgMTMuMjUzNSAxNDcuNzQzIDE0LjcyNkwxNDQuNjU3IDE1LjQyQzE0NC41NDcgMTQuNjEzNCAxNDMuOTYzIDEzLjU4NTQgMTQyLjQwNiAxMy41ODU0QzE0MS40MzMgMTMuNTg1NCAxNDAuNjU0IDE0LjE2ODggMTQwLjY1NCAxNC45NDczQzE0MC42NTQgMTUuNjE1MiAxNDEuMTU1IDE2LjAzMTYgMTQxLjkwNSAxNi4xNzA0TDE0My44NTEgMTYuNTg2OEMxNDYuNTQ2IDE3LjE0MiAxNDcuOTA4IDE4Ljc4MzUgMTQ3LjkwOCAyMC43ODUxQzE0Ny45MDggMjMuMDEgMTQ2LjE4NCAyNS4yODkyIDE0Mi41OTkgMjUuMjg5MkMxMzguNDg2IDI1LjI4OTIgMTM3LjA2NyAyMi42MTk3IDEzNi45IDIxLjA2NDdMMTQwLjA2OSAyMC4zNjg3Wk0xNTQuODMyIDExLjE5NTZIMTU3LjU4NFYxNC40NzY2SDE1NC44MzJWMjAuMjAzN0MxNTQuODMyIDIxLjM5ODYgMTU1LjM4OCAyMS43ODg5IDE1Ni40NDYgMjEuNzg4OUMxNTYuODkgMjEuNzg4OSAxNTcuMzkxIDIxLjczMjYgMTU3LjU4NCAyMS42NzgzVjI0LjczNkMxNTcuMjUgMjQuODc0OCAxNTYuNTg0IDI1LjA2OTkgMTU1LjUgMjUuMDY5OUMxNTIuODMzIDI1LjA2OTkgMTUxLjE2MyAyMy40ODQ3IDE1MS4xNjMgMjAuODQ1NFYxNC40ODA2SDE0OC42ODlWMTEuMTk5NkgxNDkuMzgzQzE1MC44MjkgMTEuMTk5NiAxNTEuNDk1IDEwLjI1NDEgMTUxLjQ5NSA5LjAzMTA3VjcuMTExOTZIMTU0LjgzVjExLjE5NTZIMTU0LjgzMlpNMTcyLjQxIDE4LjAzNTJDMTcyLjQxIDIyLjIzMzUgMTY5LjMyNCAyNS4yOTEyIDE2NS4yMzkgMjUuMjkxMkMxNjEuMTUzIDI1LjI5MTIgMTU4LjA2NyAyMi4yMzM1IDE1OC4wNjcgMTguMDM1MkMxNTguMDY3IDEzLjgxMDcgMTYxLjE1MyAxMC43ODEyIDE2NS4yMzkgMTAuNzgxMkMxNjkuMzI0IDEwLjc3OTIgMTcyLjQxIDEzLjgwODcgMTcyLjQxIDE4LjAzNTJaTTE2OC43MTMgMTguMDM1MkMxNjguNzEzIDE1LjQ1MDIgMTY3LjA0NSAxNC4xNDI2IDE2NS4yMzkgMTQuMTQyNkMxNjMuNDMyIDE0LjE0MjYgMTYxLjc2NCAxNS40NDgyIDE2MS43NjQgMTguMDM1MkMxNjEuNzY0IDIwLjU5MiAxNjMuNDMyIDIxLjkyNzcgMTY1LjIzOSAyMS45Mjc3QzE2Ny4wNDUgMjEuOTI3NyAxNjguNzEzIDIwLjYyMDEgMTY4LjcxMyAxOC4wMzUyWk0xNzcuNDE1IDI0Ljg3MjhIMTczLjcxOFYxMS4xOTU2SDE3Ny4zMDRWMTIuODkxNEMxNzguMTM3IDExLjQ3MzIgMTc5Ljc3OSAxMC44MzM1IDE4MS4yNTEgMTAuODMzNUMxODQuNjQzIDEwLjgzMzUgMTg2LjIgMTMuMjUxNSAxODYuMiAxNi4yNTQ5VjI0Ljg3MjhIMTgyLjUwMlYxNi44OTQ2QzE4Mi41MDIgMTUuMzY1NyAxODEuNzUyIDE0LjE3MDggMTc5Ljk3NCAxNC4xNzA4QzE3OC4zNjIgMTQuMTcwOCAxNzcuNDE3IDE1LjQyMjEgMTc3LjQxNyAxNy4wMDUyVjI0Ljg3MjhIMTc3LjQxNVpNMjAwLjk3MyAyMC45NTQxQzIwMC4yNzkgMjMuMzE1OCAxOTguMTExIDI1LjI5MTIgMTk0Ljc0NyAyNS4yOTEyQzE5MC45OTYgMjUuMjkxMiAxODcuNjg2IDIyLjU5NTYgMTg3LjY4NiAxNy45ODA5QzE4Ny42ODYgMTMuNjE3NiAxOTAuOTExIDEwLjc4MTIgMTk0LjQxMyAxMC43ODEyQzE5OC42MzggMTAuNzgxMiAyMDEuMTY4IDEzLjQ3NjggMjAxLjE2OCAxNy44NzAyQzIwMS4xNjggMTguMzk3MyAyMDEuMTEyIDE4Ljk1NDUgMjAxLjExMiAxOS4wMDg4SDE5MS4zMjhDMTkxLjQxIDIwLjgxNTMgMTkyLjkzOSAyMi4xMjI4IDE5NC43NzMgMjIuMTIyOEMxOTYuNDk3IDIyLjEyMjggMTk3LjQ0MyAyMS4yNjE5IDE5Ny44ODcgMjAuMDM4OEwyMDAuOTczIDIwLjk1NDFaTTE5Ny41MjcgMTYuNDc4MkMxOTcuNDcxIDE1LjExNjMgMTk2LjU4MiAxMy43ODI2IDE5NC40NyAxMy43ODI2QzE5Mi41NTEgMTMuNzgyNiAxOTEuNDk0IDE1LjIyODkgMTkxLjQxMiAxNi40NzgySDE5Ny41MjdaIiBmaWxsPSIjMTUxNTE1Ii8+CjxwYXRoIGQ9Ik0zNy45MjE2IDcuNDk2MTlDMzAuODQ0NyAzLjQyODY1IDE2LjEwOTQgMC4yMzIxNDggOC4zMDgyNCAwLjAyNDk0ODhDMC41MDUwNzggLTAuMTgyMjUgLTAuMzY1OTYyIDIuNTk3ODQgMC4xMTA3OTcgOC45MjY0N0MwLjU4OTU2OCAxNS4yNTcxIDIuNDE0MTMgMjUuMTM0MyA2LjQ0MTQ0IDMxLjQ0MjhDMTAuNDY2NyAzNy43NTEzIDE2LjY5MjggNDAuNDkxMSAyMy4yOTMgMzguMjMwMUMyOS44OTEyIDM1Ljk2NyAzNi44NjU1IDI4LjcwMjkgNDAuNjQxNCAyMi42MDE2QzQ0LjQxNzIgMTYuNTA0MyA0NC45OTg2IDExLjU2MzcgMzcuOTIxNiA3LjQ5NjE5Wk0yNC4wNjc1IDI0Ljg3ODhIMTkuMTA0N1YzMy4xMzI2SDE0LjA1MTVWMTQuNzcwM0gxOS4xMDQ3VjE5LjgyMzVIMjQuMDY3NVYxOS44MDk1QzI2LjE0OTUgMTkuNzczMyAyNy44MjcyIDE4LjA3NzQgMjcuODI3MiAxNS45ODczQzI3LjgyNzIgMTMuODk3MiAyNi4xNDk1IDEyLjE5OTQgMjQuMDY3NSAxMi4xNjUyVjEyLjE2MTJINy43MzI5MUw5LjU3OTYgNy4xMDc5NUgyNC4wNjU0QzI4Ljk4MTkgNy4xMDc5NSAzMi45NjkgMTEuMDk1IDMyLjk2OSAxNi4wMTE1QzMyLjk3MSAyMC45Mjk5IDI4Ljk4MzkgMjQuODc4OCAyNC4wNjc1IDI0Ljg3ODhaIiBmaWxsPSIjMDA2NEZBIi8+CjxwYXRoIGQ9Ik0yNC4wNjc1IDI0Ljg3ODhIMTkuMTA0N1YzMy4xMzI2SDE0LjA1MTVWMTQuNzcwM0gxOS4xMDQ3VjE5LjgyMzVIMjQuMDY3NVYxOS44MDk1QzI2LjE0OTUgMTkuNzczMyAyNy44MjcyIDE4LjA3NzQgMjcuODI3MiAxNS45ODczQzI3LjgyNzIgMTMuODk3MiAyNi4xNDk1IDEyLjE5OTQgMjQuMDY3NSAxMi4xNjUyVjEyLjE2MTJINy43MzI5MUw5LjU3OTYgNy4xMDc5NUgyNC4wNjU0QzI4Ljk4MTkgNy4xMDc5NSAzMi45NjkgMTEuMDk1IDMyLjk2OSAxNi4wMTE1QzMyLjk3MSAyMC45Mjk5IDI4Ljk4MzkgMjQuODc4OCAyNC4wNjc1IDI0Ljg3ODhaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K",alt:""})}),e.jsx("div",{className:"pc-header-center"}),e.jsxs("div",{className:"pc-header-right",children:[e.jsx("select",{className:"pc-lang",value:W,onChange:t=>Le(t.target.value),children:Be().map(t=>e.jsx("option",{value:t.id,children:t.label},t.id))}),N?e.jsx(e.Fragment,{children:e.jsxs("button",{className:"pc-btn-ghost",onClick:()=>O(!0),children:[e.jsx("i",{className:"fas fa-user"})," ",a("pc.profile")]})}):e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"pc-btn-ghost",onClick:()=>k("login"),children:a("pc.login")}),e.jsx("button",{className:"pc-btn-primary",onClick:()=>k("register"),children:a("pc.register")})]})]})]}),e.jsxs("div",{className:"pc-main",children:[e.jsxs("aside",{className:"pc-left",children:[e.jsxs("div",{className:"pc-search",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("input",{placeholder:a("pc.searchMarkets"),value:y,onChange:t=>I(t.target.value)})]}),e.jsx("div",{className:"pc-filter",children:e.jsx("select",{value:g,onChange:t=>h(t.target.value),children:[["All","pc.all"],["Forex","pc.forex"],["Crypto","pc.crypto"],["Metals","pc.metals"],["Indices","pc.indices"]].map(([t,i])=>e.jsx("option",{value:t,children:a(i)},t))})}),e.jsx("div",{className:"pc-market-list",children:we.map(t=>{const i=te[t.symbol],u=i?i.lp&&i.lp>0?i.lp:i.ask&&i.bid?(i.ask+i.bid)/2:null:null,j=de[t.symbol],m=j?j.targetPrice:u,J=j?(j.targetPrice-j.entryPrice)/j.entryPrice*100:(i==null?void 0:i.chp)??null,Q=(J??0)>=0;return e.jsxs("div",{className:`pc-market-item ${d===t.symbol?"active":""}`,onClick:()=>z(t.symbol),children:[e.jsx(Ne,{pair:t,size:"sm"}),e.jsxs("div",{className:"pc-market-info",children:[e.jsx("div",{className:"pc-market-symbol",children:t.symbol}),e.jsx("div",{className:"pc-market-name",children:t.name})]}),e.jsxs("div",{className:"pc-market-px",children:[e.jsx("div",{className:"pc-market-price",children:X(m)}),e.jsxs("div",{className:`pc-market-chg ${Q?"pos":"neg"}`,children:[Q?"▲":"▼"," ",at(J)]})]})]},t.symbol)})})]}),e.jsxs("section",{className:"pc-center",children:[e.jsxs("div",{className:"pc-chart-head",children:[e.jsxs("div",{className:"pc-chart-asset",children:[e.jsx(Ne,{pair:ie,size:"md"}),e.jsxs("div",{children:[e.jsx("div",{className:"pc-chart-name",children:d}),e.jsx("div",{className:"pc-chart-sub",children:ie.name})]})]}),e.jsx("div",{className:"pc-chart-price",style:{color:n?n.targetPrice>=n.entryPrice?"#10b981":"#ef4444":"#1a1d23"},children:X(Ie)})]}),e.jsx("div",{className:"pc-chart-wrap",children:e.jsx(He,{symbol:d,livePrice:M,height:De,priceInjection:ze},d)})]}),e.jsxs("aside",{className:"pc-right",children:[e.jsxs("div",{className:"pc-funds",children:[e.jsx("div",{className:"pc-funds-label",children:a("pc.availableFunds")}),e.jsx("div",{className:"pc-funds-amount",children:N?`$${ue.toFixed(2)}`:"----"})]}),e.jsxs("div",{className:"pc-trade-panel",children:[e.jsx("div",{className:"pc-tp-symbol",children:d}),e.jsx("div",{className:"pc-tp-price",children:X(M)}),e.jsx("select",{className:"pc-tp-select",children:e.jsx("option",{children:a("pc.marketPrice")})}),e.jsx("div",{className:"pc-tp-label",children:a("pc.multiplier")}),e.jsx("select",{className:"pc-tp-select",value:A,onChange:t=>s(+t.target.value),children:[100,200,300,400,500].map(t=>e.jsx("option",{value:t,children:t},t))}),e.jsxs("div",{className:"pc-tp-toggle-row",children:[e.jsx("span",{children:a("pc.setLoss")}),e.jsxs("label",{className:"pc-switch",children:[e.jsx("input",{type:"checkbox",checked:L,onChange:t=>{G(t.target.checked),w(t.target.checked&&M?M:0)}}),e.jsx("span",{className:"pc-slider"})]})]}),e.jsxs("div",{className:"pc-stepper full",children:[e.jsx("button",{onClick:()=>L&&w(t=>Math.max(0,+(t-.01).toFixed(5))),disabled:!L,children:"−"}),e.jsx("input",{type:"number",step:"any",min:"0",disabled:!L,value:T,onChange:t=>w(parseFloat(t.target.value)||0)}),e.jsx("button",{onClick:()=>L&&w(t=>+(t+.01).toFixed(5)),disabled:!L,children:"+"})]}),e.jsxs("div",{className:"pc-tp-toggle-row",children:[e.jsx("span",{children:a("pc.takeProfit")}),e.jsxs("label",{className:"pc-switch",children:[e.jsx("input",{type:"checkbox",checked:b,onChange:t=>{ee(t.target.checked),F(t.target.checked&&M?M:0)}}),e.jsx("span",{className:"pc-slider"})]})]}),e.jsxs("div",{className:"pc-stepper full",children:[e.jsx("button",{onClick:()=>b&&F(t=>Math.max(0,+(t-.01).toFixed(5))),disabled:!b,children:"−"}),e.jsx("input",{type:"number",step:"any",min:"0",disabled:!b,value:H,onChange:t=>F(parseFloat(t.target.value)||0)}),e.jsx("button",{onClick:()=>b&&F(t=>+(t+.01).toFixed(5)),disabled:!b,children:"+"})]}),e.jsx("div",{className:"pc-tp-label",children:a("pc.lots")}),e.jsxs("div",{className:"pc-stepper full",children:[e.jsx("button",{onClick:()=>f(t=>Math.max(.01,+(t-.01).toFixed(2))),children:"−"}),e.jsx("input",{type:"number",step:"0.01",min:"0.01",value:p,onChange:t=>{const i=parseFloat(t.target.value);f(isNaN(i)||i<.01?.01:Math.round(i*100)/100)}}),e.jsx("button",{onClick:()=>f(t=>+(t+.01).toFixed(2)),children:"+"})]}),e.jsxs("div",{className:"pc-tp-info",children:[e.jsxs("div",{className:"pc-tp-info-row",children:[e.jsx("span",{children:a("pc.eachLots")}),e.jsx("b",{children:Ae})]}),e.jsxs("div",{className:"pc-tp-info-row",children:[e.jsx("span",{children:a("pc.handlingFee")}),e.jsx("b",{children:ke})]}),e.jsxs("div",{className:"pc-tp-info-row",children:[e.jsx("span",{children:a("pc.estimatedMargin")}),e.jsx("b",{style:{color:K?"#ef4444":"#1a1d23"},children:re})]})]}),K&&e.jsxs("div",{className:"pc-insufficient",children:["⚠ ",a("pc.insufficient")," ($",re,")"]}),e.jsxs("div",{className:"pc-tp-actions",children:[e.jsx("button",{className:"pc-buy2",disabled:M==null||K,onClick:()=>ge("buy"),children:a("pc.buy")}),e.jsx("button",{className:"pc-sell2",disabled:M==null||K,onClick:()=>ge("sell"),children:a("pc.sell")})]})]})]})]}),E&&e.jsx("div",{className:"pc-modal-overlay",onClick:()=>!S&&r(null),children:e.jsxs("div",{className:"pc-confirm",onClick:t=>t.stopPropagation(),children:[e.jsx("div",{className:"pc-confirm-title",children:E==="buy"?a("pc.confirmBuy"):a("pc.confirmSell")}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:a("pc.symbol")}),e.jsx("strong",{children:d})]}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:a("pc.direction")}),e.jsx("strong",{className:E==="buy"?"pos":"neg",children:E==="buy"?a("pc.buy"):a("pc.sell")})]}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:a("pc.price")}),e.jsx("strong",{children:X(M)})]}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:a("pc.lotsMult")}),e.jsxs("strong",{children:[p.toFixed(2)," · ",A,"×"]})]}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:a("pc.estimatedMargin")}),e.jsxs("strong",{children:["$",re]})]}),e.jsxs("div",{className:"pc-confirm-actions",children:[e.jsx("button",{className:"pc-btn-ghost",onClick:()=>r(null),disabled:S,children:a("pc.cancel")}),e.jsx("button",{className:"pc-btn-primary",onClick:Ee,disabled:S,children:S?a("pc.placing"):a("pc.confirm")})]})]})}),le&&e.jsxs("div",{className:"pc-toast",children:["✓ ",le]}),D&&e.jsx(_e,{initialMode:D,onClose:()=>k(null)}),R&&e.jsx(et,{onClose:()=>O(!1)})]})}export{nt as default};
