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
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Cabin */}
        <mesh position={[0, 1.2, -0.5]} castShadow>
          <boxGeometry args={[1.8, 0.7, 2.5]} />
          <meshStandardMaterial color="#16213e" metalness={0.9} roughness={0.1} opacity={0.7} transparent />
        </mesh>

        {/* Wheels */}
        <mesh position={[1.1, 0, 1.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <mesh position={[-1.1, 0, 1.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <mesh position={[1.1, 0, -1.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <mesh position={[-1.1, 0, -1.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial color="#333" />
        </mesh>

        {/* Headlights */}
        <mesh position={[0.6, 0.5, 2.26]}>
          <boxGeometry args={[0.5, 0.2, 0.1]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
        </mesh>
        <mesh position={[-0.6, 0.5, 2.26]}>
          <boxGeometry args={[0.5, 0.2, 0.1]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
        </mesh>

        {/* Taillights */}
        <mesh position={[0.6, 0.6, -2.26]}>
          <boxGeometry args={[0.5, 0.2, 0.1]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} />
        </mesh>
        <mesh position={[-0.6, 0.6, -2.26]}>
          <boxGeometry args={[0.5, 0.2, 0.1]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} />
        </mesh>
      </Float>

      {/* Floor Reflection */}
      <mesh position={[0, -0.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#101010"
          metalness={0.5}
          mirror={1} // Fixed: mirror prop is number (0-1) not boolean
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
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Environment preset="city" />
        <CarModel />
        
        <fog attach="fog" args={['#1a1a2e', 10, 20]} />
      </Canvas>
    </div>
  );
}
