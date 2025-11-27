'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import EnhancedHero3D from '@/components/EnhancedHero3D';
import ParticleBackground from '@/components/ParticleBackground';
import CarCard3D from '@/components/CarCard3D';
import { cars } from '@/lib/carData';

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden selection:bg-gold selection:text-black">
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        {/* Content Container */}
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-block glass px-4 py-2 rounded-full border border-gold/30">
              <span className="text-gold font-bold tracking-wider text-sm uppercase">The Ultimate Driving Machine</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-tight">
              Experience <br />
              <span className="text-gradient-gold">Luxury</span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-lg leading-relaxed">
              Discover a curated collection of the world's most exclusive vehicles. 
              Performance, prestige, and perfection in every detail.
            </p>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <Link href="/inventory">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-gold shadow-lg shadow-gold/20"
                >
                  View Inventory
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-glass"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
            
            <div className="flex items-center gap-8 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-sm text-gray-400">Cars Sold</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">98%</div>
                <div className="text-sm text-gray-400">Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </div>
            </div>
          </motion.div>
          
          {/* 3D Car Model */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-[600px] w-full relative"
          >
            <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full transform scale-75" />
            <EnhancedHero3D />
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Featured <span className="text-gold">Collection</span></h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.slice(0, 3).map((car) => (
              <CarCard3D key={car.id} car={car} onViewDetails={() => {}} />
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link href="/inventory">
              <button className="btn-glass px-12 border-gold/30 hover:bg-gold/10">
                View All Vehicles
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
