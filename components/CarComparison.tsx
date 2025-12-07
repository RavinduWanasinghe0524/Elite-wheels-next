'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Car } from '@/lib/carData';
import Image from 'next/image';

interface CarComparisonProps {
  availableCars: Car[];
}

export default function CarComparison({ availableCars }: CarComparisonProps) {
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);
  const [isSelecting, setIsSelecting] = useState(true);

  const addCar = (car: Car) => {
    if (selectedCars.length < 4 && !selectedCars.find(c => c.id === car.id)) {
      setSelectedCars([...selectedCars, car]);
    }
  };

  const removeCar = (carId: number) => {
    setSelectedCars(selectedCars.filter(c => c.id !== carId));
  };

  const comparisonCategories = [
    { key: 'price', label: 'Price', format: (val: number) => `$${val.toLocaleString()}`, winner: 'lowest' },
    { key: 'year', label: 'Year', format: (val: number) => val.toString(), winner: 'highest' },
    { key: 'category', label: 'Category', format: (val: string) => val, winner: null },
  ];

  const determineWinner = (category: typeof comparisonCategories[0]) => {
    if (!category.winner ||selectedCars.length === 0) return null;
    
    const values = selectedCars.map(car => {
      const value = car[category.key as keyof Car];
      return typeof value === 'number' ? value : 0;
    });

    if (category.winner === 'highest') {
      const maxValue = Math.max(...values);
      return values.indexOf(maxValue);
    } else {
      const minValue = Math.min(...values);
      return values.indexOf(minValue);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-gold/20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-display font-bold mb-2">
            Car <span className="text-gold">Comparison</span>
          </h3>
          <p className="text-sm text-gray-400">
            Compare up to 4 vehicles side-by-side
          </p>
        </div>
        <div className="text-sm text-gray-400">
          {selectedCars.length}/4 selected
        </div>
      </div>

      {/* Car Selection */}
      {isSelecting && selectedCars.length < 4 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm font-medium text-gray-300">Select vehicles to compare:</div>
            {selectedCars.length >= 2 && (
              <button
                onClick={() => setIsSelecting(false)}
                className="text-sm text-gold hover:underline"
              >
                Start Comparing →
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
            {availableCars.slice(0, 12).map((car) => {
              const isSelected = selectedCars.find(c => c.id === car.id);
              return (
                <button
                  key={car.id}
                  onClick={() => addCar(car)}
                  disabled={!!isSelected}
                  className={`p-3 rounded-lg text-left transition-all ${
                    isSelected
                      ? 'bg-gold/20 border-2 border-gold cursor-not-allowed'
                      : 'bg-white/5 border-2 border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="text-sm font-bold truncate">{car.make} {car.model}</div>
                  <div className="text-xs text-gray-400">{car.year}</div>
                  <div className="text-xs text-gold font-bold">${car.price.toLocaleString()}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Cars Pills */}
      {selectedCars.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedCars.map((car) => (
            <motion.div
              key={car.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-2 px-3 py-2 bg-gold/10 border border-gold/30 rounded-full"
            >
              <span className="text-sm font-medium">{car.make} {car.model}</span>
              <button
                onClick={() => removeCar(car.id)}
                className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-red-500/20 transition-colors"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          ))}
          {selectedCars.length < 4 && (
            <button
              onClick={() => setIsSelecting(true)}
              className="px-3 py-2 glass border border-white/20 rounded-full text-sm hover:bg-white/10 transition-colors"
            >
              + Add Vehicle
            </button>
          )}
        </div>
      )}

      {/* Comparison Table */}
      {selectedCars.length >= 2 && !isSelecting && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-3 text-sm font-medium text-gray-400">Specification</th>
                {selectedCars.map((car) => (
                  <th key={car.id} className="p-3 min-w-[200px]">
                    <div className="text-center">
                      <div className="relative w-full h-32 mb-2 rounded-lg overflow-hidden bg-white/5">
                        <Image
                          src={car.image}
                          alt={`${car.make} ${car.model}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="font-bold text-white">{car.make}</div>
                      <div className="text-sm text-gray-400">{car.model}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonCategories.map((category) => {
                const winnerIndex = determineWinner(category);
                return (
                  <tr key={category.key} className="border-b border-white/5">
                    <td className="p-3 text-sm font-medium text-gray-300">{category.label}</td>
                    {selectedCars.map((car, index) => {
                      const value = car[category.key as keyof Car];
                      const isWinner = winnerIndex === index;
                      return (
                        <td key={car.id} className={`p-3 text-center ${isWinner ? 'bg-gold/10' : ''}`}>
                          <div className={`font-medium ${isWinner ? 'text-gold' : 'text-white'}`}>
                            {category.format(value as any)}
                            {isWinner && <span className="ml-2">👑</span>}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              
              {/* Description Row */}
              <tr className="border-b border-white/5">
                <td className="p-3 text-sm font-medium text-gray-300">Description</td>
                {selectedCars.map((car) => (
                  <td key={car.id} className="p-3">
                    <div className="text-xs text-gray-400 line-clamp-3">{car.description}</div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 btn-gold py-3 font-bold"
            >
              Export Comparison
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 glass border border-gold/30 rounded-lg py-3 font-bold hover:bg-white/10 transition-colors"
            >
              Share Comparison
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {selectedCars.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🚗</div>
          <div className="text-gray-400 mb-2">No vehicles selected</div>
          <div className="text-sm text-gray-500">Select at least 2 vehicles to start comparing</div>
        </div>
      )}
    </div>
  );
}
