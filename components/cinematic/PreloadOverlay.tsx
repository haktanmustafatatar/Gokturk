"use client";

import { useCinematicStore } from "@/store/useCinematicStore";

export const PreloadOverlay = () => {
  const loaded = useCinematicStore((state) => state.loaded);
  const progress = useCinematicStore((state) => state.progress);
  const veilOpacity = useCinematicStore((state) => state.derived.veilOpacity);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 transition-opacity duration-1000"
      style={{ opacity: loaded ? veilOpacity : 1 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(184,154,97,0.08),transparent_14%),linear-gradient(180deg,#020304_0%,#040507_68%,#080a0d_100%)]" />
      <div className="absolute inset-x-0 top-[44%] mx-auto flex max-w-3xl -translate-y-1/2 flex-col items-center px-6 text-center">
        <p className="mb-4 text-[0.66rem] font-semibold uppercase tracking-[0.54em] text-[#cdb28a]/72">
          Göktürk
        </p>
        <h2 className="font-display text-5xl tracking-[0.22em] text-[#f5efe0] sm:text-7xl">
          PROLOGUE
        </h2>
        <p className="mt-5 max-w-md text-xs uppercase tracking-[0.34em] text-[#d7d8d1]/48 sm:text-sm">
          Black horizon. Cold ash. The monument waits for fire.
        </p>
      </div>
      <div className="absolute inset-x-6 bottom-8 mx-auto max-w-xl sm:bottom-10">
        <div className="h-px w-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-[#6a5531] via-[#dfa15c] to-[#f0d7ad] transition-[width] duration-500"
            style={{ width: `${Math.max(progress * 100, loaded ? 100 : 12)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
