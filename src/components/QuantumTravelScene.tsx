'use client'

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Stars, Environment, PerspectiveCamera, AdaptiveEvents, Preload } from '@react-three/drei';
import * as THREE from 'three';

const TravelOrb = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.15;
      ref.current.rotation.x = t * 0.3;
      ref.current.rotation.z = t * 0.2;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 32, 32]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={2}
        clearcoat={1}
        clearcoatRoughness={0}
        metalness={0.8}
        distort={0.3}
        speed={1.5}
      />
    </Sphere>
  );
};

const OrbitRing = ({ radius, speed, rotationOffset }: { radius: number; speed: number; rotationOffset: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.z = t * speed;
    }
  });

  return (
    <Torus ref={ref} args={[radius, 0.012, 12, 64]} rotation={rotationOffset}>
      <meshStandardMaterial color="#C5A059" emissive="#C5A059" emissiveIntensity={0.5} transparent opacity={0.4} />
    </Torus>
  );
}

export const QuantumTravelScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#C5A059" />
        <spotLight position={[-10, 10, 5]} angle={0.2} penumbra={1} intensity={1} color="#4F46E5" />
        
        <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.5}>
          <TravelOrb position={[0, 0, 0]} color="#C5A059" scale={1.4} />
          
          <OrbitRing radius={1.8} speed={0.2} rotationOffset={[Math.PI / 2.5, 0.2, 0]} />
          <OrbitRing radius={2.2} speed={-0.15} rotationOffset={[Math.PI / -3, -0.4, 0]} />
          <OrbitRing radius={2.6} speed={0.1} rotationOffset={[0.5, 0.5, 0]} />
        </Float>
        
        <Stars radius={100} depth={50} count={2000} factor={6} saturation={0} fade speed={1.5} />
        <Environment preset="night" />
        <AdaptiveEvents />
        <Preload all />
      </Canvas>
    </div>
  );
};
