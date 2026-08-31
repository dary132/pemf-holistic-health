# BREAKPOINT — 2026-08-30

Supersedes BREAKPOINT-2026-08-29 as the resume point. Read that one afterwards:
everything in it still stands except the two items marked resolved below, and
its typography section is still the current state. BREAKPOINT-2026-08-28 remains
the reference for the **/sports-health band redesign, still unstarted** — the
largest outstanding piece of work on this site.

## Where we stopped

Tree is clean, all 21 commits deployed and confirmed live on
pemf.darytechnologies.com. Nothing is half-finished. The session was a long run
of small client-driven requests, each verified on screen and pushed before the
next one started.

`ca98044..e5df7f2`, 54 files, +806/−280.

## The one rule that governs this site

**Site copy is byte-for-byte the client's document, and stays that way.** See
BREAKPOINT-2026-08-29 for the full account — a rewrite was drafted, applied and
reverted. That rule was bent exactly once this session, deliberately and on the
record; see "The first deviation from the document" below.

## Shipped this session

| Commit | What |
|---|---|
| `c53026b` `d6c1dad` `8a7b2d6` `bf68761` `41a63ef` | **Ten of the document's own images restored** over the SVG redraws |
| `c61bfb9` | Client's AI-generated cartoon zoo art on /pets-health Show Animals |
| `396c37c` | IMRS fauna figure dropped from /pets-health |
| `9c34e01` | Earth-field image moved to /pemf's wellness-use band (fixing `d6c1dad`) |
| `3a2c096` `275df1c` | Wellness practices grid to its own figure; home card to a wheel thumbnail |
| `92248fc` | Bullets on the /products spec blocks |
| `e0146ab` `35c6bc1` `f7a1e9f` | **PEMF wordmark colours** from the hero to every heading, nav bar and footer |
| `3df8117` `b8111a7` | Pipe separators in the CTA and contact headings |
| `195b040` `c467d6e` `96ca136` | Mobile: full-bleed hero, stacked contact bar, language-menu layering |
| `0432422` `e5df7f2` | Staggered scroll reveal; blur-up placeholders on all 23 images |

## The imagery reversal — the through-line of this session

Commit `8bd95cf` (2026-08-19) redrew eight stock/deck images as SVG diagrams,
on the reasoning that "nothing on the site is copied artwork now." **The client
has now reversed nearly all of it.** Ten more originals came back today, on top
of the five essentials (2026-08-20) and three sports icons (2026-08-28).

When the client asks for an image, they mean **the document's own file**, not
our redraw. Check `word/media/` in the docx first — `scripts/extract-images.py`
maps several image numbers to filenames, and the client's pasted copy is
usually a downscaled screenshot of the docx original, so the docx has more
pixels. Flag the licensing point once; it is their call, and they have made it
eight times.

Established pattern when restoring: delete the superseded SVG from
`public/images/`, leave its block in `scripts/gen-icon-diagrams.py`, and keep an
unplaced *document* image in `images.ts` with a comment (as `heroMatFireplace`
and now `imrsFaunaHorses` do). Only delete files that were our own redraws.

### Trap: a redraw was drawn to fit the slot, the original was not

The redraws were drawn near 4/3 because that is what the media slots are. The
document originals rarely are, and the mismatch is invisible in code:

- **wellness-practices** — redraw 760×560, original 431×473 **portrait**. It
  letterboxed to two thirds of the width and the twelve labels became unreadable.
  Fixed by giving it its own figure (`3a2c096`), capped at **560px** — not the
  container's 1152px, because a 2.7× upscale of a 431px file trades small sharp
  labels for large blurred ones.
- Everything else was padded to an exact 4/3 in the file itself, then rendered
  on `cover`. **Edge-row/column replication** for gradient grounds
  (energetic-vs-tired, stress-gauge), **flat fill** for uniform ones
  (pets-group, show-animals). Never `contain` once padded: TriPanel insets a
  contained image by `p-1`, which draws a thin sand frame that cover-fitted
  neighbours do not have.

### Trap: /_next/image caches per source URL

Correcting an image **in place** serves the old pixels straight back. This cost
real time on `stress-meter.png` — a 2px red sliver was cropped off, the fix
looked like it had not applied, and only renaming to `stress-gauge.png` fixed
it. `essentialWater`'s comment already warned about this after the water-glass
cutout. **Rename on any pixel change to an existing filename.**

## The PEMF wordmark treatment

`components/PemfWord.tsx` owns it. `PEMF_LETTER_TOKENS` is the single source —
`app/page.tsx` imports it rather than keeping its own copy, because "the same
colour scheme as the hero" is the actual requirement.

`HeadingText` colours **every standalone PEMF**, not just a leading one
(`35c6bc1`, for "IMRS prime PEMF" and "Relax with PEMF"). The word boundaries
exclude hyphens: the site writes "PEMF-Extremely low frequency…", and a plain
`\bPEMF\b` would colour four letters and leave "-Extremely" in heading colour.

Three things in that file are load-bearing and should not be "simplified":

1. **The sr-only copy carries the WHOLE heading**, not just the word.
   `verify-site.mjs` strips tags to spaces before looking for each page's
   verbatim phrase, so four one-letter spans turn "PEMF for Pets Health" into
   "P E M F for Pets Health" and the check fails — correctly. Keeping the
   sentence whole restores it as real rendered text instead of loosening a guard.
2. **The non-matching case returns a bare string**, not `<>{text}</>`.
   `verify-jsx-copy.mjs` reads an inline `</>;` followed by more code as a text
   child of `"; return ("` and reports it as invented copy.
