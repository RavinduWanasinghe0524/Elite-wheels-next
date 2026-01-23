'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VehicleSpec {
  label: string;
  value: string;
  icon?: string;
}

interface StickyVehicleDetailsProps {
  name: string;
  tagline: string;
  image: string;
  blueprintImage?: string;
  specs: VehicleSpec[];
}

export default function StickyVehicleDetails({
  name,
  tagline,
  image,
  blueprintImage,
  specs,
}: StickyVehicleDetailsProps) {
  const [showBlueprint, setShowBlueprint] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !specsRef.current) return;

    const section = sectionRef.current;
    const specsContainer = specsRef.current;
    const specItems = specsContainer.querySelectorAll('.spec-item');

    // Animate specs on scroll
    specItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [specs]);

  return (
    <section
      ref={sectionRef}
      className="sticky-vehicle-details"
      style={{
        position: 'relative',
        minHeight: '200vh',
        background: 'var(--charcoal)',
        padding: '4rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: '1600px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start',
        }}
      >
        {/* Left: Sticky Image */}
        <div
          ref={imageContainerRef}
          style={{
            position: 'sticky',
            top: '10vh',
            height: 'fit-content',
          }}
          onMouseEnter={() => setShowBlueprint(true)}
          onMouseLeave={() => setShowBlueprint(false)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '600px',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <Image
              src={image}
              alt={name}
              fill
              style={{ objectFit: 'cover' }}
              priority
              sizes="800px"
            />

            {/* Blueprint Overlay */}
            {blueprintImage && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: showBlueprint ? 0.8 : 0,
                  transition: 'opacity 0.6s ease',
                  background: 'rgba(0, 0, 0, 0.8)',
                  mixBlendMode: 'multiply',
                }}
              >
                <Image
                  src={blueprintImage}
                  alt={`${name} blueprint`}
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="800px"
                />
              </div>
            )}

            {/* Glow Border */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                border: '2px solid var(--glow-blue)',
                borderRadius: '8px',
                opacity: showBlueprint ? 1 : 0,
                transition: 'opacity 0.6s ease',
                boxShadow: showBlueprint ? '0 0 30px var(--glow-blue-soft)' : 'none',
              }}
            />
          </div>

          {/* Vehicle Name */}
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: 'var(--cream)',
              marginTop: '2rem',
              textTransform: 'uppercase',
            }}
          >
            {name}
          </h2>
          <p
            style={{
              fontSize: '1.125rem',
              color: 'var(--light-text)',
              marginTop: '0.5rem',
              letterSpacing: '0.05em',
            }}
          >
            {tagline}
          </p>
        </div>

        {/* Right: Scrolling Specs */}
        <div
          ref={specsRef}
          style={{
            paddingTop: '10vh',
          }}
        >
          <h3
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--gold)',
              marginBottom: '3rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Technical Specifications
          </h3>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '3rem',
            }}
          >
            {specs.map((spec, index) => (
              <div
                key={index}
                className="spec-item"
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingBottom: '2rem',
                }}
              >
                <div
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--glow-blue)',
                    letterSpacing: '0.15em',
                    marginBottom: '0.75rem',
                    textTransform: 'uppercase',
                    fontFamily: 'monospace',
                  }}
                >
                  {spec.label}
                </div>
                <div
                  style={{
                    fontSize: 'clamp(1.75rem, 3vw, 3rem)',
                    fontWeight: 700,
                    color: 'var(--cream)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {spec.value}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div
            style={{
              marginTop: '4rem',
              padding: '2rem',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--light-text)',
                lineHeight: 1.8,
                letterSpacing: '0.02em',
              }}
            >
              <strong style={{ color: 'var(--gold)' }}>Note:</strong> Hover over the
              vehicle image to reveal the technical blueprint overlay. All specifications
              are manufacturer-certified and represent peak performance capabilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
