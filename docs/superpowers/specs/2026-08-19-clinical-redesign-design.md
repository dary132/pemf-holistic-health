# Design: upscale clinical redesign

**Date:** 2026-08-19
**Status:** proposed, awaiting review
**Scope:** layout and surface treatment across all ten routes. Palette, typeface choices,
and all copy stay as they are.

## Goal

The client's words: it should look like *an upscale clinical website that people can
trust*. The audience is elderly and deciding whether to trust a health service, so
"trustworthy" outranks "striking" wherever the two pull apart.

## What is already right, and stays

Worth stating so it does not get "improved" away:

- **Base type is 19px, rising to 20px above 640px** (`app/globals.css`). This is the single
  highest-impact legibility decision on the site for an elderly audience. It does not shrink.
- **The palette is AAA-verified** and enforced by `scripts/verify-contrast.mjs`, including a
  darkened `--clay` (#763A1D) chosen specifically to clear 7:1 on `--sand`.
- **48px minimum tap targets** throughout.
- **All copy**, which is locked verbatim (see Constraints).
- The ten routes, the redirects, and the SEO layer.

## Diagnosis

Read from the components, not from impressions:

1. **Card soup.** Every panel is a white `rounded-3xl` block floating on cream or sand with
   no border. White-on-cream without an edge reads cheap. The `--rule` token (#E2D5BF)
   already exists in `globals.css` and is almost entirely unused.
2. **No type scale.** `Section.tsx` renders both `h1` and `h2` at `text-3xl sm:text-4xl`. A
   page title and its subsections are the same size, so nothing announces itself.
3. **One spacing value.** Every section is `py-14 sm:py-16`. Uniform padding gives the eye no
   cue about what groups with what.
4. **Ragged card heights.** `TriPanel` lets each card size to its own content, so a text-only
   card floats beside a tall one. This is the lumpiness visible on `/pemf`.
5. **Band alternation used as decoration.** Cream/sand alternates every section regardless of
   whether adjacent sections are related.
6. **The hero is not a hero.** The headline occupies a half-width text block on flat cream and
   the main photograph sits in a separate band below it. Nothing anchors the top of the page.

## Constraints

**Copy is locked.** Every visible string must already appear in
`docs/exiga-jasmin-2026.txt` or `docs/exiga-jasmin-2026-image-text.txt`, or the build fails
(`verify:copy`, `verify:jsx`). The client cites FDA exposure. **This design introduces no new
words.** The credibility strip below is buildable only because these strings already exist
verbatim:

- "Certified PEMF Expert Sharon"
- "Office and Home Visits Available"
- "22706 Aspan St, Suite 504" / "Lake Forest, CA 92630"
- "(949) 600 7899"

Anything else that should be said on the page has to come from the client.

Other standing constraints: WCAG AAA contrast, 48px targets, no hover-only navigation, no
YouTube.

## Decisions

### 1. Type scale

Today's scale is compressed. Introduce distinct steps so hierarchy is visible at a glance.
Values are in `rem` against the 19–20px root, so they inherit the accessibility decision.

| Role | Size |
|---|---|
| Display (hero h1) | `clamp(2.5rem, 5vw, 3.75rem)` |
| Page title (interior h1) | `clamp(2.125rem, 4vw, 2.75rem)` |
| Section heading (h2) | `clamp(1.75rem, 3vw, 2.125rem)` |
| Panel heading (h3) | `1.25rem` |
| Lead paragraph | `1.15rem` |
| Body | `1rem` (19–20px, unchanged) |
| Eyebrow / meta | `0.8rem`, uppercase, tracked |

Body line length caps at 65ch.

### 2. Spacing scale

Replace the single `py-14 sm:py-16` with three section rhythms, chosen per section rather
than applied uniformly:

- `compact` — `py-10`, for strips and closely-related runs
- `normal` — `py-16 sm:py-20`, the default
- `spacious` — `py-24 sm:py-32`, for a page's opening and its closing CTA

### 3. Surfaces — bordered plates

The chosen direction. Precision over softness.

- Plate: `bg-white`, `1px solid var(--rule)`, radius `12px`, padding `1.5rem`. **No shadow.**
- Image slot inside a plate: `bg-sand`, radius `8px`, **fixed `aspect-[4/3]`**.
  - `Img.contain` (diagrams) → `object-contain` with inner padding.
  - Photographs → `object-cover`.
- The fixed aspect ratio is what fixes finding 4: every card's image occupies identical
  height, so the text baselines below them align across the row.

`--rule` is a border colour only. It is never a text colour and never a fill behind text, so
it stays outside the contrast verifier's remit — the same rule that already governs
`--sage-soft` and `--clay-soft`.

### 4. Hero

Split, as chosen:

- Two columns above 1024px. Left: eyebrow, display h1, lead, two CTAs, on solid cream.
  Right: photograph bleeding to the viewport's right edge, `object-cover`, min-height `34rem`.
- **Text never sits on the image**, so AAA is structural rather than something to re-check
  per image.
- Below 1024px it stacks: text, then photo at `aspect-[16/10]`.
- Hero image: `images.imrsModel3` (the client's own photo of the mat in use).

### 5. Credibility strip

Directly beneath the hero. This is the element that does the most work for "trustworthy",
and it is built entirely from strings that already exist:

- `bg-sand`, hairline rule top and bottom, `compact` rhythm.
- Four items: "Certified PEMF Expert Sharon" · "Office and Home Visits Available" ·
  the address · the phone as a `tel:` link at 48px.
- Wraps to two rows on phones; never becomes a hover-only or truncated element.

### 6. Section templates

Four, replacing today's improvised mix. Every page composes from these.

| Template | Use |
|---|---|
| `Section` | prose, with optional eyebrow and lead |
| `SplitBand` | text beside one framed visual, alternating sides |
| `PanelGrid` | equal-height plates on a strict grid (replaces `TriPanel`'s ragged behaviour) |
| `Figure` | one full-width visual with caption |

`PanelGrid` uses `items-stretch` with each plate a flex column: fixed image slot, heading,
then text that grows. A panel with no image renders the slot as empty space of the same
height rather than collapsing, so the row stays aligned.

**`PanelGrid` must keep `TriPanel`'s `panelTitleAs` prop.** It exists because a page that
places the component directly under its `<Section titleAs="h1" />` with no `heading` of its
own has nothing at `h2`, so panel titles must render as `h2` or the page skips a level
(`h1 → h3`). `/energy`, `/mental-health` and `/pets-health` all depend on it. Dropping the
prop during the rewrite silently reintroduces an accessibility regression that no gate
currently catches — the heading-order check is a manual DOM dump, not part of `verify:all`.

### 7. Band rhythm

Stop alternating per section. Cream is the default ground. Sand groups genuinely related
sections. Sage is reserved for the closing CTA so that it reads as the one call to action on
the page rather than as one more stripe.

### 8. The heading-colour trap

`app/globals.css` sets `h1, h2, h3 { color: var(--sage) }` inside `@layer base`. That layer
placement is load-bearing: it is what lets a `text-white` utility on a heading win inside a
sage band. An earlier un-layered version of the same rule rendered the CTA heading
sage-on-sage — invisible — on nine pages.

Two things follow for this work. **The type-scale changes must stay inside `@layer base`.**
And any heading this redesign places on a dark band needs an explicit colour utility, because
`verify:contrast` checks declared token pairs, not what the cascade actually produces. That
gap is unchanged by this design; the screenshot pass is the only thing that catches it.

### 9. Disclaimer

Currently a full-width sage slab, which gives a legal notice the same visual weight as the
call to action. Restyle as a quiet note: cream ground, hairline rule above, `--ink-soft`
text, constrained to prose width, `compact` rhythm.

It stays fully legible and AAA. The text itself is untouched — note that `site.deviceNote`
is still pending client sign-off and this design does not resolve that.

## Files affected

- `app/globals.css` — type scale, spacing scale, plate utilities
- `components/Section.tsx` — heading sizes by level, spacing prop
- `components/TriPanel.tsx` — becomes `PanelGrid`, equal heights, fixed image slot
- `components/Card.tsx`, `SplitBand.tsx`, `Figure.tsx` — plate treatment
- `components/Disclaimer.tsx` — quiet treatment
- `components/Header.tsx` — nav rule, active state; the sage utility bar stays (it is a
  credibility signal)
- **New:** `components/Hero.tsx`, `components/TrustStrip.tsx`
- All ten `app/**/page.tsx` — compose from the four templates, assign spacing rhythms

## Verification

Every change is gated by the existing suite, plus a visual pass. A green build has
repeatedly hidden real layout bugs on this site, so screenshots are required, not optional.

1. `npm run verify:all` — contrast AAA, copy verbatim, JSX copy verbatim, routes and
   redirects. **`verify:jsx` now scans `components/`**, so the two new components are
   covered from the moment they exist.
2. `npx tsc --noEmit` and `npm run build`.
3. `npm run shots` at 1440px, 390px, and 720px-at-200%; read the output.
4. Heading order dumped per route — no level skips.
5. Tap targets: every interactive element ≥48px.

Known harness limitation: `npm run shots` uses one-shot capture with no scroll, so
lazy-loaded content (the `/contact` map iframe) renders blank. That is a harness artifact,
not a regression.

## Out of scope

- Palette and typeface changes.
- Any copy change.
- `areaServed` and `site.deviceNote` — both need the client, not a design decision.
- The custom domain still pointing at WordPress.

## Open questions

1. **Hero photograph.** The design assumes `images.imrsModel3`. If the client has better
   photography of the actual office or of Sharon, it would outperform any stock or product
   image for trust. Worth asking before build.
2. **Photograph consistency.** The remaining product photographs vary in background and
   crop. Plates will contain them, but they will not become a matched set without either
   re-shooting or a background treatment pass. Flagged, not solved here.
