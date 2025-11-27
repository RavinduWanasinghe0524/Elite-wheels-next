'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere args={[2.5, 64, 64]} ref={meshRef}>
        <MeshDistortMaterial
          color="#D4AF37"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>
      {/* Inner Core */}
      <Sphere args={[1.8, 32, 32]}>
         <meshStandardMaterial
            color="#000"
            emissive="#D4AF37"
            emissiveIntensity={0.2}
            roughness={0.5}
            metalness={1}
         />
      </Sphere>
    </Float>
  );
}

export default function ContactGlobe3D() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <Globe />
      </Canvas>
    </div>
  );
}
