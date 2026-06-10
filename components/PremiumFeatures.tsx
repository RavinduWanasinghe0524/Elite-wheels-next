'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: '⚡',
    title: 'Twin-Turbo V6',
    sub: '410 HP — 0 to 100 in 5.8s',
    desc: 'A naturally responsive powerplant engineered for both supreme efficiency and raw, exhilarating thrust — wherever the road leads.',
    accent: '#4A9FF5',
  },
  {
    icon: '◈',
    title: 'Kinetic 4WD',
    sub: 'Full-Time Intelligent AWD',
    desc: 'Multi-Terrain Select with Crawl Control reads the surface in real time and distributes torque with surgical precision across all four wheels.',
    accent: '#D4AF37',
  },
  {
    icon: '◇',
    title: 'Cabin Intelligence',
    sub: '64-Color Ambient · JBL 14-Speaker',
    desc: 'A cockpit reimagined. Floating 12.3" displays, haptic controls, and a spatial audio system that places you at the heart of every note.',
    accent: '#4A9FF5',
  },
  {
    icon: '◉',
    title: 'Armored Presence',
    sub: 'High-Strength Steel Frame',
    desc: 'Built on an ultra-rigid ladder frame fused with advanced crumple zones — an architecture that commands respect on any terrain.',
    accent: '#D4AF37',
  },
];

export default function PremiumFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      }
    );

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { opacity: 0, y: 80, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#050508',
        padding: 'clamp(80px, 12vw, 160px) clamp(20px, 6vw, 100px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow blobs */}
      <div style={{
        position: 'absolute', top: '10%', left: '-10%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(74,159,245,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '0%', right: '-10%',
        width: '600px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Title */}
      <div ref={titleRef} style={{ textAlign: 'center', marginBottom: 'clamp(50px, 8vw, 100px)', position: 'relative', zIndex: 1 }}>
        <p style={{
          fontSize: '10px', letterSpacing: '0.55em', textTransform: 'uppercase',
          color: 'rgba(74,159,245,0.8)', marginBottom: '20px',
          fontFamily: 'Outfit, sans-serif',
        }}>Engineering · Excellence</p>
        <h2 style={{
          fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
          fontWeight: 900, letterSpacing: '-0.03em', color: '#fff',
          fontFamily: 'Outfit, sans-serif', lineHeight: 1,
        }}>
          Built without<br />
          <span style={{
            background: 'linear-gradient(135deg, #E5C158, #D4AF37, #B8941F)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Compromise</span>
        </h2>
      </div>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1200px', margin: '0 auto',
        position: 'relative', zIndex: 1,
      }}>
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            ref={el => { cardsRef.current[i] = el; }}
            style={{
              padding: '36px 28px',
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px',
              cursor: 'default',
              transition: 'border-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.borderColor = f.accent + '44';
              el.style.transform = 'translateY(-6px)';
              el.style.boxShadow = `0 30px 60px rgba(0,0,0,0.35), 0 0 40px ${f.accent}15`;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.borderColor = 'rgba(255,255,255,0.07)';
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = 'none';
            }}
          >
            <div style={{
              fontSize: '1.8rem', marginBottom: '20px',
              color: f.accent,
              filter: `drop-shadow(0 0 12px ${f.accent}60)`,
            }}>{f.icon}</div>
            <h3 style={{
              fontSize: '1.15rem', fontWeight: 800, color: '#fff',
              marginBottom: '6px', fontFamily: 'Outfit, sans-serif',
            }}>{f.title}</h3>
            <p style={{
              fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: f.accent, marginBottom: '14px', fontFamily: 'Outfit, sans-serif',
              opacity: 0.8,
            }}>{f.sub}</p>
            <p style={{
              fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.75, fontFamily: 'Outfit, sans-serif',
            }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
