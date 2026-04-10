export type Vec3Tuple = [number, number, number];

type PhaseCamera = {
  position: Vec3Tuple;
  target: Vec3Tuple;
};

type PhaseSignals = {
  titleOpacity: number;
  titleLift: number;
  heroScale: number;
  narrativeFocus: number;
  ctaReveal: number;
  structureReveal: number;
  veilOpacity: number;
  horizonGlow: number;
  emberAmount: number;
  fireIntensity: number;
  fogIntensity: number;
  mistOpacity: number;
  ambientIntensity: number;
  moonIntensity: number;
  moonX: number;
  fogNear: number;
  fogFar: number;
  skyReveal: number;
  skyWarmth: number;
  motionIntensity: number;
  stillness: number;
  cameraDriftEnabled: boolean;
  embersEnabled: boolean;
  sparklesEnabled: boolean;
  auraMotionEnabled: boolean;
  monolithMotionEnabled: boolean;
  mistDriftEnabled: boolean;
  textMotionEnabled: boolean;
};

export type CinematicPhase = {
  id: string;
  label: string;
  intent: string;
  range: [number, number];
  camera: PhaseCamera;
  signals: PhaseSignals;
};

export const cinematicPhases: CinematicPhase[] = [
  {
    id: "prologue",
    label: "Prologue",
    intent: "Absence, sacred silence, held breath.",
    range: [0, 0.16],
    camera: {
      position: [0.08, 3.8, 15.6],
      target: [0, 1.08, -0.2],
    },
    signals: {
      titleOpacity: 0.08,
      titleLift: 34,
      heroScale: 1.08,
      narrativeFocus: 0.08,
      ctaReveal: 0,
      structureReveal: 0.03,
      veilOpacity: 1,
      horizonGlow: 0.02,
      emberAmount: 0.015,
      fireIntensity: 0.03,
      fogIntensity: 1,
      mistOpacity: 0.22,
      ambientIntensity: 0.26,
      moonIntensity: 0.42,
      moonX: 5.8,
      fogNear: 7,
      fogFar: 22,
      skyReveal: 0.02,
      skyWarmth: 0,
      motionIntensity: 0.08,
      stillness: 0.96,
      cameraDriftEnabled: false,
      embersEnabled: false,
      sparklesEnabled: false,
      auraMotionEnabled: false,
      monolithMotionEnabled: false,
      mistDriftEnabled: false,
      textMotionEnabled: false,
    },
  },
  {
    id: "arrival",
    label: "Arrival",
    intent: "First contact with the world.",
    range: [0.16, 0.37],
    camera: {
      position: [0.1, 3.35, 13.6],
      target: [0.08, 1.22, -0.24],
    },
    signals: {
      titleOpacity: 0.96,
      titleLift: 12,
      heroScale: 1,
      narrativeFocus: 0.28,
      ctaReveal: 0,
      structureReveal: 0.18,
      veilOpacity: 0.28,
      horizonGlow: 0.16,
      emberAmount: 0.08,
      fireIntensity: 0.1,
      fogIntensity: 0.92,
      mistOpacity: 0.18,
      ambientIntensity: 0.42,
      moonIntensity: 0.62,
      moonX: 5,
      fogNear: 8.5,
      fogFar: 26,
      skyReveal: 0.28,
      skyWarmth: 0.04,
      motionIntensity: 0.22,
      stillness: 0.62,
      cameraDriftEnabled: false,
      embersEnabled: false,
      sparklesEnabled: false,
      auraMotionEnabled: false,
      monolithMotionEnabled: false,
      mistDriftEnabled: true,
      textMotionEnabled: false,
    },
  },
  {
    id: "revelation",
    label: "Revelation",
    intent: "Recognition and first warmth.",
    range: [0.37, 0.58],
    camera: {
      position: [-0.46, 2.7, 10.1],
      target: [0.12, 1.44, -0.48],
    },
    signals: {
      titleOpacity: 0.24,
      titleLift: -10,
      heroScale: 0.96,
      narrativeFocus: 0.54,
      ctaReveal: 0,
      structureReveal: 0.64,
      veilOpacity: 0.02,
      horizonGlow: 0.44,
      emberAmount: 0.38,
      fireIntensity: 0.52,
      fogIntensity: 0.7,
      mistOpacity: 0.14,
      ambientIntensity: 0.56,
      moonIntensity: 0.76,
      moonX: 4.1,
      fogNear: 10.8,
      fogFar: 30,
      skyReveal: 0.48,
      skyWarmth: 0.18,
      motionIntensity: 0.44,
      stillness: 0.34,
      cameraDriftEnabled: true,
      embersEnabled: true,
      sparklesEnabled: false,
      auraMotionEnabled: true,
      monolithMotionEnabled: false,
      mistDriftEnabled: true,
      textMotionEnabled: true,
    },
  },
  {
    id: "presence",
    label: "Presence",
    intent: "Human memory and ritual gravity.",
    range: [0.58, 0.8],
    camera: {
      position: [-1.14, 2.36, 8.22],
      target: [0, 1.72, -0.82],
    },
    signals: {
      titleOpacity: 0.04,
      titleLift: -20,
      heroScale: 0.94,
      narrativeFocus: 0.9,
      ctaReveal: 0.14,
      structureReveal: 0.84,
      veilOpacity: 0,
      horizonGlow: 0.56,
      emberAmount: 0.3,
      fireIntensity: 0.66,
      fogIntensity: 0.42,
      mistOpacity: 0.1,
      ambientIntensity: 0.72,
      moonIntensity: 0.86,
      moonX: 3.15,
      fogNear: 12.2,
      fogFar: 36,
      skyReveal: 0.56,
      skyWarmth: 0.24,
      motionIntensity: 0.18,
      stillness: 0.84,
      cameraDriftEnabled: false,
      embersEnabled: false,
      sparklesEnabled: false,
      auraMotionEnabled: false,
      monolithMotionEnabled: false,
      mistDriftEnabled: false,
      textMotionEnabled: false,
    },
  },
  {
    id: "ascension",
    label: "Ascension",
    intent: "Inevitability, clarity, invitation.",
    range: [0.8, 1],
    camera: {
      position: [-1.74, 3.2, 6.3],
      target: [0, 2.18, -1.48],
    },
    signals: {
      titleOpacity: 0,
      titleLift: -30,
      heroScale: 0.92,
      narrativeFocus: 0.62,
      ctaReveal: 1,
      structureReveal: 1,
      veilOpacity: 0,
      horizonGlow: 0.92,
      emberAmount: 0.48,
      fireIntensity: 0.9,
      fogIntensity: 0.18,
      mistOpacity: 0.06,
      ambientIntensity: 0.94,
      moonIntensity: 1.06,
      moonX: 2.1,
      fogNear: 14,
      fogFar: 44,
      skyReveal: 0.72,
      skyWarmth: 0.34,
      motionIntensity: 0.32,
      stillness: 0.42,
      cameraDriftEnabled: true,
      embersEnabled: true,
      sparklesEnabled: false,
      auraMotionEnabled: true,
      monolithMotionEnabled: true,
      mistDriftEnabled: false,
      textMotionEnabled: false,
    },
  },
];

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export const rangeProgress = (
  progress: number,
  start: number,
  end: number,
) => {
  if (end <= start) {
    return progress >= end ? 1 : 0;
  }

  return clamp01((progress - start) / (end - start));
};

