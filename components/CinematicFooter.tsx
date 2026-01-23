'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicFooter() {
  const footerRef = useRef<HTMLDivElement>(null);
  const brandNameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current || !brandNameRef.current || !contentRef.current) return;

    const footer = footerRef.current;
    const brandName = brandNameRef.current;
    const content = contentRef.current;

    // Fade in brand name
    gsap.fromTo(
      brandName,
      { opacity: 0.1 },
      {
        opacity: 0.3,
        scrollTrigger: {
          trigger: footer,
          start: 'top bottom',
          end: 'top center',
          scrub: 1,
        },
      }
    );

    // Fade in content
    gsap.fromTo(
      content,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === footer) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="cinematic-footer"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--charcoal)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '4rem 2rem',
      }}
    >
      {/* Massive Brand Name Background */}
      <div
        ref={brandNameRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(8rem, 25vw, 30rem)',
          fontWeight: 900,
          letterSpacing: '-0.05em',
          color: 'var(--cream)',
          opacity: 0.1,
          whiteSpace: 'nowrap',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        ELITE WHEELS
      </div>

      {/* Abstract Visual Elements */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, var(--glow-blue-soft) 0%, transparent 70%)',
          opacity: 0.2,
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, var(--gold-light) 0%, transparent 70%)',
          opacity: 0.1,
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1400px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* Main CTA */}
        <h2
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: 'var(--cream)',
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
          }}
        >
          Ready to Experience Luxury?
        </h2>

        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--light-text)',
            marginBottom: '3rem',
            letterSpacing: '0.05em',
          }}
        >
          Your journey begins here. Contact us today.
        </p>

        {/* Contact Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            marginTop: '4rem',
            textAlign: 'left',
          }}
        >
          {/* Location */}
          <div>
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--glow-blue)',
                letterSpacing: '0.2em',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
              }}
            >
              Location
            </div>
            <div
              style={{
                fontSize: '1.125rem',
                color: 'var(--cream)',
                lineHeight: 1.6,
              }}
            >
              123 Luxury Boulevard
              <br />
              Beverly Hills, CA 90210
              <br />
              United States
            </div>
          </div>

          {/* Contact */}
          <div>
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--glow-blue)',
                letterSpacing: '0.2em',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
              }}
            >
              Contact
            </div>
            <div
              style={{
                fontSize: '1.125rem',
                color: 'var(--cream)',
                lineHeight: 1.6,
              }}
            >
              <a
                href="tel:+13105551234"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--cream)')}
              >
                +1 (310) 555-1234
              </a>
              <br />
              <a
                href="mailto:info@elitewheels.com"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--cream)')}
              >
                info@elitewheels.com
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--glow-blue)',
                letterSpacing: '0.2em',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
              }}
            >
              Showroom Hours
            </div>
            <div
              style={{
                fontSize: '1.125rem',
                color: 'var(--cream)',
                lineHeight: 1.6,
              }}
            >
              Monday - Friday: 9AM - 8PM
              <br />
              Saturday: 10AM - 6PM
              <br />
              Sunday: By Appointment
            </div>
          </div>

          {/* Social */}
          <div>
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--glow-blue)',
                letterSpacing: '0.2em',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
              }}
            >
              Follow Us
            </div>
            <div
              style={{
                fontSize: '1.125rem',
                color: 'var(--cream)',
                lineHeight: 1.6,
              }}
            >
              Instagram
              <br />
              Facebook
              <br />
              YouTube
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div
          style={{
            marginTop: '6rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.875rem',
            color: 'var(--light-text)',
          }}
        >
          <div>© 2026 Elite Wheels. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>
              Privacy Policy
            </a>
            <a href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
