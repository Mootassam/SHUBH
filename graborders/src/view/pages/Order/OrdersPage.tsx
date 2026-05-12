import React, { useState } from 'react';

const OrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('positions');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tp, setTp] = useState(0);
  const [sl, setSl] = useState(0);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Dummy trade data
  const trade = {
    instrument: 'XAUUSD',
    openPrice: 4606.33,
    currentPrice: 4606.45,
    exitPrice: 4607.01,
    profit: 60,
    orderId: '#273',
    datetime: '2025-01-15 14:30',
    buyType: 'Buy',
    lots: 5,
    margin: 23031.65,
    handlingFee: 0.05,
    riskRate: '4342.011833%',
  };

  return (
    <>
      <div className="orders-page">
        {/* ── Header (blue gradient, like Market/Futures) ── */}
        <div className="orders-header">
          <div className="header-top-row">
        
            <div className="header-title">
              <div className="app-title">Orders Page</div>
            </div>
          
          </div>
        </div>

        {/* ── White content card ── */}
        <div className="content-card">
          {/* Tabs */}
          <div className="tabs-container">
            <div
              className={`tab ${activeTab === 'positions' ? 'active' : ''}`}
              onClick={() => setActiveTab('positions')}
            >
              Position holding
            </div>
            <div
              className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending Orders
            </div>
            <div
              className={`tab ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              History
            </div>
          </div>

          {/* Portfolio Summary Card */}
          <div className="portfolio-card">
            <div className="portfolio-title">Profit and Loss</div>
            <div className="portfolio-profit">340</div>
            <div className="portfolio-details">
              <div className="detail-row">
                <span className="detail-label">Balance</span>
                <span className="detail-value">976945.31</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Current Margin</span>
                <span className="detail-value">23031.65</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Risk Rate</span>
                <span className="detail-value">4342.011833%</span>
              </div>
            </div>
          </div>

          {/* Open Trade Card */}
          <div className="trade-card" onClick={handleOpenModal}>
            <div className="trade-top">
              <div className="trade-instrument">{trade.instrument}</div>
              <div className="trade-badges">
                <span className="badge buy">{trade.buyType}</span>
                <span className="badge lots">{trade.lots} Lots</span>
              </div>
            </div>
            <div className="trade-price-row">
              <span className="price-open">{trade.openPrice}</span>
              <span className="price-arrow">→</span>
              <span className="price-current">{trade.currentPrice}</span>
            </div>
            <div className="trade-bottom">
              <div className="trade-meta">
                <span>{trade.orderId}</span>
                <span>{trade.datetime}</span>
              </div>
              <div className="trade-profit">{trade.profit}</div>
            </div>
          </div>

          {/* Bottom Navigation (inside the card, no fixed) */}
          <div className="bottom-nav">
            <div className="nav-item">
              <i className="fas fa-chart-line" />
              <span>Market</span>
            </div>
            <div className="nav-item active">
              <i className="fas fa-list-ul" />
              <span>Orders</span>
            </div>
            <div className="nav-item center-btn">
              <div className="swap-btn">
                <i className="fas fa-sync-alt" />
              </div>
            </div>
            <div className="nav-item">
              <i className="far fa-newspaper" />
              <span>News</span>
            </div>
            <div className="nav-item">
              <i className="far fa-user" />
              <span>Mine</span>
            </div>
          </div>
        </div>

        {/* ── Bottom Sheet Modal (standard fixed overlay) ── */}
        {isModalOpen && (
          <>
            <div className="modal-overlay" onClick={handleCloseModal} />
            <div className="modal-sheet">
              <div className="modal-handle" />
              <button className="modal-close" onClick={handleCloseModal}>
                <i className="fas fa-times" />
              </button>

              <div className="modal-header-title">Order Details</div>

              <div className="modal-trade-info">
                <div className="trade-top">
                  <span className="trade-instrument">{trade.instrument}</span>
                  <div className="trade-badges">
                    <span className="badge buy">{trade.buyType}</span>
                    <span className="badge lots">{trade.lots} Lots</span>
                  </div>
                </div>

                <div className="trade-price-row modal-price">
                  <span className="price-open">{trade.openPrice}</span>
                  <span className="price-arrow">→</span>
                  <span className="price-exit">{trade.exitPrice}</span>
                </div>

                <div className="modal-profit">{trade.profit}</div>

                <div className="modal-details">
                  <div className="detail-row">
                    <span className="detail-label">Margin</span>
                    <span className="detail-value">{trade.margin}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Handling Fee</span>
                    <span className="detail-value">{trade.handlingFee}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Orders ID</span>
                    <span className="detail-value">{trade.orderId}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Timestamp</span>
                    <span className="detail-value">{trade.datetime}</span>
                  </div>
                </div>
              </div>

              {/* TP/SL control panel */}
              <div className="tpsl-panel">
                <div className="tpsl-row">
                  <span className="tpsl-label">Take Profit</span>
                  <div className="stepper">
                    <button onClick={() => setTp(prev => Math.max(0, prev - 1))}>−</button>
                    <span>{tp}</span>
                    <button onClick={() => setTp(prev => prev + 1)}>+</button>
                  </div>
                  <button className="set-tpsl-btn">Set TP/SL</button>
                </div>
                <div className="tpsl-row">
                  <span className="tpsl-label">Set Loss</span>
                  <div className="stepper">
                    <button onClick={() => setSl(prev => Math.max(0, prev - 1))}>−</button>
                    <span>{sl}</span>
                    <button onClick={() => setSl(prev => prev + 1)}>+</button>
                  </div>
                  <button className="set-tpsl-btn">Set TP/SL</button>
                </div>
              </div>

              <button className="close-position-btn">Close position</button>
            </div>
          </>
        )}
      </div>

      {/* ── Styles ── */}
      <style>{`
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
      `}</style>
    </>
  );
};

export default OrdersPage;