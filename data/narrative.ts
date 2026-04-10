import { cinematicPhases } from "@/lib/animations/cinematicPhases";

export type NarrativeBeat = {
  id: string;
  phase: number;
  label: string;
  title: string;
  body: string;
  range: [number, number];
  align: "left" | "center" | "right";
};

export const narrativeBeats: NarrativeBeat[] = [
  {
    id: "prologue",
    phase: 0,
    label: cinematicPhases[0].label,
    title: "A silence older than iron.",
    body:
      "Before the banner moves, the horizon listens. The world holds its breath in black mist and distant ember.",
    range: [cinematicPhases[0].range[0] + 0.02, cinematicPhases[0].range[1]],
    align: "center",
  },
  {
    id: "arrival",
    phase: 1,
    label: cinematicPhases[1].label,
    title: "The horizon begins to remember.",
    body:
      "Mist separates from black. Form arrives slowly, as if the plain were speaking before the name is spoken.",
    range: cinematicPhases[1].range,
    align: "left",
  },
  {
    id: "reveal",
    phase: 2,
    label: cinematicPhases[2].label,
    title: "The dwelling becomes legible through fire.",
    body:
      "What was weather becomes structure. Warmth enters carefully, cutting a line through the ash-blue distance.",
    range: cinematicPhases[2].range,
    align: "right",
  },
  {
    id: "presence",
    phase: 3,
    label: cinematicPhases[3].label,
    title: "Memory gathers around the flame.",
    body:
      "Speech recedes. Weight remains. The frame narrows until ritual, ancestry, and breath feel almost indivisible.",
    range: cinematicPhases[3].range,
    align: "left",
  },
  {
    id: "ascension",
    phase: 4,
    label: cinematicPhases[4].label,
    title: "Carry the fire beyond the frame.",
    body:
      "The final movement does not rise in noise. It opens in clarity, then leaves the frame behind.",
    range: cinematicPhases[4].range,
    align: "center",
  },
];
