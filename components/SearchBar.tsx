'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  location: string;
  pickupDate: string;
  returnDate: string;
  carType: string;
  priceRange: [number, number];
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [carType, setCarType] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [isExpanded, setIsExpanded] = useState(false);

  const carTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'SUV', label: 'SUV' },
    { value: 'Sedan', label: 'Sedan' },
    { value: 'Hatchback', label: 'Hatchback' },
    { value: 'Electric', label: 'Electric' },
    { value: 'Hybrid', label: 'Hybrid' },
    { value: 'Luxury SUV', label: 'Luxury SUV' },
  ];

  const locations = [
    'Colombo',
    'Kandy',
    'Galle',
    'Negombo',
    'Jaffna',
    'Matara',
    'Anuradhapura',
    'Trincomalee',
  ];

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        location,
        pickupDate,
        returnDate,
        carType,
        priceRange,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full"
    >
      {/* Desktop Search Bar */}
      <div className="hidden lg:block glass-card rounded-3xl p-6 shadow-2xl">
        <div className="grid grid-cols-5 gap-4 items-end">
          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
            >
              <option value="">Select City</option>
              {locations.map((loc) => (
                <option key={loc} value={loc} className="bg-black">
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Pickup Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Pickup Date
            </label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
            />
          </div>

          {/* Return Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Return Date
            </label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
            />
          </div>

          {/* Car Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Car Type
            </label>
            <select
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
            >
              {carTypes.map((type) => (
                <option key={type.value} value={type.value} className="bg-black">
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="btn-gold h-[52px] flex items-center justify-center gap-2 shadow-lg shadow-gold/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </motion.button>
        </div>

        {/* Price Range Filter - Collapsible */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          className="overflow-hidden"
        >
          <div className="pt-6 mt-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Price Range
              </label>
              <span className="text-gold font-bold">
                ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
            />
          </div>
        </motion.div>

        {/* Toggle Advanced Filters */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-sm text-gold hover:text-gold-light transition-colors flex items-center gap-2 mx-auto"
        >
          {isExpanded ? 'Hide' : 'Show'} Advanced Filters
          <svg
            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden glass-card rounded-2xl p-4 shadow-2xl">
        <div className="space-y-3">
          {/* Compact Search Inputs */}
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold outline-none"
          >
            <option value="">📍 Select Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc} className="bg-black">
                {loc}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              placeholder="Pickup"
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold outline-none text-sm"
            />
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              placeholder="Return"
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold outline-none text-sm"
            />
          </div>

          <select
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold outline-none"
          >
            {carTypes.map((type) => (
              <option key={type.value} value={type.value} className="bg-black">
                🚗 {type.label}
              </option>
            ))}
          </select>

          <button
            onClick={handleSearch}
            className="btn-gold w-full py-3 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search Cars
          </button>
        </div>
      </div>
    </motion.div>
  );
}
