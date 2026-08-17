# Multi-page Restructure with SEO Layer — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the single-page PEMF site into five statically-rendered routes with a full SEO layer (per-page metadata, sitemap, robots, JSON-LD, FAQ schema, deliberate internal linking).

**Architecture:** Next.js App Router, all routes static. Shared chrome moves from `app/page.tsx` into `app/layout.tsx`. Page content lives in `lib/content/*` modules, one per route, so pages stay layout-only. A Node assertion script (`scripts/verify-site.mjs`) crawls a running dev server and enforces the spec's verification checks; it is the test harness for every task.

**Tech Stack:** Next.js 16.3.0 (App Router, Turbopack), React 19.2.8, Tailwind CSS v4, TypeScript 5. No test framework — verification is the assertion script plus `next build`.

**Spec:** `docs/superpowers/specs/2026-08-17-multipage-seo-design.md`

## Global Constraints

- Phone number is **(949) 891 5572** everywhere. `site.phoneHref` / `site.whatsappHref` are the only sources. Never use (949) 600 7899 from the source document.
- No health claims. No wording that PEMF diagnoses, cures, mitigates, prevents, or treats disease. Wellness framing only.
- The footer device note and disclaimer render on every route.
- No contact form, no email provider, no third-party account, no paid service.
- Every page: exactly one `<h1>`, unique `<title>`, `<meta name="description">` of **160 characters or fewer**, and a canonical link.
- All JSON-LD goes through the `JsonLd` component, which applies `.replace(/</g, "\\u003c")`.
- Route props use the global `PageProps` / `LayoutProps` helpers — no import needed.
- Five routes only: `/`, `/what-is-pemf`, `/benefits`, `/products`, `/contact`.

---

## File Structure

**Create:**
- `scripts/verify-site.mjs` — assertion harness
- `lib/content/types.ts` — `CardContent`, `FaqItem`, `Teaser`
- `lib/content/home.ts`, `pemf.ts`, `benefits.ts`, `products.ts`, `faqs.ts`, `index.ts`
- `lib/seo.ts` — `pageMetadata()`, `localBusinessSchema()`, `websiteSchema()`, `breadcrumbSchema()`, `faqSchema()`, `productSchema()`
- `components/JsonLd.tsx`, `components/FAQ.tsx`, `components/CTA.tsx`, `components/Breadcrumbs.tsx`
- `app/what-is-pemf/page.tsx`, `app/benefits/page.tsx`, `app/products/page.tsx`, `app/contact/page.tsx`
- `app/sitemap.ts`, `app/robots.ts`

**Modify:**
- `app/layout.tsx` — add Header/Footer, title template, root JSON-LD
- `app/page.tsx` — becomes the hub
- `components/Header.tsx` — routes instead of anchors
- `components/Footer.tsx` — site-links column
- `components/Card.tsx` — optional `href`
- `lib/site.ts` — `navLinks` become routes; add `url`, `areaServed`
- `package.json` — add `verify` script

**Delete:** `lib/content.ts` (contents move into `lib/content/`)

---

## Task 1: Verification harness

**Files:**
- Create: `scripts/verify-site.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: `npm run verify` — exits 0 on pass, 1 on failure, printing every check. Reads its route list from the `ROUTES` const inside the script. Later tasks add routes to `ROUTES` *before* implementing them, so the harness fails first.

- [ ] **Step 1: Write the harness**

```js
// scripts/verify-site.mjs
// Crawls a running dev server and enforces the SEO checks from the spec.
const BASE = process.env.BASE_URL || "http://localhost:3000";

// Add a route here BEFORE building it. The harness must fail first.
const ROUTES = [
  { path: "/", jsonLd: ["LocalBusiness", "WebSite"] },
];

let failures = 0;
const fail = (m) => { console.error(`  FAIL ${m}`); failures++; };
const pass = (m) => console.log(`  ok   ${m}`);

const titles = new Map();

