import { useState, useEffect } from "react";

const participants: string[] = [
  "Devraj Kumar", "Harshith Karthikeyan", "Ashrit Talluri",
  "Deven Patel", "Charith Kumar Gunda", "Saaz Kharade", "Prudhvi Chilumooru",
  "Naga Sai Sasidhar Duvvarapu", "Juhi Anandikar", "Arnav Agrawal", "Kaushal Avancha",
  "Arjun Ananda", "Abdumalik Al Musallam", "Venkata Mannem",
  "Abishek Mohan", "Sarthak Bagal",
  "Harshit Chaturvedi", "Anghelo Araujo", "Laasya D",
  "Veer Sanghavi", "Pratyush Raghuvanshi", "Harshit Chaturvedy",
  "Shridhar Chavan", "Aditya Ravuri", "Ritvik Bennur", "Kanishk Khatri",
  "Ali Makhmudov", "Ramcharan Nagisetty",
  "Taran V", "Soham Kashyap",
];

const cornerSVG = `<svg viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
  <polygon points="0,0 130,0 0,130" fill="rgba(0,15,50,0.6)" stroke="none"/>
  <line x1="2" y1="2" x2="120" y2="2" stroke="rgba(0,255,157,0.6)" stroke-width="1.5"/>
  <line x1="2" y1="2" x2="2" y2="120" stroke="rgba(0,255,157,0.6)" stroke-width="1.5"/>
  <line x1="2" y1="2" x2="60" y2="2" stroke="rgba(0,212,255,0.9)" stroke-width="2.5"/>
  <line x1="2" y1="2" x2="2" y2="60" stroke="rgba(0,212,255,0.9)" stroke-width="2.5"/>
  <circle cx="2" cy="2" r="4" fill="#00ff9d"/>
  <line x1="30" y1="2" x2="30" y2="30" stroke="rgba(0,255,157,0.3)" stroke-width="0.5"/>
  <line x1="2" y1="30" x2="30" y2="30" stroke="rgba(0,255,157,0.3)" stroke-width="0.5"/>
  <circle cx="30" cy="30" r="2" fill="rgba(0,212,255,0.5)"/>
  <line x1="10" y1="45" x2="45" y2="10" stroke="rgba(0,212,255,0.2)" stroke-width="0.5"/>
  <line x1="20" y1="65" x2="65" y2="20" stroke="rgba(0,255,157,0.15)" stroke-width="0.5"/>
  <line x1="35" y1="5" x2="5" y2="35" stroke="rgba(0,212,255,0.2)" stroke-width="0.5"/>
</svg>`;

const holoSVG = `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="40" cy="40" r="38" stroke="rgba(0,255,157,0.3)" stroke-width="0.5"/>
  <circle cx="40" cy="40" r="32" stroke="rgba(0,255,157,0.4)" stroke-width="0.5"/>
  <circle cx="40" cy="40" r="24" stroke="rgba(0,255,157,0.5)" stroke-width="0.5"/>
  <circle cx="40" cy="40" r="16" stroke="rgba(0,255,157,0.6)" stroke-width="1"/>
  <circle cx="40" cy="40" r="8" stroke="#00ff9d" stroke-width="1"/>
  <circle cx="40" cy="40" r="3" fill="#00ff9d" opacity="0.8"/>
  <line x1="40" y1="2" x2="40" y2="78" stroke="rgba(0,255,157,0.15)" stroke-width="0.5"/>
  <line x1="2" y1="40" x2="78" y2="40" stroke="rgba(0,255,157,0.15)" stroke-width="0.5"/>
</svg>`;

