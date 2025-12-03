'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import EnhancedHero3D from '@/components/EnhancedHero3D';
import ParticleBackground from '@/components/ParticleBackground';
import SearchBar from '@/components/SearchBar';
import EnhancedCarCard from '@/components/EnhancedCarCard';
import WhyChooseUs from '@/components/WhyChooseUs';
import { cars } from '@/lib/carData';

export default function Home() {
  const handleSearch = (filters: any) => {
    console.log('Search filters:', filters);
    // Navigate to inventory with filters
    window.location.href = `/inventory?location=${filters.location}&carType=${filters.carType}`;
  };

  return (
    <main className="min-h-screen overflow-hidden selection:bg-gold selection:text-black">
      <ParticleBackground />
      
      {/* Hero Section with Integrated Search */}
      <section className="relative min-h-screen w-full flex items-center overflow-hidden pt-20">
        {/* Content Container */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="inline-block glass px-4 py-2 rounded-full border border-gold/30">
                <span className="text-gold font-bold tracking-wider text-sm uppercase">The Ultimate Driving Machine</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight">
                Experience <br />
                <span className="text-gradient-gold">Luxury</span>
              </h1>
              
              <p className="text-gray-300 text-lg md:text-xl max-w-lg leading-relaxed">
                Discover a curated collection of the world's most exclusive vehicles. 
                Performance, prestige, and perfection in every detail.
              </p>
              
              <div className="flex items-center gap-8 pt-4 border-t border-white/10">
                <div>
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-sm text-gray-400">Cars Available</div>
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
              className="h-[500px] lg:h-[600px] w-full relative"
            >
              <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full transform scale-75" />
              <EnhancedHero3D />
            </motion.div>
          </div>

          {/* Integrated Search Bar */}
          <div className="max-w-6xl mx-auto mt-8">
            <SearchBar onSearch={handleSearch} />
          </div>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Featured <span className="text-gold">Collection</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-6">
              Explore our handpicked selection of premium vehicles
            </p>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.slice(0, 6).map((car, index) => (
              <EnhancedCarCard key={car.id} car={car} index={index} />
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link href="/inventory">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-glass px-12 py-4 border-gold/30 hover:bg-gold/10"
              >
                View All Vehicles
                <svg className="w-5 h-5 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-gold/5" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-12 md:p-16 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Find Your <span className="text-gradient-gold">Dream Car?</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Browse our extensive collection or get in touch with our expert team to find the perfect vehicle for you.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link href="/inventory">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-gold px-10 py-4 text-lg shadow-lg shadow-gold/20"
                >
                  Browse Inventory
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-glass px-10 py-4 text-lg border-gold/30"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
