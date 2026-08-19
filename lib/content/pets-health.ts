/** Pets Health page copy. Source: "Website Exiga Jasmin 2026.docx", page 8. Verbatim,
 *  with one exception: the document's H1 reads "PRMF for Pets Health". That is an
 *  unambiguous transposition and is corrected here — spec Appendix B, class 1, and
 *  it is the sole entry in ALLOWED_EDITS in scripts/verify-copy.mjs. */
import type { Panel } from "./types";
import { images } from "./images.ts";

export const intro = { title: "PEMF for Pets Health" };

export const animals: Panel[] = [
  { title: "Show Animals", image: images.showAnimals },
  {
    title: "PEMF in Progress",
    image: images.pemfDogPad,
    paragraphs: ["Dog knows PEMF is good for his health and wellness."],
  },
  {
    title: "Pets",
    image: images.petsGroup,
    paragraphs: ["Pets appreciate PEMF."],
  },
];

export const racehorses: { heading: string; panels: Panel[] } = {
  heading: "PEMF for Racehorses",
  panels: [
    { title: "Area Applicator", image: images.horseAreaApplicator },
    {
      title: "Stress Free Technique",
      paragraphs: [
        "Benefits of racehorses using hands free Intelligent Magnetic Resonance Stimulation PEMF:",
      ],
      items: [
        { term: "Achieve optimal health", text: "" },
        { term: "Warm up exercise", text: "" },
        { term: "Performance enhancement", text: "" },
        { term: "Excellent endurance", text: "" },
      ],
    },
    { title: "Leg Applicator", image: images.horseLegApplicator },
  ],
};
