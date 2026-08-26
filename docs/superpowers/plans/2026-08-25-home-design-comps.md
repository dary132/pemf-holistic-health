# Home Design Comps Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build three structurally different home-page compositions at `/designs/editorial`, `/designs/clinical` and `/designs/photographic` so the client can choose a direction, then delete the two that lose.

**Architecture:** One plain page file per comp under `app/designs/`, each importing the same `lib/content/home.ts` content layer and the same shared `<CTA>`/`<Disclaimer>`. Layout pieces unique to a comp live in `components/designs/<comp>/` and are imported only by that comp. No shared abstraction between comps and no `data-design` attribute — choosing one direction must be `rm -rf` on the other two, not an unpick.

**Tech Stack:** Next.js 16.3 (App Router, Turbopack), React 19.2, Tailwind CSS v4 (`@theme inline` tokens in `app/globals.css`), TypeScript 5. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-08-24-home-design-comps-design.md` — read it before Task 1, including the 2026-08-25 Amendment section at the end.

## Global Constraints

Every task's requirements implicitly include all of these.

- **Copy is locked verbatim.** Every visitor-facing string must already appear in `docs/exiga-jasmin-2026.txt` or `docs/exiga-jasmin-2026-image-text.txt`, or `verify:copy` / `verify:jsx` fail the build. The client cites FDA exposure. **No comp introduces a single new word.** The only exceptions are short non-claim UI labels in `CHROME_ALLOWLIST` (`scripts/verify-jsx-copy.mjs`) and files listed in `NOT_SITE_COPY` there.
- **Base type is 19px, rising to 20px above 640px.** No comp shrinks it.
- **AAA (7:1) contrast** on all four palettes, enforced by `scripts/verify-contrast.mjs` (72 pairs, worst 7.16:1). No comp relaxes this.
- **56px minimum tap targets** on every call to action (`min-h-[56px]`).
- **Exactly one `<h1>` per page, no skipped heading levels** — enforced by `scripts/verify-layout.mjs`.
- **No hover-only navigation.**
- **The four palettes must all work.** Comps use semantic classes (`bg-cream`, `bg-sand`, `bg-band`, `text-sage`, `text-clay`, `text-ink`, `text-ink-soft`, `border-rule`) and never literal hexes. `?theme=ocean|sunrise|spectrum` on any URL applies a palette and makes it stick.
- **Never use `--sage-soft`, `--clay-soft` or `--rule` as a text colour or as a fill behind text.** `verify:contrast` fails the build on this.
- **The shared `<CTA>` and `<Disclaimer>` are imported, never reimplemented.** Changing `components/CTA.tsx` changes the ten live routes too.
- **Verifier scripts** run under `node --experimental-strip-types` and import `../lib/routes.ts` with an explicit `.ts` extension. Match that pattern.
- Full suite: `npm run verify:all`. `verify:layout` and `verify` need a running dev server; the other four do not.

## File Structure

| File | Responsibility |
|---|---|
| `scripts/verify-layout.mjs` | *modify* — add `COMP_ROUTES` so `/designs/*` heading outlines are checked. Comp routes are absent from `lib/routes.ts` by design, so they are invisible to this guard today. |
| `scripts/verify-jsx-copy.mjs` | *modify* — add `app/designs/page.tsx` to `NOT_SITE_COPY`. The index's prose is our instructions to the client, exactly like `/themes`. **The three comp pages are NOT added** — they render client copy and must stay checked. |
| `app/designs/page.tsx` | *create* — index listing the three directions, `noindex`, absent from `lib/routes.ts`. |
| `app/designs/editorial/page.tsx` | *create* — Editorial comp. |
| `app/designs/clinical/page.tsx` | *create* — Clinical comp. |
| `app/designs/photographic/page.tsx` | *create* — Photographic comp. |
| `components/designs/editorial/NumberedSection.tsx` | *create* — margin-numbered section with hairline rule. |
| `components/designs/editorial/PullQuote.tsx` | *create* — display-size quotation between sections. |
| `components/designs/clinical/CredentialStrip.tsx` | *create* — bordered trust row under the hero. |
| `components/designs/clinical/PlateCard.tsx` | *create* — bordered card with a coloured top rule. |
| `components/designs/photographic/ScrimHero.tsx` | *create* — full-bleed image with an overlaid wordmark on a computed scrim. |
| `app/themes/page.tsx` | *modify* — link to `/designs` so the client has one entry point. |

**Deleting a losing direction** = remove its `app/designs/<name>/` directory, its `components/designs/<name>/` directory, its entry in the index, and its route from `COMP_ROUTES`. Nothing else references it.

---

### Task 1: Route scaffolding and the layout guard that will police it

The guard comes first so every comp is checked from the moment it exists. A comp with two `<h1>`s is exactly the error these compositions invite and exactly what the client will not notice.

**Files:**
- Modify: `scripts/verify-layout.mjs`
- Modify: `scripts/verify-jsx-copy.mjs:221` (the `NOT_SITE_COPY` set)
- Create: `app/designs/page.tsx`

**Interfaces:**
- Consumes: `pageMetadata` from `lib/seo.ts` — `({ title: string, description: string, path: string }) => Metadata`. Not used here (the index sets `robots: noindex` directly via a plain `Metadata` export, matching `app/themes/page.tsx`).
- Produces: `COMP_ROUTES: string[]` exported from `scripts/verify-layout.mjs`. Tasks 2–4 each append their own route to this array.

- [ ] **Step 1: Add the failing guard — extend `verify-layout.mjs` to check comp routes**

In `scripts/verify-layout.mjs`, directly beneath the existing `import { routes } from "../lib/routes.ts";` line, add:

```js
// Comp routes are deliberately absent from lib/routes.ts -- they are review
// tooling, not pages of the client's site, so they must stay out of the nav
// and the sitemap. That also put them outside this guard's reach, which is
// the gap this list closes: a comp with two <h1>s is exactly the error these
// compositions invite and exactly what a client reviewing a layout will not
// notice. Each comp task appends its own route here as it is built; deleting
// a losing direction means deleting its line.
export const COMP_ROUTES = ["/designs"];
```

Then change the iteration in `main()` from:

```js
  for (const route of routes) {
```

to:

```js
  for (const route of [...routes, ...COMP_ROUTES.map((path) => ({ path }))]) {
```

- [ ] **Step 2: Run the guard and watch it fail**

```bash
npm run dev > /tmp/dev.log 2>&1 &
until grep -q "Ready in" /tmp/dev.log; do sleep 0.5; done
npm run verify:layout
```

Expected: `FAIL /designs: HTTP 404`, exit non-zero. This is the guard proving it reaches the new route before the route exists.

- [ ] **Step 3: Exempt the index from the copy guard**

The index describes the three directions in our words, not the client's. Add to the `NOT_SITE_COPY` set in `scripts/verify-jsx-copy.mjs` (currently containing `app/themes/page.tsx` and `components/ThemeSwitcher.tsx`):

```js
  join("app", "designs", "page.tsx"),
```

Extend that set's existing comment with:

```js
// app/designs/page.tsx is the same case as /themes: it names and describes
// three design directions ("Editorial", "Clinical", ...) which are our
// vocabulary for an internal review, never the client's copy. The three comp
// PAGES are deliberately NOT listed -- they render the document's own words
// and must stay checked, which is most of the point of comping them.
```

- [ ] **Step 4: Create the index page**

Create `app/designs/page.tsx`:

```tsx
import type { Metadata } from "next";
import Link from "next/link";

/* A review tool, not a page of the site. Same arrangement as /themes: absent
 * from lib/routes.ts, so out of the header nav, out of sitemap.xml and out of
 * scripts/verify-site.mjs -- all three read that one list -- and noindex so it
 * stays out of search results. The only way in is the link, which is exactly
 * what sharing it with the client needs. Delete this directory, and the two
 * losing directions, once one is chosen. */