function downloadCertCanvas(name: string, index: number) {
  const W = 1920, H = 1080;
  const certNum = String(index + 1).padStart(3, "0");
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#071a0c";
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "rgba(0,255,157,0.04)"; ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y < H; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  ctx.strokeStyle = "rgba(0,255,157,0.02)";
  for (let x = 0; x < W; x += 20) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y < H; y += 20) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

  function drawCorner(cx: number, cy: number, fx: number, fy: number) {
    ctx.save(); ctx.translate(cx, cy); ctx.scale(fx, fy);
    ctx.strokeStyle = "rgba(0,255,157,0.6)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(200, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 200); ctx.stroke();
    ctx.strokeStyle = "#00ff9d"; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(100, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 100); ctx.stroke();
    ctx.fillStyle = "#00ff9d";
    ctx.beginPath(); ctx.arc(0, 0, 7, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(0,255,157,0.3)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(60, 0); ctx.lineTo(60, 60); ctx.lineTo(0, 60); ctx.stroke();
    ctx.fillStyle = "rgba(0,255,157,0.5)";
    ctx.beginPath(); ctx.arc(60, 60, 3, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
  drawCorner(24, 24, 1, 1);
  drawCorner(W - 24, 24, -1, 1);
  drawCorner(24, H - 24, 1, -1);
  drawCorner(W - 24, H - 24, -1, -1);

  function ctext(txt: string, y: number, font: string, color: string, spacing = 0) {
    ctx.font = font; ctx.fillStyle = color; ctx.textAlign = "center";
    if (spacing === 0) {
      ctx.fillText(txt, W / 2, y);
    } else {
      const chars = txt.split("");
      const totalW = ctx.measureText(txt).width + spacing * (chars.length - 1);
      let startX = W / 2 - totalW / 2;
      chars.forEach(ch => {
        ctx.fillText(ch, startX + ctx.measureText(ch).width / 2, y);
        startX += ctx.measureText(ch).width + spacing;
      });
    }
  }

  const grad1 = ctx.createLinearGradient(0, 0, W, 0);
  grad1.addColorStop(0, "transparent"); grad1.addColorStop(0.5, "rgba(0,255,157,0.4)"); grad1.addColorStop(1, "transparent");
  ctx.strokeStyle = grad1; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, 420); ctx.lineTo(W, 420); ctx.stroke();

  ctext("CERTIFICATE", 210, "400 108px monospace", "#00ff9d", 6);
  ctext("OF PARTICIPATION", 278, "500 38px Arial, sans-serif", "#ffffff", 8);

  ctx.strokeStyle = grad1; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(W * 0.25, 318); ctx.lineTo(W * 0.75, 318); ctx.stroke();

  ctext("This certificate is proudly presented to", 385, "400 26px Arial, sans-serif", "rgba(255,255,255,0.55)");

  const maxW = W * 0.78;
  const nameUpper = name.toUpperCase();
  let nameFontSize = name.length > 22 ? 68 : name.length > 16 ? 86 : 100;
  ctx.font = `400 ${nameFontSize}px monospace`;
  while (ctx.measureText(nameUpper).width > maxW && nameFontSize > 40) {
    nameFontSize -= 4;
    ctx.font = `400 ${nameFontSize}px monospace`;
  }
  ctext(nameUpper, 500, `400 ${nameFontSize}px monospace`, "#00ff9d");

  ctx.font = "400 24px Arial, sans-serif"; ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.textAlign = "center";
  ctx.fillText("for participating in the 2026 Summer WaveHack Hackathon on May 23, 2026,", W / 2, 598);
  ctx.fillText("demonstrating creativity, technical skill, and entrepreneurial spirit.", W / 2, 632);

  const grad2 = ctx.createLinearGradient(W * 0.3, 0, W * 0.7, 0);
  grad2.addColorStop(0, "transparent"); grad2.addColorStop(0.5, "rgba(255,255,255,0.15)"); grad2.addColorStop(1, "transparent");
  ctx.strokeStyle = grad2; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(W * 0.3, 688); ctx.lineTo(W * 0.7, 688); ctx.stroke();

  ctx.strokeStyle = "rgba(0,255,157,0.4)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(180, 750); ctx.lineTo(520, 750); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(W - 520, 750); ctx.lineTo(W - 180, 750); ctx.stroke();

  ctx.textAlign = "left";
  ctx.fillStyle = "#00ff9d"; ctx.font = "bold 28px monospace";
  ctx.fillText("Rishi Gopinath", 180, 790);
  ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.font = "400 20px Arial, sans-serif";
  ctx.fillText("Co-Founder, WaveHack", 180, 818);

  ctx.textAlign = "right";
  ctx.fillStyle = "#00d4ff"; ctx.font = "bold 28px Arial, sans-serif";
  ctx.fillText("May 23, 2026", W - 180, 790);
  ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.font = "400 20px Arial, sans-serif";
  ctx.fillText("Date", W - 180, 818);

  const hcx = W / 2, hcy = 930;
  [70, 56, 42, 28, 14].forEach((r, i) => {
    ctx.strokeStyle = `rgba(0,255,157,${0.15 + i * 0.09})`; ctx.lineWidth = i === 4 ? 2 : 0.8;
    ctx.beginPath(); ctx.arc(hcx, hcy, r, 0, Math.PI * 2); ctx.stroke();
  });
  ctx.fillStyle = "rgba(0,255,157,0.8)";
  ctx.beginPath(); ctx.arc(hcx, hcy, 5, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.08)"; ctx.font = "16px monospace"; ctx.textAlign = "right";
  ctx.fillText("WH-2026-" + certNum, W - 36, H - 18);

  const link = document.createElement("a");
  link.download = name.replace(/ /g, "_") + "_WaveHack_Certificate.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export default function Certificates() {
  const [query, setQuery] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [view, setView] = useState<"landing" | "cert">("landing");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Inter:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  function showCert(name: string, index: number) {
    setCurrentName(name);
    setCurrentIndex(index);
    setView("cert");
    window.scrollTo(0, 0);
  }

  function handleDownload() {
    setDownloading(true);
    requestAnimationFrame(() => {
      downloadCertCanvas(currentName, currentIndex);
      setDownloading(false);
    });
  }

  const filtered = query.trim()
    ? participants.filter(n => n.toLowerCase().includes(query.toLowerCase().trim()))
    : null;

  // ── Cert View ──
  if (view === "cert") {
    const nameLen = currentName.length;
    const nameFontSize = nameLen > 22
      ? "clamp(18px, 2.8vw, 26px)"
      : nameLen > 16
      ? "clamp(22px, 3.4vw, 32px)"
      : "clamp(26px, 4vw, 40px)";
    const certId = "WH-2026-" + String(currentIndex + 1).padStart(3, "0");

    return (
      <div style={{ background: "#0a1a0f", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 20px", fontFamily: "'Inter', sans-serif" }}>
        <button
          onClick={() => setView("landing")}
          style={{ alignSelf: "flex-start", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", fontSize: 13, padding: "7px 16px", borderRadius: 4, cursor: "pointer", letterSpacing: "0.06em", marginBottom: 28, transition: "all 0.15s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#00ff9d"; (e.currentTarget as HTMLButtonElement).style.color = "#00ff9d"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)"; }}
        >
          ← Back
        </button>

        <div style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Congratulations,</div>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 22, color: "#00ff9d", marginBottom: 28, letterSpacing: "0.06em" }}>
          {currentName.split(" ")[0]}!
        </div>

        <div style={{ width: "min(960px, 100%)", aspectRatio: "960/742", background: "#071a0c", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,255,157,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,157,0.04) 1px, transparent 1px), linear-gradient(rgba(0,255,157,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,157,0.02) 1px, transparent 1px)", backgroundSize: "80px 80px, 80px 80px, 20px 20px, 20px 20px" }} />

          <div style={{ position: "absolute", top: 0, left: 0, width: 130, height: 130 }} dangerouslySetInnerHTML={{ __html: cornerSVG }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: 130, height: 130, transform: "scaleX(-1)" }} dangerouslySetInnerHTML={{ __html: cornerSVG }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: 130, height: 130, transform: "scaleY(-1)" }} dangerouslySetInnerHTML={{ __html: cornerSVG }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 130, height: 130, transform: "scale(-1)" }} dangerouslySetInnerHTML={{ __html: cornerSVG }} />

          <div style={{ position: "relative", zIndex: 2, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 12%" }}>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "clamp(28px, 5.4vw, 48px)", color: "#00ff9d", letterSpacing: "0.15em", textTransform: "uppercase", lineHeight: 1, marginBottom: 8, textShadow: "0 0 20px rgba(0,255,157,0.2)" }}>Certificate</div>
            <div style={{ fontSize: "clamp(11px, 1.8vw, 17px)", fontWeight: 500, color: "#fff", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 20 }}>Of Participation</div>
            <div style={{ width: "100%", height: "0.5px", background: "linear-gradient(to right, transparent, rgba(0,255,157,0.4), transparent)", marginBottom: 16 }} />
            <div style={{ fontSize: "clamp(10px, 1.4vw, 14px)", color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em", marginBottom: 4 }}>This certificate is proudly presented to</div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: nameFontSize, color: "#00ff9d", letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.2, marginBottom: 14, textShadow: "0 0 15px rgba(0,255,157,0.2)" }}>
              {currentName}
            </div>
            <div style={{ fontSize: "clamp(9px, 1.2vw, 13px)", color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em", lineHeight: 1.7, maxWidth: 580, marginBottom: 18 }}>
              for participating in the 2026 Summer WaveHack Hackathon on May 23, 2026,<br />
              demonstrating creativity, technical skill, and entrepreneurial spirit.
            </div>
            <div style={{ width: 340, maxWidth: "60%", height: "0.5px", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)", marginBottom: 14 }} />
            <div style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "0 6%" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
                <div style={{ width: 140, height: "0.5px", background: "rgba(0,255,157,0.4)", marginBottom: 4 }} />
                <div style={{ fontSize: "clamp(10px, 1.4vw, 15px)", fontWeight: 600, color: "#00ff9d", letterSpacing: "0.06em", fontFamily: "'Share Tech Mono', monospace" }}>Rishi Gopinath</div>
                <div style={{ fontSize: "clamp(8px, 1.1vw, 12px)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>Co-Founder, WaveHack</div>
              </div>
              <div style={{ width: 80 }} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
                <div style={{ width: 140, height: "0.5px", background: "rgba(0,255,157,0.4)", marginBottom: 4 }} />
                <div style={{ fontSize: "clamp(10px, 1.4vw, 15px)", fontWeight: 600, color: "#00ff9d", letterSpacing: "0.06em", fontFamily: "'Share Tech Mono', monospace" }}>May 23, 2026</div>
                <div style={{ fontSize: "clamp(8px, 1.1vw, 12px)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>Date</div>
              </div>
            </div>
          </div>

          <div style={{ position: "absolute", bottom: "8%", left: "50%", transform: "translateX(-50%)", width: "10%", zIndex: 2 }} dangerouslySetInnerHTML={{ __html: holoSVG }} />
          <div style={{ position: "absolute", bottom: "2%", right: "3%", fontSize: "clamp(7px, 0.9vw, 9px)", color: "rgba(255,255,255,0.1)", letterSpacing: "0.1em", fontFamily: "monospace", zIndex: 2 }}>{certId}</div>
        </div>

        <button
          onClick={handleDownload}
          disabled={downloading}
          style={{ background: downloading ? "#00cc7d" : "#00ff9d", border: "none", color: "#000", fontSize: 14, fontWeight: 700, padding: "12px 32px", borderRadius: 6, cursor: downloading ? "default" : "pointer", letterSpacing: "0.1em", textTransform: "uppercase", transition: "background 0.15s" }}
        >
          {downloading ? "⏳ Generating..." : "⬇ Download My Certificate"}
        </button>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 10, letterSpacing: "0.06em" }}>Downloads as a high-resolution PNG</div>
        <div style={{ marginTop: 20, maxWidth: 460, textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.3)", lineHeight: 1.7, letterSpacing: "0.04em" }}>
          💡 If you prefer the look of this page, feel free to take a screenshot of your certificate instead — it works just as well!
        </div>
      </div>
    );
  }

  // ── Landing View ──
  return (
    <div style={{ background: "#0a1a0f", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 20px 48px", textAlign: "center", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 26, color: "#00ff9d", letterSpacing: "0.15em", marginBottom: 8 }}>WAVEHACK</div>
      <div style={{ fontSize: 11, color: "rgba(0,255,157,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 48, fontFamily: "'Share Tech Mono', monospace" }}>2026 Summer Hackathon</div>

      <div style={{ fontSize: 12, color: "rgba(0,255,157,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'Share Tech Mono', monospace" }}>Find your certificate</div>

      <div style={{ position: "relative", width: "100%", maxWidth: 460, marginBottom: query.trim() ? 0 : 24 }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Type your name..."
          autoComplete="off"
          style={{ width: "100%", background: "rgba(0,255,157,0.04)", border: "1px solid rgba(0,255,157,0.2)", borderRadius: 8, padding: "14px 20px", fontSize: 16, color: "#fff", outline: "none", letterSpacing: "0.05em", fontFamily: "inherit", transition: "border-color 0.2s" }}
          onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(0,255,157,0.5)"; }}
          onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(0,255,157,0.2)"; }}
        />
      </div>

      {/* Filtered dropdown — shown only while typing */}
      {filtered !== null && (
        <div style={{ width: "100%", maxWidth: 460, background: "#0d1f12", border: "1px solid rgba(0,255,157,0.12)", borderRadius: 8, overflow: "hidden", marginBottom: 24, marginTop: 0 }}>
          {filtered.length === 0 ? (
            <div style={{ padding: "13px 20px", fontSize: 15, color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>No participant found</div>
          ) : (
            filtered.map(n => (
              <div
                key={n}
                onClick={() => showCert(n, participants.indexOf(n))}
                style={{ padding: "13px 20px", cursor: "pointer", fontSize: 15, fontWeight: 500, color: "rgba(255,255,255,0.75)", letterSpacing: "0.04em", borderBottom: "1px solid rgba(255,255,255,0.05)", textAlign: "left", transition: "all 0.15s" }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = "rgba(0,255,157,0.07)"; el.style.color = "#00ff9d"; el.style.paddingLeft = "26px"; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = ""; el.style.color = "rgba(255,255,255,0.75)"; el.style.paddingLeft = "20px"; }}
              >
                {n}
              </div>
            ))
          )}
        </div>
      )}

      {/* All-participants grid — shown when search is empty */}
      {filtered === null && (
        <div style={{ width: "100%", maxWidth: 720 }}>
          <div style={{ width: 200, height: "0.5px", background: "linear-gradient(to right, transparent, rgba(0,255,157,0.3), transparent)", margin: "0 auto 20px" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8, marginBottom: 40 }}>
            {participants.map((n, i) => (
              <div
                key={n}
                onClick={() => showCert(n, i)}
                style={{ padding: "10px 16px", background: "rgba(0,255,157,0.03)", border: "1px solid rgba(0,255,157,0.1)", borderRadius: 6, cursor: "pointer", fontSize: 14, color: "rgba(255,255,255,0.65)", letterSpacing: "0.03em", textAlign: "left", transition: "all 0.15s" }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = "rgba(0,255,157,0.08)"; el.style.borderColor = "rgba(0,255,157,0.3)"; el.style.color = "#00ff9d"; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = "rgba(0,255,157,0.03)"; el.style.borderColor = "rgba(0,255,157,0.1)"; el.style.color = "rgba(255,255,255,0.65)"; }}
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ width: 200, height: "0.5px", background: "linear-gradient(to right, transparent, rgba(0,255,157,0.3), transparent)", margin: "0 auto 32px" }} />
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>wavehack.org</div>
    </div>
  );
}
