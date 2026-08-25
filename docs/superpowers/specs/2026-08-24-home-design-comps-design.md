# Design: three home-page design comps

**Date:** 2026-08-24
**Status:** proposed, awaiting review
**Scope:** three alternative home-page compositions, each on its own route under
`/designs`. The ten real routes are not touched. Palettes, copy, typefaces and the
content layer stay exactly as they are.

## Goal

The client asked for "additional color and emphasis" and was shown four palettes at
`/themes` (commit f559cd5). The follow-up ask is for *page designs versus palettes*: they
want to see structurally different pages, not the same page in different colours.

The output of this work is **a decision**, not a shipped redesign. Three home pages, three
directions, one gets picked, the other two get deleted. Everything below is shaped by that:
the comps must be different enough to choose between and cheap enough to throw away.

## What is already right, and stays

Stated so it does not get "improved" away while chasing a new look:

- **Base type is 19px, rising to 20px above 640px.** The single highest-impact legibility
  decision on the site for an elderly audience. No comp shrinks it.
- **AAA (7:1) contrast**, enforced across all four palettes by `scripts/verify-contrast.mjs`
  (72 pairs, worst 7.16:1). No comp relaxes this. See "Text over images" below for the one
  place it gets hard.
- **56px minimum tap targets** on every call to action.
- **All copy**, locked verbatim (see Constraints).
- **The content layer.** Every comp imports the same `lib/content/home.ts`. A copy fix lands
  in one file and reaches all three.
- The four palettes and the `/themes` picker, which keep working on top of every comp.

## Constraints

**Copy is locked, and this is the constraint that shapes the designs most.** Every visible
string must already appear in `docs/exiga-jasmin-2026.txt` or
`docs/exiga-jasmin-2026-image-text.txt`, or `verify:copy` and `verify:jsx` fail the build.
The client cites FDA exposure. **No comp introduces a single new word.**

This rules out the usual comp furniture — no invented taglines, no "Why choose us", no
made-up testimonials, no section labels that are not already in the document. Verified
present, and therefore usable:

- "Certified PEMF Expert Sharon"
- "Office and Home Visits Available" — the document sets this on two lines, "Office and
  Home" / "Visits Available". The joined single-line form was run through `checkString`
  against the real haystack and is accepted, because `normalise()` collapses the newline to a
  space before matching. Recorded here so the credential strip is not redesigned around a
  constraint that does not exist.
- "PEMF is a holistic approach to promote a state of total wellness." (accepted)
- "Air, food, water, sunshine and Earth's Magnetic Field Energy are natural essentials for
  human health."
- The address, the office number and the WhatsApp number (`lib/site.ts`)

Purely numeric chrome (`01`, `02`) is safe: `verify-jsx-copy.mjs` only checks text nodes with
at least two words and at least one letter, so bare numerals are skipped by design rather
than by luck.

**Other standing constraints:** exactly one `h1` per page and no skipped heading levels
(`verify:layout`); no hover-only navigation; 14 committed SVG diagrams carry the sage and
clay hexes internally and will not follow a palette (see Known gaps).

## Approach

**One route per comp, sharing the content layer.**

    app/designs/page.tsx               index: three cards, one per direction
    app/designs/editorial/page.tsx
    app/designs/clinical/page.tsx
    app/designs/photographic/page.tsx

Each page file is a plain composition importing `lib/content/home.ts` and `lib/content/images.ts`.
New layout pieces live in `components/designs/` and are imported only by their own comp.

Two alternatives were considered and rejected:

- **A `data-design` attribute, CSS only** — the same mechanism as the theme switcher. Rejected
  because genuinely different layouts need different markup: a pull quote that exists in one
  direction and not another, a different hero structure, a different section order. CSS-only
  means shipping all three markups and hiding two. Bloated, and it makes each design harder to
  read rather than easier.
- **A config-driven single page with variant components** — rejected because every design
  difference becomes a conditional inside a shared component, and the two losing directions
  then have to be unpicked from that shared code rather than deleted.

Three plain files is the option where choosing one means `rm -rf` on the other two.

## The three directions

Each opens in a recommended palette by linking with `?theme=`, which the existing pre-paint
script already honours and persists. The `/themes` picker keeps working, so any comp can be
seen in any palette.

### 1. Editorial — the current site pushed much further

Recommended palette: Sage & Clay (the default).

- **Hero:** wordmark hard left at display size, not centred. The expansion sits beneath it as
  a tracked kicker. The photograph bleeds off the right edge of the viewport rather than
  sitting in a contained band.
- **Sections:** wide outer margins, hairline `--rule` dividers, sections numbered `01 / 02 /
  03` in the margin.
