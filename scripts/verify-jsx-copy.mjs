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

// DENY-list, deliberately not an allow-list -- the same inversion, and for the
// same reason, that verify-copy.mjs already applies to lib/site.ts keys.
//
// This used to be `COPY_PROPS`, an allow-list of seven names. That shape is
// what let PullQuote's `text` prop go unread while this script printed "All
// JSX copy verbatim": `text` was not on the list, so the string was never
// inspected, and the green run read as coverage. Adding `text` closed that
// one instance and left the shape intact -- whatever prop nobody remembers to
// add next is unchecked in exactly the same way.
//
// Now every JSX attribute value is copy unless it is named here, so a new
// prop is checked from the moment it exists and skipping it takes a
// deliberate edit to this list. The cost is that this list must carry every
// genuinely non-prose attribute the codebase uses; the benefit is that
// forgetting to update it fails loudly instead of silently passing.
const NON_COPY_PROPS = new Set([
  // Structural / identity.
  "className", "class", "id", "key", "ref", "slot", "htmlFor", "role",
  // Targets and resources -- URLs and file paths, never sentences.
  "href", "src", "srcSet", "action", "formAction", "target", "rel",
  "referrerPolicy", "xmlns",
  // Media and layout geometry.
  "width", "height", "sizes", "style", "loading", "decoding", "priority",
  "unoptimized", "fill", "quality", "placeholder", "blurDataURL",
  // `alt` is an accessibility label, exempted everywhere in this project on
  // the same reasoning as an <iframe> title (see IFRAME_TAG_PATTERN below).
  "alt",
  // Form and interaction state.
  "type", "name", "value", "checked", "disabled", "hidden", "tabIndex",
  "placeholder", "autoComplete", "inputMode", "lang", "dir",
  "suppressHydrationWarning", "dangerouslySetInnerHTML",
  // This project's own layout/config props. Their values are enum tokens the
  // components switch on ("h2", "tight", "solid", "contain"), not prose --
  // holding them to the client document would be the check misfiring. Each is
  // a deliberate entry: a NEW config prop will fail until it is added here,
  // which is the deny-list working, not a defect.
  "titleAs", "panelTitleAs", "rhythm", "variant", "reverse", "tone",
  "frame", "imageFit", "imageAspect", "aspect", "theme", "n", "range",
  // The same-length mask maskIframeTitleAttr() leaves behind (see below). It
  // is never a real attribute name, so naming it here costs no coverage.
  "xxxxx",
]);

/** True when a JSX attribute's value should be held to the client document.
 *  Deny-listed names, `aria-*`/`data-*` and event handlers are excluded; every
 *  other attribute is copy until someone says otherwise. */
function isCopyProp(name) {
  if (NON_COPY_PROPS.has(name)) return false;
  if (/^(?:aria|data)-/.test(name)) return false;
  if (/^on[A-Z]/.test(name)) return false;
  return true;
}

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
  // The maps button in components/CTA.tsx. A navigation label, not a claim:
  // it states nothing about PEMF, the practice or health, and the address it
  // routes to is checked as copy via `site.address`.
  "Get Directions",
  // app/layout.tsx's browser-tab title wrapper, `title: { default, template }`.
  // What is left of each after its ${site.name} interpolation is cut out: the
  // location suffix on the default title, and the "%s" placeholder Next fills
  // with the page's own (checked) title. Both are title chrome around copy
  // that is verified elsewhere, and neither states anything about PEMF.
  "| Lake Forest, CA",
  "%s |",
]);