async function checkRoute({ path, jsonLd }) {
  console.log(`\n${path}`);
  const res = await fetch(BASE + path);
  if (res.status !== 200) return fail(`status ${res.status}`);
  pass("200");
  const html = await res.text();

  const h1s = [...html.matchAll(/<h1[\s>]/g)].length;
  h1s === 1 ? pass("exactly one h1") : fail(`${h1s} h1 elements, expected 1`);

  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  if (!title) fail("no <title>");
  else if (titles.has(title)) fail(`duplicate title, also on ${titles.get(title)}`);
  else { titles.set(title, path); pass(`title: ${title}`); }

  const desc = html.match(/<meta name="description" content="(.*?)"/s)?.[1];
  if (!desc) fail("no meta description");
  else if (desc.length > 160) fail(`description ${desc.length} chars, max 160`);
  else pass(`description ${desc.length} chars`);

  html.includes('rel="canonical"') ? pass("canonical") : fail("no canonical");

  const blocks = [...html.matchAll(
    /<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs
  )].map((m) => m[1]);
  const types = [];
  for (const b of blocks) {
    try {
      const parsed = JSON.parse(b.replace(/\\u003c/g, "<"));
      types.push(...[parsed].flat().map((x) => x["@type"]));
    } catch (e) { fail(`unparseable JSON-LD: ${e.message}`); }
  }
  for (const want of jsonLd) {
    types.includes(want) ? pass(`JSON-LD ${want}`) : fail(`missing JSON-LD ${want}`);
  }

  // internal links resolve
  const hrefs = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);
  for (const href of [...new Set(hrefs)]) {
    if (/\.(png|jpe?g|svg|ico|webp|xml|txt)$/.test(href)) continue;
    const r = await fetch(BASE + href, { method: "HEAD" });
    r.status === 200 ? pass(`link ${href}`) : fail(`link ${href} -> ${r.status}`);
  }
}

for (const r of ROUTES) await checkRoute(r);

console.log("\n--- metadata files ---");
for (const f of ["/sitemap.xml", "/robots.txt"]) {
  const r = await fetch(BASE + f);
  if (r.status !== 200) { fail(`${f} -> ${r.status}`); continue; }
  const body = await r.text();
  const missing = ROUTES.map((x) => x.path).filter(
    (p) => !body.includes(p === "/" ? BASE + "<" : p)
  );
  if (f === "/sitemap.xml" && missing.length) fail(`sitemap missing ${missing.join(", ")}`);
  else pass(`${f} present`);
}

console.log(failures ? `\n${failures} FAILURE(S)` : "\nAll checks passed");
process.exit(failures ? 1 : 0);
```

- [ ] **Step 2: Add the npm script**

In `package.json` `scripts`, add: `"verify": "node scripts/verify-site.mjs"`

- [ ] **Step 3: Run it — expect sitemap/robots failures**

```bash
npm run dev &   # wait for ready
npm run verify
```
Expected: `/` checks pass except JSON-LD (not built yet), and `/sitemap.xml` / `/robots.txt` return 404. This is the correct failing state.

- [ ] **Step 4: Commit**

```bash
git add scripts/verify-site.mjs package.json
git commit -m "Add site verification harness"
```

---

## Task 2: Split the content model

**Files:**
- Create: `lib/content/types.ts`, `lib/content/home.ts`, `lib/content/pemf.ts`, `lib/content/benefits.ts`, `lib/content/products.ts`, `lib/content/index.ts`
- Delete: `lib/content.ts`
- Modify: `app/page.tsx` (import path only)

**Interfaces:**
- Produces:
  - `types.ts`: `export type CardContent = { image: string; title: string; body: string; imageAspect?: string; imageFit?: "cover" | "contain" }`
  - `types.ts`: `export type FaqItem = { q: string; a: string }`
  - `types.ts`: `export type Teaser = { title: string; body: string; href: string; cta: string; image: string }`
  - `pemf.ts`: `videos`
  - `benefits.ts`: `sleepBenefits`, `energyBenefits`, `sportsBenefits`, `animalCards`, `racehorseCards`, `racehorseBenefits`, `holisticAspects`
  - `products.ts`: `exagonAccessories`, `frequencyZones`, `smartPulserFeatures`, `alsoAvailable`
  - `index.ts`: re-exports everything above, so `@/lib/content` keeps working

- [ ] **Step 1: Move `CardContent` into `types.ts`, add `FaqItem` and `Teaser`**

- [ ] **Step 2: Move each existing export from `lib/content.ts` into its module per the mapping above. Copy the values verbatim — no rewording in this task.**

- [ ] **Step 3: Write `index.ts` re-exporting all modules**

```ts
export * from "./types";
export * from "./home";
export * from "./pemf";
export * from "./benefits";
export * from "./products";
```

- [ ] **Step 4: Delete `lib/content.ts`**

- [ ] **Step 5: Verify no behaviour change**

```bash
npm run lint && npm run build && npm run verify
```
Expected: build clean, verify in the same state as Task 1. The rendered page is byte-identical.

- [ ] **Step 6: Commit**

```bash
git add lib/content lib/content.ts app/page.tsx
git commit -m "Split page content into per-route modules"
```

---

## Task 3: Shared chrome into the layout

**Files:**
- Modify: `app/layout.tsx`, `app/page.tsx`, `components/Header.tsx`, `components/Footer.tsx`, `lib/site.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: `Header` and `Footer` render for every route from `app/layout.tsx`. `navLinks` is `{ label: string; href: string }[]` where `href` is a route path.

