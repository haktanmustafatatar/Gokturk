"use client";

import { useRef } from "react";
import { narrativeBeats } from "@/data/narrative";
import { useLenisScroll } from "@/lib/animations/useLenisScroll";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useCinematicStore } from "@/store/useCinematicStore";

export const ScrollEngine = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const phase = useCinematicStore((state) => state.phase);
  useLenisScroll(trackRef);

  return (
    <div ref={trackRef} className="relative h-[560vh]">
      <div className="absolute inset-0">
        {narrativeBeats.map((beat) => (
          <div
            key={beat.id}
            className="absolute left-6 right-6 border-t border-white/6 md:left-10 md:right-10"
            style={{ top: `${beat.range[0] * 100}%` }}
          >
            <div className="mt-3 transition-opacity duration-700" style={{ opacity: phase === beat.phase ? 0.68 : 0.35 }}>
              <SectionLabel>{beat.label}</SectionLabel>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
