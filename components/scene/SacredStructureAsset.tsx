"use client";

import { useEffect, useMemo, useState } from "react";
import { Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { SACRED_STRUCTURE_MODEL_PATH } from "@/lib/three/assetPaths";

type SacredStructureAssetProps = {
  reveal: number;
};

export const SacredStructureAsset = ({ reveal }: SacredStructureAssetProps) => {
  const [asset, setAsset] = useState<Object3D | null>(null);

  useEffect(() => {
    let mounted = true;
    const loader = new GLTFLoader();

    loader.load(
      SACRED_STRUCTURE_MODEL_PATH,
      (gltf) => {
        if (!mounted) {
          return;
        }

        setAsset(gltf.scene);
      },
      undefined,
      () => {
        if (mounted) {
          setAsset(null);
        }
      },
    );

    return () => {
      mounted = false;
    };
  }, []);

  const clonedAsset = useMemo(() => asset?.clone(true) ?? null, [asset]);

  if (!clonedAsset) {
    return null;
  }

  return (
    <primitive
      object={clonedAsset}
      position={[0, -0.34 + reveal * 0.22, -0.38]}
      scale={0.82 + reveal * 0.24}
      rotation={[0, reveal * 0.12, 0]}
    />
  );
};
