import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import MatrixBackground from '../components/MatrixBackground';
import Navbar from '../components/Navbar';

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user, loading, signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate('/dashboard');
  }, [user, loading, navigate]);

  function switchMode(next) {
    setMode(next);
    setError('');
    setSuccess('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    if (mode === 'signup') {
      if (!username.trim()) { setError('Username is required'); setSubmitting(false); return; }
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-signup-otp`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({ email, password, username: username.trim() }),
          }
        );
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Failed to send verification code');
        } else {
          navigate('/confirm-email', { state: { email, password } });
        }
      } catch {
        setError('Network error. Please try again.');
      }
    } else if (mode === 'forgot') {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (resetError) {
        setError(resetError.message);
      } else {
        setSuccess('Reset link sent — check your inbox.');
      }
      setSubmitting(false);
      return;
    } else {
      const { error } = await signIn({ email, password });
      if (error) {
        setError(error.message);
      } else {
        navigate('/dashboard');
      }
    }
    setSubmitting(false);
  }

  return (
    <div style={{ background: '#020804', color: '#f0fdf4', minHeight: '100vh', fontFamily: "'JetBrains Mono', monospace", overflowX: 'hidden', position: 'relative' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; } 50% { opacity: 0; }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }

        .auth-fade-1 { animation: fadeUp 0.6s ease both; }
        .auth-fade-2 { animation: fadeUp 0.6s ease 0.1s both; }
        .auth-fade-3 { animation: fadeUp 0.6s ease 0.2s both; }

        .cursor-blink { animation: blink 1s step-end infinite; display: inline-block; width: 2px; height: 14px; background: #10b981; margin-left: 3px; vertical-align: middle; }

        .auth-card {
          background: rgba(16,185,129,0.01);
          border: 1px solid rgba(107,114,128,0.15);
          border-radius: 8px;
          padding: 48px;
          position: relative;
          overflow: hidden;
        }
        .auth-card::after {
          content: '';
          position: absolute;
          top: -50%;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent);
          animation: scanline 5s ease-in-out infinite;
        }

        .auth-input {
          width: 100%;
          background: rgba(16,185,129,0.04);
          border: 1px solid rgba(16,185,129,0.15);
          border-radius: 6px;
          padding: 12px 16px;
          color: #f0fdf4;
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .auth-input:focus {
          border-color: rgba(16,185,129,0.5);
          box-shadow: 0 0 16px rgba(16,185,129,0.08);
        }
        .auth-input::placeholder { color: rgba(107,114,128,0.7); }

        .btn-submit {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 32px;
          background: #10b981;
          color: #020804;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 800;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          box-shadow: 0 0 24px rgba(16,185,129,0.25);
          transition: all 0.3s ease;
        }
        .btn-submit:hover:not(:disabled) {
          background: #34d399;
          box-shadow: 0 0 36px rgba(16,185,129,0.5);
          transform: translateY(-2px);
        }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .mode-toggle {
          background: none;
          border: none;
          color: #10b981;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          cursor: pointer;
          padding: 0;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s ease;
        }
        .mode-toggle:hover { color: #6ee7b7; }
      `}</style>

      <MatrixBackground />
      <Navbar />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 520, margin: '0 auto', padding: '140px 24px 96px' }}>

        {/* Header */}
        <div className="auth-fade-1" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 4, background: 'rgba(16,185,129,0.05)', color: '#6ee7b7', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 24 }}>
            <Terminal size={13} />
            System: Authentication_v1.0
            <span className="cursor-blink" />
          </div>

          <h1 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: 'clamp(36px, 6vw, 60px)', lineHeight: 1.0, marginBottom: 16, color: '#f0fdf4' }}>
            {mode === 'login' ? 'Access_' : mode === 'signup' ? 'Initialize_' : 'Recover_'}
            <br />
            <span style={{ background: 'linear-gradient(100deg, #6ee7b7 0%, #10b981 50%, #047857 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {mode === 'login' ? 'Network' : mode === 'signup' ? 'Account' : 'Access'}
            </span>
          </h1>

          <p style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.8 }}>
            {mode === 'login' ? 'Enter credentials to access your node.' : mode === 'signup' ? 'Register your node on the WaveHack network.' : 'Enter your email to receive a password reset link.'}
          </p>
        </div>

        {/* Card */}
        <div className="auth-card auth-fade-2">
          {success && (
            <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 6, padding: '12px 16px', marginBottom: 24, color: '#6ee7b7', fontSize: 13, lineHeight: 1.6 }}>
              {success}
            </div>
          )}
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 6, padding: '12px 16px', marginBottom: 24, color: '#fca5a5', fontSize: 13, lineHeight: 1.6 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {mode === 'signup' && (
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#10b981', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>Username</label>
                <input
                  className="auth-input"
                  type="text"
                  placeholder="your_handle"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#10b981', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>Email</label>
              <input
                className="auth-input"
                type="email"
                placeholder="node@network.io"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            {mode !== 'forgot' && (
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#10b981', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>Password</label>
                <input
                  className="auth-input"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
                {mode === 'login' && (
                  <div style={{ textAlign: 'right', marginTop: 8 }}>
                    <button type="button" className="mode-toggle" style={{ fontSize: 12 }} onClick={() => switchMode('forgot')}>
                      Forgot password?
                    </button>
                  </div>
                )}
              </div>
            )}

            <button className="btn-submit" type="submit" disabled={submitting}>
              <Lock size={14} />
              {submitting ? 'Processing...' : mode === 'login' ? 'Authenticate_' : mode === 'signup' ? 'Create_Node' : 'Send_Reset_Link'}
            </button>
          </form>

          <div style={{ marginTop: 28, textAlign: 'center', color: '#6b7280', fontSize: 13 }}>
            {mode === 'login' ? (
              <>No account yet?{' '}
                <button className="mode-toggle" onClick={() => switchMode('signup')}>Initialize_one</button>
              </>
            ) : mode === 'forgot' ? (
              <>Remembered it?{' '}
                <button className="mode-toggle" onClick={() => switchMode('login')}>Back_to_login</button>
              </>
            ) : (
              <>Already registered?{' '}
                <button className="mode-toggle" onClick={() => switchMode('login')}>Access_Network</button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
