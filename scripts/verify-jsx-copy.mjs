// Fails the build if any client-facing text written straight into JSX in
// app/**/*.tsx or components/**/*.tsx deviates from the client's document.
// This closes a gap in verify-copy.mjs: that script only ever sees strings
// inside lib/content/ module exports, so a caption, heading or paragraph
// typed directly into a page or a shared component (never passed through
// lib/content/) is invisible to it.
// The client cites FDA exposure: copy must be exact, wherever it lives.
//
//   npm run verify:jsx                 scan app/ and components/ for invented copy
//   npm run verify:jsx -- --self-test  prove the checker actually rejects bad copy
//
// Method: a pragmatic regex-based extractor, not a real JSX/TS parser (no
// parser dependency is used, per project convention -- see verify-copy.mjs
// and verify-contrast.mjs, neither of which parses either). It collects two
// kinds of candidate string from each file:
//
//   (a) string-literal or simple-template-literal values assigned to a
//       fixed list of copy-bearing prop names (COPY_PROPS below). A
//       template literal's `${expression}` segments are cut out and each
//       remaining static fragment is checked on its own, so an interpolated
//       label like `intro={`...across ${site.areaServed}.`}` still gets its
//       static prose checked.
//
//   (b) JSX text children -- literal text sitting between `>` and `<` --
//       that contain at least two words and at least one letter. Text
//       nodes that mix a literal with a `{expression}` (e.g.
//       `Call or Text · {site.phone}`) are skipped entirely: regex
//       extraction cannot safely isolate the static part from the dynamic
//       one, so this is a deliberate false-negative, not a bug. Known
//       limitation, same trade-off verify-copy.mjs documents for its own
//       substring matching.
//
// Every candidate is checked with the exact same `checkString`/`normalise`
// verify-copy.mjs uses, against the same two document files, imported
// directly rather than reimplemented -- so the verbatim rule (the class-2
// added-terminal-period allowance and the one documented ALLOWED_EDITS
// transposition) is identical everywhere. Anything left over is either
// genuine invented copy (fail) or a short, non-claim UI chrome label
// explicitly named in CHROME_ALLOWLIST below.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { buildHaystack, checkString } from "./verify-copy.mjs";

const SOURCES = ["docs/exiga-jasmin-2026.txt", "docs/exiga-jasmin-2026-image-text.txt"];

// Both app/ and components/ hold client-facing JSX: a caption, heading or
// paragraph typed straight into a shared component (CTA, Header, Footer, ...)
// is exactly as visible to a reader as one typed into a page file, and is
// exactly as unchecked by verify-copy.mjs (which only sees lib/content/).
const SCAN_DIRS = ["app", "components"];

// Props whose value is copy a visitor reads, wherever in app/ they appear.
const COPY_PROPS = ["caption", "intro", "title", "heading", "body", "eyebrow"];

// Genuine UI chrome: navigation, buttons and structural labels that are not
// quoted or paraphrased from the client document, and make no health or
// product claim of any kind. Every entry here must be a short label, never
// a sentence -- a sentence belongs in the document or it does not belong on
// the page.
const CHROME_ALLOWLIST = new Set([
  "Skip to content",
  "Menu",
  "Close",
  "Explore",
  "What is PEMF?",
  "Get in touch",
  "Call",
  "WhatsApp",
  "Visit Us",
  "Book a Session",
  // app/layout.tsx's browser-tab title wrapper, `title: { default, template }`.
  // What is left of each after its ${site.name} interpolation is cut out: the
  // location suffix on the default title, and the "%s" placeholder Next fills
  // with the page's own (checked) title. Both are title chrome around copy
  // that is verified elsewhere, and neither states anything about PEMF.
  "| Lake Forest, CA",
  "%s |",
]);

const PROP_PATTERN = new RegExp(
  `\\b(?:${COPY_PROPS.join("|")})\\s*=\\s*(?:"([^"]*)"|'([^']*)'|\\{\\s*"([^"]*)"\\s*\\}|\\{\\s*'([^']*)'\\s*\\}|\\{\\s*\`([^\`]*)\`\\s*\\})`,
  "g"
);

// (c) Route metadata. `export const metadata = pageMetadata({ title, description })`
// and app/layout.tsx's `metadata` object are plain object literals, not JSX,
// so PROP_PATTERN (which requires `prop=`) never saw them and neither did
// verify-copy.mjs (which only imports lib/content/). That left every page's
// <title> and meta description -- the text Google shows a searcher, and the
// first PEMF claim most visitors ever read -- completely unchecked. It is
// not a hypothetical gap: the fix wave this guard ships with had to remove
// an invented title ("PEMF Systems: iMRS Prime & Smart Pulser") and an
// invented layout description, both of which every other gate passed.
//
// `default` and `template` are app/layout.tsx's title wrapper; they are
// included so this covers the whole metadata surface rather than most of it,
// with their chrome fragments named in CHROME_ALLOWLIST below.
//
// Only quoted/backticked literals match, so `description: intro.body` (a
// reference into already-checked lib/content) and the TypeScript declaration
// `title: string;` are both skipped rather than misread as copy.
const META_PROPS = ["title", "description", "default", "template"];

