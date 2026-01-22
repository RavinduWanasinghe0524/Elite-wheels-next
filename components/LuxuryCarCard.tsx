'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface LuxuryCarCardProps {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  category: string;
  index?: number;
}

export default function LuxuryCarCard({
  id,
  make,
  model,
  year,
  price,
  image,
  category,
  index = 0,
}: LuxuryCarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/inventory/${id}`}>
        <div className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-glow-blue/50 transition-all duration-500">
          {/* Image Container */}
          <div className="relative h-[400px] overflow-hidden bg-charcoal-light">
            <Image
              src={image}
              alt={`${make} ${model}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Badge */}
            <div className="absolute top-6 right-6 glass px-4 py-2 rounded-full border border-gold/30">
              <span className="text-gold font-bold text-sm uppercase tracking-wide">{make}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-4">
            {/* Title */}
            <div>
              <h3 className="text-3xl font-bold mb-2 group-hover:text-gold transition-colors duration-300">
                {make} {model}
              </h3>
              <div className="flex items-center gap-4 text-sm text-dark-text-muted">
                <span>{year}</span>
                <span>•</span>
                <span className="uppercase tracking-wide">{category}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Price and CTA */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-xs text-dark-text-muted uppercase tracking-widest mb-1">
                  Starting at
                </p>
                <p className="text-3xl font-bold text-gold">
                  ${price.toLocaleString()}
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-glass px-6 py-3 text-sm border-glow-blue/30"
              >
                View Details
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
