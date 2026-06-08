import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import { i18n } from '../../../i18n';

interface Props {
  initialMode?: 'login' | 'register';
  onClose: () => void;
}

/**
 * Desktop login / register modal.
 * Mirrors the inputs + functions of the mobile Signin.tsx and Signup.tsx:
 *   • Login:    email, password, rememberMe, "Login to Demo Account"
 *   • Register: email, phone, graphical captcha, password, confirm password
 * Uses the exact same auth actions (doSigninWithEmailAndPassword,
 * doRegisterEmailAndPassword, doDemoLogin, doClearErrorMessage).
 */
export default function PcAuthModal({ initialMode = 'login', onClose }: Props) {
  const dispatch = useDispatch();
  const loading  = useSelector(authSelectors.selectLoading);
  const errorMsg = useSelector(authSelectors.selectErrorMessage);

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // ── Sign-in fields ───────────────────────────────────────────────────────
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [rememberMe, setRemember] = useState(true);

  // ── Sign-up extra fields ──────────────────────────────────────────────────
  const [phone, setPhone]               = useState('');
  const [confirmPassword, setConfirm]   = useState('');
  const [captcha, setCaptcha]           = useState('');
  const [captchaText, setCaptchaText]   = useState('');
  const [localError, setLocalError]     = useState<string | null>(null);

  const refreshCaptcha = useCallback(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let c = '';
    for (let i = 0; i < 6; i++) c += chars.charAt(Math.floor(Math.random() * chars.length));
    setCaptchaText(c);
    setCaptcha('');
  }, []);

  useEffect(() => {
    dispatch(authActions.doClearErrorMessage());
    refreshCaptcha();
  }, [dispatch, refreshCaptcha]);

  const switchMode = (m: 'login' | 'register') => {
    setMode(m);
    setLocalError(null);
    dispatch(authActions.doClearErrorMessage());
    if (m === 'register') refreshCaptcha();
  };

  // ── Submit handlers (same actions as mobile) ──────────────────────────────
  const submitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!email || !password) { setLocalError(i18n('pc.emailPwRequired')); return; }
    dispatch(authActions.doSigninWithEmailAndPassword(email, password, rememberMe));
  };

  const submitRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!email || !password || !phone) { setLocalError(i18n('pc.fillRequired')); return; }
    if (password.length < 8) { setLocalError(i18n('pc.pwMin')); return; }
    if (password !== confirmPassword) { setLocalError(i18n('pc.pwMismatch')); return; }
    if (captcha !== captchaText) { setLocalError(i18n('pc.captchaMismatch')); refreshCaptcha(); return; }
    dispatch(authActions.doRegisterEmailAndPassword(email, password, phone));
  };

  const onDemoLogin = () => dispatch(authActions.doDemoLogin());

  const shownError = localError || errorMsg;

  return (
    <div className="pc-modal-overlay" onClick={onClose}>
      <div className="pc-auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="pc-modal-x" onClick={onClose}>✕</button>

        <div className="pc-auth-tabs">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => switchMode('login')}>{i18n('pc.login')}</button>
          <button className={mode === 'register' ? 'active' : ''} onClick={() => switchMode('register')}>{i18n('pc.register')}</button>
        </div>

        {shownError && <div className="pc-auth-error">{shownError}</div>}

        {mode === 'login' ? (
          <form className="pc-auth-form" onSubmit={submitLogin}>
            <label>{i18n('pc.email')}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" autoFocus />

            <label>{i18n('pc.password')}</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" />

            <div className="pc-auth-remember">
              <label><input type="checkbox" checked={rememberMe} onChange={(e) => setRemember(e.target.checked)} /> {i18n('pc.rememberMe')}</label>
            </div>

            <button type="submit" className="pc-auth-submit" disabled={loading}>
              {loading ? <><i className="fas fa-spinner fa-spin" /> {i18n('pc.signingIn')}</> : i18n('pc.login')}
            </button>

            <button type="button" className="pc-auth-demo" onClick={onDemoLogin} disabled={loading}>
              {loading ? <><i className="fas fa-spinner fa-spin" /> {i18n('pc.loading')}</> : i18n('pc.demoLogin')}
            </button>
          </form>
        ) : (
          <form className="pc-auth-form" onSubmit={submitRegister}>
            <label>{i18n('pc.email')}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" autoFocus />

            <label>{i18n('pc.phone')}</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={i18n('pc.phone')} autoComplete="tel" />

            <label>{i18n('pc.captcha')}</label>
            <div className="pc-captcha-wrap">
              <div className="pc-captcha-display" onClick={refreshCaptcha} title="↻">
                <span className="pc-captcha-text">{captchaText}</span>
                <span className="pc-captcha-refresh"><i className="fas fa-sync-alt" /></span>
              </div>
              <input type="text" value={captcha} onChange={(e) => setCaptcha(e.target.value)} placeholder={i18n('pc.enterCaptcha')} />
            </div>

            <label>{i18n('pc.password')}</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={i18n('pc.passwordHint')} autoComplete="new-password" />

            <label>{i18n('pc.confirmPassword')}</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirm(e.target.value)} placeholder={i18n('pc.reenterPassword')} autoComplete="new-password" />

            <button type="submit" className="pc-auth-submit" disabled={loading}>
              {loading ? <><i className="fas fa-spinner fa-spin" /> {i18n('pc.creatingAccount')}</> : i18n('pc.createAccount')}
            </button>
          </form>
        )}

        <div className="pc-auth-switch">
          {mode === 'login' ? (
            <span>{i18n('pc.noAccount')} <a onClick={() => switchMode('register')}>{i18n('pc.register')}</a></span>
          ) : (
            <span>{i18n('pc.haveAccount')} <a onClick={() => switchMode('login')}>{i18n('pc.login')}</a></span>
          )}
        </div>
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
}
