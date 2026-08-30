/** Mental Health page copy.
 *  Source: docs/plain-language-approved-2026-08-29.txt (owner-approved plain-language
 *  rewrite with the hedged claim wording). Headings and the Intellectual Health
 *  lead-in remain from "Website Exiga Jasmin 2026.docx", page 4. Verbatim. */
import type { Panel } from "./types";
import { images } from "./images.ts";

export const intro = { title: "PEMF Improves Mental Health" };

export const dimensions: Panel[] = [
  {
    items: [
      {
        term: "Mental Sharpness",
        text: "How clearly you think, including your focus, quick thinking, memory, and problem solving.",
      },
      {
        term: "Emotional Health",
        text: "Knowing what you feel, understanding why, and handling those feelings well.",
      },
      {
        term: "Spiritual Health",
        text: "Having a sense of purpose, and holding values and beliefs that give your life meaning.",
      },
      {
        term: "Social Health",
        text: "Building good relationships and keeping them, and getting along well with other people.",
      },
      {
        term: "Financial Health",
        text: "Managing your money well, so that you feel secure day to day.",
      },
    ],
  },
  {
    title: "Brainwave Entrainment",
    image: images.exagonBrainBanner,
    paragraphs: [
      "Your brain health shapes the rest of your life. It affects how you make choices, handle stress, and reach your goals. Brainwave Entrainment is a calming experience for the brain. Some people call it a spa for the mind. Many find it leaves them feeling relaxed and at ease.",
      "IMRS prime PEMF and Brainwave Entrainment are gentle to use. Nothing enters your body, and nothing is habit-forming. People use them as part of caring for their brain health.",
    ],
  },
  {
    title: "Intellectual Health",
    paragraphs: [
      "Intellectual Health refers to the state of well-being in which an individual can:",
    ],
    items: [
      {
        term: "Clear thinking",
        text: "Look at the facts, make up your own mind, and solve problems.",
      },
      {
        term: "Curiosity",
        text: "Keep an open mind, learn new things, and listen to other points of view.",
      },
      {
        term: "Creativity",
        text: "Come up with your own ideas, express them, and do things that interest you.",
      },
      {
        term: "Self-awareness",
        text: "Know what you are good at, and what you want to work on.",
      },
      {
        term: "Adaptability",
        text: "Take in new facts, adjust, and welcome a challenge.",
      },
    ],
  },
];

export const stress: { heading: string; panels: Panel[] } = {
  heading: "PEMF Helps Manage Stress",
  panels: [
    {
      title: "What is Stress?",
      paragraphs: [
        "Stress is how your body and mind answer a challenge. It is natural, and it helps you get through hard moments.",
      ],
    },
    { image: images.stressMeter },
    {
      title: "Healthy Coping Mechanism",
      paragraphs: [
        "PEMF is one way people choose to unwind. It is gentle: nothing enters your body, and it is not habit-forming. Use it any time, at home or at the office.",
      ],
    },
  ],
};

export const relaxation: { heading: string; panels: Panel[] } = {
  heading: "PEMF for Relaxation",
  panels: [
    {
      title: "What is Relaxation?",
      paragraphs: [
        "Relaxation means feeling calm, comfortable, and free of stress. It helps you handle stress better, and it brings you a sense of peace.",
      ],
    },
    { image: images.relaxPoolside },
    {
      title: "Relax with PEMF",
      paragraphs: [
        "Many people feel more relaxed within minutes, at home or at the office. PEMF is designed to help your body settle into a calm, balanced state.",
      ],
    },
  ],
};

export const benefitsOfRelaxation: { heading: string; panels: Panel[] } = {
  heading: "Benefits of Relaxation",
  panels: [
    {
      title: "Physical Health",
      paragraphs: [
        "Relaxation calms your mind and lowers stress. That helps your body wind down for bed. You fall asleep sooner, sleep longer and better, and wake up restored.",
      ],
    },
    {
      title: "Mental Health",
      paragraphs: [
        "Relaxation lifts your mood and helps you cope. Your memory and focus improve. You think more clearly, solve problems better, and handle your feelings more evenly.",
      ],
    },
    {
      title: "Emotional Health",
      paragraphs: [
        "You feel calm and at peace, with less stress. Hard days get easier to face. Many people feel happier, more content, and closer to the people they love.",
      ],
    },
  ],
};
