/** Mental Health page copy. Source: "Website Exiga Jasmin 2026.docx", page 4. Verbatim. */
import type { Panel } from "./types";
import { images } from "./images.ts";

export const intro = { title: "PEMF Improves Mental Health" };

export const dimensions: Panel[] = [
  {
    items: [
      {
        term: "Mental Acuity",
        text: "Mental acuity refers to your cognitive health, which includes clarity, focus, quick thinking, problem-solving, and memory.",
      },
      {
        term: "Emotional Health",
        text: "Emotional health pertains to your awareness of, understanding of, and ability to manage your feelings and moods.",
      },
      {
        term: "Spiritual Health",
        text: "Focuses on having a sense of purpose, values, and beliefs that give life meaning.",
      },
      {
        term: "Social Health",
        text: "Involves your ability to build and maintain healthy relationships and interact effectively with others.",
      },
      {
        term: "Financial Health",
        text: "The ability to manage your finances effectively and achieve financial security.",
      },
    ],
  },
  {
    title: "Brainwave Entrainment",
    image: images.exagonBrainBanner,
    paragraphs: [
      "Brain health is a vital component of overall well-being and contributes to a person's ability to make informed decisions, cope with stress, and achieve your goals. Brainwave Entrainment is a holistic experience for the brain, also known as Spa for the Mind, reduces stress, resulting in relaxation, calmness and ease.",
      "IMRS prime PEMF and Brainwave Entrainment are a safe, non-invasive and non-addictive, affordable application to improve mental acuity and learning ability thus promoting brain health and wellness.",
    ],
  },
  {
    title: "Intellectual Health",
    paragraphs: [
      "Intellectual Health refers to the state of well-being in which an individual can:",
    ],
    items: [
      {
        term: "Engage in critical thinking",
        text: "Analyze information, form opinions and solve problems.",
      },
      {
        term: "Curiosity and Lifelong Learning",
        text: "Maintain an open mind, seek new knowledge, and explore different perspectives.",
      },
      {
        term: "Creativity",
        text: "Generate original ideas, express oneself, and engage in stimulating activities.",
      },
      {
        term: "Self-awareness",
        text: "Understand one's own cognitive strengths and weaknesses and work to improve them.",
      },
      {
        term: "Adaptability",
        text: "Adjust new information and situations and embrace intellectual challenges.",
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
        "Stress is a physiological and psychological response to perceived or real challenges or threats. It is a natural and adaptive mechanism that helps individuals cope with demanding situations.",
      ],
    },
    { image: images.stressMeter },
    {
      title: "Healthy Coping Mechanism",
      paragraphs: [
        "Choose a holistic approach using PEMF as your healthy coping mechanism. PEMF is safe, effective, non-invasive and non-addictive tool. You can use it anytime in the comfort of your own home or office.",
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
        "Relaxation is the state of being calm, comfortable, and free from stress. Relaxation helps improve coping with stress, leading to a state of peace and tranquility.",
      ],
    },
    { image: images.relaxPoolside },
    {
      title: "Relax with PEMF",
      paragraphs: [
        "PEMF can be effective for relaxation within minutes in the comfort of your own home or office. PEMF aids your body in returning to a calm and balanced state.",
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
        "Relaxation enhances sleep quality by reducing stress and calming the mind, helps to wind down the body and prepare for sleep, leading to better sleep onset, better quality and quantity of sleep and improved rejuvenation.",
      ],
    },
    {
      title: "Mental Health",
      paragraphs: [
        "Improving mood and coping mechanisms. Enhances cognitive function, memory and concentration. Promotes clearer thinking and problem-solving abilities. Increases self-awareness and emotional regulation.",
      ],
    },
    {
      title: "Emotional Health",
      paragraphs: [
        "Provides a sense of calm and peace, reducing stress and improves resilience to adversity and promotes emotional well-being. Enhances feelings of happiness, contentment, fulfillment and healthier relationships.",
      ],
    },
  ],
};
