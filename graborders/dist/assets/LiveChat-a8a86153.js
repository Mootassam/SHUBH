import{u as l,i as t,j as e}from"./index-37ba7ef6.js";const d="3e065cd1-6048-4863-8088-85b45b7bac7e";function h(){const n=l(),[c,s]=t.useState("loading");t.useEffect(()=>{window.$crisp=window.$crisp||[],window.CRISP_WEBSITE_ID=d;const i=()=>{window.$crisp.push(["do","chat:show"]),window.$crisp.push(["do","chat:open"]),s("open"),window.$crisp.push(["on","chat:closed",()=>s("closed")]),window.$crisp.push(["on","chat:opened",()=>s("open")])};if(document.getElementById("crisp-js"))i();else{const a=document.createElement("script");a.id="crisp-js",a.src="https://client.crisp.chat/l.js",a.async=!0,a.onload=i,document.head.appendChild(a)}return()=>{try{window.$crisp.push(["off","chat:closed"]),window.$crisp.push(["off","chat:opened"]),window.$crisp.push(["do","chat:close"]),window.$crisp.push(["do","chat:hide"])}catch{}}},[]);const o=()=>{try{window.$crisp.push(["off","chat:closed"]),window.$crisp.push(["off","chat:opened"]),window.$crisp.push(["do","chat:close"]),window.$crisp.push(["do","chat:hide"])}catch{}n.goBack()},r=()=>{try{window.$crisp.push(["do","chat:show"]),window.$crisp.push(["do","chat:open"])}catch{}};return e.jsxs("div",{className:"lc-page",children:[e.jsxs("div",{className:"lc-header",children:[e.jsx("button",{className:"lc-back",onClick:o,"aria-label":"Go back",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("span",{className:"lc-title",children:"Online Customer Service"}),e.jsx("div",{className:"lc-status-dot","data-state":c})]}),e.jsxs("div",{className:"lc-body",children:[c==="loading"&&e.jsxs("div",{className:"lc-state",children:[e.jsx("div",{className:"lc-spinner"}),e.jsx("p",{className:"lc-hint",children:"Connecting to customer service…"})]}),c==="open"&&e.jsxs("div",{className:"lc-state",children:[e.jsx("div",{className:"lc-chat-icon",children:e.jsx("i",{className:"fas fa-comments"})}),e.jsx("p",{className:"lc-hint",children:"Live chat is open"}),e.jsx("p",{className:"lc-sub",children:"Our team is ready to help you 24/7"})]}),c==="closed"&&e.jsxs("div",{className:"lc-state",children:[e.jsx("div",{className:"lc-chat-icon done",children:e.jsx("i",{className:"fas fa-check-circle"})}),e.jsx("p",{className:"lc-hint",children:"Thank you for contacting us!"}),e.jsx("p",{className:"lc-sub",children:"We hope we could help. Feel free to reach out anytime."}),e.jsxs("button",{className:"lc-reopen-btn",onClick:r,children:[e.jsx("i",{className:"fas fa-comments"}),"Reopen Chat"]})]})]}),e.jsx("style",{children:`
        * { margin: 0; padding: 0; box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }

        .lc-page {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex;
          flex-direction: column;
        }

        /* ── Header ── */
        .lc-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 20px 16px;
          position: sticky;
          top: 0;
          z-index: 9999;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        .lc-back {
          background: rgba(255,255,255,0.15);
          border: none;
          border-radius: 50%;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .lc-back:hover { background: rgba(255,255,255,0.25); }
        .lc-back:active { background: rgba(255,255,255,0.1); }

        .lc-title {
          flex: 1;
          color: white;
          font-size: 17px;
          font-weight: 600;
          text-align: center;
          margin-right: 38px; /* balance the back button */
        }

        .lc-status-dot {
          display: none; /* positioned in title area for balance */
        }

        /* ── Body ── */
        .lc-body {
          flex: 1;
          background: white;
          border-radius: 40px 40px 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          min-height: calc(100vh - 74px);
        }

        /* ── State block ── */
        .lc-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          text-align: center;
          max-width: 280px;
        }

        /* Loading spinner */
        .lc-spinner {
          width: 52px;
          height: 52px;
          border: 4px solid #e0eaff;
          border-top-color: #106cf5;
          border-radius: 50%;
          animation: lc-spin 0.9s linear infinite;
        }
        @keyframes lc-spin { to { transform: rotate(360deg); } }

        /* Chat icon circle */
        .lc-chat-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, #106cf5, #0a4fc4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 30px;
          box-shadow: 0 8px 24px rgba(16,108,245,0.30);
          animation: lc-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .lc-chat-icon.done {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          box-shadow: 0 8px 24px rgba(34,197,94,0.30);
        }
        @keyframes lc-pop {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }

        .lc-hint {
          font-size: 17px;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1.3;
        }

        .lc-sub {
          font-size: 13px;
          color: #888;
          line-height: 1.5;
        }

        /* Reopen button */
        .lc-reopen-btn {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 12px;
          padding: 14px 28px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          box-shadow: 0 4px 16px rgba(16,108,245,0.30);
        }
        .lc-reopen-btn:hover  { opacity: 0.9; transform: translateY(-1px); }
        .lc-reopen-btn:active { opacity: 1;   transform: translateY(0); }

        @media (max-width: 380px) {
          .lc-header { padding: 16px 16px 12px; }
          .lc-body   { padding: 32px 20px; border-radius: 32px 32px 0 0; }
        }
      `})]})}export{h as default};
