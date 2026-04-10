"use client";

import { useCinematicStore } from "@/store/useCinematicStore";

export const SoundToggle = () => {
  const enabled = useCinematicStore((state) => state.soundEnabled);
  const ready = useCinematicStore((state) => state.soundReady);

  return (
    <button
      type="button"
      onClick={() => useCinematicStore.getState().setSoundEnabled(!enabled)}
      className="pointer-events-auto inline-flex min-h-10 items-center rounded-full border border-white/10 bg-black/20 px-4 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-[#e5dcc7]/78 transition hover:border-[#dfa15c]/45 hover:bg-black/35 hover:text-white"
    >
      {enabled ? (ready ? "Sound On" : "Sound Loading") : "Enable Sound"}
    </button>
  );
};
