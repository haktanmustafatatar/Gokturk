"use client";

import { useMemo, useRef } from "react";
import { Group, MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import { useCinematicStore } from "@/store/useCinematicStore";

type Monolith = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
};

export const MonolithField = () => {
  const groupRef = useRef<Group>(null);
  const tier = useCinematicStore((state) => state.performanceTier);

  const monoliths = useMemo<Monolith[]>(
    () => [
      { position: [-9, 1.8, -14], rotation: [0, 0.2, 0], scale: [0.6, 4.2, 0.6] },
      { position: [-6.8, 1.1, -9], rotation: [0, -0.12, 0], scale: [0.38, 2.6, 0.38] },
      { position: [8.4, 1.5, -11], rotation: [0, -0.18, 0], scale: [0.52, 3.6, 0.52] },
      { position: [6.4, 1, -7.5], rotation: [0, 0.16, 0], scale: [0.32, 2.1, 0.32] },
      { position: [0, 1.4, -18], rotation: [0, 0, 0], scale: [0.84, 3.4, 0.84] },
    ],
    [],
  );

  useFrame((state) => {
    const glow = useCinematicStore.getState().derived.horizonGlow;

    if (!groupRef.current) {
      return;
    }

    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.06;
    groupRef.current.children.forEach((child, index) => {
      child.rotation.y += Math.sin(state.clock.elapsedTime * 0.06 + index) * 0.0004;
      child.position.y += Math.sin(state.clock.elapsedTime * 0.18 + index) * 0.0008;
      child.visible = tier !== "low" || index < 3;
      child.scale.y = monoliths[index].scale[1] + MathUtils.lerp(0, 0.4, glow);
    });
  });

  return (
    <group ref={groupRef}>
      {monoliths.map((monolith, index) => (
        <group
          key={index}
          position={monolith.position}
          rotation={monolith.rotation}
          scale={monolith.scale}
        >
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#181b1f" roughness={0.96} metalness={0.06} />
          </mesh>
          <mesh position={[0, 0.42, 0]} scale={[1.18, 0.08, 1.18]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#7e8c9c" transparent opacity={0.08} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
