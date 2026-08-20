# Clinical Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework layout and surface treatment across all ten routes so the site reads as an upscale clinical practice, without changing palette, typeface, or a single word of copy.

**Architecture:** Bordered plates on the existing `--rule` token replace floating white cards; a real type scale and a three-step spacing scale replace today's single heading size and uniform `py-14`; a fixed-aspect image slot forces card rows to align. A new `Hero` and `TrustStrip` open the home page. Work proceeds under a new automated layout gate built in Task 1.

**Tech Stack:** Next.js App Router, React 19, Tailwind CSS v4 (`@theme inline`), TypeScript, Node's `--experimental-strip-types` for verifier scripts, headless Chrome for screenshots.

**Spec:** `docs/superpowers/specs/2026-08-19-clinical-redesign-design.md`

## Global Constraints

Every task's requirements implicitly include all of these.

- **Copy is locked.** Every visible string must already appear in `docs/exiga-jasmin-2026.txt` or `docs/exiga-jasmin-2026-image-text.txt`. `verify:copy` and `verify:jsx` fail the build otherwise. The client cites FDA exposure. **Introduce no new words.**
- Strings available for the credibility strip, verbatim: `Certified PEMF Expert Sharon`, `Office and Home Visits Available`, `22706 Aspan St, Suite 504`, `Lake Forest, CA 92630`, `(949) 600 7899`.
- **WCAG AAA contrast.** `npm run verify:contrast` enforces declared token pairs. `--rule`, `--sage-soft`, `--clay-soft` are decorative only: never a text colour, never a fill behind text.
- **48px minimum tap targets** on every interactive element.
- **Base type stays 19px / 20px above 640px.** Never shrink it; it is an accessibility decision for an elderly audience.
- **Type and heading rules stay inside `@layer base`** in `app/globals.css`. Un-layered rules outrank Tailwind utilities regardless of specificity, which once rendered the CTA heading sage-on-sage on nine pages.
- **No hover-only navigation. No YouTube.**
- There is **no unit test runner** in this project. Verification means `npm run verify:all`, `npx tsc --noEmit`, `npm run build`, and reading screenshots.
- Run `npm run dev` in the background before any task whose verification hits `localhost:3000`. Kill it after.

---

### Task 1: Automated layout gate

The spec notes that heading order is checked only by a manual DOM dump, so a rewrite can silently reintroduce an `h1 → h3` skip. Build the gate before refactoring anything under it.

**Files:**
- Create: `scripts/verify-layout.mjs`
- Modify: `package.json` (scripts block)

**Interfaces:**
- Consumes: `lib/routes.ts` (`routes`, each with `.path`), the pattern already used by `scripts/verify-site.mjs`.
- Produces: `npm run verify:layout`; exits non-zero on any heading-order violation. Later tasks rely on this being part of `verify:all`.

- [ ] **Step 1: Write the checker**

Create `scripts/verify-layout.mjs`:

