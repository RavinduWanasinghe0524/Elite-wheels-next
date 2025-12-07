'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';

interface RealisticCarModelProps {
  modelPath?: string;
  color?: string;
  rimColor?: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
}

export default function RealisticCarModel({ 
  modelPath = '/models/sports_car.glb',
  color = '#D4AF37', 
  rimColor = '#C0C0C0',
  scale = 1, 
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = false
}: RealisticCarModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Try to load the model, fallback to procedural if not available
  let scene: THREE.Group | null = null;
  let error = false;

  try {
    const gltf = useGLTF(modelPath);
    scene = gltf.scene;
  } catch (e) {
    error = true;
  }

  // Clone the scene to ensure independent instances
  const clonedScene = useMemo(() => {
    if (scene) {
      return scene.clone();
    }
    return null;
  }, [scene]);

  // Apply colors to the car
  useEffect(() => {
    if (clonedScene) {
      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const material = mesh.material as THREE.Material;
          const materialName = material?.name?.toLowerCase() || '';
          const meshName = mesh.name.toLowerCase();
          
          // Apply body color
          const isBody = 
            (materialName.includes('body') || 
             materialName.includes('paint') || 
             materialName.includes('metal') || 
             materialName.includes('car') ||
             materialName.includes('exterior') ||
             meshName.includes('body') ||
             meshName.includes('hood') ||
             meshName.includes('door') ||
             meshName.includes('roof') ||
             meshName.includes('trunk')) &&
            !materialName.includes('glass') &&
            !materialName.includes('window') &&
            !materialName.includes('wheel') &&
            !materialName.includes('tire') &&
            !materialName.includes('rim') &&
            !materialName.includes('chrome') &&
            !materialName.includes('light');

          if (isBody) {
            if (mesh.material instanceof THREE.MeshStandardMaterial) {
              const clonedMaterial = mesh.material.clone() as THREE.MeshStandardMaterial;
              clonedMaterial.color.set(color);
              clonedMaterial.metalness = 0.9;
              clonedMaterial.roughness = 0.15;
              clonedMaterial.envMapIntensity = 2;
              mesh.material = clonedMaterial;
            }
          }

          // Apply rim color
          const isRim = 
            materialName.includes('rim') ||
            materialName.includes('wheel') ||
            meshName.includes('rim') ||
            meshName.includes('alloy');

          if (isRim && !(materialName.includes('tire') || materialName.includes('rubber'))) {
            if (mesh.material instanceof THREE.MeshStandardMaterial) {
              const clonedMaterial = mesh.material.clone() as THREE.MeshStandardMaterial;
              clonedMaterial.color.set(rimColor);
              clonedMaterial.metalness = 0.95;
              clonedMaterial.roughness = 0.1;
              mesh.material = clonedMaterial;
            }
          }
        }
      });
    }
  }, [clonedScene, color, rimColor]);

  useFrame(() => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  // If model loading failed, use procedural car
  if (error || !clonedScene) {
    return <ProceduralCar color={color} rimColor={rimColor} autoRotate={autoRotate} />;
  }

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={clonedScene} />
    </group>
  );
}

