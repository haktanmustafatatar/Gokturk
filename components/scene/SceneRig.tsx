"use client";

import { useMemo, useRef } from "react";
import { Group, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useCinematicStore } from "@/store/useCinematicStore";

export const SceneRig = () => {
  const groupRef = useRef<Group>(null);
  const { camera } = useThree();

  const target = useMemo(() => new Vector3(0, 1.6, 0), []);
  const cameraPosition = useMemo(() => new Vector3(0, 3, 14), []);

  useFrame((state, delta) => {
    const {
      cameraPosition: nextCamera,
      cameraTarget: nextTarget,
      motionIntensity,
      stillness,
      phaseBlend,
      cameraDriftEnabled,
    } = useCinematicStore.getState().derived;
    const drift = cameraDriftEnabled ? motionIntensity * (1 - stillness * 0.6) : 0;
    const holdStrength = 1 - phaseBlend * 0.34;

    cameraPosition.set(
      nextCamera[0] + Math.sin(state.clock.elapsedTime * 0.08) * 0.2 * drift,
      nextCamera[1] + Math.sin(state.clock.elapsedTime * 0.12) * 0.08 * drift,
      nextCamera[2] + Math.cos(state.clock.elapsedTime * 0.09) * 0.12 * drift,
    );

    target.set(
      nextTarget[0],
      nextTarget[1] + Math.sin(state.clock.elapsedTime * 0.06) * 0.03 * drift,
      nextTarget[2],
    );

    camera.position.lerp(cameraPosition, 1 - Math.exp(-delta * (1.65 + holdStrength)));
    camera.lookAt(target);

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.035 * drift;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.14) * 0.04 * drift;
    }
  });

  return <group ref={groupRef} />;
};
