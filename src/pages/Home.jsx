import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const sponsors = [
  { name: "Google Gemini", logo: "/GeminiIcon.png", url: "https://gemini.google.com" },
  { name: "GitHub", logo: "/github.png", url: "https://github.com" },
  { name: "Outback", logo: "/OutbackLogo.png", url: "https://locations.outback.com" },
  { name: "Skits", logo: "/Skits.png", url: "" },
  { name: "Minorities In STEM", logo: "/Minorities.png", url: "https://www.minoritiesinstem.org/" },
];

const events = [
  {
    title: "Hackday: Snowflake",
    status: "Upcoming",
    date: "June 20, 2026",
    place: "TBA",
    image: "/backart2.png",
    action: <button className="event-action muted" disabled>Registration open soon</button>,
  },
  {
    title: "WaveHack GameJam",
    status: "Upcoming",
    date: "June 28, 2026",
    place: "TBA",
    image: "/backart.png",
    action: null,
  },
  {
    title: "Hackday: GitHub",
    status: "Finished",
    date: "May 23, 2026",
    place: "5202 McGinnis Ferry Rd, Alpharetta, GA",
    image: "/event6.jpg",
    finished: true,
  },
  {
    title: "Hackday: Gemini",
    status: "Finished",
    date: "February 21, 2026",
    place: "Code Ninjas, Cumming, GA",
    image: "/event.jpeg",
    finished: true,
  },
];

const projects = [
  {
    title: "Shotline AI",
    maker: "Hackday: Gemini",
    description: "An AI that helps filter your camera roll built by Harshit Chaturvedi & Aditya Ravuri.",
    image: "/shotline.png",
    url: "shotline-ai-five.vercel.app",
  },
  {
    title: "TrialTwin",
    maker: "Hackday: GitHub",
    description: "A pre-recruitment simulator built by Smyan Reddy.",
    image: "/trialtwin.png",
    url: "https://github.com/math12345678/trialtwin",
  },
  {
    title: "Vector Supply",
    maker: "Hackday: GitHub",
    description: "Creates AI supply chains, built by Aaryan Nadugauda & Himaghna R.",
    image: "/supplychain.png",
    url: "https://supply-vector.vercel.app",
  },
  {
    title: "FitForge",
    maker: "Hackday: Gemini",
    description: "Generate outfits based on your closet, built by Shridhar Chavan.",
    image: "/fitforge.png",
    url: "v0-fitforge-website-design.vercel.app",
  },
];

