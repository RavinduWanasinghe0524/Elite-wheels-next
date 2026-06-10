'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2000; // 2 seconds total load time
    const interval = 20; // update every 20ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    const completionTimer = setTimeout(() => {
      setIsLoading(false);
      // Dispatch event for other components (like Hero) to react
      window.dispatchEvent(new CustomEvent('preloader-complete'));
    }, duration + 500); // Slight delay after hitting 100%

    return () => {
      clearInterval(timer);
      clearTimeout(completionTimer);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white overflow-hidden"
          initial={{ y: 0 }}
          exit={{ 
            y: '-100%', 
            transition: { 
              duration: 1.2, 
              ease: [0.25, 1, 0.5, 1] // Luxury cubic-bezier easing
            } 
          }}
        >
          <div className="relative z-10 flex flex-col items-center">
             {/* Percentage Counter */}
            <motion.div 
              className="text-8xl md:text-9xl font-bold font-display tracking-tighter tabular-nums"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {Math.round(progress)}%
            </motion.div>

            {/* Engine Start Label */}
            <motion.div
              className="mt-4 text-xs uppercase tracking-[0.2em] text-white/50 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Engine Start
            </motion.div>
          </div>
          
          {/* Subtle gold glow accent */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
            style={{
              background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.08, 0.05],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
