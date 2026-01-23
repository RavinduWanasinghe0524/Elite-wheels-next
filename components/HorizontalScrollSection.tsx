'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollItem {
  id: number;
  name: string;
  image: string;
  price: string;
  year: number;
}

interface HorizontalScrollSectionProps {
  title: string;
  items: HorizontalScrollItem[];
}

export default function HorizontalScrollSection({ title, items }: HorizontalScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current) return;

    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;
    const progress = progressRef.current;

    // Calculate total scroll width
    const scrollWidth = scrollContainer.scrollWidth - window.innerWidth;

    // Create horizontal scroll animation
    const horizontalScroll = gsap.to(scrollContainer, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollWidth}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progress) {
            gsap.to(progress, {
              scaleX: self.progress,
              duration: 0.1,
            });
          }
        },
      },
    });

    return () => {
      horizontalScroll.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [items]);

  return (
    <section
      ref={sectionRef}
      className="horizontal-scroll-section"
      style={{
        position: 'relative',
        background: 'var(--charcoal)',
        overflow: 'hidden',
      }}
    >
      {/* Progress Bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'rgba(255, 255, 255, 0.1)',
          zIndex: 100,
        }}
      >
        <div
          ref={progressRef}
          style={{
            height: '100%',
            width: '100%',
            background: 'var(--glow-blue)',
            transformOrigin: 'left',
            transform: 'scaleX(0)',
          }}
        />
      </div>

      {/* Section Title */}
      <div
        style={{
          position: 'absolute',
          top: '4rem',
          left: '4rem',
          zIndex: 10,
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: 'var(--cream)',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </h2>
      </div>

      {/* Scrolling Container */}
      <div
        ref={scrollContainerRef}
        className="horizontal-scroll-container"
        style={{
          display: 'flex',
          gap: '3rem',
          padding: '12rem 4rem 4rem',
          width: 'fit-content',
        }}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className="horizontal-scroll-card"
            style={{
              minWidth: '500px',
              maxWidth: '500px',
              position: 'relative',
            }}
          >
            {/* Image */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '350px',
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '1.5rem',
              }}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="500px"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
                }}
              />
            </div>

            {/* Info */}
            <div style={{ padding: '0 1rem' }}>
              <div
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--gold)',
                  letterSpacing: '0.1em',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                }}
              >
                {item.year} Model
              </div>
              <h3
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--cream)',
                  marginBottom: '1rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {item.name}
              </h3>
              <div
                style={{
                  fontSize: '1.5rem',
                  color: 'var(--glow-blue)',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                }}
              >
                {item.price}
              </div>
              <MagneticButton
                variant="outline"
                href={`/inventory/${item.id}`}
                strength={0.2}
              >
                View Details
              </MagneticButton>
            </div>
          </div>
        ))}

        {/* End Spacer */}
        <div style={{ minWidth: '4rem' }} />
      </div>
    </section>
  );
}
