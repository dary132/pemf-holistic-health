/** Energy page copy. Source: "Website Exiga Jasmin 2026.docx", page 5. Verbatim. */
import type { Panel } from "./types";
import { images } from "./images.ts";

export const intro = { title: "PEMF Increases Your Energy" };

export const benefits: Panel[] = [
  {
    items: [
      {
        term: "Increased Alertness and Focus",
        text: "You feel more awake, sharp, and focused on the task at hand.",
      },
      {
        term: "Greater Motivation and Productivity",
        text: "You are more inclined to start and complete tasks, feeling prepared to tackle anything.",
      },
      {
        term: "Improved Mood and Enthusiasm",
        text: "High energy levels often correlate with feeling enthusiastic, fun-loving, and sociable.",
      },
    ],
  },
  {
    title: "Benefits of Being Energetic",
    image: images.energyBattery,
    paragraphs: [
      "Try this holistic approach using PEMF system to enhance your energy, stamina, and power and you will feel the difference.",
    ],
  },
  {
    items: [
      {
        term: "Physical Vitality",
        text: "You feel vibrant and ready to move your body, have more stamina and more power in performance, rather than feeling tired, low energy despite being well rested.",
      },
      {
        term: "Willingness to Try New Experiences",
        text: "A higher energy state can make you more comfortable and eager to explore new people, places, and experiences.",
      },
    ],
  },
];
