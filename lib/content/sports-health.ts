/** Sports Health page copy. Source: "Website Exiga Jasmin 2026.docx", page 6. Verbatim.
 *  Note: the document writes both "IMRS prime" and "IMRS Prime" on this page.
 *  Brand casing is not a typo, so each instance is left exactly as written. */
import type { Band, Img } from "./types";
import { images } from "./images.ts";

/* The page's h1 is the document's own section heading, not its page title,
   client request 2026-08-31: "Sports Health" was a label rather than a claim,
   and this says what the page is for. Both strings are the document's -- this
   one appears on its page 6 -- so it needs no ALLOWED_EDITS entry; it is a
   different verbatim string, not invented copy.

   It MOVED here from `athletic.heading` rather than being copied: the same
   sentence as both h1 and h2 on one page would be a duplicate heading, so the
   athletic band now runs without one, directly under the h1 that introduces
   it. "Sports Health" survives as the nav label's origin and in
   lib/routes.ts, which records the document's page title. */
export const intro = { title: "PEMF Enhances Athletic Performance" };

/* Reshaped from three Panels to one Band, 2026-08-28 plan step 1, built
   2026-08-31. The document's two paragraphs used to sit either side of the
   brainwave graphic as columns one and three of a three-column row, which
   made the image a divider between two halves of one thought. As a band the
   graphic sits beside both paragraphs and the reading order is unbroken.
   Both strings are byte-for-byte the document's and are unchanged. */
export const athletic: { image: Img; paragraphs: string[] } = {
  image: images.brainwaveEntrainment,
  paragraphs: [
    "Intelligent Magnetic Resonance Stimulation prime PEMF, within the scope of elite and mass sports, is an effective tool to promote holistic wellness for performance and endurance enhancement for those who work out or are in training.",
    "PEMF with Brain Wave Entrainment enhances visualization and mindfulness to build mental resilience, improve focus, enhance thinking process and reaction times, better sleep and management of stress.",
  ],
};

/* Three Panels -> three Bands, same reasoning: the client asked for the
   document's own icons shown large, and a three-column row caps each at a
   third of the width. As bands they render at ~55%. Titles and paragraphs
   unchanged. */
export const boosts: { heading: string; bands: Band[] } = {
  heading: "PEMF Boosts Sports Performance and Endurance",
  bands: [
    {
      title: "Passive Warm-Up",
      image: images.passiveWarmup,
      paragraphs: [
        "It is faster and more effective to combine active warm-up and passive warm-up with PEMF as both can offer a more comprehensive approach.",
      ],
    },
    {
      title: "Rejuvenation",
      image: images.rejuvenation,
      paragraphs: [
        "The IMRS Prime accelerates rejuvenation after physical activity, thus allowing you to train harder, perform better and compete more often.",
      ],
    },
    {
      title: "Enhanced Performance",
      image: images.performance,
      paragraphs: [
        "IMRS Prime PEMF is a safe, efficient and comprehensive holistic approach towards enhanced performance and endurance.",
      ],
    },
  ],
};
