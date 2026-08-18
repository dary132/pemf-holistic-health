# Exiga Jasmin 2026 Remodel — Design

**Date:** 2026-08-18
**Source of truth:** `Website Exiga Jasmin 2026.docx` (client-authored, revision 675, modified 2026-06-23)
**Supersedes:** `2026-08-17-multipage-seo-design.md` and the 2025 document it was built from

## Goal

Rebuild the site so that its structure, copy and imagery come from the 2026 client
document, under a new visual design that is legible for an elderly audience.

Three client constraints shape every decision below:

1. **Language must be exact.** The client cites FDA exposure. Every sentence of visible
   prose is reproduced verbatim from the document. Nothing is paraphrased, summarised,
   or invented.
2. **No YouTube.** All video embeds are removed from the site.
3. **Elderly-suitable.** The design targets WCAG AAA contrast and large, forgiving targets.

## Decisions already made

| Question | Decision |
|---|---|
| Fidelity to the document | Document drives all visible copy; non-copy SEO scaffolding (metadata, sitemap, JSON-LD, canonicals, breadcrumbs) is kept |
| Navigation | Grouped nav, flat URLs — `Wellness ▾` groups five pages, all ten pages stay at top level |
| Visual scope | Full redesign |
| Direction | "Warm Sanctuary" — sand and sage, rebuilt to AAA contrast |
| Heading typeface | Lora (chosen over Playfair Display for stroke weight) |
| FAQ layer | Deleted entirely — its answers were written by a previous session, not the client |
| Document typos | Fix unambiguous mechanical errors only; log every one (see Appendix B) |

---

## 1. Information architecture

The document's nav table specifies ten pages. Routes:

| # | Page | Route | Document heading (H1, verbatim) |
|---|---|---|---|
| 1 | Home | `/` | PEMF for Health and Wellness |
| 2 | PEMF | `/pemf` | PEMF for Healthy Lifestyle |
| 3 | Holistic Health | `/holistic-health` | PEMF for Holistic Health |
| 4 | Mental Health | `/mental-health` | PEMF Improves Mental Health |
| 5 | Energy | `/energy` | PEMF Increases Your Energy |
| 6 | Sports Health | `/sports-health` | Sports Health |
| 7 | Sleep Health | `/sleep-health` | PEMF Promotes Good Sleep |
| 8 | Pets Health | `/pets-health` | PEMF for Pets Health |
| 9 | Products | `/products` | Products |
| 10 | Contact | `/contact` | Contact |

### Navigation

```
Home   PEMF   Holistic Health   Wellness ▾   Products   Contact
                                    │
                                    ├─ Mental Health
                                    ├─ Energy
                                    ├─ Sports Health
                                    ├─ Sleep Health
                                    └─ Pets Health
```

`Wellness ▾` is a **click-to-open** disclosure, never hover-only — hover menus are hostile
to unsteady pointing and to touch. It closes on `Escape` and on outside click, and its
trigger carries `aria-expanded` / `aria-controls`. All five child links are also repeated
in the footer, so the dropdown is never the only path to a page.

### In-page anchors

The document marks two sub-sections as links rather than pages. Both become anchor
sections with a sticky in-page jump bar:

- `/mental-health#stress` — "PEMF Helps Manage Stress" (document: *"1st Link under Mental Health"*)
- `/mental-health#relaxation` — "PEMF for Relaxation" (document: *"2ND Link under Mental Health"*)
- `/products#imrs-prime` and `/products#smart-pulser` (document: *"Link: Smart Pulser"*)

### Redirects

Both current routes are already indexed and must not 404:

| From | To | Type |
|---|---|---|
| `/what-is-pemf` | `/pemf` | 308 permanent |
| `/benefits` | `/holistic-health` | 308 permanent |

Configured in `next.config.ts` via `redirects()`.

---

## 2. Design system

### Colour tokens

Every text pair meets **WCAG AAA (7:1)**. Ratios were measured, not estimated.

| Token | Value | Role | Contrast |
|---|---|---|---|
| `--cream` | `#FAF6EF` | page ground | — |
| `--sand` | `#F0E7D8` | alternating band | 1.14 : 1 vs cream (band separation) |
| `--ink` | `#2A2E27` | body text | 12.8 : 1 on cream · 11.3 : 1 on sand |
| `--ink-soft` | `#3A4237` | secondary text, captions | 9.7 : 1 on cream · 8.5 : 1 on sand |
| `--sage` | `#2F4A37` | headings, top bar, footer | 9.0 : 1 on cream · 8.0 : 1 on sand · white on it 9.7 : 1 |
| `--clay` | `#763A1D` | links, buttons, eyebrows | 8.2 : 1 on cream · 7.2 : 1 on sand · white on it 8.8 : 1 |
| `--sage-soft` | `#6E8F70` | **decorative only** | 3.4 : 1 — never text |
| `--clay-soft` | `#C9784F` | **decorative only** | 3.1 : 1 — never text |
| `--rule` | `#E2D5BF` | hairlines, borders | non-text |

