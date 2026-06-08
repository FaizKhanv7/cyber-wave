import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { LayoutDashboard, LogIn, Moon, Sun } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ theme, onToggleTheme }) {
  const [internalTheme, setInternalTheme] = useState(() => localStorage.getItem("wavehack_theme") || "dark");
  const { user } = useAuth();
  const activeTheme = theme || internalTheme;

  useEffect(() => {
    if (theme) setInternalTheme(theme);
  }, [theme]);

  const handleToggleTheme = () => {
    const nextTheme = activeTheme === "dark" ? "light" : "dark";
    if (onToggleTheme) {
      onToggleTheme(nextTheme);
      return;
    }

    setInternalTheme(nextTheme);
    localStorage.setItem("wavehack_theme", nextTheme);
    window.dispatchEvent(new CustomEvent("wavehack-theme-change", { detail: nextTheme }));
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        width: "100%",
        zIndex: 50,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <style>{`
        .wave-nav.dark {
          --nav-bg: #24161b;
          --nav-text: #fff8ea;
          --button-bg: #fff4dc;
          --button-text: #21191a;
          --toggle-bg: #3a2228;
          --ink: #251b1d;
          --shadow: rgba(0,0,0,0.36);
          --accent: #3d6ef5;
          --badge-text: #fff8ea;
        }
        .wave-nav.light {
          --nav-bg: #fff4dc;
          --nav-text: #251b1d;
          --button-bg: #251b1d;
          --button-text: #fff8ea;
          --toggle-bg: #ffe4b5;
          --ink: #251b1d;
          --shadow: rgba(37,27,29,0.2);
          --accent: #3d6ef5;
          --badge-text: #fff8ea;
        }
        .wave-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          width: 100%;
          padding: 14px max(20px, calc((100vw - 1180px) / 2));
          border-bottom: 3px solid var(--ink);
          background: var(--nav-bg);
          color: var(--nav-text);
          box-shadow: 0 5px 0 var(--shadow);
          backdrop-filter: blur(18px);
        }
        .wave-mark {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--nav-text);
          text-decoration: none;
          font-weight: 900;
          letter-spacing: 0;
        }
        .wave-mark img {
          width: 38px;
          height: 38px;
          object-fit: contain;
          border-radius: 50%;
        }
        .wave-wordmark {
          display: inline-block;
          padding: 8px 15px;
          color: var(--badge-text);
          background: var(--accent);
          border: 2px solid var(--ink);
          border-radius: 8px;
          font-size: 16px;
        }
        .wave-links {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .wave-links a {
          color: var(--nav-text);
          text-decoration: none;
          font-weight: 900;
          font-size: 14px;
          white-space: nowrap;
        }
        .wave-cta {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          min-height: 34px;
          padding: 7px 16px;
          border: none;
          border-radius: 999px;
          background: var(--button-bg);
          color: var(--button-text) !important;
          font-weight: 900;
          font-size: 14px;
          cursor: pointer;
          transition: opacity 150ms ease, transform 150ms ease;
        }
        .wave-cta:hover { opacity: 0.82; transform: translateY(-1px); }
        .theme-toggle {
          width: 34px;
          height: 34px;
          display: inline-grid;
          place-items: center;
          border: none;
          border-radius: 999px;
          background: var(--toggle-bg);
          color: var(--nav-text);
          cursor: pointer;
          transition: opacity 150ms ease, transform 150ms ease;
        }
        .theme-toggle:hover { opacity: 0.72; transform: translateY(-1px); }
        @media (max-width: 720px) {
          .wave-nav { padding: 10px 12px; }
          .wave-wordmark { font-size: 14px; padding: 8px 12px; }
          .wave-links a:not(.wave-cta) { display: none; }
          .wave-mark img { width: 34px; height: 34px; }
        }
      `}</style>

      <div className={`wave-nav ${activeTheme}`}>
        <Link to="/" className="wave-mark">
          <img src="/Logo.png" alt="WaveHack logo" />
          <span className="wave-wordmark">WAVEHACK</span>
        </Link>

        <div className="wave-links">
          <a href="/#events">Events</a>
          <a href="/#projects">Projects</a>
          <a href="/#sponsors">Sponsors</a>
          <Link to="/leaderboard">Leaderboard</Link>
          <button
            type="button"
            className="theme-toggle"
            onClick={handleToggleTheme}
            aria-label={`Switch to ${activeTheme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${activeTheme === "dark" ? "light" : "dark"} theme`}
          >
            {activeTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {user ? (
            <Link to="/dashboard" className="wave-cta">
              <LayoutDashboard size={16} /> Dashboard
            </Link>
          ) : (
            <Link to="/auth" className="wave-cta">
              <LogIn size={16} /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
