import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Calendar,
  MapPin,
  ArrowRight,
  CheckCircle,
  ArrowUpRight,
  ExternalLink,
  Terminal,
  Instagram,
  Linkedin,
  Mail,
  MessageSquare,
  Zap,
  Star,
  DollarSign,
  Users,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

/* ================= MATRIX ANIMATED BACKGROUND ================= */

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

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

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
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(160deg, #020804 0%, #041208 40%, #030a05 70%, #010402 100%)",
        }}
      />
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, opacity: 0.12 }} />
      <div
        className="float-slow"
        style={{
          position: "absolute",
          top: "10%",
          left: "60%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="float-slower"
        style={{
          position: "absolute",
          top: "50%",
          left: "-10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
    </div>
  );
};

/* ================= TYPEWRITER ================= */

const useTypewriter = (text, speed = 45) => {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i <= text.length) {
        setDisplay(text.slice(0, i));
        i++;
      } else clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return display;
};

/* ================= COUNT UP ================= */

const useCountUp = (target, duration = 1800, start = false) => {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!start) return;
    const raw = String(target);
    const prefix = raw.startsWith("$") ? "$" : "";
    const suffix = raw.replace(/[$0-9]/g, "");
    const numeric = parseFloat(raw.replace(/[^0-9]/g, ""));
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * numeric);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(target);
    };
    requestAnimationFrame(tick);
  }, [start, target, duration]);
  return display;
};

/* ================= SPONSOR CAROUSEL ================= */

