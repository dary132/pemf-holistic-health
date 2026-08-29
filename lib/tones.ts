/** Section ground tints. A section with no tone sits on the page's cream
 *  ground; the three tones below are the only tinted grounds a section may
 *  take, so every band on the site draws from one four-ground vocabulary
 *  (cream, sand, blush, mist) rather than per-page ad-hoc colours.
 *
 *  Blush and mist joined sand on 2026-08-28 at the client's request for more
 *  varied section colouring. All three are held to the same 7:1 AAA floor as
 *  cream in scripts/verify-contrast.mjs — a tone is a ground under real text
 *  (headings, intros, body), never a decorative fill. */
export type Tone = "sand" | "blush" | "mist";

export const TONE_BG: Record<Tone, string> = {
  sand: "bg-sand",
  blush: "bg-blush",
  mist: "bg-mist",
};
