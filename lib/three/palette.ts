import * as THREE from "three";
import { lerp, smoothstep } from "@/lib/animations/progress";

export const palette = {
  charcoal: new THREE.Color("#050608"),
  horizon: new THREE.Color("#161d25"),
  mist: new THREE.Color("#8192a6"),
  ember: new THREE.Color("#e07a33"),
  gold: new THREE.Color("#b89a61"),
  ash: new THREE.Color("#d8ddd7"),
};

export const getSkyColor = (progress: number) => {
  const color = palette.charcoal.clone();
  const arrival = smoothstep(0.08, 0.34, progress);
  const climax = smoothstep(0.75, 1, progress);

  color.lerp(palette.horizon, arrival * 0.8);
  color.lerp(palette.mist, climax * 0.12);

  return color;
};

export const getFogDensity = (progress: number) =>
  lerp(0.065, 0.014, smoothstep(0.08, 0.82, progress));

export const getFireStrength = (progress: number) =>
  smoothstep(0.34, 0.74, progress);
