'use client';

import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

interface PremiumCarProps {
  color?: string;
  autoRotate?: boolean;
}

export default function PremiumCar({ 
  color = '#D4AF37',
  autoRotate = false
}: PremiumCarProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Main Body - Lower Section */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.6, 4.8]} />
          <meshStandardMaterial 
            color={color} 
            metalness={0.95} 
            roughness={0.1}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Body - Upper Section (Cabin) */}
        <mesh position={[0, 0.9, -0.3]} castShadow>
          <boxGeometry args={[1.9, 0.65, 2.4]} />
          <meshStandardMaterial 
            color={color} 
            metalness={0.96} 
            roughness={0.08}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Roof */}
        <mesh position={[0, 1.35, -0.3]} castShadow>
          <boxGeometry args={[1.85, 0.25, 2.2]} />
          <meshStandardMaterial 
            color={color} 
            metalness={0.97} 
            roughness={0.05}
          />
        </mesh>

        {/* Hood */}
        <mesh position={[0, 0.65, 2.1]} rotation={[-0.1, 0, 0]} castShadow>
          <boxGeometry args={[2.1, 0.3, 1.4]} />
          <meshStandardMaterial 
            color={color} 
            metalness={0.95} 
            roughness={0.1}
          />
        </mesh>

        {/* Trunk */}
        <mesh position={[0, 0.72, -2.5]} rotation={[0.08, 0, 0]} castShadow>
          <boxGeometry args={[2.1, 0.35, 1.2]} />
          <meshStandardMaterial 
            color={color} 
            metalness={0.95} 
            roughness={0.1}
          />
        </mesh>

        {/* Gold Accent Stripe */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[2.25, 0.04, 4.85]} />
          <meshStandardMaterial 
            color="#FFD700" 
            emissive="#FFD700" 
            emissiveIntensity={0.6}
            metalness={1} 
            roughness={0}
          />
        </mesh>

        {/* Windows - Windshield */}
        <mesh position={[0, 1.0, 0.8]} rotation={[-0.15, 0, 0]}>
          <boxGeometry args={[1.85, 0.6, 0.05]} />
          <meshPhysicalMaterial 
            color="#0a1929"
            metalness={0.1}
            roughness={0.0}
            transmission={0.9}
            thickness={0.5}
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Windows - Rear */}
        <mesh position={[0, 1.0, -1.4]} rotation={[0.15, 0, 0]}>
          <boxGeometry args={[1.85, 0.6, 0.05]} />
          <meshPhysicalMaterial 
            color="#0a1929"
            metalness={0.1}
            roughness={0.0}
            transmission={0.9}
            thickness={0.5}
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Windows - Side Left */}
        <mesh position={[0.97, 1.0, -0.3]}>
          <boxGeometry args={[0.05, 0.5, 2.0]} />
          <meshPhysicalMaterial 
            color="#0a1929"
            metalness={0.1}
            roughness={0.0}
            transmission={0.9}
            thickness={0.5}
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Windows - Side Right */}
        <mesh position={[-0.97, 1.0, -0.3]}>
          <boxGeometry args={[0.05, 0.5, 2.0]} />
          <meshPhysicalMaterial 
            color="#0a1929"
            metalness={0.1}
            roughness={0.0}
            transmission={0.9}
            thickness={0.5}
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Wheels - Front Left */}
        <group position={[1.15, 0, 1.6]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.42, 0.42, 0.35, 32]} />
            <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.7} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.25, 0.25, 0.37, 32]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Rim Details */}
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh 
              key={i} 
              position={[0.19, Math.cos(i * Math.PI * 2 / 5) * 0.15, Math.sin(i * Math.PI * 2 / 5) * 0.15]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.03, 0.03, 0.1, 8]} />
              <meshStandardMaterial color="#FFD700" metalness={1} roughness={0} />
            </mesh>
          ))}
        </group>

        {/* Wheels - Front Right */}
        <group position={[-1.15, 0, 1.6]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.42, 0.42, 0.35, 32]} />
            <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.7} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.25, 0.25, 0.37, 32]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.95} roughness={0.1} />
          </mesh>
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh 
              key={i} 
              position={[-0.19, Math.cos(i * Math.PI * 2 / 5) * 0.15, Math.sin(i * Math.PI * 2 / 5) * 0.15]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.03, 0.03, 0.1, 8]} />
              <meshStandardMaterial color="#FFD700" metalness={1} roughness={0} />
            </mesh>
          ))}
        </group>

        {/* Wheels - Rear Left */}
        <group position={[1.15, 0, -1.6]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.42, 0.42, 0.35, 32]} />
            <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.7} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.25, 0.25, 0.37, 32]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.95} roughness={0.1} />
          </mesh>
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh 
              key={i} 
              position={[0.19, Math.cos(i * Math.PI * 2 / 5) * 0.15, Math.sin(i * Math.PI * 2 / 5) * 0.15]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.03, 0.03, 0.1, 8]} />
              <meshStandardMaterial color="#FFD700" metalness={1} roughness={0} />
            </mesh>
          ))}
        </group>

        {/* Wheels - Rear Right */}
        <group position={[-1.15, 0, -1.6]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.42, 0.42, 0.35, 32]} />
            <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.7} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.25, 0.25, 0.37, 32]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.95} roughness={0.1} />
          </mesh>
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh 
              key={i} 
              position={[-0.19, Math.cos(i * Math.PI * 2 / 5) * 0.15, Math.sin(i * Math.PI * 2 / 5) * 0.15]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.03, 0.03, 0.1, 8]} />
              <meshStandardMaterial color="#FFD700" metalness={1} roughness={0} />
            </mesh>
          ))}
        </group>

        {/* Headlights - Left */}
        <mesh position={[0.7, 0.45, 2.41]}>
          <boxGeometry args={[0.45, 0.22, 0.05]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff" 
            emissiveIntensity={4}
            toneMapped={false}
          />
        </mesh>

        {/* Headlights - Right */}
        <mesh position={[-0.7, 0.45, 2.41]}>
          <boxGeometry args={[0.45, 0.22, 0.05]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff" 
            emissiveIntensity={4}
            toneMapped={false}
          />
        </mesh>

        {/* Taillights - Left */}
        <mesh position={[0.7, 0.5, -3.11]}>
          <boxGeometry args={[0.4, 0.18, 0.05]} />
          <meshStandardMaterial 
            color="#ff0000" 
            emissive="#ff0000" 
            emissiveIntensity={3}
          />
        </mesh>

        {/* Taillights - Right */}
        <mesh position={[-0.7, 0.5, -3.11]}>
          <boxGeometry args={[0.4, 0.18, 0.05]} />
          <meshStandardMaterial 
            color="#ff0000" 
            emissive="#ff0000" 
            emissiveIntensity={3}
          />
        </mesh>

        {/* Front Grille */}
        <mesh position={[0, 0.2, 2.42]}>
          <boxGeometry args={[1.4, 0.35, 0.05]} />
          <meshStandardMaterial 
            color="#0a0a0a" 
            metalness={0.9} 
            roughness={0.3}
          />
        </mesh>

        {/* Side Mirrors - Left */}
        <mesh position={[1.2, 1.15, 0.6]}>
          <boxGeometry args={[0.15, 0.12, 0.25]} />
          <meshStandardMaterial 
            color={color} 
            metalness={0.95} 
            roughness={0.1}
          />
        </mesh>

        {/* Side Mirrors - Right */}
        <mesh position={[-1.2, 1.15, 0.6]}>
          <boxGeometry args={[0.15, 0.12, 0.25]} />
          <meshStandardMaterial 
            color={color} 
            metalness={0.95} 
            roughness={0.1}
          />
        </mesh>

        {/* Spoiler */}
        <mesh position={[0, 1.2, -3.0]}>
          <boxGeometry args={[1.9, 0.08, 0.4]} />
          <meshStandardMaterial 
            color={color} 
            metalness={0.95} 
            roughness={0.1}
          />
        </mesh>

        {/* Headlight Glow */}
        <pointLight position={[0.7, 0.45, 2.5]} intensity={1} distance={5} color="#ffffff" />
        <pointLight position={[-0.7, 0.45, 2.5]} intensity={1} distance={5} color="#ffffff" />
      </group>
    </Float>
  );
}
