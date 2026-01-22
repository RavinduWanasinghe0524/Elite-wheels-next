'use client';

import { motion } from 'framer-motion';
import LuxuryHero from '@/components/LuxuryHero';
import FleetShowcase from '@/components/FleetShowcase';
import AccordionFeatures from '@/components/AccordionFeatures';
import LuxuryCarCard from '@/components/LuxuryCarCard';
import PersistentCTA from '@/components/PersistentCTA';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import { cars } from '@/lib/carData';

export default function Home() {
  // Get featured cars (first 6)
  const featuredCars = cars.slice(0, 6);

  return (
    <main className="min-h-screen overflow-hidden selection:bg-gold selection:text-black">
      {/* Hero Section */}
      <LuxuryHero />

      {/* Fleet Showcase */}
      <FleetShowcase />

      {/* Featured Collection */}
      <section className="py-32 relative bg-charcoal-light">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-block mb-4">
              <div className="glass px-6 py-3 rounded-full border border-gold/30">
                <span className="text-sm uppercase tracking-widest text-gold font-semibold">
                  Featured Collection
                </span>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Discover <span className="text-gradient-gold">Excellence</span>
            </h2>
            <p className="text-xl text-dark-text-muted max-w-2xl mx-auto">
              Explore our handpicked selection of premium vehicles
            </p>
          </motion.div>

          {/* Car Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredCars.map((car, index) => (
              <LuxuryCarCard
                key={car.id}
                id={String(car.id)}
                make={car.make}
                model={car.model}
                year={car.year}
                price={car.price}
                image={car.image || 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2070'}
                category={car.category}
                index={index}
              />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <motion.a
              href="/inventory"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block btn-glass px-12 py-4 border-gold/30 hover:bg-gold/10"
            >
              View All Vehicles
              <svg className="w-5 h-5 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Accordion Features */}
      <AccordionFeatures />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <Testimonials />

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden bg-charcoal">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-glow-blue/10" />
        
        {/* Large background text */}
        <div className="large-bg-text" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          DRIVE
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card rounded-3xl p-12 md:p-20 text-center max-w-5xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              Ready to Find Your <br />
              <span className="text-gradient-gold">Dream Car?</span>
            </h2>
            <p className="text-xl md:text-2xl text-dark-text-muted mb-12 max-w-3xl mx-auto font-light">
              Browse our extensive collection or get in touch with our expert team to find the perfect vehicle for you.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <motion.a
                href="/inventory"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-gold px-12 py-5 text-lg shadow-lg shadow-gold/20"
              >
                Browse Inventory
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-glass px-12 py-5 text-lg border-glow-blue/30"
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Persistent CTA */}
      <PersistentCTA />
    </main>
  );
}
