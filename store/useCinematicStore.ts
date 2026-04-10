import { create } from "zustand";
import {
  clamp01,
  phaseFromProgress,
  smoothstep,
} from "@/lib/animations/progress";
import type { PerformanceTier } from "@/lib/three/performance";

type CinematicDerived = {
  titleOpacity: number;
  fogIntensity: number;
  emberAmount: number;
  fireIntensity: number;
  ctaReveal: number;
  structureReveal: number;
  veilOpacity: number;
  horizonGlow: number;
};

type DeviceProfile = {
  performanceTier: PerformanceTier;
  reducedMotion: boolean;
  isMobile: boolean;
};

type CinematicState = DeviceProfile & {
  progress: number;
  phase: number;
  loaded: boolean;
  soundEnabled: boolean;
  soundReady: boolean;
  setLoaded: (loaded: boolean) => void;
  setProgress: (progress: number) => void;
  setDeviceProfile: (profile: Partial<DeviceProfile>) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setSoundReady: (ready: boolean) => void;
  derived: CinematicDerived;
};

const createDerived = (progress: number, tier: PerformanceTier): CinematicDerived => {
  const particleMultiplier = tier === "low" ? 0.45 : tier === "medium" ? 0.72 : 1;

  return {
    titleOpacity: 1 - smoothstep(0.12, 0.34, progress),
    fogIntensity: 1 - smoothstep(0.22, 0.9, progress) * 0.82,
    emberAmount: smoothstep(0.3, 0.68, progress) * particleMultiplier,
    fireIntensity: smoothstep(0.34, 0.82, progress),
    ctaReveal: smoothstep(0.78, 0.98, progress),
    structureReveal: smoothstep(0.28, 0.56, progress),
    veilOpacity: 1 - smoothstep(0.04, 0.24, progress),
    horizonGlow: smoothstep(0.24, 0.88, progress),
  };
};

export const useCinematicStore = create<CinematicState>((set, get) => ({
  progress: 0,
  phase: 0,
  loaded: false,
  soundEnabled: false,
  soundReady: false,
  performanceTier: "medium",
  reducedMotion: false,
  isMobile: false,
  derived: createDerived(0, "medium"),
  setLoaded: (loaded) => set({ loaded }),
  setProgress: (progress) => {
    const normalized = clamp01(progress);
    const tier = get().performanceTier;

    set({
      progress: normalized,
      phase: phaseFromProgress(normalized),
      derived: createDerived(normalized, tier),
    });
  },
  setDeviceProfile: (profile) => {
    const tier = profile.performanceTier ?? get().performanceTier;
    const progress = get().progress;

    set({
      ...profile,
      performanceTier: tier,
      derived: createDerived(progress, tier),
    });
  },
  setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
  setSoundReady: (soundReady) => set({ soundReady }),
}));
