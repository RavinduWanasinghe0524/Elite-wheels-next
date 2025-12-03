'use client';

import { motion } from 'framer-motion';

interface FilterChipsProps {
  filters: {
    location?: string;
    pickupDate?: string;
    returnDate?: string;
    carType?: string;
    priceRange?: [number, number];
  };
  onRemoveFilter: (key: string) => void;
  onClearAll: () => void;
}

export default function FilterChips({ filters, onRemoveFilter, onClearAll }: FilterChipsProps) {
  const activeFilters: { key: string; label: string; value: string }[] = [];

  if (filters.location) {
    activeFilters.push({
      key: 'location',
      label: 'Location',
      value: filters.location,
    });
  }

  if (filters.pickupDate) {
    activeFilters.push({
      key: 'pickupDate',
      label: 'Pickup',
      value: new Date(filters.pickupDate).toLocaleDateString(),
    });
  }

  if (filters.returnDate) {
    activeFilters.push({
      key: 'returnDate',
      label: 'Return',
      value: new Date(filters.returnDate).toLocaleDateString(),
    });
  }

  if (filters.carType) {
    activeFilters.push({
      key: 'carType',
      label: 'Type',
      value: filters.carType,
    });
  }

  if (filters.priceRange && (filters.priceRange[0] > 0 || filters.priceRange[1] < 200000)) {
    activeFilters.push({
      key: 'priceRange',
      label: 'Price',
      value: `$${filters.priceRange[0].toLocaleString()} - $${filters.priceRange[1].toLocaleString()}`,
    });
  }

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
      <span className="text-sm text-gray-400">Active Filters:</span>
      
      {activeFilters.map((filter, index) => (
        <motion.div
          key={filter.key}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ delay: index * 0.05 }}
          className="glass px-4 py-2 rounded-full border border-gold/30 flex items-center gap-2 group"
        >
          <span className="text-sm text-gray-300">
            <span className="text-gold font-semibold">{filter.label}:</span> {filter.value}
          </span>
          <button
            onClick={() => onRemoveFilter(filter.key)}
            className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-red-500/20 flex items-center justify-center transition-colors"
            aria-label={`Remove ${filter.label} filter`}
          >
            <svg className="w-3 h-3 text-gray-400 group-hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      ))}

      {activeFilters.length > 0 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: activeFilters.length * 0.05 }}
          onClick={onClearAll}
          className="text-sm text-red-400 hover:text-red-300 underline transition-colors"
        >
          Clear All
        </motion.button>
      )}
    </div>
  );
}
