"use client";

import { useEffect } from "react";
import { estimatePerformanceProfile } from "@/lib/three/performance";
import { useCinematicStore } from "@/store/useCinematicStore";

export const PerformanceController = () => {
  useEffect(() => {
    let mounted = true;

    estimatePerformanceProfile().then((profile) => {
      if (!mounted) {
        return;
      }

      useCinematicStore.getState().setDeviceProfile({
        performanceTier: profile.tier,
        isMobile: profile.isMobile,
        reducedMotion: profile.reducedMotion,
      });
    });

    return () => {
      mounted = false;
    };
  }, []);

  return null;
};
