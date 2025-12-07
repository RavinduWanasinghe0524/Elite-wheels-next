'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function MaintenanceCalculator({ brand = 'Toyota', vehiclePrice = 30000 }: { brand?: string; vehiclePrice?: number }) {
  const [showChart, setShowChart] = useState(false);

  // Maintenance schedule based on brand (Sri Lankan context)
  const getMaintenanceSchedule = () => {
    const brandMultipliers: { [key: string]: number } = {
      'Toyota': 0.8,
      'Honda': 0.85,
      'Nissan': 0.9,
      'Suzuki': 0.75,
      'BMW': 1.5,
      'Mercedes': 1.6,
      'Audi': 1.55,
    };

    const multiplier = brandMultipliers[brand] || 1.0;
    const baseAnnualCost = vehiclePrice * 0.02; // 2% of vehicle price

    const schedule = [];
    for (let year = 1; year <= 5; year++) {
      const serviceCost = (baseAnnualCost * multiplier) * (1 + (year * 0.1)); // 10% increase per year
      
      const services = [];
      
      // Basic service (every year)
      services.push({
        service: 'Annual Service',
        mileage: year * 10000,
        cost: serviceCost * 0.3,
        items: ['Oil change', 'Filter replacement', 'Inspection']
      });

      // Additional services based on year
      if (year === 2 || year === 4) {
        services.push({
          service: 'Major Service',
          mileage: year * 10000,
          cost: serviceCost * 0.5,
          items: ['Brake pads', 'Transmission fluid', 'Coolant flush']
        });
      }

      if (year === 3) {
        services.push({
          service: 'Battery Replacement',
          mileage: year * 10000,
          cost: 150,
          items: ['Battery replacement', 'Electrical check']
        });
      }

      if (year === 4) {
        services.push({
          service: 'Tire Replacement',
          mileage: year * 10000,
          cost: 500,
          items: ['All 4 tires', 'Wheel alignment']
        });
      }

      const totalYearCost = services.reduce((sum, s) => sum + s.cost, 0);

      schedule.push({
        year,
        services,
        totalCost: totalYearCost
      });
    }

    return schedule;
  };

  const schedule = getMaintenanceSchedule();
  const totalFiveYearCost = schedule.reduce((sum, y) => sum + y.totalCost, 0);

  const chartData = {
    labels: schedule.map(s => `Year ${s.year}`),
    datasets: [
      {
        label: 'Annual Maintenance Cost',
        data: schedule.map(s => s.totalCost),
        borderColor: '#D4AF37',
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(10, 25, 41, 0.9)',
        titleColor: '#D4AF37',
        bodyColor: '#ffffff',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => `$${value}`,
          color: '#9ca3af'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: '#9ca3af'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-gold/20">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-gold/10 rounded-xl border border-gold/30">
          <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-display font-bold mb-2">
            Maintenance <span className="text-gold">Calculator</span>
          </h3>
          <p className="text-sm text-gray-400">
            5-year maintenance cost projection
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="p-4 bg-gradient-to-br from-gold/20 to-gold/5 rounded-xl border border-gold/30 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-300 mb-1">Total 5-Year Cost</div>
            <div className="text-3xl font-bold text-gold">${totalFiveYearCost.toFixed(0)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-300 mb-1">Average Annually</div>
            <div className="text-3xl font-bold text-white">${(totalFiveYearCost / 5).toFixed(0)}</div>
          </div>
        </div>
      </div>

      {/* Chart Toggle */}
      <button
        onClick={() => setShowChart(!showChart)}
        className="w-full mb-4 glass border border-gold/30 rounded-lg py-3 font-medium hover:bg-white/10 transition-colors"
      >
        {showChart ? 'Hide' : 'Show'} Cost Projection Chart
      </button>

      {showChart && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 p-4 bg-white/5 rounded-xl"
        >
          <Line data={chartData} options={chartOptions} />
        </motion.div>
      )}

      {/* Year-by-Year Breakdown */}
      <div className="space-y-3">
        <div className="text-sm font-bold text-gray-300 mb-2">Maintenance Schedule:</div>
        
        {schedule.map((yearData) => (
          <motion.div
            key={yearData.year}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: yearData.year * 0.1 }}
            className="p-4 bg-white/5 rounded-lg border border-white/10"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="font-bold text-white">Year {yearData.year}</div>
                <div className="text-xs text-gray-400">{yearData.year * 10000} km</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gold">${yearData.totalCost.toFixed(0)}</div>
                <div className="text-xs text-gray-400">annual cost</div>
              </div>
            </div>
            
            {yearData.services.map((service, idx) => (
              <div key={idx} className="mb-2 last:mb-0 pl-3 border-l-2 border-gold/30">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{service.service}</span>
                  <span className="text-white font-medium">${service.cost.toFixed(0)}</span>
                </div>
                <div className="text-xs text-gray-500">{service.items.join(' • ')}</div>
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Brand Comparison Note */}
      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-gray-300">
        💡 <span className="font-bold">{brand}</span> {brand === 'Toyota' || brand === 'Honda' || brand === 'Suzuki' ? 'has lower than average' : 'has higher than average'} maintenance costs
      </div>
    </div>
  );
}
