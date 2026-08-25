# Breakpoint — home-page design comps

**Date:** 2026-08-24
**Branch:** `main` (no worktree — the 2026-08-19 ruling to work on main still stands)
**Local HEAD:** `b743e2d` · **origin/main:** `f559cd5` · **live site:** `f559cd5`
**Live URL:** https://pemf-holistic-health.vercel.app

Supersedes `BREAKPOINT-2026-08-19.md`. Read that one only for the clinical-redesign
archaeology in "The older plan is stale" below.

## Resume here

Exactly one thing is in flight:

> **The spec at `docs/superpowers/specs/2026-08-24-home-design-comps-design.md` is committed
> (`b743e2d`, local only, NOT pushed) and is with the user for review.** Nothing has been
> built from it. When the user approves it, the next step is the `superpowers:writing-plans`
> skill to turn it into an implementation plan — that is the brainstorming skill's mandated
> terminal state and no other skill should be invoked first.

If the user has already given notes on the spec, apply them and re-run the spec self-review
before planning.

## What is live and finished

All of this is deployed, visually verified against the live URL, and needs nothing:

| Work | Commit | State |
|---|---|---|
| Technicolor `PEMF` wordmark hero | `990f768` | live, verified |
| Hero photo swapped to the document's page-1 banner | `92506a0` | live, verified |
| Four palettes + `/themes` picker | `f559cd5` | live, verified, `noindex` confirmed in served HTML |

The only uncommitted-to-origin thing in the repo is the spec. The working tree is otherwise
clean.

## Where the client is in the conversation

The through-line, because it explains why the work jumped around:

1. Client wanted the hero re-ordered with a technicolor wordmark → done, live.
2. Client wanted the document's own fireplace photo in the hero → done, live. They were told
   it is 721px and visibly soft at hero width and chose it anyway. **Do not "fix" this by
   swapping the sharper `imrsModel3` back in.** That was an explicit decision.
3. Client wanted "additional color and emphasis" and ideas → four palettes at `/themes`, live,
   link shared with them.
4. Client came back with *"can we make some themed page designs versus palettes?"* — i.e. the
   palettes did not scratch the itch; they want structurally different pages.

**Step 4 is the live question and no answer has been given yet.** The three directions
(Editorial / Clinical / Photographic) exist only in the spec.

## Decisions the user made, so they are not re-asked

Both came from `AskUserQuestion` during brainstorming on 2026-08-24:

1. **Comps cover the home page only** — three fully-designed home pages, client picks one,
   winner is rolled out to the other nine afterwards as separate work. They explicitly did not
   want all ten pages in each direction.
2. **Each comp opens in a recommended palette but stays switchable** — Editorial/Sage & Clay,
   Clinical/Deep Ocean, Photographic/Sunrise, with `/themes` still able to re-skin any of
   them. They did not want the designs locked to one palette, nor twelve neutral combinations.

Earlier, for the palettes: `/themes` route with a live switcher (not separate deployments),
and themes may change colour + emphasis devices but **not** typography or layout.

## Two things the client must be told before they choose a direction

Both are in the spec; repeated here because they are the things that go wrong if forgotten.

1. **Photographic is undersold by the assets that exist.** One lifestyle photograph, already
   soft, plus product shots and 14 SVG diagrams. The comp will reuse that one image and look
   weaker than the direction deserves. Choosing it commits the client to sourcing photography.
2. **Editorial's pull quote is a deliberate repetition.** "PEMF is a holistic approach to
   promote a state of total wellness." already appears in the body copy beneath it. Normal
   editorial device, reads as a duplication bug if unannounced.

## Rulings made without the user

1. **All four palettes hold AAA (7:1)** rather than relaxing to AA for more vivid colour. The
   audience is elderly and it was already project policy enforced by a build gate. Vivid-but-
   dark turned out to cost nothing. *Cost if wrong:* the client says the palettes are too
   muted, and relaxing the floor is then a deliberate, separate decision.
2. **`?theme=` applies and persists a palette**, so each option can be sent as its own link.
   Query values are pattern-checked before touching the DOM. *Cost if wrong:* nothing; it is
   additive.
3. **`/themes` prose is excluded from `verify-jsx-copy` by path**, not by widening
   `CHROME_ALLOWLIST`. The allowlist is for short labels; admitting sentences would blunt the
   FDA-exposure guard for the whole site. `NOT_SITE_COPY` in that script holds the two paths.
   **Anything that renders on one of the ten real pages must never be added to it.**
4. **The comps will need `verify-layout` extended** to cover `/designs` routes. It iterates
   `lib/routes.ts`, which deliberately excludes them, so today they are unchecked. A comp with
   two `h1`s is exactly the error these compositions invite. This is written into the spec's
   Verification section as work, not an aside.

