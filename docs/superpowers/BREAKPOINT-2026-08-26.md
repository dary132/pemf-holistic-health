# Breakpoint — Clinical is live on all ten routes, in magenta

**Date:** 2026-08-26
**Branch:** `main` (no worktree — the 2026-08-19 ruling to work on main still stands)
**Local HEAD:** `1149e15` · **origin/main:** `1149e15` · **live site:** `1149e15`
**Live URLs:** https://pemf.darytechnologies.com **and** https://pemf-holistic-health.vercel.app

Supersedes `BREAKPOINT-2026-08-25.md`, which is now wrong in its central claim: it says the
next move belongs to the client and that three directions await a choice. The choice was
made. Read the older one only for the comps-era archaeology and the scrim measurements.

## Read this first: the live URL you did not know about

**`https://pemf.darytechnologies.com` is a working custom domain on the same Vercel project.**
Its HTML is byte-identical to the `.vercel.app` alias, and it is the URL the client actually
checks. Every previous breakpoint names only the Vercel alias, which is why a "the deploy is
live" report and a "I don't see it" reply can both be true at once. Check this domain.

`pemfforholistichealth.com` is still the WordPress site. That gap is unchanged.

## Resume here

Nothing is in flight. The tree is clean and everything is deployed and verified.

The next piece of work is **deleting the two losing comps**, and it needs the client's word
rather than a decision from the code. See "Deleting the losing directions" below.

## What this session shipped

Nine commits, `f9f3af9..1149e15`, all live and verified on production.

| Work | Commit |
|---|---|
| CTA band alignment: centred the visit line, evened the button row | `bd2f0f7` |
| Clinical hero photograph enlarged on desktop | `91cb1b9` |
| **`verify-jsx-copy.mjs` COPY_PROPS inverted to a deny-list** | `db0c09f` |
| Home page adopts the Clinical direction | `d4be8f3` |
| Borders and buttons magenta | `abaf90d` |
| The green areas magenta | `11532ea` |
| Clinical rolled out to the nine inner pages | `b815131` |
| Scroll fade-in for cards and text | `1149e15` |

### The guard hole from the last breakpoint is closed

`COPY_PROPS` was an allow-list; it is now `NON_COPY_PROPS`, a deny-list. Every JSX attribute
value is checked as copy unless explicitly excluded. This was the hard precondition the
2026-08-25 breakpoint set on any roll-out, and it was satisfied before the home page changed.

Proof, not assertion: planting `label="This PEMF mat cures every ailment instantly."` on a
Section in `app/products/page.tsx` makes the current guard fail with file and line, while the
version at `f9f3af9` reports "All JSX copy verbatim" over the same tree.

Two things the inversion required, both of which will look like over-engineering until you
try to undo them:

- **Attributes are matched only inside JSX opening tags**, via a scanner that tracks quote
  state and brace depth. Scanning the whole file for `name="value"` — the obvious way to
  write a deny-list — also matches every TypeScript assignment, so `const base =
  "inline-flex min-h-[56px]…"` in `PhoneButton.tsx` gets checked as client copy and fails.
- **`maskIframeTitleAttr` blanks the whole attribute, not just the name.** Blanking the name
  sufficed under an allow-list, where an unrecognised name was ignored. Under a deny-list an
  unrecognised name is *checked*, so masking only the name hands the iframe's accessibility
  label straight to the checker.

Comments are also stripped before extraction, offsets preserved. The bare `>` and bracketed
tag names that bit this project twice no longer parse as markup. `PlateCard.tsx` lost the ten
lines that existed only to explain how to word a comment, and its comment now uses both a
bare `>` and `<Section>` — the exact pair that used to fail the build.

## The palette is magenta now, and the shade was not a free choice

`--sage` (historically "primary dark") and `--rule` are both `#96005A`, alongside a dedicated
`--button` token at the same value.

**Do not "restore" a brighter magenta.** The site holds every text pair to WCAG AAA (7:1)
because the audience is elderly, and that floor rules out the obvious candidates:

| | on `--cream` | verdict |
|---|---|---|
| `#FF00FF` pure magenta | 2.91:1 | unusable |
| `#C2185B` | 5.45:1 | fails |
| `#AD1457` | 6.47:1 | fails |
| **`#96005A`** | **7.97:1** | the brightest that passes |

`--button` on `--sand` is **7.01:1 against a 7.00 floor** — one hundredth of margin. Those
pairs are registered in `verify-contrast.mjs` precisely so that a future nudge to `--sand`
fails the build instead of silently voiding the AAA claim. 23 pairs pass in all four palettes.

**Why buttons have their own token.** `--sage` drives every h1/h2/h3, the sticky contact bar
and `--band`; `--clay` drives the hero tagline, eyebrows, breadcrumbs, header phone numbers
and footer links. Repointing either at magenta turns all of that magenta as a side effect.
The client asked for borders and buttons first, then the green areas, and the token split is
what let those be two separate decisions.

