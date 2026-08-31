/** The home hero's per-letter wordmark colours -- P purple, E green, M red,
 *  F blue -- chosen by the client on 2026-08-28, and since 2026-08-30 the
 *  treatment for the word "PEMF" anywhere it appears in a heading on the
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

/** Every standalone "PEMF" in a string, wherever it falls. This began as a
 *  leading-word-only match, which fitted the hero (where the word stands
 *  alone) and covered about 25 of the site's headings; the client asked on
 *  2026-08-30 for the two that mention it mid-sentence as well -- "IMRS prime
 *  PEMF" on /products and "Relax with PEMF" on /mental-health.
 *
 *  The boundaries exclude a hyphen as well as word characters, which is not
 *  decoration: the site writes "PEMF-Extremely low frequency and low
 *  intensity systems for wellness!" and a plain \bPEMF\b would colour the
 *  first four letters of that compound and leave "-Extremely" in heading
 *  colour. It is a bullet rather than a heading today, but the rule should
 *  not depend on that staying true. */
const PEMF_WORD = /(?<![\w-])PEMF(?![\w-])/g;

/** The string cut into runs, each flagged for whether it is the word. */
function splitOnPemf(text: string) {
  const parts: { isWord: boolean; text: string }[] = [];
  let cut = 0;
  for (const match of text.matchAll(PEMF_WORD)) {
    const at = match.index;
    if (at > cut) parts.push({ isWord: false, text: text.slice(cut, at) });
    parts.push({ isWord: true, text: match[0] });
    cut = at + match[0].length;
  }
  if (cut < text.length) parts.push({ isWord: false, text: text.slice(cut) });
  return parts;
}

/** A heading's text with every standalone "PEMF" set in the hero's four
 *  colours. Headings without the word render unchanged, so this is safe to
 *  wrap around every heading rather than only the ones that match today.
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
  const parts = splitOnPemf(text);
  if (!parts.some((part) => part.isWord)) return text;
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {parts.map((part, p) =>
          part.isWord ? (
            ["P", "E", "M", "F"].map((letter, i) => (
              <span key={`${p}-${i}`} style={{ color: `var(${PEMF_LETTER_TOKENS[i]})` }}>
                {letter}
              </span>
            ))
          ) : (
            <span key={p}>{part.text}</span>
          )
        )}
      </span>
    </>
  );
}
