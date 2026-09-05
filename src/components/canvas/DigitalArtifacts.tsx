"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Wireframe, Float, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

interface DigitalArtifactsProps {
  activeStep: number;
}

function ArtifactsGroup({ activeStep }: DigitalArtifactsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef1 = useRef<THREE.Mesh>(null);
  const meshRef2 = useRef<THREE.Mesh>(null);
  const meshRef3 = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!groupRef.current || !meshRef1.current || !meshRef2.current || !meshRef3.current) return;

    const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.5 } });

    switch (activeStep) {
      case 0: // ASSET AND SERVICE COORDINATION
        tl.to(groupRef.current.scale, { x: 1, y: 1, z: 1 })
          .to(meshRef1.current.position, { x: 0, y: 0.5, z: 0 }, 0)
          .to(meshRef2.current.position, { x: -1, y: -0.5, z: 0 }, 0)
          .to(meshRef3.current.position, { x: 1, y: -0.5, z: 0 }, 0)
          .to([meshRef1.current.scale, meshRef2.current.scale, meshRef3.current.scale], { x: 1, y: 1, z: 1 }, 0);
        break;
      case 1: // TRUSTED DATA LAYER
        tl.to(groupRef.current.scale, { x: 1.2, y: 1.2, z: 1.2 })
          .to(meshRef1.current.position, { x: 0, y: 1, z: 0 }, 0)
          .to(meshRef2.current.position, { x: 0, y: 0, z: 0 }, 0)
          .to(meshRef3.current.position, { x: 0, y: -1, z: 0 }, 0)
          .to([meshRef1.current.scale, meshRef2.current.scale, meshRef3.current.scale], { x: 2, y: 0.2, z: 2 }, 0);
        break;
      case 2: // DATA SECURITY
        tl.to(groupRef.current.scale, { x: 0.9, y: 0.9, z: 0.9 })
          .to(meshRef1.current.position, { x: 0, y: 0, z: 0 }, 0)
          .to(meshRef2.current.position, { x: 0, y: 0, z: 0 }, 0)
          .to(meshRef3.current.position, { x: 0, y: 0, z: 0 }, 0)
          .to(meshRef1.current.scale, { x: 2, y: 2, z: 2 }, 0)
          .to(meshRef2.current.scale, { x: 1.5, y: 1.5, z: 1.5 }, 0)
          .to(meshRef3.current.scale, { x: 1, y: 1, z: 1 }, 0);
        break;
      case 3: // VERIFIABLE COMPUTE
        tl.to(groupRef.current.scale, { x: 1.1, y: 1.1, z: 1.1 })
          .to(meshRef1.current.position, { x: -1, y: 1, z: -1 }, 0)
          .to(meshRef2.current.position, { x: 1, y: -1, z: 1 }, 0)
          .to(meshRef3.current.position, { x: 0, y: 0, z: 0 }, 0)
          .to([meshRef1.current.scale, meshRef2.current.scale], { x: 0.5, y: 2, z: 0.5 }, 0)
          .to(meshRef3.current.scale, { x: 3, y: 0.1, z: 3 }, 0);
        break;
    }
  }, [activeStep]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
      {/* Isometric rotation applied above */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Box ref={meshRef1} args={[1, 1, 1]}>
          <meshBasicMaterial color="#1e5fff" wireframe wireframeLinewidth={2} />
        </Box>
      </Float>
      
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Box ref={meshRef2} args={[1, 1, 1]}>
          <meshBasicMaterial color="#22d3a8" wireframe wireframeLinewidth={2} />
        </Box>
      </Float>

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Box ref={meshRef3} args={[1, 1, 1]}>
          <meshBasicMaterial color="#1e5fff" wireframe wireframeLinewidth={2} />
        </Box>
      </Float>
    </group>
  );
}

export function DigitalArtifacts({ activeStep }: DigitalArtifactsProps) {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas>
        {/* Orthographic camera for true isometric look */}
        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={80} />
        <ambientLight intensity={1} />
        <ArtifactsGroup activeStep={activeStep} />
      </Canvas>
    </div>
  );
}
