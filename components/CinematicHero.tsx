'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !backgroundRef.current || !headlineRef.current) return;

    const hero = heroRef.current;
    const background = backgroundRef.current;
    const headline = headlineRef.current;
    const tagline = taglineRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    // Split headline text for staggered reveal
    const headlineText = headline.textContent || '';
    const words = headlineText.split(' ');
    headline.innerHTML = words
      .map(word => `<span class="word-wrapper" style="display: inline-block; overflow: hidden; vertical-align: bottom;"><span class="word" style="display: inline-block;">${word}</span></span>`)
      .join(' ');

    const wordElements = headline.querySelectorAll('.word');

    // Initial states
    gsap.set(wordElements, { y: '100%', opacity: 0 });
    gsap.set(tagline, { opacity: 0, y: 30 });
    gsap.set(scrollIndicator, { opacity: 0 });

    // Entrance animations
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.to(wordElements, {
      y: '0%',
      opacity: 1,
      duration: 1.2,
      stagger: 0.15,
      delay: 0.5,
    })
    .to(tagline, {
      opacity: 1,
      y: 0,
      duration: 1,
    }, '-=0.6')
    .to(scrollIndicator, {
      opacity: 1,
      duration: 0.8,
    }, '-=0.4');

    // Scroll-based animations
    // Background scale and blur
    gsap.to(background, {
      scale: 1.2,
      filter: 'blur(10px)',
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Headline fade and move
    gsap.to(headline, {
      opacity: 0,
      y: -100,
      ease: 'power2.in',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '50% top',
        scrub: 1,
      },
    });

    // Tagline parallax
    gsap.to(tagline, {
      y: 200,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
    });

    // Scroll indicator fade out
    gsap.to(scrollIndicator, {
      opacity: 0,
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '20% top',
        scrub: true,
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === hero) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="cinematic-hero"
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--charcoal)',
      }}
    >
      {/* Background Image (Replacing Video to Fix 404 Errors) */}
      <div
        ref={backgroundRef}
        className="hero-background"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: '100%',
          height: '100%',
          transform: 'translate(-50%, -50%)',
          backgroundImage: 'url(/images/ME.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 2rem',
          maxWidth: '1400px',
        }}
      >
        {/* Main Headline */}
        <h1
          ref={headlineRef}
          style={{
            fontSize: 'clamp(3rem, 10vw, 12rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 0.9,
            marginBottom: '2rem',
            color: 'var(--cream)',
            textTransform: 'uppercase',
          }}
        >
          WE ARE MOVEMENT
        </h1>

        {/* Tagline */}
        <div
          ref={taglineRef}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            letterSpacing: '0.2em',
            color: 'var(--light-text)',
            marginBottom: '3rem',
            textTransform: 'uppercase',
            fontWeight: 300,
          }}
        >
          Luxury Beyond Limits
        </div>

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <MagneticButton variant="gold" href="#inventory">
            Explore Fleet
          </MagneticButton>
          <MagneticButton variant="glass" href="#contact">
            Book Test Drive
          </MagneticButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: '2px',
            height: '60px',
            background: 'linear-gradient(to bottom, transparent, var(--glow-blue), transparent)',
            animation: 'scroll-pulse 2s ease-in-out infinite',
          }}
        />
        <style jsx>{`
          @keyframes scroll-pulse {
            0%, 100% {
              opacity: 0.3;
              transform: translateY(0);
            }
            50% {
              opacity: 1;
              transform: translateY(10px);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