export const smoothstep = (edge0: number, edge1: number, value: number) => {
  const t = rangeProgress(value, edge0, edge1);
  return t * t * (3 - 2 * t);
};

export const lerp = (start: number, end: number, alpha: number) =>
  start + (end - start) * alpha;

const lerpTuple = (from: Vec3Tuple, to: Vec3Tuple, alpha: number): Vec3Tuple => [
  lerp(from[0], to[0], alpha),
  lerp(from[1], to[1], alpha),
  lerp(from[2], to[2], alpha),
];

export const getPhaseIndex = (progress: number) =>
  cinematicPhases.findIndex(
    (phase, index) =>
      progress >= phase.range[0] &&
      (progress < phase.range[1] || index === cinematicPhases.length - 1),
  );

export const getActivePhase = (progress: number) =>
  cinematicPhases[Math.max(0, getPhaseIndex(progress))] ?? cinematicPhases[0];

export const getPhaseProgress = (progress: number) => {
  const phase = getActivePhase(progress);
  return rangeProgress(progress, phase.range[0], phase.range[1]);
};

export const getPhaseBlend = (progress: number) => {
  const local = getPhaseProgress(progress);
  return smoothstep(0.58, 1, local);
};

export const sampleSignal = (
  progress: number,
  selector: (phase: CinematicPhase) => number,
) => {
  const index = Math.max(0, getPhaseIndex(progress));
  const current = cinematicPhases[index] ?? cinematicPhases[0];
  const next = cinematicPhases[Math.min(index + 1, cinematicPhases.length - 1)];
  const blend = getPhaseBlend(progress);

  return lerp(selector(current), selector(next), blend);
};

export const sampleBooleanSignal = (
  progress: number,
  selector: (phase: CinematicPhase) => boolean,
) => {
  const phase = getActivePhase(progress);
  return selector(phase);
};

export const sampleTupleSignal = (
  progress: number,
  selector: (phase: CinematicPhase) => Vec3Tuple,
) => {
  const index = Math.max(0, getPhaseIndex(progress));
  const current = cinematicPhases[index] ?? cinematicPhases[0];
  const next = cinematicPhases[Math.min(index + 1, cinematicPhases.length - 1)];
  const blend = getPhaseBlend(progress);

  return lerpTuple(selector(current), selector(next), blend);
};
