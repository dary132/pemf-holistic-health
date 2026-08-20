# Breakpoint — clinical redesign

**Date:** 2026-08-19
**Branch:** `main` (no worktree — see "Why main")
**Local HEAD:** `9a46316` · **origin/main:** `b69a61b` · **live site:** `b69a61b`
**Live URL:** https://pemf-holistic-health.vercel.app

## Resume here

Exactly one thing is in flight:

> **Task 3 (`9a46316`) is committed but NOT reviewed and NOT pushed.** Generate its review
> package and dispatch a task reviewer before pushing. Everything needed is listed under
> "Resuming Task 3" below.

The live site is at Task 2, which is reviewed, deployed and visually verified. Nothing
half-finished is public.

## What is running

Executing `docs/superpowers/plans/2026-08-19-clinical-redesign.md` via
`superpowers:subagent-driven-development` — a fresh implementer subagent per task, a task
review after each, and a whole-branch review at the end. Eight tasks.

Spec: `docs/superpowers/specs/2026-08-19-clinical-redesign-design.md`

| Task | State |
|---|---|
| 1 — heading-outline gate (`verify:layout`) | complete, reviewed clean, **live** |
| 2 — type scale + section rhythm | complete, reviewed clean, **live**, visually verified |
| 3 — plates + aligned panel grid | **committed `9a46316`, unreviewed, unpushed** |
| 4 — plate treatment for SplitBand / Figure / Card | not started |
| 5 — split hero | not started |
| 6 — credibility strip | not started |
| 7 — quiet disclaimer + band rhythm | not started |
| 8 — full-site visual pass | not started |

## The SDD ledger is gitignored and local-only

`.superpowers/sdd/2026-08-19-clinical-redesign/` holds the ledger (`progress.md`), every task
brief, every implementer report and every review diff. `.superpowers` is in `.gitignore`, so
**none of it is in git and none of it survives a fresh clone.** Do not delete it before
reading it. The rulings are duplicated below precisely because that directory is fragile.

Briefs are generated with:
`<superpowers>/skills/subagent-driven-development/scripts/task-brief <plan> <N>`

## Why main, and why verification is remote

Mid-session the user directed: *"don't build locally just update to the github repo the live
site is our test site"*, and when asked explicitly chose **main / the live site** over a
branch preview. So:

- Each task commits to `main`; the controller pushes; Vercel auto-deploys in ~2 min.
- `verify:layout`, `verify` (verify-site.mjs) and `npm run shots` all honour `BASE_URL`, so
  they run against the live URL with no code changes.
- **No local `npm run build`, no local `npm run dev`.**
- Still run locally, deliberately: `npx tsc --noEmit`, `verify:copy`, `verify:jsx`,
  `verify:contrast`. None is a build or needs a server, and `verify:copy` / `verify:jsx` are
  the FDA-exposure copy guard — publishing a copy violation to a live health site to discover
  it is not a trade worth making.

An isolated worktree was created and then removed once the target changed to main; the
`clinical-redesign` branch is deleted. Implementers commit but never push — pushing is the
controller's, since it is outward-facing.

## Rulings made so far

These were decided without the user and are the things most worth checking.

1. **`RHYTHM` extracted to `lib/rhythm.ts`** instead of being declared byte-identically in
   three components as the plan literally specified. Tasks 2 and 3 import it; Task 4 must too.
   *Cost if wrong:* one small module to inline back.
2. **`p { max-width: 65ch }` in `@layer base` stands.** It applies to every `<p>`. Utilities
   win over base so anything needing a different measure can override. Watch it in Task 8.
   *Cost if wrong:* one too-narrow paragraph, visible in screenshots.
3. **`Card` keeps its own `imageAspect` prop** rather than adopting `.u-plate-media`. Several
   pages pass non-4:3 values and changing their composition is outside this work's remit. Two
   mechanisms for one idea is a real inconsistency, deferred not missed.
   *Cost if wrong:* a later cleanup pass.
4. **Verification moved to the deployed site and work lands on main** — the user directive
   above. *Cost if wrong:* the live site shows partial redesign between tasks, which the user
   explicitly accepted.

## Deferred minors

- Task 2's report claims "no visible spacing change". False: the new `normal` default is
  `py-16 sm:py-20` against the old hardcoded `py-14 sm:py-16`, so every `Section` gained
  padding on that commit. The code is spec-compliant; only the report is wrong. Recorded so a
  later visual diff is not misread.

## Resuming Task 3

1. `git log --oneline -2` — confirm HEAD is `9a46316`, origin is `b69a61b`.
2. Review package:
   `scripts/review-package docs/superpowers/plans/2026-08-19-clinical-redesign.md b69a61b 9a46316`
3. Dispatch a task reviewer with: `task-3-brief.md`, `task-3-report.md`, the printed diff path,
   and the global constraints. **The thing to check hardest:** `panelTitleAs` survived the
   `TriPanel` → `PanelGrid` rename with its exact meaning and default. Three pages
   (`/energy`, `/mental-health`, `/pets-health`) pass `"h2"`; if any lost it, those pages
   regain an `h1 → h3` heading skip. `verify:layout` gates this — run it against the live site
   after pushing.
4. On a clean review: ledger the completion, `git push origin main`, wait for the Vercel
   deployment to report `success`, then run against the live URL:
   `BASE_URL=https://pemf-holistic-health.vercel.app npm run verify:layout` and `npm run verify`.
5. Then screenshot `/pemf` and confirm the three cards under "Magnetic Field Energy is
   Essential for Health" are now equal height with equal-height images — that is the whole
   point of the task.
6. Then Task 4. Its brief is already generated. Ruling 1 applies to it: import `RHYTHM` from
   `lib/rhythm.ts`, do not redeclare.

## Still needing the client, not code

- **`areaServed`** — "Orange County, California" is published to Google in `localBusinessSchema`
  (`lib/seo.ts`) and appears **zero times** in the client's document.
- **`site.deviceNote`** — protective language not in the 2026 document; deliberately not deleted.
- **Hero photography** — Task 5 assumes `images.imrsModel3`. Photography of the actual office
  or of Sharon would outperform a product shot for trust. Worth asking before Task 5 runs.
- Task 5 also carries a recorded client instruction: `app/page.tsx` says the client asked for
  the IMRS photograph to sit *in its own section rather than behind the headline*. The user
  confirmed on 2026-08-19 that the split hero (photo beside, never behind) is acceptable.

## Environment notes

- Verifier scripts run under `node --experimental-strip-types` and import `../lib/routes.ts`
  with an explicit `.ts` extension. Match that pattern.
- `npm run shots` uses one-shot capture with no scroll, so lazy content (the `/contact` map
  iframe) renders blank. Harness artifact, not a regression.
- A viewport taller than the content pushes the `mt-auto` footer down and creates a fake gap;
  sticky headers duplicate mid-page in full-page captures. Neither is a bug.
- The source `Website Exiga Jasmin 2026.docx` is untracked and gitignored; `npm run extract:doc`
  needs it and it is not recoverable from a clean clone.
