'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
  stat?: string;
}

export default function WhyChooseUs() {
  const features: Feature[] = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Premium Selection',
      description: 'Handpicked collection of luxury and performance vehicles',
      stat: '500+',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Best Prices',
      description: 'Competitive pricing with transparent financing options',
      stat: '98%',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Fast Delivery',
      description: 'Quick processing and delivery across Sri Lanka',
      stat: '24/7',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Customer Satisfaction',
      description: 'Dedicated support and after-sales service',
      stat: '5★',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Verified Quality',
      description: 'Thoroughly inspected and certified vehicles',
      stat: '100%',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Flexible Financing',
      description: 'Multiple payment plans tailored to your needs',
      stat: 'Easy',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Why Choose <span className="text-gradient-gold">Elite Wheels</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Experience excellence in every aspect of your car buying journey
          </p>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Statistics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 glass-card rounded-3xl p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter label="Cars Sold" value={500} suffix="+" />
            <StatCounter label="Happy Customers" value={450} suffix="+" />
            <StatCounter label="Customer Satisfaction" value={98} suffix="%" />
            <StatCounter label="Years Experience" value={15} suffix="+" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Feature Card Component
function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="glass-card rounded-2xl p-6 hover:border-gold/30 transition-all duration-500 group"
    >
      {/* Icon */}
      <div className="mb-4 relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-500">
          {feature.icon}
        </div>
        {feature.stat && (
          <div className="absolute -top-2 -right-2 glass px-3 py-1 rounded-full border border-gold/30">
            <span className="text-gold font-bold text-sm">{feature.stat}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-gold transition-colors">
        {feature.title}
      </h3>
      <p className="text-gray-300 text-sm leading-relaxed">
        {feature.description}
      </p>

      {/* Decorative Line */}
      <div className="mt-4 h-1 w-0 bg-gradient-to-r from-gold to-gold-light rounded-full group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
}

// Animated Counter Component
function StatCounter({ label, value, suffix = '' }: { label: string; value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = value / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-display font-bold text-gold mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm text-gray-400 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
