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
  if (progress < 0.16) return 0;
  if (progress < 0.38) return 1;
  if (progress < 0.58) return 2;
  if (progress < 0.8) return 3;
  return 4;
};