**`PhoneButton` has an `inverse` variant and it is load-bearing.** Once `--band` became the
button's own colour, the solid button on the CTA panel measured **1.00:1** against it —
invisible. The deeper `--button-hover` only reaches 1.19:1. White fill with a magenta label
separates at 8.59:1 and keeps the label AAA. Use `variant="inverse"` anywhere this button
sits on a `--band` surface.

## The scroll fade-in, and the four things that must not be simplified away

`components/RevealOnScroll.tsx`, plus `.js-reveal` armed by the pre-paint script in
`app/layout.tsx`.

1. **Nothing is hidden in the markup.** The hiding rule needs `.js-reveal` on `<html>`, which
   only the pre-paint script adds. No JavaScript, a blocked bundle, or a crawler all get the
   fully visible page. On a site whose client cites FDA exposure, hiding copy behind an
   animation that might not run is not an acceptable trade — and it would hide the text from
   search engines too.
2. **The whole rule lives inside `prefers-reduced-motion: no-preference`.** Anyone who asked
   for stillness never has content hidden from them at all.
3. **A 4s failsafe.** If the inline script runs but the bundle never executes, `.js-reveal`
   would stay on and leave the page blank below the fold — worse than no animation. The
   pre-paint script arms a timer that removes the class; `RevealOnScroll` clears it to say it
   arrived. Both statements sit *outside* the theme script's `try`, so a localStorage throw
   cannot take the reveal down with it.
4. **The LCP element is never marked.** A `priority` Figure and the home hero are excluded;
   starting the largest element at `opacity: 0` pushes Largest Contentful Paint out by the
   length of the fade.

`RevealOnScroll` re-runs on `pathname` change. It is mounted once in the root layout, so a
client-side navigation swaps the DOM underneath it without remounting — **remove that
dependency and every route after the first stays hidden.**

Measured on `/pemf` at 1440 via CDP, and re-run against production after deploy:

    with JS         8 of 9 marked elements hidden, 0 after scrolling
    JS disabled     all 9 visible, .js-reveal absent
    reduced motion  all 9 visible, nothing hidden
    bundle blocked  .js-reveal removed by the failsafe at ~4s
    client-side nav to /products: 28 marked, all revealed after scrolling

## How the roll-out was actually done

Not by rewriting nine page files. `PanelGrid` — used by eight of the nine — has rendered
`u-plate` panels all along, so most inner pages were already Clinical. What differed were
three shared shells still on the old soft `rounded-3xl … shadow-sm` card: `SplitBand`,
`Figure` and `FrequencyCard`. All three moved to `u-plate`.

**Changing shells rather than pages meant no copy string moved**, so `verify:copy` and
`verify:jsx` never had to consider the change. Prefer this shape for any future re-skin.

`CredentialStrip` and `PlateCard` were promoted out of `components/designs/clinical/` into
`components/` in `d4be8f3`. Leaving them there would have made the losing-comp deletion
recipe silently break the home page.

## Deleting the losing directions — needs the client, not the code

Editorial and Photographic are the losing comps. All three `/designs*` routes are still live
and still `noindex, nofollow`; the sitemap contains zero `designs` matches.

They are still the only record of the alternatives, so **do not delete them without asking.**
When the client says so:

    rm -rf app/designs/<name> components/designs/<name>

plus that comp's entry in `COMP_ROUTES` in `scripts/verify-layout.mjs` and in `DIRECTIONS` in
`app/designs/page.tsx`. When all three go, also drop `join("app", "designs", "page.tsx")`
from `NOT_SITE_COPY` in `scripts/verify-jsx-copy.mjs` and the `/designs` link in
`app/themes/page.tsx`. `screenshot.mjs` and `verify-layout.mjs` both reach the comp routes
through `COMP_ROUTES`, so that one list is the single edit point.

## Decisions taken without the client, carried forward

- **The stacked hero the client explicitly asked for is gone.** Wordmark, expansion,
  full-width photograph band, then question and buttons — that order was a recorded request,
  and Clinical's two-column hero supersedes it. Overridden deliberately, because the client
  chose Clinical seeing all three side by side. If they want the full-width band back, that
  is Photographic's hero, not a tweak to this one.
- **The `holisticFlower` diagram no longer renders on any live route.** Clinical's approach
  section is three text plates with no image, and the home page was its only real-route
  appearance. It still exists in `lib/content/images.ts` and in the two remaining comps.
  Reinstating it is a design decision, not an oversight to fix quietly.
- **The hero photograph is upscaled further than before.** The source is 721×338 and it now
  renders at 773 CSS px, so roughly 2.14× on a high-density screen where it was 1.75×. It
  will read softer. `imrs-model-3.png` (1000×563) would be 1.55×, but the standing ruling is
  not to swap it in.
