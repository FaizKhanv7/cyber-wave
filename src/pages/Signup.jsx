import { useState } from 'react';
import { Terminal, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import MatrixBackground from '../components/MatrixBackground';
import Navbar from '../components/Navbar';

export default function Signup() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState('');
  const [dietary, setDietary] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [referralNote, setReferralNote] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!fullName.trim()) { setError('Full name is required'); return; }
    setError('');
    setSubmitting(true);

    try {
      // Store registration in Supabase
      const { error: insertError } = await supabase
        .from('event_registrations')
        .insert({
          full_name: fullName.trim(),
          dietary_restrictions: dietary.trim() || 'None',
          referral_code_used: referralCode.trim().toUpperCase() || null,
          user_id: user?.id || null,
        });

      if (insertError) throw new Error(insertError.message);

      // Process referral code if provided
      if (referralCode.trim()) {
        const { error: rpcError } = await supabase.rpc('award_referral_points', {
          p_code: referralCode.trim().toUpperCase(),
        });

        if (rpcError) {
          // Non-blocking: registration succeeded, referral code had an issue
          setReferralNote(rpcError.message || 'Referral code could not be applied.');
        } else {
          setReferralNote(
            user
              ? 'Referral code applied — +10 points added to your account!'
              : 'Referral code applied — points awarded to the referrer.'
          );
        }
      }

      localStorage.setItem('wavehack26_registered', 'true');
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    }
    setSubmitting(false);
  }

  if (success) {
    return (
      <div style={{ background: '#020804', color: '#f0fdf4', minHeight: '100vh', fontFamily: "'JetBrains Mono', monospace", overflowX: 'hidden', position: 'relative' }}>
        <MatrixBackground />
        <Navbar />
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
          <div style={{ textAlign: 'center', maxWidth: 480 }}>
            <div style={{ width: 64, height: 64, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
              <UserCheck size={32} style={{ color: '#10b981' }} />
            </div>
            <h1 style={{ fontWeight: 800, fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.1, marginBottom: 16, color: '#f0fdf4' }}>
              You're{' '}
              <span style={{ background: 'linear-gradient(100deg, #6ee7b7 0%, #10b981 50%, #047857 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                In!
              </span>
            </h1>
            <p style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.8, marginBottom: 16 }}>
              We've got you registered, see you at WaveHack GameJam!
            </p>
            <p style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.8, marginBottom: referralNote ? 20 : 0 }}>
              To stay in touch, join the{' '}
              <a
                href="https://groupme.com/join_group/113593335/tHhxoCgi"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#10b981', textDecoration: 'underline', textUnderlineOffset: 3 }}
              >
                GroupMe
              </a>
              .
            </p>
            {referralNote && (
              <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 6, padding: '12px 16px', marginTop: 20, color: '#6ee7b7', fontSize: 12 }}>
                {referralNote}
              </div>
            )}
          </div>
        </div>
      </div>
    );
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

        .su-fade-1 { animation: fadeUp 0.6s ease both; }
        .su-fade-2 { animation: fadeUp 0.6s ease 0.1s both; }

        .cursor-blink { animation: blink 1s step-end infinite; display: inline-block; width: 2px; height: 14px; background: #10b981; margin-left: 3px; vertical-align: middle; }

        .su-card {
          background: rgba(16,185,129,0.01);
          border: 1px solid rgba(107,114,128,0.15);
          border-radius: 8px;
          padding: 48px;
          position: relative;
          overflow: hidden;
        }
        .su-card::after {
          content: '';
          position: absolute;
          top: -50%;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent);
          animation: scanline 5s ease-in-out infinite;
        }

        .su-input {
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
          resize: vertical;
        }
        .su-input:focus {
          border-color: rgba(16,185,129,0.5);
          box-shadow: 0 0 16px rgba(16,185,129,0.08);
        }
        .su-input::placeholder { color: rgba(107,114,128,0.7); }

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
      `}</style>

      <MatrixBackground />
      <Navbar />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 560, margin: '0 auto', padding: '140px 24px 96px' }}>

        {/* Header */}
        <div className="su-fade-1" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 4, background: 'rgba(16,185,129,0.05)', color: '#6ee7b7', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 24 }}>
            <Terminal size={13} />
            Event Registration
            <span className="cursor-blink" />
          </div>

          <h1 style={{ fontWeight: 800, fontSize: 'clamp(36px, 6vw, 60px)', lineHeight: 1.0, marginBottom: 16, color: '#f0fdf4' }}>
            WaveHack
            <br />
            <span style={{ background: 'linear-gradient(100deg, #6ee7b7 0%, #10b981 50%, #047857 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              GameJam
            </span>
          </h1>

          <p style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.8 }}>
            {!user && (
              <span style={{ display: 'block', marginTop: 6, color: 'rgba(110,231,183,0.6)', fontSize: 12 }}>
                Have a WaveHack account?{' '}
                <a href="/auth" style={{ color: '#10b981', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                  Sign in
                </a>{' '}
                to earn +10 bonus points with a referral code.
              </span>
            )}
          </p>
        </div>

        {/* Form */}
        <div className="su-card su-fade-2">
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 6, padding: '12px 16px', marginBottom: 24, color: '#fca5a5', fontSize: 13 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#10b981', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>
                Full Name <span style={{ color: '#f87171' }}>*</span>
              </label>
              <input
                className="su-input"
                type="text"
                placeholder="Faiz Khan"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#10b981', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>
                Dietary Restrictions
              </label>
              <input
                className="su-input"
                type="text"
                placeholder="None / Vegetarian / Vegan / Gluten-free / etc."
                value={dietary}
                onChange={e => setDietary(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#10b981', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>
                Referral Code{' '}
                <span style={{ color: '#4b5563', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
              </label>
              <p style={{ color: '#4b5563', fontSize: 11, marginBottom: 8 }}>
                Rewards the person who referred you
                {user ? ' and adds +10 points to your account.' : '.'}
              </p>
              <input
                className="su-input"
                type="text"
                placeholder="XXXXXXXX"
                value={referralCode}
                onChange={e => setReferralCode(e.target.value.toUpperCase())}
                autoComplete="off"
                style={{ letterSpacing: 4 }}
              />
            </div>

            <button className="btn-submit" type="submit" disabled={submitting}>
              <UserCheck size={14} />
              {submitting ? 'Registering...' : 'Register_Now'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