The two `-soft` tokens are the original direction-C colours. They survive as rules, icon
fills and image mats. Using either for text or a button is a defect, and
`scripts/verify-contrast.mjs` (§6) fails the build if it happens.

> **Correction, 2026-08-18 (during implementation).** `--clay` was originally specified as
> `#7E3F20`. That value was validated against `--cream` only; against the `--sand` band it
> measures **6.54 : 1**, below the AAA floor this table claims. It is corrected to `#763A1D`,
> which clears both grounds. Every text token is now verified against *both* `--cream` and
> `--sand`, not just the page ground.

### Type

- **Headings:** Lora 600, `next/font/google`, variable `--font-display`
- **Body:** Nunito Sans 400/600/700, variable `--font-body`
- **Base size:** `20px` desktop, `19px` below 640px — up from today's 17/18px
- **Body line-height:** 1.75 · **Heading line-height:** 1.2
- **Measure:** capped at `62ch`
- Scale: h1 `clamp(2.1rem, 4vw, 2.9rem)` · h2 `1.7rem` · h3 `1.3rem` · body `1rem`
- No font weight below 400 anywhere; no italic body text

### Interaction targets

- Buttons: `min-height: 56px`, horizontal padding `30px`, radius `999px`
- Every interactive element: `min-height`/`min-width` `48px`
- Links in prose: **always underlined**, `text-underline-offset: 3px`
- Focus: `outline: 3px solid var(--clay); outline-offset: 2px` — never `outline: none`
- `:focus-visible` styling identical to `:focus` for keyboard parity
- Skip-to-content link as the first focusable element

### Motion and zoom

- All transitions wrapped in `@media (prefers-reduced-motion: no-preference)`
- No autoplay, no carousels, no parallax, no scroll-triggered animation
- Layout must survive 200% browser zoom and 320px viewport width without horizontal scroll
- Text is never set over photography; the two content bands are flat colour

### Components

Deleted: `VideoEmbed.tsx`, `FAQ.tsx`.

Reworked: `Header`, `Footer`, `Section`, `Card`, `CTA`, `Breadcrumbs`.

New — the document's content is overwhelmingly three-column and two-column tables, so two
components carry most of the site:

| Component | Purpose |
|---|---|
| `TriPanel` | The document's recurring *text │ image │ text* and three-card row. Collapses to one column below 900px. |
| `SplitBand` | Two-column *image │ text* band, alternating side by side. |
| `Figure` | Full-width captioned image for artwork that must be seen whole. |
| `PhoneButton` | The office number as a 56px call button, present on every page. |
| `Disclaimer` | The client's disclaimer block, rendered at the foot of every page. |
| `JumpNav` | Sticky in-page anchor bar for `/mental-health` and `/products`. |

`Card`, `FrequencyCard` and `Banner` are retained but retokenised.

---

## 3. Imagery

45 images in the document. **30** are byte-identical to files already in `public/images/`.
Of the remaining 15: 13 must be newly extracted, one (`image1.png`) is superseded by the
client-supplied `IMRS Model 3.png`, and one (`image4.png`) is an unidentified QR code —
giving **14 new files**. Separately, **17 current files are deleted** because the 2026
document does not contain them.

### The IMRS Model 3 photograph

The client supplied `IMRS Model 3.png` (1000×563) — the full-resolution original of the
document's `image1.png`, which is a tighter crop of the same shot.

**Client instruction: this must not be the hero image, and must sit in a section where it
is clearly visible.** Therefore:

- It is saved as `public/images/imrs-model-3.png` and rendered by `Figure` in its own
  full-width sand band directly beneath the Home hero, uncropped, at up to 1000px wide,
  with a caption.
- **Consequence:** the Home hero carries no photograph. It is a text-first hero on the
  cream ground — eyebrow, H1, the document's opening paragraph, and two buttons. This
  is the honest reading of the instruction, since `image1.png` is the only hero image the
  document offers. *Flagged for confirmation — see Open Questions.*

### Images with text baked into the artwork

Four images carry substantial text as pixels. Pixel text cannot be zoomed, re-flowed,
selected, or read aloud — it fails the elderly-suitability goal outright. For each, the
text is **transcribed verbatim into real HTML** and the image is kept beside it as
supporting artwork:

