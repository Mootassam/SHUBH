import{W as Y,n as o,Z as m,a0 as k,o as j,p as R,t as v,i as l,w as H,j as e,L as x,x as L,aq as E}from"./index-83c73f4f.js";import{u as V,y as O,F as W}from"./FormErrors-5aa6e219.js";import{y as z}from"./yupFormSchemas-b42b78d3.js";import{I as C}from"./InputFormItem-2bcd27f6.js";import{u as X}from"./useDispatch-027e97b5.js";const S=({visible:a,title:d,onClose:c,children:f})=>a?e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease;
        }
        .modal-container {
          background-color: #ffffff;
          border-radius: 16px;
          width: 90%;
          max-width: 400px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          animation: slideIn 0.3s ease;
        }
        .modal-header {
          padding: 16px 20px;
          border-bottom: 1px solid #e7eaee;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .modal-header h3 {
          margin: 0;
          color: #222;
          font-size: 18px;
          font-weight: 600;
        }
        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #999;
          transition: color 0.2s;
        }
        .modal-close:hover {
          color: #106cf5;
        }
        .modal-body {
          padding: 20px;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}),e.jsx("div",{className:"modal-overlay",onClick:c,children:e.jsxs("div",{className:"modal-container",onClick:h=>h.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h3",{children:d}),e.jsx("button",{className:"modal-close",onClick:c,children:"×"})]}),e.jsx("div",{className:"modal-body",children:f})]})})]}):null,Z=Y().shape({amount:z.integer(o("entities.transaction.fields.amount"),{required:!0,min:50}),withdrawPassword:z.string(o("user.fields.withdrawPassword"),{required:!0}),withdrawalMethod:m().required(o("pages.withdraw.validation.selectMethod")),currency:m().default("USD"),withdrawAddress:m(),network:m(),fee:k().default(0),totalAmount:k().default(0),orderNo:m()});function U(){var N,y;const a=j(R.selectCurrentUser),d=X(),c=j(v.selectRows),f=j(v.selectLoading),[h,g]=l.useState(!1),[M,b]=l.useState(!1),A=l.useCallback(async()=>{await d(H.doRefreshCurrentUser())},[d]);l.useEffect(()=>{let t=!0;return(async()=>{if(t)try{await d(L.doFetch(null,"USD"))}catch(i){t&&console.error(o("pages.wallet.errors.fetchAssets"),i)}})(),()=>{t=!1}},[d]);const u=l.useMemo(()=>c.find(t=>t.symbol==="USDT"),[c]),D=(u==null?void 0:u.amount)||0,p=l.useCallback(()=>{var t,n,i,r;return a?((t=a.accountHolder)==null?void 0:t.trim())&&((n=a.ibanNumber)==null?void 0:n.trim())&&((i=a.bankName)==null?void 0:i.trim())&&((r=a.ifscCode)==null?void 0:r.trim()):!1},[a]),w=l.useCallback(()=>{var t,n,i,r;return a?((t=a.trc20)==null?void 0:t.trim())&&((n=a.walletname)==null?void 0:n.trim())&&((i=a.usernamewallet)==null?void 0:i.trim())&&((r=a.preferredcoin)==null?void 0:r.trim()):!1},[a]),F=l.useCallback(()=>{const t=[];return a!=null&&a.accountHolder||t.push(o("entities.transaction.fields.accountHolder")),a!=null&&a.ibanNumber||t.push(o("entities.transaction.fields.ibanNumber")),a!=null&&a.bankName||t.push(o("entities.transaction.fields.bankName")),a!=null&&a.ifscCode||t.push(o("entities.transaction.fields.ifscCode")),t},[a]),$=l.useCallback(()=>{const t=[];return a!=null&&a.trc20||t.push(o("user.fields.trc20")),a!=null&&a.walletname||t.push(o("pages.wallet.walletName")),a!=null&&a.usernamewallet||t.push(o("pages.wallet.username")),a!=null&&a.preferredcoin||t.push(o("pages.wallet.choosePreferredCoin")),t},[a]),T=async({amount:t,withdrawPassword:n,withdrawalMethod:i})=>{if(i==="bank"&&!p()){g(!0);return}if(i==="crypto"&&!w()){b(!0);return}i==="crypto"?a!=null&&a.trc20:i==="bank"&&`${a==null?void 0:a.bankName}${a==null?void 0:a.accountHolder}${a==null?void 0:a.ibanNumber}`;const r=new Date,q=`${r.getFullYear()}${String(r.getMonth()+1).padStart(2,"0")}${String(r.getDate()).padStart(2,"0")}`,I=Math.floor(Math.random()*1e7).toString().padStart(7,"0"),P=`RE${q}${I}`,B={currency:"USDT",date:new Date,totalAmount:Number(t),orderNo:P,status:"pending",withdrawPassword:n,withdrawAmount:Number(t),withdrawType:i};await d(E.doCreate(B)),await A()},s=V({resolver:O.yupResolver(Z),mode:"onSubmit",defaultValues:{amount:"",withdrawalMethod:"",currency:"USDT",withdrawAddress:"",network:"",fee:0,totalAmount:0,orderNo:""}});return e.jsxs("div",{className:"withdraw-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(x,{to:"/profile",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:o("pages.withdraw.title")})]})}),e.jsx("div",{className:"content-card",children:e.jsx(W,{...s,children:e.jsxs("form",{onSubmit:s.handleSubmit(T),children:[e.jsx("input",{type:"hidden",...s.register("currency")}),e.jsx("input",{type:"hidden",...s.register("withdrawAddress")}),e.jsx("input",{type:"hidden",...s.register("network")}),e.jsx("input",{type:"hidden",...s.register("fee")}),e.jsx("input",{type:"hidden",...s.register("totalAmount")}),e.jsx("input",{type:"hidden",...s.register("orderNo")}),e.jsxs("div",{className:"balance-info",children:[e.jsx("i",{className:"fas fa-wallet"}),o("pages.withdraw.availableBalance")," :"," ",f?e.jsx("span",{className:"balance-placeholder",children:"--"}):`${D.toFixed(2)} USD`]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"input-label",children:[e.jsx("span",{className:"required-star",children:"*"}),o("pages.withdraw.withdrawAmount")]}),e.jsx(C,{type:"number",name:"amount",placeholder:o("pages.withdraw.amountPlaceholder"),className:"withdraw-input"})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"input-label",children:[e.jsx("span",{className:"required-star",children:"*"}),o("pages.withdraw.selectMethod")]}),e.jsx("div",{className:"method-selection",children:e.jsxs("div",{className:`method-card ${s.watch("withdrawalMethod")==="bank"?"selected":""}`,onClick:()=>s.setValue("withdrawalMethod","bank",{shouldValidate:!0}),children:[e.jsx("i",{className:"fas fa-university method-icon"}),e.jsx("div",{className:"method-label",children:o("pages.withdraw.methods.bank")}),e.jsx("div",{className:`method-status ${p()?"complete":"incomplete"}`,children:p()?o("pages.withdraw.status.complete"):o("pages.withdraw.status.incomplete")}),e.jsx("div",{className:"method-network-hint",children:o("pages.withdraw.methods.bankNetworks")})]})}),e.jsx("input",{type:"hidden",...s.register("withdrawalMethod")}),s.formState.errors.withdrawalMethod&&e.jsxs("div",{className:"error-message",children:[e.jsx("i",{className:"fas fa-exclamation-circle"}),s.formState.errors.withdrawalMethod.message]})]}),s.watch("withdrawalMethod")==="crypto"&&w()&&e.jsxs("div",{className:"preview-box",children:[e.jsx("i",{className:"fab fa-bitcoin"}),e.jsx("strong",{children:o("pages.withdraw.withdrawingTo")}),e.jsx("br",{}),e.jsxs("span",{className:"preview-detail",children:[(N=a==null?void 0:a.preferredcoin)==null?void 0:N.toUpperCase(),": ",(y=a==null?void 0:a.trc20)==null?void 0:y.substring(0,12),"..."]})]}),s.watch("withdrawalMethod")==="bank"&&p()&&e.jsxs("div",{className:"preview-box",children:[e.jsx("i",{className:"fas fa-university"}),e.jsx("strong",{children:o("pages.withdraw.withdrawingTo")}),e.jsx("br",{}),e.jsxs("span",{className:"preview-detail",children:[a==null?void 0:a.bankName," - ",a==null?void 0:a.accountHolder]})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"input-label",children:[e.jsx("span",{className:"required-star",children:"*"}),o("pages.withdraw.withdrawPassword")]}),e.jsx(C,{type:"password",name:"withdrawPassword",placeholder:o("pages.withdraw.withdrawPasswordPlaceholder"),className:"withdraw-input"})]}),e.jsxs("div",{className:"announcement-container",children:[e.jsx("i",{className:"fas fa-volume-high speaker"}),e.jsx("div",{className:"announcement-text",children:o("pages.withdraw.announcement")})]}),e.jsxs("button",{className:"withdraw-button",type:"submit",children:[e.jsx("i",{className:"fas fa-check"}),o("pages.withdraw.confirm")]}),(a==null?void 0:a.accountType)!=="demo"&&(!p()||!w())&&e.jsxs("div",{className:"tip-box",children:[e.jsx("i",{className:"fas fa-info-circle"}),e.jsxs("span",{children:[o("pages.withdraw.completeDetailsIn")," ",e.jsx(x,{to:"/bind-account",className:"tip-link",children:o("pages.bindAccount.title")}),o("pages.withdraw.enableAllOptions")]})]})]})})}),e.jsx(S,{visible:h,title:o("pages.withdraw.bankModal.title"),onClose:()=>g(!1),children:e.jsxs("div",{className:"modal-content-centered",children:[e.jsx("i",{className:"fas fa-exclamation-circle modal-warning-icon"}),e.jsx("h3",{className:"modal-subtitle",children:o("pages.withdraw.bankModal.required")}),e.jsx("p",{className:"modal-description",children:o("pages.withdraw.bankModal.description")}),e.jsx("ul",{className:"missing-fields-list",children:F().map((t,n)=>e.jsxs("li",{children:[e.jsx("i",{className:"fas fa-times"})," ",t]},n))}),e.jsxs("div",{className:"modal-actions",children:[e.jsx("button",{className:"modal-cancel-btn",onClick:()=>g(!1),children:o("common.cancel")}),(a==null?void 0:a.accountType)!=="demo"&&e.jsx(x,{to:"/bind-account",className:"modal-action-link",children:e.jsx("button",{className:"modal-action-btn",children:o("pages.withdraw.goToBindAccount")})})]})]})}),e.jsx(S,{visible:M,title:o("pages.withdraw.cryptoModal.title"),onClose:()=>b(!1),children:e.jsxs("div",{className:"modal-content-centered",children:[e.jsx("i",{className:"fas fa-exclamation-circle modal-warning-icon"}),e.jsx("h3",{className:"modal-subtitle",children:o("pages.withdraw.cryptoModal.required")}),e.jsx("p",{className:"modal-description",children:o("pages.withdraw.cryptoModal.description")}),e.jsx("ul",{className:"missing-fields-list",children:$().map((t,n)=>e.jsxs("li",{children:[e.jsx("i",{className:"fas fa-times"})," ",t]},n))}),e.jsxs("div",{className:"modal-actions",children:[e.jsx("button",{className:"modal-cancel-btn",onClick:()=>b(!1),children:o("common.cancel")}),(a==null?void 0:a.accountType)!=="demo"&&e.jsx(x,{to:"/bind-account",className:"modal-action-link",children:e.jsx("button",{className:"modal-action-btn",children:o("pages.withdraw.goToBindAccount")})})]})]})}),e.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        body {
          background-color: #f5f7fa;
          color: #333;
        }

        .withdraw-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        .header {
          min-height: 60px;
          padding: 20px;
          position: relative;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          color: white;
          font-size: 20px;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }
        .back-arrow:hover {
          opacity: 0.8;
        }

        .page-title {
          color: white;
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .content-card {
          flex: 1;
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 25px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .input-label {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 14px;
          font-weight: 500;
          color: #666;
          margin-bottom: 6px;
        }

        .required-star {
          color: #f44336;
          font-size: 16px;
          margin-right: 2px;
        }

        .withdraw-input {
          background-color: #fff;
          border: 1px solid #e7eaee;
          border-radius: 8px;
          padding: 12px 16px;
          color: #333;
          font-size: 14px;
          width: 100%;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .withdraw-input:focus {
          border-color: #106cf5;
          box-shadow: 0 0 0 2px rgba(16, 108, 245, 0.1);
        }
        .withdraw-input::placeholder {
          color: #aaa;
        }

        .balance-info {
          background: #f0f7ff;
          border: 1px solid #e6f0ff;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
          font-size: 16px;
          font-weight: 500;
          color: #222;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .balance-info i {
          color: #106cf5;
          font-size: 18px;
        }
        .balance-placeholder {
          opacity: 0.5;
        }

        .method-selection {
          display: flex;
          gap: 12px;
          margin: 8px 0 12px;
        }

        .method-card {
          flex: 1;
          background: #f8f9fa;
          border: 1px solid #e7eaee;
          border-radius: 12px;
          padding: 16px 8px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .method-card.selected {
          border-color: #106cf5;
          background-color: #e6f0ff;
          box-shadow: 0 0 0 2px rgba(16, 108, 245, 0.1);
          transform: translateY(-2px);
        }
        .method-card:hover {
          border-color: #106cf5;
          background-color: #f5f8ff;
        }

        .method-icon {
          font-size: 28px;
          color: #106cf5;
          margin-bottom: 8px;
        }

        .method-label {
          font-weight: 600;
          color: #222;
          margin-bottom: 6px;
          font-size: 14px;
        }

        .method-status {
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 20px;
          display: inline-block;
          margin-bottom: 6px;
        }
        .method-status.complete {
          color: #106cf5;
          background-color: rgba(16, 108, 245, 0.1);
        }
        .method-status.incomplete {
          color: #ff7a00;
          background-color: rgba(255, 122, 0, 0.1);
        }

        .method-network-hint {
          font-size: 11px;
          color: #999;
        }

        .preview-box {
          background: #f8f9fa;
          border: 1px solid #106cf5;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 20px;
          font-size: 13px;
          color: #333;
        }
        .preview-box i {
          color: #106cf5;
          margin-right: 8px;
        }
        .preview-detail {
          color: #666;
          font-size: 12px;
        }

        .error-message {
          color: #f44336;
          font-size: 12px;
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .announcement-container {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin: 20px 0;
          padding: 16px;
          background: #fef3e9;
          border: 1px solid #ffd8b5;
          border-radius: 12px;
          color: #ff7a00;
        }
        .speaker {
          font-size: 18px;
          color: #ff7a00;
          margin-top: 2px;
        }
        .announcement-text {
          font-size: 13px;
          color: #cc6600;
          line-height: 1.5;
        }

        .withdraw-button {
          background-color: #106cf5;
          color: white;
          border: none;
          height: 48px;
          width: 100%;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
        }
        .withdraw-button:hover {
          background-color: #0a4fc4;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 108, 245, 0.3);
        }
        .withdraw-button:active {
          transform: translateY(0);
        }
        .withdraw-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .tip-box {
          margin-top: 20px;
          padding: 12px 16px;
          background: #f0f7ff;
          border: 1px solid #e6f0ff;
          border-radius: 8px;
          font-size: 13px;
          color: #555;
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        .tip-box i {
          color: #106cf5;
          font-size: 16px;
          margin-top: 2px;
        }
        .tip-link {
          color: #106cf5;
          text-decoration: none;
          font-weight: 500;
        }
        .tip-link:hover {
          text-decoration: underline;
        }

        /* Modal content inside CustomModal (unchanged structure, just visual) */
        .modal-content-centered {
          text-align: center;
          color: #333;
        }
        .modal-warning-icon {
          font-size: 48px;
          color: #ff7a00;
          margin-bottom: 16px;
        }
        .modal-subtitle {
          color: #222;
          margin-bottom: 12px;
          font-size: 18px;
        }
        .modal-description {
          color: #666;
          margin-bottom: 20px;
          font-size: 14px;
        }
        .missing-fields-list {
          text-align: left;
          margin-bottom: 24px;
          list-style: none;
          padding: 0;
        }
        .missing-fields-list li {
          margin-bottom: 8px;
          padding: 8px 12px;
          background-color: #f8f9fa;
          border-radius: 6px;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #333;
          border: 1px solid #e7eaee;
        }
        .missing-fields-list i {
          color: #f44336;
          font-size: 14px;
        }
        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        .modal-cancel-btn {
          flex: 1;
          background: #f8f9fa;
          border: 1px solid #e7eaee;
          color: #666;
          padding: 10px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .modal-cancel-btn:hover {
          border-color: #106cf5;
          color: #106cf5;
        }
        .modal-action-link {
          flex: 1;
          text-decoration: none;
        }
        .modal-action-btn {
          width: 100%;
          background-color: #106cf5;
          border: none;
          color: white;
          padding: 10px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .modal-action-btn:hover {
          background-color: #0a4fc4;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.2);
        }

        @media (max-width: 380px) {
          .header {
            padding: 16px;
            min-height: 50px;
          }
          .content-card {
            padding: 20px 16px 80px;
            border-radius: 30px 30px 0 0;
          }
          .method-card {
            padding: 12px 4px;
          }
          .method-icon {
            font-size: 24px;
          }
          .method-label {
            font-size: 13px;
          }
        }
      `})]})}export{U as default};