- [ ] **Step 1: Change `navLinks` in `lib/site.ts` to routes, and add site fields**

```ts
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "What is PEMF", href: "/what-is-pemf" },
  { label: "Benefits", href: "/benefits" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];
```

Add to the `site` object: `url: "https://pemfforholistichealth.com"`, `areaServed: "Orange County, California"`.

- [ ] **Step 2: Move `<Header />` and `<Footer />` out of `app/page.tsx` and into `app/layout.tsx`**

`layout.tsx` body becomes:

```tsx
<body className="min-h-full flex flex-col">
  <Header />
  {children}
  <Footer />
</body>
```

`app/page.tsx` returns only `<main id="home"> ... </main>`.

- [ ] **Step 3: Convert `Header` anchors to `Link` with an active state**

Replace `import { navLinks, site }` usage: add `import Link from "next/link"` and `import { usePathname } from "next/navigation"`. `Header` is already `"use client"`. Both the desktop and mobile nav map over `navLinks` rendering `<Link>`; the link whose `href` equals `usePathname()` gets `text-brand font-semibold` and `aria-current="page"`. The wordmark links to `/`.

- [ ] **Step 4: Add a site-links column to `Footer`**

Add a fourth column titled "Explore" listing every `navLinks` entry as a `<Link>`. Change the grid from `md:grid-cols-3` to `md:grid-cols-4`. Keep the contact, WeChat, device note, and disclaimer exactly as they are.

- [ ] **Step 5: Verify**

```bash
npm run lint && npm run build && npm run verify
```
Expected: build clean. `verify` now reports `link /what-is-pemf -> 404` and friends, because the nav links to routes that do not exist yet. That is the expected failing state going into Tasks 5–8.

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx app/page.tsx components/Header.tsx components/Footer.tsx lib/site.ts
git commit -m "Move shared chrome into the root layout and route the nav"
```

---

## Task 4: SEO primitives

**Files:**
- Create: `lib/seo.ts`, `components/JsonLd.tsx`, `components/FAQ.tsx`, `components/CTA.tsx`, `components/Breadcrumbs.tsx`
- Modify: `app/layout.tsx`, `components/Card.tsx`

**Interfaces:**
- Produces:
  - `pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata`
  - `localBusinessSchema(): object`, `websiteSchema(): object`
  - `breadcrumbSchema(trail: { name: string; path: string }[]): object`
  - `faqSchema(items: FaqItem[]): object`
  - `productSchema({ name, description, image }: { name: string; description: string; image: string }): object`
  - `<JsonLd data={object | object[]} />`
  - `<FAQ heading={string} items={FaqItem[]} />` — renders the list **and** its `FAQPage` JSON-LD
  - `<CTA />`, `<Breadcrumbs trail={{ name: string; path: string }[]} />`

- [ ] **Step 1: Write `components/JsonLd.tsx`**

```tsx
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
```

- [ ] **Step 2: Write `lib/seo.ts`**

`pageMetadata` returns `{ title, description, alternates: { canonical: path }, openGraph: { title, description, url: path, type: "website" } }`.

`localBusinessSchema()` returns:

```ts
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  url: site.url,
  telephone: site.phone,
  image: `${site.url}/opengraph-image.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "22706 Aspan St, Suite 504",
    addressLocality: "Lake Forest",
    addressRegion: "CA",
    postalCode: "92630",
    addressCountry: "US",
  },
  areaServed: site.areaServed,
}
```

Do **not** add `openingHours` — the hours are an unresolved open item in the spec and must not be guessed.

- [ ] **Step 3: Write `FAQ`, `CTA`, `Breadcrumbs`**

