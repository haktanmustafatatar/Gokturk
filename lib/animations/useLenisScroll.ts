"use client";

import { useEffect } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCinematicStore } from "@/store/useCinematicStore";
import { clamp01 } from "@/lib/animations/progress";

gsap.registerPlugin(ScrollTrigger);

export const useLenisScroll = (trackRef: React.RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      syncTouch: true,
      touchMultiplier: 1.1,
      wheelMultiplier: 0.92,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: ({ progress }) => {
        useCinematicStore.getState().setProgress(clamp01(progress));
      },
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      trigger.kill();
      lenis.destroy();
    };
  }, [trackRef]);
};