| Image | Baked-in text to transcribe |
|---|---|
| `image43.png` → `spectrum-of-vitality.png` | The five frequency zones (Deep Recovery 0.5–4 Hz, Relaxation 4–8 Hz, Earth Resonance 7.83 Hz, Active Alpha 8–12 Hz, Vitality 12–25 Hz) and their descriptions |
| `image45.png` → `why-low-frequency.png` | The full "less is always more" / ELF paragraph |
| `image11.png` → `earth-magnetic-field-shield.png` | "This Is How Earth's Magnetic Field Protects Us From Solar Wind And Radiation" |
| `image12.png` → `magnetic-field-weakening.png` | "Earth's magnetic field has been weakening at an accelerating rate…" |

Transcribed text is copy and is therefore subject to the verbatim rule.

### New extractions (14)

| Doc image | New file | Used on |
|---|---|---|
| `image3.jpeg` | `holistic-anatomy.jpeg` | `/` |
| `image6.png` | `essential-air.png` | `/pemf` |
| `image7.png` | `essential-food.png` | `/pemf` |
| `image8.png` | `essential-water.png` | `/pemf` |
| `image9.png` | `essential-sunshine.png` | `/pemf` |
| `image10.jpeg` | `essential-earth-field.jpeg` | `/pemf` |
| `image11.png` | `earth-magnetic-field-shield.png` | `/pemf` |
| `image12.png` | `magnetic-field-weakening.png` | `/pemf` |
| `image13.png` | `sources-of-radiation.png` | `/pemf` |
| `image15.png` | `pemf-mimics-earth-field.png` | `/pemf` |
| `image18.png` | `exagon-brain-banner.png` | `/mental-health` |
| `image43.png` | `spectrum-of-vitality.png` | `/products` |
| `image45.png` | `why-low-frequency.png` | `/products` |
| `IMRS Model 3.png` | `imrs-model-3.png` | `/` |

`image4.png` is a second QR code appearing on every page of the document alongside the
WeChat code. Its target is unknown — see Open Questions.

### Deletions (17)

Not present in the 2026 document: `pemf-pets.jpg`, `tesla-quote.jpg`, `imrs-prime-set.jpg`,
`em-spectrum.jpg`, `omnium-on-the-go.jpg`, `solar-wind.jpg`, `hero-mat-home.jpg`,
`pemf-mat-session.jpg`, `imrs-consultation.jpg`, `essentials-strip.png`, `magnetosphere.jpg`,
`horse-body-applicator.jpg`, `horse-leg-applicator.jpg`, `racehorses.jpg`, `zoo-animals.png`,
`exagon-brain.jpg`, `radiation-sources.jpg`.

Four of these are superseded rather than dropped: `magnetosphere.jpg` →
`earth-magnetic-field-shield.png`, `radiation-sources.jpg` → `sources-of-radiation.png`,
`em-spectrum.jpg` → `pemf-mimics-earth-field.png`, `essentials-strip.png` → the five
`essential-*` files.

### Alt text

Every image gets alt text. Photographs are described; diagrams whose meaning is carried by
adjacent transcribed prose are marked `alt=""` and `aria-hidden` so screen readers are not
made to hear the same content twice.

---

## 4. Content model

All copy lives in `lib/content/`, one module per route, each with a header comment naming
the document as its source. Pages import content and contain no prose literals — this is
what makes the verbatim rule mechanically checkable (§6).

```
lib/content/
  home.ts            pemf.ts             holistic-health.ts
  mental-health.ts   energy.ts           sports-health.ts
  sleep-health.ts    pets-health.ts      products.ts
  contact.ts         types.ts            index.ts
```

Deleted: `faqs.ts`, and the `videos` export in `pemf.ts`.

`lib/site.ts` gains the office number from the document's header bar:

```ts
officePhone: "(949) 600 7899",
officePhoneHref: "tel:+19496007899",
```

The existing `(949) 891 5572` stays as the WhatsApp/text number. Both appear in the top
bar, exactly as the document's header presents them.

---

## 5. Page compositions

Every page ends with `<Disclaimer />` and a `<CTA />` carrying `PhoneButton`. Every page
below the first has `<Breadcrumbs />`. Headings are verbatim; the composition notes below
describe layout only.

**`/` Home** — Text-first hero (eyebrow "Pulsed Electro Magnetic Field", H1, opening
paragraph, two buttons) → `Figure` with `imrs-model-3.png` in a sand band → "PEMF -
Holistic Approach" `SplitBand` with `holistic-flower.png` → "Holistic Anatomy" section
with `holistic-anatomy.jpeg` → link cards to the nine other pages.