// Fallback procedural car (enhanced version)
function ProceduralCar({ 
  color = '#D4AF37', 
  rimColor = '#C0C0C0',
  autoRotate = false 
}: { 
  color?: string; 
  rimColor?: string;
  autoRotate?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Body - Lower Section */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.7, 5.2]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.95} 
          roughness={0.12}
          envMapIntensity={2}
        />
      </mesh>

      {/* Body - Upper Section (Cabin) */}
      <mesh position={[0, 1.0, -0.2]} castShadow>
        <boxGeometry args={[2.0, 0.7, 2.6]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.96} 
          roughness={0.1}
          envMapIntensity={2}
        />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 1.45, -0.2]} castShadow>
        <boxGeometry args={[1.95, 0.2, 2.4]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.97} 
          roughness={0.08}
        />
      </mesh>

      {/* Hood */}
      <mesh position={[0, 0.75, 2.3]} rotation={[-0.12, 0, 0]} castShadow>
        <boxGeometry args={[2.3, 0.35, 1.6]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.95} 
          roughness={0.1}
        />
      </mesh>

      {/* Trunk */}
      <mesh position={[0, 0.8, -2.7]} rotation={[0.1, 0, 0]} castShadow>
        <boxGeometry args={[2.3, 0.4, 1.4]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.95} 
          roughness={0.1}
        />
      </mesh>

      {/* Windows - Windshield */}
      <mesh position={[0, 1.1, 1.0]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[1.95, 0.65, 0.05]} />
        <meshPhysicalMaterial 
          color="#0d1829"
          metalness={0.05}
          roughness={0.0}
          transmission={0.95}
          thickness={0.5}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Windows - Rear */}
      <mesh position={[0, 1.1, -1.4]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[1.95, 0.65, 0.05]} />
        <meshPhysicalMaterial 
          color="#0d1829"
          metalness={0.05}
          roughness={0.0}
          transmission={0.95}
          thickness={0.5}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Side Windows */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 1.02, 1.1, -0.2]}>
          <boxGeometry args={[0.05, 0.55, 2.2]} />
          <meshPhysicalMaterial 
            color="#0d1829"
            metalness={0.05}
            roughness={0.0}
            transmission={0.95}
            thickness={0.5}
            transparent
            opacity={0.25}
          />
        </mesh>
      ))}

      {/* Wheels */}
      {[
        [1.25, 0, 1.8],
        [-1.25, 0, 1.8],
        [1.25, 0, -1.8],
        [-1.25, 0, -1.8]
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          {/* Tire */}
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.45, 0.45, 0.38, 32]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.8} />
          </mesh>
          {/* Rim */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.28, 0.28, 0.4, 32]} />
            <meshStandardMaterial color={rimColor} metalness={0.98} roughness={0.05} />
          </mesh>
          {/* Rim Spokes */}
          {[0, 1, 2, 3, 4].map((j) => (
            <mesh 
              key={j} 
              position={[
                (pos[0] > 0 ? 0.21 : -0.21),
                Math.cos(j * Math.PI * 2 / 5) * 0.17,
                Math.sin(j * Math.PI * 2 / 5) * 0.17
              ]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.035, 0.035, 0.12, 8]} />
              <meshStandardMaterial color={rimColor} metalness={1} roughness={0} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Headlights */}
      {[-0.75, 0.75].map((x) => (
        <mesh key={x} position={[x, 0.5, 2.61]}>
          <boxGeometry args={[0.5, 0.25, 0.05]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff" 
            emissiveIntensity={5}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Taillights */}
      {[-0.75, 0.75].map((x) => (
        <mesh key={x} position={[x, 0.55, -3.41]}>
          <boxGeometry args={[0.45, 0.2, 0.05]} />
          <meshStandardMaterial 
            color="#ff0000" 
            emissive="#ff0000" 
            emissiveIntensity={4}
          />
        </mesh>
      ))}

      {/* Front Grille */}
      <mesh position={[0, 0.25, 2.62]}>
        <boxGeometry args={[1.6, 0.4, 0.05]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          metalness={0.9} 
          roughness={0.25}
        />
      </mesh>

      {/* Side Mirrors */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 1.3, 1.25, 0.8]}>
          <boxGeometry args={[0.18, 0.15, 0.3]} />
          <meshStandardMaterial 
            color={color} 
            metalness={0.95} 
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Spoiler */}
      <mesh position={[0, 1.3, -3.2]}>
        <boxGeometry args={[2.0, 0.1, 0.45]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.95} 
          roughness={0.1}
        />
      </mesh>

      {/* Lighting effects */}
      <pointLight position={[0.75, 0.5, 2.7]} intensity={1.2} distance={6} color="#ffffff" />
      <pointLight position={[-0.75, 0.5, 2.7]} intensity={1.2} distance={6} color="#ffffff" />
    </group>
  );
}

// Preload common models (update paths as needed)
if (typeof window !== 'undefined') {
  try {
    useGLTF.preload('/models/sports_car.glb');
    useGLTF.preload('/models/sedan.glb');
    useGLTF.preload('/models/suv.glb');
  } catch (e) {
    // Models not available, will use procedural fallback
  }
}
