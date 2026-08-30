/** Energy page copy.
 *  Source: docs/plain-language-approved-2026-08-29.txt (owner-approved plain-language
 *  rewrite with the hedged claim wording); headings from "Website Exiga Jasmin
 *  2026.docx", page 5. Verbatim. */
import type { Panel } from "./types";
import { images } from "./images.ts";

export const intro = { title: "PEMF Increases Your Energy" };

export const benefits: Panel[] = [
  {
    items: [
      {
        term: "More Alert",
        text: "You feel more awake and sharp, and you stay focused on the job in front of you.",
      },
      {
        term: "More Get-Up-and-Go",
        text: "You start jobs sooner and finish them, and you feel ready for whatever the day brings.",
      },
      {
        term: "Better Mood",
        text: "When your energy is up, you often feel cheerful and more social.",
      },
    ],
  },
  {
    title: "Benefits of Being Energetic",
    image: images.energyBattery,
    paragraphs: [
      "Try PEMF as part of your routine for energy, stamina, and strength. See how it feels for you.",
    ],
  },
  {
    items: [
      {
        term: "Physical Vitality",
        text: "You feel lively and ready to move. You have more staying power and more strength, instead of feeling tired even after a good rest.",
      },
      {
        term: "Open to New Things",
        text: "With more energy, you feel readier to meet new people and see new places.",
      },
    ],
  },
];
