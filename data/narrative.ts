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
    label: "Prologue",
    title: "A silence older than iron.",
    body:
      "Before the banner moves, the horizon listens. The world holds its breath in black mist and distant ember.",
    range: [0.02, 0.16],
    align: "center",
  },
  {
    id: "arrival",
    phase: 1,
    label: "Arrival",
    title: "Göktürk enters as weather, not as noise.",
    body:
      "Fog drifts over the steppe. Wind brushes the plain. Monumental presence reveals itself slowly, with no wasted motion.",
    range: [0.16, 0.37],
    align: "left",
  },
  {
    id: "reveal",
    phase: 2,
    label: "Revelation",
    title: "The sacred dwelling wakes beneath the ash-blue sky.",
    body:
      "A yurt silhouette forms through smoke and distance. Firelight begins to pulse, carving warmth into the cold horizon.",
    range: [0.37, 0.58],
    align: "right",
  },
  {
    id: "presence",
    phase: 3,
    label: "Presence",
    title: "Human memory returns to the flame.",
    body:
      "Words become sparse. Form becomes ritual. The scene narrows around identity, ancestry, and a restrained mythic gravity.",
    range: [0.58, 0.8],
    align: "left",
  },
  {
    id: "ascension",
    phase: 4,
    label: "Ascension",
    title: "Carry the fire beyond the frame.",
    body:
      "At the summit, the monument opens into invitation. The final movement is not louder. It is clearer, brighter, inevitable.",
    range: [0.8, 1],
    align: "center",
  },
];
