import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Copy, Check, Zap, Users, LogOut, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import MatrixBackground from '../components/MatrixBackground';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [referralCount, setReferralCount] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    fetchReferralCount();
  }, [user]);

  async function fetchReferralCount() {
    const { count } = await supabase
      .from('referrals')
      .select('*', { count: 'exact', head: true })
      .eq('referrer_id', user.id);
    setReferralCount(count || 0);
  }

  function copyCode() {
    if (!profile?.referral_code) return;
    navigator.clipboard.writeText(profile.referral_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleLogout() {
    await signOut();
    navigate('/');
  }

  async function handleDeleteAccount() {
    setDeleting(true);
    setDeleteError('');
    const { error } = await supabase.functions.invoke('delete-account');
    if (error) {
      setDeleteError(error.message || 'Failed to delete account. Please try again.');
      setDeleting(false);
      setShowDeleteConfirm(false);
    } else {
      await signOut();
      navigate('/');
    }
  }

  if (loading || !profile) {
    return (
      <div style={{ background: '#020804', color: '#f0fdf4', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", position: 'relative' }}>
        <MatrixBackground />
        <Navbar />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <p style={{ color: '#10b981', fontSize: 14, marginBottom: 12 }}>Connecting_to_network...</p>
          <p style={{ color: '#6b7280', fontSize: 12, marginBottom: 16 }}>
            {loading ? 'Loading profile...' : 'Profile not found. Please try refreshing.'}
          </p>
          {!loading && !profile && (
            <button
              onClick={() => window.location.reload()}
              style={{ padding: '8px 16px', background: '#10b981', color: '#020804', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600 }}
            >
              Retry
            </button>
          )}
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
        @keyframes countUp {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }

        .dash-fade-1 { animation: fadeUp 0.6s ease both; }
        .dash-fade-2 { animation: fadeUp 0.6s ease 0.1s both; }
        .dash-fade-3 { animation: fadeUp 0.6s ease 0.2s both; }
        .dash-fade-4 { animation: fadeUp 0.6s ease 0.3s both; }

        .cursor-blink { animation: blink 1s step-end infinite; display: inline-block; width: 2px; height: 14px; background: #10b981; margin-left: 3px; vertical-align: middle; }

        .dash-card {
          background: rgba(16,185,129,0.01);
          border: 1px solid rgba(107,114,128,0.15);
          border-radius: 8px;
          padding: 40px;
          position: relative;
          overflow: hidden;
        }
        .dash-card::after {
          content: '';
          position: absolute;
          top: -50%;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent);
          animation: scanline 5s ease-in-out infinite;
        }

        .stat-card {
          background: rgba(16,185,129,0.03);
          border: 1px solid rgba(16,185,129,0.12);
          border-radius: 8px;
          padding: 28px;
          flex: 1;
          min-width: 160px;
        }

        .points-num {
          font-size: clamp(44px, 7vw, 72px);
          font-weight: 800;
          background: linear-gradient(100deg, #6ee7b7 0%, #10b981 60%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
          animation: countUp 0.8s ease 0.3s both;
        }

        .btn-copy {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: transparent;
          color: #10b981;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          border: 1px solid rgba(16,185,129,0.4);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .btn-copy:hover {
          background: rgba(16,185,129,0.08);
          border-color: #10b981;
        }

        .btn-danger {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: rgba(239,68,68,0.08);
          color: #f87171;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border: 1px solid rgba(239,68,68,0.25);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .btn-danger:hover:not(:disabled) {
          background: rgba(239,68,68,0.14);
          border-color: rgba(239,68,68,0.5);
          box-shadow: 0 0 20px rgba(239,68,68,0.08);
        }
        .btn-danger:disabled { opacity: 0.5; cursor: not-allowed; }

        .btn-danger-confirm {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #ef4444;
          color: #fff;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-danger-confirm:hover:not(:disabled) {
          background: #dc2626;
          box-shadow: 0 0 24px rgba(239,68,68,0.3);
        }
        .btn-danger-confirm:disabled { opacity: 0.5; cursor: not-allowed; }

        .btn-cancel {
          display: inline-flex;
          align-items: center;
          padding: 12px 24px;
          background: transparent;
          color: #6b7280;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          font-size: 13px;
          text-transform: uppercase;
          border: 1px solid rgba(107,114,128,0.2);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-cancel:hover { color: #9ca3af; border-color: rgba(107,114,128,0.4); }
      `}</style>

      <MatrixBackground />
      <Navbar />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 760, margin: '0 auto', padding: '140px 24px 96px' }}>

        {/* Header */}
        <div className="dash-fade-1" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 4, background: 'rgba(16,185,129,0.05)', color: '#6ee7b7', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 24 }}>
            <Terminal size={13} />
            Node: {profile.username}
            <span className="cursor-blink" />
          </div>

          <h1 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: 'clamp(36px, 6vw, 60px)', lineHeight: 1.0, marginBottom: 16, color: '#f0fdf4' }}>
            Your_
            <br />
            <span style={{ background: 'linear-gradient(100deg, #6ee7b7 0%, #10b981 50%, #047857 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Dashboard
            </span>
          </h1>
        </div>

        {/* Stats row */}
        <div className="dash-fade-2" style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
          <div className="stat-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Zap size={15} color="#10b981" />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#10b981', textTransform: 'uppercase', letterSpacing: 2 }}>Hack_Points</span>
            </div>
            <div className="points-num">{profile.hack_points}</div>
          </div>
          <div className="stat-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Users size={15} color="#10b981" />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#10b981', textTransform: 'uppercase', letterSpacing: 2 }}>Nodes_Referred</span>
            </div>
            <div className="points-num">{referralCount}</div>
          </div>
        </div>

        {/* Referral code */}
        <div className="dash-card dash-fade-3" style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#10b981', textTransform: 'uppercase', letterSpacing: 2 }}>Your_Referral_Code</span>
          </div>
          <p style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.7, marginBottom: 24 }}>
            Share this code. You earn <span style={{ color: '#10b981' }}>+50 points</span> for each person who redeems it.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 6, padding: '14px 20px', fontSize: 22, fontWeight: 700, letterSpacing: 4, color: '#d1fae5', minWidth: 160 }}>
              {profile.referral_code}
            </div>
            <button className="btn-copy" onClick={copyCode}>
              {copied ? <><Check size={14} /> Copied_</> : <><Copy size={14} /> Copy_Code</>}
            </button>
          </div>
        </div>

        {/* ─── DANGER ZONE ─── */}
        <div className="dash-fade-4" style={{ borderTop: '1px solid rgba(239,68,68,0.12)', paddingTop: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(239,68,68,0.6)', textTransform: 'uppercase', letterSpacing: 2 }}>Danger_Zone</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(239,68,68,0.1)' }} />
          </div>

          {deleteError && (
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 6, padding: '12px 16px', marginBottom: 20, color: '#fca5a5', fontSize: 13 }}>
              {deleteError}
            </div>
          )}

          {!showDeleteConfirm ? (
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn-danger" onClick={handleLogout}>
                <LogOut size={14} /> Logout
              </button>
              <button className="btn-danger" onClick={() => { setShowDeleteConfirm(true); setDeleteError(''); }}>
                <Trash2 size={14} /> Delete_Account
              </button>
            </div>
          ) : (
            <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, padding: '24px 28px' }}>
              <p style={{ color: '#fca5a5', fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>
                This will permanently delete your account and all associated data. <strong>This cannot be undone.</strong>
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button className="btn-danger-confirm" onClick={handleDeleteAccount} disabled={deleting}>
                  <Trash2 size={14} />
                  {deleting ? 'Deleting...' : 'Confirm_Delete'}
                </button>
                <button className="btn-cancel" onClick={() => setShowDeleteConfirm(false)} disabled={deleting}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
