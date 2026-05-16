import { useState, useEffect } from 'react';
import { Terminal, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import MatrixBackground from '../components/MatrixBackground';
import Navbar from '../components/Navbar';

const RANK_COLORS = ['#fbbf24', '#9ca3af', '#b45309'];

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [fetching, setFetching] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchLeaderboard() {
      const { data } = await supabase
        .from('profiles')
        .select('id, username, hack_points')
        .order('hack_points', { ascending: false });
      setEntries(data || []);
      setFetching(false);
    }
    fetchLeaderboard();
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
        @keyframes blink {
          0%, 100% { opacity: 1; } 50% { opacity: 0; }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }
        @keyframes rowIn {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .lb-fade-1 { animation: fadeUp 0.6s ease both; }
        .lb-fade-2 { animation: fadeUp 0.6s ease 0.1s both; }

        .cursor-blink { animation: blink 1s step-end infinite; display: inline-block; width: 2px; height: 14px; background: #10b981; margin-left: 3px; vertical-align: middle; }

        .lb-card {
          background: rgba(16,185,129,0.01);
          border: 1px solid rgba(107,114,128,0.15);
          border-radius: 8px;
          padding: 40px;
          position: relative;
          overflow: hidden;
        }
        .lb-card::after {
          content: '';
          position: absolute;
          top: -50%;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent);
          animation: scanline 5s ease-in-out infinite;
        }

        .lb-row {
          display: flex;
          align-items: center;
          padding: 14px 20px;
          border-radius: 6px;
          border: 1px solid rgba(107,114,128,0.08);
          background: rgba(16,185,129,0.01);
          margin-bottom: 8px;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .lb-row:hover {
          background: rgba(16,185,129,0.04);
          border-color: rgba(16,185,129,0.12);
        }
        .lb-row.own-row {
          border-color: rgba(16,185,129,0.3);
          background: rgba(16,185,129,0.06);
        }
        .lb-row.top-row {
          border-color: rgba(16,185,129,0.15);
        }
      `}</style>

      <MatrixBackground />
      <Navbar />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 760, margin: '0 auto', padding: '140px 24px 96px' }}>

        {/* Header */}
        <div className="lb-fade-1" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 4, background: 'rgba(16,185,129,0.05)', color: '#6ee7b7', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 24 }}>
            <Terminal size={13} />
            Network: Leaderboard_v1.0
            <span className="cursor-blink" />
          </div>

          <h1 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: 'clamp(36px, 6vw, 60px)', lineHeight: 1.0, marginBottom: 16, color: '#f0fdf4' }}>
            Hack_
            <br />
            <span style={{ background: 'linear-gradient(100deg, #6ee7b7 0%, #10b981 50%, #047857 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Leaderboard
            </span>
          </h1>
          <p style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.8 }}>
            Nodes ranked by hack_points. Refer others to climb the board.
          </p>
        </div>

        {/* Board */}
        <div className="lb-card lb-fade-2">
          {/* Column headers */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px 16px', borderBottom: '1px solid rgba(16,185,129,0.1)', marginBottom: 16 }}>
            <span style={{ width: 60, fontSize: 11, fontWeight: 600, color: '#10b981', textTransform: 'uppercase', letterSpacing: 1.5 }}>Rank</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 600, color: '#10b981', textTransform: 'uppercase', letterSpacing: 1.5 }}>Node</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Zap size={12} color="#10b981" />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#10b981', textTransform: 'uppercase', letterSpacing: 1.5 }}>Points</span>
            </div>
          </div>

          {fetching && (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#6b7280', fontSize: 13 }}>
              Fetching_network_nodes...
            </div>
          )}

          {!fetching && entries.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#6b7280', fontSize: 13 }}>
              No nodes found. Be the first to register.
            </div>
          )}

          {!fetching && entries.map((entry, i) => {
            const isOwn = user && entry.id === user.id;
            const isTop = i < 3;
            const rankColor = isTop ? RANK_COLORS[i] : '#4b5563';

            return (
              <div
                key={entry.id}
                className={`lb-row${isOwn ? ' own-row' : ''}${isTop ? ' top-row' : ''}`}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {/* Rank */}
                <div style={{ width: 60, fontWeight: 700, fontSize: 15, color: rankColor, fontFamily: "'JetBrains Mono', monospace" }}>
                  #{i + 1}
                </div>

                {/* Username */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontWeight: 600, fontSize: 15, color: isOwn ? '#6ee7b7' : isTop ? '#d1fae5' : '#9ca3af' }}>
                    {entry.username}
                  </span>
                  {isOwn && (
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#10b981', textTransform: 'uppercase', letterSpacing: 1, border: '1px solid rgba(16,185,129,0.4)', borderRadius: 3, padding: '2px 6px' }}>
                      You
                    </span>
                  )}
                </div>

                {/* Points */}
                <div style={{ fontWeight: 700, fontSize: 16, color: isTop ? rankColor : '#6b7280' }}>
                  {entry.hack_points.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
