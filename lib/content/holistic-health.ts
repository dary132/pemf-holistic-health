/** Holistic Health page copy. Source: "Edit PEMF for Holistic Health Page.docx"
 *  (2026-09-04), which replaces the page wholesale at the site owner's
 *  instruction; the copy is the Exiga Jasmin document's home-page "PEMF -
 *  Holistic Approach" section, plus one sentence and one phrase new to the
 *  edit. Verbatim. The page-3 definition panels that lived here until
 *  2026-09-04 are in git history (6ec3697 and earlier). */
import { images } from "./images.ts";
import type { Band, Panel } from "./types";

export const intro = { title: "PEMF for Holistic Health" };

/* The document's two blocks, in its order. Both are headed "PEMF - Holistic
   Approach" there. On the page only the cards carry it, centred: the owner
   first asked (2026-09-04) for the tag to go, then for it back over the
   three pictures alone. */
export const approach = { title: "PEMF - Holistic Approach" };

/* Block one: the flower diagram beside the three paragraphs in their original
   wording. The picture is the site owner's colour version of the document's
   flower -- see images.holisticHealthFlower. */
export const approachBand: Band = {
  image: images.holisticHealthFlower,
  paragraphs: [
    "A holistic approach to health considers and integrates the mental, emotional, physical, intellectual, social, and spiritual aspects of a person, viewing them as interconnected parts of overall well-being.",
    "This perspective recognizes that imbalances in one area can affect others. PEMF is a holistic approach to promote a state of total wellness.",
    "Holistic health using PEMF, aims to achieve overall well-being by addressing interconnected aspects of life, such as mental health, emotional health, intellectual health, physical health, social health and spiritual health.",
  ],
};

/* Block two: the same copy as three cards, each with its own picture above one
   paragraph, "to make it colorful on cellphone". Card two's first sentence and
   "balance and" in its second are new to the edit -- see
   docs/edit-holistic-health-2026-09.txt. */
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