```js
// Fails the build if any route's heading outline is invalid: a page must have
// exactly one h1, must start at h1, and must never skip a level going down
// (h1 -> h3). Screen-reader users navigate by heading; a skipped level reads
// as a missing section.
//
//   npm run verify:layout                 check every route against a dev server
//   npm run verify:layout -- --self-test  prove the checker rejects bad outlines
//
// Requires `npm run dev` to be running, same as verify-site.mjs.
import { routes } from "../lib/routes.ts";

const BASE = process.env.BASE_URL || "http://localhost:3000";

/** Heading levels in document order, script payloads removed.
 *  Next inlines an RSC payload into <script> tags that can contain escaped
 *  markup; scanning it would report headings that never render. */
export function headingLevels(html) {
  const body = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  return [...body.matchAll(/<h([1-6])[\s>]/gi)].map((m) => Number(m[1]));
}

/** Returns an array of problem strings; empty means the outline is valid. */
export function outlineProblems(levels) {
  const problems = [];
  const h1s = levels.filter((l) => l === 1).length;
  if (h1s !== 1) problems.push(`expected exactly one h1, found ${h1s}`);
  if (levels.length && levels[0] !== 1) problems.push(`starts at h${levels[0]}, not h1`);
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) {
      problems.push(`skips h${levels[i - 1]} -> h${levels[i]} at position ${i}`);
    }
  }
  return problems;
}

async function main() {
  if (process.argv.includes("--self-test")) return selfTest();

  let failures = 0;
  for (const route of routes) {
    const res = await fetch(`${BASE}${route.path}`);
    if (!res.ok) {
      console.error(`FAIL ${route.path}: HTTP ${res.status}`);
      failures++;
      continue;
    }
    const levels = headingLevels(await res.text());
    const problems = outlineProblems(levels);
    if (problems.length) {
      for (const p of problems) console.error(`FAIL ${route.path}: ${p}`);
      console.error(`      outline: ${levels.map((l) => "h" + l).join(" ")}`);
      failures += problems.length;
    } else {
      console.log(`  ok   ${route.path.padEnd(18)} ${levels.map((l) => "h" + l).join(" ")}`);
    }
  }
  console.log(failures ? `\n${failures} LAYOUT FAILURE(S)` : "\nAll heading outlines valid");
  process.exit(failures ? 1 : 0);
}

function selfTest() {
  const cases = [
    ["accepts a valid outline", [1, 2, 3, 2, 3], true],
    ["rejects an h1 -> h3 skip", [1, 3], false],
    ["rejects a missing h1", [2, 3], false],
    ["rejects two h1s", [1, 1, 2], false],
    ["accepts jumping back up any distance", [1, 2, 3, 3, 2], true],
    ["ignores headings inside a script payload", headingLevels(
      '<script>{"x":"<h3>fake</h3>"}</script><h1>a</h1><h2>b</h2>'), true],
  ];
  let failures = 0;
  for (const [name, input, shouldPass] of cases) {
    const passed = outlineProblems(input).length === 0;
    if (passed === shouldPass) console.log(`  ok   ${name}`);
    else {
      console.error(`  FAIL ${name}: expected ${shouldPass ? "accept" : "reject"}`);
      failures++;
    }
  }
  console.log(failures ? `\n${failures} SELF-TEST FAILURE(S)` : "\nSelf-test passed");
  process.exit(failures ? 1 : 0);
}

main();
```

- [ ] **Step 2: Prove the self-test rejects bad outlines**

Run: `npm run verify:layout -- --self-test` (after Step 3 wires the script; if running before, use `node --experimental-strip-types scripts/verify-layout.mjs --self-test`)
Expected: all six cases `ok`, `Self-test passed`.

- [ ] **Step 3: Wire it into package.json**

In `package.json`, add to `scripts`:

```json
"verify:layout": "node --experimental-strip-types scripts/verify-layout.mjs",
```

and extend `verify:all` so it reads exactly:

```json
"verify:all": "npm run verify:contrast && npm run verify:copy && npm run verify:jsx && npm run verify:layout && npm run verify",
```

- [ ] **Step 4: Run it against the current site**

Run: `npm run dev` in background, wait for 200 on `/`, then `npm run verify:layout`
Expected: all ten routes `ok`. This is the pre-refactor baseline — if it fails now, stop and report, because the baseline is broken before any redesign work.

- [ ] **Step 5: Prove it catches a real regression**

Temporarily change `app/energy/page.tsx` `panelTitleAs="h2"` to `panelTitleAs="h3"`, re-run `npm run verify:layout`.
Expected: `FAIL /energy: skips h1 -> h3`. Then `git checkout -- app/energy/page.tsx` and confirm it passes again.

- [ ] **Step 6: Commit**

```bash
git add scripts/verify-layout.mjs package.json
git commit -m "Add heading-outline gate to verify:all

Heading order was checked only by a manual DOM dump, so a component
rewrite could silently reintroduce an h1 -> h3 skip. Proven to fail by
reverting app/energy's panelTitleAs before the redesign begins."
```

---

### Task 2: Type scale and spacing scale

**Files:**
- Modify: `app/globals.css`
- Modify: `components/Section.tsx`

