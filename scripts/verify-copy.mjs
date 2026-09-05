// Fails the build if any string in lib/content/ deviates from the client's
// document. The client cites FDA exposure: copy must be exact.
//
//   npm run verify:copy                     check lib/content against the document
//   npm run verify:copy -- --self-test      prove the checker actually rejects bad copy
//   npm run verify:copy -- --file home.ts   check only that one module in lib/content
//
// What this guarantees, and what it does not:
//   It verifies that every visitor-facing string collected from lib/content/
//   is exact text copied from the client document (docs/exiga-jasmin-2026.txt
//   and docs/exiga-jasmin-2026-image-text.txt), modulo whitespace
//   normalisation and the one documented terminal-punctuation allowance.
//   Quote and apostrophe characters (curly vs. straight) are NOT normalised
//   and must match the source character for character — the document itself
//   uses both forms for the same word in different places, so site copy is
//   required to track which one appears at each specific source location.
//   It does NOT verify that the surrounding framing preserves the document's
//   meaning: matching is substring-based, so any exact fragment of the
//   document passes, down to a single word, even if the fragment is quoted
//   out of a longer sentence and recombined with other fragments in a way
//   that changes what it implies. (See the self-test case "accepts a
//   document fragment (known limitation, see header)".) That trade-off is
//   deliberate: content modules legitimately quote sentence fragments out of
//   the document's table cells, and requiring sentence-boundary matching
//   would produce constant false rejections, pressuring future edits to
//   weaken the guard instead. Catching invented and paraphrased copy is this
//   script's job; verifying semantic fidelity of how genuine fragments are
//   recombined remains a human review responsibility.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const SOURCES = [
  "docs/exiga-jasmin-2026.txt",
  "docs/exiga-jasmin-2026-image-text.txt",
  // Manufacturer copy for the /products iMRS prime sections, captured
  // verbatim from the Swiss Bionic distributor page. Added 2026-08-29 with
  // the site owner's approval: the client document does not cover the
  // control panel, connector box, software tools or accessories, and
  // verbatim manufacturer text was chosen over paraphrase to keep every
  // rendered string traceable to a source document. Provenance is recorded
  // in the file's own header.
  "docs/imrs-prime-swissbionic.txt",
  // The client's 2026-09-04 revision of the "PEMF - Holistic Approach"
  // block: three image-and-paragraph cards for /holistic-health, with one
  // new sentence and one amended phrase that the Exiga Jasmin 2026 document
  // does not contain. Approved by the site owner on 2026-09-04. Provenance
  // is recorded in the file's own header.
  "docs/edit-holistic-health-2026-09.txt",
];

// lib/site.ts holds sitewide prose (disclaimer, address, business name) that
// is rendered straight into Header/Footer/CTA/Disclaimer, never routed
// through lib/content/ -- so it was invisible to this script until now.
const SITE_FILE = "lib/site.ts";

// DENY-list, deliberately not an allow-list. An allow-list of copy keys is
// the same shape as the `APP_DIR = "app"` bug that let invented copy sit in
// components/ through 21 tasks: whatever nobody remembered to add is
// silently unchecked, and the green run reads as coverage. Here the default
// is the safe one -- every key in `site` is checked as copy unless it is
// named below -- so a newly added key is checked from the moment it exists,
// and skipping it takes a deliberate edit to this list.
//
// url, officePhoneHref, phoneHref, whatsappHref and directionsHref are
// `tel:`/`https:` targets, never rendered as text. officePhone, phone and
// whatsapp are dialable numbers: they ARE rendered, but as data whose
// formatting is the site's to choose, not document prose to reproduce.
//
// directionsHref does embed the office address in its query string, but as
// URL-encoded route data for Google Maps, not as a sentence a visitor reads
// -- the same address IS checked as copy via the `address` key, which is the
// one that actually renders.
const SITE_NON_COPY_KEYS = new Set([
  "url",
  "officePhoneHref",
  "phoneHref",
  "whatsappHref",
  "directionsHref",
  "officePhone",
  "phone",
  "whatsapp",
]);

// Values that ARE client-facing claims but are knowingly not in the 2026
// document, each pending the client's answer. Exempting them here is what
// keeps this script honest: the alternative is either a permanent red run
// or -- worse -- quietly reclassifying a claim as "not copy" so it stops
// being asked about. Every entry needs a written reason and an owner.
//
//   (deviceNote was here until 2026-08-31. "The PEMF system is not a medical
//   device..." -- protective language carried over from the prior build,
//   held open for the client's answer. They instructed its removal, so the
//   string, its renderer in components/Footer.tsx and this exemption all
//   went together. Recorded rather than silently dropped: this set exists to
//   make open questions visible, so a question that gets ANSWERED should
//   show its answer here, not just vanish.)
//   areaServed  "Orange County, California". Appears 0 times in the
//               document. No longer rendered as page copy, but still
//               published to Google as a factual business claim via
//               localBusinessSchema (lib/seo.ts). Listed here rather than
//               in SITE_NON_COPY_KEYS above because it is a claim about the
//               business, not formatting -- calling it "not copy" would
//               bury the open question instead of holding it open.
//
// Anything added here without a reason and a client decision behind it is a
// misuse of this set.
const SITE_EXEMPT = new Set(["areaServed"]);

