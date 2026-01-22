'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function PersistentCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show CTA after user scrolls a bit
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 100 
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="persistent-cta"
      style={{ 
        pointerEvents: isVisible ? 'auto' : 'none',
        bottom: '2rem',
        left: '50%',
        transform: isVisible ? 'translateX(-50%)' : 'translate(-50%, 100px)'
      }}
    >
      <Link href="/book-test-drive">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-gold px-8 py-4 text-base font-bold shadow-2xl shadow-gold/30 flex items-center gap-3"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 7l5 5m0 0l-5 5m5-5H6" 
            />
          </svg>
          Book Test Drive
        </motion.button>
      </Link>
    </motion.div>
  );
}
