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
];

// lib/site.ts holds sitewide prose (disclaimer, address, business name) that
// is rendered straight into Header/Footer/CTA/Disclaimer, never routed
// through lib/content/ -- so it was invisible to this script until now.
// Keys whose value a visitor actually reads. officePhoneHref, phoneHref,
// whatsappHref and url are `tel:`/`https:` targets, never shown as text;
// officePhone, phone, whatsapp and areaServed are schema.org/tel: data
// (areaServed only ever feeds JSON-LD, see lib/seo.ts), not body copy.
const SITE_FILE = "lib/site.ts";
const SITE_COPY_KEYS = ["name", "address", "disclaimer", "deviceNote"];

// site.deviceNote ("The PEMF system is not a medical device...") does not
// appear anywhere in the 2026 document. It is protective language carried
// over from the prior build. Removing a safety disclaimer without the
// client's explicit instruction is the riskier action, so it is being
// flagged for client sign-off (see lib/site.ts) rather than deleted, and is
// deliberately exempted here rather than left to fail this check forever or
// falsely claimed as verbatim. This is the ONLY entry this set may ever
// hold without a matching client sign-off note above it.
const SITE_EXEMPT = new Set(["deviceNote"]);

// Every permitted deviation from the document. Spec Appendix B.
// Anything not listed here that differs by more than terminal punctuation is a failure.
export const ALLOWED_EDITS = [
  {
    site: "PEMF for Pets Health",
    doc: "PRMF for Pets Health",
    reason: "Unambiguous transposition in a page H1 (spec Appendix B, class 1)",
  },
];

/** Collapse whitespace only. Quote and apostrophe characters are checked
 *  verbatim: the client's document mixes curly and straight forms for the
 *  same word in different places, and site copy must match the exact
 *  character used at each source location, not just its ASCII equivalent. */
export function normalise(s) {
  return s
    .replace(/ /g, " ")
    .replace(/\s+/g, " ")
    .trim();
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

async function main() {
  const haystack = buildHaystack(SOURCES.map((p) => readFileSync(p, "utf8")));

  if (process.argv.includes("--self-test")) return selfTest(haystack);

  const dir = "lib/content";
  const fileFlagIndex = process.argv.indexOf("--file");
  const onlyFile = fileFlagIndex !== -1 ? process.argv[fileFlagIndex + 1] : null;

  let files = readdirSync(dir).filter(
    (f) => f.endsWith(".ts") && !["types.ts", "index.ts", "images.ts"].includes(f)
  );
  if (onlyFile) {
    files = files.filter((f) => f === onlyFile);
    if (files.length === 0) {
      console.error(
        `FAIL --file ${onlyFile}: no such module in ${dir}/ (typo? this would silently pass without this check)`
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
    for (const key of SITE_COPY_KEYS) {
      if (SITE_EXEMPT.has(key)) continue;
      for (const str of collectCopy(siteMod.site[key])) {
        const problem = checkString(str, haystack);
        if (problem) {
          console.error(`FAIL ${SITE_FILE} (${key}): ${problem}\n      "${str}"`);
          failures++;
        }
      }
    }
    console.log(`  checked ${SITE_FILE}`);
  }

  console.log(failures ? `\n${failures} COPY FAILURE(S)` : "\nAll copy verbatim");
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
    ["rejects a paraphrase", "PEMF is great for your overall health and wellness", false],
    ["rejects a reworded heading", "PEMF for Health & Wellness", false],
  ];
  let failures = 0;
  for (const [name, input, shouldPass] of cases) {
    const passed = checkString(input, haystack) === null;
    if (passed === shouldPass) console.log(`  ok   ${name}`);
    else {
      console.error(`  FAIL ${name}: expected ${shouldPass ? "accept" : "reject"}`);
      failures++;
    }
  }
  console.log(failures ? `\n${failures} SELF-TEST FAILURE(S)` : "\nSelf-test passed");
  process.exit(failures ? 1 : 0);
}

// Only run the CLI when this file is the entry point — importing the
// exports above (e.g. from another script) must not trigger a full run
// and a process.exit() as a side effect.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
