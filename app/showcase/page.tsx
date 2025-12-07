'use client';

import CarCustomizer3D from '@/components/CarCustomizer3D';
import Car360Viewer from '@/components/Car360Viewer';
import ARPreview from '@/components/ARPreview';
import VirtualTour from '@/components/VirtualTour';
import TradeInCalculator from '@/components/TradeInCalculator';
import InsuranceCalculator from '@/components/InsuranceCalculator';
import MaintenanceCalculator from '@/components/MaintenanceCalculator';
import TCOCalculator from '@/components/TCOCalculator';
import EnvironmentalImpact from '@/components/EnvironmentalImpact';
import CarComparison from '@/components/CarComparison';
import VoiceSearch from '@/components/VoiceSearch';
import PerformanceMetrics from '@/components/PerformanceMetrics';
import InventoryTracker from '@/components/InventoryTracker';
import SocialShare from '@/components/SocialShare';
import VideoTestimonials from '@/components/VideoTestimonials';
import ReviewSystem from '@/components/ReviewSystem';
import { cars } from '@/lib/carData';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ShowcasePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Features', icon: '✨' },
    { id: '3d', name: '3D & Visualization', icon: '🎨' },
    { id: 'calculators', name: 'Calculators', icon: '🧮' },
    { id: 'ai', name: 'AI & Smart Features', icon: '🤖' },
    { id: 'social', name: 'Social & Engagement', icon: '👥' },
    { id: 'analytics', name: 'Analytics', icon: '📊' },
  ];

  return (
    <main className="min-h-screen pt-24 px-6 pb-12">
      <div className="container mx-auto max-w-7xl">
        {/* Hero */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block glass px-6 py-2 rounded-full border border-gold/30 mb-6"
          >
            <span className="text-gold font-bold tracking-wider text-sm uppercase">Feature Showcase</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            World-Class <span className="text-gradient-gold">Features</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Experience the most advanced car dealership website with 30+ unique features powered by cutting-edge technology
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gold text-black'
                    : 'glass border border-white/20 hover:border-gold/30'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* 3D & Visualization Section */}
        {(selectedCategory === 'all' || selectedCategory === '3d') && (
          <section className="mb-16">
            <h2 className="text-3xl font-display font-bold mb-8">
              <span className="text-gold">01.</span> 3D & Visualization
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">3D Car Customizer</h3>
                <CarCustomizer3D basePrice={50000} />
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">360° Viewer</h3>
                  <Car360Viewer />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">AR Preview</h3>
                  <ARPreview carModel="E-Class" carMake="Mercedes" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Virtual Showroom Tour</h3>
                <VirtualTour />
              </div>
            </div>
          </section>
        )}

        {/* Calculators Section */}
        {(selectedCategory === 'all' || selectedCategory === 'calculators') && (
          <section className="mb-16">
            <h2 className="text-3xl font-display font-bold mb-8">
              <span className="text-gold">02.</span> Advanced Calculators
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Trade-In Calculator</h3>
                <TradeInCalculator />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Insurance Calculator</h3>
                <InsuranceCalculator vehicleValue={50000} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Maintenance Calculator</h3>
                <MaintenanceCalculator brand="Toyota" vehiclePrice={30000} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Environmental Impact</h3>
                <EnvironmentalImpact fuelType="electric" annualMileage={15000} />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Total Cost of Ownership</h3>
              <TCOCalculator vehiclePrice={50000} />
            </div>
          </section>
        )}

        {/* AI & Smart Features */}
        {(selectedCategory === 'all' || selectedCategory === 'ai') && (
          <section className="mb-16">
            <h2 className="text-3xl font-display font-bold mb-8">
              <span className="text-gold">03.</span> AI & Smart Features
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Voice Search</h3>
                <VoiceSearch onSearch={(query) => console.log(query)} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Car Comparison</h3>
                <CarComparison availableCars={cars.slice(0, 12)} />
              </div>
            </div>
          </section>
        )}

        {/* Social & Engagement */}
        {(selectedCategory === 'all' || selectedCategory === 'social') && (
          <section className="mb-16">
            <h2 className="text-3xl font-display font-bold mb-8">
              <span className="text-gold">04.</span> Social & Engagement
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Video Testimonials</h3>
                <VideoTestimonials />
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Social Sharing</h3>
                  <SocialShare 
                    carMake="Mercedes"
                    carModel="E-Class"
                    carPrice={53999}
                    carImage="/images/ME.webp"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
                  <ReviewSystem carModel="Toyota Prius" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Analytics & Performance */}
        {(selectedCategory === 'all' || selectedCategory === 'analytics') && (
          <section className="mb-16">
            <h2 className="text-3xl font-display font-bold mb-8">
              <span className="text-gold">05.</span> Analytics & Performance
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Performance Metrics</h3>
                <PerformanceMetrics 
                  zeroToSixty={4.5}
                  topSpeed={180}
                  horsepower={350}
                  torque={400}
                  quarterMile={12.9}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Live Inventory Tracker</h3>
                <InventoryTracker carId={1} initialStock={2} />
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="text-center mt-16 p-12 glass-card rounded-3xl border border-gold/20">
          <h2 className="text-4xl font-display font-bold mb-4">
            Ready to Experience <span className="text-gold">Elite Wheels</span>?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Browse our inventory and experience these world-class features in action
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/inventory">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-gold px-10 py-4 text-lg"
              >
                Browse Inventory
              </motion.button>
            </a>
            <a href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-glass px-10 py-4 text-lg border-gold/30"
              >
                Back to Home
              </motion.button>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
