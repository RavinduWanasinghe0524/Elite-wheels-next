'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 8 sub-cubes of a 2x2x2 arrangement — each has a unique explosion direction
const SUB_CUBES = [
  { id: 0, label: 'PRECISION', tx: -180, ty: -180, tz: 120, rx: -30, ry: 40 },
  { id: 1, label: 'POWER',     tx:  180, ty: -180, tz: 120, rx: -30, ry: -40 },
  { id: 2, label: 'LUXURY',    tx: -180, ty:  180, tz: 120, rx:  30, ry: 40 },
  { id: 3, label: 'SPEED',     tx:  180, ty:  180, tz: 120, rx:  30, ry: -40 },
  { id: 4, label: 'VISION',    tx: -180, ty: -180, tz: -120, rx: -30, ry: 40 },
  { id: 5, label: 'CRAFT',     tx:  180, ty: -180, tz: -120, rx: -30, ry: -40 },
  { id: 6, label: 'SOUL',      tx: -180, ty:  180, tz: -120, rx:  30, ry: 40 },
  { id: 7, label: 'LEGACY',    tx:  180, ty:  180, tz: -120, rx:  30, ry: -40 },
];

export default function CubeScrollHero() {
  const wrapperRef   = useRef<HTMLDivElement>(null);
  const sceneRef     = useRef<HTMLDivElement>(null);
  const cubeRef      = useRef<HTMLDivElement>(null);
  const subCubeRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const heroTextRef  = useRef<HTMLDivElement>(null);
  const taglineRef   = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const progressRef  = useRef<HTMLDivElement>(null);
  const glowRingRef  = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const scene   = sceneRef.current;
    const cube    = cubeRef.current;
    if (!wrapper || !scene || !cube) return;

    /* ─── Initial States ─────────────────────────────────────── */
    gsap.set(cube, { rotateX: 15, rotateY: 30, rotateZ: 0, scale: 1 });
    gsap.set(subCubeRefs.current, { x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, opacity: 1, scale: 1 });
    gsap.set(heroTextRef.current, { opacity: 0, y: 60 });
    gsap.set(taglineRef.current, { opacity: 0, y: 40 });
    gsap.set(ctaRef.current, { opacity: 0, y: 30 });
    gsap.set(statsRef.current, { opacity: 0, y: 20 });

    /* ─── Entrance ────────────────────────────────────────────── */
    const intro = gsap.timeline({ delay: 0.5 });
    intro
      .to(heroTextRef.current, { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' })
      .to(taglineRef.current,  { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.8')
      .to(ctaRef.current,      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .to(statsRef.current,    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');

    /* ─── Master Scroll Timeline ──────────────────────────────── */
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: '+=400%',
        scrub: 1.4,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.width = `${self.progress * 100}%`;
          }
        },
      },
    });

    /* Phase 1 (0→0.25): Cube Rotates — text fades */
    master
      .to(cube, {
        rotateX: 380,
        rotateY: 740,
        rotateZ: 15,
        duration: 3,
        ease: 'none',
      }, 0)
      .to([heroTextRef.current, taglineRef.current, ctaRef.current, statsRef.current], {
        opacity: 0,
        y: -60,
        duration: 1.5,
        ease: 'power2.in',
      }, 0)
      .to(glowRingRef.current, {
        opacity: 0.9,
        scale: 1.3,
        duration: 2,
        ease: 'sine.inOut',
      }, 0);

    /* Phase 2 (0.25→0.55): EXPLOSION — sub-cubes fly outward */
    master
      .to(cube, { scale: 0, opacity: 0, duration: 0.8, ease: 'power4.in' }, 3)
      .to(glowRingRef.current, { opacity: 0, scale: 2.5, duration: 1.2, ease: 'power2.out' }, 3);

    SUB_CUBES.forEach((sc, i) => {
      const el = subCubeRefs.current[i];
      if (!el) return;
      master
        .fromTo(el,
          { x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, scale: 0, opacity: 0 },
          {
            x: sc.tx, y: sc.ty,
            rotateX: sc.rx * 3,
            rotateY: sc.ry * 3,
            scale: 1.1,
            opacity: 1,
            duration: 2.2,
            ease: 'power3.out',
          },
          3 + i * 0.06,
        );
    });

    /* Phase 3 (0.55→0.75): pieces float & breathe */
    SUB_CUBES.forEach((sc, i) => {
      const el = subCubeRefs.current[i];
      if (!el) return;
      master.to(el, {
        y: `+=${Math.sin(i) * 15}`,
        rotateY: `+=${20}`,
        duration: 2,
        ease: 'sine.inOut',
      }, 5.5 + i * 0.05);
    });

    /* Phase 4 (0.75→1.0): REASSEMBLY — sub-cubes fly back */
    SUB_CUBES.forEach((sc, i) => {
      const el = subCubeRefs.current[i];
      if (!el) return;
      master.to(el, {
        x: 0, y: 0, rotateX: 0, rotateY: 0,
        scale: 1,
        duration: 2.4,
        ease: 'power4.inOut',
      }, 7.5 + i * 0.04);
    });

    master
      .to(cube, { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }, 9.8)
      .to(cube, { rotateX: 30, rotateY: 400, duration: 1.6, ease: 'power2.out' }, 9.8)
      .to(glowRingRef.current, { opacity: 0.6, scale: 1, duration: 1.5, ease: 'power2.out' }, 9.8)
      .to(overlayRef.current,  { opacity: 1,  duration: 1.4, ease: 'power2.out' }, 10.2);

    /* Subtle idle cube rotation when not scrolling */
    const idleTween = gsap.to(cube, {
      rotateY: '+=360',
      duration: 18,
      repeat: -1,
      ease: 'none',
      paused: true,
    });

    ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: '+=400%',
      onLeave: () => idleTween.play(),
      onEnterBack: () => idleTween.pause(),
    });

    return () => {
      master.kill();
      idleTween.kill();
      intro.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  /* ─── Face colours & accent ─────────────────────────────────── */
  const faces = [
    { transform: 'rotateY(0deg)   translateZ(80px)', bg: 'rgba(74,159,245,0.08)',  border: 'rgba(74,159,245,0.5)' },
    { transform: 'rotateY(180deg) translateZ(80px)', bg: 'rgba(212,175,55,0.08)',  border: 'rgba(212,175,55,0.5)' },
    { transform: 'rotateY(90deg)  translateZ(80px)', bg: 'rgba(74,159,245,0.06)',  border: 'rgba(74,159,245,0.4)' },
    { transform: 'rotateY(-90deg) translateZ(80px)', bg: 'rgba(212,175,55,0.06)',  border: 'rgba(212,175,55,0.4)' },
    { transform: 'rotateX(90deg)  translateZ(80px)', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.3)' },
    { transform: 'rotateX(-90deg) translateZ(80px)', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.2)' },
  ];

  const subFaces = [
    { transform: 'rotateY(0deg)   translateZ(38px)' },
    { transform: 'rotateY(180deg) translateZ(38px)' },
    { transform: 'rotateY(90deg)  translateZ(38px)' },
    { transform: 'rotateY(-90deg) translateZ(38px)' },
    { transform: 'rotateX(90deg)  translateZ(38px)' },
    { transform: 'rotateX(-90deg) translateZ(38px)' },
  ];

  return (
    <section
      ref={wrapperRef}
      id="cube-hero"
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 120% 80% at 50% 30%, #05080f 0%, #000408 60%, #000000 100%)',
      }}
    >
      {/* ── Star field ── */}
      <Stars />

      {/* ── Ambient light beams ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 60% 40% at 30% 20%, rgba(74,159,245,0.06) 0%, transparent 70%),
          radial-gradient(ellipse 50% 35% at 70% 80%, rgba(212,175,55,0.05) 0%, transparent 70%),
          radial-gradient(ellipse 40% 50% at 80% 10%, rgba(74,159,245,0.04) 0%, transparent 60%)
        `,
      }} />

      {/* ── Scanline overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.03,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 4px)',
      }} />

      {/* ── Progress bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, height: '2px', width: '100%',
        background: 'rgba(255,255,255,0.05)', zIndex: 100,
      }}>
        <div
          ref={progressRef}
          style={{
            height: '100%', width: '0%',
            background: 'linear-gradient(90deg, #4A9FF5, #D4AF37)',
            transition: 'width 0.1s linear',
            boxShadow: '0 0 12px rgba(74,159,245,0.8)',
          }}
        />
      </div>

      {/* ── Glow ring behind cube ── */}
      <div
        ref={glowRingRef}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '380px', height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,159,245,0.12) 0%, transparent 70%)',
          border: '1px solid rgba(74,159,245,0.15)',
          boxShadow: '0 0 80px rgba(74,159,245,0.12), inset 0 0 60px rgba(74,159,245,0.06)',
          opacity: 0.5,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ── 3-D Scene ── */}
      <div
        ref={sceneRef}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
          zIndex: 2,
          width: '500px', height: '500px',
        }}
      >
        {/* Main Cube (visible in idle & rotation phases) */}
        <div
          ref={cubeRef}
          style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '160px', height: '160px',
            transformStyle: 'preserve-3d',
            transform: 'translate(-50%, -50%) rotateX(15deg) rotateY(30deg)',
            willChange: 'transform',
          }}
        >
          {faces.map((f, i) => (
            <div key={i} style={{
              position: 'absolute', width: '160px', height: '160px',
              background: f.bg,
              border: `1px solid ${f.border}`,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              transform: f.transform,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `inset 0 0 30px ${f.border.replace('0.5', '0.08')}, 0 0 20px ${f.border.replace('0.5', '0.1')}`,
            }}>
              {i === 0 && (
                <span style={{
                  fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em',
                  color: 'rgba(74,159,245,0.9)', textTransform: 'uppercase',
                  fontFamily: 'Outfit, sans-serif',
                }}>ELITE</span>
              )}
              {i === 1 && (
                <span style={{
                  fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em',
                  color: 'rgba(212,175,55,0.9)', textTransform: 'uppercase',
                  fontFamily: 'Outfit, sans-serif',
                }}>WHEELS</span>
              )}
            </div>
          ))}
        </div>

        {/* Sub-cubes (exploded fragments) — 2×2×2 grid offsets */}
        {SUB_CUBES.map((sc, i) => {
          // Position in 2x2x2 grid before explosion
          const gx = (i % 2 === 0 ? -1 : 1) * 40;
          const gy = (Math.floor(i / 2) % 2 === 0 ? -1 : 1) * 40;
          const gz = (i < 4 ? 1 : -1) * 40;

          return (
            <div
              key={sc.id}
              ref={el => { subCubeRefs.current[i] = el; }}
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                width: '76px', height: '76px',
                transformStyle: 'preserve-3d',
                transform: `translate(calc(-50% + ${gx}px), calc(-50% + ${gy}px)) translateZ(${gz}px)`,
                willChange: 'transform',
                opacity: 0,
              }}
            >
              {subFaces.map((sf, fi) => {
                const colors = [
                  ['rgba(74,159,245,0.15)',  'rgba(74,159,245,0.6)'],
                  ['rgba(212,175,55,0.15)',  'rgba(212,175,55,0.6)'],
                  ['rgba(100,200,255,0.1)',  'rgba(100,200,255,0.45)'],
                  ['rgba(255,200,80,0.1)',   'rgba(255,200,80,0.45)'],
                  ['rgba(74,159,245,0.08)',  'rgba(74,159,245,0.35)'],
                  ['rgba(212,175,55,0.08)',  'rgba(212,175,55,0.3)'],
                ];
                const [bg, border] = colors[fi % colors.length];
                return (
                  <div key={fi} style={{
                    position: 'absolute', width: '76px', height: '76px',
                    background: bg,
                    border: `1px solid ${border}`,
                    backdropFilter: 'blur(8px)',
                    transform: sf.transform,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `inset 0 0 12px ${border.replace('0.6', '0.1')}, 0 0 10px ${border.replace('0.6', '0.2')}`,
                  }}>
                    {fi === 0 && (
                      <span style={{
                        fontSize: '6px', fontWeight: 800, letterSpacing: '0.15em',
                        color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase',
                        fontFamily: 'Outfit, sans-serif',
                        textAlign: 'center', padding: '0 4px',
                      }}>{sc.label}</span>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* ── Hero Text (initial state) ── */}
      <div
        ref={heroTextRef}
        style={{
          position: 'absolute', bottom: '18%', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10, textAlign: 'center', width: '100%', pointerEvents: 'none',
        }}
      >
        <p style={{
          fontSize: '11px', letterSpacing: '0.5em', textTransform: 'uppercase',
          color: 'rgba(74,159,245,0.8)', marginBottom: '16px',
          fontFamily: 'Outfit, sans-serif', fontWeight: 500,
        }}>
          ◆&nbsp;&nbsp;Elite Wheels&nbsp;&nbsp;◆&nbsp;&nbsp;Premium Automotive
        </p>
        <h1 style={{
          fontSize: 'clamp(3rem, 7vw, 7rem)',
          fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 0.9,
          color: '#fff', textTransform: 'uppercase',
          fontFamily: 'Outfit, sans-serif',
          textShadow: '0 0 80px rgba(74,159,245,0.2)',
        }}>
          <span style={{ display: 'block' }}>Experience</span>
          <span style={{
            display: 'block',
            background: 'linear-gradient(135deg, #E5C158 0%, #D4AF37 50%, #B8941F 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Perfection</span>
        </h1>
      </div>

      <div
        ref={taglineRef}
        style={{
          position: 'absolute', bottom: '12%', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10, textAlign: 'center', pointerEvents: 'none',
        }}
      >
        <p style={{
          fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)',
          letterSpacing: '0.25em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)', fontWeight: 300,
          fontFamily: 'Outfit, sans-serif',
        }}>Scroll to reveal the future</p>
      </div>

      {/* CTA Buttons */}
      <div
        ref={ctaRef}
        style={{
          position: 'absolute', bottom: '5%', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10, display: 'flex', gap: '1.2rem', alignItems: 'center',
          pointerEvents: 'auto',
        }}
      >
        <a href="/inventory" style={{
          padding: '14px 34px',
          background: 'linear-gradient(135deg, #E5C158, #D4AF37, #B8941F)',
          color: '#0a0a0a', fontWeight: 700,
          fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          borderRadius: '9999px', textDecoration: 'none',
          boxShadow: '0 8px 32px rgba(212,175,55,0.35)',
          transition: 'all 0.3s ease',
          fontFamily: 'Outfit, sans-serif',
        }}>
          Explore Fleet
        </a>
        <a href="/book-test-drive" style={{
          padding: '14px 34px',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
          color: 'rgba(255,255,255,0.85)', fontWeight: 600,
          fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          borderRadius: '9999px', textDecoration: 'none',
          border: '1px solid rgba(255,255,255,0.15)',
          transition: 'all 0.3s ease',
          fontFamily: 'Outfit, sans-serif',
        }}>
          Book Test Drive
        </a>
      </div>

      {/* ── Stats Row ── */}
      <div
        ref={statsRef}
        style={{
          position: 'absolute', top: '88px', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10, display: 'flex', gap: '3rem', alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        {[
          { num: '500+', label: 'Vehicles' },
          { num: '15+',  label: 'Brands' },
          { num: '99%',  label: 'Satisfaction' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 900,
              background: 'linear-gradient(135deg, #E5C158, #D4AF37)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', fontFamily: 'Outfit, sans-serif',
            }}>{s.num}</div>
            <div style={{
              fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)', fontFamily: 'Outfit, sans-serif',
            }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Final reassembly overlay text ── */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute', inset: 0, zIndex: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,4,8,0.7) 0%, transparent 100%)',
          opacity: 0, pointerEvents: 'none',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontSize: '10px', letterSpacing: '0.6em', textTransform: 'uppercase',
            color: 'rgba(74,159,245,0.8)', marginBottom: '20px',
            fontFamily: 'Outfit, sans-serif',
          }}>System Online</p>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            fontWeight: 900, letterSpacing: '-0.02em',
            color: '#fff', textTransform: 'uppercase',
            fontFamily: 'Outfit, sans-serif',
            textShadow: '0 0 60px rgba(74,159,245,0.3)',
            marginBottom: '16px',
          }}>Built Different</h2>
          <p style={{
            fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'rgba(212,175,55,0.8)',
            fontFamily: 'Outfit, sans-serif', fontWeight: 300,
          }}>Precision · Power · Prestige</p>
        </div>
      </div>

      {/* ── Side labels ── */}
      <SideLabels />

      {/* ── Scroll indicator ── */}
      <div style={{
        position: 'absolute', bottom: '2.5%', right: '3%',
        zIndex: 20, display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '8px',
        animation: 'pulseFade 2.5s ease-in-out infinite',
      }}>
        <span style={{
          fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)', fontFamily: 'Outfit, sans-serif',
          writingMode: 'vertical-rl', transform: 'rotate(180deg)',
        }}>Scroll</span>
        <div style={{
          width: '1px', height: '50px',
          background: 'linear-gradient(to bottom, rgba(74,159,245,0.8), transparent)',
        }} />
      </div>

      <style>{`
        @keyframes pulseFade {
          0%, 100% { opacity: 0.4; transform: translateY(0); }
          50%       { opacity: 1;   transform: translateY(6px); }
        }
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.2; }
          50%       { opacity: 1; }
        }
      `}</style>
    </section>
  );
}

/* ─── Star field component ─────────────────────────────────────── */
function Stars() {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.8 + 0.4,
    delay: Math.random() * 4,
    dur: Math.random() * 3 + 2,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      {stars.map(s => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.x}%`, top: `${s.y}%`,
            width: `${s.size}px`, height: `${s.size}px`,
            borderRadius: '50%',
            background: s.id % 5 === 0
              ? 'rgba(212,175,55,0.8)'
              : 'rgba(255,255,255,0.6)',
            animation: `starTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Side label strip ─────────────────────────────────────────── */
function SideLabels() {
  return (
    <>
      {/* Left */}
      <div style={{
        position: 'absolute', left: '2.5%', top: '50%',
        transform: 'translateY(-50%) rotate(-90deg)',
        fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.2)', zIndex: 10, pointerEvents: 'none',
        whiteSpace: 'nowrap', fontFamily: 'Outfit, sans-serif',
      }}>
        Elite Wheels — Premium Automotive Experience
      </div>
      {/* Right */}
      <div style={{
        position: 'absolute', right: '2.5%', top: '50%',
        transform: 'translateY(-50%) rotate(90deg)',
        fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase',
        color: 'rgba(74,159,245,0.3)', zIndex: 10, pointerEvents: 'none',
        whiteSpace: 'nowrap', fontFamily: 'Outfit, sans-serif',
      }}>
        Scroll to Experience — 2026
      </div>
    </>
  );
}
