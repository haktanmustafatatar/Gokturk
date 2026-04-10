"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, MathUtils, Mesh, MeshBasicMaterial } from "three";
import { useCinematicStore } from "@/store/useCinematicStore";

export const HorizonAura = () => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    const { fireIntensity, horizonGlow, motionIntensity, stillness, auraMotionEnabled } =
      useCinematicStore.getState().derived;
    const drift = auraMotionEnabled ? motionIntensity * (1 - stillness * 0.7) : 0;

    groupRef.current?.children.forEach((child, index) => {
      const mesh = child as Mesh;
      const material = mesh.material as MeshBasicMaterial;

      mesh.rotation.z = Math.sin(state.clock.elapsedTime * 0.13 + index) * 0.012 * drift;
      material.opacity = MathUtils.lerp(0.02, 0.2, horizonGlow) + fireIntensity * 0.08;
    });
  });

  return (
    <group ref={groupRef} position={[0, 2.2, -16]}>
      <mesh scale={[24, 7, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#6e86a2" transparent opacity={0.08} depthWrite={false} />
      </mesh>
      <mesh position={[0, -1.2, 0.4]} scale={[16, 3.6, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#ee8a3d" transparent opacity={0.06} depthWrite={false} />
      </mesh>
    </group>
  );
};
