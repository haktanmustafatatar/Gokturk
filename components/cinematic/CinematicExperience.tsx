"use client";

import { PerformanceController } from "@/components/cinematic/PerformanceController";
import { NarrativeOverlay } from "@/components/cinematic/NarrativeOverlay";
import { AmbientSoundscape } from "@/components/cinematic/AmbientSoundscape";
import { PreloadOverlay } from "@/components/cinematic/PreloadOverlay";
import { SceneLayer } from "@/components/cinematic/SceneLayer";
import { ScrollEngine } from "@/components/cinematic/ScrollEngine";

export const CinematicExperience = () => {
  return (
    <main className="relative min-h-[560vh] bg-background text-foreground">
      <PerformanceController />
      <AmbientSoundscape />
      <SceneLayer />
      <PreloadOverlay />
      <NarrativeOverlay />
      <ScrollEngine />
      <div id="enter-the-steppe" className="absolute bottom-0 h-px w-px opacity-0" />
    </main>
  );
};
