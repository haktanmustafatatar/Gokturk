import { create } from "zustand";
import {
  clamp01,
  phaseFromProgress,
} from "@/lib/animations/progress";
import {
  getActivePhase,
  sampleBooleanSignal,
  getPhaseBlend,
  getPhaseProgress,
  sampleSignal,
  sampleTupleSignal,
} from "@/lib/animations/cinematicPhases";
import type { PerformanceTier } from "@/lib/three/performance";
import type { Vec3Tuple } from "@/lib/animations/cinematicPhases";

type CinematicDerived = {
  phaseLabel: string;
  phaseIntent: string;
  phaseProgress: number;
  phaseBlend: number;
  titleOpacity: number;
  titleLift: number;
  heroScale: number;
  narrativeFocus: number;
  fogIntensity: number;
  fogNear: number;
  fogFar: number;
  emberAmount: number;
  fireIntensity: number;
  ctaReveal: number;
  structureReveal: number;
  veilOpacity: number;
  horizonGlow: number;
  ambientIntensity: number;
  moonIntensity: number;
  moonX: number;
  skyReveal: number;
  skyWarmth: number;
  mistOpacity: number;
  motionIntensity: number;
  stillness: number;
  cameraDriftEnabled: boolean;
  embersEnabled: boolean;
  sparklesEnabled: boolean;
  auraMotionEnabled: boolean;
  monolithMotionEnabled: boolean;
  mistDriftEnabled: boolean;
  textMotionEnabled: boolean;
  cameraPosition: Vec3Tuple;
  cameraTarget: Vec3Tuple;
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
  const phase = getActivePhase(progress);
  const particleMultiplier = tier === "low" ? 0.38 : tier === "medium" ? 0.7 : 1;
  const motionMultiplier = tier === "low" ? 0.78 : tier === "medium" ? 0.9 : 1;

  return {
    phaseLabel: phase.label,
    phaseIntent: phase.intent,
    phaseProgress: getPhaseProgress(progress),
    phaseBlend: getPhaseBlend(progress),
    titleOpacity: sampleSignal(progress, (entry) => entry.signals.titleOpacity),
    titleLift: sampleSignal(progress, (entry) => entry.signals.titleLift),
    heroScale: sampleSignal(progress, (entry) => entry.signals.heroScale),
    narrativeFocus: sampleSignal(progress, (entry) => entry.signals.narrativeFocus),
    fogIntensity: sampleSignal(progress, (entry) => entry.signals.fogIntensity),
    fogNear: sampleSignal(progress, (entry) => entry.signals.fogNear),
    fogFar: sampleSignal(progress, (entry) => entry.signals.fogFar),
    emberAmount:
      sampleSignal(progress, (entry) => entry.signals.emberAmount) * particleMultiplier,
    fireIntensity: sampleSignal(progress, (entry) => entry.signals.fireIntensity),
    ctaReveal: sampleSignal(progress, (entry) => entry.signals.ctaReveal),
    structureReveal: sampleSignal(progress, (entry) => entry.signals.structureReveal),
    veilOpacity: sampleSignal(progress, (entry) => entry.signals.veilOpacity),
    horizonGlow: sampleSignal(progress, (entry) => entry.signals.horizonGlow),
    ambientIntensity: sampleSignal(progress, (entry) => entry.signals.ambientIntensity),
    moonIntensity: sampleSignal(progress, (entry) => entry.signals.moonIntensity),
    moonX: sampleSignal(progress, (entry) => entry.signals.moonX),
    skyReveal: sampleSignal(progress, (entry) => entry.signals.skyReveal),
    skyWarmth: sampleSignal(progress, (entry) => entry.signals.skyWarmth),
    mistOpacity: sampleSignal(progress, (entry) => entry.signals.mistOpacity),
    motionIntensity:
      sampleSignal(progress, (entry) => entry.signals.motionIntensity) * motionMultiplier,
    stillness: sampleSignal(progress, (entry) => entry.signals.stillness),
    cameraDriftEnabled: sampleBooleanSignal(
      progress,
      (entry) => entry.signals.cameraDriftEnabled,
    ),
    embersEnabled: sampleBooleanSignal(progress, (entry) => entry.signals.embersEnabled),
    sparklesEnabled: sampleBooleanSignal(progress, (entry) => entry.signals.sparklesEnabled),
    auraMotionEnabled: sampleBooleanSignal(
      progress,
      (entry) => entry.signals.auraMotionEnabled,
    ),
    monolithMotionEnabled: sampleBooleanSignal(
      progress,
      (entry) => entry.signals.monolithMotionEnabled,
    ),
    mistDriftEnabled: sampleBooleanSignal(progress, (entry) => entry.signals.mistDriftEnabled),
    textMotionEnabled: sampleBooleanSignal(progress, (entry) => entry.signals.textMotionEnabled),
    cameraPosition: sampleTupleSignal(progress, (entry) => entry.camera.position),
    cameraTarget: sampleTupleSignal(progress, (entry) => entry.camera.target),
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
