# PEMF for Holistic Health Landing Page

Multi-page site for **PEMF for Holistic Health** (Lake Forest, CA), built from the client's 2026
document ("Website Exiga Jasmin 2026.docx").

Ten routes, one per section of the client's document: `/` (Home), `/pemf`, `/holistic-health`,
`/mental-health` (Stress / Relaxation), `/energy`, `/sports-health`, `/sleep-health`,
`/pets-health`, `/products`, and `/contact`. Five of these (Mental Health, Energy, Sports Health,
Sleep Health, Pets Health) are grouped under a "Wellness" disclosure in the nav bar, but each
still has its own flat top-level URL. The old single-page anchors (`/what-is-pemf`, `/benefits`)
redirect to their new routes.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4
- Hosted on Vercel

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

- `app/`: one route per page (see the ten routes above), plus `sitemap.xml`, `robots.txt`, and
  the SEO primitives shared across pages
- `components/`: Header (with the Wellness disclosure), Footer, Section, TriPanel, SplitBand,
  Figure, CTA, Breadcrumbs, JumpNav, Disclaimer, JsonLd
- `lib/routes.ts`: the single source for the nav, the sitemap, and `scripts/verify-site.mjs`
- `lib/content/`: one module per page holding that page's copy, transcribed verbatim from the
  client's document
- `lib/site.ts`: business info, phone/WhatsApp numbers, disclaimer text (edit client details here)
- `public/images/`: assets extracted from the client's document — every file here is referenced
  by `lib/content/images.ts`; nothing superseded is kept around
- `docs/exiga-jasmin-2026.txt` and `docs/exiga-jasmin-2026-image-text.txt`: the client's document
  as plain text, and the text baked into its images, transcribed by hand. These two files are the
  ground truth every verifier checks site copy against. Regenerate the first with
  `npm run extract:doc` whenever the client sends a new document — the source `.docx` itself is
  deliberately gitignored (client contact details, 11MB), so regeneration only works when you have
  that file locally. The image-text file has no extraction script; re-transcribe it by hand.
- `scripts/`: the verifiers and the screenshot harness (below)

### Verification

Four scripts guard different failure modes, and `npm run verify:all` runs three of them together:

- `npm run verify:contrast` — checks every text/background colour pair in `app/globals.css`
  clears WCAG AAA (7:1). Run alone or via `verify:all`.
- `npm run verify:copy` — checks every string in `lib/content/` is exact text from
  `docs/exiga-jasmin-2026*.txt`, character for character (including which apostrophe/quote form —
  the document itself is inconsistent between curly and straight, and site copy tracks whichever
  one the source used at that specific spot). See the **verbatim-copy rule** below.
- `npm run verify:jsx` — the same check, but for copy written directly as JSX text/props in
  `app/**/*.tsx` instead of pulled from `lib/content/`. Not part of `verify:all`; run it
  separately (it is part of the final gate list below).
- `npm run verify` (aka `npm run verify:site`, the third leg of `verify:all`) — crawls a running
  `npm run dev` server and checks each route's status code, exactly one `<h1>`, title/description/
  canonical, JSON-LD, a verbatim phrase proving real content landed, internal links, the sitemap,
  and the old-URL redirects.

Each verifier accepts `-- --self-test`, which proves the checker actually rejects bad input rather
than trivially passing.

### Screenshot harness

`npm run shots` (needs `npm run dev` running separately) drives the system Chrome
(`/usr/bin/google-chrome`, headless) across all ten routes at three viewports — desktop (1440),
phone (390), and 720 to approximate 200% desktop zoom — and writes 30 PNGs to `.screenshots/`
(gitignored). A green build and a passing `verify:all` have repeatedly hidden real layout bugs on
this site (text overflowing at phone width, nav elements clipping, images with baked-in text too
small to read), so looking at the screenshots is a required step, not an optional one — the
scripts can prove the copy is right and the links resolve, but only a human looking at the images
catches spacing, overflow, and legibility problems.

## Notes

- Per client request there is no contact form or email on the page. All contact prompts point to
  the phone/WhatsApp numbers in `lib/site.ts`, plus a WeChat QR code on `/contact`.
- There is no video anywhere on the site. The document's YouTube links were deliberately dropped
  (see spec); the only `<iframe>` on the site is the Google Maps embed on `/contact`, which is
  exempted from the copy verifiers because its `title` is an accessibility label, not visitor copy.
- **The verbatim-copy rule, and why it exists**: every visitor-facing sentence on this site is the
  client's own text, copied character for character from their document (or, for text baked into
  a screenshot/diagram image, transcribed by hand into
  `docs/exiga-jasmin-2026-image-text.txt`). The client cites FDA exposure — PEMF marketing claims
  are regulated, and the client does not want this site to say anything about health effects that
  they did not themselves write and approve. `verify:copy` and `verify:jsx` enforce this
  automatically on every build; the only sanctioned deviations are listed explicitly in
  `ALLOWED_EDITS` in `scripts/verify-copy.mjs` (e.g. one corrected typo) plus an added terminal
  period. Do not paraphrase, summarize, or "improve" client copy — if it reads awkwardly, that is
  a question for the client, not something to silently fix in code.
