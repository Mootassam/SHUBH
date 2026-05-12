import{i,j as e}from"./index-2f39cf90.js";const f=()=>{const[t,r]=i.useState("positions"),[c,n]=i.useState(!1),[p,l]=i.useState(0),[x,o]=i.useState(0),m=()=>n(!0),d=()=>n(!1),a={instrument:"XAUUSD",openPrice:4606.33,currentPrice:4606.45,exitPrice:4607.01,profit:60,orderId:"#273",datetime:"2025-01-15 14:30",buyType:"Buy",lots:5,margin:23031.65,handlingFee:.05,riskRate:"4342.011833%"};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"orders-page",children:[e.jsx("div",{className:"orders-header",children:e.jsx("div",{className:"header-top-row",children:e.jsx("div",{className:"header-title",children:e.jsx("div",{className:"app-title",children:"Orders Page"})})})}),e.jsxs("div",{className:"content-card",children:[e.jsxs("div",{className:"tabs-container",children:[e.jsx("div",{className:`tab ${t==="positions"?"active":""}`,onClick:()=>r("positions"),children:"Position holding"}),e.jsx("div",{className:`tab ${t==="pending"?"active":""}`,onClick:()=>r("pending"),children:"Pending Orders"}),e.jsx("div",{className:`tab ${t==="history"?"active":""}`,onClick:()=>r("history"),children:"History"})]}),e.jsxs("div",{className:"portfolio-card",children:[e.jsx("div",{className:"portfolio-title",children:"Profit and Loss"}),e.jsx("div",{className:"portfolio-profit",children:"340"}),e.jsxs("div",{className:"portfolio-details",children:[e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:"Balance"}),e.jsx("span",{className:"detail-value",children:"976945.31"})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:"Current Margin"}),e.jsx("span",{className:"detail-value",children:"23031.65"})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:"Risk Rate"}),e.jsx("span",{className:"detail-value",children:"4342.011833%"})]})]})]}),e.jsxs("div",{className:"trade-card",onClick:m,children:[e.jsxs("div",{className:"trade-top",children:[e.jsx("div",{className:"trade-instrument",children:a.instrument}),e.jsxs("div",{className:"trade-badges",children:[e.jsx("span",{className:"badge buy",children:a.buyType}),e.jsxs("span",{className:"badge lots",children:[a.lots," Lots"]})]})]}),e.jsxs("div",{className:"trade-price-row",children:[e.jsx("span",{className:"price-open",children:a.openPrice}),e.jsx("span",{className:"price-arrow",children:"→"}),e.jsx("span",{className:"price-current",children:a.currentPrice})]}),e.jsxs("div",{className:"trade-bottom",children:[e.jsxs("div",{className:"trade-meta",children:[e.jsx("span",{children:a.orderId}),e.jsx("span",{children:a.datetime})]}),e.jsx("div",{className:"trade-profit",children:a.profit})]})]}),e.jsxs("div",{className:"bottom-nav",children:[e.jsxs("div",{className:"nav-item",children:[e.jsx("i",{className:"fas fa-chart-line"}),e.jsx("span",{children:"Market"})]}),e.jsxs("div",{className:"nav-item active",children:[e.jsx("i",{className:"fas fa-list-ul"}),e.jsx("span",{children:"Orders"})]}),e.jsx("div",{className:"nav-item center-btn",children:e.jsx("div",{className:"swap-btn",children:e.jsx("i",{className:"fas fa-sync-alt"})})}),e.jsxs("div",{className:"nav-item",children:[e.jsx("i",{className:"far fa-newspaper"}),e.jsx("span",{children:"News"})]}),e.jsxs("div",{className:"nav-item",children:[e.jsx("i",{className:"far fa-user"}),e.jsx("span",{children:"Mine"})]})]})]}),c&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"modal-overlay",onClick:d}),e.jsxs("div",{className:"modal-sheet",children:[e.jsx("div",{className:"modal-handle"}),e.jsx("button",{className:"modal-close",onClick:d,children:e.jsx("i",{className:"fas fa-times"})}),e.jsx("div",{className:"modal-header-title",children:"Order Details"}),e.jsxs("div",{className:"modal-trade-info",children:[e.jsxs("div",{className:"trade-top",children:[e.jsx("span",{className:"trade-instrument",children:a.instrument}),e.jsxs("div",{className:"trade-badges",children:[e.jsx("span",{className:"badge buy",children:a.buyType}),e.jsxs("span",{className:"badge lots",children:[a.lots," Lots"]})]})]}),e.jsxs("div",{className:"trade-price-row modal-price",children:[e.jsx("span",{className:"price-open",children:a.openPrice}),e.jsx("span",{className:"price-arrow",children:"→"}),e.jsx("span",{className:"price-exit",children:a.exitPrice})]}),e.jsx("div",{className:"modal-profit",children:a.profit}),e.jsxs("div",{className:"modal-details",children:[e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:"Margin"}),e.jsx("span",{className:"detail-value",children:a.margin})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:"Handling Fee"}),e.jsx("span",{className:"detail-value",children:a.handlingFee})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:"Orders ID"}),e.jsx("span",{className:"detail-value",children:a.orderId})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:"Timestamp"}),e.jsx("span",{className:"detail-value",children:a.datetime})]})]})]}),e.jsxs("div",{className:"tpsl-panel",children:[e.jsxs("div",{className:"tpsl-row",children:[e.jsx("span",{className:"tpsl-label",children:"Take Profit"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{onClick:()=>l(s=>Math.max(0,s-1)),children:"−"}),e.jsx("span",{children:p}),e.jsx("button",{onClick:()=>l(s=>s+1),children:"+"})]}),e.jsx("button",{className:"set-tpsl-btn",children:"Set TP/SL"})]}),e.jsxs("div",{className:"tpsl-row",children:[e.jsx("span",{className:"tpsl-label",children:"Set Loss"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{onClick:()=>o(s=>Math.max(0,s-1)),children:"−"}),e.jsx("span",{children:x}),e.jsx("button",{onClick:()=>o(s=>s+1),children:"+"})]}),e.jsx("button",{className:"set-tpsl-btn",children:"Set TP/SL"})]})]}),e.jsx("button",{className:"close-position-btn",children:"Close position"})]})]})]}),e.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .orders-page {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex;
          flex-direction: column;
        }

        /* Header – same as Market/Futures */
        .orders-header {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          min-height: 60px;
          padding: 16px 20px;
          color: white;
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          align-items: center;
        }

        .header-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .header-left-icons, .header-right-icons {
          display: flex;
          gap: 16px;
          font-size: 18px;
          opacity: 0.9;
        }

        .header-title {
          text-align: center;
          flex: 1;
        }

        .app-title {
          font-weight: 600;
          font-size: 17px;
        }

        .app-subtitle {
          font-size: 11px;
          color: rgba(255,255,255,0.7);
          margin-top: 2px;
        }

        .header-left-icons i, .header-right-icons i {
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .header-left-icons i:hover, .header-right-icons i:hover {
          opacity: 1;
        }

        /* White content card */
        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 20px 20px 30px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Tabs */
        .tabs-container {
          display: flex;
          gap: 8px;
          margin-bottom: 4px;
        }

        .tab {
          flex: 1;
          text-align: center;
          padding: 10px 0;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          background: #f0f2f5;
          color: #555;
          transition: all 0.2s;
        }

        .tab.active {
          background: #106cf5;
          color: white;
          font-weight: 600;
        }

        /* Portfolio card */
        .portfolio-card {
          background: #f8f9fb;
          border: 1px solid #edeef1;
          border-radius: 12px;
          padding: 20px;
        }

        .portfolio-title {
          text-align: center;
          font-size: 13px;
          color: #777;
          margin-bottom: 8px;
        }

        .portfolio-profit {
          text-align: center;
          font-size: 48px;
          font-weight: 700;
          color: #106cf5;
          margin-bottom: 16px;
        }

        .portfolio-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
        }

        .detail-label {
          color: #777;
        }

        .detail-value {
          font-weight: 500;
          color: #1a1a1a;
        }

        /* Trade card */
        .trade-card {
          background: #f8f9fb;
          border: 1px solid #edeef1;
          border-radius: 12px;
          padding: 16px;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
        }

        .trade-card:hover {
          background: #f0f2f5;
          transform: translateY(-1px);
        }

        .trade-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .trade-instrument {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .trade-badges {
          display: flex;
          gap: 6px;
        }

        .badge {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
        }

        .badge.buy {
          background: rgba(16,108,245,0.1);
          color: #106cf5;
        }

        .badge.lots {
          background: white;
          border: 1px solid #ccc;
          color: #1a1a1a;
        }

        .trade-price-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          font-weight: 500;
        }

        .price-open { color: #1a1a1a; }
        .price-arrow { color: #999; font-size: 14px; }
        .price-current { color: #106cf5; font-weight: 600; }

        .trade-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .trade-meta {
          font-size: 12px;
          color: #999;
          display: flex;
          gap: 16px;
        }

        .trade-profit {
          font-size: 28px;
          font-weight: 700;
          color: #106cf5;
        }

        /* Bottom Navigation (inside white card) */
        .bottom-nav {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: auto;
          padding: 12px 0 8px;
          border-top: 1px solid #edeef1;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #999;
          font-size: 10px;
          gap: 4px;
          cursor: pointer;
        }

        .nav-item.active {
          color: #106cf5;
        }

        .nav-item i {
          font-size: 18px;
        }

        .center-btn .swap-btn {
          background: #106cf5;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-top: -20px;
          box-shadow: 0 4px 10px rgba(16,108,245,0.4);
        }

        .swap-btn i {
          font-size: 20px;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 200;
          animation: fadeIn 0.2s ease;
        }

        .modal-sheet {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 400px;
          background: white;
          border-radius: 20px 20px 0 0;
          padding: 24px 20px 40px;
          z-index: 201;
          animation: slideUp 0.3s ease;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-handle {
          width: 40px;
          height: 4px;
          background: #ddd;
          border-radius: 2px;
          margin: 0 auto 16px;
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          font-size: 20px;
          color: #999;
          cursor: pointer;
        }

        .modal-close:hover {
          color: #106cf5;
        }

        .modal-header-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #1a1a1a;
        }

        .modal-price .price-exit {
          color: #106cf5;
          font-weight: 600;
        }

        .modal-profit {
          font-size: 32px;
          font-weight: 700;
          color: #106cf5;
          text-align: right;
          margin: 10px 0 16px;
        }

        .modal-details .detail-row {
          margin-bottom: 8px;
          font-size: 13px;
        }

        /* TP/SL panel */
        .tpsl-panel {
          background: #f8f9fb;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .tpsl-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .tpsl-label {
          font-size: 13px;
          font-weight: 500;
          color: #1a1a1a;
          width: 80px;
          flex-shrink: 0;
        }

        .stepper {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          justify-content: center;
        }

        .stepper button {
          width: 28px;
          height: 28px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 6px;
          font-size: 16px;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333;
        }

        .stepper span {
          min-width: 30px;
          text-align: center;
          font-weight: 600;
          color: #1a1a1a;
        }

        .set-tpsl-btn {
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 20px;
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }

        .close-position-btn {
          width: 100%;
          padding: 16px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }

        /* Animations */
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translate(-50%, 100%); } to { transform: translate(-50%, 0); } }
      `})]})};export{f as default};