**Interfaces:**
- Produces: CSS custom properties `--step-display`, `--step-h1`, `--step-h2`, `--step-h3`, `--step-lead`; utility classes `.u-display`, `.u-lead`; and `Section`'s new `rhythm` prop typed `"compact" | "normal" | "spacious"` defaulting to `"normal"`. Tasks 5–8 use `rhythm`.

- [ ] **Step 1: Add the scales to globals.css**

In `app/globals.css`, inside the existing `:root` block, append:

```css
  /* Type scale. rem against the 19-20px root, so the accessibility floor
     carries through every step. */
  --step-display: clamp(2.5rem, 5vw, 3.75rem);
  --step-h1: clamp(2.125rem, 4vw, 2.75rem);
  --step-h2: clamp(1.75rem, 3vw, 2.125rem);
  --step-h3: 1.25rem;
  --step-lead: 1.15rem;
```

- [ ] **Step 2: Apply the scale inside @layer base**

In `app/globals.css`, inside the existing `@layer base` block, replace the `h1, h2, h3` rule with:

```css
  h1, h2, h3 {
    font-family: var(--font-display), Georgia, serif;
    font-weight: 600;
    color: var(--sage);
    line-height: 1.2;
    text-wrap: balance;
  }

  h1 { font-size: var(--step-h1); }
  h2 { font-size: var(--step-h2); }
  h3 { font-size: var(--step-h3); }

  p { max-width: 65ch; }
```

These MUST stay inside `@layer base` — see Global Constraints.

- [ ] **Step 3: Add the display and lead utilities**

In `app/globals.css`, after the `@layer base` block, add:

```css
@layer utilities {
  .u-display { font-size: var(--step-display); }
  .u-lead { font-size: var(--step-lead); max-width: 60ch; }
}
```

- [ ] **Step 4: Give Section a rhythm prop**

Rewrite `components/Section.tsx` entirely:

```tsx
import type { ReactNode } from "react";

const RHYTHM = {
  compact: "py-10",
  normal: "py-16 sm:py-20",
  spacious: "py-24 sm:py-32",
} as const;

export function Section({
  id,
  eyebrow,
  title,
  titleAs: Heading = "h2",
  intro,
  tinted = false,
  rhythm = "normal",
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  /** The page's leading Section uses "h1"; every other Section stays "h2". */
  titleAs?: "h1" | "h2";
  intro?: string;
  tinted?: boolean;
  /** Vertical rhythm. Uniform padding on every section gives the eye no cue
   *  about what groups with what, so this is chosen per section. */
  rhythm?: keyof typeof RHYTHM;
  children?: ReactNode;
}) {
  return (
    <section id={id} className={tinted ? "bg-sand" : undefined}>
      <div className={`mx-auto max-w-6xl px-5 ${RHYTHM[rhythm]}`}>
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-clay">
              {eyebrow}
            </p>
          )}
          <Heading>{title}</Heading>
          {intro && <p className="u-lead mt-4 leading-relaxed text-ink-soft">{intro}</p>}
        </div>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
```

Note the removed `text-3xl sm:text-4xl` — size now comes from the base layer by heading level, which is the whole point.

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit && npm run build && npm run verify:all` (dev server running)
Expected: tsc clean, build clean, all gates pass including `verify:layout`.

- [ ] **Step 6: Look at it**

Run: `npm run shots`, then read `.screenshots/home-desktop.png` and `.screenshots/pemf-desktop.png`.
Expected: page titles are now visibly larger than section headings. Confirm no heading has become sage-on-sage inside the CTA band — if it has, the type rules escaped `@layer base`.

- [ ] **Step 7: Commit**

```bash
git add app/globals.css components/Section.tsx
git commit -m "Add type scale and section rhythm

