/** The home hero's per-letter wordmark colours -- P purple, E green, M red,
 *  F blue -- chosen by the client on 2026-08-28, and since 2026-08-30 the
 *  treatment for the word "PEMF" wherever it opens a heading anywhere on the
 *  site. Exported as one array so the hero (app/page.tsx) and every other
 *  heading read from the same source and cannot drift apart; "the same colour
 *  scheme as the hero" is the requirement, so a second copy of these four
 *  token names would be a bug waiting to happen.
 *
 *  Each is an existing --tc-* stop rather than a freely picked hue because
 *  those stops are the brightest purple/green/red/blue that clear the site's
 *  7:1 AAA floor, and scripts/verify-contrast.mjs holds all four against
 *  every ground a heading can land on. Two of them, --tc-1 and --tc-4, were
 *  darkened a step when this treatment left the hero: they cleared 7:1 on
 *  cream, which was all the hero needed, but not on sand, blush or mist.
 *  See the note beside them in globals.css. */
export const PEMF_LETTER_TOKENS = ["--tc-7", "--tc-4", "--tc-1", "--tc-6"] as const;

/** Only a standalone leading "PEMF" is coloured. The lookahead matters: the
 *  site also writes "PEMF-Extremely low frequency..." as body copy, and a
 *  bare /^PEMF/ would colour the first four letters of a hyphenated compound
 *  and leave the rest of the word in heading colour. */
const LEADING_PEMF = /^PEMF(?=\s|$)/;

export function startsWithPemf(text: string) {
  return LEADING_PEMF.test(text);
}

/** A heading's text with a leading "PEMF" set in the hero's four colours.
 *  Headings that do not open with the word render unchanged, so this is safe
 *  to wrap around every heading rather than only the ones that match today.
 *
 *  The heading is carried twice: once for assistive tech as an `sr-only`
 *  copy, and once visually with the coloured letters, the visual copy hidden
 *  from the accessibility tree. Same reasoning as the hero's aria-label --
 *  four separately marked-up letters risk being announced as "P, E, M, F" --
 *  but done inside the component instead of as an aria-label on the heading,
 *  so a caller cannot forget it, and so it keeps working inside PlateCard's
 *  and Card's headings where the heading element also wraps a link.
 *
 *  The sr-only copy carries the WHOLE heading, not just the word, and that is
 *  load-bearing twice over. It makes the accessible name exactly the
 *  document's sentence. And scripts/verify-site.mjs proves each page renders
 *  its verbatim phrases by stripping tags to spaces, so four one-letter spans
 *  turn "PEMF for Pets Health" into "P E M F for Pets Health" and the check
 *  fails -- correctly, since after the split no single text node holds the
 *  phrase any more. Keeping the sentence whole in the sr-only copy restores
 *  it as real rendered text rather than loosening the check to accept the
 *  fragments.
 *
 *  `text` is optional because Panel.title is: /pemf renders two panel titles
 *  straight into its own h3s, and widening here beats a non-null assertion at
 *  each call site, which would assert something the type does not promise.
 *
 *  The non-matching case returns the bare string rather than a `<>{text}</>`
 *  fragment. That is not style: verify-jsx-copy.mjs extracts JSX text nodes
 *  with a regex, and an inline `</>;` followed by more code on the same line
 *  reads to it as a text child of `"; return ("`, which it then reports as
 *  invented copy. React renders a returned string identically, so the guard
 *  keeps working and this component stops setting it off. */
export function HeadingText({ text = "" }: { text?: string }) {
  if (!startsWithPemf(text)) return text;
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {["P", "E", "M", "F"].map((letter, i) => (
          <span key={i} style={{ color: `var(${PEMF_LETTER_TOKENS[i]})` }}>
            {letter}
          </span>
        ))}
        {text.slice(4)}
      </span>
    </>
  );
}
