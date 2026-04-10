"use client";

export type PerformanceTier = "low" | "medium" | "high";

export type PerformanceProfile = {
  tier: PerformanceTier;
  isMobile: boolean;
  reducedMotion: boolean;
};

export const estimatePerformanceProfile = async (): Promise<PerformanceProfile> => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  let tier: PerformanceTier = isMobile ? "medium" : "high";

  try {
    const { getGPUTier } = await import("detect-gpu");
    const result = await getGPUTier();

    if (result.tier <= 1 || result.isMobile) {
      tier = "low";
    } else if (result.tier === 2) {
      tier = "medium";
    }
  } catch {
    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;

    if (cores <= 4 || memory <= 4 || isMobile) {
      tier = "low";
    } else if (cores <= 8 || memory <= 8) {
      tier = "medium";
    }
  }

  if (reducedMotion && tier === "high") {
    tier = "medium";
  }

  return {
    tier,
    isMobile,
    reducedMotion,
  };
};