3. **`--tc-1` and `--tc-4` were darkened** (`#9E1B1B`→`#941919`,
   `#1F5A2E`→`#1E562C`). They cleared 7:1 on cream, which was all the hero
   needed, and measured **6.52:1 and 6.69:1 on sand**. A heading also lands on
   sand, blush and mist, and on ocean's and spectrum's cooler sands. All four
   letters are now registered against all four grounds in `verify-contrast.mjs`
   (45 pairs per palette, up from 33).

## The first deviation from the document

`Call | Text | WhatsApp` replaced `Call / Text / WhatsApp` in the CTA band and
on /contact, at the client's request. The document prints the slash form eight
times, so this is **the only string on the site that does not match its source**.

It is registered in `ALLOWED_EDITS` in `verify-copy.mjs` next to its reason,
deliberately rather than waved through. The dodge that was **not** taken:
splitting the heading into three one-word text nodes would render pipes without
changing any checked string, because `verify-jsx-copy` only checks nodes of two
words or more — leaving no record anywhere that the site says something the
document does not. If another separator or glyph change is asked for, add it to
`ALLOWED_EDITS`; do not route around the checker.

## Mobile work, and the bug it caused

- **Hero** (`195b040`) — full bleed below `sm`, square corners. `-mx-5` cancels
  the container padding. Width is the only lever for "bigger" at a fixed aspect.
- **Contact bar** (`c467d6e`) — a vertical stack below `md` so the address shows
  and the `·` is not stranded by a wrap. The separator only renders from `md`.
- That forced a second change: the bar is four lines on a phone, so **below `md`
  only the logo-and-Menu row is sticky** and the contact bar scrolls away.
  Pinning the whole block would have held ~40% of an 844px viewport.

**And that caused a bug** (`96ca136`): the language menu was `absolute z-50`,
and the header became `sticky top-0 z-50` — a stacking context in the root at
the *same* index, later in the DOM, so it painted across the middle of the open
menu. The menu is `z-[60]` now. The skip link at `z-100` stays above both.

If anything else gains a `sticky` + `z-index` in that header, re-check the
language menu at 390px. It was reproduced by defaulting the menu's `open` state
to `true` and screenshotting — a useful trick here, since headless Chrome
cannot click.

## New tooling

- **`scripts/gen-blur.mjs`** → `lib/content/blur.ts`. A 12px webp of every
  raster, base64'd, for `next/image`'s `placeholder="blur"`. 47 placeholders,
  ~200 bytes each. Committed rather than built, so `next build` needs no sharp
  and an image swap shows in the diff.
  **Re-run it after adding or replacing any image.** `npm run verify:blur`
  (now the second step of `verify:all`) fails if it is stale — verified by
  tampering, exits 1.
- `blur.ts` had to join `verify-copy`'s skip list beside types/index/images:
  it walks every string in `lib/content/` as client copy and read all 47 data
  URIs as invented prose.
- **Reveal stagger** — `components/RevealOnScroll.tsx` sorts each batch into DOM
  order and reveals 70ms apart, capped at four positions. The delay is a
  `--reveal-delay` custom property, not an inline `transition-delay`, so it
  cannot linger and slow an unrelated transition later.

## Resolved from BREAKPOINT-2026-08-29

- The **long-h1-on-a-phone** open question is moot for the pages that mattered:
  headings now carry the four-colour PEMF but the clamps are unchanged. Still
  unanswered as a question; still do not act on it unprompted.
- Nothing else in that file changed.

## Outstanding

- **/sports-health band redesign** — approved 2026-08-28, groundwork deployed,
  page rebuild never started. Largest unstarted piece. See BREAKPOINT-2026-08-28.
- **Home "PEMF Enhances Athletic Performance" card has cream bars** either side.
  Its icon has an opaque black ground; `PlateCard` has no dark media slot, which
  `PanelGrid` does (`u-plate-media-dark`). Raised with the client twice, never
  picked up.
- **iMRS prime Carefree plus** on /products still uses `items` (bold term +
  description) beside three bulleted panels. Bulleting it means changing how
  `items` renders on /energy, /sleep-health, /mental-health and /pets-health too.
- The **copyright line** "© 2026 PEMF for Holistic Health" stays grey by explicit
  client decision. Do not colour it.
- The organ-function chart's baked-in spelling errors ("Detoffication",
  "Fiter blood") — unchanged, client has not sent a replacement.
- **wellness-practices at phone width** is still small; 350px is all a 390px
  viewport gives a full-width figure. Nothing to do without a better source.

## How to verify anything here

```
npm run build
npx next start -p 3100          # verify:all needs a server
BASE_URL=http://localhost:3100 npm run verify:all
```

`verify:all` now runs contrast → **blur** → themes → copy → jsx → lang → layout
→ site.

**A green build has repeatedly hidden real layout bugs on this site, and did so
again today — three times.** None of these were caught by any checker:

1. A `u-bullets` edit silently deleted the `.u-plate-media-dark` rule, putting a
   sand border around every black-ground image on the site.
2. A 2px red sliver down the edge of the stress-gauge source file.
3. The language menu painted over by the header.

Screenshot at **390, 1024 and 1440**. For headless Chrome:
`--force-prefers-reduced-motion` is required or the reveal leaves the page
blank, and an anchor jump (`/#explore`) lands with the observer unfired and
photographs a blank page — check rendered classes instead.

**Live checks hit stale edge copies.** Several times a change looked
undeployed until re-fetched with `?x=$RANDOM`. Always cache-bust when verifying
production.