`FAQ` renders an `<h2>` plus a `<dl>` of question/answer pairs, and includes `<JsonLd data={faqSchema(items)} />`. Driving both from the same `items` array is the point — markup and schema cannot drift.

`CTA` renders the book-an-appointment block: heading, one line of copy, and buttons to `site.phoneHref` and `site.whatsappHref`.

`Breadcrumbs` renders a `<nav aria-label="Breadcrumb">` trail of `<Link>`s plus `<JsonLd data={breadcrumbSchema(trail)} />`.

- [ ] **Step 4: Add root JSON-LD and the title template to `app/layout.tsx`**

```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://pemfforholistichealth.com"),
  title: {
    default: `${site.name} | Lake Forest, CA`,
    template: `%s | ${site.name}`,
  },
  description:
    "Whole-body PEMF sessions in Lake Forest, CA. A holistic approach to energy, sleep, and relaxation. Office and home visits available.",
  alternates: { canonical: "/" },
};
```

Render `<JsonLd data={[localBusinessSchema(), websiteSchema()]} />` inside `<body>`.

- [ ] **Step 5: Add optional `href` to `Card`**

When `href` is set, wrap the title in `<Link href={href}>` and add `transition-shadow hover:shadow-md` to the card shell. When absent, behaviour is unchanged.

- [ ] **Step 6: Verify**

```bash
npm run lint && npm run build && npm run verify
```
Expected: `/` now passes its `LocalBusiness` and `WebSite` JSON-LD checks. Route 404s from Task 3 persist.

- [ ] **Step 7: Commit**

```bash
git add lib/seo.ts components/JsonLd.tsx components/FAQ.tsx components/CTA.tsx components/Breadcrumbs.tsx app/layout.tsx components/Card.tsx
git commit -m "Add SEO primitives: metadata helper, JSON-LD, FAQ, CTA, breadcrumbs"
```

---

## Task 5: `/what-is-pemf`

**Files:**
- Create: `app/what-is-pemf/page.tsx`
- Modify: `lib/content/pemf.ts`, `lib/content/faqs.ts`, `scripts/verify-site.mjs`

**Interfaces:**
- Consumes: `pageMetadata`, `JsonLd`, `FAQ`, `CTA`, `Breadcrumbs`, `Section`, `VideoEmbed`, `videos`
- Produces: `lib/content/faqs.ts` exporting `pemfFaqs: FaqItem[]`

- [ ] **Step 1: Add the route to the harness (failing test)**

In `scripts/verify-site.mjs` `ROUTES`, add:
```js
{ path: "/what-is-pemf", jsonLd: ["BreadcrumbList", "FAQPage"] },
```

- [ ] **Step 2: Run `npm run verify` — expect 404 for `/what-is-pemf`**

- [ ] **Step 3: Write `pemfFaqs` in `lib/content/faqs.ts`**

```ts
export const pemfFaqs: FaqItem[] = [
  {
    q: "What is PEMF?",
    a: "PEMF stands for Pulsed Electro Magnetic Field. It is a wellness technology that uses extremely low frequency, low intensity magnetic pulses that mimic the Earth's own magnetic field energy.",
  },
  {
    q: "How does PEMF mimic the Earth's magnetic field?",
    a: "The Earth produces a natural magnetic field that life evolved within. A PEMF system reproduces comparable extremely low frequencies, between roughly 0.5 and 25 Hz, so the signals are ones the body recognises.",
  },
  {
    q: "Why does the Earth's magnetic field matter for wellness?",
    a: "The magnetosphere shields the planet from solar and cosmic radiation, and the field is an environmental factor human biology developed alongside. That field is weakening while electro-smog increases.",
  },
  {
    q: "Is PEMF safe to use at home?",
    a: "PEMF systems for wellness use are non-invasive and non-addictive, and are used at home or in an office session. The system is not a medical device and is not intended to diagnose, cure, mitigate, prevent or treat any disease.",
  },
];
```

- [ ] **Step 4: Build the page**

Metadata:
```ts
export const metadata = pageMetadata({
  title: "What is PEMF?",
  description:
    "How Pulsed Electro Magnetic Field technology mimics Earth's natural magnetic field energy, and why that field matters for everyday wellness.",
  path: "/what-is-pemf",
});
```

