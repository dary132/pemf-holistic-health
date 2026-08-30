# BREAKPOINT — 2026-08-29

Supersedes BREAKPOINT-2026-08-28 as the resume point. Read that one afterwards
for the /sports-health band redesign, which is **still unstarted** — everything
in it stands except where this file says otherwise.

## Where we stopped

Tree is clean, everything below is deployed and confirmed live on
pemf.darytechnologies.com. Nothing is half-finished. The session ended on a
legibility pass, and the only open item is a judgement call the client may or
may not want (see "Open question").

## The one rule that governs this site

**Site copy is byte-for-byte the client's document, and stays that way.**

This was tested to destruction this session. A full plain-language rewrite of
five pages was drafted, approved, applied, and then **reverted at the client's
instruction** — "the language is to be exact to what was in the document."
The drafts were deleted (`efc762d`). If readability comes up again, the answer
is type, spacing and structure, never wording. Do not re-propose rewrites.

The revert is `896a5ce`; the applied version is `081e2ae` if the wording is ever
wanted for reference. The published record of the proposal is at
claude.ai/code/artifact/bd342f2f-d878-4556-a438-b8cb0aa75ebf, marked withdrawn.

## Shipped this session

| Commit | What |
|---|---|
| `2b5a38e` | **Language switcher fix** — English was unreachable on the custom domain |
| `896a5ce` | Revert of the plain-language copy; original wording restored |
| `efc762d` | Draft copy document deleted |
| `acf5814` | Text-size control removed, and the header bug it exposed fixed |
| `ff01b8d` | Hero photograph un-framed; gap above the wordmark tightened |
| `f13d859` → `8a87e98` | Body weight 450 → 550 → 600 |
| `79cc70e` | Heading scale raised across every step |

Earlier in the session: `231f364` `36163f4` `d0636af` `72dcae0` `e870a66`
`f6a12fe` `2fb3992` rebuilt /products to mirror the manufacturer's iMRS prime
page, reworked /pemf into open-frame bands, and swapped in client-supplied
images. Those are settled and were not touched by the revert.

## The language switcher bug — root cause, so nobody re-debugs it

Google's translate widget does **not** write `googtrans` to the host it runs
on. Its own writer (function `Gw` in Google's `el_main.js`) walks the hostname
down to its last two labels and sets the cookie twice — host-only, then again
with `;domain=<those two labels>`. On `pemf.darytechnologies.com` the live
cookie therefore sits on `darytechnologies.com`, and the switcher was only
expiring spellings of the full hostname. Picking English cleared nothing that
mattered, the reload read the surviving `/en/es`, and the page re-translated.

`lib/googtrans.ts` now walks every parent domain. `npm run verify:lang`
(`scripts/verify-language-switcher.mjs`) models the RFC 6265 rules and
reproduces Google's writer verbatim; it fails against the old clear and passes
against the new one.

**Why it was missed originally:** `vercel.app` is on the Public Suffix List, so
on the preview URL the widget's second write is rejected and only the host-only
cookie exists — which the old code did clear. It genuinely worked there.

## Trap: test browser behaviour on the custom domain

Cookie, auth, subdomain and CORS behaviour differ between
pemf-holistic-health.vercel.app and pemf.darytechnologies.com, for the public
suffix reason above. Reproduce on the custom domain before declaring a fix.

## Trap: the type scale and the header are coupled

The base root size is now **21px / 22px** (was 20/21). Two header bugs came out
of that, both invisible above 1280px and both found only on screen:

1. `whitespace-nowrap` on the wordmark made it overflow its flex track at
   1024px and render **straight through the nav links**. The wordmark must
   stay free to wrap. Never re-add nowrap to it.
2. The six-item nav and the four-word practice name do not share a line below
   about 1400px at this base size. The desktop nav is therefore `xl:flex`
   (1280px), and the wordmark holds one step down until `2xl`.

Anything that raises the root size again must be re-checked at **1024, 1280 and
390px**, not just at a wide desktop.

## Current typography state

- Root: 21px, 22px from 640px (`app/globals.css`).
- Body weight **600**. This is the practical ceiling: headings are 700 in the
  display face, and going further flattens the heading/paragraph difference.
  More prominence should come from size or spacing.
- Every `font-medium`/`font-semibold` label was raised to bold as the body
  weight climbed past them — if body weight ever changes again, re-check that
  labels still outrank body text.
- Type scale (`--step-*`): display `clamp(2.75rem, 5.5vw, 4.25rem)`, h1
  `clamp(2.375rem, 4.5vw, 3.25rem)`, h2 `clamp(1.95rem, 3.4vw, 2.5rem)`,
  h3 `1.5rem`, lead `1.2rem`. Clamp **minimums** matter — they are what phones
  get; raise them with the maximums or small screens see no change.
- Card eyebrows, card body and card buttons are off the `text-xs`/`text-sm`
  tier. Link underlines 2px at 4px offset; focus ring 4px.
- Ink colours are already near-black on cream (`#2A2E27`, `#3A4237`). There is
  **no contrast left to win** — weight and size are the only levers.

## Removed, and why — do not rebuild without asking

A reader-controlled **A− / A / A+ text-size control** was built, tested end to
end, shipped, and then removed the same day at the client's request: "it's not
working and is throwing off the top of the page." The header damage was
actually the `whitespace-nowrap` bug above, not the control itself, but the
client's call stands. It is gone from `1f23669`, removed in `acf5814`. Do not
reintroduce it unprompted.

Also declined, with reasons on file: text-shadow or outline "layering" behind
text. Softened glyph edges lower effective contrast at exactly the edges the
eye uses to resolve a letter, so it reads as prominent to a designer and worse
to the reader it is meant to help. The layering on these pages is structural —
white plates over tinted grounds.

## Open question — the only thing waiting on the client

At the raised heading sizes, a long h1 on a phone runs to four lines
("PEMF Improves Mental Health" at 390px) and pushes content down. Nothing
breaks and there is no overflow. Offered to trim the phone-end clamp minimum
without touching desktop sizes; **no answer yet**. Do not act on it unprompted.

## Also outstanding, lower priority

- **/sports-health band redesign** — approved 2026-08-28, groundwork deployed,
  page rebuild never started. See BREAKPOINT-2026-08-28 for the approved
  layout. This is the largest unstarted piece of work.
- **/sports-health reads hardest of any page** (Flesch–Kincaid 13.1 measured on
  the real exported strings). Recorded as a fact only — the copy is not to be
  rewritten. Ignore unless the client raises readability again, and then answer
  with type and layout.
- The client-supplied organ-function chart on the home page has two spelling
  errors baked into the artwork ("Detoffication", "Fiter blood"). Raster image,
  cannot be fixed in code; the client was told and has not sent a replacement.
- The hero photograph is 1000px wide, rendered at content width. Fine today;
  worth a sharper source if the hero ever goes wider.

## How to verify anything here

```
npm run build
npx next start -p 3100          # verify:all needs a server
BASE_URL=http://localhost:3100 npm run verify:all
```

`verify:all` covers contrast, themes, copy (both modules and JSX), the language
switcher, heading outlines, and the site checks. It does **not** catch layout
overflow — screenshot at 390, 1024 and 1280px, or use the throwaway CDP
scripts in this session's scratchpad (`overflow-all.mjs`, `textsize-e2e.mjs`,
`cdp.mjs`) as a starting point if they are still around.

**A green build has repeatedly hidden real layout bugs on this site.** Both
header bugs this session passed every check. Look at it.
