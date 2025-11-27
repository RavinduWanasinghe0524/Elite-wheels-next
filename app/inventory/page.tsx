'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cars, Car } from '@/lib/carData';
import CarCard3D from '@/components/CarCard3D';
import ParticleBackground from '@/components/ParticleBackground';
import Image from 'next/image';

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMake, setSelectedMake] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const makes = useMemo(() => ['all', ...Array.from(new Set(cars.map(car => car.make)))], []);
  const years = useMemo(() => ['all', ...Array.from(new Set(cars.map(car => car.year))).sort((a, b) => b - a)], []);

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = 
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) || 
        car.model.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesMake = selectedMake === 'all' || car.make === selectedMake;
      
      const matchesPrice = selectedPrice === 'all' || 
        (selectedPrice === '30000' && car.price <= 30000) ||
        (selectedPrice === '50000' && car.price <= 50000) ||
        (selectedPrice === '80000' && car.price <= 80000) ||
        (selectedPrice === '100000' && car.price <= 100000);
      
      const matchesYear = selectedYear === 'all' || car.year.toString() === selectedYear;

      return matchesSearch && matchesMake && matchesPrice && matchesYear;
    });
  }, [searchTerm, selectedMake, selectedPrice, selectedYear]);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 relative">
      <ParticleBackground />
      
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-gold">Inventory</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our curated collection of premium vehicles. Use the filters below to find your perfect match.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-6 rounded-2xl mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search by make or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-primary/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
            />
            
            <select
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
              className="w-full bg-primary/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
            >
              <option value="all">All Makes</option>
              {makes.filter(m => m !== 'all').map(make => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>

            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="w-full bg-primary/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
            >
              <option value="all">All Prices</option>
              <option value="30000">$30,000 and below</option>
              <option value="50000">$50,000 and below</option>
              <option value="80000">$80,000 and below</option>
              <option value="100000">$100,000 and below</option>
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-primary/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
            >
              <option value="all">All Years</option>
              {years.filter(y => y !== 'all').map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCars.map((car) => (
              <CarCard3D 
                key={car.id} 
                car={car} 
                onViewDetails={setSelectedCar} 
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No cars found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedCar(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-secondary rounded-2xl overflow-hidden max-w-4xl w-full border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-full min-h-[300px]">
                  <Image
                    src={selectedCar.image}
                    alt={`${selectedCar.make} ${selectedCar.model}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{selectedCar.make} {selectedCar.model}</h2>
                      <p className="text-gold text-xl font-medium">${selectedCar.price.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => setSelectedCar(null)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-gray-400">Year</span>
                      <span className="font-medium">{selectedCar.year}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-gray-400">Category</span>
                      <span className="font-medium">{selectedCar.category}</span>
                    </div>
                    <div className="pt-4">
                      <h4 className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Description</h4>
                      <p className="text-gray-300 leading-relaxed">{selectedCar.description}</p>
                    </div>
                  </div>

                  <button
                    className="w-full py-4 bg-gold text-primary font-bold rounded-xl hover:bg-white transition-colors duration-300"
                    onClick={() => alert('Contact feature coming soon!')}
                  >
                    Inquire Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