- **Pull quote:** "PEMF is a holistic approach to promote a state of total wellness." set at
  display size between sections. This sentence already appears in the Holistic Approach body,
  so it is a deliberate repetition — an editorial device, not new copy. Flagged here because it
  will read as duplication if the client is not expecting it.
- **Cards:** borderless. Image, hairline rule, title, body, in two columns with wide gutters.
- **Reads as:** premium, calm, considered. The lowest-risk direction and the smallest
  departure from what is live.

### 2. Clinical — the biggest departure

Recommended palette: Deep Ocean.

- **Hero:** two columns. Wordmark, expansion, opening question and both calls to action on the
  left; the photograph in a bordered `u-plate` on the right.
- **Credential strip:** immediately beneath the hero, a bordered row — "Certified PEMF Expert
  Sharon" · "Office and Home Visits Available" · the Lake Forest address. All three strings are
  verified present in the document. This is the direction's whole argument: it front-loads the
  reasons to trust the practice.
- **Sections:** bordered plates on a tinted ground, consistent rhythm, no full-bleed anything.
- **Cards:** three-column, bordered, each with a coloured top rule. Under Vital Spectrum those
  rules walk the seven wordmark colours.
- **Reads as:** organised, credible, information-forward. Most different from the current
  site, and the direction that best serves an elderly visitor deciding whether to trust a
  health service.

### 3. Photographic — the most emotive, and the riskiest

Recommended palette: Sunrise Warmth.

- **Hero:** full-bleed photograph with the wordmark overlaid on a scrim; opening copy centred
  in a narrow column beneath.
- **Sections:** alternating full-bleed image bands with text blocks overlapping into them.
- **Cards:** large images, generous radius, text below, two columns.
- **Reads as:** warm, aspirational, wellness-brand.

**This direction is undersold by the assets that exist and the client must be told so before
they choose it.** The site has exactly one lifestyle photograph — the fireplace shot, already
soft at hero size because the document's copy is 721px wide — plus product shots on plain
backgrounds and 14 SVG diagrams. A full-bleed photographic design needs several large, high
quality lifestyle images. The comp will reuse the one photograph and lean on product shots,
which will make the direction look weaker than it would be if properly resourced. Choosing it
commits the client to sourcing photography.

## Text over images

The overlaid wordmark in the Photographic direction is the only place AAA is genuinely hard:
contrast has to hold against whatever pixels happen to sit behind each letter, and the
fireplace photograph runs from near-black to bright cream within the frame.

The scrim will therefore be a solid-enough overlay to guarantee the floor, not a tasteful 30%
wash — closer to 55-65% of the palette's `--ink` over the image. It will look heavier than a
typical hero overlay. That is a deliberate trade and the client should see it as such rather
than as a rendering mistake.

`verify-contrast.mjs` cannot check this: it reasons about token pairs, not pixels. The scrim
value will be derived by computing the ratio against the darkest and lightest pixels the
wordmark actually overlaps, and that figure recorded in a comment beside it.

## Verification

Every comp must pass the existing suite unchanged:

- `verify:contrast` — all four palettes, 72 pairs, AAA
- `verify:themes` — picker and stylesheet agree
- `verify:copy` / `verify:jsx` — no invented copy
- `verify:layout` — one `h1`, no skipped levels

`verify:layout` iterates `lib/routes.ts`, which will not contain the comp routes, so the
comps are outside its reach. **`scripts/verify-layout.mjs` will be extended to also check the
`/designs` routes**, since a comp with two `h1`s is exactly the kind of error these
compositions invite and exactly what the client will not notice.

Beyond the suite: each comp screenshotted at desktop and phone, in its recommended palette
and in at least one other, before it is called done.

## Routing and exposure

`/designs` and its children stay out of `lib/routes.ts`, which is the single source for the
nav, `sitemap.xml` and `verify-site.mjs`. Each carries `robots: noindex, nofollow`. The only
way in is the link — the same arrangement `/themes` already uses and which is verified live.

The `/designs` index links to all three, and `/themes` gains a link to `/designs` so the
client has one entry point rather than two.

## Known gaps

- **The 14 SVG diagrams stay green in every palette and every comp.** They load through
  `next/image` as files and cannot inherit page CSS. Recolouring them means inlining them as
  React components — worth doing once a direction is chosen, wasted before then.
- **The hero photograph is 721px** and upscales roughly 2x at hero width. It affects all three
  comps and hurts Photographic most.
- **Comps cover the home page only.** A direction that works on a hero can still fall apart on
  a page with three cards and a jump nav (`/mental-health` is the stress case). This is a known
  and accepted risk of comping one page; the roll-out is where it would surface.

## Out of scope

Rolling the winner across the other nine routes. That is the next piece of work and gets its
own spec once a direction is chosen.
