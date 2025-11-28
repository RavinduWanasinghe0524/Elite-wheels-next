'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';

interface RealisticCarProps {
  color?: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
}

export default function RealisticCar({ 
  color = '#D4AF37', 
  scale = 1, 
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = false
}: RealisticCarProps) {
  const { scene } = useGLTF('/models/car.glb');
  
  // Clone the scene to ensure independent instances
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const groupRef = useRef<THREE.Group>(null);

  // Apply color to the car body
  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const materialName = (mesh.material as THREE.Material).name.toLowerCase();
        const meshName = mesh.name.toLowerCase();
        
        // Heuristic to find body parts
        const isBody = 
          (materialName.includes('body') || 
           materialName.includes('paint') || 
           materialName.includes('metal') || 
           materialName.includes('main') ||
           meshName.includes('body')) &&
          !materialName.includes('glass') &&
          !materialName.includes('window') &&
          !materialName.includes('wheel') &&
          !materialName.includes('tire') &&
          !materialName.includes('rim') &&
          !materialName.includes('chrome') &&
          !materialName.includes('light') &&
          !materialName.includes('lamp');

        if (isBody) {
          // Ensure we're working with a standard material for best results
          if (mesh.material instanceof THREE.MeshStandardMaterial) {
            mesh.material.color.set(color);
            mesh.material.metalness = 0.8;
            mesh.material.roughness = 0.2;
            mesh.material.envMapIntensity = 1.5;
          } else {
            // Create a new material if the existing one isn't standard
            const newMaterial = new THREE.MeshStandardMaterial({
              color: color,
              metalness: 0.8,
              roughness: 0.2,
              envMapIntensity: 1.5
            });
            mesh.material = newMaterial;
          }
        }
      }
    });
  }, [clonedScene, color]);

  useFrame((state) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={clonedScene} />
    </group>
  );
}

// Preload the model
useGLTF.preload('/models/car.glb');
