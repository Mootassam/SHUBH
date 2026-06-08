import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Tawk.to live chat
const TAWK_SRC = 'https://embed.tawk.to/6873ad755eab331912c52098/1j01tr50b';

declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: any;
  }
}

function LiveChat() {
  const history = useHistory();

  useEffect(() => {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Auto-open the chat as soon as it's ready (no click needed)
    window.Tawk_API.onLoad = function () {
      try {
        window.Tawk_API.showWidget && window.Tawk_API.showWidget();
        window.Tawk_API.maximize && window.Tawk_API.maximize();
      } catch {}
    };

    const boot = () => {
      try {
        window.Tawk_API.showWidget && window.Tawk_API.showWidget();
        window.Tawk_API.maximize && window.Tawk_API.maximize();
      } catch {}
    };

    let s = document.getElementById('tawk-js') as HTMLScriptElement | null;
    if (!s) {
      s = document.createElement('script');
      s.id = 'tawk-js';
      s.async = true;
      s.setAttribute('charset', 'UTF-8');
      s.setAttribute('crossorigin', '*');
      s.src = TAWK_SRC;
      s.onload = boot;
      document.head.appendChild(s);
    } else {
      boot();
    }

    // When leaving the page, hide the floating widget so it doesn't linger
    return () => {
      try {
        window.Tawk_API.minimize && window.Tawk_API.minimize();
        window.Tawk_API.hideWidget && window.Tawk_API.hideWidget();
      } catch {}
    };
  }, []);

  const handleBack = () => {
    try {
      window.Tawk_API.minimize && window.Tawk_API.minimize();
      window.Tawk_API.hideWidget && window.Tawk_API.hideWidget();
    } catch {}
    history.goBack();
  };

  return (
    <div className="livechat-container">
      <div className="livechat-header">
        <div className="livechat-back" onClick={handleBack}>
          <i className="fas fa-arrow-left" />
          <span>Back</span>
        </div>
        <div className="livechat-title">Live Support</div>
        <div className="livechat-spacer" />
      </div>

      <div className="livechat-body">
        <div className="livechat-loading">
          <i className="fas fa-comments" />
          <p>Connecting you to support…</p>
        </div>
      </div>

      <style>{`
        .livechat-container {
          max-width: 400px; margin: 0 auto; min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex; flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .livechat-header {
          min-height: 60px; padding: 16px 20px; display: flex; align-items: center;
          justify-content: space-between; color: #fff;
        }
        .livechat-back { display: flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 500; cursor: pointer; opacity: .9; }
        .livechat-back:hover { opacity: 1; }
        .livechat-title { font-size: 17px; font-weight: 600; }
        .livechat-spacer { width: 48px; }
        .livechat-body {
          flex: 1; background: #fff; border-radius: 40px 40px 0 0;
          display: flex; align-items: center; justify-content: center; padding: 40px 20px;
        }
        .livechat-loading { text-align: center; color: #8a93a2; }
        .livechat-loading i { font-size: 44px; color: #106cf5; margin-bottom: 14px; }
        .livechat-loading p { font-size: 15px; }
      `}</style>
    </div>
  );
}

export default LiveChat;
