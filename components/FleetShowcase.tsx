'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaskRevealImage from './MaskRevealImage';

gsap.registerPlugin(ScrollTrigger);

interface Car {
  make: string;
  model: string;
  image: string;
  description: string;
}

const fleetCars: Car[] = [
  {
    make: 'Mercedes-Benz',
    model: 'S-Class',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070',
    description: 'The pinnacle of luxury sedans',
  },
  {
    make: 'Porsche',
    model: '911 Turbo S',
    image: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?q=80&w=2073',
    description: 'Unmatched performance and precision',
  },
  {
    make: 'BMW',
    model: 'i8',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070',
    description: 'Innovation meets elegance',
  },
];

export default function FleetShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const carsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Scroll-triggered car entrance animations
    carsRef.current.forEach((car, index) => {
      if (car) {
        gsap.fromTo(
          car,
          {
            y: 150,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: car,
              start: 'top bottom-=100',
              end: 'center center',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden bg-charcoal">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4">
            <div className="glass px-6 py-3 rounded-full border border-glow-blue/30">
              <span className="text-sm uppercase tracking-widest text-glow-blue font-semibold">
                Our Fleet
              </span>
            </div>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            Luxury that <br />
            <span className="text-gradient-gold">moves with you</span>
          </h2>
        </motion.div>

        {/* Fleet Grid */}
        <div className="space-y-32">
          {fleetCars.map((car, index) => (
            <div
              key={index}
              ref={(el) => {
                carsRef.current[index] = el;
              }}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'md:grid-flow-dense' : ''
              }`}
            >
              {/* Text Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                <div>
                  <p className="text-gold text-sm uppercase tracking-widest mb-3 font-semibold">
                    {car.make}
                  </p>
                  <h3 className="text-5xl md:text-6xl font-black mb-4">{car.model}</h3>
                  <p className="text-2xl text-dark-text-muted font-light leading-relaxed">
                    {car.description}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-glass px-8 py-4 text-base border-gold/30"
                >
                  Explore Model
                </motion.button>
              </div>

              {/* Car Image with Mask Reveal */}
              <div className={`relative h-[500px] ${index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                <MaskRevealImage
                  src={car.image}
                  alt={`${car.make} ${car.model}`}
                  className="h-full rounded-3xl"
                  parallaxSpeed={1.5}
                  revealDirection={index % 2 === 0 ? 'up' : 'down'}
                  priority={index === 0}
                />
                
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-radial from-gold/20 via-transparent to-transparent blur-3xl -z-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
