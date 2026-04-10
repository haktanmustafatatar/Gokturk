"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AmbientLight,
  Color,
  DirectionalLight,
  Fog,
  MathUtils,
  PointLight,
} from "three";
import {
  getFireStrength,
  getFogDensity,
  getSkyColor,
  palette,
} from "@/lib/three/palette";
import { useCinematicStore } from "@/store/useCinematicStore";

const fogColor = new Color();

export const SceneLighting = () => {
  const ambientRef = useRef<AmbientLight>(null);
  const moonRef = useRef<DirectionalLight>(null);
  const fireLightRef = useRef<PointLight>(null);

  useFrame((state, delta) => {
    const progress = useCinematicStore.getState().progress;
    const sky = getSkyColor(progress);
    const density = getFogDensity(progress);
    const fire = getFireStrength(progress);
    const { scene } = state;

    scene.background = sky;

    if (scene.fog) {
      const fog = scene.fog as Fog;

      fogColor.copy(sky).lerp(palette.mist, 0.1);
      fog.color.lerp(fogColor, 1 - Math.exp(-delta * 2));
      fog.near = MathUtils.lerp(8, 14, progress);
      fog.far = MathUtils.lerp(28, 46, 1 - density);
    }

    if (ambientRef.current) {
      ambientRef.current.intensity = MathUtils.lerp(0.4, 0.95, progress);
    }

    if (moonRef.current) {
      moonRef.current.intensity = MathUtils.lerp(0.6, 1.1, progress);
      moonRef.current.position.x = MathUtils.lerp(5, 2, progress);
    }

    if (fireLightRef.current) {
      fireLightRef.current.intensity = MathUtils.lerp(0.1, 4.2, fire);
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
