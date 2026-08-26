# Breakpoint — three comps live, waiting on the client

**Date:** 2026-08-25
**Branch:** `main` (no worktree — the 2026-08-19 ruling to work on main still stands)
**Local HEAD:** `f9f3af9` · **origin/main:** `f9f3af9` · **live site:** `f9f3af9`
**Live URL:** https://pemf-holistic-health.vercel.app

Supersedes `BREAKPOINT-2026-08-24.md`. Everything that document listed as in flight is now
built, reviewed, pushed and verified on production. Read the older one only for the
palette-era archaeology.

## Resume here

Nothing is in flight. **The next move belongs to the client, not to the code.**

> Sharon has three home-page directions to choose between at
> https://pemf-holistic-health.vercel.app/designs and has not chosen yet. Send her
> `docs/superpowers/COMPS-FOR-CLIENT.md` with the links — it carries the three caveats she
> must hear *before* choosing rather than discover after. When she picks one, the next
> piece of work is rolling that direction across the other nine routes, which the comps
> spec explicitly puts out of scope and says gets its own spec.

**Before that roll-out spec is written, read "The guard hole that must be closed first"
below.** It is a precondition, not a nice-to-have.

## What is live and finished

All deployed, verified against the live URL, and needing nothing:

| Work | Commits | State |
|---|---|---|
| Visit CTA on all ten pages (address, "Office and Home Visits Available", Get Directions) | `22f3bfa` | live, verified |
| Home hero's second button → `Visit Us` → `/contact` | `22f3bfa` | live, verified |
| `Disclaimer` moved off the colour band onto `--sand` | `22f3bfa` | live, verified |
| `npm run lint` un-poisoned (704 errors → silent) | `b793436` | done |
| Design-comps spec amended for the shipped CTA | `985ccf0` | done |
| Implementation plan for the three comps | `b27b257`, `80ae404` | done |
| `/designs` index + layout guard extended to reach it | `3049e65` | live, `noindex` |
| Editorial comp | `4f554c0`, `e9cdd9f` | live, `noindex` |
| Clinical comp | `ef35d6c` | live, `noindex` |
| Photographic comp | `ac183e4`, `ca158bc`, `8f5b7a7` | live, `noindex` |
| Client hand-off note | `58f64d6`, `3e7b575` | done |
| `/themes` → `/designs` cross-link | `faea363` | live |
| Copy-guard blind spot closed (`text` prop) | `867246a` | done |
| `screenshot.mjs` extended to the comp routes | `f9f3af9` | done |

Verified on production after the final push: all four `/designs*` routes 200 and
`noindex, nofollow`; all ten client routes 200; `sitemap.xml` contains zero `designs`
matches; the visit CTA still renders on the home page.

## The guard hole that must be closed first

**`scripts/verify-jsx-copy.mjs` printed "All JSX copy verbatim" about a string it had
never read.** A prose string passed as `text="..."` was invisible to it because `text` was
not in `COPY_PROPS`. That specific hole is closed (`867246a`) and the fix carries an
empirical proof — substituting an off-document sentence now produces a named failure.

**The shape of the bug is not fixed.** `COPY_PROPS` is an allow-list: whatever prop name
nobody remembers to add is silently unchecked, and the green run reads as coverage. The
sibling guard `scripts/verify-copy.mjs` deliberately uses a **deny**-list for exactly this
reason, and its own comment cites invented copy sitting unchecked in `components/` for 21
tasks. One guard learned the lesson; the other has not.

Deferring it was defensible for the comps — they are unshipped, `noindex`, deletable. It
stops being defensible the moment a direction rolls out to the ten live routes, because
that is where a missed prop becomes public copy on a site whose client cites FDA exposure.

**Make the inversion a hard precondition of the roll-out spec.** Inverting `COPY_PROPS`
needs a considered exclusion list (`className`, `href`, `src`, `id`, `alt`, `aria-*`, …)
or it floods with false positives, so it is its own small piece of work — not a ride-along.

