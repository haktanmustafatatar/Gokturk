"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Preload } from "@react-three/drei";
import { useCinematicStore } from "@/store/useCinematicStore";
import { Atmosphere } from "@/components/scene/Atmosphere";
import { Embers } from "@/components/scene/Embers";
import { HorizonAura } from "@/components/scene/HorizonAura";
import { MonolithField } from "@/components/scene/MonolithField";
import { SceneReady } from "@/components/scene/SceneReady";
import { SacredStructure } from "@/components/scene/SacredStructure";
import { SceneLighting } from "@/components/scene/SceneLighting";
import { SceneRig } from "@/components/scene/SceneRig";
import { VolumetricMist } from "@/components/scene/VolumetricMist";

export const CinematicCanvas = () => {
  const tier = useCinematicStore((state) => state.performanceTier);

  return (
    <Canvas
      dpr={tier === "high" ? [1, 1.75] : [1, 1.3]}
      camera={{ position: [0, 3, 14], fov: 36, near: 0.1, far: 120 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="h-full w-full"
    >
      <color attach="background" args={["#050608"]} />
      <fog attach="fog" args={["#050608", 10, 36]} />
      <Suspense fallback={null}>
        <SceneReady />
        <SceneRig />
        <SceneLighting />
        <Environment preset="night" />
        <Atmosphere />
        <VolumetricMist />
        <HorizonAura />
        <MonolithField />
        <SacredStructure />
        <Embers />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};
