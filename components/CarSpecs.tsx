'use client';

import { motion } from 'framer-motion';
import type { Car } from '@/lib/carData';

interface CarSpecsProps {
  car: Car;
}

export default function CarSpecs({ car }: CarSpecsProps) {
  const specs = [
    {
      category: 'Overview',
      items: [
        { label: 'Year', value: car.year.toString() },
        { label: 'Make', value: car.make },
        { label: 'Model', value: car.model },
        { label: 'Category', value: car.category },
      ],
    },
    {
      category: 'Performance',
      items: [
        { label: 'Transmission', value: 'Automatic' },
        { label: 'Fuel Type', value: car.category.includes('Electric') ? 'Electric' : car.category.includes('Hybrid') ? 'Hybrid' : 'Petrol' },
        { label: 'Engine', value: car.category.includes('Electric') ? 'Electric Motor' : '2.0L Turbo' },
        { label: 'Power', value: car.category.includes('Electric') ? '300 HP' : '250 HP' },
      ],
    },
    {
      category: 'Features',
      items: [
        { label: 'Seats', value: '5' },
        { label: 'Drive Type', value: car.category.includes('SUV') ? 'AWD' : 'FWD' },
        { label: 'Doors', value: '4' },
        { label: 'Condition', value: 'Excellent' },
      ],
    },
    {
      category: 'Interior',
      items: [
        { label: 'Upholstery', value: 'Leather' },
        { label: 'Climate Control', value: 'Dual-Zone' },
        { label: 'Infotainment', value: '12" Touchscreen' },
        { label: 'Sound System', value: 'Premium Audio' },
      ],
    },
    {
      category: 'Safety',
      items: [
        { label: 'Airbags', value: '8' },
        { label: 'ABS', value: 'Yes' },
        { label: 'Stability Control', value: 'Yes' },
        { label: 'Parking Sensors', value: '360° Camera' },
      ],
    },
    {
      category: 'Technology',
      items: [
        { label: 'Navigation', value: 'Built-in GPS' },
        { label: 'Bluetooth', value: 'Yes' },
        { label: 'USB Ports', value: '4' },
        { label: 'Wireless Charging', value: 'Yes' },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-display font-bold mb-2">
          Technical <span className="text-gold">Specifications</span>
        </h2>
        <div className="w-24 h-1 bg-gold rounded-full" />
      </div>

      <div className="grid gap-6">
        {specs.map((section, sectionIndex) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="glass-card p-6 rounded-2xl border border-white/10"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full" />
              {section.category}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              {section.items.map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <span className="text-gray-400 text-sm">{spec.label}</span>
                  <span className="text-white font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Key Features Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-6 rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/5 to-transparent"
      >
        <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: '🛡️', text: 'Advanced Safety Systems' },
            { icon: '⚡', text: 'High Performance Engine' },
            { icon: '📱', text: 'Smart Connectivity' },
            { icon: '❄️', text: 'Climate Control' },
            { icon: '🎵', text: 'Premium Sound System' },
            { icon: '🔋', text: 'Efficient Fuel Economy' },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
            >
              <span className="text-2xl">{feature.icon}</span>
              <span className="text-sm text-gray-300">{feature.text}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
