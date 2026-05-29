import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      style={{
        position: "fixed",
        top: "24px",
        left: "50%",
        transform: `translate(-50%, ${isVisible ? '0' : '-150%'})`,
        transition: "transform 0.3s ease-in-out",
        width: "calc(100% - 48px)",
        maxWidth: "1100px",
        zIndex: 50,
        background: "rgba(2,8,4,0.45)",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        border: "1px solid rgba(16,185,129,0.18)",
        borderRadius: "100px",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        display: "flex",
        alignItems: "center",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        .nav-logo-link { transition: opacity 0.2s ease; text-decoration: none; display: flex; align-items: center; gap: 10px; }
        .nav-logo-link:hover { opacity: 0.85; }

        .nav-logo-box { padding: 4px; transition: all 0.3s ease; }

        .nav-logo-text {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 17px;
          color: #f0fdf4;
          letter-spacing: 2px;
          transition: color 0.2s ease;
        }
        .nav-logo-link:hover .nav-logo-text { color: #6ee7b7; }

        .nav-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 20px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          font-size: 13px;
          color: #10b981;
          text-decoration: none;
          border: 1px solid rgba(16,185,129,0.5);
          border-radius: 9999px;
          background: rgba(16,185,129,0.04);
          box-shadow: 0 0 12px rgba(16,185,129,0.1);
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .nav-cta:hover {
          background: rgba(16,185,129,0.12);
          border-color: #10b981;
          box-shadow: 0 0 20px rgba(16,185,129,0.25);
          color: #6ee7b7;
        }

        .nav-link {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 500;
          font-size: 13px;
          color: #6b7280;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s ease;
        }
        .nav-link:hover { color: #10b981; }

        @media (max-width: 600px) {
          .nav-logo-text { font-size: 15px; }
          .nav-link { display: none; }
        }
      `}</style>

      <div
        style={{
          width: "100%",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link to="/" className="nav-logo-link">
          <div className="nav-logo-box">
            <img src="/Logo.png" alt="WaveHack Logo" style={{ width: 32, height: 32, objectFit: "contain" }} />
          </div>
          <span className="nav-logo-text">WAVEHACK_</span>
        </Link>

        {/* Right nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Link to="/leaderboard" className="nav-link">Leaderboard</Link>

          {user ? (
            <Link to="/dashboard" className="nav-cta">
              <Terminal size={14} /> Dashboard
            </Link>
          ) : (
            <Link to="/auth" className="nav-cta">
              <Terminal size={14} /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
