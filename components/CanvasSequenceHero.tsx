'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;
const FRAME_PATH = (n: number) =>
  `/frames/ezgif-frame-${String(n).padStart(3, '0')}.jpg`;

export default function CanvasSequenceHero() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const framesRef     = useRef<HTMLImageElement[]>([]);
  const frameObjRef   = useRef({ frame: 0 });
  const loadedRef     = useRef(0);

  // ── Overlay panel refs
  const pill1Ref   = useRef<HTMLDivElement>(null);
  const pill2Ref   = useRef<HTMLDivElement>(null);
  const pill3Ref   = useRef<HTMLDivElement>(null);
  const heroTxtRef = useRef<HTMLDivElement>(null);
  const subTxtRef  = useRef<HTMLDivElement>(null);
  const ctaBtnRef  = useRef<HTMLDivElement>(null);
  const interiorRef= useRef<HTMLDivElement>(null);
  const frontRef   = useRef<HTMLDivElement>(null);
  const progressRef= useRef<HTMLDivElement>(null);

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = framesRef.current[index];
    if (!img || !img.complete) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // letterbox / cover fill
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    const cw = canvas.width;
    const ch = canvas.height;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  // Pre-load all frames
  const preload = useCallback(() => {
    framesRef.current = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedRef.current += 1;
        if (loadedRef.current === 1) renderFrame(0); // show first frame immediately
      };
      framesRef.current.push(img);
    }
  }, [renderFrame]);

  // Resize canvas
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    renderFrame(frameObjRef.current.frame);
  }, [renderFrame]);

  useEffect(() => {
    preload();
    resize();
    window.addEventListener('resize', resize);

    const container = containerRef.current;
    if (!container) return;

    // ── Entrance animations
    gsap.set([pill1Ref.current, pill2Ref.current, pill3Ref.current], { opacity: 0, y: 24 });
    gsap.set(heroTxtRef.current,  { opacity: 0, y: 50 });
    gsap.set(subTxtRef.current,   { opacity: 0, y: 30 });
    gsap.set(ctaBtnRef.current,   { opacity: 0, y: 20 });
    gsap.set(interiorRef.current, { opacity: 0, y: 40 });
    gsap.set(frontRef.current,    { opacity: 0, y: 40 });

    const intro = gsap.timeline({ delay: 0.4 });
    intro
      .to(heroTxtRef.current,  { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })
      .to(subTxtRef.current,   { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.7')
      .to([pill1Ref.current, pill2Ref.current, pill3Ref.current], {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        }, '-=0.5')
      .to(ctaBtnRef.current,   { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4');

    // ── Master scroll-scrub timeline (pinned)
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=600%',
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (progressRef.current)
            progressRef.current.style.width = `${self.progress * 100}%`;

          // Drive frame index
          const fi = Math.min(
            TOTAL_FRAMES - 1,
            Math.round(self.progress * (TOTAL_FRAMES - 1))
          );
          frameObjRef.current.frame = fi;
          renderFrame(fi);
        },
      },
    });

    // Phase 0→0.25  — hero text fades out, car begins rotating
    master
      .to(heroTxtRef.current, { opacity: 0, y: -60, duration: 2, ease: 'power2.in' }, 0)
      .to(subTxtRef.current,  { opacity: 0, y: -40, duration: 2, ease: 'power2.in' }, 0)
      .to([pill1Ref.current, pill2Ref.current, pill3Ref.current], {
          opacity: 0, y: -20, duration: 1.5, stagger: 0.08, ease: 'power2.in',
        }, 0)
      .to(ctaBtnRef.current,  { opacity: 0, y: -20, duration: 1.5, ease: 'power2.in' }, 0);

    // Phase 0.4→0.65 — interior reveal copy appears (~frame 96–155)
    master
      .to(interiorRef.current, { opacity: 1, y: 0, duration: 2, ease: 'power3.out' }, 4)
      .to(interiorRef.current, { opacity: 0, y: -30, duration: 2, ease: 'power2.in' }, 7);

    // Phase 0.75→1.0 — front face / doors open copy appears (~frame 180–240)
    master
      .to(frontRef.current, { opacity: 1, y: 0, duration: 2, ease: 'power3.out' }, 8)
      .to(frontRef.current, { opacity: 0, y: -30, duration: 1.5, ease: 'power2.in' }, 11);

    return () => {
      master.kill();
      intro.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener('resize', resize);
    };
  }, [preload, renderFrame, resize]);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#0a0a0a',
      }}
    >
      {/* ── Canvas ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />

      {/* ── Dark gradient vignette ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        background: `
          linear-gradient(to bottom,
            rgba(5,5,10,0.55) 0%,
            rgba(5,5,10,0.1) 30%,
            rgba(5,5,10,0.1) 60%,
            rgba(5,5,10,0.75) 100%
          ),
          radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)
        `,
      }} />

      {/* ── Progress bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, height: '2px', width: '100%',
        background: 'rgba(255,255,255,0.06)', zIndex: 100,
      }}>
        <div ref={progressRef} style={{
          height: '100%', width: '0%',
          background: 'linear-gradient(90deg, #4A9FF5 0%, #D4AF37 100%)',
          boxShadow: '0 0 10px rgba(74,159,245,0.7)',
          transition: 'width 0.05s linear',
        }} />
      </div>

      {/* ── Hero text — Phase 1 ── */}
      <div
        ref={heroTxtRef}
        style={{
          position: 'absolute', bottom: '14%', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10, textAlign: 'center', width: '100%',
          pointerEvents: 'none',
        }}
      >
        <p style={{
          fontSize: '10px', letterSpacing: '0.55em', textTransform: 'uppercase',
          color: 'rgba(74,159,245,0.85)', marginBottom: '18px',
          fontFamily: 'Outfit, sans-serif', fontWeight: 500,
        }}>
          ◆&nbsp;&nbsp;Elite Wheels&nbsp;&nbsp;◆&nbsp;&nbsp;2026 Collection
        </p>
        <h1 style={{
          fontSize: 'clamp(3.2rem, 7vw, 7.5rem)',
          fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 0.88,
          color: '#fff', textTransform: 'uppercase',
          fontFamily: 'Outfit, sans-serif',
          textShadow: '0 4px 60px rgba(0,0,0,0.6)',
        }}>
          <span style={{ display: 'block' }}>Born to</span>
          <span style={{
            display: 'block',
            background: 'linear-gradient(135deg, #E5C158, #D4AF37, #B8941F)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Conquer</span>
        </h1>
      </div>

      {/* ── Tagline ── */}
      <div
        ref={subTxtRef}
        style={{
          position: 'absolute', bottom: '9%', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10, textAlign: 'center', pointerEvents: 'none',
        }}
      >
        <p style={{
          fontSize: 'clamp(0.75rem, 1.3vw, 1rem)',
          letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)', fontWeight: 300,
          fontFamily: 'Outfit, sans-serif',
        }}>Scroll to explore · Toyota Land Cruiser 2026</p>
      </div>

      {/* ── Spec Pills ── */}
      <div style={{
        position: 'absolute', top: '88px', left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10, display: 'flex', gap: '1rem', pointerEvents: 'none',
        flexWrap: 'wrap', justifyContent: 'center',
      }}>
        {[
          { label: '4.0L V6', sub: 'Engine' },
          { label: '410 HP', sub: 'Power' },
          { label: 'Full-Time 4WD', sub: 'Drive' },
        ].map((s, i) => (
          <div
            key={i}
            ref={i === 0 ? pill1Ref : i === 1 ? pill2Ref : pill3Ref}
            style={{
              padding: '10px 22px',
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '9999px',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}
          >
            <span style={{
              fontSize: '13px', fontWeight: 700, color: '#fff',
              fontFamily: 'Outfit, sans-serif',
            }}>{s.label}</span>
            <span style={{
              fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(212,175,55,0.8)', fontFamily: 'Outfit, sans-serif',
            }}>{s.sub}</span>
          </div>
        ))}
      </div>

      {/* ── CTA Buttons ── */}
      <div
        ref={ctaBtnRef}
        style={{
          position: 'absolute', bottom: '3%', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10, display: 'flex', gap: '1rem', alignItems: 'center',
        }}
      >
        <a href="/inventory" style={{
          padding: '13px 32px',
          background: 'linear-gradient(135deg, #E5C158, #D4AF37, #B8941F)',
          color: '#080808', fontWeight: 700,
          fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          borderRadius: '9999px', textDecoration: 'none',
          boxShadow: '0 8px 30px rgba(212,175,55,0.4)',
          fontFamily: 'Outfit, sans-serif',
        }}>View Inventory</a>
        <a href="/book-test-drive" style={{
          padding: '13px 32px',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(14px)',
          color: 'rgba(255,255,255,0.8)', fontWeight: 600,
          fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          borderRadius: '9999px', textDecoration: 'none',
          border: '1px solid rgba(255,255,255,0.14)',
          fontFamily: 'Outfit, sans-serif',
        }}>Book Test Drive</a>
      </div>

      {/* ── Phase 2: Interior reveal overlay ── */}
      <div
        ref={interiorRef}
        style={{
          position: 'absolute', left: '5%', bottom: '12%',
          zIndex: 10, maxWidth: '380px', pointerEvents: 'none',
          opacity: 0,
        }}
      >
        <GlassCard>
          <p style={{
            fontSize: '9px', letterSpacing: '0.5em', textTransform: 'uppercase',
            color: 'rgba(74,159,245,0.9)', marginBottom: '12px',
            fontFamily: 'Outfit, sans-serif',
          }}>Interior · Ambient Studio</p>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800,
            color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1,
            marginBottom: '14px', fontFamily: 'Outfit, sans-serif',
          }}>Crafted for the<br />
            <span style={{
              background: 'linear-gradient(135deg, #E5C158, #D4AF37)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Bold</span>
          </h2>
          <p style={{
            fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.7, fontFamily: 'Outfit, sans-serif',
          }}>
            64-color ambient lighting bathes the cabin in a cinematic glow. Every surface speaks of purpose — premium leather, sculpted panels, and a cockpit-inspired centre stack.
          </p>
          <div style={{ marginTop: '16px', display: 'flex', gap: '20px' }}>
            {[['64', 'Ambient Colors'], ['12.3"', 'Display'], ['JBL', 'Premium Audio']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#D4AF37', fontFamily: 'Outfit, sans-serif' }}>{v}</div>
                <div style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontFamily: 'Outfit, sans-serif' }}>{l}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* ── Phase 3: Front / doors open overlay ── */}
      <div
        ref={frontRef}
        style={{
          position: 'absolute', right: '5%', bottom: '12%',
          zIndex: 10, maxWidth: '360px', pointerEvents: 'none',
          opacity: 0,
        }}
      >
        <GlassCard accent="gold">
          <p style={{
            fontSize: '9px', letterSpacing: '0.5em', textTransform: 'uppercase',
            color: 'rgba(212,175,55,0.9)', marginBottom: '12px',
            fontFamily: 'Outfit, sans-serif',
          }}>Presence · Command</p>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800,
            color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1,
            marginBottom: '14px', fontFamily: 'Outfit, sans-serif',
          }}>Open the<br />
            <span style={{
              background: 'linear-gradient(135deg, #E5C158, #D4AF37)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Door</span>
          </h2>
          <p style={{
            fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.7, fontFamily: 'Outfit, sans-serif',
          }}>
            Four-panel frameless doors open wide, revealing the world beyond. Quad headlights cut through the dark — not a luxury SUV, but a declaration.
          </p>
          <div style={{ marginTop: '16px', display: 'flex', gap: '20px' }}>
            {[['5m', 'Turning Radius'], ['4WD', 'Low Range'], ['700mm', 'Water Wading']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#D4AF37', fontFamily: 'Outfit, sans-serif' }}>{v}</div>
                <div style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontFamily: 'Outfit, sans-serif' }}>{l}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* ── Side label ── */}
      <div style={{
        position: 'absolute', right: '2.5rem', bottom: '15%',
        zIndex: 10, display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '8px', animation: 'floatDown 2.5s ease-in-out infinite',
      }}>
        <span style={{
          fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)', writingMode: 'vertical-rl',
          transform: 'rotate(180deg)', fontFamily: 'Outfit, sans-serif',
        }}>Scroll</span>
        <div style={{
          width: '1px', height: '50px',
          background: 'linear-gradient(to bottom, rgba(212,175,55,0.7), transparent)',
        }} />
      </div>

      <style>{`
        @keyframes floatDown {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50%       { transform: translateY(8px); opacity: 1; }
        }
      `}</style>
    </section>
  );
}

/* ── Reusable glass card ── */
function GlassCard({ children, accent = 'blue' }: { children: React.ReactNode; accent?: 'blue' | 'gold' }) {
  const borderColor = accent === 'gold'
    ? 'rgba(212,175,55,0.2)'
    : 'rgba(74,159,245,0.2)';
  const glowColor = accent === 'gold'
    ? 'rgba(212,175,55,0.05)'
    : 'rgba(74,159,245,0.05)';

  return (
    <div style={{
      padding: '28px',
      background: `linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)`,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: `1px solid ${borderColor}`,
      borderRadius: '20px',
      boxShadow: `0 24px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 60px ${glowColor}`,
    }}>
      {children}
    </div>
  );
}
