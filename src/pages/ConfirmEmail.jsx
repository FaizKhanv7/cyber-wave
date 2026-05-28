import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Terminal, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import MatrixBackground from '../components/MatrixBackground';
import Navbar from '../components/Navbar';

export default function ConfirmEmail() {
  const { user, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const email = location.state?.email || '';
  const password = location.state?.password || '';

  useEffect(() => {
    if (!loading && user) navigate('/dashboard');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!loading && !email) navigate('/auth');
  }, [email, loading, navigate]);

  async function handleVerify(e) {
    e.preventDefault();
    if (otp.length !== 6) { setError('Enter a 6-digit code'); return; }
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-signup-otp`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ email, otp }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Verification failed');
      } else {
        setSuccess('Account verified! Signing you in...');
        const { error: signInError } = await signIn({ email, password });
        if (signInError) {
          navigate('/auth');
        } else {
          navigate('/dashboard');
        }
      }
    } catch {
      setError('Network error. Please try again.');
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }

        .otp-fade-1 { animation: fadeUp 0.6s ease both; }
        .otp-fade-2 { animation: fadeUp 0.6s ease 0.1s both; }
        .otp-float  { animation: float 3s ease-in-out infinite; }

        .otp-card {
          background: rgba(16,185,129,0.01);
          border: 1px solid rgba(107,114,128,0.15);
          border-radius: 8px;
          padding: 48px;
          position: relative;
          overflow: hidden;
        }
        .otp-card::after {
          content: '';
          position: absolute;
          top: -50%;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent);
          animation: scanline 5s ease-in-out infinite;
        }

        .otp-input {
          width: 100%;
          background: rgba(16,185,129,0.04);
          border: 1px solid rgba(16,185,129,0.15);
          border-radius: 6px;
          padding: 16px;
          color: #10b981;
          font-family: 'JetBrains Mono', monospace;
          font-size: 32px;
          font-weight: 800;
          letter-spacing: 12px;
          text-align: center;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .otp-input:focus {
          border-color: rgba(16,185,129,0.5);
          box-shadow: 0 0 16px rgba(16,185,129,0.08);
        }
        .otp-input::placeholder { color: rgba(16,185,129,0.2); letter-spacing: 8px; }

        .btn-verify {
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
        .btn-verify:hover:not(:disabled) {
          background: #34d399;
          box-shadow: 0 0 36px rgba(16,185,129,0.5);
          transform: translateY(-2px);
        }
        .btn-verify:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      <MatrixBackground />
      <Navbar />

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
        <div style={{ width: '100%', maxWidth: 480 }}>

          <div className="otp-fade-1" style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 4, background: 'rgba(16,185,129,0.05)', color: '#6ee7b7', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 24 }}>
              <Terminal size={13} />
              System: Email_Verification_v1.0
            </div>

            <div className="otp-float" style={{ width: 64, height: 64, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <ShieldCheck size={32} style={{ color: '#10b981' }} />
            </div>

            <h1 style={{ fontWeight: 800, fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: 1.1, marginBottom: 12, color: '#f0fdf4' }}>
              Verify_{' '}
              <span style={{ background: 'linear-gradient(100deg, #6ee7b7 0%, #10b981 50%, #047857 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Account
              </span>
            </h1>

            <p style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.8 }}>
              A 6-digit code was sent to{' '}
              <span style={{ color: '#10b981' }}>{email}</span>
            </p>
          </div>

          <div className="otp-card otp-fade-2">
            {error && (
              <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 6, padding: '12px 16px', marginBottom: 24, color: '#fca5a5', fontSize: 13 }}>
                {error}
              </div>
            )}
            {success && (
              <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 6, padding: '12px 16px', marginBottom: 24, color: '#6ee7b7', fontSize: 13 }}>
                {success}
              </div>
            )}

            <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#10b981', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12 }}>
                  Verification Code
                </label>
                <input
                  className="otp-input"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="000000"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  autoFocus
                />
              </div>

              <button className="btn-verify" type="submit" disabled={submitting || otp.length !== 6}>
                <ShieldCheck size={14} />
                {submitting ? 'Verifying...' : 'Confirm_Node'}
              </button>
            </form>

            <div style={{ marginTop: 24, textAlign: 'center', color: '#6b7280', fontSize: 12 }}>
              Wrong email?{' '}
              <button
                onClick={() => navigate('/auth')}
                style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer', fontSize: 12, fontFamily: "'JetBrains Mono', monospace", textDecoration: 'underline', textUnderlineOffset: 3 }}
              >
                Back_to_signup
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
