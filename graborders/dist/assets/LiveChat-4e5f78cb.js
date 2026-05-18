import{u as i,aF as c,i as p,aG as l,j as e,L as x,o as t}from"./index-0260459c.js";import{L as g}from"./LoadingModal-95c37d1c.js";import{u as h}from"./useDispatch-381907c5.js";function u(){const o=h(),n=i(c.selectRows),s=i(c.selectLoading);return p.useEffect(()=>{o(l.doFetch())},[o]),e.jsxs("div",{className:"customer-service-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(x,{to:"/profile",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:t("pages.online.title")})]})}),e.jsxs("div",{className:"content-card",children:[e.jsx("div",{className:"service-description",children:e.jsxs("div",{className:"description-content",children:[e.jsx("i",{className:"fa-solid fa-comments description-icon"}),e.jsx("p",{className:"description-text",children:t("pages.online.description")})]})}),e.jsxs("div",{className:"support-agents-list",children:[s&&e.jsx(g,{}),!s&&n&&n.map((a,d)=>{var r;return e.jsxs("div",{className:"agent-card",children:[e.jsxs("div",{className:"agent-header",children:[e.jsx("h3",{className:"agent-name",children:a==null?void 0:a.name}),e.jsx("div",{className:`platform-badge ${a.type}`,children:a.type==="whatsApp"?e.jsx("i",{className:"fa-brands fa-whatsapp"}):e.jsx("i",{className:"fa-brands fa-telegram"})})]}),e.jsxs("div",{className:"agent-photo-container",children:[e.jsx("img",{src:(r=a==null?void 0:a.photo[0])==null?void 0:r.downloadUrl,alt:a==null?void 0:a.name,className:"agent-photo"}),e.jsx("div",{className:"status-dot online"})]}),e.jsx("div",{className:"agent-actions",children:a.type==="whatsApp"?e.jsxs("a",{href:`https://wa.me/${a.number}`,className:"contact-button",target:"_blank",rel:"noopener noreferrer",children:[e.jsx("i",{className:"fa-brands fa-whatsapp"}),e.jsx("span",{children:t("pages.online.contactWhatsApp")})]}):e.jsxs("a",{href:`https://t.me/${a.number}`,className:"contact-button",target:"_blank",rel:"noopener noreferrer",children:[e.jsx("i",{className:"fa-brands fa-telegram"}),e.jsx("span",{children:t("pages.online.contactTelegram")})]})})]},d)})]})]}),e.jsx("style",{children:`
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

        /* Customer Service Container – matches Proof template */
        .customer-service-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        /* Header */
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

        /* Content Card */
        .content-card {
          flex: 1;
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 25px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        /* Service Description */
        .service-description {
          background: #f0f7ff;
          border: 1px solid #e6f0ff;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
        }

        .description-content {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .description-icon {
          font-size: 20px;
          color: #106cf5;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .description-text {
          font-size: 14px;
          color: #555;
          line-height: 1.5;
          margin: 0;
        }

        /* Agents List */
        .support-agents-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Agent Card */
        .agent-card {
          background: #f8f9fa;
          border: 1px solid #e7eaee;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s ease;
        }
        .agent-card:hover {
          border-color: #106cf5;
          box-shadow: 0 0 0 2px rgba(16, 108, 245, 0.1);
        }

        /* Agent Header */
        .agent-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .agent-name {
          font-size: 16px;
          font-weight: 600;
          color: #222;
          margin: 0;
        }

        .platform-badge {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }
        .platform-badge.whatsApp {
          background-color: rgba(37, 211, 102, 0.15);
          color: #25D366;
        }
        .platform-badge.telegram {
          background-color: rgba(0, 136, 204, 0.15);
          color: #0088cc;
        }

        /* Agent Photo */
        .agent-photo-container {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto 16px;
        }

        .agent-photo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #e7eaee;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        }

        .status-dot {
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid white;
          background-color: #999;
        }
        .status-dot.online {
          background-color: #25D366;
        }

        /* Contact Button */
        .agent-actions {
          display: flex;
          flex-direction: column;
        }
        .contact-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 12px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .contact-button:hover {
          background: #0a4fc4;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 108, 245, 0.3);
        }
        .contact-button:active {
          transform: translateY(0);
        }

        /* Loading Modal (override if necessary) */
        .loading-modal {
          background: rgba(255, 255, 255, 0.9);
          color: #106cf5;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .header {
            padding: 16px;
            min-height: 50px;
          }
          .content-card {
            padding: 20px 16px 80px;
            border-radius: 30px 30px 0 0;
          }
          .agent-card {
            padding: 16px;
          }
          .agent-photo-container {
            width: 70px;
            height: 70px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
            padding: 30px 25px 100px;
          }
        }
      `})]})}export{u as default};