While in that file, fix the second weakness in the same visit: **the regex reads a bare
`>` (e.g. in a CSS selector) and bracketed tag names inside code *comments* as real JSX
text**, and fails claiming invented copy that does not exist. It bit twice during this
work. Both times the mitigation was to reword the comment, which has left
`components/designs/clinical/PlateCard.tsx` with more lines about how to word a comment
than about what the component does. Stripping `/* */` and `//` before the JSX-text regex
is roughly three lines, and the file already has a `--self-test` harness to prove it.

## What the client must be told before choosing

From the spec, non-negotiable, and all three are in `docs/superpowers/COMPS-FOR-CLIENT.md`:

1. **Photographic is undersold by the assets that exist.** One lifestyle photograph, 721px,
   visibly soft upscaled. Choosing it commits her to commissioning photography. Its scrim
   is also unusually heavy (80%) — a deliberate accessibility trade, not a fault.
2. **Editorial's pull quote repeats a sentence on purpose.** It also appears in the body
   copy above it.
3. **Clinical shows "Certified PEMF Expert Sharon" twice** — credential under the hero,
   signature at the foot. Deliberate; the two do different jobs at opposite ends of a page.

**Add one more when briefing her, which is not in that document:**

4. **Tell her to scroll rather than judge on first screens.** The three pages differ
   clearly below the fold — numbered margins and a pull quote; a credential strip and
   bordered plates; a scrim hero and full-bleed bands — but Editorial's and Clinical's
   *heroes* remain compositionally alike: same left-text/right-image split, same type
   hierarchy, same button pair. The final review judged the whole composition and called
   this resolved; the controller screenshotted the live first screen and disagreed. Both
   readings are recorded and both are partly right. If she reacts to the top screens as
   "these two look the same", that is the known limitation, not a misunderstanding.

## The scrim number, and why it is not negotiable

The Photographic hero's scrim is **80%**, and it is the one figure in this repo that was
derived from measured pixels rather than reasoning.

`scripts/verify-contrast.mjs` reasons about token pairs, not pixels, so it structurally
cannot check white text over a photograph. The plan estimated 55-65% and started at 60%.
Measured: 60% → **3.95:1**, 70% → 5.36:1, 75% → 6.23:1, 80% → **7.23:1**. Had the estimate
been trusted, the hero would have shipped at barely half the AAA floor the whole site is
built on.

Later re-verified across six viewport widths, because `object-cover` on a `70vh` hero crops
the source differently per aspect ratio: 320px 7.45:1, 390px 7.65:1, 768px 7.29:1,
1024px 7.23:1, **1440px 7.23:1 (binding)**, 1920px 7.25:1. The default palette is the
worst case — its `--ink` (`#2A2E27`) has the highest WCAG relative luminance of the four.

**Do not lower it, and do not convert it to a Tailwind opacity class.** It is an inline
`color-mix` because `bg-[color:var(--ink)]/80` can silently emit no rule at all, which
would ship an unreadable hero rather than a visibly broken one.

## Deleting the two losing directions

Designed to be `rm -rf`, and verified to be:

    rm -rf app/designs/<name> components/designs/<name>

plus removing its entry from `COMP_ROUTES` in `scripts/verify-layout.mjs` and its entry
from `DIRECTIONS` in `app/designs/page.tsx`. Grep confirms nothing else references a comp.
When all three go, also drop `join("app", "designs", "page.tsx")` from `NOT_SITE_COPY` in
`scripts/verify-jsx-copy.mjs` and the `/designs` link added to `app/themes/page.tsx`.

## Rulings made without the user, carried forward

Full reasoning was in the SDD ledger, which is deleted; git history is the record now. The
ones with consequences past today:

- **Executed on `main`, not a feature branch**, per the standing 2026-08-19 ruling. Backing
  any of this out is `git revert` over a known range rather than deleting a branch.
