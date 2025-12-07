'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumCar from './PremiumCar';

interface CustomizationOptions {
  bodyColor: string;
  rimColor: string;
  hasSpoiler: boolean;
  hasSunroof: boolean;
  tintedWindows: boolean;
}

const BODY_COLORS = [
  { name: 'Diamond White', value: '#F8F8FF', price: 0 },
  { name: 'Obsidian Black', value: '#0a0a0a', price: 500 },
  { name: 'Royal Gold', value: '#D4AF37', price: 2000 },
  { name: 'Midnight Blue', value: '#191970', price: 800 },
  { name: 'Ruby Red', value: '#9B111E', price: 1200 },
  { name: 'Emerald Green', value: '#046307', price: 1500 },
  { name: 'Silver Metallic', value: '#C0C0C0', price: 600 },
  { name: 'Champagne Gold', value: '#F7E7CE', price: 1800 },
];

const RIM_COLORS = [
  { name: 'Chrome', value: '#C0C0C0', price: 0 },
  { name: 'Gold', value: '#FFD700', price: 1500 },
  { name: 'Black', value: '#1a1a1a', price: 800 },
  { name: 'Bronze', value: '#CD7F32', price: 1200 },
];

export default function CarCustomizer3D({ basePrice = 50000 }: { basePrice?: number }) {
  const [customization, setCustomization] = useState<CustomizationOptions>({
    bodyColor: '#D4AF37',
    rimColor: '#FFD700',
    hasSpoiler: false,
    hasSunroof: false,
    tintedWindows: false,
  });

  const [activeTab, setActiveTab] = useState<'color' | 'rims' | 'features'>('color');

  const calculateTotalPrice = () => {
    let total = basePrice;
    
    const bodyColorPrice = BODY_COLORS.find(c => c.value === customization.bodyColor)?.price || 0;
    const rimColorPrice = RIM_COLORS.find(r => r.value === customization.rimColor)?.price || 0;
    
    total += bodyColorPrice + rimColorPrice;
    if (customization.hasSpoiler) total += 2500;
    if (customization.hasSunroof) total += 3500;
    if (customization.tintedWindows) total += 800;
    
    return total;
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-gold/20">
      <div className="grid lg:grid-cols-2 gap-6 p-6">
        {/* 3D Viewer */}
        <div className="relative">
          <div className="h-[500px] rounded-xl overflow-hidden bg-gradient-to-br from-black/40 to-black/20">
            <Canvas camera={{ position: [8, 3, 8], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
              <pointLight position={[-10, 5, -10]} intensity={1.5} color="#D4AF37" />
              <Environment preset="sunset" />
              
              <PremiumCar color={customization.bodyColor} autoRotate={true} />
              
              <OrbitControls 
                enableZoom={true}
                enablePan={false}
                minDistance={5}
                maxDistance={15}
                autoRotate={false}
              />
            </Canvas>
          </div>
          
          {/* View Controls */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="glass p-2 rounded-lg hover:bg-white/10 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </button>
            <button className="glass p-2 rounded-lg hover:bg-white/10 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Customization Panel */}
        <div className="flex flex-col">
          <h3 className="text-2xl font-display font-bold mb-4">
            Customize Your <span className="text-gold">Dream Car</span>
          </h3>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {['color', 'rims', 'features'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-gold text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-grow overflow-y-auto max-h-[300px] mb-6">
            <AnimatePresence mode="wait">
              {activeTab === 'color' && (
                <motion.div
                  key="color"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-4 gap-3"
                >
                  {BODY_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setCustomization({ ...customization, bodyColor: color.value })}
                      className={`relative group`}
                    >
                      <div
                        className={`w-full aspect-square rounded-lg border-2 transition-all ${
                          customization.bodyColor === color.value
                            ? 'border-gold scale-110 shadow-lg shadow-gold/50'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                        style={{ backgroundColor: color.value }}
                      />
                      <div className="text-xs mt-1 text-center text-gray-300">{color.name}</div>
                      {color.price > 0 && (
                        <div className="text-xs text-gold text-center">+${color.price}</div>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}

              {activeTab === 'rims' && (
                <motion.div
                  key="rims"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-2 gap-4"
                >
                  {RIM_COLORS.map((rim) => (
                    <button
                      key={rim.value}
                      onClick={() => setCustomization({ ...customization, rimColor: rim.value })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        customization.rimColor === rim.value
                          ? 'border-gold bg-gold/10'
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-full border-2 border-white/20"
                          style={{ backgroundColor: rim.value }}
                        />
                        <div className="text-left">
                          <div className="font-medium">{rim.name}</div>
                          {rim.price > 0 && <div className="text-sm text-gold">+${rim.price}</div>}
                        </div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}

              {activeTab === 'features' && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-3"
                >
                  {[
                    { key: 'hasSpoiler', label: 'Carbon Fiber Spoiler', price: 2500 },
                    { key: 'hasSunroof', label: 'Panoramic Sunroof', price: 3500 },
                    { key: 'tintedWindows', label: 'Tinted Windows', price: 800 },
                  ].map((feature) => (
                    <button
                      key={feature.key}
                      onClick={() =>
                        setCustomization({
                          ...customization,
                          [feature.key]: !customization[feature.key as keyof CustomizationOptions],
                        })
                      }
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        customization[feature.key as keyof CustomizationOptions]
                          ? 'border-gold bg-gold/10'
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{feature.label}</div>
                          <div className="text-sm text-gold">+${feature.price}</div>
                        </div>
                        <div
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                            customization[feature.key as keyof CustomizationOptions]
                              ? 'bg-gold border-gold'
                              : 'border-white/40'
                          }`}
                        >
                          {customization[feature.key as keyof CustomizationOptions] && (
                            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Price Summary */}
          <div className="p-4 bg-gradient-to-br from-gold/20 to-gold/5 rounded-xl border border-gold/30 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300">Base Price</span>
              <span className="text-white">${basePrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-300">Customizations</span>
              <span className="text-gold">+${(calculateTotalPrice() - basePrice).toLocaleString()}</span>
            </div>
            <div className="h-px bg-white/20 mb-3" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">Total Price</span>
              <span className="font-bold text-2xl text-gold">${calculateTotalPrice().toLocaleString()}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 btn-gold py-3 font-bold"
            >
              Save Configuration
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-3 glass border border-gold/30 rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
