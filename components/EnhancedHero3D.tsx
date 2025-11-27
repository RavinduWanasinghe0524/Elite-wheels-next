'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshReflectorMaterial, Stars } from '@react-three/drei';
import { useRef, useState, Suspense } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface Car3DModelProps {
  color: string;
}

// Geometric Car Model that always works
function GeometricCarModel({ color = '#D4AF37' }: Car3DModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Car Body */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 0.8, 4.5]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Cabin */}
        <mesh position={[0, 0.7, -0.5]} castShadow>
          <boxGeometry args={[1.8, 0.7, 2.5]} />
          <meshStandardMaterial color={color} metalness={0.95} roughness={0.05} opacity={0.9} transparent />
        </mesh>

        {/* Gold Accent Stripe */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[2.1, 0.05, 4.6]} />
          <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.5} metalness={1} roughness={0} />
        </mesh>

        {/* Wheels */}
        {[
          [1.1, -0.5, 1.5],
          [-1.1, -0.5, 1.5],
          [1.1, -0.5, -1.5],
          [-1.1, -0.5, -1.5],
        ].map((pos, idx) => (
          <group key={idx} position={pos as [number, number, number]}>
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.2, 0.2, 0.35, 32]} />
              <meshStandardMaterial color="#ffd700" metalness={1} roughness={0} />
            </mesh>
          </group>
        ))}

        {/* Headlights */}
        <mesh position={[0.6, 0, 2.26]}>
          <boxGeometry args={[0.5, 0.2, 0.1]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={3} />
        </mesh>
        <mesh position={[-0.6, 0, 2.26]}>
          <boxGeometry args={[0.5, 0.2, 0.1]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={3} />
        </mesh>

        {/* Taillights */}
        <mesh position={[0.6, 0.1, -2.26]}>
          <boxGeometry args={[0.5, 0.2, 0.1]} />
          <meshStandardMaterial color="#e94560" emissive="#e94560" emissiveIntensity={2.5} />
        </mesh>
        <mesh position={[-0.6, 0.1, -2.26]}>
          <boxGeometry args={[0.5, 0.2, 0.1]} />
          <meshStandardMaterial color="#e94560" emissive="#e94560" emissiveIntensity={2.5} />
        </mesh>
      </Float>
    </group>
  );
}

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
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }} camera={{ position: [5, 2, 5], fov: 50 }}>
        
        {/* Environment */}
        <Environment preset="city" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <spotLight position={[-10, 5, -5]} angle={0.3} penumbra={1} intensity={1} color="#D4AF37" />
        <pointLight position={[0, 3, 5]} intensity={0.5} />

        <Suspense fallback={null}>
          <GeometricCarModel color={cars[currentCar].color} />
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
