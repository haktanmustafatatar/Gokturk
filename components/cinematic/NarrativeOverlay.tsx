"use client";

import { clsx } from "clsx";
import { narrativeBeats } from "@/data/narrative";
import { rangeProgress, clamp01 } from "@/lib/animations/progress";
import { useCinematicStore } from "@/store/useCinematicStore";
import { CtaButton } from "@/components/ui/CtaButton";
import { ManifestoBlock } from "@/components/ui/ManifestoBlock";
import { SoundToggle } from "@/components/ui/SoundToggle";

export const NarrativeOverlay = () => {
  const progress = useCinematicStore((state) => state.progress);
  const phase = useCinematicStore((state) => state.phase);
  const derived = useCinematicStore((state) => state.derived);

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      <div className="absolute inset-0 flex flex-col justify-between px-5 py-6 sm:px-8 md:px-10 md:py-8">
        <div
          className="flex items-start justify-between text-[0.65rem] uppercase tracking-[0.38em] text-[#cfd8e6]/60 transition-opacity duration-700"
          style={{ opacity: clamp01(0.18 + derived.narrativeFocus * 0.22) }}
        >
          <div className="space-y-2">
            <span className="block">Göktürk</span>
          </div>
          <div className="space-y-2 text-right">
            <div className="flex justify-end pt-1">
              <SoundToggle />
            </div>
          </div>
        </div>

        <div
          className="mx-auto flex w-full max-w-7xl flex-1 items-center"
          style={{
            opacity: derived.titleOpacity * (phase === 1 ? 0.72 : 1),
            transform: derived.textMotionEnabled
              ? `scale(${derived.heroScale})`
              : "none",
          }}
        >
          <div
            className={clsx(
              "max-w-5xl space-y-4",
              phase === 3 && "max-w-4xl space-y-7",
            )}
          >
            <h1 className="font-display text-[20vw] leading-[0.78] tracking-[0.18em] text-[#f5efe0] sm:text-[8rem] md:text-[10rem] lg:text-[12rem]">
              GOKTURK
            </h1>
            <p
              className={clsx(
                "max-w-xl text-[0.7rem] uppercase tracking-[0.42em] text-[#d8d7d0]/40 md:text-[0.78rem]",
                phase === 3 && "max-w-lg text-[#e1ddd3]/56",
              )}
            >
              {derived.phaseIntent}
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl pb-18 md:pb-10">
          <div className={clsx("space-y-8", phase === 3 && "space-y-10")}>
            <div className="space-y-8">
              {narrativeBeats.map((beat) => {
                const local = rangeProgress(progress, beat.range[0], beat.range[1]);
                const isCurrent = phase === beat.phase;
                const active = isCurrent || local > 0.08;
                const prominence = isCurrent
                  ? clamp01(0.5 + derived.narrativeFocus * 0.5)
                  : beat.phase < phase
                    ? 0.14
                    : local * 0.42;

                return (
                  <div
                    key={beat.id}
                    className="transition-opacity duration-700"
                    style={{
                      opacity: active ? prominence : 0,
                      transform: "none",
                    }}
                  >
                    <ManifestoBlock
                      label={beat.label}
                      title={beat.title}
                      body={beat.body}
                      align={beat.align}
                      active={active}
                      emphasis={prominence}
                    />
                  </div>
                );
              })}
            </div>

            <div
              className="pointer-events-auto mt-12 space-y-5 px-1 pt-6 transition-opacity duration-700 sm:mt-16"
              style={{
                opacity: derived.ctaReveal,
                transform: "none",
              }}
            >
              <div className="space-y-4 text-center md:space-y-5">
                <p className="font-display text-4xl tracking-[0.12em] text-[#f5efe0] sm:text-5xl">
                  The fire goes on.
                </p>
                <div className="flex justify-center pt-2">
                  <CtaButton href="#enter-the-steppe">Enter</CtaButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
