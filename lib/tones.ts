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

/** The class every content band carries: the tone's ground, if it has one,
 *  plus the `u-band` marker.
 *
 *  `u-band` paints nothing. It exists so CSS can count content bands and skip
 *  everything else `main` holds — Breadcrumbs, JumpNav, CredentialStrip and
 *  Disclaimer are all direct children of `main` too, and the last three carry
 *  `bg-sand` deliberately as thin chrome rather than as section grounds.
 *  A rule written against `main > *` would repaint them as full bands and, worse,
 *  count them, so a page's alternation would depend on how much chrome it
 *  happened to have. `:nth-child(… of .u-band)` counts only the bands.
 *
 *  Used by the `paper` and `clinic` theme blocks in app/globals.css, which
 *  alternate two grounds down a page. Those are review palettes on /themes;
 *  the default palette defines no rule for `u-band`, so adding it changed
 *  nothing about how the live site renders. */
export function bandClass(tone?: Tone) {
  return tone ? `u-band ${TONE_BG[tone]}` : "u-band";
}