**`/pemf`** — H1 "PEMF for Healthy Lifestyle" → the natural-essentials row as five
`essential-*` images → "Magnetic Field Energy is Essential for Health" `TriPanel`
(shield image │ "What is Vital for Health?" │ weakening image) → "Importance of Earth's
Magnetic Field" `TriPanel` (radiation sources │ "Protection from Radiation" │ magnet
poles) → "PEMF Mimics Earth's Magnetic Field Energy" `SplitBand`.

**`/holistic-health`** — H1 "PEMF for Holistic Health" → `TriPanel` (definition │
`wellness-practices.png` │ whole-person paragraph) → "PEMF for Wellness" with
`eight-dimensions.png`.

**`/mental-health`** — H1 "PEMF Improves Mental Health" → `JumpNav` → `TriPanel` (the five
health dimensions │ Brainwave Entrainment + `exagon-brain-banner.png` │ Intellectual
Health list) → `#stress` "PEMF Helps Manage Stress" `TriPanel` with `stress-meter.png` →
`#relaxation` "PEMF for Relaxation" `TriPanel` with `relax-poolside.jpg` → "Benefits of
Relaxation" three-card row.

**`/energy`** — H1 "PEMF Increases Your Energy" → `TriPanel` (three benefits │
`energy-battery.png` + "Benefits of Being Energetic" │ two benefits).

**`/sports-health`** — H1 "Sports Health" → "PEMF Enhances Athletic Performance"
`TriPanel` with `brainwave-entrainment.png` → "PEMF Boosts Sports Performance and
Endurance" three-card row (`passive-warmup.png`, `rejuvenation.png`, `performance.png`).

**`/sleep-health`** — H1 "PEMF Promotes Good Sleep" → `TriPanel` with
`sleep-mat-tablet.png` → "Benefits of Adequate Sleep" three-card row.

**`/pets-health`** — H1 "PEMF for Pets Health" *(document reads "PRMF" — Appendix B)* →
three-card row (`show-animals.png`, `pemf-dog-pad.png`, `pets-group.png`) →
`imrs-fauna-horses.png` banner → "PEMF for Racehorses" `TriPanel` (`horse-area-applicator.png`
│ Stress Free Technique list │ `horse-leg-applicator-2026.png`).

**`/products`** — H1 "Products" → `JumpNav` → `#imrs-prime` intro with
`imrs-prime-modes.jpg` → Exagon FIR / Pad / Spot / Split Mode / Brainwave Entrainment as
alternating `SplitBand`s → Exagon Sense + Exagon Brain two-card row → `#smart-pulser`
intro with `smart-pulser-set.png` → coil comparison → "Spectrum of Vitality" with the five
transcribed frequency zones as `FrequencyCard`s → "Biomimetic Frequencies" `SplitBand` →
"Why Low Frequency is High Impact" with transcribed paragraph.

**`/contact`** — H1 "Contact" → contact details from the document's header bar (office
number, WhatsApp number, address, "Office and Home Visits Available") as large call
buttons → both QR codes → Google Maps embed (retained; it is a map, not a video). No
invented prose — the document's Contact page contains no copy.

### Structured data

`LocalBusiness` + `WebSite` on `/`; `BreadcrumbList` on the nine inner pages; `Product` on
`/products`. All `FAQPage` schema is removed with the FAQ layer. `LocalBusiness` gains
`telephone` for the office number.

---

## 6. Verification

Three scripts, all runnable before any completion claim is made.

**`scripts/verify-copy.mjs` — the FDA guard.** `scripts/extract-doc.py` writes the
document's full text to `docs/exiga-jasmin-2026.txt`, which is committed. The verifier
walks every exported string in `lib/content/` and asserts each appears verbatim in that
file after whitespace normalisation. Deviations must be listed in an explicit
`ALLOWED_EDITS` array with a reason — which is exactly the typo log in Appendix B. Any
unlisted deviation fails. This makes "language must be exact" a build failure rather than
a promise.

**`scripts/verify-contrast.mjs`.** Parses the colour tokens out of `app/globals.css`,
recomputes every text/background pair, and fails below 7:1. Also fails if `--sage-soft` or
`--clay-soft` appears in a `color`, `background` behind text, or border-of-a-button
position.

**`scripts/verify-site.mjs`.** Updated: ten routes, no `FAQPage` expectations, sitemap
count of 10, plus assertions that `/what-is-pemf` and `/benefits` return 308.

**Manual, and required.** Project memory records that a green build has repeatedly hidden
real layout bugs on this site. Before any page is called done: run `npm run dev`,
screenshot every one of the ten routes at 1440px, at 390px, and at 200% zoom, and look at
them.

