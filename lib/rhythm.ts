/** Section vertical rhythm. Chosen per section rather than applied uniformly:
 *  the same padding everywhere gives the eye no cue about what groups with what. */
export const RHYTHM = {
  compact: "py-10",
  normal: "py-16 sm:py-20",
  spacious: "py-24 sm:py-32",
} as const;

export type Rhythm = keyof typeof RHYTHM;
