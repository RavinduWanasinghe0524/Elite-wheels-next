'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import RealisticCarModel from './RealisticCarModel';

function RotatingCar({ autoRotate, view }: { autoRotate: boolean; view: 'exterior' | 'interior' }) {
  return (
    <RealisticCarModel 
      color="#D4AF37" 
      rimColor="#FFD700"
      autoRotate={autoRotate}
    />
  );
}

export default function Car360Viewer({ carColor = '#D4AF37' }: { carColor?: string }) {
  const [view, setView] = useState<'exterior' | 'interior'>('exterior');
  const [autoRotate, setAutoRotate] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);

  const hotspots = [
    { position: { x: 20, y: 50 }, label: 'LED Headlights', description: 'Advanced LED technology' },
    { position: { x: 80, y: 45 }, label: 'Power Mirrors', description: 'Heated & auto-dimming' },
    { position: { x: 50, y: 70 }, label: 'Sunroof', description: 'Panoramic glass roof' },
    { position: { x: 30, y: 35 }, label: 'Alloy Wheels', description: '20" premium alloys' },
  ];

  return (
    <div className={`glass-card rounded-2xl overflow-hidden border border-gold/20 ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}>
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h3 className="text-xl font-display font-bold">
          360° <span className="text-gold">View</span>
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setView(view === 'exterior' ? 'interior' : 'exterior')}
            className="glass px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
          >
            {view === 'exterior' ? 'Interior' : 'Exterior'}
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="glass p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isFullscreen ? "M6 18L18 6M6 6l12 12" : "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"} />
            </svg>
          </button>
        </div>
      </div>

      {/* 3D Viewer */}
      <div className={`relative ${isFullscreen ? 'h-[calc(100vh-140px)]' : 'h-[500px]'} bg-gradient-to-br from-black/40 to-black/20`}>
        <Canvas camera={{ position: [8, 3, 8], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
          <pointLight position={[-10, 5, -10]} intensity={1.5} color="#D4AF37" />
          <pointLight position={[0, -5, 0]} intensity={0.5} color="#ffffff" />
          <Environment preset="sunset" />
          
          <RotatingCar autoRotate={autoRotate} view={view} />
          
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            minDistance={5}
            maxDistance={15}
            autoRotate={autoRotate}
            autoRotateSpeed={2}
          />
        </Canvas>

        {/* Hotspots Overlay */}
        {showHotspots && view === 'exterior' && (
          <div className="absolute inset-0 pointer-events-none">
            {hotspots.map((hotspot, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="absolute pointer-events-auto"
                style={{ left: `${hotspot.position.x}%`, top: `${hotspot.position.y}%` }}
              >
                <div className="relative group">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 bg-gold rounded-full shadow-lg shadow-gold/50"
                  />
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="glass px-4 py-2 rounded-lg border border-gold/30 whitespace-nowrap">
                      <div className="font-bold text-sm">{hotspot.label}</div>
                      <div className="text-xs text-gray-400">{hotspot.description}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Controls Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`glass px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              autoRotate ? 'bg-gold/20 border border-gold/50' : 'hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Auto Rotate
            </div>
          </button>
          
          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`glass px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              showHotspots ? 'bg-gold/20 border border-gold/50' : 'hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Hotspots
            </div>
          </button>
        </div>

        {/* Instructions */}
        <div className="absolute top-4 left-4 glass px-4 py-2 rounded-lg text-sm">
          <div className="text-gray-300">
            <span className="text-gold font-bold">Drag</span> to rotate • <span className="text-gold font-bold">Scroll</span> to zoom
          </div>
        </div>
      </div>

      {/* Angle Selector */}
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2 justify-center">
          {['Front', 'Side', 'Rear', 'Top'].map((angle) => (
            <button
              key={angle}
              className="px-4 py-2 glass rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
            >
              {angle}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
