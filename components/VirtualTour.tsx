'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera, Float } from '@react-three/drei';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RealisticCarModel from './RealisticCarModel';

interface VehicleLocation {
  id: number;
  name: string;
  position: [number, number, number];
  description: string;
  price: number;
  color: string;
  rimColor: string;
}

const vehicles: VehicleLocation[] = [
  { id: 1, name: 'Mercedes E-Class', position: [-6, 0, 2], description: 'Luxury Sedan', price: 53999, color: '#0a0a0a', rimColor: '#C0C0C0' },
  { id: 2, name: 'BMW i4', position: [0, 0, 2], description: 'Electric Performance', price: 75999, color: '#1E3A8A', rimColor: '#FFD700' },
  { id: 3, name: 'Audi e-tron', position: [6, 0, 2], description: 'Electric SUV', price: 65999, color: '#DC2626', rimColor: '#1a1a1a' },
  { id: 4, name: 'Porsche Cayenne', position: [-6, 0, -4], description: 'Luxury SUV', price: 89999, color: '#D4AF37', rimColor: '#FFD700' },
  { id: 5, name: 'Tesla Model S', position: [0, 0, -4], description: 'Electric Sedan', price: 94999, color: '#F8F8FF', rimColor: '#0a0a0a' },
  { id: 6, name: 'Toyota Land Cruiser', position: [6, 0, -4], description: 'Premium SUV', price: 89999, color: '#065F46', rimColor: '#C0C0C0' },
];

function Showroom() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 5, -10]}>
        <boxGeometry args={[40, 10, 0.5]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>
      <mesh position={[-20, 5, 0]}>
        <boxGeometry args={[0.5, 10, 40]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>
      <mesh position={[20, 5, 0]}>
        <boxGeometry args={[0.5, 10, 40]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>

      {/* Vehicles */}
      {vehicles.map((vehicle, index) => (
        <group key={vehicle.id} position={vehicle.position}>
          <Float speed={1 + index * 0.2} rotationIntensity={0.1} floatIntensity={0.2}>
            <RealisticCarModel 
              color={vehicle.color} 
              rimColor={vehicle.rimColor}
              scale={0.9}
            />
          </Float>
          
          {/* Spotlight for each car */}
          <spotLight
            position={[0, 8, 0]}
            angle={0.4}
            penumbra={1}
            intensity={2}
            castShadow
            color="#D4AF37"
          />
        </group>
      ))}

      {/* Ceiling Lights */}
      {Array.from({ length: 6 }).map((_, i) => (
        <pointLight
          key={i}
          position={[i * 6 - 15, 8, 0]}
          intensity={1}
          color="#ffffff"
        />
      ))}
    </group>
  );
}

export default function VirtualTour() {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleLocation | null>(null);
  const [audioGuide, setAudioGuide] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 4, 15]);

  const focusOnVehicle = (vehicle: VehicleLocation) => {
    setSelectedVehicle(vehicle);
    setCameraPosition([vehicle.position[0], 3, vehicle.position[2] + 8]);
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-gold/20">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h3 className="text-2xl font-display font-bold">
          Virtual <span className="text-gold">Showroom Tour</span>
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setAudioGuide(!audioGuide)}
            className={`glass px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              audioGuide ? 'bg-gold/20 border border-gold/50' : 'hover:bg-white/10'
            }`}
          >
            {audioGuide ? '🔊 Audio On' : '🔇 Audio Off'}
          </button>
          <button
            onClick={() => {
              setSelectedVehicle(null);
              setCameraPosition([0, 4, 15]);
            }}
            className="glass px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Reset View
          </button>
        </div>
      </div>

      {/* 3D Showroom */}
      <div className="h-[600px] relative bg-gradient-to-b from-black/60 to-black/40">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={cameraPosition} />
          <ambientLight intensity={0.3} />
          <Environment preset="warehouse" />
          
          <Showroom />
          
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            minDistance={5}
            maxDistance={25}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>

        {/* Navigation Overlay */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-xl text-sm text-gray-300">
          <span className="text-gold font-bold">Drag</span> to look around • <span className="text-gold font-bold">Scroll</span> to zoom • <span className="text-gold font-bold">Click</span> vehicles below
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="p-4 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {vehicles.map((vehicle) => (
            <motion.button
              key={vehicle.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => focusOnVehicle(vehicle)}
              className={`p-3 rounded-lg text-left transition-all ${
                selectedVehicle?.id === vehicle.id
                  ? 'bg-gold/20 border-2 border-gold'
                  : 'bg-white/5 border-2 border-white/10 hover:border-white/30'
              }`}
            >
              <div className="text-sm font-bold mb-1 truncate">{vehicle.name}</div>
              <div className="text-xs text-gray-400 mb-1">{vehicle.description}</div>
              <div className="text-xs text-gold font-bold">${vehicle.price.toLocaleString()}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Selected Vehicle Info */}
      <AnimatePresence>
        {selectedVehicle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-4 border-t border-white/10 bg-gradient-to-br from-gold/10 to-gold/5"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-xl font-bold mb-1">{selectedVehicle.name}</h4>
                <p className="text-sm text-gray-400 mb-2">{selectedVehicle.description}</p>
                <p className="text-2xl font-bold text-gold">${selectedVehicle.price.toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gold text-black font-bold rounded-lg text-sm"
                >
                  View Details
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 glass border border-gold/30 rounded-lg text-sm"
                >
                  Test Drive
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