const META_PROP_PATTERN = new RegExp(
  `\\b(?:${META_PROPS.join("|")})\\s*:\\s*(?:"([^"]*)"|'([^']*)'|\`([^\`]*)\`)`,
  "g"
);

// Text between a `>` and the next `<`. Excluding `{` and `}` from the
// character class is what makes a text node containing `{expression}`
// fail to match at all -- see the header note on mixed children.
//
// `(?<!=)` excludes a `>` that is itself the second character of an arrow
// `=>` from starting a match. Without it, scanning components/ (which is
// far more arrow-function-heavy than app/ page files) throws false
// positives: `.map((x) =>` followed eventually by a real JSX tag with no
// intervening `<`, `>`, `{` or `}` -- e.g. a ternary branch or a run of
// `//` comments between the arrow and the element it returns -- gets
// misread as one long "JSX text child" of arbitrary code/comment prose. A
// genuine JSX-closing `>` is never itself preceded by `=` (an attribute
// like `key={i}>` ends in `}`, a boolean prop `disabled>` ends in the
// identifier, a self-closing tag ends in `/>`), so this lookbehind costs
// no real coverage.
const TEXT_CHILD_PATTERN = /(?<!=)>([^<>{}]*)</g;

// An <iframe>'s own `title` attribute is the accessible name assistive tech
// announces for the embedded frame -- the same category of text as an
// <img> `alt`, which this project already exempts everywhere. It is not
// client-facing prose and asserts no health or product claim, so it is
// deliberately excluded from copy checking -- but ONLY there. `title` stays
// a checked, copy-bearing prop everywhere else (see COPY_PROPS): an
// attribute is exactly where a fabricated claim could hide unnoticed, so
// this exemption is kept element-scoped rather than widened to `title`
// generally, and is implemented as a real exclusion, not as an entry in
// CHROME_ALLOWLIST (which only ever holds fixed short strings, not an
// address that varies with the office location).
const IFRAME_TAG_PATTERN = /<iframe\b[^>]*>/g;

/** Blank out the word "title" inside every <iframe ...> tag's own markup,
 *  wherever the attribute sits among the tag's other attributes, so
 *  PROP_PATTERN never recognises it as the `title` prop there. Every
 *  character removed is replaced with a same-length run of "x", so no
 *  other offset or line number in the file shifts. The lookbehind/lookahead
 *  require whitespace before and `=` (with optional whitespace) after, so
 *  this cannot also blank an unrelated attribute name that merely contains
 *  the substring "title" (e.g. a hypothetical `data-title`). */
function maskIframeTitleAttr(content) {
  return content.replace(IFRAME_TAG_PATTERN, (tag) =>
    tag.replace(/(?<=\s)title(?=\s*=)/g, "xxxxx")
  );
}

/** Every checkable {text, offset} candidate embedded directly in one file's markup. */
export function extractCandidates(content) {
  const out = [];
  content = maskIframeTitleAttr(content);

  for (const m of content.matchAll(PROP_PATTERN)) {
    const raw = m[1] ?? m[2] ?? m[3] ?? m[4] ?? m[5];
    if (raw == null) continue;
    // Cut out ${expression} interpolations; check each static fragment on its own.
    for (const frag of raw.split(/\$\{[^}]*\}/)) {
      const trimmed = frag.trim();
      if (trimmed) out.push({ text: trimmed, offset: m.index });
    }
  }

  for (const m of content.matchAll(META_PROP_PATTERN)) {
    const raw = m[1] ?? m[2] ?? m[3];
    if (raw == null) continue;
    for (const frag of raw.split(/\$\{[^}]*\}/)) {
      const trimmed = frag.trim();
      if (trimmed) out.push({ text: trimmed, offset: m.index });
    }
  }

  for (const m of content.matchAll(TEXT_CHILD_PATTERN)) {
    const trimmed = m[1].replace(/\s+/g, " ").trim();
    if (!trimmed) continue;
    if (!/[a-zA-Z]/.test(trimmed)) continue;
    if (trimmed.split(" ").filter(Boolean).length < 2) continue;
    out.push({ text: trimmed, offset: m.index + 1 });
  }

  return out;
}

function lineOf(content, offset) {
  let line = 1;
  for (let i = 0; i < offset && i < content.length; i++) {
    if (content[i] === "\n") line++;
  }
  return line;
}

/** Every {file, line, text} problem in one file's content. Pure, no I/O. */
export function scanContent(content, haystack) {
  const problems = [];
  for (const { text, offset } of extractCandidates(content)) {
    if (CHROME_ALLOWLIST.has(text)) continue;
    if (checkString(text, haystack) === null) continue;
    problems.push({ line: lineOf(content, offset), text });
  }
  return problems;
}

function findTsxFiles(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) findTsxFiles(full, out);
    else if (entry.name.endsWith(".tsx")) out.push(full);
  }
  return out;
}

