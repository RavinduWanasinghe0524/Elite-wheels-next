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
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-accent to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500" />
      
      <div className="relative glass-card rounded-2xl overflow-hidden h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={car.image}
            alt={`${car.make} ${car.model}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
          
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <span className="text-xs font-medium text-gold">{car.year}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-1">{car.make} {car.model}</h3>
            <p className="text-gray-400 text-sm">{car.category}</p>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              ${car.price.toLocaleString()}
            </span>
            
            <button
              onClick={() => onViewDetails(car)}
              className="px-4 py-2 bg-white/10 hover:bg-gold hover:text-primary rounded-lg transition-all duration-300 text-sm font-medium border border-white/10 hover:border-gold"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
