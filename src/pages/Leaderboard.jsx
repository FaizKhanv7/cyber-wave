import { useEffect, useState } from "react";
import { Crown, Sparkles, Trophy, Zap } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import WavePageShell from "../components/WavePageShell";

const RANK_COLORS = ["#f6c453", "#c9ced6", "#c47b3c"];

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [fetching, setFetching] = useState(true);
  const { user, profile } = useAuth();

  useEffect(() => {
    async function fetchLeaderboard() {
      const { data } = await supabase
        .from("profiles")
        .select("id, username, hack_points")
        .order("hack_points", { ascending: false });
      setEntries(data || []);
      setFetching(false);
    }
    fetchLeaderboard();
  }, []);

  return (
    <WavePageShell>
      <style>{`
        .leaderboard-summary {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin: 0 0 24px;
        }

        .summary-tile {
          padding: 18px;
          color: var(--card-text);
          background: var(--card-bg);
          border: 3px solid var(--ink);
          border-radius: 8px;
          box-shadow: 5px 5px 0 var(--accent);
        }

        .summary-tile strong {
          display: block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 34px;
          line-height: 1;
        }

        .summary-tile span {
          display: block;
          margin-top: 8px;
          font-weight: 900;
          color: #604245;
        }

        .leaderboard-card {
          overflow: hidden;
        }

        .lb-header,
        .lb-row {
          display: grid;
          grid-template-columns: 90px 1fr 130px;
          align-items: center;
          gap: 16px;
        }

        .lb-header {
          padding: 18px 22px;
          color: #604245;
          border-bottom: 3px solid var(--ink);
          font-size: 13px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .lb-row {
          padding: 18px 22px;
          border-bottom: 2px solid rgba(37,27,29,0.14);
          color: var(--card-text);
          font-weight: 900;
        }

        .lb-row:last-child { border-bottom: 0; }
        .lb-row.own-row { background: #d9fff8; }
        .lb-row.top-row { background: linear-gradient(90deg, rgba(246,196,83,0.28), transparent); }

        .rank-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 42px;
          border: 2px solid var(--ink);
          border-radius: 8px;
          background: var(--cream);
          box-shadow: 3px 3px 0 rgba(37,27,29,0.22);
        }

        .player-cell {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .avatar {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border: 2px solid var(--ink);
          border-radius: 8px;
          background: var(--accent);
          color: #fff8ea;
          flex: 0 0 auto;
        }

        .username {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .you-pill {
          padding: 4px 8px;
          border: 2px solid var(--ink);
          border-radius: 999px;
          background: var(--teal);
          color: var(--ink);
          font-size: 11px;
        }

        .points-cell {
          display: inline-flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          color: var(--accent);
        }

        .empty-state {
          padding: 58px 22px;
          text-align: center;
          color: #604245;
          font-weight: 900;
        }

        @media (max-width: 720px) {
          .leaderboard-summary { grid-template-columns: 1fr; }
          .lb-header { display: none; }
          .lb-row {
            grid-template-columns: 64px 1fr;
            gap: 12px;
          }
          .points-cell {
            grid-column: 2;
            justify-content: flex-start;
          }
        }
      `}</style>

      <main className="wave-main medium">
        <header className="wave-hero">
          <div className="wave-badge">
            <Trophy size={16} /> Live points board
          </div>
          <h1 className="wave-title">
            Hack <span>Leaderboard</span>
          </h1>
          <p className="wave-subtitle">
            Climb by showing up, referring friends, and building in public. Tiny bragging rights, large motivational value.
          </p>
        </header>

        <section className="leaderboard-summary">
          <div className="summary-tile">
            <strong>{entries.length}</strong>
            <span>Builders ranked</span>
          </div>
          <div className="summary-tile">
            <strong>{entries[0]?.hack_points?.toLocaleString() || 0}</strong>
            <span>Top score</span>
          </div>
          <div className="summary-tile">
            <strong>
              {(() => {
                const id = profile?.id ?? user?.id;
                if (!id || fetching) return "—";
                const idx = entries.findIndex((e) => e.id === id);
                return idx === -1 ? "—" : idx + 1;
              })()}
            </strong>
            <span>Your rank</span>
          </div>
        </section>

        <section className="wave-card leaderboard-card">
          <div className="lb-header">
            <span>Rank</span>
            <span>Builder</span>
            <span style={{ textAlign: "right" }}>Points</span>
          </div>

          {fetching && <div className="empty-state">Loading the board...</div>}
          {!fetching && entries.length === 0 && <div className="empty-state">No builders yet. Be first on the board.</div>}

          {!fetching && entries.map((entry, index) => {
            const isOwn = (profile?.id ?? user?.id) === entry.id;
            const isTop = index < 3;
            const rankColor = isTop ? RANK_COLORS[index] : "#604245";

            return (
              <div key={entry.id} className={`lb-row${isOwn ? " own-row" : ""}${isTop ? " top-row" : ""}`}>
                <div className="rank-badge" style={{ color: rankColor }}>
                  {isTop ? <Crown size={20} /> : `#${index + 1}`}
                </div>
                <div className="player-cell">
                  <div className="avatar"><Sparkles size={18} /></div>
                  <span className="username">{entry.username}</span>
                  {isOwn && <span className="you-pill">You</span>}
                </div>
                <div className="points-cell">
                  <Zap size={17} />
                  {entry.hack_points.toLocaleString()}
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </WavePageShell>
  );
}
