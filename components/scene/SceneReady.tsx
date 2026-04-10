"use client";

import { useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { useCinematicStore } from "@/store/useCinematicStore";

export const SceneReady = () => {
  const { active, progress } = useProgress();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!active && progress >= 100) {
        useCinematicStore.getState().setLoaded(true);
      }
    }, 260);

    return () => window.clearTimeout(timer);
  }, [active, progress]);

  return null;
};
