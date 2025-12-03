'use client';

import { motion } from 'framer-motion';
import EnhancedCarCard from './EnhancedCarCard';
import { cars } from '@/lib/carData';
import type { Car } from '@/lib/carData';

interface RelatedCarsProps {
  currentCar: Car;
}

export default function RelatedCars({ currentCar }: RelatedCarsProps) {
  // Find related cars based on category or make
  const relatedCars = cars
    .filter(car => 
      car.id !== currentCar.id && 
      (car.category === currentCar.category || car.make === currentCar.make)
    )
    .slice(0, 3);

  if (relatedCars.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
          Similar <span className="text-gold">Vehicles</span>
        </h2>
        <p className="text-gray-400">You might also be interested in these cars</p>
        <div className="w-24 h-1 bg-gold rounded-full mt-4" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedCars.map((car, index) => (
          <EnhancedCarCard key={car.id} car={car} index={index} />
        ))}
      </div>
    </section>
  );
}