async function main() {
  const haystack = buildHaystack(SOURCES.map((p) => readFileSync(p, "utf8")));

  if (process.argv.includes("--self-test")) return selfTest(haystack);

  const files = SCAN_DIRS.flatMap((dir) => findTsxFiles(dir)).sort();
  let failures = 0;
  for (const file of files) {
    const content = readFileSync(file, "utf8");
    const problems = scanContent(content, haystack);
    for (const { line, text } of problems) {
      console.error(`FAIL ${file}:${line}: not found in the client document`);
      console.error(`      "${text}"`);
      failures++;
    }
  }
  console.log(
    failures
      ? `\n${failures} JSX COPY FAILURE(S) across ${files.length} file(s)`
      : `\nAll JSX copy verbatim (${files.length} file(s) scanned)`
  );
  process.exit(failures ? 1 : 0);
}

function selfTest(haystack) {
  const cases = [
    [
      "accepts a genuine prop value",
      '<Section title="PEMF for Health and Wellness" />',
      true,
    ],
    [
      "rejects a planted invented prop value",
      '<Figure caption="This PEMF mat cures every ailment instantly." />',
      false,
    ],
    [
      "accepts a genuine JSX text child",
      "<p>Try adding a holistic approach by laying on the PEMF body mat.</p>",
      true,
    ],
    [
      "rejects a planted invented JSX text child",
      "<p>This device eliminates chronic pain in six weeks, guaranteed.</p>",
      false,
    ],
    [
      "allowlists a short chrome label",
      '<Link href="/pemf">What is PEMF?</Link>',
      true,
    ],
    [
      "rejects an interpolated template's static fragment when it adds words the document never had",
      "<Section intro={`Try adding a holistic approach by laying on the PEMF body mat across ${site.areaServed}.`} />",
      false, // the static fragment includes "...mat across ", which is not a verbatim substring
    ],
    [
      "skips a text child mixed with an expression (known limitation, see header)",
      "<a>Call or Text · {site.phone}</a>",
      true, // extractor finds nothing checkable here, so it passes -- not because it's verified
    ],
    [
      "exempts a fabricated claim in an <iframe> title (accessibility label, not client copy)",
      '<iframe title="This PEMF mat cures every ailment instantly." src="https://maps.example/embed" />',
      true,
    ],
    [
      "still rejects that exact fabricated claim in a non-iframe title prop -- proves the exemption is narrow",
      '<Section title="This PEMF mat cures every ailment instantly." />',
      false,
    ],
    [
      "rejects an invented claim in a page's metadata title",
      'export const metadata = pageMetadata({ title: "Clinically Proven PEMF Systems That Cure Chronic Pain", path: "/products" });',
      false,
    ],
    [
      "rejects an invented claim in a page's metadata description",
      'export const metadata = pageMetadata({ title: "Products", description: "This device eliminates chronic pain in six weeks, guaranteed.", path: "/products" });',
      false,
    ],
    [
      "rejects an invented claim spread across a multi-line metadata description",
      'export const metadata = pageMetadata({\n  title: "Energy",\n  description:\n    "PEMF cures chronic pain in six weeks",\n  path: "/energy",\n});',
      false,
    ],
    [
      "accepts a verbatim metadata description",
      'export const metadata = pageMetadata({ title: "Holistic Health", description: "PEMF is a holistic approach to promote a state of total wellness.", path: "/holistic-health" });',
      true,
    ],
    [
      "does not misread a TypeScript property declaration as metadata copy",
      "type Props = {\n  title: string;\n  description: string;\n};",
      true, // no quoted literal, so there is nothing to check -- not an exemption
    ],
    [
      "does not misread a reference into already-checked lib/content as metadata copy",
      "export const metadata = pageMetadata({ title: intro.title, description: intro.body, path: '/pemf' });",
      true, // lib/content values are verify-copy.mjs's job, and it does check them
    ],
    [
      "does not misread an arrow function's `=>` as the start of a JSX text child (regression test, see TEXT_CHILD_PATTERN comment)",
      "{items.map((entry) =>\n  // a comment between the arrow and the element it returns\n  entry.ok ? (\n    <Link>PEMF for Health and Wellness</Link>\n  ) : null\n)}",
      true, // without the (?<!=) lookbehind this reports the arrow/comment/ternary span itself as invented copy
    ],
  ];
  let failures = 0;
  for (const [name, input, shouldPass] of cases) {
    const problems = scanContent(input, haystack);
    const passed = problems.length === 0;
    if (passed === shouldPass) console.log(`  ok   ${name}`);
    else {
      console.error(
        `  FAIL ${name}: expected ${shouldPass ? "accept" : "reject"}, got ${
          passed ? "accept" : "reject"
        }`
      );
      if (problems.length) console.error(`        ${JSON.stringify(problems)}`);
      failures++;
    }
  }
  console.log(failures ? `\n${failures} SELF-TEST FAILURE(S)` : "\nSelf-test passed");
  process.exit(failures ? 1 : 0);
}

// Only run the CLI when this file is the entry point -- importing the
// exports above must not trigger a full run and a process.exit() as a
// side effect.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
