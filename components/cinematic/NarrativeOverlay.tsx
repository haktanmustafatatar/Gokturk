"use client";

import { clsx } from "clsx";
import { narrativeBeats } from "@/data/narrative";
import { rangeProgress } from "@/lib/animations/progress";
import { useCinematicStore } from "@/store/useCinematicStore";
import { CtaButton } from "@/components/ui/CtaButton";
import { ManifestoBlock } from "@/components/ui/ManifestoBlock";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SoundToggle } from "@/components/ui/SoundToggle";

export const NarrativeOverlay = () => {
  const progress = useCinematicStore((state) => state.progress);
  const phase = useCinematicStore((state) => state.phase);
  const loaded = useCinematicStore((state) => state.loaded);
  const ctaReveal = useCinematicStore((state) => state.derived.ctaReveal);
  const titleOpacity = useCinematicStore((state) => state.derived.titleOpacity);
  const horizonGlow = useCinematicStore((state) => state.derived.horizonGlow);

  const phaseTitle = narrativeBeats.find((beat) => beat.phase === phase)?.label ?? "Arrival";

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      <div className="absolute inset-0 flex flex-col justify-between px-5 py-6 sm:px-8 md:px-10 md:py-8">
        <div className="flex items-start justify-between text-[0.65rem] uppercase tracking-[0.38em] text-[#cfd8e6]/60">
          <div className="space-y-2">
            <span className="block">Göktürk</span>
            <span className="block text-[#c49d63]/72">{loaded ? "Sequence Online" : "Invoking Scene"}</span>
          </div>
          <div className="space-y-2 text-right">
            <span className="block">Myth-Tech Sequence</span>
            <span className="block text-[#d7d8d1]/45">Phase {String(phase + 1).padStart(2, "0")} / {phaseTitle}</span>
            <div className="flex justify-end pt-1">
              <SoundToggle />
            </div>
          </div>
        </div>

        <div
          className="mx-auto flex w-full max-w-7xl flex-1 items-center"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${progress * -36}px)`,
          }}
        >
          <div className="max-w-5xl space-y-6">
            <SectionLabel>Phase 01 / Arrival</SectionLabel>
            <h1 className="font-display text-[20vw] leading-[0.78] tracking-[0.18em] text-[#f5efe0] sm:text-[8rem] md:text-[10rem] lg:text-[12rem]">
              GOKTURK
            </h1>
            <p className="max-w-xl text-sm uppercase tracking-[0.36em] text-[#d8d7d0]/52 md:text-base">
              Ancient steppe. Sacred structure. Fire, wind, restraint.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="h-px w-24 bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[#7a6440] to-[#e18b45]"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <span className="text-[0.62rem] uppercase tracking-[0.36em] text-[#cfd8e6]/42">
                scroll to invoke
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 pb-18 md:grid-cols-12 md:pb-10">
          <div className="hidden md:col-span-2 md:flex md:items-end">
            <div className="space-y-5 text-[0.65rem] uppercase tracking-[0.34em] text-[#cfd8e6]/42">
              <p>Scroll</p>
              <p>{Math.round(progress * 100).toString().padStart(2, "0")}</p>
              <div className="space-y-3">
                {narrativeBeats.map((beat) => (
                  <div key={beat.id} className="flex items-center gap-3">
                    <span
                      className={clsx(
                        "block h-px transition-all duration-500",
                        phase === beat.phase ? "w-10 bg-[#dfa15c]" : "w-4 bg-white/12",
                      )}
                    />
                    <span className={phase === beat.phase ? "text-[#f5efe0]/72" : ""}>
                      {beat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-10">
            <div className="space-y-8">
              {narrativeBeats.map((beat) => {
                const local = rangeProgress(progress, beat.range[0], beat.range[1]);
                const active = phase === beat.phase || local > 0.12;

                return (
                  <div
                    key={beat.id}
                    className={clsx(
                      "transition-all duration-700",
                      active ? "opacity-100" : "opacity-0",
                    )}
                    style={{
                      transform: `translateY(${(1 - local) * 28}px)`,
                    }}
                  >
                    <ManifestoBlock
                      label={beat.label}
                      title={beat.title}
                      body={beat.body}
                      align={beat.align}
                      active={active}
                    />
                  </div>
                );
              })}
            </div>

            <div
              className="pointer-events-auto mt-12 space-y-6 border border-white/10 bg-[linear-gradient(180deg,rgba(9,11,13,0.82),rgba(9,11,13,0.55))] px-6 py-8 shadow-[0_0_80px_rgba(0,0,0,0.24)] backdrop-blur-[2px] transition-all duration-700 sm:mt-16 sm:px-8"
              style={{
                opacity: ctaReveal,
                transform: `translateY(${(1 - ctaReveal) * 40}px)`,
              }}
            >
              <SectionLabel>Ascension</SectionLabel>
              <div className="grid gap-8 md:grid-cols-[1.5fr_0.9fr] md:items-end">
                <div className="space-y-4">
                  <h2 className="font-display text-4xl tracking-[0.08em] text-[#f5efe0] sm:text-5xl">
                    Build the myth before the final artifacts arrive.
                  </h2>
                  <p className="max-w-xl text-sm leading-7 tracking-[0.08em] text-[#d7d8d1]/72 sm:text-base">
                    The foundation is procedural by design: atmosphere, pacing,
                    firelight, and narrative are already wired for future GLB
                    assets, textures, and deeper worldbuilding.
                  </p>
                </div>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-[0.66rem] uppercase tracking-[0.34em] text-[#d7d8d1]/46">
                    <div>
                      <p className="mb-2 text-[#c49d63]/82">State</p>
                      <p>Procedural World</p>
                    </div>
                    <div>
                      <p className="mb-2 text-[#c49d63]/82">Intensity</p>
                      <p>{Math.round(horizonGlow * 100)}%</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <CtaButton href="#enter-the-steppe">Enter The Steppe</CtaButton>
                    <span className="text-[0.66rem] uppercase tracking-[0.34em] text-[#d7d8d1]/42">
                      Prepared for GLB, texture and score layers
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
