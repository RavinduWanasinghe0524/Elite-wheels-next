'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function Particles({ count = 200 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const light = useRef<THREE.PointLight>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      const z = Math.random() * 2 - 1;

      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!mesh.current) return;

    particles.forEach((particle, i) => {
      let { factor, speed, x, y, z } = particle;

      const t = (particle.time += speed);

      dummy.position.set(
        x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );

      const s = Math.cos(t);
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;

    if (light.current) {
      light.current.position.set(
        Math.sin(Date.now() * 0.001) * 30,
        Math.cos(Date.now() * 0.001) * 30,
        Math.sin(Date.now() * 0.0005) * 30
      );
    }
  });

  return (
    <>
      <pointLight ref={light} distance={60} intensity={12} color="#ffd700" />
      <pointLight position={[30, 30, 30]} intensity={8} color="#ff3366" />
      <pointLight position={[-30, -30, -30]} intensity={8} color="#00d4ff" />
      
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <dodecahedronGeometry args={[0.15, 0]} />
        <meshPhongMaterial 
          color="#ffd700" 
          emissive="#ffd700" 
          emissiveIntensity={0.6}
          transparent
          opacity={0.8}
        />
      </instancedMesh>
    </>
  );
}

export default function EnhancedParticleBackground() {
  return (
    <div className="fixed inset-0 -z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, 80], fov: 75 }}>
        <fog attach="fog" args={['#0a0a0f', 70, 120]} />
        <ambientLight intensity={0.4} />
        <Particles count={200} />
      </Canvas>
    </div>
  );
}
