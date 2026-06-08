import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Ticket, UserCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import WavePageShell from "../components/WavePageShell";

export default function Signup() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState("");
  const [dietary, setDietary] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [referralNote, setReferralNote] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!fullName.trim()) {
      setError("Full name is required");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const { error: insertError } = await supabase
        .from("event_registrations")
        .insert({
          full_name: fullName.trim(),
          dietary_restrictions: dietary.trim() || "None",
          referral_code_used: referralCode.trim().toUpperCase() || null,
          user_id: user?.id || null,
        });

      if (insertError) throw new Error(insertError.message);

      if (referralCode.trim()) {
        const { error: rpcError } = await supabase.rpc("award_referral_points", {
          p_code: referralCode.trim().toUpperCase(),
        });

        if (rpcError) {
          setReferralNote(rpcError.message || "Referral code could not be applied.");
        } else {
          setReferralNote(
            user
              ? "Referral code applied. +10 points added to your account."
              : "Referral code applied. Points awarded to the referrer."
          );
        }
      }

      localStorage.setItem("wavehack26_registered", "true");
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }

    setSubmitting(false);
  }

  return (
    <WavePageShell>
      <style>{`
        .signup-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          align-items: start;
        }

        .event-poster {
          min-height: 560px;
          padding: clamp(28px, 5vw, 44px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #fff8ea;
          background:
            linear-gradient(180deg, rgba(36,22,27,0.20), rgba(36,22,27,0.94)),
            url('/event5.jpg') center / cover;
          border: 3px solid var(--ink);
          border-radius: 8px;
          box-shadow: 8px 8px 0 var(--accent);
        }

        .event-poster h2 {
          margin: 0;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(54px, 7vw, 96px);
          line-height: 0.86;
        }

        .poster-chip-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 22px;
        }

        .poster-chip-row span {
          padding: 8px 12px;
          border: 2px solid #fff4dc;
          border-radius: 999px;
          background: rgba(255,244,220,0.12);
          font-weight: 900;
        }

        .signup-form {
          display: grid;
          gap: 20px;
        }

        .form-note {
          margin: 0 0 24px;
          color: #604245;
          font-weight: 800;
          line-height: 1.55;
        }

        .helper-text {
          margin: 7px 0 0;
          color: #604245;
          font-size: 13px;
          line-height: 1.45;
          font-weight: 750;
        }

        .success-card {
          max-width: 720px;
          margin: 0 auto;
          text-align: center;
        }

        .success-icon {
          width: 78px;
          height: 78px;
          display: grid;
          place-items: center;
          margin: 0 auto 22px;
          border: 3px solid var(--ink);
          border-radius: 18px;
          background: var(--teal);
          color: var(--ink);
          box-shadow: 6px 6px 0 var(--accent);
          transform: rotate(-4deg);
        }

        @media (max-width: 900px) {
          .signup-grid { grid-template-columns: 1fr; }
          .event-poster { min-height: 360px; }
        }
      `}</style>

      {success ? (
        <main className="wave-main narrow">
          <section className="wave-card pad success-card">
            <div className="success-icon"><UserCheck size={38} /></div>
            <h1 className="wave-title" style={{ color: "var(--card-text)" }}>
              You're <span>in.</span>
            </h1>
            <p className="form-note" style={{ marginTop: 22 }}>
              We have you registered for WaveHack GameJam. Join the GroupMe so you catch updates, teammate calls, and day-of details.
            </p>
            {referralNote && <div className="wave-alert success">{referralNote}</div>}
            <a
              href="https://groupme.com/join_group/113593335/tHhxoCgi"
              target="_blank"
              rel="noopener noreferrer"
              className="wave-button"
            >
              Join GroupMe <ArrowRight size={18} />
            </a>
          </section>
        </main>
      ) : (
        <main className="wave-main">
          <header className="wave-hero">
            <div className="wave-badge">
              <Ticket size={16} /> Event registration
            </div>
            <h1 className="wave-title">
              Save your <span>GameJam spot.</span>
            </h1>
            <p className="wave-subtitle">
              A short form, then you are on the list. Referral codes are optional, but points are more fun with friends.
            </p>
          </header>

          <section className="signup-grid">
            <aside className="event-poster">
              <div>
                <h2>WaveHack GameJam</h2>
                <div className="poster-chip-row">
                  <span>June 28, 2026</span>
                  <span>Free</span>
                  <span>Beginner friendly</span>
                </div>
              </div>
              <p style={{ margin: 0, maxWidth: 420, color: "#fff4dc", fontWeight: 900, lineHeight: 1.55 }}>
                Bring a laptop, an idea, or just curiosity. We will bring the structure, snacks, and prize energy.
              </p>
            </aside>

            <div className="wave-card pad">
              <p className="form-note">
                {user ? (
                  "You are signed in, so referral bonuses can land on your account."
                ) : (
                  <>
                    Have a WaveHack account? <Link to="/auth" className="wave-link-button">Log in first</Link> to earn +10 bonus points with a referral code.
                  </>
                )}
              </p>

              {error && <div className="wave-alert error">{error}</div>}

              <form onSubmit={handleSubmit} className="signup-form">
                <div>
                  <label className="wave-label">Full name</label>
                  <input
                    className="wave-input"
                    type="text"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label className="wave-label">Dietary restrictions</label>
                  <input
                    className="wave-input"
                    type="text"
                    placeholder="None, vegetarian, gluten-free..."
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label className="wave-label">Referral code</label>
                  <input
                    className="wave-input"
                    type="text"
                    placeholder="OPTIONAL"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    autoComplete="off"
                    style={{ letterSpacing: 4 }}
                  />
                  <p className="helper-text">
                    Rewards the person who referred you{user ? " and adds +10 points to your account." : "."}
                  </p>
                </div>

                <button className="wave-button" type="submit" disabled={submitting}>
                  <CheckCircle size={18} />
                  {submitting ? "Registering..." : "Register now"}
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </section>
        </main>
      )}
    </WavePageShell>
  );
}
