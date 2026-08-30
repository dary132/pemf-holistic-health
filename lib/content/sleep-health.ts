/** Sleep Health page copy.
 *  Source: docs/plain-language-approved-2026-08-29.txt (owner-approved plain-language
 *  rewrite with the hedged claim wording); headings from "Website Exiga Jasmin
 *  2026.docx", page 7. Verbatim. */
import type { Panel } from "./types";
import { images } from "./images.ts";

export const intro = { title: "PEMF Promotes Good Sleep" };

export const sleep: Panel[] = [
  {
    paragraphs: [
      "Many people use PEMF to wind down at the end of the day. Nothing enters your body. There are no drugs, and it is not habit-forming. Sleep recharges your body and mind, so you wake up fresh and alert.",
    ],
  },
  { image: images.sleepMatTablet },
  {
    paragraphs: [
      "PEMF helps you unwind and rest your mind. You fall asleep faster and sleep more deeply. You wake up less often during the night. Deep sleep is how your body and mind repair themselves.",
    ],
  },
];

export const benefits: { heading: string; panels: Panel[] } = {
  heading: "Benefits of Adequate Sleep",
  panels: [
    {
      title: "Better Memory",
      paragraphs: [
        "While you sleep, your brain sorts what you learned that day. It moves new facts into long-term memory. That is how learning sticks.",
      ],
    },
    {
      title: "Sharper Focus",
      paragraphs: [
        "Good sleep lengthens your attention span, so you get more done, solve problems better, and stay safer all day.",
      ],
    },
    {
      title: "Steadier Mood",
      paragraphs: [
        "Sleep lowers stress, so when you are rested, daily upsets bother you less. Deep sleep leaves you calmer.",
      ],
    },
  ],
};