// One attribute inside a JSX opening tag. Only quoted/backticked literals
// match, so `title={intro.title}` (a reference into already-checked
// lib/content) and `width={721}` are skipped rather than misread as prose.
const ATTR_PATTERN =
  /\b([A-Za-z_][\w:.-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|\{\s*"([^"]*)"\s*\}|\{\s*'([^']*)'\s*\}|\{\s*`([^`]*)`\s*\})/g;

/** Every JSX opening tag in `content`, as {text, offset}.
 *
 *  Attributes are matched only INSIDE these spans. Scanning the whole file for
 *  `name="value"` instead -- the obvious way to write a deny-list -- also
 *  matches every ordinary TypeScript assignment, so `const base = "inline-flex
 *  min-h-[56px] items-center"` in PhoneButton.tsx would be checked as client
 *  copy and fail. Tag scoping is what makes the inversion safe.
 *
 *  Quote state and brace depth are tracked so an attribute value containing
 *  `>` (`className="a > b"`) or a nested element (`icon={<Chevron />}`) does
 *  not end the tag early. Closing tags are skipped -- they carry no
 *  attributes. */
function findJsxTags(content) {
  const tags = [];
  for (let i = 0; i < content.length; i++) {
    if (content[i] !== "<") continue;
    if (!/[A-Za-z]/.test(content[i + 1] || "")) continue; // `</x`, `<!--`, `a < b`
    let depth = 0;
    let quote = null;
    for (let j = i + 1; j < content.length; j++) {
      const c = content[j];
      if (quote) {
        if (c === "\\") j++;
        else if (c === quote) quote = null;
        continue;
      }
      if (c === '"' || c === "'" || c === "`") quote = c;
      else if (c === "{") depth++;
      else if (c === "}") depth--;
      else if (c === "<" && depth === 0) break; // unterminated; not a tag
      else if (c === ">" && depth === 0) {
        tags.push({ text: content.slice(i, j + 1), offset: i });
        i = j;
        break;
      }
    }
  }
  return tags;
}

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

/** Blank out the whole `title="..."` attribute inside every <iframe ...> tag,
 *  wherever it sits among the tag's other attributes, so it is never
 *  recognised as a copy-bearing attribute there. Every character removed is
 *  replaced with a same-length run of "x", so no other offset or line number
 *  in the file shifts.
 *
 *  Under the old allow-list it was enough to blank just the attribute NAME,
 *  because an unrecognised name was ignored by default. With the deny-list
 *  that is no longer true -- an unrecognised name is now CHECKED -- so the
 *  value has to go too, or masking the name would hand the iframe's
 *  accessibility label straight to the checker. The lookbehind requires
 *  whitespace before `title`, so this cannot blank an unrelated attribute
 *  that merely contains the substring (e.g. a hypothetical `data-title`). */
function maskIframeTitleAttr(content) {
  return content.replace(IFRAME_TAG_PATTERN, (tag) =>
    tag.replace(
      /(?<=\s)title\s*=\s*(?:"[^"]*"|'[^']*'|\{[^}]*\})/g,
      (attr) => "x".repeat(attr.length)
    )
  );
}

/** Replace every comment body with spaces, preserving length and newlines.
 *
 *  Comments are not markup, but the JSX-text and attribute extractors cannot
 *  tell the difference: a bare `>` in a prose comment (a CSS selector, an
 *  arrow drawn in ASCII) opens a text-child match, and a bracketed tag name
 *  inside one reads as a real element. Both bit this project repeatedly, and
 *  both times the mitigation was to reword the comment -- which is why
 *  components/designs/clinical/PlateCard.tsx carries more lines about how to
 *  word a comment than about what the component does. Stripping first fixes
 *  the cause instead.
 *
 *  Offsets are preserved character-for-character so reported line numbers
 *  still point at the real source line. String and template literals are
 *  tracked so a `//` inside a URL ("https://...") is not mistaken for a
 *  comment. Regex literals are NOT tracked -- a `/` outside a string that is
 *  followed by `/` or `*` is treated as a comment opener. These files contain
 *  no regex literals; if one is ever added here, this is the place to look. */
function stripComments(content) {
  let out = "";
  let quote = null;
  for (let i = 0; i < content.length; i++) {
    const c = content[i];
    const next = content[i + 1];
    if (quote) {
      out += c;
      if (c === "\\") { out += next ?? ""; i++; }
      else if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { quote = c; out += c; continue; }
    if (c === "/" && next === "/") {
      while (i < content.length && content[i] !== "\n") { out += " "; i++; }
      out += content[i] === "\n" ? "\n" : "";
      continue;
    }
    if (c === "/" && next === "*") {
      const end = content.indexOf("*/", i + 2);
      const stop = end === -1 ? content.length : end + 2;
      for (; i < stop; i++) out += content[i] === "\n" ? "\n" : " ";
      i--;
      continue;
    }
    out += c;
  }
  return out;
}

/** Every checkable {text, offset} candidate embedded directly in one file's markup. */
export function extractCandidates(content) {
  const out = [];
  content = maskIframeTitleAttr(stripComments(content));

  for (const tag of findJsxTags(content)) {
    for (const m of tag.text.matchAll(ATTR_PATTERN)) {
      if (!isCopyProp(m[1])) continue;
      const raw = m[2] ?? m[3] ?? m[4] ?? m[5] ?? m[6];
      if (raw == null) continue;
      // Cut out ${expression} interpolations; check each static fragment on its own.
      for (const frag of raw.split(/\$\{[^}]*\}/)) {
        const trimmed = frag.trim();
        if (trimmed) out.push({ text: trimmed, offset: tag.offset + m.index });
      }
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

// Internal review tooling, not pages of the client's site. /themes exists so
// the client can compare palettes before picking one; its prose is our
// instructions to them ("Pick a palette below..."), never a quote from the
// document and never a claim about PEMF, so holding it to the document would
// be the check misfiring rather than working. Deliberately a path list and
// not a CHROME_ALLOWLIST entry: the allowlist is for short labels, and
// widening it to admit sentences would blunt it for the whole site.
//
// app/designs/page.tsx is the same case as /themes: it names and describes
// three design directions ("Editorial", "Clinical", ...) which are our
// vocabulary for an internal review, never the client's copy. The three comp
// PAGES are deliberately NOT listed -- they render the document's own words
// and must stay checked, which is most of the point of comping them.
//
// Anything that renders on one of the ten real pages must NOT be added here.
const NOT_SITE_COPY = new Set([
  join("app", "themes", "page.tsx"),
  join("components", "ThemeSwitcher.tsx"),
  join("app", "designs", "page.tsx"),
]);

function findTsxFiles(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) findTsxFiles(full, out);
    else if (entry.name.endsWith(".tsx") && !NOT_SITE_COPY.has(full)) out.push(full);
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
    // The deny-list, exercised as a unit. These are the cases the old
    // allow-list could not have passed: `blurb`, `label` and `summary` were
    // never in COPY_PROPS, so an invented claim in any of them was invisible.
    [
      "checks a prop nobody allow-listed (the deny-list's whole point)",
      '<Card blurb="This PEMF mat cures every ailment instantly." />',
      false,
    ],
    [
      "checks a second unlisted prop -- the point is the default, not the name",
      '<Panel summary="This device eliminates chronic pain in six weeks, guaranteed." />',
      false,
    ],
    [
      "skips a deny-listed structural attribute",
      '<div className="mt-8 flex flex-wrap justify-center gap-4" />',
      true,
    ],
    [
      "skips aria-* and event handlers",
      '<button aria-label="Close the navigation menu" onClick={handleClose} />',
      true,
    ],
    [
      "skips a project config prop whose value is an enum token, not prose",
      '<Section titleAs="h2" rhythm="tight" imageFit="contain" />',
      true,
    ],
    [
      "does not check an ordinary TypeScript assignment as if it were a JSX prop",
      'const base = "inline-flex min-h-[56px] items-center justify-center rounded-full";',
      true, // tag scoping, not luck: a whole-file `name="value"` scan fails here
    ],
    [
      "does not read a bare `>` inside a line comment as a JSX text child",
      "// the plate sits > 700px wide at this breakpoint\nconst x = 1;\n<p>Try adding a holistic approach by laying on the PEMF body mat.</p>",
      true,
    ],
    [
      "does not read a bracketed tag name inside a block comment as markup",
      "/* renders a <Figure> beneath the hero band */\n<p>Try adding a holistic approach by laying on the PEMF body mat.</p>",
      true,
    ],
    [
      "does not mistake a URL's // for a comment opener",
      '<a href="https://maps.example/embed">Get Directions</a>',
      true,
    ],
    [
      "still rejects invented copy that sits after a stripped comment",
      "/* a harmless note */\n<p>This device eliminates chronic pain in six weeks, guaranteed.</p>",
      false,
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
