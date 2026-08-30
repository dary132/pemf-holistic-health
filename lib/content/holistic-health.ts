/** Holistic Health page copy. Source: docs/plain-language-approved-2026-08-29.txt
 *  (owner-approved plain-language rewrite); headings from "Website Exiga Jasmin
 *  2026.docx", page 3. Verbatim. */
import type { Panel } from "./types";
import { images } from "./images.ts";

export const intro = { title: "PEMF for Holistic Health" };

export const definition: Panel[] = [
  {
    paragraphs: [
      "Holistic health looks at the whole person. It covers your body, your mind, your feelings, your relationships, and your sense of purpose. Each part affects the others, and you feel your best when they are in balance.",
    ],
  },
  { image: images.wellnessPractices },
  {
    paragraphs: [
      "This approach puts you in charge of your own wellness. It combines everyday healthy habits with natural practices like PEMF. The goal is simple: help your body and mind feel well.",
    ],
  },
];

export const wellness = { heading: "PEMF for Wellness" };
