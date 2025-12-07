'use client';

import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cars } from '@/lib/carData';
import CarGallery from '@/components/CarGallery';
import CarSpecs from '@/components/CarSpecs';
import ContactDealerForm from '@/components/ContactDealerForm';
import RelatedCars from '@/components/RelatedCars';
import ParticleBackground from '@/components/ParticleBackground';

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const car = cars.find(c => c.id === parseInt(params.id));

  if (!car) {
    notFound();
  }

  return (
    <main className="min-h-screen relative">
      <ParticleBackground />

      <div className="container mx-auto px-6 py-24 relative z-10">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-2 text-sm text-gray-400"
        >
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/inventory" className="hover:text-gold transition-colors">Inventory</Link>
          <span>/</span>
          <span className="text-white">{car.make} {car.model}</span>
        </motion.nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-start justify-between gap-6 mb-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-2">
                {car.year} {car.make} <span className="text-gradient-gold">{car.model}</span>
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-400">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {car.category}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Colombo, Sri Lanka
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-400 mb-1">Starting from</div>
              <div className="text-5xl font-bold text-gold">
                ${car.price.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400 mt-2">or $1,299/month</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-gold"
            >
              Schedule Test Drive
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-glass"
            >
              Get Financing
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-glass"
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-glass"
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Save
            </motion.button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Gallery */}
            <CarGallery images={[car.image]} carName={`${car.make} ${car.model}`} />

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-display font-bold mb-4">
                About This <span className="text-gold">Vehicle</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                {car.description}
              </p>
              <p className="text-gray-300 leading-relaxed">
                This exceptional {car.year} {car.make} {car.model} represents the perfect blend of 
                luxury, performance, and reliability. Meticulously maintained and ready for its next owner, 
                this vehicle offers an unparalleled driving experience with cutting-edge technology and 
                premium features throughout.
              </p>
            </motion.div>

            {/* Specifications */}
            <CarSpecs car={car} />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Form */}
            <ContactDealerForm />

            {/* Seller Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 rounded-2xl border border-white/10 space-y-4"
            >
              <h3 className="text-xl font-bold text-white">Dealer Information</h3>
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                  <span className="text-2xl font-bold text-black">EW</span>
                </div>
                <div>
                  <div className="font-bold text-white">Elite Wheels</div>
                  <div className="text-sm text-gray-400">Premium Dealership</div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <a href="tel:+94112345678" className="flex items-center gap-3 text-gray-400 hover:text-gold transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +94 11 234 5678
                </a>
                
                <a href="mailto:info@elitewheels.lk" className="flex items-center gap-3 text-gray-400 hover:text-gold transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@elitewheels.lk
                </a>

                <div className="flex items-center gap-3 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  123 Galle Road, Colombo 03
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="glass px-3 py-2 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-2 text-gold text-xs font-bold">
                    <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                    OPEN NOW
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 rounded-2xl border border-white/10 space-y-3"
            >
              <h3 className="text-lg font-bold text-white mb-4">Why Buy From Us</h3>
              {[
                { icon: '✓', text: 'Certified Pre-Owned' },
                { icon: '🛡️', text: 'Warranty Included' },
                { icon: '💯', text: '100% Verified' },
                { icon: '🔧', text: 'Free Service' },
              ].map((badge, index) => (
                <div key={index} className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="text-gold text-lg">{badge.icon}</span>
                  {badge.text}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Related Cars */}
        <RelatedCars currentCar={car} />
      </div>
    </main>
  );
}
