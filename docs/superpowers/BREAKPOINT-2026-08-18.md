# Breakpoint — Exiga Jasmin 2026 remodel

**Date:** 2026-08-18
**Branch:** `exiga-jasmin-2026-remodel`
**Worktree:** `.claude/worktrees/exiga-jasmin-2026-remodel` (branched from `9b4b3ed` on `main`, NOT from `origin/main`)
**HEAD:** `2e36edf` — 38 commits ahead of `main`
**Not pushed. Not merged.**

## Resume here

Exactly one thing is in flight:

> **Re-review the WIP commit `2e36edf`**, which contains the final-review fix wave. It was
> interrupted before its own agent reported, so nothing has verified it. Diff range:
> `3f312bd..2e36edf`.

If the re-review is clean, the remaining work is: fix any residual findings, then
`superpowers:finishing-a-development-branch` to merge.

## State of the build

All 21 planned tasks are implemented, committed, and were individually reviewed clean.
The site is ten routes, rebuilt from `Website Exiga Jasmin 2026.docx`.

Gates as of `2e36edf` (I ran these myself after the interruption):

| Gate | Result |
|---|---|
| `npx tsc --noEmit` | clean |
| `npm run verify:all` | passes — and now includes `verify:jsx` |
| `npm run verify:jsx` | passes, **24 files** scanned (was 11 — `components/` now covered) |
| `npm run verify` | 10 routes, 8 content assertions, both 308 redirects |
| `npm run verify:contrast` | all pairs AAA |

**The WIP commit is coherent but UNREVIEWED.** Treat its contents as unverified.

## Why the WIP commit exists

The whole-branch review (opus, 36 commits) returned **do-not-ship** with 2 Critical, 7
Important, 11 Minor. The fix wave for those findings was interrupted mid-flight with 23
modified files uncommitted. I committed them as WIP rather than risk losing the work.

### The Critical it was fixing

`components/CTA.tsx` rendered on **9 of 10 pages**:
- "Certified PEMF **Consultant** Sharon" — the document says "Certified PEMF **Expert**
  Sharon" (7 occurrences). "Consultant" appears **0** times in the document.
- "Office and home visits are available across **Orange County, California**" — "Orange
  County" appears **0** times in the document.
- "Book a PEMF Session" — an invented heading.

A substituted professional credential and an invented service-area claim, under the
constraint the client framed as FDA exposure.

### Why every gate missed it for 21 tasks

`scripts/verify-jsx-copy.mjs` had `APP_DIR = "app"` — it never scanned `components/`.
`CTA.tsx` was built in Task 8; the scanner was built in Task 11. Nothing went back.
Two sibling holes: `verify-copy.mjs` scanned only `lib/content/`, leaving `lib/site.ts`
prose unchecked; and `verify:all` omitted `verify:jsx` entirely. All three holes contained
real invented prose. The WIP commit closes all three.

## Outstanding items, in priority order

1. **Re-review `3f312bd..2e36edf`.** Nothing has verified the fix wave.
2. **`areaServed: "Orange County, California"`** (`lib/site.ts:6`) is still published to
   Google via `localBusinessSchema` (`lib/seo.ts:56`), though absent from the document. No
   longer visible page copy, but still an unverified business claim. **Needs the client's
   answer, not a guess.**
3. **`site.deviceNote`** ("The PEMF system is not a medical device...") is not in the 2026
   document. I deliberately did NOT remove it — deleting protective language without the
   client's instruction is the riskier action. **Needs client sign-off.**
4. **Pre-existing CSS bug found during the fix wave:** the global
   `h1, h2, h3 { color: var(--sage) }` rule in `app/globals.css` overrides inherited white
   text inside sage-coloured bands, which would render the CTA heading sage-on-sage —
   invisible — on nine pages. The WIP adds an explicit `text-white`. **The general problem
   remains:** the contrast verifier checks declared token pairs, not what the cascade
   actually produces, so any future heading on a dark band has the same trap.
5. Minor deferred items are listed in the ledger (see below); the final review triaged them
   as safe to leave except the tap-target fixes, which the WIP addresses.

## Open questions for the client — still unanswered

1. **Second QR code.** The document shows two on every page; only the WeChat one is decoded
   and rendered. The other's destination is unknown and was not guessed.
2. **Google Translate.** The document's header asks for it. The free widget is discontinued
   for new sites, and ⚠️ **the Google Cloud Translation API is usage-billed and would charge
   the client.** Nothing paid was enabled.
3. **Service area** — see outstanding item 2.
4. **Device note** — see outstanding item 3.
5. **Document typo, not corrected:** `docs/exiga-jasmin-2026.txt` line 51 reads
   "Csystemsed PEMF Expert Sharon" — an apparent find-and-replace accident in the client's
   own file. Only the PRMF→PEMF fix is sanctioned, so this was left alone and flagged.
6. **`/contact` is sparse by design.** The client's document Contact page contains no prose
   at all. If they want more there, they need to supply the copy.

## Where the detail lives

- **Full decision ledger, every ruling with its rationale and cost-if-wrong:**
  `.superpowers/sdd/2026-08-18-exiga-jasmin-2026-remodel/progress.md`
- Per-task briefs and implementer reports: same directory
- Spec: `docs/superpowers/specs/2026-08-18-exiga-jasmin-2026-remodel-design.md`
  (amended twice during execution — the `--clay` token and Open Question 3)
- Plan: `docs/superpowers/plans/2026-08-18-exiga-jasmin-2026-remodel.md`

Note: `.superpowers/` is gitignored, so the ledger and reports are **local to this worktree
only**. Do not delete the worktree before reading them.

## Environment notes

- The source `Website Exiga Jasmin 2026.docx` is **untracked and gitignored** by the user's
  choice, and was hand-copied into this worktree. It is not recoverable from a clean clone,
  and `npm run extract:doc` needs it.
- A dev server may still be running on `localhost:3000` (background task `bvcek8gpu`). An
  earlier one died with SIGTERM mid-task and was restarted.
- Deployment remains blocked and untouched: `pemfforholistichealth.com` serves WordPress,
  not this build.
