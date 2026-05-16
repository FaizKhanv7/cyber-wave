import { ExternalLink, MessageSquare, Terminal, ShieldAlert, Mail } from "lucide-react";
import { useRef, useEffect } from "react";
import Navbar from "../components/Navbar";

/* ================= MATRIX BACKGROUND ================= */

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const chars = "01010101010101010101001010101010111100010101".split("");
    const fontSize = 14;
    const columns = width / fontSize;
    const drops = [];
    for (let i = 0; i < columns; i++) drops[i] = Math.random() * -100;

    const draw = () => {
      ctx.fillStyle = "rgba(2, 8, 4, 0.08)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#10b981";
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = "center";
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => { clearInterval(interval); window.removeEventListener("resize", handleResize); };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #020804 0%, #041208 40%, #030a05 70%, #010402 100%)" }} />
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, opacity: 0.12 }} />
      <div style={{ position: "absolute", top: "10%", left: "60%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div style={{ position: "absolute", top: "55%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(52,211,153,0.05) 0%, transparent 70%)", filter: "blur(50px)" }} />
    </div>
  );
};

/* ================= REGISTER PAGE ================= */

export default function Register() {
  return (
    <div style={{ background: "#020804", color: "#f0fdf4", minHeight: "100vh", fontFamily: "'JetBrains Mono', monospace", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; } 50% { opacity: 0; }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 12px rgba(16,185,129,0.2); }
          50%       { box-shadow: 0 0 28px rgba(16,185,129,0.5); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }

        .reg-fade-1 { animation: fadeUp 0.6s ease both; }
        .reg-fade-2 { animation: fadeUp 0.6s ease 0.1s both; }
        .reg-fade-3 { animation: fadeUp 0.6s ease 0.2s both; }
        .reg-fade-4 { animation: fadeUp 0.6s ease 0.3s both; }

        .cursor-blink { animation: blink 1s step-end infinite; display: inline-block; width: 2px; height: 14px; background: #10b981; margin-left: 3px; vertical-align: middle; }

        .reg-card {
          background: rgba(16,185,129,0.01);
          border: 1px solid rgba(107,114,128,0.15);
          border-radius: 8px;
          padding: 48px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .reg-card:hover {
          border-color: rgba(107,114,128,0.2);
          box-shadow: none;
        }
        .reg-card::after {
          content: '';
          position: absolute;
          top: -50%;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent);
          animation: scanline 5s ease-in-out infinite;
        }

        .btn-portal {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 48px;
          background: #10b981;
          color: #020804;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 800;
          font-size: 15px;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 6px;
          letter-spacing: 1px;
          box-shadow: 0 0 24px rgba(16,185,129,0.25);
          transition: all 0.3s ease;
        }
        .btn-portal:hover {
          background: #34d399;
          box-shadow: 0 0 36px rgba(16,185,129,0.5);
          transform: translateY(-3px);
        }

        .resource-card {
          display: block;
          background: rgba(16,185,129,0.02);
          border: 1px solid rgba(16,185,129,0.12);
          border-radius: 8px;
          padding: 32px;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .resource-card:hover {
          border-color: rgba(16,185,129,0.4);
          background: rgba(16,185,129,0.05);
          transform: translateY(-4px);
          box-shadow: 0 16px 32px rgba(0,0,0,0.3), 0 0 20px rgba(16,185,129,0.08);
        }
        .resource-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #6ee7b7, #10b981, #047857);
          border-radius: 8px 0 0 8px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .resource-card:hover::before { opacity: 1; }

        .support-bar {
          border: 1px solid rgba(16,185,129,0.1);
          border-radius: 8px;
          padding: 32px;
          text-align: center;
          background: rgba(16,185,129,0.02);
        }
      `}</style>

      <MatrixBackground />
      <Navbar />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 760, margin: "0 auto", padding: "140px 24px 96px" }}>

        {/* Header */}
        <div className="reg-fade-1" style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 4, background: "rgba(16,185,129,0.05)", color: "#6ee7b7", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, marginBottom: 24 }}>
            <Terminal size={13} />
            Protocol: Secure_Entry_v2.0
            <span className="cursor-blink" />
          </div>

          <h1 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: "clamp(40px, 7vw, 72px)", lineHeight: 1.0, marginBottom: 20, color: "#f0fdf4" }}>
            Initialize_
            <br />
            <span style={{ background: "linear-gradient(100deg, #6ee7b7 0%, #10b981 50%, #047857 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Registration
            </span>
          </h1>

          <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.8, maxWidth: 440, margin: "0 auto" }}>
            Secure your node in the network. Use the portal below to finalize your attendance at the next WaveHack event.
          </p>
        </div>

        {/* Registration Card */}
        <div className="reg-card reg-fade-2" style={{ marginBottom: 48 }}>
          {/* Open badge */}
          <div style={{ position: "absolute", top: 20, right: 20, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.4)", borderRadius: 4, padding: "4px 12px", fontSize: 11, fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: 1 }}>
            Registration_Open
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#10b981", textTransform: "uppercase", letterSpacing: 2 }}>Registration_Live</span>
          </div>

          <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: 26, color: "#d1fae5", marginBottom: 12 }}>
            Secure_Your_Spot
          </h2>
          <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.8, marginBottom: 40, maxWidth: 480 }}>
            Registration for WaveHack is now open. Click below to finalize your attendance through our MLH event portal and lock in your node on the network.
          </p>

          <div style={{ textAlign: "center" }}>
            <a href="https://events.mlh.io/events/13990-wavehack" target="_blank" rel="noopener noreferrer" className="btn-portal">
              Access_Portal <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Resources */}
        <div className="reg-fade-3" style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(16,185,129,0.12)" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#10b981", textTransform: "uppercase", letterSpacing: 3 }}>Resources</span>
            <div style={{ flex: 1, height: 1, background: "rgba(16,185,129,0.12)" }} />
          </div>

          <a href="https://groupme.com/join_group/113593335/tHhxoCgi" target="_blank" rel="noopener noreferrer" className="resource-card">
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
              <div style={{ width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 6, background: "rgba(16,185,129,0.06)", color: "#10b981", flexShrink: 0 }}>
                <MessageSquare size={18} />
              </div>
              <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 16, color: "#d1fae5" }}>GroupMe_Community</h3>
            </div>
            <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>
              Join the community chat. Connect with other participants and form your team before the event.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#10b981", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
              Connect_Now <ExternalLink size={12} />
            </div>
          </a>
        </div>

        {/* Support */}
        <div className="support-bar reg-fade-4">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
            <ShieldAlert size={16} color="#10b981" />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#10b981", textTransform: "uppercase", letterSpacing: 2 }}>Support_Inquiry</span>
          </div>
          <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.7 }}>
            Encountering issues? Contact us directly at{" "}
            <a href="mailto:wavehackofficial@gmail.com" style={{ color: "#10b981", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Mail size={13} /> wavehackofficial@gmail.com
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}