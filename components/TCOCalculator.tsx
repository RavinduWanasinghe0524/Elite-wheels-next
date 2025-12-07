'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function TCOCalculator({ vehiclePrice = 50000 }: { vehiclePrice?: number }) {
  const [downPayment, setDownPayment] = useState(vehiclePrice * 0.2);
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate, setInterestRate] = useState(5.9);
  const [annualMileage, setAnnualMileage] = useState(12000);
  const [fuelType, setFuelType] = useState<'petrol' | 'diesel' | 'hybrid' | 'electric'>('petrol');

  const calculateTCO = () => {
    // 1. Purchase & Financing
    const loanAmount = vehiclePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
                          (Math.pow(1 + monthlyRate, loanTerm) - 1);
    const totalFinancingCost = monthlyPayment * loanTerm;
    const totalInterest = totalFinancingCost - loanAmount;

    // 2. Fuel Costs (5 years)
    const fuelPrices = { petrol: 1.50, diesel: 1.30, hybrid: 0.75, electric: 0.30 }; // per liter/kWh
    const fuelEfficiency = { petrol: 12, diesel: 15, hybrid: 20, electric: 5 }; // km per liter/kWh
    const annualFuelCost = (annualMileage / fuelEfficiency[fuelType]) * fuelPrices[fuelType];
    const fiveYearFuelCost = annualFuelCost * 5;

    // 3. Insurance (5 years)
    const annualInsurance = vehiclePrice * 0.04; // 4% for comprehensive
    const fiveYearInsurance = annualInsurance * 5;

    // 4. Maintenance (5 years) - simplified
    const annualMaintenance = vehiclePrice * 0.015;
    const fiveYearMaintenance = annualMaintenance * 5;

    // 5. Registration & Taxes
    const registration = vehiclePrice * 0.02; // One-time
    const annualTaxes = 300; // Road tax
    const fiveYearTaxes = annualTaxes * 5;

    // 6. Depreciation
    const fiveYearDepreciation = vehiclePrice * 0.40; // 40% depreciation
    const resaleValue = vehiclePrice - fiveYearDepreciation;

    // Total Cost of Ownership
    const totalCost = vehiclePrice + totalInterest + fiveYearFuelCost + 
                      fiveYearInsurance + fiveYearMaintenance + registration + fiveYearTaxes;
    const netCost = totalCost - resaleValue; // Accounting for resale value

    return {
      purchase: vehiclePrice,
      downPayment,
      financing: totalFinancingCost,
      interest: totalInterest,
      fuel: fiveYearFuelCost,
      insurance: fiveYearInsurance,
      maintenance: fiveYearMaintenance,
      registration,
      taxes: fiveYearTaxes,
      depreciation: fiveYearDepreciation,
      resaleValue,
      totalCost,
      netCost,
      monthlyAverage: netCost / 60
    };
  };

  const tco = calculateTCO();

  const costBreakdown = [
    { label: 'Purchase Price', amount: tco.purchase, color: '#D4AF37' },
    { label: 'Interest (Financing)', amount: tco.interest, color: '#FF6B6B' },
    { label: 'Fuel (5 years)', amount: tco.fuel, color: '#4ECDC4' },
    { label: 'Insurance (5 years)', amount: tco.insurance, color: '#95E1D3' },
    { label: 'Maintenance (5 years)', amount: tco.maintenance, color: '#F38181' },
    { label: 'Registration & Taxes', amount: tco.registration + tco.taxes, color: '#AA96DA' },
  ];

  return (
    <div className="glass-card rounded-2xl p-6 border border-gold/20">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-gold/10 rounded-xl border border-gold/30">
          <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="flex-grow">
          <h3 className="text-2xl font-display font-bold mb-2">
            Total Cost of <span className="text-gold">Ownership</span>
          </h3>
          <p className="text-sm text-gray-400">
            Complete 5-year ownership cost analysis
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Key Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Down Payment: ${downPayment.toLocaleString()}
            </label>
            <input
              type="range"
              min="0"
              max={vehiclePrice}
              step="1000"
              value={downPayment}
              onChange={(e) => setDownPayment(parseInt(e.target.value))}
              className="w-full price-slider"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Annual Mileage: {annualMileage.toLocaleString()} km
            </label>
            <input
              type="range"
              min="5000"
              max="30000"
              step="1000"
              value={annualMileage}
              onChange={(e) => setAnnualMileage(parseInt(e.target.value))}
              className="w-full price-slider"
            />
          </div>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Fuel Type</label>
          <div className="grid grid-cols-4 gap-2">
            {(['petrol', 'diesel', 'hybrid', 'electric'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFuelType(type)}
                className={`p-2 rounded-lg capitalize transition-all ${
                  fuelType === type
                    ? 'bg-gold text-black font-bold'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 bg-gradient-to-br from-gold/20 to-gold/5 rounded-xl border border-gold/30">
            <div className="text-sm text-gray-300 mb-1">Total Cost (5 years)</div>
            <div className="text-3xl font-bold text-gold">${tco.totalCost.toLocaleString()}</div>
          </div>
          <div className="p-5 bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-xl border border-green-500/30">
            <div className="text-sm text-gray-300 mb-1">Resale Value</div>
            <div className="text-3xl font-bold text-green-400">${tco.resaleValue.toLocaleString()}</div>
          </div>
        </div>

        {/* Net Cost */}
        <div className="p-6 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl border border-blue-500/30">
          <div className="text-center">
            <div className="text-sm text-gray-300 mb-2">Net Cost of Ownership (After Resale)</div>
            <div className="text-4xl font-bold text-white mb-2">${tco.netCost.toLocaleString()}</div>
            <div className="text-sm text-gray-400">
              ${tco.monthlyAverage.toFixed(0)}/month over 5 years
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="space-y-2">
          <div className="text-sm font-bold text-gray-300 mb-3">Cost Breakdown:</div>
          {costBreakdown.map((item) => {
            const percentage = (item.amount / tco.totalCost) * 100;
            return (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{item.label}</span>
                  <span className="font-bold text-white">${item.amount.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
                <div className="text-xs text-gray-500 text-right">{percentage.toFixed(1)}%</div>
              </div>
            );
          })}
        </div>

        {/* Comparison */}
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <h4 className="font-bold text-sm mb-2 text-gold">Key Insights:</h4>
          <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
            <li>You'll pay ${tco.interest.toLocaleString()} in interest over {loanTerm} months</li>
            <li>Fuel will cost ${(tco.fuel / 5).toFixed(0)}/year with {fuelType}</li>
            <li>Vehicle will depreciate by ${tco.depreciation.toLocaleString()} (40%)</li>
            {fuelType === 'electric' && <li className="text-green-400">⚡ Electric saves ~${(15000 - tco.fuel).toFixed(0)} vs petrol!</li>}
          </ul>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full btn-gold py-4 text-lg font-bold"
        >
          Download Full Report
        </motion.button>
      </div>
    </div>
  );
}
