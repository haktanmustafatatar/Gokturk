"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AmbientLight,
  Color,
  DirectionalLight,
  Fog,
  PointLight,
} from "three";
import { getSkyColor, palette } from "@/lib/three/palette";
import { useCinematicStore } from "@/store/useCinematicStore";

const fogColor = new Color();

export const SceneLighting = () => {
  const ambientRef = useRef<AmbientLight>(null);
  const moonRef = useRef<DirectionalLight>(null);
  const fireLightRef = useRef<PointLight>(null);

  useFrame((state, delta) => {
    const { derived } = useCinematicStore.getState();
    const sky = getSkyColor(derived.skyReveal, derived.skyWarmth);
    const { scene } = state;

    scene.background = sky;

    if (scene.fog) {
      const fog = scene.fog as Fog;

      fogColor.copy(sky).lerp(palette.mist, 0.1);
      fog.color.lerp(fogColor, 1 - Math.exp(-delta * 2));
      fog.near = derived.fogNear;
      fog.far = derived.fogFar;
    }

    if (ambientRef.current) {
      ambientRef.current.intensity = derived.ambientIntensity;
    }

    if (moonRef.current) {
      moonRef.current.intensity = derived.moonIntensity;
      moonRef.current.position.x = derived.moonX;
    }

    if (fireLightRef.current) {
      fireLightRef.current.intensity = 0.1 + derived.fireIntensity * 4.2;
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.45} color="#b7c2d1" />
      <directionalLight
        ref={moonRef}
        position={[5, 10, 7]}
        intensity={0.7}
        color="#92a6bf"
        castShadow
      />
      <pointLight
        ref={fireLightRef}
        position={[0, 0.9, 0.75]}
        intensity={0.1}
        distance={10}
        decay={2}
        color="#ff933d"
      />
    </>
  );
};
