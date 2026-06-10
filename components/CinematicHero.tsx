'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handlePreloaderComplete = () => {
        setIsLoaded(true);
    };

    window.addEventListener('preloader-complete', handlePreloaderComplete);
    
    // Fallback if event was missed or not fired (e.g. dev mode refresh)
    const timer = setTimeout(() => {
        if (!isLoaded) setIsLoaded(true);
    }, 2500);

    return () => {
        window.removeEventListener('preloader-complete', handlePreloaderComplete);
        clearTimeout(timer);
    };
  }, []); // Run once on mount to set up listener

  useEffect(() => {
    if (!isLoaded || !heroRef.current || !backgroundRef.current || !headlineRef.current) return;

    const hero = heroRef.current;
    const background = backgroundRef.current;
    const headline = headlineRef.current;
    const tagline = taglineRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    // Split headline text for staggered reveal
    const headlineText = headline.textContent || '';
    // Prevent double splitting if already split
    if (!headline.querySelector('.word')) {
        const words = headlineText.split(' ');
        headline.innerHTML = words
        .map(word => `<span class="word-wrapper" style="display: inline-block; overflow: hidden; vertical-align: bottom;"><span class="word" style="display: inline-block;">${word}</span></span>`)
        .join(' ');
    }

    const wordElements = headline.querySelectorAll('.word');

    // Initial states for Entrance
    // Image starts zoomed in (1.2)
    gsap.set(background, { scale: 1.2 });
    gsap.set(wordElements, { y: '100%', opacity: 0 });
    gsap.set(tagline, { opacity: 0, y: 30 });
    gsap.set(scrollIndicator, { opacity: 0 });

    // Entrance Animation Timeline (The "Launch")
    const tl = gsap.timeline({ defaults: { ease: 'cubic-bezier(0.25, 1, 0.5, 1)' } }); // Luxury easing

    tl
    // 1. Image pulls back (1.2 -> 1.0) - Creates depth
    .to(background, {
      scale: 1.0,
      duration: 2.0,
      ease: 'cubic-bezier(0.25, 1, 0.5, 1)', // Custom luxury cubic-bezier
    })
    // 2. Text Staggers Up - Snappier 0.1s delay
    .to(wordElements, {
      y: '0%',
      opacity: 1,
      duration: 1.2,
      stagger: 0.1, // Reduced from 0.15s for faster reveal
      ease: 'cubic-bezier(0.25, 1, 0.5, 1)',
    }, '-=1.5') // Start overlapping with image zoom
    // 3. Tagline & Indicator
    .to(tagline, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'cubic-bezier(0.25, 1, 0.5, 1)',
    }, '-=0.8')
    .to(scrollIndicator, {
      opacity: 1,
      duration: 0.8,
      ease: 'cubic-bezier(0.25, 1, 0.5, 1)',
    }, '-=0.6');


    // Scroll-based animations (The "Drive")
    
    // Background: Moves slower than scroll (Parallax) and Zooms In (Drive forward)
    gsap.to(background, {
      yPercent: 30, // Move down slightly as we scroll down (parallax)
      scale: 1.1,   // Zoom in slightly (drive forward)
      filter: 'blur(5px)', // Slight motion blur/depth
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0, // Smooth scrubbing
      },
    });

    // Headline: Moves faster or fades out
    gsap.to(headline, {
      y: -150, // Move up faster
      opacity: 0,
      ease: 'power1.in',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '60% top',
        scrub: 0.5,
      },
    });

     // Tagline parallax
    gsap.to(tagline, {
      y: -50,
      opacity: 0,
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '40% top',
        scrub: 0.5,
      },
    });

    // Scroll indicator fade out
    gsap.to(scrollIndicator, {
      opacity: 0,
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '10% top', // Fade out quickly
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
  }, [isLoaded]);

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
      {/* Background Image */}
      <div
        ref={backgroundRef}
        className="hero-background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/images/ME.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          willChange: 'transform', 
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)',
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
            className="flex flex-col items-center gap-2"
        >
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">Start Engine</span>
            <div
            style={{
                width: '1px',
                height: '60px',
                background: 'linear-gradient(to bottom, transparent, var(--gold), transparent)',
                animation: 'scroll-pulse 2s ease-in-out infinite',
            }}
            />
        </div>
        <style jsx>{`
          @keyframes scroll-pulse {
            0%, 100% {
              opacity: 0.3;
              height: 40px;
            }
            50% {
              opacity: 1;
              height: 60px;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
