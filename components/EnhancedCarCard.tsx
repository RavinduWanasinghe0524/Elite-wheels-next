'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Car } from '@/lib/carData';

interface EnhancedCarCardProps {
  car: Car;
  index?: number;
}

export default function EnhancedCarCard({ car, index = 0 }: EnhancedCarCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col hover:border-gold/30 transition-all duration-500">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-black/40 to-black/20">
          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="glass px-3 py-1.5 rounded-full text-xs font-bold text-gold border border-gold/30">
              {car.category}
            </span>
          </div>

          {/* Favorite Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 z-10 p-2 glass rounded-full hover:bg-gold/20 transition-colors"
          >
            <svg
              className={`w-5 h-5 ${isFavorite ? 'fill-gold text-gold' : 'fill-none text-white'}`}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </motion.button>

          {/* Car Image with Zoom Effect */}
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={imageError ? '/images/logo.png' : car.image}
              alt={`${car.make} ${car.model}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Quick Actions - Show on Hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="absolute inset-x-0 bottom-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            <Link href={`/inventory?id=${car.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gold text-black font-bold rounded-lg text-sm hover:bg-gold-light transition-colors shadow-lg"
              >
                View Details
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 glass border border-white/20 text-white font-bold rounded-lg text-sm hover:bg-white/10 transition-colors"
            >
              Compare
            </motion.button>
          </motion.div>
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Title */}
          <div className="mb-4">
            <h3 className="text-2xl font-display font-bold text-white mb-1">
              {car.make} {car.model}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{car.year}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-300 mb-4 line-clamp-2 flex-grow">
            {car.description}
          </p>

          {/* Features/Specs - if available */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Auto
            </div>
            <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              5 Seats
            </div>
            <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Premium
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />

          {/* Price and CTA */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-400 mb-1">Starting from</div>
              <div className="text-2xl font-bold text-gold">
                ${car.price.toLocaleString()}
              </div>
            </div>
            <Link href={`/inventory?id=${car.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-gold/10 border border-gold/30 rounded-full hover:bg-gold hover:text-black transition-all duration-300 group/btn"
              >
                <svg
                  className="w-5 h-5 text-gold group-hover/btn:text-black transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </Link>
          </div>
        </div>

        {/* 3D Tilt Effect Shadow */}
        <div className="absolute inset-0 -z-10 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gold" />
        </div>
      </div>
    </motion.div>
  );
}
