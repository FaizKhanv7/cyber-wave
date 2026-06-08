import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, KeyRound, Mail, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import WavePageShell from "../components/WavePageShell";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user, loading, signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate("/dashboard");
  }, [user, loading, navigate]);

  function switchMode(next) {
    setMode(next);
    setError("");
    setSuccess("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    if (mode === "signup") {
      if (!username.trim()) {
        setError("Username is required");
        setSubmitting(false);
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-signup-otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ email, password, username: username.trim() }),
        });
        const data = await res.json();
        if (!res.ok) setError(data.error || "Failed to send verification code");
        else navigate("/confirm-email", { state: { email, password } });
      } catch {
        setError("Network error. Please try again.");
      }
    } else if (mode === "forgot") {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (resetError) setError(resetError.message);
      else setSuccess("Reset link sent. Check your inbox.");
      setSubmitting(false);
      return;
    } else {
      const { error } = await signIn({ email, password });
      if (error) setError(error.message);
      else navigate("/dashboard");
    }

    setSubmitting(false);
  }

  const heading = mode === "login" ? "Welcome back." : mode === "signup" ? "Join the wave." : "Reset your key.";
  const subheading =
    mode === "login"
      ? "Log in to track points, share your referral code, and manage your WaveHack account."
      : mode === "signup"
        ? "Create your builder account, then verify your email with a short code."
        : "Enter your email and we will send you a password reset link.";

  return (
    <WavePageShell>
      <style>{`
        .auth-layout {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 28px;
          align-items: stretch;
        }

        .auth-side {
          padding: clamp(28px, 5vw, 44px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 520px;
          color: #fff8ea;
          background:
            linear-gradient(135deg, rgba(61,110,245,0.92), rgba(36,22,27,0.92)),
            url('/event4.jpg') center / cover;
          background-blend-mode: multiply;
          border: 3px solid var(--ink);
          border-radius: 8px;
          box-shadow: 8px 8px 0 var(--accent);
        }

        .auth-side h2 {
          margin: 0;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(42px, 6vw, 76px);
          line-height: 0.92;
        }

        .auth-side p {
          margin: 18px 0 0;
          max-width: 360px;
          color: #fff4dc;
          font-weight: 850;
          line-height: 1.55;
        }

        .auth-mini-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 30px;
        }

        .auth-mini-grid span {
          padding: 13px;
          border: 2px solid #fff4dc;
          border-radius: 8px;
          background: rgba(255,244,220,0.1);
          font-weight: 900;
        }

        .auth-card-title {
          margin: 0 0 22px;
          color: var(--card-text);
          font-family: 'Space Grotesk', sans-serif;
          font-size: 30px;
          line-height: 1;
        }

        .auth-form {
          display: grid;
          gap: 18px;
        }

        .auth-row {
          display: grid;
          gap: 8px;
        }

        .auth-switch {
          margin-top: 26px;
          text-align: center;
          color: #604245;
          font-weight: 850;
        }

        .forgot-row {
          margin-top: 8px;
          text-align: right;
        }

        @media (max-width: 900px) {
          .auth-layout { grid-template-columns: 1fr; }
          .auth-side { min-height: 360px; }
        }
      `}</style>

      <main className="wave-main">
        <header className="wave-hero">
          <div className="wave-badge">
            <KeyRound size={16} /> Builder access
          </div>
          <h1 className="wave-title">
            {heading.split(" ")[0]} <span>{heading.split(" ").slice(1).join(" ")}</span>
          </h1>
          <p className="wave-subtitle">{subheading}</p>
        </header>

        <section className="auth-layout">
          <aside className="auth-side">
            <div>
              <h2>Build, refer, climb.</h2>
              <p>WaveHack accounts keep your points, referrals, certificates, and event access in one place.</p>
            </div>
            <div className="auth-mini-grid">
              <span>+50 per referral</span>
              <span>GameJam access</span>
              <span>Leaderboard</span>
              <span>Rewards</span>
            </div>
          </aside>

          <div className="wave-card pad">
            <h2 className="auth-card-title">
              {mode === "login" ? "Log in" : mode === "signup" ? "Create account" : "Forgot password"}
            </h2>

            {success && <div className="wave-alert success">{success}</div>}
            {error && <div className="wave-alert error">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              {mode === "signup" && (
                <div className="auth-row">
                  <label className="wave-label">Username</label>
                  <input
                    className="wave-input"
                    type="text"
                    placeholder="your_handle"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                  />
                </div>
              )}

              <div className="auth-row">
                <label className="wave-label">Email</label>
                <input
                  className="wave-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              {mode !== "forgot" && (
                <div className="auth-row">
                  <label className="wave-label">Password</label>
                  <input
                    className="wave-input"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                  />
                  {mode === "login" && (
                    <div className="forgot-row">
                      <button type="button" className="wave-link-button" onClick={() => switchMode("forgot")}>
                        Forgot password?
                      </button>
                    </div>
                  )}
                </div>
              )}

              <button className="wave-button" type="submit" disabled={submitting}>
                {mode === "signup" ? <UserPlus size={18} /> : mode === "forgot" ? <Mail size={18} /> : <KeyRound size={18} />}
                {submitting ? "Working..." : mode === "login" ? "Log in" : mode === "signup" ? "Create account" : "Send reset link"}
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="auth-switch">
              {mode === "login" ? (
                <>No account yet? <button className="wave-link-button" onClick={() => switchMode("signup")}>Sign up</button></>
              ) : mode === "forgot" ? (
                <>Remembered it? <button className="wave-link-button" onClick={() => switchMode("login")}>Back to login</button></>
              ) : (
                <>Already registered? <button className="wave-link-button" onClick={() => switchMode("login")}>Log in</button></>
              )}
            </div>
          </div>
        </section>
      </main>
    </WavePageShell>
  );
}
