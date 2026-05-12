import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import actions from "src/modules/category/list/categoryListActions";
import selector from "src/modules/category/list/categoryListSelectors";
import LoadingModal from "src/shared/LoadingModal";
import { i18n } from "../../../i18n";

function Online() {
  const dispatch = useDispatch();

  const record = useSelector(selector.selectRows);
  const loading = useSelector(selector.selectLoading);

  useEffect(() => {
    dispatch(actions.doFetch());
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <div className="customer-service-container">
      {/* Header */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/profile" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">{i18n('pages.online.title')}</div>
        </div>
      </div>

      {/* Content Card */}
      <div className="content-card">
        {/* Service Description */}
        <div className="service-description">
          <div className="description-content">
            <i className="fa-solid fa-comments description-icon"></i>
            <p className="description-text">
              {i18n('pages.online.description')}
            </p>
          </div>
        </div>

        {/* Support Agents List */}
        <div className="support-agents-list">
          {loading && <LoadingModal />}
          {!loading && record && record.map((item, index) => (
            <div className="agent-card" key={index}>
              <div className="agent-header">
                <h3 className="agent-name">{item?.name}</h3>
                <div className={`platform-badge ${item.type}`}>
                  {item.type === "whatsApp" ? (
                    <i className="fa-brands fa-whatsapp"></i>
                  ) : (
                    <i className="fa-brands fa-telegram"></i>
                  )}
                </div>
              </div>

              <div className="agent-photo-container">
                <img
                  src={item?.photo[0]?.downloadUrl}
                  alt={item?.name}
                  className="agent-photo"
                />
                <div className="status-dot online"></div>
              </div>

              <div className="agent-actions">
                {item.type === "whatsApp" ? (
                  <a
                    href={`https://wa.me/${item.number}`}
                    className="contact-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                    <span>{i18n('pages.online.contactWhatsApp')}</span>
                  </a>
                ) : (
                  <a
                    href={`https://t.me/${item.number}`}
                    className="contact-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-telegram"></i>
                    <span>{i18n('pages.online.contactTelegram')}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
}

export default Online;