function ProjectCarousel() {
  const track = [...projects, ...projects, ...projects];

  return (
    <section id="projects" className="section projects-section">
      <div className="section-heading center">
        <p className="eyebrow">Made in the wave</p>
        <h2>Projects built at WaveHack.</h2>
      </div>
      <div className="proj-belt-outer">
        <div className="proj-belt">
          {track.map((p, i) => (
            <article key={i} className="proj-card">
              <div className="proj-card-img">
                <img src={p.image} alt={p.title} />
              </div>
              <div className="proj-card-body">
                <p className="proj-card-maker">{p.maker}</p>
                <h3 className="proj-card-title">{p.title}</h3>
                <p className="proj-card-desc">{p.description}</p>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="proj-card-link">
                  Try it out <ArrowRight size={13} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SponsorWall() {
  return (
    <section id="sponsors" className="section sponsors-section">
      <div className="section-heading center">
        <p className="eyebrow">Backed by people who believe in teen builders</p>
        <h2>Supported by friends of WaveHack.</h2>
      </div>
      <div className="sponsor-wall">
        {sponsors.map((sponsor) => (
          <a
            key={sponsor.name}
            href={sponsor.url || "#sponsors"}
            target={sponsor.url ? "_blank" : undefined}
            rel={sponsor.url ? "noopener noreferrer" : undefined}
            className="sponsor-tile"
          >
            <img src={sponsor.logo} alt={sponsor.name} />
            <span>{sponsor.name}</span>
          </a>
        ))}
      </div>
      <p className="sponsor-note">
        Every prize, meal, workshop, and weird little demo hour exists because someone decided teen builders matter.
      </p>
    </section>
  );
}

const PROOF_PATH_DESKTOP = "M 480 0 C 480 52 105 52 105 105 C 105 158 480 200 480 250 C 480 300 855 280 855 325 C 855 370 480 415 480 460 C 480 505 105 498 105 535 C 105 572 480 610 480 640";
const PROOF_PATH_MOBILE  = "M 200 0 C 500 20 500 65 200 80 C -100 95 -100 235 200 255 C 500 275 500 415 200 430 C -100 445 -100 510 200 520";

function SocialProof() {
  const sectionRef     = useRef(null);
  const logoRef        = useRef(null);
  const dGuideRef      = useRef(null);
  const dRevealRef     = useRef(null);
  const mGuideRef      = useRef(null);
  const mRevealRef     = useRef(null);
  const dLenRef        = useRef(0);
  const mLenRef        = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const logo    = logoRef.current;
    if (!section || !logo || !dGuideRef.current || !mGuideRef.current) return;

    dLenRef.current = dGuideRef.current.getTotalLength();
    dRevealRef.current.setAttribute("stroke-dasharray",  dLenRef.current);
    dRevealRef.current.setAttribute("stroke-dashoffset", dLenRef.current);

    mLenRef.current = mGuideRef.current.getTotalLength();
    mRevealRef.current.setAttribute("stroke-dasharray",  mLenRef.current);
    mRevealRef.current.setAttribute("stroke-dashoffset", mLenRef.current);

    const update = () => {
      const mobile    = window.innerWidth < 680;
      const guidePath = mobile ? mGuideRef.current  : dGuideRef.current;
      const revPath   = mobile ? mRevealRef.current : dRevealRef.current;
      const totalLen  = mobile ? mLenRef.current    : dLenRef.current;
      if (!guidePath || !revPath || !totalLen) return;

      const svg = guidePath.ownerSVGElement;
      const ctm = svg.getScreenCTM();
      if (!ctm) return;

      const rect    = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      const t = Math.max(0, Math.min(1,
        (windowH * 0.85 - rect.top) / (rect.height + windowH * 0.35)
      ));
      const dist = t * totalLen;

      const rawPt = guidePath.getPointAtLength(dist);
      const svgPt = svg.createSVGPoint();
      svgPt.x = rawPt.x; svgPt.y = rawPt.y;
      const screenPt = svgPt.matrixTransform(ctm);

      const eps = 12;
      const ptA = guidePath.getPointAtLength(Math.max(0, dist - eps));
      const ptB = guidePath.getPointAtLength(Math.min(totalLen, dist + eps));
      const spA = svg.createSVGPoint(); spA.x = ptA.x; spA.y = ptA.y;
      const spB = svg.createSVGPoint(); spB.x = ptB.x; spB.y = ptB.y;
      const sA = spA.matrixTransform(ctm);
      const sB = spB.matrixTransform(ctm);
      const angle = Math.atan2(sB.y - sA.y, sB.x - sA.x) * (180 / Math.PI);

      logo.style.left      = `${screenPt.x - rect.left}px`;
      logo.style.top       = `${screenPt.y - rect.top}px`;
      logo.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      logo.style.opacity   = "1";

      revPath.setAttribute("stroke-dashoffset", totalLen * (1 - t));
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const stats = [
    { value: "2",    label: "Events hosted"      },
    { value: "100+", label: "Students supported" },
    { value: "$700+",label: "Prizes shipped"     },
  ];

  return (
    <div ref={sectionRef} className="social-proof-section" aria-label="WaveHack impact">
      {/* Desktop S-curve */}
      <svg viewBox="0 0 960 640" className="social-proof-svg proof-svg-desktop" aria-hidden="true" preserveAspectRatio="none">
        <path ref={dGuideRef}  d={PROOF_PATH_DESKTOP} stroke="#3d6ef5" strokeWidth="2"   strokeDasharray="10 8" fill="none" opacity="0.2"  />
        <path ref={dRevealRef} d={PROOF_PATH_DESKTOP} stroke="#3d6ef5" strokeWidth="2.5" fill="none" opacity="0.75" />
      </svg>
      {/* Mobile wave — overflow visible so line sweeps off-screen */}
      <svg viewBox="0 0 400 520" className="social-proof-svg proof-svg-mobile" aria-hidden="true" preserveAspectRatio="none" style={{overflow:"visible"}}>
        <path ref={mGuideRef}  d={PROOF_PATH_MOBILE} stroke="#3d6ef5" strokeWidth="2"   strokeDasharray="10 8" fill="none" opacity="0.2"  />
        <path ref={mRevealRef} d={PROOF_PATH_MOBILE} stroke="#3d6ef5" strokeWidth="2.5" fill="none" opacity="0.75" />
      </svg>
      <img ref={logoRef} src="/Logo.png" alt="" aria-hidden="true" className="social-proof-logo" />
      {stats.map((stat, i) => (
        <div key={stat.label} className={`proof-tile proof-tile-${i}`}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [waveHack26Registered, setWaveHack26Registered] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("wavehack_theme") || "dark");

  useEffect(() => {
    setWaveHack26Registered(localStorage.getItem("wavehack26_registered") === "true");
  }, []);

  useEffect(() => {
    const handleThemeChange = (event) => setTheme(event.detail);
    window.addEventListener("wavehack-theme-change", handleThemeChange);
    return () => window.removeEventListener("wavehack-theme-change", handleThemeChange);
  }, []);

  return (
    <div className={`site-shell ${theme}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap');

        * { box-sizing: border-box; scroll-behavior: smooth; }
        body { margin: 0; background: #161319; }
        a { color: inherit; }

        .site-shell.dark {
          --page-text: #fff8ea;
          --muted-text: #f7dec5;
          --event-title: #fff8ea;
          --sponsor-name: #fff8ea;
          --page-bg:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
            radial-gradient(circle at 20% 18%, rgba(61, 110, 245, 0.28), transparent 32%),
            radial-gradient(circle at 86% 35%, rgba(90, 190, 181, 0.22), transparent 28%),
            linear-gradient(180deg, #24161b 0%, #1d1418 48%, #100c10 100%);
          --section-bg: #1d1418;
          --nav-bg: #24161b;
          --nav-text: #fff8ea;
          --button-bg: #fff4dc;
          --button-text: #21191a;
          --toggle-bg: #3a2228;
          --cream: #fff4dc;
          --ink: #251b1d;
          --shadow: rgba(0,0,0,0.36);
          --accent: #3d6ef5;
          --badge-text: #fff8ea;
          --sponsor-logo-filter: grayscale(1) brightness(0) invert(1);
          --footer-bg:
            linear-gradient(rgba(255,255,255,0.075) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.075) 1px, transparent 1px),
            #050505;
          --footer-text: #fff8ea;
          --footer-link: #c7c0b7;
        }

        .site-shell.light {
          --page-text: #251b1d;
          --muted-text: #5f3f3f;
          --event-title: #fff8ea;
          --sponsor-name: #251b1d;
          --page-bg:
            linear-gradient(rgba(37,27,29,0.075) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,27,29,0.075) 1px, transparent 1px),
            radial-gradient(circle at 18% 16%, rgba(61, 110, 245, 0.18), transparent 30%),
            radial-gradient(circle at 86% 34%, rgba(116, 212, 199, 0.28), transparent 27%),
            linear-gradient(180deg, #fff4dc 0%, #ffeac5 52%, #fff7e8 100%);
          --section-bg: #fff4dc;
          --nav-bg: #fff4dc;
          --nav-text: #251b1d;
          --button-bg: #251b1d;
          --button-text: #fff8ea;
          --toggle-bg: #ffe4b5;
          --cream: #fff4dc;
          --ink: #251b1d;
          --shadow: rgba(37,27,29,0.2);
          --accent: #3d6ef5;
          --badge-text: #fff8ea;
          --sponsor-logo-filter: none;
          --footer-bg:
            linear-gradient(rgba(37,27,29,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,27,29,0.08) 1px, transparent 1px),
            #fff4dc;
          --footer-text: #251b1d;
          --footer-link: #5f3f3f;
        }

        .site-shell {
          min-height: 100vh;
          color: var(--page-text);
          font-family: 'Inter', system-ui, sans-serif;
          background: var(--page-bg);
          background-size: 48px 48px, 48px 48px, auto, auto, auto;
          overflow-x: hidden;
        }

        .hero {
          min-height: 92vh;
          position: relative;
          display: grid;
          place-items: center;
          padding: 92px 24px 96px;
          isolation: isolate;
          overflow: hidden;
        }
        .hero-wave-deco {
          position: absolute;
          bottom: -1px;
          left: -2%;
          width: 104%;
          height: 88px;
          display: block;
          z-index: 2;
          pointer-events: none;
        }
        .post-hero {
          background: var(--section-bg);
          position: relative;
          margin-top: -1px;
        }

        .hero-inner {
          width: min(880px, 100%);
          text-align: center;
          position: relative;
          z-index: 2;
        }
        .flag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 15px;
          margin-bottom: 24px;
          color: var(--ink);
          background: var(--cream);
          border: 3px solid var(--ink);
          border-radius: 999px;
          box-shadow: 6px 6px 0 var(--ink);
          font-weight: 900;
          transform: rotate(-2deg);
        }
        .hero h1 {
          margin: 0 auto 18px;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(58px, 10vw, 128px);
          line-height: 0.86;
          letter-spacing: 0;
          max-width: 850px;
        }
        .hero h1 span {
          display: inline-block;
          color: #74d4c7;
          text-shadow: 4px 4px 0 #31284b;
        }
        .hero-copy {
          max-width: 640px;
          margin: 0 auto 34px;
          color: var(--muted-text);
          font-size: clamp(17px, 2vw, 22px);
          line-height: 1.5;
          font-weight: 700;
        }
        .hero-actions {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .cream-button,
        .red-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 48px;
          padding: 13px 24px;
          border-radius: 999px;
          font-weight: 900;
          text-decoration: none;
          border: 2px solid var(--ink);
          box-shadow: 5px 5px 0 var(--ink);
          transition: transform 180ms ease, box-shadow 180ms ease;
        }
        .cream-button { background: var(--button-bg); color: var(--button-text); }
        .red-button { background: var(--accent); color: #fff8ea; }
        .cream-button:hover,
        .red-button:hover {
          transform: translate(2px, 2px);
          box-shadow: 3px 3px 0 var(--ink);
        }

        .photo-stack {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }
        .photo {
          position: absolute;
          width: clamp(120px, 15vw, 230px);
          aspect-ratio: 4 / 3;
          object-fit: cover;
          border: 5px solid var(--cream);
          border-radius: 10px;
          box-shadow: 0 18px 40px rgba(0,0,0,0.42);
        }
        .photo.one   { left: -28px; top: 11%; transform: rotate(-9deg); }
        .photo.two   { right: -16px; top: 9%; transform: rotate(8deg); }
        .photo.three { left: -18px; top: 43%; transform: rotate(-7deg); }
        .photo.four  { right: -12px; top: 41%; transform: rotate(10deg); }
        .photo.five  { left: 3%; bottom: 7%; transform: rotate(-8deg); }
        .photo.six   { right: 4%; bottom: 6%; transform: rotate(9deg); }
        .sticker {
          position: absolute;
          display: grid;
          place-items: center;
          width: 82px;
          height: 82px;
          border-radius: 24px;
          border: 4px solid var(--cream);
          background: #74d4c7;
          color: #21191a;
          font-weight: 900;
          box-shadow: 8px 8px 0 rgba(0,0,0,0.4);
          transform: rotate(-12deg);
        }
        .sticker.left { left: 12%; top: 62%; }
        .sticker.right { right: 15%; top: 58%; background: #f6c453; transform: rotate(11deg); }

        .section {
          width: min(1240px, calc(100% - 40px));
          margin: 0 auto;
          padding: 94px 0;
          position: relative;
        }
        .section-heading {
          margin-bottom: 34px;
        }
        .section-heading.center { text-align: center; }
        .section-heading.split {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 20px;
        }
        .eyebrow {
          margin: 0 0 8px;
          color: #f6c453;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 13px;
        }
        .section h2 {
          margin: 0;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(38px, 6vw, 72px);
          line-height: 0.96;
          letter-spacing: 0;
        }

        .social-proof-section {
          position: relative;
          width: min(960px, calc(100% - 40px));
          margin: 0 auto;
          padding-top: 48px;
          height: 640px;
          z-index: 5;
        }
        .social-proof-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .proof-svg-desktop { display: block; }
        .proof-svg-mobile  { display: none; }
        .social-proof-logo {
          position: absolute;
          width: 60px;
          height: 60px;
          object-fit: contain;
          pointer-events: none;
          z-index: 10;
          opacity: 0;
          left: 50%;
          top: 0;
          transform: translate(-50%, -50%);
          filter: drop-shadow(0 4px 14px rgba(0,0,0,0.28));
          will-change: left, top, transform;
        }
        .proof-tile {
          position: absolute;
          background: #fff4dc;
          color: #21191a;
          border: 3px solid #21191a;
          border-radius: 8px;
          padding: 20px 26px;
          text-align: center;
          width: 200px;
          z-index: 5;
        }
        .proof-tile strong {
          display: block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(34px, 4.5vw, 52px);
          line-height: 1;
        }
        .proof-tile span {
          display: block;
          margin-top: 8px;
          font-weight: 900;
          font-size: 14px;
        }
        .proof-tile-0 {
          left: 0;
          top: 40px;
          box-shadow: 6px 6px 0 #74d4c7;
          transform: rotate(-2deg);
        }
        .proof-tile-1 {
          right: 0;
          top: 260px;
          box-shadow: 6px 6px 0 #3d6ef5;
          transform: rotate(2deg);
        }
        .proof-tile-2 {
          left: 0;
          bottom: 40px;
          box-shadow: 6px 6px 0 #f6c453;
          transform: rotate(-1deg);
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
        }
        .event-card {
          min-height: 290px;
          position: relative;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          border-radius: 8px;
          border: 3px solid #251b1d;
          background: #fff4dc;
          box-shadow: 8px 8px 0 rgba(0,0,0,0.35);
        }
        .event-card img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.9) contrast(0.86);
        }
        .event-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(17,17,20,0.08), rgba(17,17,20,0.86));
        }
        .event-content {
          width: 100%;
          position: relative;
          z-index: 1;
          padding: 26px;
        }
        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 14px;
          padding: 7px 12px;
          border-radius: 999px;
          color: #21191a;
          background: #f6c453;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
        }
        .event-card.finished { filter: grayscale(0.35); }
        .event-card.finished .status-pill { background: #74d4c7; }
        .event-card h3 {
          margin: 0 0 14px;
          font-size: clamp(26px, 4vw, 42px);
          font-family: 'Space Grotesk', sans-serif;
          line-height: 1;
          color: var(--event-title);
        }
        .event-meta {
          display: grid;
          gap: 8px;
          color: #f7dec5;
          font-weight: 800;
        }
        .event-meta span {
          display: inline-flex;
          align-items: center;
          gap: 9px;
        }
        .event-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-top: 22px;
          flex-wrap: wrap;
        }
        .event-action {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 42px;
          padding: 10px 16px;
          border-radius: 999px;
          border: 2px solid #fff4dc;
          background: #3d6ef5;
          color: var(--page-text);
          font-weight: 900;
          text-decoration: none;
          cursor: pointer;
        }
        .event-action.ghost { background: #fff4dc; color: #21191a; }
        .event-action.muted {
          background: rgba(255,244,220,0.18);
          color: #fff4dc;
          cursor: not-allowed;
        }

        .projects-section { padding-top: 60px; }

        .proj-belt-outer {
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          width: 100vw;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%);
          padding: 10px 0 18px;
        }

        .proj-belt {
          display: flex;
          gap: 22px;
          width: max-content;
          animation: proj-scroll 28s linear infinite;
        }
        .proj-belt:hover { animation-play-state: paused; }

        @keyframes proj-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }

        .proj-card {
          width: 272px;
          flex-shrink: 0;
          border: 3px solid #251b1d;
          border-radius: 8px;
          background: #fff4dc;
          color: #21191a;
          overflow: hidden;
          box-shadow: 5px 5px 0 #251b1d;
          transition: transform 200ms ease, box-shadow 200ms ease;
        }
        .proj-card:hover {
          transform: translateY(-5px);
          box-shadow: 5px 10px 0 #251b1d;
        }
        .proj-card-img {
          position: relative;
          height: 172px;
          background: #21191a;
          overflow: hidden;
        }
        .proj-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .proj-card-body {
          padding: 16px 18px 18px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .proj-card-maker {
          margin: 0;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: #3d6ef5;
        }
        .proj-card-title {
          margin: 0;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.1;
        }
        .proj-card-desc {
          margin: 4px 0 8px;
          font-size: 13px;
          line-height: 1.5;
          font-weight: 700;
          color: #5a3d40;
          flex: 1;
        }
        .proj-card-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          font-weight: 900;
          color: #3d6ef5;
          text-decoration: none;
          margin-top: 2px;
        }
        .proj-card-link:hover { text-decoration: underline; }

        .sponsors-section {
          text-align: center;
        }
        .sponsor-wall {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 26px 42px;
          margin: 40px auto 34px;
        }
        .sponsor-tile {
          display: grid;
          place-items: center;
          gap: 12px;
          width: 178px;
          min-height: 144px;
          text-decoration: none;
          color: var(--sponsor-name);
          font-weight: 900;
          transition: transform 180ms ease;
        }
        .sponsor-tile:hover { transform: translateY(-5px) rotate(-1deg); }
        .sponsor-tile img {
          max-width: 132px;
          max-height: 76px;
          object-fit: contain;
          filter: var(--sponsor-logo-filter);
        }
        .sponsor-tile:nth-child(4) img,
        .sponsor-tile:nth-child(5) img {
          filter: none;
          background: #fff4dc;
          border-radius: 8px;
          padding: 8px;
        }
        .sponsor-note {
          max-width: 760px;
          margin: 0 auto;
          color: var(--muted-text);
          font-size: 18px;
          line-height: 1.6;
          font-weight: 700;
        }

        .earn-section {
          position: relative;
          overflow: hidden;
        }
        .earn-section::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 12% 60%, rgba(246, 196, 83, 0.14), transparent 28%),
            radial-gradient(circle at 88% 30%, rgba(116, 212, 199, 0.12), transparent 26%);
        }
        .earn-showcase {
          position: relative;
          display: grid;
          gap: 28px;
        }
        .earn-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          align-items: start;
        }
        .earn-step {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .earn-step:nth-child(1) { transform: rotate(-1.5deg); }
        .earn-step:nth-child(2) { transform: rotate(1deg); margin-top: 18px; }
        .earn-step:nth-child(3) { transform: rotate(-0.5deg); }
        .earn-step-num {
          display: inline-flex;
          align-self: flex-start;
          padding: 6px 12px;
          border: 3px solid #251b1d;
          border-radius: 999px;
          background: #f6c453;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.06em;
        }
        .earn-step-card {
          flex: 1;
          padding: 26px 24px 24px;
          border: 3px solid #251b1d;
          border-radius: 8px;
          background: var(--cream);
          color: #21191a;
          box-shadow: 7px 7px 0 #251b1d;
          transition: transform 180ms ease, box-shadow 180ms ease;
        }
        .earn-step:nth-child(1) .earn-step-card { box-shadow: 7px 7px 0 #74d4c7; }
        .earn-step:nth-child(2) .earn-step-card { box-shadow: 7px 7px 0 #f6c453; }
        .earn-step:nth-child(3) .earn-step-card { box-shadow: 7px 7px 0 #3d6ef5; }
        .earn-step-card:hover {
          transform: translate(2px, 2px);
          box-shadow: 5px 5px 0 #251b1d;
        }
        .earn-step-icon {
          display: grid;
          place-items: center;
          width: 52px;
          height: 52px;
          margin-bottom: 16px;
          border: 3px solid #251b1d;
          border-radius: 14px;
          background: #74d4c7;
          color: #21191a;
          transform: rotate(-6deg);
        }
        .earn-step:nth-child(2) .earn-step-icon { background: #f6c453; transform: rotate(5deg); }
        .earn-step:nth-child(3) .earn-step-icon { background: #3d6ef5; color: #fff8ea; transform: rotate(-3deg); }
        .earn-step-points {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(34px, 4.5vw, 52px);
          line-height: 1;
          font-weight: 700;
        }
        .earn-step-label {
          display: block;
          margin: 8px 0 14px;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #5a3d40;
        }
        .earn-step-card p {
          margin: 0;
          font-weight: 800;
          line-height: 1.5;
          font-size: 15px;
          color: #5a3d40;
        }
        .earn-payout-banner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          padding: 22px 28px;
          border: 3px solid #251b1d;
          border-radius: 999px;
          background: #74d4c7;
          color: #21191a;
          box-shadow: 8px 8px 0 #251b1d;
          font-weight: 800;
          font-size: clamp(16px, 2.2vw, 20px);
          transform: rotate(-0.8deg);
        }
        .earn-payout-banner strong {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(22px, 3vw, 32px);
        }
        .earn-payout-banner svg {
          flex-shrink: 0;
          color: #21191a;
        }
        .earn-note {
          text-align: center;
          margin-top: 30px;
          color: var(--muted-text);
          font-weight: 800;
          font-size: 16px;
          position: relative;
        }

        .footer {
          margin-top: 90px;
          padding: 72px 24px 34px;
          background: var(--footer-bg);
          background-size: 48px 48px;
          border-top: 3px solid #251b1d;
        }
        .footer-inner {
          width: min(1200px, 100%);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 42px;
        }
        .footer-logo {
          display: inline-block;
          padding: 13px 22px;
          margin-bottom: 24px;
          background: #fff4dc;
          color: #050505;
          border-radius: 50% 44% 48% 42%;
          font-size: 30px;
          font-weight: 900;
          transform: rotate(-3deg);
        }
        .footer p {
          margin: 0 0 18px;
          color: var(--footer-text);
          font-weight: 900;
        }
        .socials {
          display: flex;
          gap: 16px;
          margin-top: 22px;
        }
        .socials a {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          color: var(--footer-text);
          border: 2px solid var(--footer-text);
          border-radius: 10px;
          text-decoration: none;
        }
        .footer h3 {
          margin: 0 0 18px;
          color: #f6c453;
          font-size: 17px;
        }
        .footer nav {
          display: grid;
          gap: 12px;
        }
        .footer nav a {
          color: var(--footer-link);
          text-decoration: none;
          font-weight: 800;
        }
        .footer-bottom {
          width: min(1200px, 100%);
          margin: 56px auto 0;
          padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,0.16);
          color: var(--footer-link);
          font-size: 14px;
          font-weight: 700;
        }

        @media (max-width: 980px) {
          .photo.one, .photo.two { top: 12%; opacity: 0.38; }
          .photo.three, .photo.four, .photo.five, .photo.six, .photo.seven, .sticker { display: none; }
          .events-grid, .project-card, .earn-steps, .footer-inner { grid-template-columns: 1fr; }
          .project-media { min-height: 300px; }
          .section-heading.split { align-items: start; flex-direction: column; }
        }
        @media (max-width: 680px) {
          .hero { min-height: 86vh; padding-top: 72px; }
          .hero h1 { font-size: clamp(54px, 18vw, 82px); }
          .social-proof-section { height: 520px; overflow: visible; }
          .proof-svg-desktop { display: none; }
          .proof-svg-mobile  { display: block; }
          .proof-tile { width: calc(100% - 40px); }
          .proof-tile-0 {
            left: 50% !important;
            top: 20px;
            transform: translateX(-50%) !important;
          }
          .proof-tile-1 {
            left: 50% !important;
            right: auto !important;
            top: 195px;
            transform: translateX(-50%) !important;
          }
          .proof-tile-2 {
            left: 50% !important;
            bottom: auto;
            top: 370px;
            transform: translateX(-50%) !important;
          }
          .section { width: min(100% - 28px, 1240px); padding: 70px 0; }
          .event-content { padding: 20px; }
          .sponsor-tile { width: 132px; }
          .earn-steps { grid-template-columns: 1fr; }
          .earn-step:nth-child(2) { margin-top: 0; }
          .earn-step { transform: none !important; }
          .earn-payout-banner { transform: none; border-radius: 12px; }
        }
      `}</style>

      <section className="hero">
        <div className="photo-stack" aria-hidden="true">
          <img className="photo one"   src="/event.jpeg"  alt="" />
          <img className="photo two"   src="/event2.jpeg" alt="" />
          <img className="photo three" src="/event7.jpg" alt="" />
          <img className="photo four"  src="/event4.jpg"  alt="" />
          <img className="photo five"  src="/event5.jpg"  alt="" />
          <img className="photo six"   src="/event6.jpg"  alt="" />
          <div className="sticker left">ship!</div>
          <div className="sticker right">demo</div>
        </div>
        <div className="hero-inner">
          <div className="flag"><Sparkles size={18} /> WaveHack is back for 2026</div>
          <h1>
            <span>Teens</span> building the future.
          </h1>
          <p className="hero-copy">
            Free events, prizes, friends, late-night ideas, and enough momentum to turn a weekend prototype into something real.
          </p>
          <div className="hero-actions">
            <a href="#events" className="red-button">See events <ArrowRight size={18} /></a>
            <a href="https://tally.so/r/MeMOj8" target="_blank" rel="noopener noreferrer" className="cream-button">
              Volunteer <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <svg className="hero-wave-deco" viewBox="0 0 1440 88" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,44 C180,4 360,84 540,44 C720,4 900,84 1080,44 C1260,4 1440,84 1440,44 L1440,88 L0,88 Z" fill="var(--section-bg)" />
          <path d="M0,44 C180,4 360,84 540,44 C720,4 900,84 1080,44 C1260,4 1440,84 1440,44" fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="2" />
          <path d="M0,58 C200,18 400,98 600,58 C800,18 1000,98 1200,58 C1300,38 1380,72 1440,58" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />
        </svg>
      </section>

      <div className="post-hero">
      <SocialProof />

      <ProjectCarousel />

      <section id="events" className="section">
        <div className="section-heading center">
          <p className="eyebrow">You can actually go</p>
          <h2>Upcoming and recent events.</h2>
        </div>
        <div className="events-grid">
          {events.map((event) => (
            <article key={event.title} className={`event-card ${event.finished ? "finished" : ""}`}>
              <img src={event.image} alt={`${event.title} event`} />
              <div className="event-content">
                <span className="status-pill">
                  {event.finished ? <CheckCircle size={14} /> : <Zap size={14} />}
                  {event.status}
                </span>
                <h3>{event.title}</h3>
                <div className="event-meta">
                  <span><Calendar size={18} /> {event.date}</span>
                  <span><MapPin size={18} /> {event.place}</span>
                </div>
                {(event.title === "WaveHack GameJam" || event.action) && (
                  <div className="event-footer">
                    {event.title === "WaveHack GameJam" && (
                    waveHack26Registered ? (
                      <button className="event-action muted" disabled><CheckCircle size={16} /> Registered</button>
                    ) : (
                      <Link to="/signup" className="event-action">Register <ArrowRight size={16} /></Link>
                    )
                    )}
                    {event.action}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <SponsorWall />

      <section className="section earn-section" aria-label="How you can earn money">
        <div className="section-heading center">
          <p className="eyebrow">Points that pay out</p>
          <h2>How you can earn money.</h2>
        </div>
        <div className="earn-showcase">
          <div className="earn-steps">
            <div className="earn-step">
              <span className="earn-step-num">01</span>
              <div className="earn-step-card">
                <div className="earn-step-icon"><Star size={26} /></div>
                <div className="earn-step-points">+50 pts</div>
                <span className="earn-step-label">per referral</span>
                <p>Share your unique code. Every friend who joins adds 50 points to your total.</p>
              </div>
            </div>
            <div className="earn-step">
              <span className="earn-step-num">02</span>
              <div className="earn-step-card">
                <div className="earn-step-icon"><Users size={26} /></div>
                <div className="earn-step-points">+10 pts</div>
                <span className="earn-step-label">sign-up bonus</span>
                <p>Use a referral code when you register and start your journey with a head start.</p>
              </div>
            </div>
            <div className="earn-step">
              <span className="earn-step-num">03</span>
              <div className="earn-step-card">
                <div className="earn-step-icon"><Zap size={26} /></div>
                <div className="earn-step-points">Ship it</div>
                <span className="earn-step-label">build &amp; share</span>
                <p>Build your project, demo it at an event, and stack points every time you show up.</p>
              </div>
            </div>
          </div>
          <div className="earn-payout-banner">
            <Zap size={24} />
            <span><strong>500 pts = $3</strong> — redeem for real cash, not gift cards</span>
          </div>
        </div>
        <p className="earn-note">Points stack across every event. The more you build, the more you earn.</p>
      </section>
      </div>

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">WAVEHACK</div>
            <p>For teen builders, by teen builders.</p>
            <p>wavehackofficial@gmail.com</p>
            <div className="socials">
              <a href="https://groupme.com/join_group/113593335/tHhxoCgi" target="_blank" rel="noopener noreferrer" aria-label="GroupMe"><MessageSquare size={20} /></a>
              <a href="https://www.instagram.com/wavehack_26/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="https://www.linkedin.com/company/wavehack/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="mailto:wavehackofficial@gmail.com" aria-label="Email"><Mail size={20} /></a>
            </div>
          </div>
          <div>
            <h3>WaveHack</h3>
            <nav>
              <a href="#events">Events</a>
              <a href="#projects">Projects</a>
              <a href="#sponsors">Sponsors</a>
              <Link to="/leaderboard">Leaderboard</Link>
            </nav>
          </div>
          <div>
            <h3>Join in</h3>
            <nav>
              <Link to="/signup">Register</Link>
              <a href="https://tally.so/r/MeMOj8" target="_blank" rel="noopener noreferrer">Volunteer</a>
              <Link to="/auth">Login</Link>
              <Link to="/certificates">Certificates</Link>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} WaveHack. Built for students who ship before they feel ready.
        </div>
      </footer>
    </div>
  );
}
