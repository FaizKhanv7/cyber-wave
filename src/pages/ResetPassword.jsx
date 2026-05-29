import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Terminal } from 'lucide-react';
import { supabase } from '../lib/supabase';
import MatrixBackground from '../components/MatrixBackground';
import Navbar from '../components/Navbar';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setError('');
    setSubmitting(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess('Password updated! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1500);
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
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }

        .rp-fade-1 { animation: fadeUp 0.6s ease both; }
        .rp-fade-2 { animation: fadeUp 0.6s ease 0.1s both; }

        .rp-card {
          background: rgba(16,185,129,0.01);
          border: 1px solid rgba(107,114,128,0.15);
          border-radius: 8px;
          padding: 48px;
          position: relative;
          overflow: hidden;
        }
        .rp-card::after {
          content: '';
          position: absolute;
          top: -50%;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent);
          animation: scanline 5s ease-in-out infinite;
        }

        .rp-input {
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
        .rp-input:focus {
          border-color: rgba(16,185,129,0.5);
          box-shadow: 0 0 16px rgba(16,185,129,0.08);
        }
        .rp-input::placeholder { color: rgba(107,114,128,0.7); }

        .rp-btn {
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
        .rp-btn:hover:not(:disabled) {
          background: #34d399;
          box-shadow: 0 0 36px rgba(16,185,129,0.5);
          transform: translateY(-2px);
        }
        .rp-btn:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      <MatrixBackground />
      <Navbar />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 520, margin: '0 auto', padding: '140px 24px 96px' }}>

        <div className="rp-fade-1" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 4, background: 'rgba(16,185,129,0.05)', color: '#6ee7b7', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 24 }}>
            <Terminal size={13} />
            System: Password_Reset_v1.0
          </div>

          <h1 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: 'clamp(36px, 6vw, 60px)', lineHeight: 1.0, marginBottom: 16, color: '#f0fdf4' }}>
            Set_New_
            <br />
            <span style={{ background: 'linear-gradient(100deg, #6ee7b7 0%, #10b981 50%, #047857 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Password
            </span>
          </h1>

          <p style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.8 }}>
            Choose a new password for your account.
          </p>
        </div>

        <div className="rp-card rp-fade-2">
          {!ready && (
            <div style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.25)', borderRadius: 6, padding: '12px 16px', marginBottom: 24, color: '#fde68a', fontSize: 13, lineHeight: 1.6 }}>
              Waiting for reset link verification... Make sure you opened this page from the link in your email.
            </div>
          )}
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 6, padding: '12px 16px', marginBottom: 24, color: '#fca5a5', fontSize: 13, lineHeight: 1.6 }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 6, padding: '12px 16px', marginBottom: 24, color: '#6ee7b7', fontSize: 13, lineHeight: 1.6 }}>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#10b981', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>New Password</label>
              <input
                className="rp-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                disabled={!ready}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#10b981', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>Confirm Password</label>
              <input
                className="rp-input"
                type="password"
                placeholder="••••••••"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
                disabled={!ready}
              />
            </div>

            <button className="rp-btn" type="submit" disabled={submitting || !ready}>
              <Lock size={14} />
              {submitting ? 'Updating...' : 'Update_Password'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
