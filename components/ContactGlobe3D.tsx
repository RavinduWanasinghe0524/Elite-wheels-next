'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, Stars, Environment } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function RealisticGlobe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.001;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  // Create continents pattern using a simple shader-like approach
  const continentsMaterial = new THREE.MeshStandardMaterial({
    color: '#1a4d2e',
    metalness: 0.3,
    roughness: 0.7,
    emissive: '#0a2818',
    emissiveIntensity: 0.2,
  });

  const oceanMaterial = new THREE.MeshStandardMaterial({
    color: '#0f2744',
    metalness: 0.4,
    roughness: 0.6,
    emissive: '#061528',
    emissiveIntensity: 0.1,
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <group scale={0.6}>
        {/* Main Globe - Ocean */}
        <Sphere args={[2, 64, 64]} ref={globeRef}>
          <meshStandardMaterial
            color="#0a1929"
            metalness={0.5}
            roughness={0.4}
            emissive="#0d47a1"
            emissiveIntensity={0.15}
          />
        </Sphere>

        {/* Atmosphere Glow */}
        <Sphere args={[2.15, 32, 32]} ref={atmosphereRef}>
          <meshStandardMaterial
            color="#D4AF37"
            transparent
            opacity={0.15}
            side={THREE.BackSide}
            emissive="#D4AF37"
            emissiveIntensity={0.5}
          />
        </Sphere>

        {/* Inner Glow */}
        <Sphere args={[2.05, 32, 32]}>
          <meshStandardMaterial
            color="#4fc3f7"
            transparent
            opacity={0.1}
            emissive="#81d4fa"
            emissiveIntensity={0.3}
          />
        </Sphere>

        {/* Orbit Rings */}
        <group ref={ringsRef}>
          {[2.8, 3.2, 3.6].map((radius, i) => (
            <mesh key={i} rotation={[Math.PI / 2.5, 0, 0]}>
              <torusGeometry args={[radius, 0.01, 16, 100]} />
              <meshStandardMaterial
                color="#D4AF37"
                transparent
                opacity={0.3 - i * 0.08}
                emissive="#D4AF37"
                emissiveIntensity={0.5}
              />
            </mesh>
          ))}
        </group>

        {/* Location Markers (dots on globe) */}
        {[
          [0.8, 0.5, 1.8],
          [-1.2, 0.8, 1.5],
          [1.5, -0.6, 1.2],
          [-0.9, -1.0, 1.5],
          [1.0, 1.2, 1.2],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={2}
            />
          </mesh>
        ))}

        {/* Connecting Lines */}
        {[
          [[0.8, 0.5, 1.8], [-1.2, 0.8, 1.5]],
          [[-1.2, 0.8, 1.5], [1.5, -0.6, 1.2]],
          [[1.5, -0.6, 1.2], [1.0, 1.2, 1.2]],
        ].map((points, i) => {
          const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(...(points[0] as [number, number, number])),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(...(points[1] as [number, number, number]))
          );
          const curvePoints = curve.getPoints(30);
          const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
          const material = new THREE.LineBasicMaterial({
            color: new THREE.Color('#D4AF37'),
            transparent: true,
            opacity: 0.4,
          });
          const line = new THREE.Line(geometry, material);
          
          return <primitive key={i} object={line} />;
        })}
      </group>
    </Float>
  );
}

export default function ContactGlobe3D() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, 5, -10]} intensity={1.5} color="#D4AF37" />
        <pointLight position={[5, -5, 5]} intensity={1} color="#4fc3f7" />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="night" />
        
        <RealisticGlobe />
      </Canvas>
    </div>
  );
}
