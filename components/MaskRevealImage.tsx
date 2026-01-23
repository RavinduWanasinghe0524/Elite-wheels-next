'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MaskRevealImageProps {
  src: string;
  alt: string;
  className?: string;
  parallaxSpeed?: number;
  revealDirection?: 'up' | 'down' | 'left' | 'right';
  priority?: boolean;
}

export default function MaskRevealImage({
  src,
  alt,
  className = '',
  parallaxSpeed = 0.5,
  revealDirection = 'up',
  priority = false,
}: MaskRevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    const container = containerRef.current;
    const image = imageRef.current;

    // Determine reveal transform based on direction
    const revealTransforms = {
      up: { y: '100%' },
      down: { y: '-100%' },
      left: { x: '100%' },
      right: { x: '-100%' },
    };

    const parallaxTransforms = {
      up: { y: '-20%' },
      down: { y: '20%' },
      left: { x: '-20%' },
      right: { x: '20%' },
    };

    // Set initial state
    gsap.set(image, revealTransforms[revealDirection]);

    // Create reveal animation
    const reveal = gsap.to(image, {
      ...{ x: '0%', y: '0%' },
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    // Create parallax animation
    const parallax = gsap.to(image, {
      ...parallaxTransforms[revealDirection],
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: parallaxSpeed,
      },
    });

    return () => {
      reveal.kill();
      parallax.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [parallaxSpeed, revealDirection]);

  return (
    <div
      ref={containerRef}
      className={`mask-reveal-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        ref={imageRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '120%', // Extra height for parallax
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}
