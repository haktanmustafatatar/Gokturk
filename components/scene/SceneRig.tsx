"use client";

import { useMemo, useRef } from "react";
import { Group, MathUtils, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { rangeProgress } from "@/lib/animations/progress";
import { useCinematicStore } from "@/store/useCinematicStore";

export const SceneRig = () => {
  const groupRef = useRef<Group>(null);
  const { camera } = useThree();

  const target = useMemo(() => new Vector3(0, 1.6, 0), []);
  const cameraPosition = useMemo(() => new Vector3(0, 3, 14), []);

  useFrame((state, delta) => {
    const progress = useCinematicStore.getState().progress;
    const intro = rangeProgress(progress, 0, 0.2);
    const reveal = rangeProgress(progress, 0.2, 0.58);
    const climax = rangeProgress(progress, 0.58, 1);

    cameraPosition.set(
      MathUtils.lerp(0.2, -1.6, reveal) + Math.sin(state.clock.elapsedTime * 0.08) * 0.25,
      MathUtils.lerp(3.4, 2.1, reveal) + MathUtils.lerp(0.2, 1.35, climax),
      MathUtils.lerp(14.6, 7.4, reveal) - MathUtils.lerp(0, 1.2, climax),
    );

    target.set(
      MathUtils.lerp(0, 0.4, intro),
      MathUtils.lerp(1.1, 2.25, climax),
      MathUtils.lerp(0, -1.5, climax),
    );

    camera.position.lerp(cameraPosition, 1 - Math.exp(-delta * 1.75));
    camera.lookAt(target);

    if (groupRef.current) {
      groupRef.current.rotation.y = MathUtils.lerp(-0.12, 0.16, reveal) * 0.6;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.16) * 0.08;
    }
  });

  return <group ref={groupRef} />;
};
