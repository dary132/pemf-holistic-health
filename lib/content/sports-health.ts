/** Sports Health page copy. Source: "Website Exiga Jasmin 2026.docx", page 6. Verbatim.
 *  Note: the document writes both "IMRS prime" and "IMRS Prime" on this page.
 *  Brand casing is not a typo, so each instance is left exactly as written. */
import type { Panel } from "./types";
import { images } from "./images.ts";

export const intro = { title: "Sports Health" };

export const athletic: { heading: string; panels: Panel[] } = {
  heading: "PEMF Enhances Athletic Performance",
  panels: [
    {
      paragraphs: [
        "Intelligent Magnetic Resonance Stimulation prime PEMF, within the scope of elite and mass sports, is an effective tool to promote holistic wellness for performance and endurance enhancement for those who work out or are in training.",
      ],
    },
    { image: images.brainwaveEntrainment },
    {
      paragraphs: [
        "PEMF with Brain Wave Entrainment enhances visualization and mindfulness to build mental resilience, improve focus, enhance thinking process and reaction times, better sleep and management of stress.",
      ],
    },
  ],
};

export const boosts: { heading: string; panels: Panel[] } = {
  heading: "PEMF Boosts Sports Performance and Endurance",
  panels: [
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