Section rendered h1 and h2 at the same size, so a page title never
announced itself, and every section used the same py-14 regardless of
whether it grouped with its neighbour."
```

---

### Task 3: Plate surface and the aligned panel grid

The ragged card heights on `/pemf` come from `TriPanel` sizing each image to its own content. A fixed-aspect image slot fixes it.

**Files:**
- Modify: `app/globals.css` (plate utilities)
- Modify: `components/TriPanel.tsx` → rename export to `PanelGrid`
- Modify: every page importing `TriPanel` (tsc lists them)

**Interfaces:**
- Consumes: `Panel` from `lib/content/types`, `isSvg` from `lib/content/images`.
- Produces: `.u-plate` and `.u-plate-media` utilities; `PanelGrid({ heading, panels, tinted, panelTitleAs, rhythm })`. `panelTitleAs` keeps its exact current meaning and default.

- [ ] **Step 1: Add plate utilities**

In `app/globals.css`, inside the `@layer utilities` block from Task 2, add:

```css
  /* Bordered plate. No shadow: crisp edges read as precision, soft shadows on
     cream read as generic. --rule is a border colour only, never text. */
  .u-plate {
    background: var(--white);
    border: 1px solid var(--rule);
    border-radius: 12px;
  }
  /* Fixed-ratio media slot. This is what makes every card in a row align:
     identical image height means identical text baseline below it. */
  .u-plate-media {
    background: var(--sand);
    border-radius: 8px;
    aspect-ratio: 4 / 3;
    overflow: hidden;
  }
```

- [ ] **Step 2: Rewrite the panel component**

Replace `components/TriPanel.tsx` entirely:

```tsx
import Image from "next/image";
import type { Panel } from "@/lib/content/types";
import { isSvg } from "@/lib/content/images";

const RHYTHM = {
  compact: "py-10",
  normal: "py-16 sm:py-20",
  spacious: "py-24 sm:py-32",
} as const;

/** The document's recurring three-column block. Every panel is a bordered
 *  plate of equal height, with a fixed-ratio media slot so the text baselines
 *  line up across the row. Collapses to one column below 1024px. */
