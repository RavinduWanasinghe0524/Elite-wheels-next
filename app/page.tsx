'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Hero3D from '@/components/Hero3D';
import ParticleBackground from '@/components/ParticleBackground';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left z-20"
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Find Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-500">
                Perfect Ride
              </span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Welcome to Elite Wheels, your one-stop destination for the best new and used cars! 
              We offer a wide range of top-quality vehicles to suit every budget and lifestyle. 
              Whether you're looking for a sleek sedan, a powerful SUV, or a fuel-efficient hatchback, 
              we have the perfect car for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/inventory"
                className="px-8 py-4 bg-gold text-primary font-bold rounded-full hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(255,215,0,0.3)]"
              >
                Explore Inventory
              </Link>
              <Link 
                href="/contact"
                className="px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>

          {/* 3D Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[50vh] lg:h-[70vh] w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl -z-10" />
            <Hero3D />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-gold rounded-full" />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