Body, in order: `<Breadcrumbs trail={[{name:"Home",path:"/"},{name:"What is PEMF",path:"/what-is-pemf"}]} />`; `<h1>What is PEMF?</h1>`; the natural-essentials strip using `/images/essentials-strip.png`; the magnetosphere and solar-wind figures with their existing credits; the "Why is Earth's Magnetic Field Vital?" copy and `/images/em-spectrum.jpg`; a "Watch and Learn" grid mapping `videos` through `VideoEmbed`; `<FAQ heading="Common questions about PEMF" items={pemfFaqs} />`; a closing paragraph linking to `/benefits` with anchor text "what PEMF supports day to day" and to `/products` with "the systems we work with"; `<CTA />`.

Move this content out of `app/page.tsx` — it must not remain on both.

- [ ] **Step 5: Run `npm run verify` — `/what-is-pemf` passes**

- [ ] **Step 6: Commit**

```bash
git add app/what-is-pemf lib/content/faqs.ts lib/content/pemf.ts scripts/verify-site.mjs app/page.tsx
git commit -m "Add /what-is-pemf page"
```

---

## Task 6: `/benefits`

**Files:**
- Create: `app/benefits/page.tsx`
- Modify: `lib/content/faqs.ts`, `scripts/verify-site.mjs`

**Interfaces:**
- Consumes: `sleepBenefits`, `energyBenefits`, `sportsBenefits`, `animalCards`, `racehorseCards`, `racehorseBenefits`
- Produces: `benefitsFaqs: FaqItem[]`

- [ ] **Step 1: Add to `ROUTES` (failing test)**

```js
{ path: "/benefits", jsonLd: ["BreadcrumbList", "FAQPage"] },
```

- [ ] **Step 2: Run `npm run verify` — expect 404**

- [ ] **Step 3: Write `benefitsFaqs`**

One question per topic, so each section has its own entity:

```ts
export const benefitsFaqs: FaqItem[] = [
  { q: "Does PEMF help with sleep?",
    a: "PEMF is used as a non-invasive, non-addictive, drug-free approach to winding down. People use it to relax before bed, and deep sleep is when physical and mental rejuvenation happens." },
  { q: "Can PEMF help with stress and relaxation?",
    a: "Many people use PEMF as a healthy coping mechanism. A session can support relaxation within minutes, helping the body return to a calm and balanced state at home or in the office." },
  { q: "Does PEMF support athletic performance and recovery?",
    a: "Within elite and mass sports, PEMF is used as a passive warm-up alongside an active one, and to support rejuvenation after physical activity so you can train and compete more often." },
  { q: "Is PEMF safe for pets and animals?",
    a: "iMRS Fauna PEMF is non-invasive and used with pets, show animals, and racehorses. Many animals experience it as soothing and settle onto the applicator on their own." },
  { q: "How long is a typical PEMF session?",
    a: "Sessions are short and can be repeated through the day. Your certified PEMF consultant will set a schedule that suits you during your appointment." },
];
```

- [ ] **Step 4: Build the page**

Metadata:
```ts
export const metadata = pageMetadata({
  title: "PEMF Benefits: Sleep, Stress, Energy, Sports & Pets",
  description:
    "How PEMF supports sleep, mental clarity, energy, athletic recovery, and pets. A holistic, non-invasive approach for home or office.",
  path: "/benefits",
});
```

`<h1>The Benefits of PEMF</h1>`, then five `<Section>`s with these exact `id`s and query-shaped `<h2>`s:

| id | h2 | content moved from `app/page.tsx` |
|---|---|---|
| `sleep` | PEMF for Better Sleep | sleep section + `sleepBenefits` cards |
| `mental-health` | PEMF for Mental Health, Stress and Relaxation | mental acuity, brainwave entrainment, stress card, relaxation card |
| `energy` | PEMF for Energy and Vitality | `energyBenefits` + battery image |
| `sports` | PEMF for Sports Performance and Recovery | `sportsBenefits` |
| `pets` | PEMF for Pets and Animals | fauna banner, `animalCards`, racehorse row |

Then `<FAQ heading="Common questions about PEMF benefits" items={benefitsFaqs} />` and `<CTA />`.

Cross-links: the mental-health and sports sections link to `/products` with anchor text naming the device; the intro links back to `/what-is-pemf` with "how PEMF works".

Remove all five sections from `app/page.tsx`.

- [ ] **Step 5: Run `npm run verify` — `/benefits` passes**

- [ ] **Step 6: Commit**

