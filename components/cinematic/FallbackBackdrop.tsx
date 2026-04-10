"use client";

import { useCinematicStore } from "@/store/useCinematicStore";

export const FallbackBackdrop = () => {
  const derived = useCinematicStore((state) => state.derived);
  const phase = useCinematicStore((state) => state.phase);

  const backgrounds = [
    `
      radial-gradient(circle at 50% 18%, rgba(129, 146, 166, 0.06), transparent 34%),
      linear-gradient(180deg, rgba(4,5,7,1) 0%, rgba(5,6,8,1) 68%, rgba(7,8,10,1) 100%)
    `,
    `
      radial-gradient(circle at 50% 26%, rgba(129, 146, 166, 0.12), transparent 40%),
      linear-gradient(180deg, rgba(7,8,10,1) 0%, rgba(6,7,9,1) 52%, rgba(9,10,12,1) 100%)
    `,
    `
      radial-gradient(circle at 50% 58%, rgba(224, 122, 51, 0.14), transparent 16%),
      radial-gradient(circle at 50% 22%, rgba(129, 146, 166, 0.14), transparent 36%),
      linear-gradient(180deg, rgba(8,9,11,1) 0%, rgba(7,8,10,1) 50%, rgba(10,11,13,1) 100%)
    `,
    `
      radial-gradient(circle at 50% 60%, rgba(224, 122, 51, 0.18), transparent 15%),
      radial-gradient(circle at 50% 24%, rgba(129, 146, 166, 0.1), transparent 34%),
      linear-gradient(180deg, rgba(7,8,10,1) 0%, rgba(6,7,9,1) 48%, rgba(9,10,12,1) 100%)
    `,
    `
      radial-gradient(circle at 50% 54%, rgba(224, 122, 51, ${0.14 + derived.fireIntensity * 0.12}), transparent 18%),
      radial-gradient(circle at 50% 18%, rgba(129, 146, 166, 0.16), transparent 44%),
      linear-gradient(180deg, rgba(9,10,12,1) 0%, rgba(7,8,10,1) 44%, rgba(11,12,14,1) 100%)
    `,
  ];

  return (
    <div
      className="absolute inset-0"
      style={{
        background: backgrounds[phase] ?? backgrounds[0],
      }}
    />
  );
};
