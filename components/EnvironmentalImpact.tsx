'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function EnvironmentalImpact({ fuelType = 'electric', annualMileage = 15000 }: { fuelType?: string; annualMileage?:number }) {
  const calculateImpact = () => {
    // CO2 emissions in kg per km
    const emissionsPerKm = {
      petrol: 0.171,
      diesel: 0.155,
      hybrid: 0.090,
      electric: 0.045, // Including electricity generation
    };

    const petrolEmissions = annualMileage * emissionsPerKm.petrol;
    const currentEmissions = annualMileage * (emissionsPerKm[fuelType as keyof typeof emissionsPerKm] || 0);
    
    const annualSavings = petrolEmissions - currentEmissions;
    const fiveYearSavings = annualSavings * 5;
    
    // Trees needed to offset (1 tree absorbs ~21kg CO2/year)
    const treesEquivalent = Math.round(annualSavings / 21);
    
    // Cost savings
    const fuelCosts = { petrol: 1.50, diesel: 1.30, hybrid: 0.75, electric: 0.30 };
    const fuelEfficiency = { petrol: 12, diesel: 15, hybrid: 20, electric: 5 };
    
    const petrolCost = (annualMileage / fuelEfficiency.petrol) * fuelCosts.petrol;
    const currentCost = (annualMileage / (fuelEfficiency[fuelType as keyof typeof fuelEfficiency] || 12)) * 
                        (fuelCosts[fuelType as keyof typeof fuelCosts] || 1.50);
    
    const annualCostSavings = petrolCost - currentCost;
    const fiveYearCostSavings = annualCostSavings * 5;

    return {
      annualEmissions: currentEmissions,
      annualSavings,
      fiveYearSavings,
      treesEquivalent,
      annualCostSavings,
      fiveYearCostSavings,
      score: Math.min(100, Math.round((annualSavings / petrolEmissions) * 100))
    };
  };

  const impact = calculateImpact();

  return (
    <div className="glass-card rounded-2xl p-6 border border-green-500/30">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-green-500/20 rounded-xl border border-green-500/40">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-display font-bold mb-2 text-green-400">
            Environmental Impact
          </h3>
          <p className="text-sm text-gray-400">
            Your contribution to a greener planet
          </p>
        </div>
      </div>

      {/* Environmental Score */}
      <div className="mb-6 p-6 bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-xl border border-green-500/30 text-center">
        <div className="text-sm text-gray-300 mb-2">Environmental Score</div>
        <div className="relative inline-block">
          <svg className="w-32 h-32">
            <circle cx="64" cy="64" r="56" stroke="#1a3a2a" strokeWidth="8" fill="none" />
            <motion.circle
              cx="64"
              cy="64"
              r="56"
              stroke="#10b981"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 56}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - impact.score / 100) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              transform="rotate(-90 64 64)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl font-bold text-green-400">{impact.score}</div>
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-2">vs. Traditional Petrol Vehicle</div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="text-3xl mb-2">🌳</div>
          <div className="text-2xl font-bold text-green-400">{impact.treesEquivalent}</div>
          <div className="text-xs text-gray-400">Trees Equivalent/Year</div>
        </div>
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="text-3xl mb-2">💰</div>
          <div className="text-2xl font-bold text-gold">${impact.annualCostSavings.toFixed(0)}</div>
          <div className="text-xs text-gray-400">Annual Fuel Savings</div>
        </div>
      </div>

      {/* CO2 Savings */}
      <div className="space-y-4 mb-6">
        <div className="p-4 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg border border-green-500/20">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Annual CO₂ Reduction</span>
            <span className="text-lg font-bold text-green-400">{impact.annualSavings.toFixed(0)} kg</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${impact.score}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full"
            />
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-blue-500/10 to-transparent rounded-lg border border-blue-500/20">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">5-Year CO₂ Reduction</span>
            <span className="text-lg font-bold text-blue-400">{(impact.fiveYearSavings / 1000).toFixed(1)} tonnes</span>
          </div>
          <div className="text-xs text-gray-400">Equivalent to {impact.treesEquivalent * 5} trees over 5 years</div>
        </div>
      </div>

      {/* Financial Impact */}
      <div className="p-4 bg-gradient-to-br from-gold/10 to-gold/5 rounded-xl border border-gold/30 mb-6">
        <h4 className="font-bold text-sm mb-3 text-gold">Financial Benefits</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-300">Annual Savings:</span>
            <span className="font-bold text-white">${impact.annualCostSavings.toFixed(0)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">5-Year Savings:</span>
            <span className="font-bold text-gold">${impact.fiveYearCostSavings.toFixed(0)}</span>
          </div>
        </div>
      </div>

      {/* Fun Facts */}
      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
        <h4 className="font-bold text-sm mb-2 text-green-400">🌍 Did You Know?</h4>
        <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
          <li>Your choice saves {impact.annualSavings.toFixed(0)}kg of CO₂ annually</li>
          <li>That's like planting {impact.treesEquivalent} trees every year!</li>
          <li>Over 5 years, you'll prevent {(impact.fiveYearSavings / 1000).toFixed(1)} tonnes of emissions</li>
          {fuelType === 'electric' && <li>⚡ Zero tailpipe emissions means cleaner air for Sri Lanka!</li>}
        </ul>
      </div>
    </div>
  );
}