## Bugs found and fixed while building the palettes

Worth knowing because they were silent failures, not loud ones:

- **`parsePalettes` merged resolved rather than raw tokens**, which froze every theme's
  `--band` to the *default* sage — a colour no theme paints — and passed. Fixed, and pinned by
  the self-test "an inherited alias re-resolves against the theme's own value".
- **The token regex rejected digits in names**, so `--tc-1`..`--tc-7` parsed as missing tokens.
- **`verify-contrast.mjs` called `main()` at module scope**, so importing it ran the whole
  checker and exited. It now has the same `import.meta.url` guard `verify-copy.mjs` already
  used. This is why `verify-themes.mjs` can import `parsePalettes` at all.

## Traps in this repo that cost time today

- **JSX comments containing `<html>` or `<body>`** get read as real tags by
  `verify-jsx-copy.mjs` (regex, not a parser), and the prose between them is then checked
  against the client document and fails. Write "the root element", not the bracketed tag.
- **A `{/* */}` or `/* */` comment placed before the root element inside `return (...)`**
  either fails to parse or gets extracted as page copy. Put such comments *above* the
  function.
- **React Compiler lint rules are on.** `setState` inside an effect and DOM mutation inside a
  component both error. `ThemeSwitcher` uses `useSyncExternalStore` over the live
  `data-theme` attribute for exactly this reason — the document genuinely owns that state,
  and reading it as an external store also removes the hydration mismatch rather than
  suppressing it.
- **`suppressHydrationWarning` on the root element is deliberate** and must stay: the
  pre-paint theme script is *designed* to make server and client markup differ.
- `npm run lint` reports ~700 pre-existing errors across the whole repo including
  `node_modules`. Lint only the files you touched: `npx eslint app components lib`.

## The older plan is stale — do not resume it blind

`docs/superpowers/plans/2026-08-19-clinical-redesign.md` stalled at Task 3 of 8.

**Task 3 shipped without the review it was waiting for.** Commit `9a46316` was carried into
`origin/main` by later pushes rather than by a clean review. It has been live and visually
exercised for days with no reported problem, so this is a process gap, not a known defect —
but nobody ever reviewed it.

**Tasks 4–8 were never started and Task 5 is now actively wrong.** Task 5 ("Hero") assumes it
will delete the existing hero block and use `images.imrsModel3`. Both assumptions are dead:
the hero was rebuilt twice since (`990f768`, `92506a0`) and the client chose a different
photograph. Task 6 (credibility strip) overlaps the Clinical comp's credential strip in this
new spec.

If that plan is ever resumed, re-derive Tasks 4–8 against current `main` first. The local-only
ledger at `.superpowers/sdd/2026-08-19-clinical-redesign/progress.md` is gitignored, does not
survive a clone, and is the only record of the per-task reviews.

## Still needing the client, not code

Carried forward from 2026-08-19 and still open:

- **`areaServed`** — "Orange County, California" is published to Google in
  `localBusinessSchema` (`lib/seo.ts`) and appears **zero times** in the client's document.
- **`site.deviceNote`** — protective language not in the 2026 document; deliberately not
  deleted.
- **Hero photography** — now doubly relevant: the Photographic direction cannot be judged
  fairly without real images, and photography of the actual office or of Sharon would
  outperform a product shot for trust.
- **The 14 SVG diagrams** carry the sage and clay hexes internally, so they stay green in every
  palette and every comp. Recolouring means inlining them as React components — worth doing
  once a direction is chosen, wasted before then.

## Environment notes

- Verifier scripts run under `node --experimental-strip-types` and import `../lib/routes.ts`
  with an explicit `.ts` extension. Match that pattern. `verify-themes.mjs` is plain `.mjs`
  because it needs no TS import.
- Full suite: `npm run verify:all` — contrast, themes, copy, jsx, layout, site. `verify:layout`
  and `verify` need a server (local or `BASE_URL=<live>`); the other four do not.
- Screenshots: headless Chrome needs `--virtual-time-budget=4000` or it captures before
  hydration and the theme picker renders with nothing selected. That cost a false alarm today.
- Use a fresh `--user-data-dir` when screenshotting the live site, or Chrome serves a cached
  render and you review the previous deploy. That cost a second false alarm today.
- The source `Website Exiga Jasmin 2026.docx` is untracked and gitignored; `npm run
  extract:doc` needs it and it is not recoverable from a clean clone. The hero banner was
  extracted from it with `unzip -q "<docx>"` → `word/media/image1.png`.
