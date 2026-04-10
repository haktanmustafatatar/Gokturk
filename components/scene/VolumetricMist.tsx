"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, ShaderMaterial } from "three";
import { useCinematicStore } from "@/store/useCinematicStore";

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uProgress;
  uniform float uFogIntensity;
  uniform float uFire;
  varying vec2 vUv;
  varying vec3 vWorldPosition;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec2 flow = vUv * vec2(5.0, 2.6);
    float n1 = noise(flow + vec2(uTime * 0.018, -uTime * 0.01));
    float n2 = noise(flow * 1.7 - vec2(uTime * 0.014, uTime * 0.008));
    float n3 = noise(flow * 3.2 + vec2(0.0, uTime * 0.006));
    float fog = (n1 * 0.55 + n2 * 0.3 + n3 * 0.15);
    float verticalFade = smoothstep(0.0, 0.38, vUv.y) * (1.0 - smoothstep(0.62, 1.0, vUv.y));
    float horizonFade = smoothstep(0.0, 0.55, 1.0 - abs(vUv.x - 0.5) * 1.7);
    float reveal = mix(0.95, 0.42, uProgress);
    float density = fog * verticalFade * horizonFade * uFogIntensity * reveal;

    vec3 cold = vec3(0.44, 0.52, 0.63);
    vec3 warm = vec3(0.94, 0.55, 0.27);
    vec3 color = mix(cold, warm, uFire * 0.45);

    gl_FragColor = vec4(color, density * 0.26);
  }
`;

export const VolumetricMist = () => {
  const materialRef = useRef<ShaderMaterial>(null);
  const tier = useCinematicStore((state) => state.performanceTier);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uFogIntensity: { value: 1 },
      uFire: { value: 0 },
    }),
    [],
  );

  useFrame((state) => {
    if (!materialRef.current) {
      return;
    }

    const { progress, derived } = useCinematicStore.getState();

    if (derived.mistDriftEnabled) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }

    materialRef.current.uniforms.uProgress.value = progress;
    materialRef.current.uniforms.uFogIntensity.value = MathUtils.lerp(
      0.45,
      1.1,
      derived.fogIntensity,
    );
    materialRef.current.uniforms.uFire.value = derived.fireIntensity;
  });

  if (tier === "low") {
    return null;
  }

  return (
    <group>
      <mesh position={[0, 2.8, -9]} scale={[34, 12, 1]}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, 1.4, -4.5]} scale={[26, 7, 1]}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