// Every permitted deviation from the document. Spec Appendix B.
// Anything not listed here that differs by more than terminal punctuation is a failure.
export const ALLOWED_EDITS = [
  {
    site: "PEMF for Pets Health",
    doc: "PRMF for Pets Health",
    reason: "Unambiguous transposition in a page H1 (spec Appendix B, class 1)",
  },
  {
    site: "Call | Text | WhatsApp",
    doc: "Call / Text / WhatsApp",
    // Separator glyph only -- the three words, their order and their meaning
    // are the document's. Registered here rather than waved through because
    // the alternative dodge is worse: splitting the heading into three
    // one-word text nodes would slip under verify-jsx-copy's two-word floor
    // and leave no record that the site says something the document does not.
    // Applies to both places the heading appears: components/CTA.tsx, the
    // closing band on every page, and app/contact/page.tsx.
    reason:
      "Client asked for pipe separators in the sitewide CTA heading, 2026-08-30",
  },
  {
    site: "PEMF Improves Wellness",
    doc: "PEMF Improves Mental Health",
    // Two places: the /mental-health H1 (lib/content/mental-health.ts) and the
    // home page's teaser card for that route (lib/content/home.ts), which
    // tracks it so a card cannot advertise a different name from the heading
    // it opens.
    //
    // The wording moved twice on 2026-08-31 -- "Brain Health" first, then
    // "Wellness" -- as the client worked out what this page is. It is one
    // exception, not two: only the CURRENT site string belongs here, because
    // this list answers "may the site say X where the document says Y", and
    // the site no longer says "Brain Health" anywhere. The history lives in
    // git and in the comments on the two files above.
    //
    // Not a rewrite for readability -- those are forbidden here and one was
    // reverted on 2026-08-29 -- but the client's own vocabulary: the document
    // uses "wellness" throughout, including in this page's own copy. Only
    // lib/routes.ts still carries "Mental Health", deliberately: that field
    // records the document's own page heading and is not rendered anywhere.
    reason:
      "Client renamed this the Wellness page, 2026-08-31; H1 follows the nav",
  },
];

/** Collapse whitespace only. Quote and apostrophe characters are checked
 *  verbatim: the client's document mixes curly and straight forms for the
 *  same word in different places, and site copy must match the exact
 *  character used at each source location, not just its ASCII equivalent. */
export function normalise(s) {
  return s.replace(/ /g, " ").replace(/\s+/g, " ").trim();
}

/** Strip a single trailing period so class-2 punctuation edits pass. */
export function stripTerminal(s) {
  return s.replace(/\.$/, "");
}

export function buildHaystack(texts) {
  return normalise(texts.join("\n"));
}

/** Returns null if ok, or a reason string if the copy is not permitted. */
export function checkString(value, haystack) {
  const n = normalise(value);
  if (!n) return null;
  if (haystack.includes(n)) return null;
  if (haystack.includes(stripTerminal(n))) return null; // class 2: added period
  const allowed = ALLOWED_EDITS.find((e) => normalise(e.site) === n);
  if (allowed && haystack.includes(normalise(allowed.doc))) return null;
  return "not found in the client document";
}

/** Every string reachable from a module's exports. */
export function collectStrings(value, out = []) {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === "object")
    Object.values(value).forEach((v) => collectStrings(v, out));
  return out;
}

// Keys whose values are never shown to a visitor and so are not copy.
const NON_COPY_KEYS = new Set(["src", "href", "id", "image", "icon", "path"]);

export function collectCopy(value, out = []) {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectCopy(v, out));
  else if (value && typeof value === "object")
    for (const [k, v] of Object.entries(value))
      if (!NON_COPY_KEYS.has(k)) collectCopy(v, out);
  return out;
}

/** Every {key, text} problem in a `site`-shaped object. Pure, no I/O, so the
 *  self-test can prove the deny-list actually catches an unknown key. */
export function checkSiteObject(siteObj, haystack) {
  const problems = [];
  for (const [key, value] of Object.entries(siteObj)) {
    if (SITE_NON_COPY_KEYS.has(key)) continue;
    if (SITE_EXEMPT.has(key)) continue;
    for (const str of collectCopy(value)) {
      const problem = checkString(str, haystack);
      if (problem) problems.push({ key, text: str, problem });
    }
  }
  return problems;
}

