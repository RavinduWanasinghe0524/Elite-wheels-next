'use client';

import { useRef, MouseEvent, ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  variant?: 'gold' | 'glass' | 'outline';
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  strength = 0.3,
  variant = 'gold',
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!buttonRef.current) return;
    
    gsap.to(buttonRef.current, {
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    
    gsap.to(buttonRef.current, {
      scale: 1,
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.3,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(buttonRef.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    });

    // Update glow position
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.6,
        x: x * 0.5,
        y: y * 0.5,
        duration: 0.2,
      });
    }
  };

  const variantClasses = {
    gold: 'btn-gold',
    glass: 'btn-glass',
    outline: 'btn-outline',
  };

  const baseClasses = `magnetic-button ${variantClasses[variant]} ${className}`;

  const commonProps = {
    ref: buttonRef as any,
    className: baseClasses,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseMove: handleMouseMove,
    style: { position: 'relative' as const },
  };

  const content = (
    <>
      <div
        ref={glowRef}
        className="magnetic-glow"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, var(--glow-blue-soft) 0%, transparent 70%)',
          opacity: 0,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          zIndex: -1,
        }}
      />
      {children}
    </>
  );

  if (href) {
    return (
      <a {...commonProps} href={href}>
        {content}
      </a>
    );
  }

  return (
    <button {...commonProps} onClick={onClick}>
      {content}
    </button>
  );
}
