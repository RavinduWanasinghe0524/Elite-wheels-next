'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshReflectorMaterial, Stars } from '@react-three/drei';
import { useRef, useState, Suspense } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface Car3DModelProps {
  color: string;
}

import PremiumCar from './PremiumCar';

export default function EnhancedHero3D() {
  const [currentCar, setCurrentCar] = useState(0);
  
  const cars = [
    { color: '#D4AF37', name: 'Royal Gold' },
    { color: '#C0C0C0', name: 'Platinum Silver' },
    { color: '#050505', name: 'Midnight Black' },
    { color: '#800020', name: 'Imperial Red' },
  ];

  return (
    <div className="relative w-full h-full">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }} camera={{ position: [4, 1.5, 4], fov: 45 }}>
        
        {/* Environment */}
        <Environment preset="city" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <spotLight position={[-10, 5, -5]} angle={0.3} penumbra={1} intensity={1.5} color="#D4AF37" />
        <pointLight position={[0, 3, 5]} intensity={0.8} color="#F4C430" />
        <pointLight position={[3, 1, 3]} intensity={0.5} color="#D4AF37" />

        <Suspense fallback={null}>
          <group scale={0.7} position={[0, -0.3, 0]} rotation={[0, -Math.PI / 6, 0]}>
            <PremiumCar 
              color={cars[currentCar].color}
              autoRotate
            />
          </group>
        </Suspense>
        
        {/* Floor Reflections */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={40}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050505"
            metalness={0.5}
            mirror={0}
          />
        </mesh>
      </Canvas>

      {/* Car Selector UI */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10 glass px-8 py-4 rounded-full flex gap-6">
        {cars.map((car, index) => (
          <button
            key={index}
            onClick={() => setCurrentCar(index)}
            className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
              currentCar === index
                ? 'border-white scale-125 shadow-[0_0_15px_rgba(255,255,255,0.5)]'
                : 'border-transparent hover:scale-110 opacity-70 hover:opacity-100'
            }`}
            style={{ backgroundColor: car.color }}
            title={car.name}
          />
        ))}
      </div>
      
      {/* Current Car Name */}
      <div className="absolute top-1/2 right-12 transform -translate-y-1/2 text-right hidden lg:block">
        <motion.div
          key={currentCar}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-6 rounded-2xl border-l-4 border-gold"
        >
          <div className="text-sm text-gold uppercase tracking-widest mb-1">Selected Finish</div>
          <div className="text-3xl font-display font-bold text-white">{cars[currentCar].name}</div>
        </motion.div>
      </div>
    </div>
  );
}
