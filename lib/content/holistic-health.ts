/** Holistic Health page copy. Source: "Website Exiga Jasmin 2026.docx", page 3,
 *  plus "Edit PEMF for Holistic Health Page.docx" (2026-09-04) for the
 *  `approach` block. Verbatim. */
import { images } from "./images.ts";
import type { Panel } from "./types";

export const intro = { title: "PEMF for Holistic Health" };

/* The client's 2026-09-04 edit: the "PEMF - Holistic Approach" copy that the
   Exiga Jasmin document put on the home page, revised into three cards that
   each carry a picture above one paragraph, "to make it colorful on
   cellphone". The document heads every card with the same title; here the
   title is the block's one h2 and the cards go unheaded, because three
   identical headings in a row read as a mistake on the web. The home page
   keeps its text-only rendering of the earlier wording; the client's edit
   names this page, and the site owner chose on 2026-09-04 not to duplicate
   the block. Card two's first sentence and "balance and" in its second are
   new to this edit -- see docs/edit-holistic-health-2026-09.txt. */
export const approach = { title: "PEMF - Holistic Approach" };

export const approachPanels: Panel[] = [
  {
    image: images.holisticMindBodySpirit,
    paragraphs: [
      "A holistic approach to health considers and integrates the mental, emotional, physical, intellectual, social, and spiritual aspects of a person, viewing them as interconnected parts of overall well-being.",
    ],
  },
  {
    image: images.holisticBalanceStones,
    paragraphs: [
      "A holistic perspective is a way of viewing a person as a complete and interconnected whole.",
      "This perspective recognizes that imbalances in one area can affect others. PEMF is a holistic approach to promote a state of balance and total wellness.",
    ],
  },
  {
    image: images.holisticSixDimensionsWheel,
    paragraphs: [
      "Holistic health using PEMF, aims to achieve overall well-being by addressing interconnected aspects of life, such as mental health, emotional health, intellectual health, physical health, social health and spiritual health.",
    ],
  },
];

export const definition: Panel[] = [
  {
    paragraphs: [
      "Holistic health is a wellness approach that considers a person's physical, intellectual, mental, emotional, social, and spiritual well-being, recognizing these interconnected aspects as essential for optimal health and balance.",
    ],
  },
  {
    paragraphs: [
      "Holistic health is a whole-person approach that emphasizes optimum body and mind health and aims to empower you by integrating natural, conventional, healthy lifestyle-based practices like PEMF to achieve overall health and wellness.",
    ],
  },
];

/* `wellness` -- the "PEMF for Wellness" section heading -- was removed
   2026-08-31. Its only content was the eight-dimensions wheel, which the
   client moved to the top of /mental-health (now the Wellness page), and a
   heading with nothing under it is worse than no heading. The wording is
   still in the document; nothing here forbids bringing it back with real
   copy beneath it. */
