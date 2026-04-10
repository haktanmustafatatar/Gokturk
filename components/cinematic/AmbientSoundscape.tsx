"use client";

import { useEffect, useRef } from "react";
import { useCinematicStore } from "@/store/useCinematicStore";

type AudioNodes = {
  context: AudioContext;
  master: GainNode;
  drone: OscillatorNode;
  droneGain: GainNode;
  shimmer: OscillatorNode;
  shimmerGain: GainNode;
  fireFilter: BiquadFilterNode;
  fireGain: GainNode;
  fireSource: AudioBufferSourceNode;
  lfo: OscillatorNode;
  lfoGain: GainNode;
};

const createNoiseBuffer = (context: AudioContext) => {
  const buffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
  const channel = buffer.getChannelData(0);

  for (let i = 0; i < channel.length; i += 1) {
    channel[i] = (Math.random() * 2 - 1) * 0.4;
  }

  return buffer;
};

const buildNodes = (context: AudioContext): AudioNodes => {
  const master = context.createGain();
  master.gain.value = 0.0001;
  master.connect(context.destination);

  const drone = context.createOscillator();
  drone.type = "triangle";
  drone.frequency.value = 55;
  const droneGain = context.createGain();
  droneGain.gain.value = 0.0001;
  drone.connect(droneGain).connect(master);

  const shimmer = context.createOscillator();
  shimmer.type = "sine";
  shimmer.frequency.value = 164.81;
  const shimmerGain = context.createGain();
  shimmerGain.gain.value = 0.0001;
  shimmer.connect(shimmerGain).connect(master);

  const fireFilter = context.createBiquadFilter();
  fireFilter.type = "bandpass";
  fireFilter.frequency.value = 900;
  fireFilter.Q.value = 0.35;
  const fireGain = context.createGain();
  fireGain.gain.value = 0.0001;

  const fireSource = context.createBufferSource();
  fireSource.buffer = createNoiseBuffer(context);
  fireSource.loop = true;
  fireSource.connect(fireFilter).connect(fireGain).connect(master);

  const lfo = context.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.07;
  const lfoGain = context.createGain();
  lfoGain.gain.value = 180;
  lfo.connect(lfoGain).connect(drone.frequency);

  drone.start();
  shimmer.start();
  fireSource.start();
  lfo.start();

  return {
    context,
    master,
    drone,
    droneGain,
    shimmer,
    shimmerGain,
    fireFilter,
    fireGain,
    fireSource,
    lfo,
    lfoGain,
  };
};

const destroyNodes = (nodes: AudioNodes) => {
  nodes.drone.stop();
  nodes.shimmer.stop();
  nodes.fireSource.stop();
  nodes.lfo.stop();
  nodes.context.close().catch(() => undefined);
};

export const AmbientSoundscape = () => {
  const soundEnabled = useCinematicStore((state) => state.soundEnabled);
  const reducedMotion = useCinematicStore((state) => state.reducedMotion);
  const nodesRef = useRef<AudioNodes | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      useCinematicStore.getState().setSoundReady(false);
      return;
    }

    if (!soundEnabled) {
      useCinematicStore.getState().setSoundReady(false);

      if (nodesRef.current) {
        const now = nodesRef.current.context.currentTime;
        nodesRef.current.master.gain.cancelScheduledValues(now);
        nodesRef.current.master.gain.linearRampToValueAtTime(0.0001, now + 0.35);
      }

      return;
    }

    if (!nodesRef.current) {
      const AudioContextCtor = window.AudioContext || (window as Window & typeof globalThis & {
        webkitAudioContext?: typeof AudioContext;
      }).webkitAudioContext;

      if (!AudioContextCtor) {
        return;
      }

      nodesRef.current = buildNodes(new AudioContextCtor());
    }

    const nodes = nodesRef.current;
    nodes.context.resume().catch(() => undefined);
    useCinematicStore.getState().setSoundReady(true);

    return () => {
      if (nodesRef.current) {
        destroyNodes(nodesRef.current);
        nodesRef.current = null;
      }
    };
  }, [soundEnabled, reducedMotion]);

  useEffect(() => {
    if (!soundEnabled || !nodesRef.current) {
      return;
    }

    const interval = window.setInterval(() => {
      const { progress, derived } = useCinematicStore.getState();
      const nodes = nodesRef.current;

      if (!nodes) {
        return;
      }

      const now = nodes.context.currentTime;

      nodes.master.gain.cancelScheduledValues(now);
      nodes.master.gain.linearRampToValueAtTime(0.16 + progress * 0.05, now + 0.4);

      nodes.droneGain.gain.cancelScheduledValues(now);
      nodes.droneGain.gain.linearRampToValueAtTime(0.05 + derived.horizonGlow * 0.06, now + 0.4);

      nodes.shimmerGain.gain.cancelScheduledValues(now);
      nodes.shimmerGain.gain.linearRampToValueAtTime(0.005 + progress * 0.018, now + 0.4);

      nodes.fireGain.gain.cancelScheduledValues(now);
      nodes.fireGain.gain.linearRampToValueAtTime(derived.fireIntensity * 0.1, now + 0.2);

      nodes.fireFilter.frequency.cancelScheduledValues(now);
      nodes.fireFilter.frequency.linearRampToValueAtTime(
        500 + derived.fireIntensity * 1700,
        now + 0.24,
      );

      nodes.shimmer.frequency.cancelScheduledValues(now);
      nodes.shimmer.frequency.linearRampToValueAtTime(164.81 + progress * 28, now + 0.5);
    }, 120);

    return () => window.clearInterval(interval);
  }, [soundEnabled]);

  return null;
};
