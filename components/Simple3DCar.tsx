'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';

interface Simple3DCarProps {
  carMake: string;
}

function SimpleCar({ color = '#1a1a1a' }: { color?: string }) {
  return (
    <group>
      {/* Main body */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.8, 5]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.9} 
          roughness={0.15}
        />
      </mesh>

      {/* Cabin */}
      <mesh position={[0, 1.2, -0.2]} castShadow>
        <boxGeometry args={[2.0, 0.8, 2.8]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.9} 
          roughness={0.15}
        />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 1.7, -0.2]} castShadow>
        <boxGeometry args={[1.95, 0.2, 2.6]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.95} 
          roughness={0.1}
        />
      </mesh>

      {/* Windows - Front */}
      <mesh position={[0, 1.25, 1.2]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[1.95, 0.7, 0.05]} />
        <meshPhysicalMaterial 
          color="#1a2332"
          metalness={0.1}
          roughness={0.0}
          transmission={0.8}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Wheels */}
      {[
        [1.3, 0, 1.9],
        [-1.3, 0, 1.9],
        [1.3, 0, -1.9],
        [-1.3, 0, -1.9]
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          {/* Tire */}
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.45, 0.45, 0.4, 24]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
          </mesh>
          {/* Rim */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.28, 0.28, 0.42, 24]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.95} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* Headlights */}
      {[-0.8, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 0.55, 2.6]}>
          <boxGeometry args={[0.5, 0.25, 0.05]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff" 
            emissiveIntensity={3}
          />
        </mesh>
      ))}
    </group>
  );
}

// Brand colors
const BRAND_COLORS: { [key: string]: string } = {
  'Mercedes': '#0a0a0a',
  'BMW': '#1E3A8A',
  'Audi': '#DC2626',
  'Honda': '#C0C0C0',
  'Toyota': '#D4AF37',
  'Ford': '#1a4d2e',
  'Nissan': '#4B5563',
  'Jeep': '#065F46',
};

export default function Simple3DCar({ carMake }: Simple3DCarProps) {
  const brandColor = BRAND_COLORS[carMake] || '#1a1a1a';

  return (
    <div className="w-full h-[300px] rounded-xl overflow-hidden bg-gradient-to-br from-black/60 to-black/30 relative">
      <Canvas shadows camera={{ position: [6, 3, 6], fov: 45 }}>
        <PerspectiveCamera makeDefault position={[6, 3, 6]} />
        
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.3} 
          intensity={1.5} 
          castShadow 
        />
        <pointLight position={[-8, 5, -8]} intensity={0.8} color="#D4AF37" />
        
        <Environment preset="sunset" />
        
        <Suspense fallback={null}>
          <SimpleCar color={brandColor} />
        </Suspense>
        
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.6} roughness={0.4} />
        </mesh>
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={12}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate
          autoRotateSpeed={1.5}
        />
      </Canvas>
      
      <div className="absolute top-2 right-2 px-2 py-1 glass rounded-lg border border-gold/30 backdrop-blur-md">
        <span className="text-gold font-bold text-xs uppercase">{carMake}</span>
      </div>
    </div>
  );
}
