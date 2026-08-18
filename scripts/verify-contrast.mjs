// Fails the build if any text/background pair drops below WCAG AAA (7:1), or if
// a decorative-only token is used for text. The audience is elderly; AAA is the
// requirement, not an aspiration.
import { readFileSync } from "node:fs";

const AAA = 7;

// Pairs that must hold. [foreground token, background token]
const TEXT_PAIRS = [
  ["--ink", "--cream"],
  ["--ink", "--sand"],
  ["--ink-soft", "--cream"],
  ["--ink-soft", "--sand"],
  ["--sage", "--cream"],
  ["--sage", "--sand"],
  ["--clay", "--cream"],
  ["--clay", "--sand"],
  ["--white", "--sage"],
  ["--white", "--clay"],
];

// Never legal as a text colour or as a fill behind text.
const DECORATIVE_ONLY = ["--sage-soft", "--clay-soft", "--rule"];

export function luminance(hex) {
  const h = hex.replace("#", "");
  const rgb = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const lin = rgb.map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

export function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export function parseTokens(css) {
  const tokens = {};
  for (const m of css.matchAll(/(--[a-z-]+):\s*(#[0-9a-fA-F]{6})/g)) tokens[m[1]] = m[2];
  return tokens;
}

/** Find decorative tokens used in a colour-bearing declaration. */
export function findDecorativeMisuse(css) {
  const bad = [];
  for (const token of DECORATIVE_ONLY) {
    const re = new RegExp(`(^|[^-])color:\\s*var\\(${token}\\)`, "gm");
    if (re.test(css)) bad.push(`${token} used as a text colour`);
  }
  return bad;
}

function main() {
  const css = readFileSync("app/globals.css", "utf8");

  if (process.argv.includes("--self-test")) return selfTest();

  const tokens = parseTokens(css);
  let failures = 0;
  for (const [fg, bg] of TEXT_PAIRS) {
    if (!tokens[fg] || !tokens[bg]) {
      console.error(`  FAIL missing token ${!tokens[fg] ? fg : bg}`);
      failures++;
      continue;
    }
    const r = ratio(tokens[fg], tokens[bg]);
    if (r >= AAA) console.log(`  ok   ${fg} on ${bg} = ${r.toFixed(2)}:1`);
    else {
      console.error(`  FAIL ${fg} on ${bg} = ${r.toFixed(2)}:1, need ${AAA}:1`);
      failures++;
    }
  }
  for (const problem of findDecorativeMisuse(css)) {
    console.error(`  FAIL ${problem}`);
    failures++;
  }
  console.log(failures ? `\n${failures} CONTRAST FAILURE(S)` : "\nAll pairs AAA");
  process.exit(failures ? 1 : 0);
}

function selfTest() {
  const cases = [
    ["black on white is 21:1", ratio("#000000", "#FFFFFF") > 20.9, true],
    ["ink on cream is AAA", ratio("#2A2E27", "#FAF6EF") >= 7, true],
    ["clay on cream is AAA", ratio("#7E3F20", "#FAF6EF") >= 7, true],
    ["old clay-soft on cream fails", ratio("#C9784F", "#FAF6EF") >= 7, false],
    ["old sage-soft on cream fails", ratio("#6E8F70", "#FAF6EF") >= 7, false],
    [
      "decorative misuse is caught",
      findDecorativeMisuse("a { color: var(--clay-soft); }").length === 1,
      true,
    ],
  ];
  let failures = 0;
  for (const [name, actual, expected] of cases) {
    if (actual === expected) console.log(`  ok   ${name}`);
    else {
      console.error(`  FAIL ${name}`);
      failures++;
    }
  }
  console.log(failures ? `\n${failures} SELF-TEST FAILURE(S)` : "\nSelf-test passed");
  process.exit(failures ? 1 : 0);
}

main();
