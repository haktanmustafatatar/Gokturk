"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, MathUtils, Vector3 } from "three";
import { useCinematicStore } from "@/store/useCinematicStore";
import { SacredStructureAsset } from "@/components/scene/SacredStructureAsset";

export const SacredStructure = () => {
  const groupRef = useRef<Group>(null);
  const scaleTarget = new Vector3();
  const structureReveal = useCinematicStore((state) => state.derived.structureReveal);

  useFrame((state, delta) => {
    const { derived, progress } = useCinematicStore.getState();
    const targetScale = MathUtils.lerp(0.74, 1.02, derived.structureReveal);
    const group = groupRef.current;
    const drift = derived.motionIntensity * (1 - derived.stillness * 0.74);

    if (!group) {
      return;
    }

    scaleTarget.setScalar(targetScale);
    group.scale.lerp(scaleTarget, 1 - Math.exp(-delta * 2));
    group.position.y = MathUtils.lerp(-0.45, 0.02, derived.structureReveal);
    group.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.018 * drift + progress * 0.1;
  });

  return (
    <group ref={groupRef} position={[0, -0.45, -0.4]} scale={0.75}>
      <SacredStructureAsset reveal={structureReveal} />
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.25, 2.65, 1.2, 24, 1, true]} />
        <meshStandardMaterial color="#19120f" roughness={0.96} metalness={0.08} />
      </mesh>

      <mesh position={[0, 1.48, 0]} castShadow>
        <coneGeometry args={[1.9, 1.55, 18, 1, true]} />
        <meshStandardMaterial color="#231815" roughness={0.9} metalness={0.04} />
      </mesh>

      <mesh position={[0, 0.36, 2.05]} castShadow>
        <boxGeometry args={[0.88, 0.72, 0.12]} />
        <meshStandardMaterial color="#35251d" roughness={0.8} metalness={0.1} />
      </mesh>

      <mesh position={[0, 0.72, 0.68]} castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color="#ff9440" transparent opacity={0.95} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <ringGeometry args={[2.8, 3.2, 48]} />
        <meshBasicMaterial color="#6b5a3a" transparent opacity={0.22} />
      </mesh>
    </group>
  );
};
