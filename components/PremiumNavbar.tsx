'use client';

import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'Inventory',   href: '/inventory' },
  { label: 'Test Drive',  href: '/book-test-drive' },
  { label: 'About',       href: '/about' },
  { label: 'Contact',     href: '/contact' },
];

export default function PremiumNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: '0 clamp(20px, 5vw, 60px)',
        height: '72px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
        background: scrolled ? 'rgba(5,5,8,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px',
          background: 'linear-gradient(135deg, #E5C158, #D4AF37)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: '14px', fontWeight: 900, color: '#080808', fontFamily: 'Outfit, sans-serif' }}>E</span>
        </div>
        <span style={{
          fontSize: '1.05rem', fontWeight: 800,
          color: '#fff', letterSpacing: '-0.01em', fontFamily: 'Outfit, sans-serif',
        }}>
          Elite<span style={{
            background: 'linear-gradient(135deg, #E5C158, #D4AF37)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}> Wheels</span>
        </span>
      </a>

      {/* Desktop links */}
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {NAV_LINKS.map(link => (
          <a
            key={link.label}
            href={link.href}
            style={{
              fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
              fontFamily: 'Outfit, sans-serif', fontWeight: 500,
              transition: 'color 0.25s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#D4AF37'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)'; }}
          >
            {link.label}
          </a>
        ))}

        <a
          href="/book-test-drive"
          style={{
            padding: '9px 22px',
            background: 'linear-gradient(135deg, #E5C158, #D4AF37)',
            color: '#080808', fontWeight: 700,
            fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase',
            borderRadius: '9999px', textDecoration: 'none',
            fontFamily: 'Outfit, sans-serif',
            boxShadow: '0 4px 20px rgba(212,175,55,0.3)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 28px rgba(212,175,55,0.45)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(212,175,55,0.3)';
          }}
        >
          Reserve Now
        </a>
      </div>
    </nav>
  );
}
