'use client';

export default function PremiumFooter() {
  const NAV = [
    { label: 'Inventory',   href: '/inventory' },
    { label: 'Test Drive',  href: '/book-test-drive' },
    { label: 'About',       href: '/about' },
    { label: 'Contact',     href: '/contact' },
    { label: 'FAQ',         href: '/faq' },
    { label: 'Privacy',     href: '/privacy' },
  ];

  return (
    <footer style={{
      background: '#030305',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: 'clamp(48px, 8vw, 80px) clamp(20px, 6vw, 100px) clamp(28px, 4vw, 40px)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Thin gold top line */}
      <div style={{
        position: 'absolute', top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '200px', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)',
      }} />

      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '3rem', alignItems: 'start',
      }}>
        {/* Brand */}
        <div>
          <div style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            fontWeight: 900, letterSpacing: '-0.03em', color: '#fff',
            fontFamily: 'Outfit, sans-serif', marginBottom: '12px',
          }}>
            Elite<span style={{
              background: 'linear-gradient(135deg, #E5C158, #D4AF37)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}> Wheels</span>
          </div>
          <p style={{
            fontSize: '0.82rem', color: 'rgba(255,255,255,0.3)',
            lineHeight: 1.7, maxWidth: '300px', fontFamily: 'Outfit, sans-serif',
          }}>
            Premium automotive experiences. Curated vehicles, concierge service, and a passion for driving excellence.
          </p>
        </div>

        {/* Nav */}
        <nav style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px 40px',
        }}>
          {NAV.map(n => (
            <a
              key={n.label}
              href={n.href}
              style={{
                fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
                fontFamily: 'Outfit, sans-serif',
                transition: 'color 0.25s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#D4AF37'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.35)'; }}
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: '1200px', margin: '48px auto 0',
        paddingTop: '24px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '12px',
      }}>
        <span style={{
          fontSize: '10px', letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.2)', fontFamily: 'Outfit, sans-serif',
        }}>
          © 2026 Elite Wheels. All rights reserved.
        </span>
        <span style={{
          fontSize: '10px', letterSpacing: '0.15em',
          color: 'rgba(212,175,55,0.3)', fontFamily: 'Outfit, sans-serif',
        }}>
          Precision · Power · Prestige
        </span>
      </div>
    </footer>
  );
}
