"use client";

import { useEffect } from "react";
import { useCinematicStore } from "@/store/useCinematicStore";
import { CinematicCanvas } from "@/components/scene/CinematicCanvas";
import { FallbackBackdrop } from "@/components/cinematic/FallbackBackdrop";

export const SceneLayer = () => {
  const tier = useCinematicStore((state) => state.performanceTier);
  const isMobile = useCinematicStore((state) => state.isMobile);
  const reducedMotion = useCinematicStore((state) => state.reducedMotion);
  const glow = useCinematicStore((state) => state.derived.horizonGlow);

  const useFallback = reducedMotion || (isMobile && tier === "low");

  useEffect(() => {
    if (!useFallback) {
      return;
    }

    const timer = window.setTimeout(() => {
      useCinematicStore.getState().setLoaded(true);
    }, 220);

    return () => window.clearTimeout(timer);
  }, [useFallback]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {useFallback ? <FallbackBackdrop /> : <CinematicCanvas />}
      <div className="grain-overlay absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at top, rgba(255,255,255,0.05), transparent 26%), linear-gradient(180deg, rgba(3,4,6,0.1), rgba(3,4,6,0.55) 72%, rgba(3,4,6,0.82)), radial-gradient(circle at 50% 68%, rgba(224,122,51, ${0.03 + glow * 0.12}), transparent 22%)`,
        }}
      />
    </div>
  );
};
