/** Sleep Health page copy. Source: "Website Exiga Jasmin 2026.docx", page 7. Verbatim. */
import type { Panel } from "./types";
import { images } from "./images.ts";

export const intro = { title: "PEMF Promotes Good Sleep" };

export const sleep: Panel[] = [
  {
    paragraphs: [
      "PEMF is an effective tool for improving sleep quality. PEMF is a non-invasive, non-addictive, drug-free approach for promoting better sleep. Sleep allows your body and mind to recharge, leaving you refreshed and alert when you wake up.",
    ],
  },
  { image: images.sleepMatTablet },
  {
    paragraphs: [
      "PEMF helps you to relax and unwind and put your mind at rest. Fall asleep faster and have better quality and quantity of sleep. Wake up less often during the night. Deep sleep is crucial for physical and mental rejuvenation.",
    ],
  },
];

export const benefits: { heading: string; panels: Panel[] } = {
  heading: "Benefits of Adequate Sleep",
  panels: [
    {
      title: "Memory Consolidation",
      paragraphs: [
        "Your brain organizes newly acquired information while you sleep, turning short-term memories into long-term ones, which aids in learning.",
      ],
    },
    {
      title: "Sharper Focus",
      paragraphs: [
        "Enhances attention span, creativity, and problem-solving abilities, keeping you productive and safe throughout the day.",
      ],
    },
    {
      title: "Emotional Stability",
      paragraphs: [
        "Reduces stress. Sleep keeps the brain's emotional center from overreacting to daily stressors. Deep sleep results in calming effects.",
      ],
    },
  ],
};
