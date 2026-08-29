# BREAKPOINT — 2026-08-28 (evening)

Supersedes BREAKPOINT-2026-08-26 as the resume point. Read that one afterwards
for the Clinical roll-out state, the settled palette rulings, and the older
traps — everything in it still stands except where this file says otherwise.

## Where we stopped

Mid-way through an approved redesign of **/sports-health**. The tree is clean
and everything below is deployed; the remaining work is listed under "Next
steps" and has NOT been started.

## What the client asked for (this session, in order)

1. Use the Exiga Jasmin doc's own images for the three "PEMF Boosts Sports
   Performance and Endurance" tiles — DONE, deployed `e65de54`.
2. Keep the actual images, make the page adapt to them, and vary the page's
   section colouring — DONE, deployed `e868b19`:
   - `dark: true` on Img → `.u-plate-media-dark` paints the 4:3 slot the
     icons' own background pixel `#000001` so they read edge-to-edge.
   - `tinted` boolean on Section/PanelGrid/SplitBand/Figure replaced by
     `tone?: "sand" | "blush" | "mist"` (lib/tones.ts). New grounds
     `--blush #F7E9F1`, `--mist #E4ECF2`; every text token registered against
     both in verify-contrast.mjs (worst pair `--button` on `--mist` 7.19:1).
     Tones assigned across all ten pages: mist = calm/technical,
     blush = vitality; clinical comp keeps `tone="sand"` as approved record.
3. **Images larger still, and the client dislikes the bordered cards** — this
   is the work in flight.

## Decisions already made for step 3 (user approved via option picker)

- **Layout: alternating full-width bands.** Each of the three boosts items
  becomes a band — large image (~55% of content width, ~600px) beside its
  title + paragraph, sides alternating. The athletic section gets the same
  treatment: big brainwave graphic beside its two paragraphs.
- **Scope: /sports-health first**, show the client, roll out to other pages
  only after approval (same play as the Clinical roll-out).
- **Upscale quality is settled:** the doc icons are 210–230px, but they are
  flat art and survive 3× Lanczos/browser upscaling cleanly (tested visually
  on performance.png). Rendering at ~600px CSS width is fine. Ship the
  original files; no derived upscaled assets.

## What is already built for step 3 — deployed `cc6da33`, changes nothing visually

`components/SplitBand.tsx` gained three additive props (defaults preserve old
behaviour; no call site uses them yet):

- `heading?: string` — section-level h2 inside the band block (as PanelGrid).
- `titleAs?: "h2" | "h3"` — "h3" for bands nesting under a section heading.
- `frame?: "plate" | "open"` — "open" drops the bordered u-plate; the image
  sits directly on the band ground with `rounded-2xl`. This is the
  de-carding device.

`"frame"` is already in verify-jsx-copy's `NON_COPY_PROPS`.

## Next steps (none started)

1. **Reshape `lib/content/sports-health.ts`** to match the band layout —
   strings stay VERBATIM, only the container shapes change:
   - `athletic = { heading, image: images.brainwaveEntrainment, paragraphs: [p1, p2] }`
   - `boosts = { heading, bands: [{ title, image, paragraphs }, ×3] }`
2. **Rebuild `app/sports-health/page.tsx`:**
   - Breadcrumbs + `<Section id="sports-health" title titleAs="h1" />` unchanged.
   - Athletic: one `SplitBand` with `heading={athletic.heading}`,
     `tone="mist"`, `frame="open"`, `reverse` (text left, image right).
   - Boosts: three `SplitBand`s, `frame="open"`, `titleAs="h3"`; the FIRST
     carries `heading={boosts.heading}`; `reverse={i % 2 === 1}`; middle band
     `tone="mist"`, outer two cream. Planned page rhythm top to bottom:
     cream h1 → mist athletic → cream heading+band1 → mist band2 →
     cream band3 → magenta CTA → sand disclaimer.
   - PanelGrid import goes away from this page.
3. **Verify + screenshot** (see traps): `npx tsc --noEmit`, `npm run build`,
   `npm run start` in background, `npm run verify:all`, screenshot at 1440
   and 390 with `--force-prefers-reduced-motion` (reveal animation otherwise
   captures mid-fade), eyeball the bands, kill the server (see trap below).
4. **Commit, push** (push IS the deploy), update the memory status file.
5. **Offer the client the roll-out** of the open-band style to the other
   pages; do not start it unasked.

## Traps confirmed this session

- **verify-jsx-copy cannot parse JSX held in a `const`.** The tag scanner
  reads the code between two top-level JSX elements as a text child and fails
  with garbage like `"); return ("`. Keep elements inline in the return;
  toggle wrappers by className, not by ternary-ing two JSX trees.
- **A new string-valued component prop fails verify:jsx until added to
  `NON_COPY_PROPS`** in scripts/verify-jsx-copy.mjs. That is the deny-list
  working as designed. `tone` and `frame` are already in.
- **`pkill -f "next-server"` (or any pkill whose pattern appears in the shell
  command) kills the Bash tool's own shell** — exit 144, command aborted.
  Find the PID with `ss -tlnp | grep 3000` and `kill <pid>` instead. (The
  2026-08-26 trap about the `npx next start` wrapper leaving `next-server`
  alive also still holds.)
- **Headless screenshots catch the reveal animation mid-fade**; add
  `--force-prefers-reduced-motion` for judging final rendering.

## Commits this session (all deployed)

- `e65de54` — doc's own sports icons in place of the SVG redraws
- `e868b19` — dark media slots; blush/mist grounds; tinted → tone
- `cc6da33` — SplitBand heading/titleAs/frame groundwork (no visual change)
