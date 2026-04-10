"use client";

import { useMemo, useRef } from "react";
import { BufferAttribute, MathUtils, Points, PointsMaterial } from "three";
import { useFrame } from "@react-three/fiber";
import { useCinematicStore } from "@/store/useCinematicStore";

const createEmberPositions = (count: number) => {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const stride = i * 3;
    positions[stride] = (Math.random() - 0.5) * 1.2;
    positions[stride + 1] = Math.random() * 2.4;
    positions[stride + 2] = (Math.random() - 0.5) * 1.2 + 0.35;
  }

  return positions;
};

export const Embers = () => {
  const pointsRef = useRef<Points>(null);
  const tier = useCinematicStore((state) => state.performanceTier);
  const count = tier === "high" ? 180 : tier === "medium" ? 110 : 54;

  const positions = useMemo(() => createEmberPositions(count), [count]);

  useFrame((state) => {
    const embers = useCinematicStore.getState().derived.emberAmount;
    const geometry = pointsRef.current?.geometry;
    const attribute = geometry?.getAttribute("position") as BufferAttribute | undefined;

    if (!attribute) {
      return;
    }

    for (let i = 0; i < attribute.count; i += 1) {
      const y = attribute.getY(i) + 0.009 + embers * 0.024;
      attribute.setY(i, y > 2.8 ? Math.random() * 0.4 : y);
      attribute.setX(
        i,
        attribute.getX(i) + Math.sin(state.clock.elapsedTime * 0.4 + i) * 0.0008,
      );
    }

    attribute.needsUpdate = true;

    if (pointsRef.current) {
      (pointsRef.current.material as PointsMaterial).opacity = MathUtils.lerp(
        0.02,
        0.95,
        embers,
      );
    }
  });

  return (
    <points ref={pointsRef} position={[0, 0.16, 0.3]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ff9f4c"
        size={tier === "low" ? 0.045 : 0.06}
        transparent
        opacity={0.12}
        depthWrite={false}
      />
    </points>
  );
};
