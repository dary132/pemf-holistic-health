// Fails the build if any client-facing text written straight into JSX in
// app/**/*.tsx deviates from the client's document. This closes a gap in
// verify-copy.mjs: that script only ever sees strings inside lib/content/
// module exports, so a caption, heading or paragraph typed directly into a
// page component (never passed through lib/content/) is invisible to it.
// The client cites FDA exposure: copy must be exact, wherever it lives.
//
//   npm run verify:jsx                 scan app/**/*.tsx for invented copy
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

const APP_DIR = "app";

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
]);

const PROP_PATTERN = new RegExp(
  `\\b(?:${COPY_PROPS.join("|")})\\s*=\\s*(?:"([^"]*)"|'([^']*)'|\\{\\s*"([^"]*)"\\s*\\}|\\{\\s*'([^']*)'\\s*\\}|\\{\\s*\`([^\`]*)\`\\s*\\})`,
  "g"
);

// Text between a `>` and the next `<`. Excluding `{` and `}` from the
// character class is what makes a text node containing `{expression}`
// fail to match at all -- see the header note on mixed children.
const TEXT_CHILD_PATTERN = />([^<>{}]*)</g;

/** Every checkable {text, offset} candidate embedded directly in one file's markup. */
export function extractCandidates(content) {
  const out = [];

  for (const m of content.matchAll(PROP_PATTERN)) {
    const raw = m[1] ?? m[2] ?? m[3] ?? m[4] ?? m[5];
    if (raw == null) continue;
    // Cut out ${expression} interpolations; check each static fragment on its own.
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

  const files = findTsxFiles(APP_DIR).sort();
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