```bash
git add app/benefits lib/content/faqs.ts scripts/verify-site.mjs app/page.tsx
git commit -m "Add /benefits page"
```

---

## Task 7: `/products`

**Files:**
- Create: `app/products/page.tsx`
- Modify: `lib/content/faqs.ts`, `scripts/verify-site.mjs`

**Interfaces:**
- Consumes: `exagonAccessories`, `frequencyZones`, `smartPulserFeatures`, `alsoAvailable`, `productSchema`
- Produces: `productFaqs: FaqItem[]`

- [ ] **Step 1: Add to `ROUTES` (failing test)**

```js
{ path: "/products", jsonLd: ["BreadcrumbList", "FAQPage", "Product"] },
```

- [ ] **Step 2: Run `npm run verify` — expect 404**

- [ ] **Step 3: Write `productFaqs`**

```ts
export const productFaqs: FaqItem[] = [
  { q: "What is the difference between the iMRS Prime and the Smart Pulser?",
    a: "The iMRS Prime is the six-dimensional system with the full Exagon applicator range, including FIR, Pad, Spot, Sense and Brain. The Smart Pulser is the more affordable benchmark system for use at home or abroad, built on Inductive Fiber Coil Technology." },
  { q: "What is Brainwave Entrainment?",
    a: "Also called the Spa for the Mind, it combines photic, chromatic and audible stimulation for deeper brain relaxation, delivered through the Exagon Brain." },
  { q: "What does split mode do?",
    a: "Split mode lets one control unit run two stand-alone applications at the same time, so two people can use the system together." },
  { q: "Why does the Smart Pulser stay below 25 Hz?",
    a: "It works within the Extremely Low Frequency range, roughly 0.5 to 25 Hz, so the energy delivered is gentle and tuned to the natural windows of cellular communication rather than overwhelming the body with power." },
];
```

- [ ] **Step 4: Build the page**

Metadata:
```ts
export const metadata = pageMetadata({
  title: "PEMF Systems: iMRS Prime & Smart Pulser",
  description:
    "iMRS Prime with Exagon applicators and the Smart Pulser. Swiss-engineered extremely low frequency PEMF wellness systems for home and office.",
  path: "/products",
});
```

Move the entire current Products section across unchanged — the two families, the Spectrum of Vitality grid, the technology cards, and Also Available. Add `<JsonLd data={[productSchema({name:"iMRS Prime",...}), productSchema({name:"Smart Pulser",...})]} />`, then `<FAQ heading="Common questions about our PEMF systems" items={productFaqs} />` and `<CTA />`.

Each family links back to the relevant `/benefits` anchor.

Remove the Products section from `app/page.tsx`.

- [ ] **Step 5: Run `npm run verify` — `/products` passes**

- [ ] **Step 6: Commit**

```bash
git add app/products lib/content/faqs.ts scripts/verify-site.mjs app/page.tsx
git commit -m "Add /products page"
```

---

## Task 8: `/contact`

**Files:**
- Create: `app/contact/page.tsx`
- Modify: `lib/content/faqs.ts`, `scripts/verify-site.mjs`

**Interfaces:**
- Produces: `contactFaqs: FaqItem[]`

- [ ] **Step 1: Add to `ROUTES` (failing test)**

```js
{ path: "/contact", jsonLd: ["BreadcrumbList", "FAQPage"] },
```

- [ ] **Step 2: Run `npm run verify` — expect 404**

- [ ] **Step 3: Write `contactFaqs`**

```ts
export const contactFaqs: FaqItem[] = [
  { q: "Do you offer home visits?",
    a: "Yes. Office and home visits are both available across Orange County, California." },
  { q: "Where are you located?",
    a: "22706 Aspan St, Suite 504, Lake Forest, CA 92630." },
  { q: "How do I book a session?",
    a: "Call, text, or message on WhatsApp at (949) 891 5572 to arrange an appointment with your certified PEMF consultant." },
];
```

- [ ] **Step 4: Build the page**

Metadata:
```ts
export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Book a PEMF session in Lake Forest, CA. Call, text, or WhatsApp (949) 891 5572. Office and home visits available across Orange County.",
  path: "/contact",
});
```

Body: breadcrumbs; `<h1>Contact</h1>`; a two-column block with call/text/WhatsApp buttons, the WeChat QR (`/images/wechat-qr.png`), the address, and "Office and Home Visits Available"; the consultant line "Sharon Wong, Certified PEMF Consultant" — **do not render the ID number or an email address**, both are unresolved open items in the spec; a lazy-loaded Google Maps embed:

