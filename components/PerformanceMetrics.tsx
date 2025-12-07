'use client';

import { motion } from 'framer-motion';

interface PerformanceMetricsProps {
  zeroToSixty?: number; // seconds
  topSpeed?: number; // mph
  horsepower?: number;
  torque?: number; // lb-ft
  quarterMile?: number; // seconds
}

export default function PerformanceMetrics({
  zeroToSixty = 5.2,
  topSpeed = 155,
  horsepower = 300,
  torque = 295,
  quarterMile = 13.8
}: PerformanceMetricsProps) {
  
  const metrics = [
    {
      label: '0-60 mph',
      value: zeroToSixty,
      unit: 'sec',
      icon: '🚀',
      max: 10,
      color: '#D4AF37'
    },
    {
      label: 'Top Speed',
      value: topSpeed,
      unit: 'mph',
      icon: '⚡',
      max: 200,
      color: '#60A5FA'
    },
    {
      label: 'Horsepower',
      value: horsepower,
      unit: 'hp',
      icon: '💪',
      max: 500,
      color: '#F59E0B'
    },
    {
      label: 'Torque',
      value: torque,
      unit: 'lb-ft',
      icon: '🔧',
      max: 400,
      color: '#10B981'
    },
  ];

  return (
    <div className="glass-card rounded-2xl p-6 border border-gold/20">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-gold/10 rounded-xl border border-gold/30">
          <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-display font-bold mb-2">
            Performance <span className="text-gold">Metrics</span>
          </h3>
          <p className="text-sm text-gray-400">
            Raw power and acceleration data
          </p>
        </div>
      </div>

      {/* Main Performance Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {metrics.map((metric, index) => {
          const percentage = (metric.value / metric.max) * 100;
          
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-gradient-to-br from-white/5 to-transparent rounded-xl border border-white/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{metric.icon}</span>
                <div className="text-sm text-gray-400">{metric.label}</div>
              </div>
              
              <div className="mb-2">
                <span className="text-3xl font-bold text-white">{metric.value}</span>
                <span className="text-sm text-gray-500 ml-1">{metric.unit}</span>
              </div>
              
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: metric.color }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quarter Mile */}
      <div className="p-5 bg-gradient-to-br from-gold/20 to-gold/5 rounded-xl border border-gold/30 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-300 mb-1">1/4 Mile Time</div>
            <div className="text-4xl font-bold text-gold">{quarterMile}s</div>
          </div>
          <div className="text-6xl">🏁</div>
        </div>
      </div>

      {/* Performance Rating */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <div className="text-2xl font-bold text-green-400">A+</div>
          <div className="text-xs text-gray-400">Acceleration</div>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <div className="text-2xl font-bold text-blue-400">A</div>
          <div className="text-xs text-gray-400">Top Speed</div>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <div className="text-2xl font-bold text-gold">A+</div>
          <div className="text-xs text-gray-400">Power</div>
        </div>
      </div>

      {/* Comparison Note */}
      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-gray-300">
        💡 <span className="font-bold">Performance Class:</span> This vehicle ranks in the top 15% of its category
      </div>
    </div>
  );
}
