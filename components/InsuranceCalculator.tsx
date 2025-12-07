'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const SL_INSURERS = [
  { name: 'Ceylinco Insurance', multiplier: 1.0 },
  { name: 'AIA Insurance', multiplier: 1.05 },
  { name: 'Union Assurance', multiplier: 0.98 },
  { name: 'SLIC Insurance', multiplier: 1.02 },
  { name: 'HNB General Insurance', multiplier: 0.95 },
];

export default function InsuranceCalculator({ vehicleValue = 50000 }: { vehicleValue?: number }) {
  const [driverAge, setDriverAge] = useState(30);
  const [experience, setExperience] = useState(5);
  const [coverageType, setCoverageType] = useState<'comprehensive' | 'third-party'>('comprehensive');
  const [showResults, setShowResults] = useState(false);

  const calculatePremium = (insurer: typeof SL_INSURERS[0]) => {
    let basePremium = vehicleValue * 0.045; // 4.5% base rate for comprehensive
    
    if (coverageType === 'third-party') {
      basePremium = vehicleValue * 0.015; // 1.5% for third-party
    }

    // Age factor
    if (driverAge < 25) {
      basePremium *= 1.25; // 25% increase for young drivers
    } else if (driverAge > 60) {
      basePremium *= 1.15; // 15% increase for senior drivers
    } else if (driverAge >= 30 && driverAge <= 50) {
      basePremium *= 0.90; // 10% discount for prime age
    }

    // Experience factor
    if (experience < 3) {
      basePremium *= 1.20;
    } else if (experience >= 10) {
      basePremium *= 0.85;
    }

    // Apply insurer multiplier
    basePremium *= insurer.multiplier;

    return basePremium;
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-gold/20">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-gold/10 rounded-xl border border-gold/30">
          <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-display font-bold mb-2">
            Insurance <span className="text-gold">Calculator</span>
          </h3>
          <p className="text-sm text-gray-400">
            Compare premiums from Sri Lankan insurers
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Vehicle Value Display */}
        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="text-sm text-gray-400 mb-1">Vehicle Value</div>
          <div className="text-2xl font-bold text-white">${vehicleValue.toLocaleString()}</div>
        </div>

        {/* Driver Age */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-300">Driver Age</label>
            <span className="text-white font-bold">{driverAge} years</span>
          </div>
          <input
            type="range"
            min="18"
            max="75"
            value={driverAge}
            onChange={(e) => setDriverAge(parseInt(e.target.value))}
            className="w-full price-slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>18</span>
            <span>75</span>
          </div>
        </div>

        {/* Driving Experience */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-300">Driving Experience</label>
            <span className="text-white font-bold">{experience} years</span>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            value={experience}
            onChange={(e) => setExperience(parseInt(e.target.value))}
            className="w-full price-slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>30+ years</span>
          </div>
        </div>

        {/* Coverage Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Coverage Type</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setCoverageType('comprehensive')}
              className={`p-4 rounded-lg border-2 transition-all ${
                coverageType === 'comprehensive'
                  ? 'border-gold bg-gold/10'
                  : 'border-white/20 bg-white/5 hover:border-white/40'
              }`}
            >
              <div className="font-bold mb-1">Comprehensive</div>
              <div className="text-xs text-gray-400">Full coverage including theft & damage</div>
            </button>
            <button
              onClick={() => setCoverageType('third-party')}
              className={`p-4 rounded-lg border-2 transition-all ${
                coverageType === 'third-party'
                  ? 'border-gold bg-gold/10'
                  : 'border-white/20 bg-white/5 hover:border-white/40'
              }`}
            >
              <div className="font-bold mb-1">Third-Party</div>
              <div className="text-xs text-gray-400">Liability coverage only</div>
            </button>
          </div>
        </div>

        {/* Calculate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowResults(true)}
          className="w-full btn-gold py-4 text-lg font-bold"
        >
          Compare Quotes
        </motion.button>

        {/* Results */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="text-sm font-bold text-gray-300 mb-3">Annual Premium Quotes:</div>
            
            {SL_INSURERS.map((insurer, index) => {
              const premium = calculatePremium(insurer);
              const monthlyPremium = premium / 12;
              
              return (
                <motion.div
                  key={insurer.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-2 ${
                    index === 0 
                      ? 'border-gold bg-gold/10' 
                      : 'border-white/20 bg-white/5'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white mb-1">{insurer.name}</div>
                      <div className="text-xs text-gray-400">
                        ${monthlyPremium.toFixed(2)}/month
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gold">
                        ${premium.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-400">per year</div>
                    </div>
                  </div>
                  {index === 0 && (
                    <div className="mt-2 text-xs text-gold font-bold">
                      ⭐ Best Value
                    </div>
                  )}
                </motion.div>
              );
            })}

            <div className="flex gap-2 mt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 glass border border-gold/30 rounded-lg py-3 font-bold hover:bg-white/10 transition-colors"
              >
                Get Detailed Quote
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Info */}
        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-gray-300">
          💡 <span className="font-bold">Tip:</span> Drivers aged 30-50 with 10+ years experience get the best rates
        </div>
      </div>
    </div>
  );
}