async function main() {
  const haystack = buildHaystack(SOURCES.map((p) => readFileSync(p, "utf8")));

  if (process.argv.includes("--self-test")) return selfTest(haystack);

  const dir = "lib/content";
  const fileFlagIndex = process.argv.indexOf("--file");
  const onlyFile =
    fileFlagIndex !== -1 ? process.argv[fileFlagIndex + 1] : null;

  // types.ts is types, index.ts is re-exports, images.ts is src paths and alt
  // text (descriptions of pictures, not the document's prose), and blur.ts is
  // generated base64 placeholders -- none of them carry a client-facing
  // sentence. blur.ts joined the list on 2026-08-30: every data URI in it was
  // being read as invented copy, nine failures for a file with no prose at
  // all. Staleness there is checked by `npm run verify:blur` instead, which
  // is the guard that file actually needs.
  let files = readdirSync(dir).filter(
    (f) =>
      f.endsWith(".ts") &&
      !["types.ts", "index.ts", "images.ts", "blur.ts"].includes(f),
  );
  if (onlyFile) {
    files = files.filter((f) => f === onlyFile);
    if (files.length === 0) {
      console.error(
        `FAIL --file ${onlyFile}: no such module in ${dir}/ (typo? this would silently pass without this check)`,
      );
      process.exit(1);
    }
  }

  let failures = 0;
  for (const file of files) {
    const mod = await import(new URL(`../${join(dir, file)}`, import.meta.url));
    for (const value of Object.values(mod)) {
      for (const str of collectCopy(value)) {
        const problem = checkString(str, haystack);
        if (problem) {
          console.error(`FAIL ${file}: ${problem}\n      "${str}"`);
          failures++;
        }
      }
    }
    console.log(`  checked ${file}`);
  }

  // --file scopes a run to a single lib/content/ module; honour that and
  // skip the sitewide check too, rather than always tacking it on.
  if (!onlyFile) {
    const siteMod = await import(new URL(`../${SITE_FILE}`, import.meta.url));
    for (const { key, text, problem } of checkSiteObject(
      siteMod.site,
      haystack,
    )) {
      console.error(`FAIL ${SITE_FILE} (${key}): ${problem}\n      "${text}"`);
      failures++;
    }
    const checked = Object.keys(siteMod.site).filter(
      (k) => !SITE_NON_COPY_KEYS.has(k) && !SITE_EXEMPT.has(k),
    );
    console.log(
      `  checked ${SITE_FILE} (${checked.length} copy key(s): ${checked.join(", ")})`,
    );
  }

  console.log(
    failures ? `\n${failures} COPY FAILURE(S)` : "\nAll copy verbatim",
  );
  process.exit(failures ? 1 : 0);
}

function selfTest(haystack) {
  const cases = [
    ["accepts an exact sentence", "PEMF for Health and Wellness", true],
    ["accepts an added terminal period", "PEMF for Health and Wellness.", true],
    ["accepts an allow-listed fix", "PEMF for Pets Health", true],
    ["accepts transcribed image text", "The Earth Resonance (7.83 Hz):", true],
    [
      "accepts a document fragment (known limitation, see header)",
      "PEMF is safe",
      true,
    ],
    ["rejects invented copy", "PEMF cures chronic pain in six weeks", false],
    [
      "rejects a paraphrase",
      "PEMF is great for your overall health and wellness",
      false,
    ],
    ["rejects a reworded heading", "PEMF for Health & Wellness", false],
  ];
  let failures = 0;
  for (const [name, input, shouldPass] of cases) {
    const passed = checkString(input, haystack) === null;
    if (passed === shouldPass) console.log(`  ok   ${name}`);
    else {
      console.error(
        `  FAIL ${name}: expected ${shouldPass ? "accept" : "reject"}`,
      );
      failures++;
    }
  }

  // The lib/site.ts deny-list, exercised as a unit. The point of these three
  // is that the FIRST one fails without anybody having to remember to add a
  // key name anywhere -- that is the whole difference from the allow-list
  // this replaced, and it is worth a test that would notice a regression to
  // allow-list behaviour.
  const siteCases = [
    [
      "checks a key nobody allow-listed (the deny-list's whole point)",
      {
        somethingBrandNew:
          "We guarantee PEMF will heal your arthritis in 30 days.",
      },
      false,
    ],
    [
      "accepts verbatim sitewide prose",
      { name: "PEMF for Holistic Health" },
      true,
    ],
    [
      "skips a deny-listed non-copy key",
      { whatsappHref: "https://wa.me/19498915572" },
      true,
    ],
    [
      "skips a documented pending-client exemption",
      { areaServed: "Orange County, California" },
      true,
    ],
  ];
  for (const [name, obj, shouldPass] of siteCases) {
    const passed = checkSiteObject(obj, haystack).length === 0;
    if (passed === shouldPass) console.log(`  ok   ${name}`);
    else {
      console.error(
        `  FAIL ${name}: expected ${shouldPass ? "accept" : "reject"}`,
      );
      failures++;
    }
  }

  console.log(
    failures ? `\n${failures} SELF-TEST FAILURE(S)` : "\nSelf-test passed",
  );
  process.exit(failures ? 1 : 0);
}

// Only run the CLI when this file is the entry point — importing the
// exports above (e.g. from another script) must not trigger a full run
// and a process.exit() as a side effect.
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main();
}