- **`COPY_PROPS` left as an allow-list** — see above. The one most worth overturning.
- **Commit `3e7b575`'s subject** (`Fix palette picker description in COMPS-FOR-CLIENT.md.`)
  carries a trailing period and a filename, against this repo's convention. The final
  reviewer advised amending it as "free and unpushed"; that had stopped being true by the
  time it reported, and force-pushing published history to fix punctuation was refused.
- **Both readings of the hero-similarity finding reported**, rather than the reviewer's
  ADDRESSED verdict alone.
- **`superpowers:finishing-a-development-branch` not invoked** — the work was already on
  `main` and deployed at the user's explicit instruction, so there was no integration
  decision left for it to make.

## Traps in this repo — the 2026-08-24 list, now with two more confirmed

Carried forward and all still true:

- Bracketed tag names **and bare `>`** inside JSX/TS comments get read as real markup by
  `verify-jsx-copy.mjs`. Cost time twice more today. See the fix note above.
- Comments before the root element of a `return` get extracted as page copy.
- Headless screenshots need `--virtual-time-budget=4000` **and** a fresh `--user-data-dir`,
  or you capture pre-hydration state and/or a cached render of the previous deploy.

New today:

- **Vercel's CDN serves the previous deploy to an un-cache-busted request.** Poll with
  `?cb=$(date +%s)` or you will verify the build you just replaced.
- **A freshly-pushed route can 404 on one edge node while serving 200 on another.**
  `/designs` did exactly this ~30s after a push and was healthy on every probe a minute
  later. Do not chase it as a bug before re-probing.
- **`npm run lint` was scanning `.claude/worktrees/`**, reporting 704 errors from another
  branch's checkout and burying the exit code. Fixed in `b793436`; if it ever reports
  hundreds of problems again, check `globalIgnores` in `eslint.config.mjs` before
  believing a single finding.
- **The four palettes are measurably indistinguishable and this is settled.** The `--cream`
  page ground varies by at most 13/255 across all four; Sunrise differs from the default by
  3/255. Only the header bar and wordmark visibly change. Never offer `/themes` again as a
  way to show the client "different looks" — that mistake is what the comps exist to
  correct.

## Still needing the client, not code

Carried forward from 2026-08-19 and 2026-08-24, none resolved:

- **`areaServed`** — "Orange County, California" is published to Google in
  `localBusinessSchema` (`lib/seo.ts`) and appears **zero times** in the client's document.
- **`site.deviceNote`** — protective language not in the 2026 document; deliberately not
  deleted, still unsigned-off.
- **Hero photography** — one lifestyle image, 721px. The client was told it is soft and
  chose it anyway; **do not "fix" this by swapping `imrsModel3` back in.** Photographic
  cannot be judged fairly without real photography.
- **The custom domain** still points at WordPress; only the Vercel URL is live.
- **New: the direction itself.** Three comps, one gets chosen, two get deleted.

## Environment notes

- Verifier scripts run under `node --experimental-strip-types` and import `../lib/routes.ts`
  with an explicit `.ts` extension. Match that pattern.
- Full suite: `npm run verify:all` — contrast, themes, copy, jsx, layout, site.
  `verify:layout` and `verify` need a server (local or `BASE_URL=<live>`); the other four
  do not. `verify:layout` now also covers the four `/designs*` routes via `COMP_ROUTES`.
- `npm run shots` now covers the comp routes too (`f9f3af9`). Nested paths flatten to
  `designseditorial`, `designsclinical`, `designsphotographic` — distinct, no collisions.
- `?theme=ocean|sunrise|spectrum|` on **any** URL applies a palette and makes it stick, so
  a single link both shows a theme and keeps it while the recipient clicks around.
- The source `Website Exiga Jasmin 2026.docx` is untracked and gitignored; `npm run
  extract:doc` needs it and it is not recoverable from a clean clone.
