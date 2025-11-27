'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, ContactShadows, PerspectiveCamera, MeshReflectorMaterial, Stars } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface Car3DModelProps {
  color: string;
}

function Car3DModel({ color = '#D4AF37' }: Car3DModelProps) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating rotation
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.15 + 0.6;
      // Subtle pitch for dynamic feel
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <group ref={meshRef}>
        {/* Main Body - Sculpted */}
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.7, 4.8]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.8}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={2}
          />
        </mesh>

        {/* Cabin/Roof - Sleek Glass */}
        <mesh position={[0, 1.2, -0.4]} castShadow>
          <boxGeometry args={[1.8, 0.6, 2.6]} />
          <meshPhysicalMaterial
            color="#111"
            metalness={1}
            roughness={0}
            transmission={0.2}
            thickness={1}
            envMapIntensity={3}
          />
        </mesh>

        {/* Hood Scoop Detail */}
        <mesh position={[0, 0.96, 1.2]} castShadow>
          <boxGeometry args={[1.2, 0.1, 1.5]} />
          <meshPhysicalMaterial color={color} metalness={0.8} roughness={0.2} clearcoat={1} />
        </mesh>

        {/* Wheels - Detailed Rims */}
        {[
          [-1.15, 0.4, 1.6],
          [1.15, 0.4, 1.6],
          [-1.15, 0.4, -1.6],
          [1.15, 0.4, -1.6]
        ].map((pos, i) => (
          <group key={i} position={pos as [number, number, number]} rotation={[0, 0, Math.PI / 2]}>
            {/* Tire */}
            <mesh castShadow>
              <cylinderGeometry args={[0.42, 0.42, 0.35, 32]} />
              <meshStandardMaterial color="#111" roughness={0.8} />
            </mesh>
            {/* Rim */}
            <mesh position={[0, 0.05, 0]}>
              <cylinderGeometry args={[0.25, 0.25, 0.26, 16]} />
              <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.2} />
            </mesh>
            {/* Spokes */}
            <mesh rotation={[0, 0, 0]}>
              <boxGeometry args={[0.3, 0.35, 0.05]} />
              <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} />
            </mesh>
             <mesh rotation={[0, Math.PI/2, 0]}>
              <boxGeometry args={[0.3, 0.35, 0.05]} />
              <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} />
            </mesh>
          </group>
        ))}

        {/* Headlights - Glowing Xenon */}
        <mesh position={[0.8, 0.65, 2.41]}>
          <boxGeometry args={[0.4, 0.15, 0.1]} />
          <meshStandardMaterial color="#4deeea" emissive="#4deeea" emissiveIntensity={10} toneMapped={false} />
        </mesh>
        <mesh position={[-0.8, 0.65, 2.41]}>
          <boxGeometry args={[0.4, 0.15, 0.1]} />
          <meshStandardMaterial color="#4deeea" emissive="#4deeea" emissiveIntensity={10} toneMapped={false} />
        </mesh>

        {/* Taillights - Laser Red */}
        <mesh position={[0, 0.7, -2.41]}>
          <boxGeometry args={[2, 0.1, 0.1]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={5} toneMapped={false} />
        </mesh>

        {/* Underglow */}
        <pointLight position={[0, -0.5, 0]} distance={4} intensity={2} color={color} />
      </group>
    </Float>
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
      <Canvas shadows dpr={[1, 2]} gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.5 }}>
        <PerspectiveCamera makeDefault position={[6, 3, 7]} fov={40} />
        
        {/* Cinematic Environment */}
        <Environment preset="night" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Dynamic Lighting */}
        <ambientLight intensity={0.2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.5}
          penumbra={1}
          intensity={20}
          castShadow
          shadow-bias={-0.0001}
          color="#fff"
        />
        <spotLight
          position={[-10, 5, -5]}
          angle={0.5}
          penumbra={1}
          intensity={10}
          color="#D4AF37"
        />
        <pointLight position={[0, 2, 3]} intensity={5} color="#fff" />

        <Car3DModel color={cars[currentCar].color} />
        
        {/* Floor Reflections */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
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