const SponsorCarousel = ({ sponsors }) => {
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const speedRef = useRef(1.5);
  const targetRef = useRef(1.5);
  const rafRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const animate = () => {
      if (!track) return;
      const half = track.scrollWidth / 2;
      speedRef.current += (targetRef.current - speedRef.current) * 0.05;
      posRef.current -= speedRef.current;
      if (Math.abs(posRef.current) >= half) posRef.current = 0;
      track.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section
      id="sponsors"
      onMouseEnter={() => (targetRef.current = 0.3)}
      onMouseLeave={() => (targetRef.current = 1.5)}
      style={{
        padding: "56px 0",
        borderTop: "1px solid rgba(16,185,129,0.1)",
        borderBottom: "1px solid rgba(16,185,129,0.1)",
        overflow: "hidden",
        position: "relative",
        zIndex: 10,
        background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.02), transparent)",
      }}
    >
      <p
        style={{
          textAlign: "center",
          fontFamily: "monospace",
          fontSize: 13,
          fontWeight: 600,
          color: "#6ee7b7",
          textTransform: "uppercase",
          letterSpacing: 2,
          marginBottom: 32,
        }}
      >
        Partners &amp; Sponsors
      </p>
      <div ref={trackRef} style={{ display: "flex", gap: 24, width: "max-content" }}>
        {[...sponsors, ...sponsors].map((s, i) => (
          <a
            key={i}
            href={s.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="sponsor-card"
          >
            <div className="sponsor-logo-box">
              <img
                src={s.logo}
                alt={s.name}
                style={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain" }}
              />
            </div>
            <span style={{ fontFamily: "monospace", fontWeight: 600, fontSize: 15, color: "#d1fae5" }}>
              {s.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

/* ================= IMAGE CAROUSEL ================= */
const ImageCarousel = () => {
  const images = ["/event.jpeg", "/event2.jpeg", "/event4.jpg", "/event5.jpg", "/event6.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div style={{
      position: "relative",
      width: "100%",
      maxWidth: "900px",
      margin: "0 auto",
      overflow: "hidden",
      borderRadius: "16px",
      aspectRatio: "16/9",
      background: "rgba(16,185,129,0.02)",
      border: "1px solid rgba(16,185,129,0.15)",
      boxShadow: "0 0 30px rgba(16,185,129,0.1)",
    }}>
      {images.map((img, index) => (
        <img
          key={img}
          src={img}
          alt={`Event ${index + 1}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: currentIndex === index ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
          }}
        />
      ))}
      <div style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px" }}>
        {images.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "4px",
              background: currentIndex === idx ? "#10b981" : "rgba(16,185,129,0.3)",
              boxShadow: currentIndex === idx ? "0 0 10px #10b981" : "none",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          />
        ))}
      </div>
    </div>
  );
};



/* ================= HOME ================= */

export default function Home() {
  const typed = useTypewriter("Surf the coding WAVE. Code for amazing prizes.");

  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const stat1 = useCountUp("2", 1200, statsVisible);
  const stat2 = useCountUp("100+", 1800, statsVisible);
  const stat3 = useCountUp("$700+", 2000, statsVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const [waveHack26Registered, setWaveHack26Registered] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("wavehack26_registered") === "true") {
      setWaveHack26Registered(true);
    }
  }, []);

  const sponsors = [
    { name: "Google Gemini", logo: "/GeminiIcon.png", url: "https://gemini.google.com" },
    { name: "GitHub", logo: "/github.png", url: "https://github.com" },
    { name: "Outback", logo: "/OutbackLogo.png", url: "https://locations.outback.com" },
    { name: "Skits", logo: "/Skits.png", url: "" },
    { name: "Minorities In Stem", logo: "/Minorities.png", url: "https://www.minoritiesinstem.org/" }
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020804",
        color: "#f0fdf4",
        fontFamily: "'Inter', sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; scroll-behavior: smooth; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes glowPulse {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(16,185,129,0.3)); }
          50% { filter: drop-shadow(0 0 16px rgba(16,185,129,0.8)); }
        }
        @keyframes float-stat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.03); }
        }

        .hero-title { animation: fadeUp 0.7s ease both; }
        .hero-sub   { animation: fadeUp 0.7s ease 0.15s both; }
        .hero-cta   { animation: fadeUp 0.7s ease 0.3s both; }
        .cursor     { animation: pulse-slow 1s step-end infinite; }
        .float-slow { animation: float 6s ease-in-out infinite; }
        .float-slower { animation: float 8s ease-in-out infinite reverse; }
        .pulse-glow { animation: glowPulse 3s infinite; }

        .impact-stat {
          text-align: center;
          animation: float-stat 4s ease-in-out infinite;
        }
        .impact-stat.delay-1 { animation-delay: 0s; }
        .impact-stat.delay-2 { animation-delay: 1.3s; }
        .impact-stat.delay-3 { animation-delay: 2.6s; }

        .stat-number {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 800;
          font-size: 52px;
          background: linear-gradient(100deg, #6ee7b7 0%, #10b981 45%, #047857 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
          letter-spacing: -1px;
        }
        .stat-label {
          color: #6ee7b7;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          opacity: 0.8;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 36px;
          background: #10b981;
          color: #020804;
          font-weight: 700;
          font-size: 15px;
          font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 6px;
          box-shadow: 0 0 20px rgba(16,185,129,0.2);
          transition: all 0.3s ease;
          border: 1px solid transparent;
          letter-spacing: 0.5px;
        }
        .btn-primary:hover {
          background: #34d399;
          box-shadow: 0 0 30px rgba(16,185,129,0.5);
          transform: translateY(-2px);
        }

        .btn-hollow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 36px;
          background: transparent;
          color: #10b981;
          font-weight: 700;
          font-size: 15px;
          font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 6px;
          border: 1px solid #10b981;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
        }
        .btn-hollow:hover {
          background: rgba(16,185,129,0.08);
          box-shadow: 0 0 20px rgba(16,185,129,0.2);
          transform: translateY(-2px);
          color: #6ee7b7;
          border-color: #6ee7b7;
        }

        .btn-register {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          background: #10b981;
          color: #020804;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 13px;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 6px;
          border: none;
          letter-spacing: 1px;
          box-shadow: 0 0 20px rgba(16,185,129,0.25);
          transition: all 0.3s ease;
          cursor: pointer;
          white-space: nowrap;
        }
        .btn-register:hover {
          background: #34d399;
          box-shadow: 0 0 32px rgba(16,185,129,0.5);
          transform: translateY(-2px);
        }

        .btn-register:disabled {
          background: rgba(16,185,129,0.35);
          color: #94a3b8;
          box-shadow: none;
          cursor: not-allowed;
          transform: none;
        }

        .sponsor-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 0 40px;
          height: 96px;
          min-width: 280px;
          background: rgba(16,185,129,0.03);
          border: 1px solid rgba(16,185,129,0.15);
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .sponsor-card:hover {
          border-color: rgba(16,185,129,0.5);
          background: rgba(16,185,129,0.08);
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        .sponsor-logo-box {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          background: rgba(255,255,255,0.02);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.05);
          flex-shrink: 0;
        }

        .event-card {
          background: linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(4,120,87,0.05) 100%);
          border: 1px solid rgba(16,185,129,0.15);
          border-radius: 16px;
          padding: 40px 48px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 32px;
          transition: all 0.3s ease;
        }
        .event-card:hover {
          border-color: rgba(16,185,129,0.4);
          box-shadow: 0 0 30px rgba(16,185,129,0.1);
        }

        .social-link {
          color: #4b5563;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .social-link:hover {
          color: #10b981;
          transform: translateY(-2px);
          filter: drop-shadow(0 0 8px rgba(16,185,129,0.4));
        }
      `}</style>

      <MatrixBackground />
      <Navbar />

      {/* ─── HERO ─── */}
      <section
        style={{
          position: "relative",
          zIndex: 10,
          paddingTop: 180,
          paddingBottom: 100,
          paddingLeft: 24,
          paddingRight: 24,
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h1
            className="hero-title float-slow"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(56px, 10vw, 96px)",
              lineHeight: 0.9,
              marginBottom: 24,
            }}
          >
            <span
              style={{
                background: "linear-gradient(100deg, #6ee7b7 0%, #10b981 45%, #047857 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Wave
            </span>
            <span style={{ color: "#f0fdf4" }}>Hack</span>
          </h1>

          <div
            className="hero-sub"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              background: "rgba(16,185,129,0.05)",
              border: "1px solid rgba(16,185,129,0.2)",
              borderRadius: 6,
              padding: "10px 20px",
              marginBottom: 44,
            }}
          >
            <span style={{ color: "#059669", marginRight: 8, fontWeight: 600, fontFamily: "monospace" }}>$</span>
            <span style={{ color: "#a7f3d0", fontSize: 16, fontFamily: "'JetBrains Mono', monospace" }}>{typed}</span>
            <span
              className="cursor"
              style={{ display: "inline-block", width: 2, height: 18, background: "#10b981", marginLeft: 2 }}
            />
          </div>

          <div className="hero-cta" style={{ marginBottom: 48, display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <a href="#events" className="btn-primary">
              View Events <ArrowRight size={16} />
            </a>
            <a href="https://tally.so/r/MeMOj8" target="_blank" rel="noopener noreferrer" className="btn-hollow">
              Volunteer <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── SPONSORS ─── */}
      <SponsorCarousel sponsors={sponsors} />

      {/* ─── IMAGE CAROUSEL ─── */}
      <section style={{ position: "relative", zIndex: 10, padding: "48px 24px 96px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 32, color: "#f0fdf4" }}>
            Build, compete, and win
          </h2>
        </div>
        <ImageCarousel />
      </section>

      {/* ─── IMPACT BANNER ─── */}
      <section
        ref={statsRef}
        style={{
          position: "relative",
          zIndex: 10,
          padding: "72px 24px",
          display: "flex",
          justifyContent: "center",
          gap: "80px",
          flexWrap: "wrap",
          background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.03), transparent)",
          borderTop: "1px solid rgba(16,185,129,0.1)",
          borderBottom: "1px solid rgba(16,185,129,0.1)",
          marginBottom: "96px",
        }}
      >
        <div className="impact-stat delay-1">
          <h3 className="stat-number">{stat1}</h3>
          <p className="stat-label">Event(s) Hosted</p>
        </div>
        <div style={{ width: 1, background: "rgba(16,185,129,0.15)", alignSelf: "stretch", margin: "8px 0" }} />
        <div className="impact-stat delay-2">
          <h3 className="stat-number">{stat2}</h3>
          <p className="stat-label">Students Supported</p>
        </div>
        <div style={{ width: 1, background: "rgba(16,185,129,0.15)", alignSelf: "stretch", margin: "8px 0" }} />
        <div className="impact-stat delay-3">
          <h3 className="stat-number">{stat3}</h3>
          <p className="stat-label">In Prizes Given</p>
        </div>
      </section>

      {/* ─── HOW POINTS WORK ─── */}
      <section style={{ position: "relative", zIndex: 10, padding: "0 24px 72px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 32, color: "#f0fdf4" }}>
              How Points Work
            </h2>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{
              flex: "1 1 240px", maxWidth: 280,
              background: "linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(4,120,87,0.06) 100%)",
              border: "1px solid rgba(16,185,129,0.18)",
              borderRadius: 12, padding: "28px 24px", textAlign: "center",
            }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Star size={22} color="#10b981" />
                </div>
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: 34,
                background: "linear-gradient(100deg, #6ee7b7 0%, #10b981 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                marginBottom: 8,
              }}>+50 pts</div>
              <p style={{ color: "#d1fae5", fontWeight: 700, fontSize: 15, marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>
                Refer a Friend
              </p>
              <p style={{ color: "#6b7280", fontSize: 13, fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>
                Earn 50 points each time someone signs up using your referral code
              </p>
            </div>

            <div style={{
              flex: "1 1 240px", maxWidth: 280,
              background: "linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(4,120,87,0.06) 100%)",
              border: "1px solid rgba(16,185,129,0.18)",
              borderRadius: 12, padding: "28px 24px", textAlign: "center",
            }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Users size={22} color="#10b981" />
                </div>
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: 34,
                background: "linear-gradient(100deg, #6ee7b7 0%, #10b981 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                marginBottom: 8,
              }}>+10 pts</div>
              <p style={{ color: "#d1fae5", fontWeight: 700, fontSize: 15, marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>
                Use a Referral Code
              </p>
              <p style={{ color: "#6b7280", fontSize: 13, fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>
                Earn 10 points when you sign up using someone else's referral code
              </p>
            </div>

            <div style={{
              flex: "1 1 240px", maxWidth: 280,
              background: "linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(4,120,87,0.06) 100%)",
              border: "1px solid rgba(16,185,129,0.18)",
              borderRadius: 12, padding: "28px 24px", textAlign: "center",
            }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <DollarSign size={22} color="#10b981" />
                </div>
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: 28,
                background: "linear-gradient(100deg, #6ee7b7 0%, #10b981 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                marginBottom: 8,
              }}>500 = $3</div>
              <p style={{ color: "#d1fae5", fontWeight: 700, fontSize: 15, marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>
                Redeem Rewards
              </p>
              <p style={{ color: "#6b7280", fontSize: 13, fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>
                Cash out your points — 500 points equals $3 in real value
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div style={{ position: "relative", zIndex: 10, padding: "0 24px", marginBottom: 64 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.25))" }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px rgba(16,185,129,0.6)" }} />
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(16,185,129,0.25), transparent)" }} />
        </div>
      </div>

      {/* ─── EVENTS SECTION ─── */}
      <section id="events" style={{ position: "relative", zIndex: 10, padding: "0 24px 96px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 32,
                color: "#f0fdf4",
              }}
            >
              Hackathons
            </h2>
          </div>

          {/* UPCOMING EVENT — HACKDAY: SNOWFLAKE */}
          <div className="event-card">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <span
                  style={{
                    background: "rgba(16,185,129,0.08)",
                    color: "#34d399",
                    padding: "6px 12px",
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "monospace",
                    border: "1px solid rgba(16,185,129,0.25)",
                  }}
                >
                  Upcoming
                </span>
              </div>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 28, color: "#d1fae5", marginBottom: 16 }}>
                Hackday: Snowflake
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "#6b7280", fontSize: 15 }}>
                  <Calendar size={18} color="#059669" /> June 20, 2026
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "#6b7280", fontSize: 15 }}>
                  <MapPin size={18} color="#059669" /> TBA
                </span>
              </div>
            </div>
            <button className="btn-register" disabled>
              Registration open soon
            </button>
          </div>

          {/* UPCOMING EVENT — WAVEHACK '26 */}
          <div className="event-card">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <span
                  style={{
                    background: "rgba(16,185,129,0.08)",
                    color: "#34d399",
                    padding: "6px 12px",
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "monospace",
                    border: "1px solid rgba(16,185,129,0.25)",
                  }}
                >
                  Upcoming
                </span>
              </div>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 28, color: "#d1fae5", marginBottom: 16 }}>
                WaveHack GameJam
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "#6b7280", fontSize: 15 }}>
                  <Calendar size={18} color="#059669" /> June 28, 2026
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "#6b7280", fontSize: 15 }}>
                  <MapPin size={18} color="#059669" /> TBA
                </span>
              </div>
            </div>
            {waveHack26Registered ? (
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 32px",
                  background: "rgba(16,185,129,0.12)",
                  color: "#10b981",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontSize: 13,
                  textTransform: "uppercase",
                  borderRadius: 6,
                  border: "1px solid rgba(16,185,129,0.35)",
                  letterSpacing: 1,
                  cursor: "default",
                  whiteSpace: "nowrap",
                }}
                disabled
              >
                <CheckCircle size={16} /> Registered
              </button>
            ) : (
              <Link
                to="/signup"
                className="btn-register"
              >
                Register <ArrowRight size={15} />
              </Link>
            )}
          </div>

          {/* FINISHED EVENT — GITHUB */}
          <div className="event-card" style={{ opacity: 0.7, filter: "grayscale(30%)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <span
                  style={{
                    background: "rgba(16,185,129,0.1)",
                    color: "#10b981",
                    padding: "6px 12px",
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "monospace",
                  }}
                >
                  <CheckCircle size={14} /> Finished
                </span>
              </div>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 28, color: "#d1fae5", marginBottom: 16 }}>
                Hackday: Github
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "#6b7280", fontSize: 15 }}>
                  <Calendar size={18} color="#059669" /> May 23, 2026
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "#6b7280", fontSize: 15 }}>
                  <MapPin size={18} color="#059669" /> 5202 McGinnis Ferry Rd, Alpharetta, GA 30005
                </span>
              </div>
            </div>
            <Link
              to="/certificates"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 20,
                padding: "10px 20px",
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.3)",
                borderRadius: 6,
                color: "#10b981",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "monospace",
                textDecoration: "none",
                letterSpacing: "0.05em",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(16,185,129,0.2)";
                e.currentTarget.style.borderColor = "rgba(16,185,129,0.6)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(16,185,129,0.1)";
                e.currentTarget.style.borderColor = "rgba(16,185,129,0.3)";
              }}
            >
              <ExternalLink size={14} /> View Certificates
            </Link>
          </div>

          {/* FINISHED EVENT */}
          <div className="event-card" style={{ opacity: 0.7, filter: "grayscale(30%)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <span
                  style={{
                    background: "rgba(16,185,129,0.1)",
                    color: "#10b981",
                    padding: "6px 12px",
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "monospace",
                  }}
                >
                  <CheckCircle size={14} /> Finished
                </span>
              </div>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 28, color: "#d1fae5", marginBottom: 16 }}>
                Hackday: Gemini
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "#6b7280", fontSize: 15 }}>
                  <Calendar size={18} color="#059669" /> February 21, 2026
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "#6b7280", fontSize: 15 }}>
                  <MapPin size={18} color="#059669" /> Code Ninjas, Cumming, GA
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ─── FOOTER ─── */}
      <footer
        style={{
          position: "relative",
          zIndex: 10,
          borderTop: "1px solid rgba(16,185,129,0.1)",
          padding: "40px 48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          background: "#010402",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 52px)",
            letterSpacing: "0.22em",
            WebkitTextStroke: "1.5px #10b981",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            textTransform: "uppercase",
            userSelect: "none",
            lineHeight: 1,
          }}
        >
          WAVEHACK
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <a href="https://groupme.com/join_group/113593335/tHhxoCgi" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GroupMe Community">
            <MessageSquare size={22} />
          </a>
          <a href="https://www.instagram.com/wavehack_26/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
            <Instagram size={22} />
          </a>
          <a href="https://www.linkedin.com/company/wavehack/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
            <Linkedin size={22} />
          </a>
          <a href="mailto:wavehackofficial@gmail.com" className="social-link" aria-label="Email">
            <Mail size={22} />
          </a>
        </div>

        <span style={{ color: "#374151", fontSize: 12, fontFamily: "monospace", letterSpacing: "0.05em" }}>
          &copy; {new Date().getFullYear()} WaveHack
        </span>
      </footer>
    </div>
  );
}