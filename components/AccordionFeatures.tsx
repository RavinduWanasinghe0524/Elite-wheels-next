'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import  gsap from 'gsap';
import Image from 'next/image';

interface Feature {
  title: string;
  description: string;
  icon?: string;
}

const features: Feature[] = [
  {
    title: '24/7 Availability',
    description: 'Round-the-clock access to our premium fleet. We\'re ready when you are, ensuring your automotive needs are met at any time.',
  },
  {
    title: 'Global Delivery',
    description: 'Seamless delivery worldwide. From collection to doorstep, experience unparalleled service across 150+ locations globally.',
  },
  {
    title: 'Concierge Service',
    description: 'Dedicated personal concierge for every client. From initial inquiry to ongoing support, your satisfaction is our priority.',
  },
  {
    title: 'Premium Warranty',
    description: 'Comprehensive coverage with our exclusive warranty program. Drive with confidence knowing you\'re protected by the best.',
  },
  {
    title: 'White Glove Service',
    description: 'Every detail managed with precision. From paperwork to maintenance, we handle it all so you can enjoy the drive.',
  },
];

export default function AccordionFeatures() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cream light-mode" />
      
      {/* Large background text */}
      <div className="large-bg-text text-center" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        ELITE
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <div className="glass px-6 py-3 rounded-full border border-gold/30">
                <span className="text-sm uppercase tracking-widest text-gold font-semibold">
                  Why Choose Us
                </span>
              </div>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-light-text">
              A Better Way to <span className="text-gradient-gold">Drive</span>
            </h2>
            <p className="text-xl text-light-text-muted max-w-2xl mx-auto">
              Experience unparalleled luxury and service with every journey
            </p>
          </div>

          {/* Accordion */}
          <div className="space-y-2">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="accordion-item bg-white/60 backdrop-blur-lg rounded-2xl overflow-hidden border border-black/10"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="accordion-header w-full text-left px-8 py-6 flex justify-between items-center hover:bg-white/40 transition-colors"
                >
                  <span className="text-2xl font-bold text-light-text">{feature.title}</span>
                  <motion.svg
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6 text-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-6 text-light-text-muted text-lg leading-relaxed">
                    {feature.description}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