---

## 7. Out of scope

- **Deployment.** `pemfforholistichealth.com` currently serves WordPress, not this build,
  and there is no confirmed live URL for it. That blocker is unchanged and untouched here.
- **Google Translate.** The document's header bar says *"Google Translate in other
  Language"*. The old free Google Translate website widget is discontinued for new sites.
  **⚠️ WARNING: THE GOOGLE CLOUD TRANSLATION API IS A PAID, USAGE-BILLED SERVICE AND WILL
  CHARGE THE CLIENT.** No paid translation service will be enabled. If translation is
  wanted, the free options are the browser's own built-in translation (Chrome, Edge and
  Safari offer it automatically on any page with correct `lang` markup) or hand-authored
  translations. Deferred pending the client's decision.

---

## Open questions

1. **Home hero has no photograph.** The instruction not to use `IMRS Model 3.png` as the
   hero, combined with the document offering no other hero image, produces a text-first
   hero. Confirm, or nominate another image.
2. **QR code target.** `image4.png` appears on every page of the document next to the
   WeChat code. No decoder is available in this environment and its target must not be
   guessed. Where should it point?
3. **Consultant identity.** The current site names "Sharon Wong, Certified PEMF
   Consultant, ID 81003", from the 2025 document. The 2026 document does not mention it.
   Keep, or drop?
4. **`/products` as one page.** The document labels Smart Pulser as *"Link:"*, which may
   mean a separate page. Default is one `/products` page with anchor sections, matching
   the nav table's treatment of Products as a single page. Split into
   `/products/smart-pulser` instead?
5. **`iMRS prime` casing.** The document uses "IMRS prime", "iMRS prime" and "IMRS Prime"
   on the same page. Default is to leave each instance verbatim, since brand casing is not
   a typo. Normalise to one form?

---

## Appendix A — route inventory

| Route | Title | JSON-LD | Content module |
|---|---|---|---|
| `/` | PEMF for Health and Wellness | LocalBusiness, WebSite | `home.ts` |
| `/pemf` | PEMF for Healthy Lifestyle | BreadcrumbList | `pemf.ts` |
| `/holistic-health` | PEMF for Holistic Health | BreadcrumbList | `holistic-health.ts` |
| `/mental-health` | PEMF Improves Mental Health | BreadcrumbList | `mental-health.ts` |
| `/energy` | PEMF Increases Your Energy | BreadcrumbList | `energy.ts` |
| `/sports-health` | Sports Health | BreadcrumbList | `sports-health.ts` |
| `/sleep-health` | PEMF Promotes Good Sleep | BreadcrumbList | `sleep-health.ts` |
| `/pets-health` | PEMF for Pets Health | BreadcrumbList | `pets-health.ts` |
| `/products` | Products | BreadcrumbList, Product | `products.ts` |
| `/contact` | Contact | BreadcrumbList | `contact.ts` |

## Appendix B — typo log

Every deviation from the document, and nothing else. This list is the `ALLOWED_EDITS`
array in `scripts/verify-copy.mjs`.

Two classes of edit are permitted, and no others.

**Class 1 — enumerated word-level fixes.** Complete list:

| # | Document | Site | Reason |
|---|---|---|---|
| 1 | "PRMF for Pets Health" | "PEMF for Pets Health" | Unambiguous transposition in a page H1 |

**Class 2 — terminal punctuation.** The document omits the closing period on many
sentences and paragraphs — the disclaimer ("…wellness plan"), the Home hero ("…PEMF body
mat"), and the holistic-approach paragraph ("…overall well-being  This perspective…"),
among others. The rule is: **add a terminal period where a sentence ends without one; add
nothing else.** No word is added, removed, reordered, or re-cased under this class.

Because these run to dozens of instances, the exhaustive list is generated during
implementation rather than guessed at now: `scripts/verify-copy.mjs` reports every string
that differs from `docs/exiga-jasmin-2026.txt` by punctuation alone, and that generated
list is committed back into this appendix as Class 2's enumeration. Any difference that is
*not* pure terminal punctuation fails the build and must be added to Class 1 with a stated
reason, or reverted.

Not changed, deliberately: "Exiga Jasmine" (document title only, never rendered);
"Qi Energy" vs "Energy" page labelling (nav label "Energy", H1 verbatim); mixed
`iMRS`/`IMRS` casing (Open Question 5); "Biofeedback for wellbeing purposes sensor"
(awkward but is the client's wording); the stray "j" and "10th Page-10th Page" markers
(document artefacts, not content).

No health claim, benefit statement, or product description is altered anywhere.
