import { useRef, useEffect } from 'react';

export default function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const chars = '01010101010101010101001010101010111100010101'.split('');
    const fontSize = 14;
    const columns = width / fontSize;
    const drops = [];
    for (let i = 0; i < columns; i++) drops[i] = Math.random() * -100;

    const draw = () => {
      ctx.fillStyle = 'rgba(2, 8, 4, 0.08)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#10b981';
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = 'center';
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
    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #020804 0%, #041208 40%, #030a05 70%, #010402 100%)' }} />
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, opacity: 0.12 }} />
      <div style={{ position: 'absolute', top: '10%', left: '60%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div style={{ position: 'absolute', top: '55%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52,211,153,0.05) 0%, transparent 70%)', filter: 'blur(50px)' }} />
    </div>
  );
}
