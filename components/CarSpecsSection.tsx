'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SPECS = [
  { label: 'Engine',       value: '4.0L V6 Twin-Turbo' },
  { label: 'Power',        value: '410 HP / 560 Nm' },
  { label: '0–100 km/h',   value: '5.8 seconds' },
  { label: 'Top Speed',    value: '210 km/h' },
  { label: 'Drive System', value: 'Full-Time 4WD + Low Range' },
  { label: 'Suspension',   value: 'Multi-link Adaptive Coil' },
  { label: 'Water Wading', value: '700 mm' },
  { label: 'Towing',       value: '3,500 kg Rated' },
];

export default function CarSpecsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const lineRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(leftRef.current, { opacity: 0, x: -60 }, {
      opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
    });

    gsap.fromTo(rightRef.current, { opacity: 0, x: 60 }, {
      opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
    });

    lineRefs.current.forEach((line, i) => {
      if (!line) return;
      gsap.fromTo(line,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
          delay: i * 0.06,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'linear-gradient(180deg, #050508 0%, #07090f 50%, #050508 100%)',
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 6vw, 100px)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Center divider glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '1px', height: '60%',
        background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.2), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(40px, 8vw, 120px)', alignItems: 'center',
      }}>
        {/* Left: Title + badge */}
        <div ref={leftRef}>
          <p style={{
            fontSize: '10px', letterSpacing: '0.55em', textTransform: 'uppercase',
            color: 'rgba(212,175,55,0.8)', marginBottom: '20px',
            fontFamily: 'Outfit, sans-serif',
          }}>Technical · Specifications</p>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
            fontWeight: 900, letterSpacing: '-0.03em', color: '#fff',
            fontFamily: 'Outfit, sans-serif', lineHeight: 1, marginBottom: '28px',
          }}>
            Numbers<br />
            <span style={{
              background: 'linear-gradient(135deg, #E5C158, #D4AF37, #B8941F)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>don&apos;t lie</span>
          </h2>
          <p style={{
            fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.8, maxWidth: '380px', fontFamily: 'Outfit, sans-serif',
          }}>
            Every number in this table is the result of decades of relentless engineering — tested across deserts, mountains, and asphalt, then refined again.
          </p>

          {/* 3 big stat pills */}
          <div style={{ display: 'flex', gap: '1.2rem', marginTop: '40px', flexWrap: 'wrap' }}>
            {[['5.8s', '0–100'], ['700mm', 'Wading'], ['3.5T', 'Towing']].map(([v, l]) => (
              <div key={l} style={{
                padding: '16px 24px',
                background: 'rgba(212,175,55,0.07)',
                border: '1px solid rgba(212,175,55,0.18)',
                borderRadius: '14px', textAlign: 'center',
              }}>
                <div style={{
                  fontSize: '1.6rem', fontWeight: 900, color: '#D4AF37',
                  fontFamily: 'Outfit, sans-serif',
                }}>{v}</div>
                <div style={{
                  fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)', fontFamily: 'Outfit, sans-serif', marginTop: '4px',
                }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Spec list */}
        <div ref={rightRef}>
          {SPECS.map((spec, i) => (
            <div
              key={spec.label}
              ref={el => { lineRefs.current[i] = el; }}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '18px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span style={{
                fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)',
                fontFamily: 'Outfit, sans-serif', letterSpacing: '0.02em',
              }}>{spec.label}</span>
              <span style={{
                fontSize: '0.9rem', fontWeight: 700, color: '#fff',
                fontFamily: 'Outfit, sans-serif',
              }}>{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
