"use client";

import { useMemo, useRef } from "react";
import { Group, MathUtils, Mesh, MeshBasicMaterial } from "three";
import { Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useCinematicStore } from "@/store/useCinematicStore";

export const Atmosphere = () => {
  const hazeRef = useRef<Group>(null);
  const tier = useCinematicStore((state) => state.performanceTier);
  const derived = useCinematicStore((state) => state.derived);

  const mistLayers = useMemo(
    () => [
      { position: [-6, 2.2, -8], scale: [18, 5, 1], opacity: 0.1 },
      { position: [6, 1.6, -4], scale: [14, 4, 1], opacity: 0.14 },
      { position: [0, 3, -12], scale: [24, 8, 1], opacity: 0.08 },
    ],
    [],
  );

  useFrame((state) => {
    const { progress } = useCinematicStore.getState();
    const drift = derived.mistDriftEnabled
      ? derived.motionIntensity * (1 - derived.stillness * 0.62)
      : 0;

    if (hazeRef.current) {
      hazeRef.current.rotation.y = state.clock.elapsedTime * 0.01 * drift;
      hazeRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.12 * drift;
    }

    hazeRef.current?.children.forEach((child, index) => {
      const mesh = child as Mesh;
      const material = mesh.material as MeshBasicMaterial;

      mesh.position.x += Math.sin(state.clock.elapsedTime * 0.08 + index) * 0.0008 * drift;
      material.opacity =
        MathUtils.lerp(0.015, derived.mistOpacity, 1 - progress * 0.4) +
        derived.fireIntensity * 0.03;
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

      {derived.sparklesEnabled ? (
        <Sparkles
          count={tier === "high" ? 70 : 36}
          size={tier === "high" ? 1.8 : 1.2}
          scale={[18, 7, 18]}
          position={[0, 2.5, -2]}
          speed={0.1}
          opacity={0.16}
          color="#cad2dc"
        />
      ) : null}
    </group>
  );
};