```tsx
<iframe
  title="Map to 22706 Aspan St, Suite 504, Lake Forest, CA 92630"
  src="https://www.google.com/maps?q=22706+Aspan+St+Suite+504+Lake+Forest+CA+92630&output=embed"
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="w-full aspect-[16/9] rounded-2xl border border-brand/10"
/>
```

Then `<FAQ heading="Visiting us" items={contactFaqs} />`.

- [ ] **Step 5: Run `npm run verify` — `/contact` passes**

- [ ] **Step 6: Commit**

```bash
git add app/contact lib/content/faqs.ts scripts/verify-site.mjs
git commit -m "Add /contact page"
```

---

## Task 9: Rebuild `/` as the hub

**Files:**
- Modify: `app/page.tsx`, `lib/content/home.ts`

**Interfaces:**
- Consumes: `holisticAspects`, `Teaser`, `Card` with `href`
- Produces: `teasers: Teaser[]` in `lib/content/home.ts`

- [ ] **Step 1: Write `teasers` with fresh copy**

Four teasers, to `/what-is-pemf`, `/benefits`, `/products`, `/contact`. **Write original 2–3 sentence copy for each.** Do not copy sentences already used on the destination pages — duplicated blocks make the hub and the detail page compete. Images: `em-spectrum.jpg`, `pemf-mat-session.jpg`, `imrs-prime-modes.jpg`, `imrs-consultation.jpg`.

- [ ] **Step 2: Rebuild `app/page.tsx`**

Order: hero (unchanged); a short "What is PEMF" intro paragraph linking to `/what-is-pemf`; the **full Holistic Health section** including `/images/eight-dimensions.png` and the `holisticAspects` grid — this stays on the hub as the brand's core positioning; the four teaser cards; `<CTA />`.

`app/page.tsx` should now be well under 200 lines.

- [ ] **Step 3: Verify**

```bash
npm run lint && npm run build && npm run verify
```
Expected: all five routes pass every check except the sitemap/robots block.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx lib/content/home.ts
git commit -m "Rebuild the landing page as a hub"
```

---

## Task 10: sitemap and robots

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`

- [ ] **Step 1: Write `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/what-is-pemf", "/benefits", "/products", "/contact"];
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.8,
  }));
}
```

- [ ] **Step 2: Write `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Run `npm run verify` — everything passes now**

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts app/robots.ts
git commit -m "Add sitemap and robots"
```

---

## Task 11: Final verification pass

**Files:** none created; fixes only.

- [ ] **Step 1: Full check**

```bash
npm run lint && npm run build && npm run verify
```
Every check must pass. Fix anything that does not.

- [ ] **Step 2: Screenshot all five routes at 1440px and 390px and review them**

Use the CDP approach already proven in this repo: launch `google-chrome --headless --remote-debugging-port=9222`, then drive `Page.captureScreenshot` with `captureBeyondViewport: true`. Check that no banner crops its baked-in text at 390px and that no grid collapses badly.

- [ ] **Step 3: Confirm the phone number**

```bash
grep -rn "600 7899" app components lib   # must return nothing
grep -rn "891 5572" lib/site.ts          # the single source
```

- [ ] **Step 4: Commit any fixes and report results with actual output**

---

## Self-Review

**Spec coverage:** IA → Tasks 5–9. Content model → Task 2. Components → Tasks 3, 4. Routing/metadata → Tasks 4–8. Structured data → Tasks 4, 7. FAQ content → Tasks 5–8. Internal linking → Tasks 3, 5–9. Verification → Tasks 1, 11. Risks: duplicate content addressed in Task 9 Step 1; health claims in Global Constraints; maps iframe lazy-loaded in Task 8. Open items (hours, email, consultant ID) are explicitly *not* implemented — Task 4 Step 2 and Task 8 Step 4 say so.

**Placeholders:** none. Every FAQ answer, metadata string, and schema field is written out.

**Type consistency:** `CardContent`, `FaqItem`, `Teaser` defined in Task 2 and used unchanged in 4–9. `pageMetadata`, `faqSchema`, `breadcrumbSchema`, `productSchema` defined in Task 4 with the signatures used in 5–8. `navLinks` shape set in Task 3, consumed in Task 3 Steps 3–4.
