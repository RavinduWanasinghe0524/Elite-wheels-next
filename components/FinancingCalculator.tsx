'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FinancingCalculatorProps {
  carPrice?: number;
}

export default function FinancingCalculator({ carPrice = 50000 }: FinancingCalculatorProps) {
  const [loanAmount, setLoanAmount] = useState(carPrice * 0.8); // 20% down payment
  const [interestRate, setInterestRate] = useState(5.9);
  const [loanTerm, setLoanTerm] = useState(60); // months

  const calculateMonthlyPayment = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm;

    if (monthlyRate === 0) {
      return principal / numPayments;
    }

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    return monthlyPayment;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * loanTerm;
  const totalInterest = totalPayment - loanAmount;
  const downPayment = carPrice - loanAmount;

  return (
    <div className="glass-card p-8 rounded-2xl border border-gold/20">
      <div className="mb-8">
        <h3 className="text-2xl font-display font-bold mb-2">
          Financing <span className="text-gold">Calculator</span>
        </h3>
        <p className="text-gray-400 text-sm">
          Calculate your estimated monthly payments
        </p>
      </div>

      <div className="space-y-6">
        {/* Vehicle Price */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-300">
              Vehicle Price
            </label>
            <span className="text-gold font-bold">${carPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Down Payment */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-300">
              Down Payment
            </label>
            <span className="text-white font-bold">${downPayment.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={0}
            max={carPrice}
            step={1000}
            value={downPayment}
            onChange={(e) => setLoanAmount(carPrice - parseInt(e.target.value))}
            className="w-full price-slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>$0</span>
            <span>{Math.round((downPayment / carPrice) * 100)}%</span>
            <span>${carPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Loan Amount */}
        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="text-sm text-gray-400 mb-1">Loan Amount</div>
          <div className="text-2xl font-bold text-white">${loanAmount.toLocaleString()}</div>
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-300">
              Interest Rate (APR)
            </label>
            <span className="text-white font-bold">{interestRate.toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min={1}
            max={15}
            step={0.1}
            value={interestRate}
            onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            className="w-full price-slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1.0%</span>
            <span>15.0%</span>
          </div>
        </div>

        {/* Loan Term */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-300">
              Loan Term
            </label>
            <span className="text-white font-bold">{loanTerm} months</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[24, 36, 48, 60, 72, 84].map((term) => (
              <button
                key={term}
                onClick={() => setLoanTerm(term)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  loanTerm === term
                    ? 'bg-gold text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {term}mo
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          {/* Monthly Payment */}
          <div className="p-6 bg-gradient-to-br from-gold/20 to-gold/5 rounded-xl border border-gold/30">
            <div className="text-sm text-gray-300 mb-1">Estimated Monthly Payment</div>
            <div className="text-4xl font-bold text-gold">${monthlyPayment.toFixed(2)}</div>
            <div className="text-xs text-gray-400 mt-2">per month for {loanTerm} months</div>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-xs text-gray-400 mb-1">Total Payment</div>
              <div className="text-lg font-bold text-white">${totalPayment.toFixed(2)}</div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-xs text-gray-400 mb-1">Total Interest</div>
              <div className="text-lg font-bold text-white">${totalInterest.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full btn-gold py-4 text-lg font-bold"
        >
          Apply for Financing
        </motion.button>

        <p className="text-xs text-gray-500 text-center">
          * This calculator provides estimates only. Actual rates may vary based on credit score and other factors.
        </p>
      </div>
    </div>
  );
}
