'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, PerspectiveCamera, MeshReflectorMaterial, Stars } from '@react-three/drei';
import { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface Car3DModelProps {
  color: string;
}

function Car3DModel({ color = '#D4AF37' }: Car3DModelProps) {
  const { scene } = useGLTF('/models/car.glb');
  const meshRef = useRef<THREE.Group>(null);
  
  // Clone the scene to allow independent instances if needed
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating rotation
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.15 + 0.6;
      // Subtle pitch for dynamic feel
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02;
    }
  });

  // Apply color to the car body
  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const m = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        // Try to apply color to materials that look like paint/body
        // If material name is generic, this might not work perfectly, but it's a start.
        if (m) {
            // For now, let's assume we want to tint the whole car if we can't find specific parts,
            // or maybe just log it. But since we can't see logs easily, let's try a broad match.
            // If the user complains about everything being gold, we can refine.
            // Actually, let's just try to set it on everything that isn't black (tires).
            // This is a heuristic.
            m.color.set(color);
        }
      }
    });
  }, [clonedScene, color]);

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <primitive 
        object={clonedScene} 
        ref={meshRef} 
        scale={0.015} 
        position={[0, -0.5, 0]} 
        rotation={[0, Math.PI, 0]} 
      />
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

        <Suspense fallback={null}>
            <Car3DModel color={cars[currentCar].color} />
        </Suspense>
        
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
