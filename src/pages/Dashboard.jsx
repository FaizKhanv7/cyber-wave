import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Check, Zap, Users, LogOut, Trash2, Trophy, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import WavePageShell from '../components/WavePageShell';

export default function Dashboard() {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [referralCount, setReferralCount] = useState(null);
  const [rank, setRank] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user || !profile) return;
    fetchReferralCount();
    fetchRank();
  }, [user, profile]);

  async function fetchReferralCount() {
    const { count } = await supabase
      .from('referrals')
      .select('*', { count: 'exact', head: true })
      .eq('referrer_id', user.id);
    setReferralCount(count ?? 0);
  }

  async function fetchRank() {
    const { count } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gt('hack_points', profile.hack_points);
    setRank((count ?? 0) + 1);
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
      <WavePageShell>
        <main className="wave-main medium" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 16 }}>
          <p style={{ color: 'var(--muted-text)', fontWeight: 900, margin: 0 }}>
            {loading ? 'Loading...' : 'Profile not found.'}
          </p>
          {!loading && (
            <button className="wave-button" onClick={() => window.location.reload()}>
              Retry
            </button>
          )}
        </main>
      </WavePageShell>
    );
  }

  return (
    <WavePageShell>
      <style>{`
        .dash-summary {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin: 0 0 24px;
        }

        .dash-summary-tile {
          padding: 18px;
          color: var(--card-text);
          background: var(--card-bg);
          border: 3px solid var(--ink);
          border-radius: 8px;
          box-shadow: 5px 5px 0 var(--accent);
        }

        .dash-summary-tile strong {
          display: block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 34px;
          line-height: 1;
        }

        .dash-summary-tile span {
          display: block;
          margin-top: 8px;
          font-weight: 900;
          color: #604245;
        }

        .dash-section-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
          font-size: 13px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #604245;
        }

        .referral-code-display {
          flex: 1;
          padding: 14px 20px;
          background: var(--cream);
          border: 3px solid var(--ink);
          border-radius: 8px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 4px;
          color: var(--card-text);
          min-width: 160px;
          box-shadow: 3px 3px 0 rgba(37,27,29,0.18);
        }

        .danger-zone {
          border-top: 3px solid rgba(239,68,68,0.25);
          padding-top: 32px;
        }

        .danger-zone-label {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          font-size: 13px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #9f3030;
        }

        .danger-zone-label::after {
          content: '';
          flex: 1;
          height: 2px;
          background: rgba(239,68,68,0.18);
          border-radius: 1px;
        }

        .danger-confirm-box {
          padding: 24px;
          background: #fff0f0;
          border: 3px solid var(--ink);
          border-radius: 8px;
          box-shadow: 5px 5px 0 rgba(239,68,68,0.3);
        }

        @media (max-width: 720px) {
          .dash-summary { grid-template-columns: 1fr; }
        }
      `}</style>

      <main className="wave-main medium">
        <header className="wave-hero">
          <div className="wave-badge">
            <User size={16} /> {profile.username}
          </div>
          <h1 className="wave-title">
            Your <span>Dashboard</span>
          </h1>
          <p className="wave-subtitle">
            Track your points, share your referral code, and climb the leaderboard.
          </p>
        </header>

        {/* Stats */}
        <section className="dash-summary">
          <div className="dash-summary-tile">
            <strong>{profile.hack_points?.toLocaleString() ?? 0}</strong>
            <span>Hack points</span>
          </div>
          <div className="dash-summary-tile">
            <strong>{referralCount ?? '—'}</strong>
            <span>Friends referred</span>
          </div>
          <div className="dash-summary-tile">
            <strong>{rank ?? '—'}</strong>
            <span>Your rank</span>
          </div>
        </section>

        {/* Referral code */}
        <section className="wave-card pad" style={{ marginBottom: 24 }}>
          <div className="dash-section-label">
            <Copy size={14} /> Your Referral Code
          </div>
          <p style={{ color: 'var(--muted-text)', fontSize: 15, lineHeight: 1.6, marginBottom: 20, fontWeight: 700 }}>
            Share this code to earn <strong style={{ color: 'var(--accent)' }}>+50 points</strong> for each person who redeems it.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div className="referral-code-display">{profile.referral_code}</div>
            <button className="wave-button cream" onClick={copyCode}>
              {copied ? <><Check size={16} /> Copied!</> : <><Copy size={16} /> Copy Code</>}
            </button>
          </div>
        </section>

        {/* Danger zone */}
        <section className="danger-zone">
          <div className="danger-zone-label">Danger Zone</div>

          {deleteError && (
            <div className="wave-alert error">{deleteError}</div>
          )}

          {!showDeleteConfirm ? (
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="wave-button dark" onClick={handleLogout}>
                <LogOut size={16} /> Logout
              </button>
              <button className="wave-button danger" onClick={() => { setShowDeleteConfirm(true); setDeleteError(''); }}>
                <Trash2 size={16} /> Delete Account
              </button>
            </div>
          ) : (
            <div className="danger-confirm-box">
              <p style={{ color: '#8f1d1d', fontSize: 14, lineHeight: 1.7, marginBottom: 20, fontWeight: 800, margin: '0 0 20px' }}>
                This will permanently delete your account and all associated data. <strong>This cannot be undone.</strong>
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button className="wave-button danger" onClick={handleDeleteAccount} disabled={deleting}>
                  <Trash2 size={16} />
                  {deleting ? 'Deleting...' : 'Confirm Delete'}
                </button>
                <button className="wave-button cream" onClick={() => setShowDeleteConfirm(false)} disabled={deleting}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </WavePageShell>
  );
}
