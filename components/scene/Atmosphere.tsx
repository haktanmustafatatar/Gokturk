"use client";

import { useMemo, useRef } from "react";
import { Group, MathUtils, Mesh, MeshBasicMaterial } from "three";
import { Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useCinematicStore } from "@/store/useCinematicStore";

export const Atmosphere = () => {
  const hazeRef = useRef<Group>(null);
  const tier = useCinematicStore((state) => state.performanceTier);

  const mistLayers = useMemo(
    () => [
      { position: [-6, 2.2, -8], scale: [18, 5, 1], opacity: 0.1 },
      { position: [6, 1.6, -4], scale: [14, 4, 1], opacity: 0.14 },
      { position: [0, 3, -12], scale: [24, 8, 1], opacity: 0.08 },
    ],
    [],
  );

  useFrame((state) => {
    const progress = useCinematicStore.getState().progress;
    const fire = useCinematicStore.getState().derived.fireIntensity;

    if (hazeRef.current) {
      hazeRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      hazeRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.18;
    }

    hazeRef.current?.children.forEach((child, index) => {
      const mesh = child as Mesh;
      const material = mesh.material as MeshBasicMaterial;

      mesh.position.x += Math.sin(state.clock.elapsedTime * 0.09 + index) * 0.0012;
      material.opacity = MathUtils.lerp(0.03, 0.18, 1 - progress) + fire * 0.04;
    });
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]} receiveShadow>
        <planeGeometry args={[120, 120, 1, 1]} />
        <meshStandardMaterial color="#161b1f" roughness={0.94} metalness={0.05} />
      </mesh>

      <group ref={hazeRef}>
        {mistLayers.map((layer, index) => (
          <mesh
            key={index}
            position={layer.position as [number, number, number]}
            scale={layer.scale as [number, number, number]}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              color="#8ca0b8"
              transparent
              opacity={layer.opacity}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      <Sparkles
        count={tier === "high" ? 110 : 65}
        size={tier === "high" ? 2.1 : 1.5}
        scale={[18, 7, 18]}
        position={[0, 2.5, -2]}
        speed={0.16}
        opacity={0.24}
        color="#cad2dc"
      />
    </group>
  );
};
