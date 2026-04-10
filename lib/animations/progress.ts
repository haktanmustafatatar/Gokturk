import { cinematicPhases } from "@/lib/animations/cinematicPhases";

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export const lerp = (start: number, end: number, alpha: number) =>
  start + (end - start) * alpha;

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

export const phaseFromProgress = (progress: number) => {
  const index = cinematicPhases.findIndex(
    (phase, phaseIndex) =>
      progress >= phase.range[0] &&
      (progress < phase.range[1] || phaseIndex === cinematicPhases.length - 1),
  );

  return index === -1 ? 0 : index;
};
