# Multi-page restructure with SEO layer

**Date:** 2026-08-17
**Status:** Approved design, pending implementation plan

## Goal

Convert the single-page site into five routes so each topic can rank on its own, and
add the SEO layer that makes that worth doing. The landing page becomes a hub that
covers enough to stand alone and links out to the detail pages.

The business goal is appointment calls in Lake Forest, CA. Every page ends in the same
call to action: phone, text, or WhatsApp on **(949) 891 5572**.

## Non-goals

- No contact form. `/contact` is static detail only, so there is no backend, no email
  provider account, and no running cost.
- No city landing pages (`/pemf-irvine` and similar). Near-duplicate pages differing
  only by place name are doorway pages under Google's guidelines and risk the domain.
- No blog, no analytics, no CMS.
- Setting up the Google Business Profile is out of scope for this repo, but it is the
  single highest-value local-SEO action and should happen alongside.

## Information architecture

Five routes, chosen for substance over count:

| Route | Purpose | Primary intent |
|---|---|---|
| `/` | Hub. Hero, holistic-health positioning, teasers into every other page | brand, "PEMF Lake Forest" |
| `/what-is-pemf` | The science pillar | informational, "what is PEMF" |
| `/benefits` | Sleep, mental health, energy, sports, pets as sections | "PEMF for sleep" etc. |
| `/products` | iMRS Prime + Exagon, Smart Pulser | commercial |
| `/contact` | Details, map, consultant | navigational |

### Accepted trade-off

`/benefits` serves five distinct search intents from one URL and will therefore compete
with itself. This was chosen deliberately over five separate pages. Mitigations, which
are requirements not nice-to-haves:

- Each topic gets a stable `id` anchor (`#sleep`, `#mental-health`, `#energy`,
  `#sports`, `#pets`) so internal links and CTAs can target a section directly. These
  anchors are for on-page navigation only — fragment URLs are not listed in the
  sitemap, since crawlers treat them as the same page.
- Each topic gets its own `<h2>` phrased as the search query it targets.
- Each topic gets its own FAQ subsection with distinct `FAQPage` entities.

If `/benefits` underperforms, splitting it into five routes is the follow-up, and the
content model below is structured so that split is mechanical.

### Where existing content goes

| Current section on `/` | Destination |
|---|---|
| Hero | `/` |
| PEMF / magnetosphere / EM spectrum / videos | `/what-is-pemf` |
| Holistic Health | `/` (core brand positioning, stays on the hub) |
| Sleep, Mental Health, Qi Energy, Sports, Animals | `/benefits`, as sections |
| Products | `/products` |
| Footer contact | `/contact`, expanded; footer stays site-wide |

Unused images already in `public/images` get used here: `essentials-strip.png` on
`/what-is-pemf`, `eight-dimensions.png` on `/`.

## Content model

`lib/content.ts` is already ~200 lines and would become unmanageable as one file. It
splits into a directory, one module per route:

```
lib/content/home.ts        teasers, holistic aspects
lib/content/pemf.ts        magnetic field, spectrum, videos
lib/content/benefits.ts    sleep, mental health, energy, sports, pets
lib/content/products.ts    iMRS Prime, Exagon, Smart Pulser, frequency zones
lib/content/faqs.ts        FAQ sets keyed by route
lib/content/index.ts       re-exports, so import sites stay stable
```

The existing `CardContent` type moves to `lib/content/types.ts` and is shared.

**Landing teasers must be written fresh, not copy-pasted from the detail pages.**
Duplicated blocks across `/` and `/benefits` would have the two pages competing. Each
teaser is 2-3 original sentences ending in a link.

## Components

Existing `Section`, `Card`, `FrequencyCard`, `Banner`, `VideoEmbed` are reused unchanged
except where noted.

| Component | Change |
|---|---|
| `Header` | `navLinks` become routes; `<a href="#x">` becomes `<Link href="/x">`; active route highlighted via `usePathname` (already a client component) |
| `Footer` | Add a site-links column; keep contact, disclaimer, device note |
| `Card` | Add optional `href`; when present the card title links, and the whole card gets a hover affordance |
| `JsonLd` (new) | Renders a `application/ld+json` script tag. See the escaping requirement below |
| `FAQ` (new) | Renders a question list and emits the matching `FAQPage` JSON-LD from one data source, so markup and schema cannot drift |
| `CTA` (new) | The repeated book-an-appointment block, currently duplicated per section |
| `Breadcrumbs` (new) | Visible trail plus `BreadcrumbList` JSON-LD on the four non-home routes |

`Header` and `Footer` currently render inside `app/page.tsx`. They **move into
`app/layout.tsx`** so every route shares them. This is a prerequisite for the split.

