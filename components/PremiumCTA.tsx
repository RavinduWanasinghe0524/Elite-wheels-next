'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PremiumCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 60, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#050508',
        padding: 'clamp(80px, 12vw, 160px) clamp(20px, 6vw, 60px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Glow orb */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(212,175,55,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div
        ref={contentRef}
        style={{
          textAlign: 'center', position: 'relative', zIndex: 1,
          maxWidth: '800px',
        }}
      >
        {/* Decorative line */}
        <div style={{
          width: '60px', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)',
          margin: '0 auto 28px',
        }} />

        <p style={{
          fontSize: '10px', letterSpacing: '0.55em', textTransform: 'uppercase',
          color: 'rgba(212,175,55,0.8)', marginBottom: '24px',
          fontFamily: 'Outfit, sans-serif',
        }}>Your Journey · Begins Here</p>

        <h2 style={{
          fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
          fontWeight: 900, letterSpacing: '-0.03em', color: '#fff',
          fontFamily: 'Outfit, sans-serif', lineHeight: 0.95, marginBottom: '28px',
        }}>
          Reserve Yours<br />
          <span style={{
            background: 'linear-gradient(135deg, #E5C158, #D4AF37, #B8941F)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Today</span>
        </h2>

        <p style={{
          fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)',
          color: 'rgba(255,255,255,0.4)', lineHeight: 1.8,
          maxWidth: '500px', margin: '0 auto 48px',
          fontFamily: 'Outfit, sans-serif',
        }}>
          Limited allocation for 2026. Secure your Toyota Land Cruiser with a personalised configuration and priority delivery.
        </p>

        <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="/book-test-drive"
            style={{
              padding: '16px 44px',
              background: 'linear-gradient(135deg, #E5C158, #D4AF37, #B8941F)',
              color: '#080808', fontWeight: 800,
              fontSize: '0.78rem', letterSpacing: '0.22em', textTransform: 'uppercase',
              borderRadius: '9999px', textDecoration: 'none',
              boxShadow: '0 12px 40px rgba(212,175,55,0.4)',
              fontFamily: 'Outfit, sans-serif',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 18px 50px rgba(212,175,55,0.55)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 40px rgba(212,175,55,0.4)';
            }}
          >
            Book a Test Drive
          </a>
          <a
            href="/inventory"
            style={{
              padding: '16px 44px',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(16px)',
              color: 'rgba(255,255,255,0.75)', fontWeight: 600,
              fontSize: '0.78rem', letterSpacing: '0.22em', textTransform: 'uppercase',
              borderRadius: '9999px', textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.12)',
              fontFamily: 'Outfit, sans-serif',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(212,175,55,0.4)';
              (e.currentTarget as HTMLAnchorElement).style.color = '#D4AF37';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.12)';
              (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.75)';
            }}
          >
            View Inventory
          </a>
        </div>

        {/* Trust badges */}
        <div style={{
          marginTop: '56px', display: 'flex',
          gap: '2rem', justifyContent: 'center',
          flexWrap: 'wrap', opacity: 0.5,
        }}>
          {['5-Star Safety', 'Lifetime Warranty', '24/7 Support', 'Free Delivery'].map(badge => (
            <span key={badge} style={{
              fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)', fontFamily: 'Outfit, sans-serif',
            }}>
              ✦ {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
