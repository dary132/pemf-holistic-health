/** The class every content band carries.
 *
 *  `u-band` is a marker, not a style: app/globals.css uses it to alternate the
 *  two section grounds down a page with `:nth-child(<n> of .u-band)`. It exists
 *  so that rule can count content bands and skip everything else `main` holds
 *  -- Breadcrumbs, JumpNav, CredentialStrip and Disclaimer are direct children
 *  of `main` too, and the last three carry bg-sand deliberately as thin chrome.
 *  A rule written against `main > *` would repaint them as full bands and let
 *  the amount of chrome on a page decide its rhythm.
 *
 *  This file used to export a `Tone` union ("sand" | "blush" | "mist") and a
 *  TONE_BG map, and the four band components took a `tone` prop that each page
 *  set per section. That went on 2026-08-31 with the Clinic palette: the site
 *  now has two grounds rather than four, and which one a band gets is decided
 *  by its position, not by its call site. Keeping the prop would have left
 *  30-odd arguments that no longer changed anything. See the block comment on
 *  the alternation in app/globals.css. */
export function bandClass() {
  return "u-band";
}