## Routing and metadata

```
app/layout.tsx          Header + Footer + LocalBusiness/WebSite JSON-LD
app/page.tsx            /
app/what-is-pemf/page.tsx
app/benefits/page.tsx
app/products/page.tsx
app/contact/page.tsx
app/sitemap.ts          MetadataRoute.Sitemap
app/robots.ts           MetadataRoute.Robots
```

Each page exports a static `metadata: Metadata` with a unique `title`, a unique
`description` under 160 characters, `alternates.canonical`, and `openGraph`.
`metadataBase` is already set in the root layout and is inherited.

`lib/seo.ts` provides a `pageMetadata()` helper so titles and canonicals are built one
way, and the JSON-LD builders described below.

Route props use the global `PageProps` / `LayoutProps` helpers — these are generated by
`next dev` / `next build` and need no import, matching the existing `LayoutProps<"/">`
in `app/layout.tsx`.

## Structured data

| Schema | Where | Why |
|---|---|---|
| `LocalBusiness` | root layout | name, address, phone, geo, opening hours, url, image. The main local-pack signal in-repo |
| `WebSite` | root layout | site name and search-action-free identity |
| `BreadcrumbList` | each sub-page | breadcrumb rich result |
| `FAQPage` | every page with an FAQ | the featured-snippet play this approach was chosen for |
| `Product` | `/products`, per system | iMRS Prime and Smart Pulser |

All JSON-LD goes through the `JsonLd` component so escaping is applied uniformly.

The Next.js JSON-LD guide is explicit that `JSON.stringify` does not sanitise strings
used for XSS injection. `JsonLd` therefore escapes the opening angle bracket before
injecting, and every schema on the site goes through it:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  }}
/>
```

**Health-claim discipline:** schema descriptions and FAQ answers use the same
wellness framing as the source document. No claim that PEMF diagnoses, cures, mitigates,
prevents, or treats disease. The existing device note and disclaimer stay in the footer
on every page.

## FAQ content

Three to five questions per page, drafted from the 2026 source document for the owner to
edit. Indicative:

- `/what-is-pemf` — What is PEMF? How does it mimic Earth's magnetic field? Is it safe?
- `/benefits` — one cluster per topic: Does PEMF help with sleep? Can PEMF help with
  stress? Does PEMF help athletic recovery? Is PEMF safe for pets?
- `/products` — What is the difference between iMRS Prime and Smart Pulser? What is
  Brainwave Entrainment? What does split mode do?
- `/contact` — Do you offer home visits? Where are you located?

## Internal linking

Deliberate, not incidental:

- `/` links to all four routes, each from a teaser with descriptive anchor text.
- `/what-is-pemf` links to `/benefits` and `/products`.
- `/benefits` links to `/products` from the sections that name a device, and back to
  `/what-is-pemf` for the mechanism.
- `/products` links back to the relevant `/benefits#anchor`.
- Footer carries a site-links column on every page.

Anchor text is descriptive ("how PEMF supports deep sleep"), never "click here".

## Verification

No test framework exists in this repo, so verification is build plus assertion scripts
plus visual review:

1. `npm run lint` and `npm run build` clean, TypeScript included.
2. Every route returns 200; crawl all internal links and assert none 404.
3. `/sitemap.xml` and `/robots.txt` fetch and contain all five routes.
4. Extract every `application/ld+json` block and `JSON.parse` it; assert the expected
   `@type` is present per route.
5. Assert exactly one `<h1>` per route and no skipped heading levels.
6. Assert every page has a unique `<title>`, a `<meta name="description">` under 160
   characters, and a canonical link.
7. Screenshot all five routes at 1440px and 390px and review them.

Findings get reported with the actual output, not a claim that it compiled.

## Risks

| Risk | Mitigation |
|---|---|
| `/benefits` self-competition | anchors, query-shaped h2s, per-topic FAQ schema; split is the fallback |
| Landing/detail duplicate content | teasers written fresh, never copy-pasted |
| `/#sleep`-style inbound links | fragments never reach the server and cannot be redirected; they land on `/`, which still exists. No path redirects needed since no real paths change |
| Health claims | wellness framing only; disclaimer and device note site-wide |
| Google Maps iframe | third-party embed, no API key for a basic embed, no cost; lazy-loaded to protect page speed |

## Open items for the owner

- Confirm opening hours for the `LocalBusiness` schema. Currently unknown; the schema
  omits `openingHours` rather than guessing.
- Confirm whether to publish an email address on `/contact`. The 2025 document lists
  one; publishing it invites spam. Omitted unless requested.
- Confirm whether consultant ID 81003 should be shown publicly. Present in `lib/site.ts`
  but currently unrendered.
