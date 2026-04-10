"use client";

import { useCinematicStore } from "@/store/useCinematicStore";

export const FallbackBackdrop = () => {
  const progress = useCinematicStore((state) => state.progress);
  const fire = useCinematicStore((state) => state.derived.fireIntensity);

  return (
    <div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(circle at 50% ${62 - progress * 18}%, rgba(224, 122, 51, ${0.08 + fire * 0.2}), transparent 18%),
          radial-gradient(circle at 50% 22%, rgba(129, 146, 166, ${0.16 - progress * 0.06}), transparent 40%),
          linear-gradient(180deg, rgba(8,9,11,1) 0%, rgba(6,7,9,1) 45%, rgba(11,12,14,1) 100%)
        `,
      }}
    />
  );
};