export function PanelGrid({
  heading,
  panels,
  tinted = false,
  panelTitleAs = "h3",
  rhythm = "normal",
}: {
  heading?: string;
  panels: Panel[];
  tinted?: boolean;
  /** Level for each panel's own title (panel.title), default "h3" -- correct
   *  when `heading` renders its own h2 directly above them. A page that
   *  places this grid straight after its `<Section titleAs="h1" />` with no
   *  `heading` here has nothing at h2, so panel titles must be "h2"
   *  themselves or the page skips a level (h1 -> h3). See app/energy,
   *  app/mental-health and app/pets-health. verify:layout gates this. */
  panelTitleAs?: "h2" | "h3";
  rhythm?: keyof typeof RHYTHM;
}) {
  const PanelHeading = panelTitleAs;
  return (
    <div className={tinted ? "bg-sand" : undefined}>
      <div className={`mx-auto max-w-6xl px-5 ${RHYTHM[rhythm]}`}>
        {heading && <h2 className="mb-10">{heading}</h2>}
        <div className="grid items-stretch gap-8 lg:grid-cols-3">
          {panels.map((panel, i) => (
            // Index key is safe: panels is a static list, never reordered or
            // filtered, and only changes when the page's content module changes.
            // Keying on title/image would collide if two panels shared a title.
            <div key={i} className="u-plate flex flex-col p-6">
              {panel.image && (
                <div className="u-plate-media mb-5">
                  <Image
                    src={panel.image.src}
                    alt={panel.image.decorative ? "" : panel.image.alt}
                    aria-hidden={panel.image.decorative || undefined}
                    unoptimized={isSvg(panel.image.src)}
                    width={700}
                    height={525}
                    className={
                      panel.image.contain
                        ? "h-full w-full object-contain p-3"
                        : "h-full w-full object-cover"
                    }
                  />
                </div>
              )}
              {panel.title && <PanelHeading>{panel.title}</PanelHeading>}
              {panel.paragraphs?.map((p) => (
                <p key={p} className="mt-3 text-ink-soft">
                  {p}
                </p>
              ))}
              {panel.items && (
                <dl className="mt-3 space-y-3">
                  {panel.items.map((item) => (
                    <div key={item.term}>
                      <dt className="font-bold text-ink">{item.term}</dt>
                      {item.text && <dd className="text-ink-soft">{item.text}</dd>}
                    </div>
                  ))}
                </dl>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Let tsc find every call site**

Run: `npx tsc --noEmit`
Expected: errors naming each file that imports `TriPanel`. Record that list.

- [ ] **Step 4: Update every call site**

In each file from Step 3, change the import `TriPanel` → `PanelGrid` and every `<TriPanel` → `<PanelGrid`. Change nothing else — not props, not order. `panelTitleAs="h2"` stays exactly where it is on `/energy`, `/mental-health` and `/pets-health`.

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit && npm run build && npm run verify:all` (dev server running)
Expected: all clean. `verify:layout` passing here is the proof that Step 4 did not drop a `panelTitleAs`.

- [ ] **Step 6: Look at it**

Run: `npm run shots`, read `.screenshots/pemf-desktop.png`.
Expected: the three cards under "Magnetic Field Energy is Essential for Health" are now equal height with images of identical height. The middle text-only card no longer floats.

- [ ] **Step 7: Commit**

```bash
git add app/globals.css components/TriPanel.tsx app
git commit -m "Align panel rows on a fixed media slot

TriPanel sized each image to its own content, so a text-only card floated
beside a tall one. A fixed 4:3 slot gives every card the same image height
and therefore the same text baseline. Renamed to PanelGrid; panelTitleAs
keeps its meaning and verify:layout gates it."
```

---

### Task 4: Plate treatment for SplitBand, Figure and Card

**Files:**
- Modify: `components/SplitBand.tsx`, `components/Figure.tsx`, `components/Card.tsx`

**Interfaces:**
- Consumes: `.u-plate`, `.u-plate-media` from Task 3.
- Produces: `SplitBand` gains `rhythm`; `Card` keeps its full existing prop signature (`image`, `alt`, `eyebrow`, `title`, `body`, `imageAspect`, `imageFit`, `href`, `cta`, `children`) so no page changes.

- [ ] **Step 1: SplitBand — framed visual, no floating card**

In `components/SplitBand.tsx`, add the same `RHYTHM` constant used in Task 3 and a `rhythm` prop (`keyof typeof RHYTHM`, default `"normal"`); change `py-14` to `${RHYTHM[rhythm]}`; and replace the image wrapper:

```tsx
          <div className={reverse ? "lg:order-2" : undefined}>
            <div className="u-plate u-plate-media">
              <Image
                src={image.src}
                alt={image.decorative ? "" : image.alt}
                aria-hidden={image.decorative || undefined}
                unoptimized={isSvg(image.src)}
                width={900}
                height={675}
                className={
                  image.contain
                    ? "h-full w-full object-contain p-4"
                    : "h-full w-full object-cover"
                }
              />
            </div>
          </div>
```

Also drop `text-3xl` from its `<h2>` so the heading takes its size from the base layer.

- [ ] **Step 2: Figure — bordered plate**

In `components/Figure.tsx`, change the `Image` `className` from `"w-full rounded-3xl"` to `"w-full rounded-[12px]"` and wrap it so the figure reads as a plate: give the `<figure>` `className="u-plate overflow-hidden"` and move the caption inside with `className="px-5 py-4 text-lg text-ink-soft"` (replacing its current `mt-4` classes).

- [ ] **Step 3: Card — same plate, no shadow**

In `components/Card.tsx`, change the `shell` constant to:

```tsx
const shell = "u-plate flex flex-col overflow-hidden";
```

and remove the `transition-shadow hover:shadow-md` branch so the wrapper is always `shell`. In `FrequencyCard` and `Banner`, replace `rounded-3xl border border-rule bg-white shadow-sm` with `u-plate` (keep their padding classes).

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit && npm run build && npm run verify:all`
Expected: all clean.

- [ ] **Step 5: Look at it**

Run: `npm run shots`, read `.screenshots/home-desktop.png`, `.screenshots/products-desktop.png`, `.screenshots/pemf-desktop.png`.
Expected: no drop shadows anywhere; every surface has a visible 1px edge; no image is cropped in a way that loses meaning — check the `contain` diagrams especially, since they now sit in a fixed-ratio slot.

- [ ] **Step 6: Commit**

```bash
git add components
git commit -m "Give every surface a bordered plate

Replaces floating white cards and drop shadows with a 1px --rule edge at
12px radius. Crisp edges read as precision; soft shadows on cream read as
generic."
```

---

### Task 5: Hero

> **Read before starting.** `app/page.tsx` currently carries this comment above the hero:
> *"The document's only hero image is the IMRS Model 3 photograph, which the client asked to
> be shown in its own section rather than behind the headline — see the Figure directly
> below."*
>
> That is a recorded client instruction. The split hero does **not** put the photograph
> behind the headline — text and image occupy separate columns and never overlap, which is
> why AAA holds structurally. So this is compatible on a literal reading. It is still a
> change to something the client asked for, so **the confirmation in Step 0 is required
> before any code is written.** If the client meant "not adjacent to the headline at all",
> stop and report; the rest of the plan does not depend on this task.

**Files:**
- Create: `components/Hero.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `hero` from `lib/content/home` (fields: `eyebrow: string`, `title: string`, `paragraphs: string[]` — there is no `lead` field), `images.imrsModel3`, `PhoneButton`.
- Produces: `Hero({ eyebrow, title, paragraphs, image })`.

- [ ] **Step 0: Confirm the client instruction still permits this**

Ask the user to confirm the split hero is acceptable given the comment above. Do not proceed on assumption. Record their answer in the commit message.

- [ ] **Step 1: Write the component**

Create `components/Hero.tsx`:

```tsx
import Image from "next/image";
import Link from "next/link";
import type { Img } from "@/lib/content/types";
import { PhoneButton } from "./PhoneButton";

/** Split hero: copy on solid cream at left, photograph bleeding to the right
 *  edge. Text never sits on the image, so AAA contrast is structural rather
 *  than something to re-check for every photograph. */
export function Hero({
  eyebrow,
  title,
  paragraphs,
  image,
}: {
  eyebrow: string;
  title: string;
  /** lib/content/home.ts stores hero body copy as an array, not a single
   *  string. Rendering each entry as its own <p> keeps it verbatim. */
  paragraphs: string[];
  image: Img;
}) {
  return (
    <section className="border-b border-rule">
      <div className="grid lg:grid-cols-2 lg:items-stretch">
        <div className="flex items-center px-5 py-16 sm:py-20 lg:justify-end">
          <div className="w-full max-w-xl lg:pr-12">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-clay">
              {eyebrow}
            </p>
            <h1 className="u-display">{title}</h1>
            {paragraphs.map((p) => (
              <p key={p} className="u-lead mt-6 leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
            <div className="mt-9 flex flex-wrap gap-4">
              <PhoneButton />
              <Link
                href="/pemf"
                className="inline-flex min-h-[56px] items-center justify-center rounded-full border-[3px] border-sage px-8 text-lg font-bold text-sage no-underline hover:bg-sand"
              >
                What is PEMF?
              </Link>
            </div>
          </div>
        </div>
        <div className="relative min-h-[22rem] lg:min-h-[34rem]">
          <Image
            src={image.src}
            alt={image.decorative ? "" : image.alt}
            aria-hidden={image.decorative || undefined}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
```

`What is PEMF?` is already in `CHROME_ALLOWLIST` in `scripts/verify-jsx-copy.mjs`, so it passes the copy gate. Introduce no other literal here.

- [ ] **Step 2: Use it on the home page**

In `app/page.tsx`, delete the hand-rolled `<section className="bg-cream">...</section>` block (the one containing `hero.eyebrow`, the `h1`, the `hero.paragraphs` map, `PhoneButton` and the "What is PEMF?" link) **and** the `<Figure image={images.imrsModel3} tinted />` immediately below it, replacing both with:

```tsx
      <Hero
        eyebrow={hero.eyebrow}
        title={hero.title}
        paragraphs={hero.paragraphs}
        image={images.imrsModel3}
      />
```

Add `import { Hero } from "@/components/Hero";`. Remove the now-unused `Link` and `PhoneButton` imports **only if** nothing else in the file uses them — check first; `tsc` will not error on an unused import but lint will warn. Do not edit `lib/content/home.ts`.

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit && npm run build && npm run verify:all`
Expected: all clean. `verify:layout` must still report exactly one h1 on `/`.

- [ ] **Step 4: Look at it, at both widths**

Run: `npm run shots`, read `.screenshots/home-desktop.png` and `.screenshots/home-phone.png`.
Expected: on desktop the photo reaches the right edge with no gutter and the copy block is vertically centred; on phone the copy stacks above the photo and nothing is cropped to illegibility. The memory note applies: a viewport taller than the content pushes the footer down and creates a fake gap — that is not a bug.

- [ ] **Step 5: Commit**

```bash
git add components/Hero.tsx app/page.tsx
git commit -m "Add the split hero

The headline sat in a half-width block on flat cream with the main
photograph exiled to a separate band below it, so nothing anchored the top
of the page. Text stays off the image, which keeps AAA structural."
```

---

### Task 6: Credibility strip

**Files:**
- Create: `components/TrustStrip.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `site.officePhone`, `site.officePhoneHref`, `site.address`, and `details.visits` from `lib/content/contact` (the verbatim `Office and Home Visits Available`).
- Produces: `TrustStrip()` — no props.

- [ ] **Step 1: Confirm every string exists verbatim before writing it**

Run:

```bash
grep -c "Certified PEMF Expert Sharon" docs/exiga-jasmin-2026*.txt
grep -c "Office and Home Visits Available" docs/exiga-jasmin-2026*.txt
```

Expected: non-zero for both. If either is zero, stop and report — the strip cannot be built from strings the client did not write, and `verify:jsx` will reject it.

- [ ] **Step 2: Write the component**

Create `components/TrustStrip.tsx`:

```tsx
import { site } from "@/lib/site";
import { details } from "@/lib/content/contact";

/** Credibility strip under the hero. Every string here is verbatim from the
 *  client's document -- see the copy lock in the plan's Global Constraints.
 *  No claim is made that the document does not already make. */
export function TrustStrip() {
  return (
    <div className="border-b border-rule bg-sand">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-10 gap-y-1 px-5 py-2">
        <p className="flex min-h-[48px] items-center font-medium text-ink">
          Certified PEMF Expert Sharon
        </p>
        <p className="flex min-h-[48px] items-center text-ink-soft">{details.visits}</p>
        <p className="flex min-h-[48px] items-center text-ink-soft">
          {site.address.join(", ")}
        </p>
        <a
          href={site.officePhoneHref}
          className="flex min-h-[48px] items-center font-medium text-clay underline-offset-4 hover:underline"
        >
          {site.officePhone}
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Place it directly beneath the hero**

In `app/page.tsx`, add `import { TrustStrip } from "@/components/TrustStrip";` and put `<TrustStrip />` immediately after `<Hero ... />`.

- [ ] **Step 4: Verify the copy gate accepts it**

Run: `npm run verify:jsx`
Expected: `All JSX copy verbatim`. If it fails on `Certified PEMF Expert Sharon`, the string is being split across JSX nodes — put it in a single text node.

- [ ] **Step 5: Full verify**

Run: `npx tsc --noEmit && npm run build && npm run verify:all`
Expected: all clean.

- [ ] **Step 6: Look at it, including phone width**

Run: `npm run shots`, read `.screenshots/home-desktop.png` and `.screenshots/home-phone.png`.
Expected: one row on desktop, wrapping cleanly on phone with nothing truncated and every item at least 48px tall.

- [ ] **Step 7: Commit**

```bash
git add components/TrustStrip.tsx app/page.tsx
git commit -m "Add the credibility strip under the hero

Built entirely from strings already in the client's document: the
credential, the visits line, the address and the office number. This is the
element that does the most work for trust, and the copy lock is exactly why
it says only what the client already says."
```

---

### Task 7: Quiet disclaimer and band rhythm

**Files:**
- Modify: `components/Disclaimer.tsx`
- Modify: all ten `app/**/page.tsx`

**Interfaces:**
- Consumes: `Section`'s `rhythm` prop (Task 2), `PanelGrid`'s `rhythm` prop (Task 3), `SplitBand`'s `rhythm` prop (Task 4).

- [ ] **Step 1: Restyle the disclaimer**

Replace `components/Disclaimer.tsx`:

```tsx
import { site } from "@/lib/site";

/** The client's disclaimer, at the foot of every page as in the document.
 *  Quiet by design: a full sage band gave a legal notice the same visual
 *  weight as the call to action. Still AAA -- ink-soft on cream is 7:1+. */
export function Disclaimer() {
  return (
    <div className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <p className="text-base leading-relaxed text-ink-soft">
          <strong className="text-ink">Disclaimer:</strong> {site.disclaimer}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Confirm the contrast pair is declared**

Run: `npm run verify:contrast`
Expected: `All pairs AAA`. If `--ink-soft` on `--cream` is not among the checked pairs, add it to the pair list in `scripts/verify-contrast.mjs` rather than assuming it passes.

- [ ] **Step 3: Apply band rhythm, one page at a time**

For each of the ten pages, apply these rules and change nothing else:

- The page's opening `Section` gets `rhythm="spacious"`.
- `tinted` stays only where two adjacent sections are genuinely related; otherwise remove it so cream is the default ground. Never leave two tinted bands adjacent.
- The section immediately before `<CTA />` gets `rhythm="spacious"`.
- Everything else stays `normal`.

Work one page per step and re-run `npm run verify:layout` after each, so a mistake is attributed to one page.

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit && npm run build && npm run verify:all`
Expected: all clean.

- [ ] **Step 5: Look at every route**

Run: `npm run shots`, then read all ten `*-desktop.png`.
Expected: the CTA's sage band is the only strong colour block on each page; the disclaimer no longer competes with it; no two tinted bands sit adjacent.

- [ ] **Step 6: Commit**

```bash
git add components/Disclaimer.tsx app
git commit -m "Quiet the disclaimer and give bands a purpose

The disclaimer was a full sage slab carrying the same weight as the call to
action. Cream is now the default ground, sand groups related sections, and
sage is reserved for the CTA so it reads as the one action on the page."
```

---

### Task 8: Full-site visual pass

**Files:**
- Modify: whichever files the defects found here require.

- [ ] **Step 1: Capture every route at all three viewports**

Run: `npm run dev` (background), then `npm run shots`
Expected: 30 screenshots in `.screenshots/`.

- [ ] **Step 2: Read all thirty and write down every defect**

Read each file. Look specifically for: images cropped to illegibility inside the new fixed-ratio slots; headings that lost contrast on a tinted band; card rows that still fail to align; text over 65ch; tap targets that shrank.

Two known non-bugs, per the project's memory: a viewport taller than the content pushes the `mt-auto` footer down and creates a fake gap, and sticky headers duplicate mid-page in full-page captures. Also `npm run shots` uses one-shot capture with no scroll, so the `/contact` map iframe renders blank — a harness artifact, not a regression.

- [ ] **Step 3: Fix each defect, re-running `npm run shots` after each**

Fix one defect at a time. Re-capture and confirm the fix before moving to the next, so no fix silently introduces the next defect.

- [ ] **Step 4: Final gate run**

Run: `npx tsc --noEmit && npm run build && npm run verify:all`
Expected: tsc clean, build clean at 16 routes, contrast AAA, copy verbatim, JSX copy verbatim, all heading outlines valid, all route and redirect checks passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Fix defects found in the full-site visual pass"
```

---

## Self-Review

**Spec coverage.** Type scale → Task 2. Spacing scale → Task 2. Bordered plates → Tasks 3–4. Hero → Task 5. Credibility strip → Task 6. Section templates → Tasks 3–4 (`PanelGrid`, `SplitBand`, `Figure`, `Section`). Band rhythm → Task 7. Heading-colour trap → guarded by Global Constraints and checked in Task 2 Step 6. Disclaimer → Task 7. `panelTitleAs` preservation → Task 3 plus the Task 1 gate. Verification plan → every task's look-at-it step, plus Task 8.

**Deliberate spec deviation.** The spec lists tap-target checking under verification. Task 1's gate covers heading order only, because tap-target size cannot be measured from HTML without a layout engine. Tap targets remain a manual check in Task 8 Step 2. Flagged rather than silently dropped.

**Not covered, by design.** `areaServed`, `site.deviceNote`, the custom domain, and photograph consistency across product shots are all listed out of scope in the spec and need the client.
