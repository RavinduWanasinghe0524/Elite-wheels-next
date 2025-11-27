'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Car } from '@/lib/carData';
import { useState } from 'react';

interface CarCardProps {
  car: Car;
  onViewDetails: (car: Car) => void;
}

export default function CarCard3D({ car, onViewDetails }: CarCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(car)}
    >
      {/* Gold Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
      
      <div className="relative glass-card rounded-2xl overflow-hidden h-full flex flex-col border border-white/10 group-hover:border-gold/50 transition-colors duration-300">
        {/* Image Container */}
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={car.image}
            alt={`${car.make} ${car.model}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-gold/30">
            <span className="text-xs font-bold text-gold">{car.year}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-4">
            <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-gold transition-colors">{car.make} {car.model}</h3>
            <p className="text-gray-400 text-sm">{car.category}</p>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <span className="text-2xl font-bold text-gradient-gold">
              ${car.price.toLocaleString()}
            </span>
            
            <button
              className="px-4 py-2 bg-white/5 hover:bg-gold hover:text-black rounded-lg transition-all duration-300 text-sm font-bold border border-white/10 hover:border-gold"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
