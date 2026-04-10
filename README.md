# Göktürk

Göktürk is a production-grade cinematic landing page built as a single immersive scroll sequence. It combines Next.js App Router, TypeScript, Tailwind CSS, React Three Fiber, Three.js, GSAP, Lenis, and Zustand to create a restrained myth-tech experience grounded in atmosphere rather than UI noise.

The current foundation is already wired for:

- A shared cinematic progress model across DOM and 3D
- Scroll-linked scene phases from prologue to ascension
- Procedural atmosphere, embers, horizon aura, and volumetric mist
- A GLB-ready sacred structure pipeline with graceful procedural fallback
- Performance-tier detection and reduced-motion fallback paths
- Optional ambient soundscape driven by cinematic progress

## Experience

The page is structured as one long-form filmic sequence:

1. Prologue: black frame, veil, invocation
2. Arrival: mist, horizon, distant monumentality
3. Reveal: sacred structure and fire begin to emerge
4. Presence: identity and narrative density sharpen
5. Ascension: final CTA and mythic closure

## Stack

- Next.js 16 with App Router
- TypeScript
- Tailwind CSS 4
- React Three Fiber + Three.js
- `@react-three/drei`
- GSAP + ScrollTrigger
- Lenis
- Zustand
- Web Audio API for procedural ambience

## Project Structure

```text
app/
components/
  cinematic/
  scene/
  ui/
data/
lib/
  animations/
  three/
public/
  models/
  textures/
scripts/
store/
```

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality Checks

```bash
npm run lint
npm run build
```

## Real GLB Asset

The sacred structure loader now looks for:

```text
public/models/sacred-structure.glb
```

A generated starter GLB is already included in the repo, so the live scene loads a real model immediately. If you want to regenerate it procedurally, run:

```bash
npm run generate:model
```

That script writes a new [`public/models/sacred-structure.glb`](/Users/haktanmustafatatar/Documents/New%20project/gokturk/public/models/sacred-structure.glb) file from code, which is useful until final art arrives.

## Deploying To Vercel

This project is ready for Vercel deployment.

1. Import the GitHub repository into Vercel.
2. Keep the default Next.js framework preset.
3. Use the default build command: `next build`.
4. Deploy from the `main` branch.

Static model and texture assets are configured for long-lived cache headers through [`vercel.json`](/Users/haktanmustafatatar/Documents/New%20project/gokturk/vercel.json).

## Next Recommended Passes

- Replace the generated GLB with a final sacred structure asset
- Add authored textures for ground breakup and smoke layering
- Add a branded Open Graph image and production domain metadata
- Expand the ambient score into multi-stem orchestration