export const metadata: Metadata = {
  title: "Design directions",
  robots: { index: false, follow: false },
};

const DIRECTIONS = [
  {
    href: "/designs/editorial?theme=",
    name: "Editorial",
    note: "The current site pushed much further. Wordmark hard left, photograph bleeding off the right edge, numbered sections, hairline rules. Premium and calm.",
  },
  {
    href: "/designs/clinical?theme=ocean",
    name: "Clinical",
    note: "Two-column hero and a credential strip directly beneath it. Bordered plates, three-column cards. Organised, credible, information-forward.",
  },
  {
    href: "/designs/photographic?theme=sunrise",
    name: "Photographic",
    note: "Full-bleed photograph with the wordmark on a scrim, alternating image bands. Warm and aspirational — and undersold by the one lifestyle photograph that exists.",
  },
];

export default function Designs() {
  return (
    <main id="main">
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h1>Design directions</h1>
          <span className="u-accent-rule" />
          <p className="u-lead mt-6 text-ink-soft">
            Three home pages, three directions. Each opens in the palette that suits it;
            the picker at{" "}
            <Link href="/themes">Theme preview</Link> still re-skins any of them. Nothing
            here is live to the public.
          </p>

          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {DIRECTIONS.map((d) => (
              <li key={d.href} className="u-plate p-6">
                <h2 className="text-2xl">
                  <Link href={d.href}>{d.name}</Link>
                </h2>
                <span className="u-accent-rule" />
                <p className="mt-4 leading-relaxed text-ink-soft">{d.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 5: Run the guards and watch them pass**

```bash
npm run verify:layout
npm run verify:jsx
npm run verify:copy
```

Expected: `ok   /designs           h1 h2 h2 h2`, `All JSX copy verbatim`, `All copy verbatim`.

- [ ] **Step 6: Confirm the index is genuinely hidden**

```bash
curl -s http://localhost:3000/sitemap.xml | grep -c designs   # expect 0
curl -s http://localhost:3000/designs | grep -o 'name="robots" content="[^"]*"'  # expect noindex
npm run verify                                                # site checks still pass
```

- [ ] **Step 7: Commit**

```bash
git add scripts/verify-layout.mjs scripts/verify-jsx-copy.mjs app/designs/page.tsx
git commit -m "Add /designs index and extend the layout guard to reach it"
```

---

### Task 2: Editorial comp

**Files:**
- Create: `components/designs/editorial/NumberedSection.tsx`
- Create: `components/designs/editorial/PullQuote.tsx`
- Create: `app/designs/editorial/page.tsx`
- Modify: `scripts/verify-layout.mjs` (append to `COMP_ROUTES`)

**Interfaces:**
- Consumes: `hero`, `holisticApproach`, `holisticAnatomy`, `teasers` from `lib/content/home.ts`; `images` from `lib/content/images.ts`; `Img` from `lib/content/types.ts`; `CTA` from `components/CTA.tsx`; `Disclaimer` from `components/Disclaimer.tsx`; `PhoneButton` from `components/PhoneButton.tsx` (`({ variant?: "solid" | "outline" }) => JSX.Element`).
- Produces: `NumberedSection({ n, id, title, children }: { n: string; id: string; title: string; children: ReactNode })` and `PullQuote({ text }: { text: string })`. Neither is used outside this comp.

- [ ] **Step 1: Add the route to the guard and watch it fail**

In `scripts/verify-layout.mjs`, change `COMP_ROUTES` to:

```js
export const COMP_ROUTES = ["/designs", "/designs/editorial"];
```

Run: `npm run verify:layout`
Expected: `FAIL /designs/editorial: HTTP 404`.

- [ ] **Step 2: Create `NumberedSection`**

```tsx
import type { ReactNode } from "react";

/** Editorial's structural device: the section number sits in the outer margin
 *  as a hairline-ruled marker rather than in the heading. Bare numerals are
 *  safe under the copy guard -- verify-jsx-copy.mjs only checks text nodes
 *  with at least two words and at least one letter, so "01" is skipped by
 *  design rather than by luck (see the spec's Constraints section). */
export function NumberedSection({
  n,
  id,
  title,
  children,
}: {
  n: string;
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id}>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="grid gap-8 md:grid-cols-[4rem_1fr]">
          <div aria-hidden="true" className="hidden md:block">
            <span className="text-2xl font-bold tabular-nums text-clay">{n}</span>
            <span className="mt-3 block h-px w-full bg-rule" />
          </div>
          <div>
            <h2 className="max-w-[20ch]">{title}</h2>
            <span className="u-accent-rule" />
            <div className="mt-8 max-w-[62ch]">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `PullQuote`**

```tsx
/** A sentence lifted from the body copy and set at display size between
 *  sections. The repetition is the device and is deliberate: this sentence
 *  also appears inside the Holistic Approach paragraphs. The spec flags it
 *  because it WILL read as duplication to anyone not expecting it -- say so
 *  when showing the client, do not quietly drop it. */
export function PullQuote({ text }: { text: string }) {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-5 py-16">
        <blockquote className="mx-auto max-w-[24ch] text-center font-[family-name:var(--font-display)] text-4xl leading-tight text-sage sm:text-5xl">
          {text}
        </blockquote>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create the Editorial page**

```tsx
import Image from "next/image";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { PhoneButton } from "@/components/PhoneButton";
import { NumberedSection } from "@/components/designs/editorial/NumberedSection";
import { PullQuote } from "@/components/designs/editorial/PullQuote";
import { images } from "@/lib/content/images";
import { hero, holisticAnatomy, holisticApproach, teasers } from "@/lib/content/home";

export const metadata = { robots: { index: false, follow: false } };

export default function Editorial() {
  return (
    <main id="main">
      {/* Hero: wordmark hard left at display size, photograph bleeding off the
          right edge of the viewport. The asymmetry is the direction's whole
          signature -- do not centre this while "tidying". */}
      <section className="bg-cream">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="mx-auto w-full max-w-3xl px-5 pt-16 lg:pl-[max(1.25rem,calc((100vw-72rem)/2))] lg:pt-24">
            {/* No alignment class needed: .u-wordmark is display:inline-block and sets
                no text-align of its own -- the live hero centres it via a parent
                `text-center`, and this parent has none, so it sits left. */}
            <h1 className="u-wordmark u-technicolor">{hero.wordmark}</h1>
            <p className="mt-4 text-xl font-bold uppercase tracking-[0.16em] text-clay sm:text-2xl">
              {hero.expansion}
            </p>
            <h2 className="mt-10">{hero.title}</h2>
            <span className="u-accent-rule" />
            {hero.paragraphs.map((p) => (
              <p key={p} className="mt-6 max-w-[52ch] text-xl text-ink-soft">
                {p}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-4 pb-16">
              <PhoneButton />
              <Link
                href="/contact"
                className="inline-flex min-h-[56px] items-center justify-center rounded-full border-[3px] border-sage px-8 text-lg font-bold text-sage no-underline hover:bg-sand"
              >
                Visit Us
              </Link>
            </div>
          </div>
          {/* Bleeds right: no max-width, no rounded right corner. */}
          <div className="lg:-mr-0">
            <Image
              src={images.heroMatFireplace.src}
              alt={images.heroMatFireplace.alt}
              priority
              width={1200}
              height={800}
              className="h-full w-full rounded-l-3xl object-cover lg:min-h-[36rem]"
            />
          </div>
        </div>
      </section>

      <NumberedSection n="01" id="approach" title={holisticApproach.title}>
        {holisticApproach.paragraphs.map((p) => (
          <p key={p} className="mt-5 text-lg leading-relaxed text-ink-soft first:mt-0">
            {p}
          </p>
        ))}
      </NumberedSection>

      <PullQuote text="PEMF is a holistic approach to promote a state of total wellness." />

      <NumberedSection n="02" id="anatomy" title={holisticAnatomy.title}>
        {holisticAnatomy.paragraphs.map((p) => (
          <p key={p} className="mt-5 text-lg leading-relaxed text-ink-soft first:mt-0">
            {p}
          </p>
        ))}
      </NumberedSection>

      {/* Borderless cards: image, hairline rule, title, body. Two columns,
          wide gutters. No plate, no shadow -- the rule does the work. */}
      <NumberedSection n="03" id="explore" title="Explore">
        <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2">
          {teasers.map((t) => (
            <article key={t.href}>
              <Image
                src={t.image.src}
                alt={t.image.alt}
                width={800}
                height={450}
                className={`aspect-[16/9] w-full rounded-2xl ${
                  t.image.contain ? "object-contain" : "object-cover"
                }`}
              />
              <span className="mt-5 block h-px w-full bg-rule" />
              <h3 className="mt-5 text-xl">
                <Link href={t.href}>{t.title}</Link>
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{t.body}</p>
            </article>
          ))}
        </div>
      </NumberedSection>

      <CTA />
      <Disclaimer />
    </main>
  );
}
```

- [ ] **Step 5: Run the guards and watch them pass**

```bash
npm run verify:layout   # expect: ok   /designs/editorial  h1 h2 h2 h2 h2 h3 ... h2
npm run verify:jsx      # expect: All JSX copy verbatim
npm run verify:contrast # expect: All pairs AAA
```

If `verify:jsx` fails on `Explore`, note it is already in `CHROME_ALLOWLIST` — the failure would instead be a genuinely new string, so read the message rather than widening the allowlist.

- [ ] **Step 6: Look at it in all four palettes**

```bash
mkdir -p /tmp/comps
for t in "" ocean sunrise spectrum; do
  google-chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
    --virtual-time-budget=4000 --window-size=1440,3000 \
    --user-data-dir=$(mktemp -d) \
    --screenshot=/tmp/comps/editorial-${t:-default}.png \
    "http://localhost:3000/designs/editorial?theme=$t"
done
```

Open all four. The `--virtual-time-budget` and the fresh `--user-data-dir` are both required: without them Chrome captures pre-hydration state and serves a cached render. Both have caused false alarms on this project before.

Check specifically: the wordmark is left-aligned and not centred; the photograph reaches the right viewport edge on desktop; the pull quote is legible in every palette; the hero stacks sensibly at 390px.

- [ ] **Step 7: Commit**

```bash
git add scripts/verify-layout.mjs components/designs/editorial app/designs/editorial
git commit -m "Add the Editorial design comp"
```

---

### Task 3: Clinical comp

**Files:**
- Create: `components/designs/clinical/CredentialStrip.tsx`
- Create: `components/designs/clinical/PlateCard.tsx`
- Create: `app/designs/clinical/page.tsx`
- Modify: `scripts/verify-layout.mjs` (append to `COMP_ROUTES`)

**Interfaces:**
- Consumes: same content exports as Task 2, plus `site` from `lib/site.ts` (`site.name`, `site.address: string[]`, `site.officePhone`, `site.officePhoneHref`).
- Produces: `CredentialStrip()` (no props) and `PlateCard({ image, title, body, href }: { image: Img; title: string; body: string; href: string })`.

- [ ] **Step 1: Add the route to the guard and watch it fail**

```js
export const COMP_ROUTES = ["/designs", "/designs/editorial", "/designs/clinical"];
```

Run: `npm run verify:layout` → `FAIL /designs/clinical: HTTP 404`.

- [ ] **Step 2: Create `CredentialStrip`**

```tsx
/** Clinical's whole argument: front-load the reasons to trust the practice,
 *  directly beneath the hero, before the visitor has to scroll for them.
 *
 *  Two strings, not three. The Lake Forest address was in the original spec
 *  and was removed in the 2026-08-25 amendment: it already appears three
 *  times on every page (sticky header bar, the closing CTA band since
 *  22f3bfa, and the footer), so a fourth instance one screen below the third
 *  buys nothing. What remains is trust claims rather than wayfinding, which
 *  is what earns space above the fold; wayfinding belongs beside the Get
 *  Directions button at the foot. Do not "restore" the address here.
 *
 *  Both strings are verbatim from the client document. "Office and Home
 *  Visits Available" is set there across two lines and normalise() collapses
 *  the break before matching -- components/CTA.tsx has rendered the joined
 *  form since 22f3bfa and verify:jsx passes it unexempted. */
export function CredentialStrip() {
  return (
    <section className="border-y-2 border-rule bg-sand">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-6 text-center sm:flex-row sm:justify-center sm:gap-10 sm:text-left">
        <p className="text-lg font-bold text-ink">Certified PEMF Expert Sharon</p>
        <span aria-hidden="true" className="hidden h-6 w-px bg-rule sm:block" />
        <p className="text-lg font-bold text-ink">Office and Home Visits Available</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `PlateCard`**

```tsx
import Image from "next/image";
import Link from "next/link";
import type { Img } from "@/lib/content/types";

/** Bordered card with a coloured top rule. The rule is `bg-band`, so under
 *  Vital Spectrum each card inherits whichever spectrum colour its position
 *  assigns -- the same mechanism the section headings use. Under the other
 *  three palettes --band resolves to that palette's primary. */
export function PlateCard({
  image,
  title,
  body,
  href,
}: {
  image: Img;
  title: string;
  body: string;
  href: string;
}) {
  return (
    <article className="u-plate overflow-hidden">
      <span aria-hidden="true" className="block h-1.5 w-full bg-band" />
      <div className="p-5">
        <div className="u-plate-media">
          <Image
            src={image.src}
            alt={image.alt}
            width={600}
            height={450}
            className={`h-full w-full ${image.contain ? "object-contain" : "object-cover"}`}
          />
        </div>
        <h3 className="mt-5 text-xl">
          <Link href={href}>{title}</Link>
        </h3>
        <p className="mt-3 leading-relaxed text-ink-soft">{body}</p>
      </div>
    </article>
  );
}
```

- [ ] **Step 4: Create the Clinical page**

```tsx
import Image from "next/image";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { PhoneButton } from "@/components/PhoneButton";
import { Section } from "@/components/Section";
import { CredentialStrip } from "@/components/designs/clinical/CredentialStrip";
import { PlateCard } from "@/components/designs/clinical/PlateCard";
import { images } from "@/lib/content/images";
import { hero, holisticAnatomy, holisticApproach, teasers } from "@/lib/content/home";

export const metadata = { robots: { index: false, follow: false } };

export default function Clinical() {
  return (
    <main id="main">
      {/* Two-column hero: everything a visitor reads on the left, the
          photograph in a bordered plate on the right. No bleed anywhere in
          this direction -- consistent margins are the point. */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            {/* No alignment class needed: .u-wordmark is display:inline-block and sets
                no text-align of its own -- the live hero centres it via a parent
                `text-center`, and this parent has none, so it sits left. */}
            <h1 className="u-wordmark u-technicolor">{hero.wordmark}</h1>
            <p className="mt-4 text-xl font-bold uppercase tracking-[0.16em] text-clay sm:text-2xl">
              {hero.expansion}
            </p>
            <h2 className="mt-8">{hero.title}</h2>
            <span className="u-accent-rule" />
            {hero.paragraphs.map((p) => (
              <p key={p} className="mt-6 max-w-[52ch] text-xl text-ink-soft">
                {p}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-4">
              <PhoneButton />
              <Link
                href="/contact"
                className="inline-flex min-h-[56px] items-center justify-center rounded-full border-[3px] border-sage px-8 text-lg font-bold text-sage no-underline hover:bg-sand"
              >
                Visit Us
              </Link>
            </div>
          </div>
          <div className="u-plate p-3">
            <Image
              src={images.heroMatFireplace.src}
              alt={images.heroMatFireplace.alt}
              priority
              width={1200}
              height={800}
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </section>

      <CredentialStrip />

      <Section id="approach" title={holisticApproach.title}>
        <div className="grid gap-8 md:grid-cols-3">
          {holisticApproach.paragraphs.map((p) => (
            <p key={p} className="u-plate p-6 leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}
        </div>
      </Section>

      <Section id="anatomy" title={holisticAnatomy.title} tinted>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="u-plate p-3">
            <Image
              src={images.holisticAnatomy.src}
              alt={images.holisticAnatomy.alt}
              width={800}
              height={600}
              className="w-full rounded-lg"
            />
          </div>
          <div>
            {holisticAnatomy.paragraphs.map((p) => (
              <p key={p} className="text-lg leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section id="explore" title="Explore">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teasers.map((t) => (
            <PlateCard
              key={t.href}
              image={t.image}
              title={t.title}
              body={t.body}
              href={t.href}
            />
          ))}
        </div>
      </Section>

      <CTA />
      <Disclaimer />
    </main>
  );
}
```

- [ ] **Step 5: Run the guards and watch them pass**

```bash
npm run verify:layout   # expect: ok   /designs/clinical  h1 h2 h2 h2 h2 h3 ... h2
npm run verify:jsx
npm run verify:contrast
```

- [ ] **Step 6: Verify the Sharon line appears exactly twice, and the address exactly three times**

This is the amendment's whole point, so check it rather than assume it:

```bash
curl -s "http://localhost:3000/designs/clinical" | grep -o "Certified PEMF Expert Sharon" | wc -l   # expect 2
curl -s "http://localhost:3000/designs/clinical" | grep -o "22706 Aspan St" | wc -l                 # expect 3
```

Two Sharon lines is correct and deliberate (credential strip + closing band). **Three** addresses is correct: header bar, CTA band, footer. If the address count is 4, the strip has regained it — remove it again and re-read the comment in `CredentialStrip.tsx`.

- [ ] **Step 7: Look at it in all four palettes**

```bash
for t in "" ocean sunrise spectrum; do
  google-chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
    --virtual-time-budget=4000 --window-size=1440,3000 --user-data-dir=$(mktemp -d) \
    --screenshot=/tmp/comps/clinical-${t:-default}.png \
    "http://localhost:3000/designs/clinical?theme=$t"
done
```

Check specifically: under Vital Spectrum the card top rules walk different colours rather than all matching; the credential strip stacks to one column at 390px without the divider pips stranding.

- [ ] **Step 8: Commit**

```bash
git add scripts/verify-layout.mjs components/designs/clinical app/designs/clinical
git commit -m "Add the Clinical design comp"
```

---

### Task 4: Photographic comp

**Files:**
- Create: `components/designs/photographic/ScrimHero.tsx`
- Create: `app/designs/photographic/page.tsx`
- Modify: `scripts/verify-layout.mjs` (append to `COMP_ROUTES`)

**Interfaces:**
- Consumes: same content exports as Task 2.
- Produces: `ScrimHero({ image, wordmark, expansion }: { image: Img; wordmark: string; expansion: string })`.

**Read before starting:** the spec's "Text over images" section. This is the only place AAA is genuinely hard, and the scrim must be heavier than a tasteful wash.

- [ ] **Step 1: Add the route to the guard and watch it fail**

```js
export const COMP_ROUTES = [
  "/designs",
  "/designs/editorial",
  "/designs/clinical",
  "/designs/photographic",
];
```

Run: `npm run verify:layout` → `FAIL /designs/photographic: HTTP 404`.

- [ ] **Step 2: Compute the scrim opacity against the real photograph**

`verify-contrast.mjs` reasons about token pairs, not pixels, so it cannot check this. Derive the figure and record it:

```bash
node -e '
const { execFileSync } = require("child_process");
// Brightest pixel the wordmark can overlap, as 0-255 luminance.
const out = execFileSync("convert", [
  "public/images/hero-mat-fireplace.png",
  "-resize","1x1!","-colorspace","gray","-format","%[fx:255*u]","info:"
]).toString();
console.log("mean luminance:", out);
'
identify -format "%[fx:255*maxima.r]\n" public/images/hero-mat-fireplace.png
```

If `public/images/hero-mat-fireplace.png` is not the correct path, find it: `grep -n "heroMatFireplace" -A 3 lib/content/images.ts`.

White text needs 7:1. Against a scrim of `--ink` at opacity *a* over a pixel of luminance *L*, the composite luminance is `L*(1-a) + ink*a`. Solve for the *a* that holds 7:1 against the **brightest** pixel the wordmark overlaps, round up to the nearest 5%, and use that. Expect roughly 55–65%. **Record the computed number and the pixel it was solved against in a comment beside the class.**

- [ ] **Step 3: Create `ScrimHero`**

The scrim starts at **60%** and is confirmed or raised by the measurement in Step 6. Update the percentage in the `style` prop and the comment above it together.

```tsx
import Image from "next/image";
import type { Img } from "@/lib/content/types";

/** Full-bleed photograph with the wordmark overlaid on a scrim.
 *
 *  The scrim is deliberately heavy. verify-contrast.mjs reasons about token
 *  pairs, not pixels, so it cannot check text over an image -- and the
 *  fireplace photograph runs from near-black to bright cream inside one
 *  frame, so the floor has to hold against the BRIGHTEST pixel a letter can
 *  land on, not the average. The value below was solved for 7:1 against that
 *  pixel (see Step 2 of Task 4 in the plan for the derivation) and rounded
 *  up. It will look heavier than a typical hero overlay. That is the trade,
 *  not a rendering mistake -- say so when showing the client. */
export function ScrimHero({
  image,
  wordmark,
  expansion,
}: {
  image: Img;
  wordmark: string;
  expansion: string;
}) {
  return (
    <section className="relative isolate">
      <Image
        src={image.src}
        alt={image.alt}
        priority
        width={1600}
        height={900}
        className="h-[70vh] min-h-[26rem] w-full object-cover"
      />
      {/* Inline color-mix rather than a Tailwind opacity modifier on an
          arbitrary var: `bg-[color:var(--ink)]/60` can silently emit no rule,
          and a scrim that fails to render ships an unreadable hero rather
          than an obviously broken one. --ink is redefined by every palette
          block, so this adapts per theme for free.
          SCRIM: start at 60%, then confirm or raise it with the pixel
          measurement in Step 6. Record the final figure here. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "color-mix(in srgb, var(--ink) 60%, transparent)" }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
        <h1 className="u-wordmark text-white">{wordmark}</h1>
        <p className="mt-4 text-xl font-bold uppercase tracking-[0.16em] text-white sm:text-2xl">
          {expansion}
        </p>
      </div>
    </section>
  );
}
```

Note `text-white` rather than `u-technicolor`: the technicolor stops are held to 7:1 against `--cream` only, and none of them is verified against a photograph. White is the only text colour the spec permits over the scrim.

- [ ] **Step 4: Create the Photographic page**

```tsx
import Image from "next/image";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Disclaimer } from "@/components/Disclaimer";
import { PhoneButton } from "@/components/PhoneButton";
import { ScrimHero } from "@/components/designs/photographic/ScrimHero";
import { images } from "@/lib/content/images";
import { hero, holisticAnatomy, holisticApproach, teasers } from "@/lib/content/home";

export const metadata = { robots: { index: false, follow: false } };

export default function Photographic() {
  return (
    <main id="main">
      <ScrimHero
        image={images.heroMatFireplace}
        wordmark={hero.wordmark}
        expansion={hero.expansion}
      />

      {/* Opening copy in a narrow centred column beneath the hero. */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:py-24">
          <h2>{hero.title}</h2>
          <span className="u-accent-rule mx-auto" />
          {hero.paragraphs.map((p) => (
            <p key={p} className="mt-6 text-xl leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <PhoneButton />
            <Link
              href="/contact"
              className="inline-flex min-h-[56px] items-center justify-center rounded-full border-[3px] border-sage px-8 text-lg font-bold text-sage no-underline hover:bg-sand"
            >
              Visit Us
            </Link>
          </div>
        </div>
      </section>

      {/* Alternating full-bleed image band with the text block overlapping up
          into it. The negative margin is the direction's signature. */}
      <section>
        <Image
          src={images.holisticFlower.src}
          alt={images.holisticFlower.alt}
          width={1600}
          height={700}
          className="h-[22rem] w-full object-cover"
        />
        <div className="mx-auto -mt-20 max-w-4xl px-5">
          <div className="u-plate p-8 sm:p-12">
            <h2>{holisticApproach.title}</h2>
            <span className="u-accent-rule" />
            {holisticApproach.paragraphs.map((p) => (
              <p key={p} className="mt-5 leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <Image
              src={images.holisticAnatomy.src}
              alt={images.holisticAnatomy.alt}
              width={800}
              height={600}
              className="w-full rounded-3xl"
            />
            <div>
              <h2>{holisticAnatomy.title}</h2>
              <span className="u-accent-rule" />
              {holisticAnatomy.paragraphs.map((p) => (
                <p key={p} className="mt-5 text-lg leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Large images, generous radius, text below, two columns. */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-center">Explore</h2>
          <span className="u-accent-rule mx-auto" />
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {teasers.map((t) => (
              <article key={t.href}>
                <Image
                  src={t.image.src}
                  alt={t.image.alt}
                  width={800}
                  height={500}
                  className={`aspect-[8/5] w-full rounded-3xl ${
                    t.image.contain ? "object-contain" : "object-cover"
                  }`}
                />
                <h3 className="mt-6 text-2xl">
                  <Link href={t.href}>{t.title}</Link>
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-ink-soft">{t.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Disclaimer />
    </main>
  );
}
```

- [ ] **Step 5: Run the guards and watch them pass**

```bash
npm run verify:layout   # expect: ok   /designs/photographic  h1 h2 h2 h2 h2 h3 ... h2
npm run verify:jsx
npm run verify:contrast
```

- [ ] **Step 6: Verify the scrim by measuring the rendered pixels, not by eye**

```bash
google-chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --virtual-time-budget=4000 --window-size=1440,900 --user-data-dir=$(mktemp -d) \
  --screenshot=/tmp/comps/photographic-hero.png \
  "http://localhost:3000/designs/photographic"
# Brightest pixel in the hero region, which is where white text is at risk:
convert /tmp/comps/photographic-hero.png -crop 1440x700+0+0 +repage \
  -colorspace gray -format "brightest: %[fx:255*maxima]\n" info:
```

White (255) against the brightest value *B* gives a ratio of `(1.0+0.05)/(lum(B)+0.05)`. Confirm it is ≥ 7. If not, raise the scrim by 5% and repeat. **Record the measured figure in the commit message.**

- [ ] **Step 7: Look at it in all four palettes and at phone width**

```bash
for t in "" ocean sunrise spectrum; do
  google-chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
    --virtual-time-budget=4000 --window-size=1440,3200 --user-data-dir=$(mktemp -d) \
    --screenshot=/tmp/comps/photographic-${t:-default}.png \
    "http://localhost:3000/designs/photographic?theme=$t"
done
google-chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --virtual-time-budget=4000 --window-size=390,2600 --user-data-dir=$(mktemp -d) \
  --screenshot=/tmp/comps/photographic-phone.png \
  "http://localhost:3000/designs/photographic"
```

Check specifically: the `-mt-20` overlap does not clip the plate at 390px; the hero wordmark stays inside the viewport at 390px.

- [ ] **Step 8: Commit**

```bash
git add scripts/verify-layout.mjs components/designs/photographic app/designs/photographic
git commit -m "Add the Photographic design comp"
```

---

### Task 5: Cross-link, full sweep, and the client-facing caveats

**Files:**
- Modify: `app/themes/page.tsx`

**Interfaces:**
- Consumes: everything built in Tasks 1–4.
- Produces: nothing new.

- [ ] **Step 1: Link `/themes` to `/designs`**

In `app/themes/page.tsx`, directly after the closing `</div>` of the `<ThemeSwitcher />` wrapper, add:

```tsx
          <p className="u-lead mt-10 text-ink-soft">
            Looking for different page layouts rather than different colours?{" "}
            <Link href="/designs">Design directions</Link> has three.
          </p>
```

`app/themes/page.tsx` is already in `NOT_SITE_COPY`, so this prose needs no exemption. `Link` is already imported there.

- [ ] **Step 2: Run the entire suite from clean**

```bash
npm run verify:all
npx eslint app components lib scripts
npx tsc --noEmit
npm run build
```

Expected: all six verifiers green, eslint exit 0, tsc clean, build succeeds with `/designs`, `/designs/editorial`, `/designs/clinical` and `/designs/photographic` listed as static routes.

- [ ] **Step 3: Confirm the comps are invisible to the public site**

```bash
curl -s http://localhost:3000/sitemap.xml | grep -c designs    # expect 0
for p in "" /editorial /clinical /photographic; do
  echo -n "/designs$p: "
  curl -s "http://localhost:3000/designs$p" | grep -o 'content="noindex[^"]*"' | head -1
done
npm run verify   # verify-site.mjs: the ten real routes and their redirects
```

- [ ] **Step 4: Commit**

```bash
git add app/themes/page.tsx
git commit -m "Link the theme picker to the design directions"
```

- [ ] **Step 5: Write the client hand-off note**

Create `docs/superpowers/COMPS-FOR-CLIENT.md` containing, in plain language: the three links (with their `?theme=` parameters), and the three caveats the spec insists the client hears **before** choosing rather than after:

1. **Photographic is undersold by the assets that exist.** One lifestyle photograph, already soft at hero width. Choosing it commits to buying photography.
2. **Editorial's pull quote repeats a sentence on purpose.** It also appears in the body copy above it. That is an editorial device, not an oversight.
3. **Clinical shows "Certified PEMF Expert Sharon" twice** — once under the hero as a credential, once at the foot as a signature. Deliberate.

Also state plainly that all three comps use the same words as the live site, because copy is locked verbatim, so the comparison is purely structural.

- [ ] **Step 6: Commit and push**

```bash
git add docs/superpowers/COMPS-FOR-CLIENT.md
git commit -m "Add the client hand-off note for the three comps"
git push origin main
```

Pushing `main` auto-deploys to `pemf-holistic-health.vercel.app`. **Confirm the deploy lands before telling anyone the links work**, with a cache-busted request — Vercel's CDN will otherwise serve the previous build:

```bash
until curl -sL "https://pemf-holistic-health.vercel.app/designs?cb=$(date +%s)" \
  | grep -q "Design directions"; do sleep 10; done
echo "live"
```

---

## Notes for whoever executes this

- **The dev server must be running** for `verify:layout` and `verify`. Start it with `npm run dev` and wait for `Ready in`.
- **Screenshots need `--virtual-time-budget=4000` and a fresh `--user-data-dir`.** Without the first, Chrome captures pre-hydration state and the theme appears unset. Without the second, it serves a cached render of the previous deploy. Both have produced false alarms on this project.
- **`npm run lint` is clean as of `b793436`.** If it starts reporting hundreds of problems again, something has been added that eslint should be ignoring — check `globalIgnores` in `eslint.config.mjs` before believing the findings.
- **Do not "fix" the soft hero photograph** by swapping `imrsModel3` back in. The client was told it is 721px and visibly soft and chose it anyway.
- **The 14 SVG diagrams will stay green in every palette and every comp.** They load through `next/image` as files and cannot inherit page CSS. Known and accepted; recolouring means inlining them as React components, which is worth doing once a direction is chosen and wasted before then.
