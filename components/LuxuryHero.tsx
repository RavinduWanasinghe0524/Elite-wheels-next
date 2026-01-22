'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';

export default function LuxuryHero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Text reveal animation on load
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll('.word');
      gsap.fromTo(
        words,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3
        }
      );
    }

    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 1
        }
      );
    }
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal" />
      
      {/* Blue glow accents */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-glow-blue rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gold rounded-full blur-3xl opacity-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="split-screen">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col justify-center space-y-8"
          >
            {/* Small badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block w-fit"
            >
              <div className="glass px-6 py-3 rounded-full border border-glow-blue/30">
                <span className="text-sm uppercase tracking-widest text-glow-blue font-semibold">
                  We are movement
                </span>
              </div>
            </motion.div>

            {/* Main headline with text reveal */}
            <div className="overflow-hidden">
              <h1 ref={titleRef} className="text-[clamp(3rem,8vw,8rem)] font-black leading-none tracking-tight">
                <span className="block">
                  <span className="word inline-block">Experience</span>
                </span>
                <span className="block">
                  <span className="word inline-block text-gradient-gold">Luxury</span>
                </span>
                <span className="block">
                  <span className="word inline-block">in Motion</span>
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-xl md:text-2xl text-dark-text-muted max-w-xl leading-relaxed font-light"
            >
              Discover a curated collection of the world's most exclusive vehicles.
              Performance, prestige, and perfection in every detail.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button className="btn-gold px-10 py-4 text-lg shadow-lg shadow-gold/20">
                View Collection
              </button>
              <button className="btn-glass px-10 py-4 text-lg border-glow-blue/30">
                Book Test Drive
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.6 }}
              className="flex items-center gap-12 pt-8 border-t border-white/10"
            >
              <div>
                <div className="text-4xl font-bold text-white">500+</div>
                <div className="text-sm text-dark-text-muted uppercase tracking-wide">Vehicles</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white">150+</div>
                <div className="text-sm text-dark-text-muted uppercase tracking-wide">Locations</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white">24/7</div>
                <div className="text-sm text-dark-text-muted uppercase tracking-wide">Support</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Car Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative h-[600px] lg:h-[700px]"
          >
            {/* Glow effect behind car */}
            <div className="absolute inset-0 bg-gradient-radial from-gold/20 via-transparent to-transparent blur-3xl" />
            
            {/* Car image */}
            <div className="luxury-image h-full relative">
              <Image
                src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2070"
                alt="Luxury Sports Car"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="absolute bottom-8 left-8 glass-card px-6 py-4 rounded-2xl"
            >
              <div className="text-sm text-dark-text-muted uppercase tracking-wide mb-1">
                Starting from
              </div>
              <div className="text-3xl font-bold text-gold">$89,500</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