- **The hero could not reach the +25% asked for.** It is +22.5%. The text column's
  min-content width is 540px, set by the unbreakable "PEMF" wordmark glyphs, and at 1440 the
  grid already spans 1425 of 1440 available pixels. The last 2.5% costs either a ~20px
  gutter or a smaller wordmark.
- **The `Card` export in `components/Card.tsx` is dead code.** Only `FrequencyCard` is
  imported, by `/products`. Flagged rather than removed; deleting an export is its own call.
- **Only the default palette's `--rule` went magenta.** Ocean, Sunrise and Spectrum each
  define their own and are internal review tooling.

## Traps in this repo — carried forward, with three more confirmed

All of the 2026-08-25 list still holds. Still true and still expensive:

- Headless screenshots need `--virtual-time-budget=4000` **and** a fresh `--user-data-dir`.
- Vercel's CDN serves the previous deploy to an un-cache-busted request. Poll with
  `?cb=$(date +%s%N)`.
- A freshly-pushed route can 404 on one edge node while serving 200 on another. Re-probe
  before chasing it.
- The four palettes are measurably indistinguishable and this is settled. Never offer
  `/themes` to the client as a way to show "different looks".
- Comments before the root element of a `return` get extracted as page copy. **The bare `>`
  and bracketed-tag-name half of this is now fixed** (`db0c09f`).

New today:

- **`pkill -f <pattern>` kills the Bash tool's own wrapper shell.** The wrapper's cmdline
  contains the entire script you submitted, so any pattern that appears anywhere in your
  command matches it — the `[b]racket` trick does not save you, because the unbracketed
  spelling is still present elsewhere in the same script. Kill by PID, or start the next
  process on a different port instead.
- **Chrome's `naturalWidth` is not the resource's pixel width when `srcset` uses `w`
  descriptors.** It is divided by the chosen candidate's effective density, so a 721px image
  reports 596 at DPR 1 and 335 at DPR 2. Do not conclude the optimizer is downscaling; `curl`
  the variant and read the real header.
- **`verify:themes` guards `lib/themes.ts`, which hardcodes the palette picker's swatches.**
  Changing `--sage` in `globals.css` without updating that file fails the build — correctly:
  the picker would otherwise show a green chip for a magenta palette. Two other `#2F4A37`
  occurrences are self-test fixtures inside the verifiers and must be left alone.

## Still needing the client, not code

Carried forward, none resolved:

- **`areaServed`** — "Orange County, California" is published to Google in
  `localBusinessSchema` (`lib/seo.ts`) and appears zero times in the client's document.
- **`site.deviceNote`** — protective language not in the 2026 document; deliberately not
  deleted, still unsigned-off.
- **Hero photography** — one lifestyle image at 721px, now upscaled further. Real photography
  is the only fix.
- **The custom domain `pemfforholistichealth.com`** still serves WordPress, at colliding
  slugs (`/pemf/`, `/energy/`, `/contact-login/`). `/contact-login/` has no equivalent here
  and would begin 404ing on a cutover. Audit before moving DNS.
- **`site.url` and `metadataBase`** still hardcode `https://pemfforholistichealth.com`, so
  every canonical, the sitemap and all JSON-LD point at the WordPress site rather than at
  either live URL. Worth fixing or consciously accepting.
- **New: the two losing comps.** See above.
- **New: green survives in two places by design.** The technicolor PEMF wordmark keeps its
  green stop (it is a seven-colour spectrum; recolouring one stop breaks it), and the green
  inside the illustrations — the battery, the figure, the Earth's-field diagram, the
  Physical and Emotional dots — is baked into the image files. No stylesheet can reach it.
  Changing those means commissioning new artwork.

## Environment notes

- Verifier scripts run under `node --experimental-strip-types` and import `../lib/routes.ts`
  with an explicit `.ts` extension. Match that pattern.
- Full suite: `npm run verify:all` — contrast, themes, copy, jsx, layout, site.
  `verify:layout` and `verify` need a server (local or `BASE_URL=<live>`); the other four
  do not.
- `npm run verify:jsx -- --self-test` is now 26 cases. `npm run verify:contrast -- --self-test`
  and `npm run verify:themes -- --self-test` also exist. Use them when touching a guard.
- `npm run shots` covers all ten routes plus the comp routes at three viewports.
- `?theme=ocean|sunrise|spectrum|` on any URL applies a palette and makes it stick.
- The source `Website Exiga Jasmin 2026.docx` is untracked and gitignored; `npm run
  extract:doc` needs it and it is not recoverable from a clean clone.
- **Deploys are `git push origin main` and nothing else.** Vercel is wired to the GitHub repo
  (`github.com/dary132/pemf-holistic-health`); there is no `.vercel/` directory and the CLI
  is not to be used. Confirm a deploy landed with
  `gh api repos/dary132/pemf-holistic-health/deployments` — a healthy one is created by
  `vercel[bot]` with `sha` equal to the commit just pushed.
