import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import MatrixBackground from '../components/MatrixBackground';
import Navbar from '../components/Navbar';

export default function ConfirmEmail() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  // Get email from state if passed, otherwise show generic message
  useEffect(() => {
    const state = window.history.state;
    if (state?.email) {
      setEmail(state.email);
    }
  }, []);

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

        .confirm-fade-1 { animation: fadeUp 0.6s ease both; }
        .confirm-fade-2 { animation: fadeUp 0.6s ease 0.1s both; }
        .confirm-fade-3 { animation: fadeUp 0.6s ease 0.2s both; }
        .confirm-float { animation: float 3s ease-in-out infinite; }

        .confirm-card {
          background: rgba(16,185,129,0.03);
          border: 1px solid rgba(16,185,129,0.2);
          border-radius: 8px;
          padding: 40px;
          max-width: 500px;
          width: 90%;
        }

        .confirm-button {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #020804;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          font-family: "'JetBrains Mono', monospace";
          font-size: 14px;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
        }

        .confirm-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(16,185,129,0.3);
        }

        .icon-container {
          width: 60px;
          height: 60px;
          background: rgba(16,185,129,0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }
      `}</style>

      <MatrixBackground />
      <Navbar />

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
        <div className="confirm-card">
          <div className="confirm-fade-1">
            <div className="icon-container confirm-float">
              <Mail size={32} style={{ color: '#10b981' }} />
            </div>
          </div>

          <h1 className="confirm-fade-2" style={{ fontSize: 24, fontWeight: 700, textAlign: 'center', marginBottom: 16 }}>
            Confirm Your Email
          </h1>

          <p className="confirm-fade-3" style={{ textAlign: 'center', color: '#a3e635', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
            {email ? (
              <>
                We sent a confirmation link to <strong>{email}</strong>. Click the link in your email to verify your account.
              </>
            ) : (
              <>
                We sent a confirmation link to your email address. Click the link in your email to verify your account.
              </>
            )}
          </p>

          <p style={{ textAlign: 'center', color: '#6b7280', fontSize: 12, marginBottom: 20 }}>
            Once confirmed, you can log in with your credentials.
          </p>

          <div style={{ textAlign: 'center' }}>
            <button
              className="confirm-button"
              onClick={() => navigate('/auth')}
            >
              <span>Back to Login</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <p style={{ textAlign: 'center', color: '#4b5563', fontSize: 12, marginTop: 20 }}>
            Didn't receive an email? Check your spam folder or try signing up again.
          </p>
        </div>
      </div>
    </div>
  );
}
