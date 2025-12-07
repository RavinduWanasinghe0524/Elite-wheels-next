'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface TradeInData {
  year: number;
  make: string;
  model: string;
  mileage: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
}

const SRI_LANKAN_BRANDS = [
  'Toyota', 'Honda', 'Nissan', 'Suzuki', 'Mitsubishi', 'BMW', 'Mercedes', 'Audi', 'Mazda', 'Hyundai'
];

export default function TradeInCalculator() {
  const [tradeIn, setTradeIn] = useState<TradeInData>({
    year: 2020,
    make: 'Toyota',
    model: 'Corolla',
    mileage: 30000,
    condition: 'good',
  });

  const [showEstimate, setShowEstimate] = useState(false);

  const calculateTradeInValue = () => {
    // Base depreciation calculation
    const currentYear = new Date().getFullYear();
    const age = currentYear - tradeIn.year;
    const baseValue = 35000; // Base value for average car
    
    // Depreciation: 15% first year, 10% subsequent years
    let depreciatedValue = baseValue;
    for (let i = 0; i < age; i++) {
      depreciatedValue *= i === 0 ? 0.85 : 0.90;
    }

    // Mileage adjustment (Sri Lankan context - lower typical mileage)
    const avgMileagePerYear = 8000; // Lower for SL
    const expectedMileage = age * avgMileagePerYear;
    const mileageDiff = tradeIn.mileage - expectedMileage;
    const mileageAdjustment = (mileageDiff / 1000) * -50; // -$50 per 1000km over expected

    // Condition multiplier
    const conditionMultipliers = {
      excellent: 1.15,
      good: 1.0,
      fair: 0.85,
      poor: 0.65,
    };

    let finalValue = (depreciatedValue + mileageAdjustment) * conditionMultipliers[tradeIn.condition];
    
    // Brand premium (Toyota, Honda get 10% premium in SL)
    if (['Toyota', 'Honda'].includes(tradeIn.make)) {
      finalValue *= 1.10;
    }

    return Math.max(finalValue, 5000); // Minimum $5000
  };

  const estimatedValue = calculateTradeInValue();
  const confidenceRange = {
    low: estimatedValue * 0.90,
    high: estimatedValue * 1.10,
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-gold/20">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-gold/10 rounded-xl border border-gold/30">
          <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-display font-bold mb-2">
            Trade-In <span className="text-gold">Calculator</span>
          </h3>
          <p className="text-sm text-gray-400">
            Get an instant estimate for your current vehicle
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Year */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Vehicle Year</label>
          <input
            type="number"
            min="1990"
            max={new Date().getFullYear()}
            value={tradeIn.year}
            onChange={(e) => setTradeIn({ ...tradeIn, year: parseInt(e.target.value) })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold outline-none"
          />
        </div>

        {/* Make */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Make</label>
          <select
            value={tradeIn.make}
            onChange={(e) => setTradeIn({ ...tradeIn, make: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold outline-none"
          >
            {SRI_LANKAN_BRANDS.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Model</label>
          <input
            type="text"
            value={tradeIn.model}
            onChange={(e) => setTradeIn({ ...tradeIn, model: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold outline-none"
            placeholder="e.g., Corolla, Civic, Aqua"
          />
        </div>

        {/* Mileage */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Mileage (km): {tradeIn.mileage.toLocaleString()}
          </label>
          <input
            type="range"
            min="0"
            max="300000"
            step="5000"
            value={tradeIn.mileage}
            onChange={(e) => setTradeIn({ ...tradeIn, mileage: parseInt(e.target.value) })}
            className="w-full price-slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0 km</span>
            <span>300,000 km</span>
          </div>
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Condition</label>
          <div className="grid grid-cols-2 gap-2">
            {(['excellent', 'good', 'fair', 'poor'] as const).map((condition) => (
              <button
                key={condition}
                onClick={() => setTradeIn({ ...tradeIn, condition })}
                className={`p-3 rounded-lg border-2 capitalize transition-all ${tradeIn.condition === condition
                    ? 'border-gold bg-gold/10'
                    : 'border-white/20 bg-white/5 hover:border-white/40'
                  }`}
              >
                {condition}
              </button>
            ))}
          </div>
        </div>

        {/* Calculate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowEstimate(true)}
          className="w-full btn-gold py-4 text-lg font-bold"
        >
          Get Trade-In Estimate
        </motion.button>

        {/* Estimate Result */}
        {showEstimate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-gradient-to-br from-gold/20 to-gold/5 rounded-xl border border-gold/30"
          >
            <div className="text-center mb-4">
              <div className="text-sm text-gray-300 mb-2">Estimated Trade-In Value</div>
              <div className="text-4xl font-bold text-gold mb-1">
                ${estimatedValue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">
                Range: ${confidenceRange.low.toLocaleString()} - ${confidenceRange.high.toLocaleString()}
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-white/5 rounded">
                <span className="text-gray-400">Vehicle Age:</span>
                <span className="text-white">{new Date().getFullYear() - tradeIn.year} years</span>
              </div>
              <div className="flex justify-between p-2 bg-white/5 rounded">
                <span className="text-gray-400">Condition:</span>
                <span className="text-white capitalize">{tradeIn.condition}</span>
              </div>
              <div className="flex justify-between p-2 bg-white/5 rounded">
                <span className="text-gray-400">Mileage:</span>
                <span className="text-white">{tradeIn.mileage.toLocaleString()} km</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 glass border border-gold/30 rounded-lg py-3 font-bold hover:bg-white/10 transition-colors"
            >
              Apply Trade-In Credit
            </motion.button>
          </motion.div>
        )}

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 text-center">
          * This is an estimate only. Final trade-in value determined by physical inspection.
        </p>
      </div>
    </div>
  );
}
