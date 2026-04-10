import * as THREE from "three";
import { lerp } from "@/lib/animations/progress";

export const palette = {
  charcoal: new THREE.Color("#050608"),
  horizon: new THREE.Color("#161d25"),
  mist: new THREE.Color("#8192a6"),
  ember: new THREE.Color("#e07a33"),
  gold: new THREE.Color("#b89a61"),
  ash: new THREE.Color("#d8ddd7"),
};

export const getSkyColor = (reveal: number, warmth: number) => {
  const color = palette.charcoal.clone();

  color.lerp(palette.horizon, reveal * 0.86);
  color.lerp(palette.mist, reveal * 0.14);
  color.lerp(palette.gold, warmth * 0.07);
  color.lerp(palette.ember, warmth * 0.04);

  return color;
};

export const getFogDensity = (fogFar: number) => lerp(0.065, 0.012, (fogFar - 22) / 22);
