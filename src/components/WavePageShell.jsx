import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function WavePageShell({ children, className = "" }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("wavehack_theme") || "dark");

  useEffect(() => {
    const handleThemeChange = (event) => setTheme(event.detail);
    window.addEventListener("wavehack-theme-change", handleThemeChange);
    return () => window.removeEventListener("wavehack-theme-change", handleThemeChange);
  }, []);

  return (
    <div className={`wave-page ${theme} ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap');

        * { box-sizing: border-box; }
        body { margin: 0; }

        .wave-page.dark {
          --page-text: #fff8ea;
          --muted-text: #f7dec5;
          --quiet-text: #c7b6a4;
          --page-bg:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
            radial-gradient(circle at 16% 14%, rgba(61, 110, 245, 0.28), transparent 32%),
            radial-gradient(circle at 86% 36%, rgba(90, 190, 181, 0.20), transparent 28%),
            linear-gradient(180deg, #24161b 0%, #1d1418 52%, #100c10 100%);
          --card-bg: #fff4dc;
          --card-text: #251b1d;
          --panel-bg: rgba(255,244,220,0.08);
          --panel-border: rgba(255,244,220,0.24);
          --input-bg: rgba(255,244,220,0.92);
          --input-text: #251b1d;
          --accent: #3d6ef5;
          --teal: #74d4c7;
          --gold: #f6c453;
          --ink: #251b1d;
          --cream: #fff4dc;
          --shadow: rgba(0,0,0,0.34);
        }

        .wave-page.light {
          --page-text: #251b1d;
          --muted-text: #5f3f3f;
          --quiet-text: #6f5652;
          --page-bg:
            linear-gradient(rgba(37,27,29,0.075) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,27,29,0.075) 1px, transparent 1px),
            radial-gradient(circle at 16% 14%, rgba(61, 110, 245, 0.16), transparent 30%),
            radial-gradient(circle at 86% 34%, rgba(116, 212, 199, 0.25), transparent 27%),
            linear-gradient(180deg, #fff4dc 0%, #ffeac5 52%, #fff7e8 100%);
          --card-bg: #fffdf5;
          --card-text: #251b1d;
          --panel-bg: rgba(255,255,255,0.52);
          --panel-border: rgba(37,27,29,0.16);
          --input-bg: #fffdf5;
          --input-text: #251b1d;
          --accent: #3d6ef5;
          --teal: #3baea3;
          --gold: #d89d1e;
          --ink: #251b1d;
          --cream: #fff4dc;
          --shadow: rgba(37,27,29,0.18);
        }

        .wave-page {
          min-height: 100vh;
          color: var(--page-text);
          font-family: 'Inter', system-ui, sans-serif;
          background: var(--page-bg);
          background-size: 48px 48px, 48px 48px, auto, auto, auto;
          overflow-x: hidden;
        }

        .wave-main {
          width: min(1120px, calc(100% - 36px));
          margin: 0 auto;
          padding: 74px 0 96px;
        }

        .wave-main.narrow { width: min(620px, calc(100% - 32px)); }
        .wave-main.medium { width: min(860px, calc(100% - 32px)); }

        .wave-hero {
          text-align: center;
          margin-bottom: 34px;
        }

        .wave-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          margin-bottom: 20px;
          color: var(--ink);
          background: var(--cream);
          border: 3px solid var(--ink);
          border-radius: 999px;
          box-shadow: 5px 5px 0 var(--accent);
          font-weight: 900;
          font-size: 13px;
        }

        .wave-title {
          margin: 0;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(46px, 8vw, 88px);
          line-height: 0.9;
          letter-spacing: 0;
        }

        .wave-title span {
          color: var(--teal);
          text-shadow: 4px 4px 0 rgba(49,40,75,0.9);
        }

        .wave-subtitle {
          max-width: 680px;
          margin: 18px auto 0;
          color: var(--muted-text);
          font-size: 17px;
          line-height: 1.6;
          font-weight: 750;
        }

        .wave-card {
          color: var(--card-text);
          background: var(--card-bg);
          border: 3px solid var(--ink);
          border-radius: 8px;
          box-shadow: 8px 8px 0 var(--accent);
        }

        .wave-card.pad { padding: clamp(24px, 5vw, 44px); }

        .wave-panel {
          background: var(--panel-bg);
          border: 2px solid var(--panel-border);
          border-radius: 8px;
        }

        .wave-input {
          width: 100%;
          min-height: 48px;
          padding: 12px 15px;
          color: var(--input-text);
          background: var(--input-bg);
          border: 2px solid var(--ink);
          border-radius: 8px;
          font: inherit;
          font-weight: 800;
          outline: none;
          box-shadow: 3px 3px 0 rgba(37,27,29,0.18);
        }

        .wave-input:focus {
          box-shadow: 4px 4px 0 var(--teal);
        }

        .wave-label {
          display: block;
          margin-bottom: 8px;
          color: var(--card-text);
          font-weight: 900;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .wave-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 48px;
          padding: 12px 22px;
          border: 2px solid var(--ink);
          border-radius: 8px;
          background: var(--accent);
          color: #fff8ea;
          font: inherit;
          font-weight: 900;
          text-decoration: none;
          cursor: pointer;
          box-shadow: 4px 4px 0 var(--ink);
          transition: transform 160ms ease, box-shadow 160ms ease;
        }

        .wave-button:hover:not(:disabled) {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0 var(--ink);
        }

        .wave-button:disabled { opacity: 0.65; cursor: not-allowed; }

        .wave-button.cream {
          background: var(--cream);
          color: var(--ink);
        }

        .wave-button.dark {
          background: var(--ink);
          color: #fff8ea;
        }

        .wave-button.danger {
          background: #ef4444;
          color: #fff;
        }

        .wave-link-button {
          border: 0;
          background: transparent;
          color: var(--accent);
          font: inherit;
          font-weight: 900;
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: pointer;
          padding: 0;
        }

        .wave-alert {
          padding: 13px 15px;
          margin-bottom: 20px;
          border: 2px solid var(--ink);
          border-radius: 8px;
          font-weight: 800;
          line-height: 1.45;
        }

        .wave-alert.error { background: #ffe0dc; color: #8f1d1d; }
        .wave-alert.success { background: #d9fff8; color: #15584f; }

        @media (max-width: 680px) {
          .wave-main { width: min(100% - 28px, 1120px); padding-top: 48px; }
          .wave-title { font-size: clamp(42px, 16vw, 70px); }
        }
      `}</style>
      <Navbar />
      {children}
    </div>
  );
}
