'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, MeshReflectorMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function CarModel() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={meshRef} position={[0, -0.5, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Abstract Car Body */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 0.8, 4.5]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Cabin */}
        <mesh position={[0, 1.2, -0.5]} castShadow>
          <boxGeometry args={[1.8, 0.7, 2.5]} />
          <meshStandardMaterial color="#16213e" metalness={0.95} roughness={0.05} opacity={0.8} transparent />
        </mesh>

        {/* Gold Accent Stripe */}
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[2.1, 0.05, 4.6]} />
          <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.5} metalness={1} roughness={0} />
        </mesh>

        {/* Wheels */}
        <mesh position={[1.1, 0, 1.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-1.1, 0, 1.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[1.1, 0, -1.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-1.1, 0, -1.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Gold Wheel Rims */}
        <mesh position={[1.1, 0, 1.5]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.35, 32]} />
          <meshStandardMaterial color="#ffd700" metalness={1} roughness={0} />
        </mesh>
        <mesh position={[-1.1, 0, 1.5]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.35, 32]} />
          <meshStandardMaterial color="#ffd700" metalness={1} roughness={0} />
        </mesh>
        <mesh position={[1.1, 0, -1.5]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.35, 32]} />
          <meshStandardMaterial color="#ffd700" metalness={1} roughness={0} />
        </mesh>
        <mesh position={[-1.1, 0, -1.5]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.35, 32]} />
          <meshStandardMaterial color="#ffd700" metalness={1} roughness={0} />
        </mesh>

        {/* Headlights */}
        <mesh position={[0.6, 0.5, 2.26]}>
          <boxGeometry args={[0.5, 0.2, 0.1]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={3} />
        </mesh>
        <mesh position={[-0.6, 0.5, 2.26]}>
          <boxGeometry args={[0.5, 0.2, 0.1]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={3} />
        </mesh>

        {/* Taillights */}
        <mesh position={[0.6, 0.6, -2.26]}>
          <boxGeometry args={[0.5, 0.2, 0.1]} />
          <meshStandardMaterial color="#e94560" emissive="#e94560" emissiveIntensity={2.5} />
        </mesh>
        <mesh position={[-0.6, 0.6, -2.26]}>
          <boxGeometry args={[0.5, 0.2, 0.1]} />
          <meshStandardMaterial color="#e94560" emissive="#e94560" emissiveIntensity={2.5} />
        </mesh>
      </Float>

      {/* Floor Reflection */}
      <mesh position={[0, -0.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={50}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.6}
          mirror={1}
        />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-[60vh] lg:h-[80vh] relative z-10">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={50} />
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
        
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow color="#ffffff" />
        <spotLight position={[-10, 5, -10]} angle={0.2} penumbra={1} intensity={0.8} color="#ffd700" />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffd700" />
        
        <Environment preset="city" />
        <CarModel />
        
        <fog attach="fog" args={['#1a1a2e', 10, 20]} />
      </Canvas>
    </div>
  );
}
