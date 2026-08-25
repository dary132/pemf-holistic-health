// Fails the build if the theme picker and the stylesheet disagree.
//
//   npm run verify:themes                 check lib/themes.ts against globals.css
//   npm run verify:themes -- --self-test  prove the checker rejects a drifted swatch
//
// Two ways /themes can lie to the client, both silent and both caught here:
//
//   1. A theme listed in lib/themes.ts with no matching :root[data-theme] block
//      in app/globals.css. The card renders, the radio checks, and absolutely
//      nothing changes -- the worst possible outcome for a review tool,
//      because it reads as "this option looks identical to the current one".
//
//   2. A swatch hex that no longer matches the palette it claims to preview.
//      The picker paints swatches from literal hexes rather than the live
//      custom properties, because a swatch has to show a theme the page is not
//      currently wearing. That duplication is deliberate; this check is the
//      price of it.
//
// The reverse direction is not an error: a :root[data-theme] block with no
// entry in lib/themes.ts is a palette drafted but not yet offered.
import { readFileSync } from "node:fs";
import { parsePalettes } from "./verify-contrast.mjs";

// Which token each swatch position previews. Mirrors the `swatch` tuple's
// documented order in lib/themes.ts: [ground, primary, accent].
const SWATCH_TOKENS = ["--cream", "--sage", "--clay"];

/** Read the themes array out of lib/themes.ts without a TS loader.
 *  Same regex-over-source approach the other verify scripts take -- no parser
 *  dependency, per project convention. */
export function parseThemeEntries(source) {
  const entries = [];
  for (const m of source.matchAll(
    /\{\s*id:\s*"([a-z-]*)",[\s\S]*?swatch:\s*\[([^\]]+)\]/g
  )) {
    const swatch = [...m[2].matchAll(/#[0-9A-Fa-f]{6}/g)].map((s) => s[0].toUpperCase());
    entries.push({ id: m[1], swatch });
  }
  return entries;
}

/** Returns an array of problem strings; empty means picker and stylesheet agree. */
export function checkThemes(entries, palettes) {
  const problems = [];
  for (const { id, swatch } of entries) {
    const label = id || "default";
    const palette = palettes[id];
    if (!palette) {
      problems.push(`${label}: listed in lib/themes.ts but no :root[data-theme="${id}"] in globals.css`);
      continue;
    }
    if (swatch.length !== SWATCH_TOKENS.length) {
      problems.push(`${label}: ${swatch.length} swatch colours, expected ${SWATCH_TOKENS.length}`);
      continue;
    }
    SWATCH_TOKENS.forEach((token, i) => {
      const actual = (palette[token] || "").toUpperCase();
      if (actual !== swatch[i]) {
        problems.push(`${label}: swatch ${i + 1} is ${swatch[i]}, but ${token} is ${actual || "missing"}`);
      }
    });
  }
  return problems;
}

function main() {
  if (process.argv.includes("--self-test")) return selfTest();

  const entries = parseThemeEntries(readFileSync("lib/themes.ts", "utf8"));
  const palettes = parsePalettes(readFileSync("app/globals.css", "utf8"));

  if (entries.length === 0) {
    console.error("  FAIL no themes parsed out of lib/themes.ts");
    process.exit(1);
  }

  const problems = checkThemes(entries, palettes);
  for (const p of problems) console.error(`  FAIL ${p}`);
  for (const { id } of entries) {
    if (!problems.some((p) => p.startsWith(`${id || "default"}:`))) {
      console.log(`  ok   ${(id || "default").padEnd(9)} swatches match globals.css`);
    }
  }
  console.log(problems.length ? `\n${problems.length} THEME FAILURE(S)` : "\nPicker and stylesheet agree");
  process.exit(problems.length ? 1 : 0);
}

function selfTest() {
  const palettes = {
    "": { "--cream": "#FAF6EF", "--sage": "#2F4A37", "--clay": "#763A1D" },
    ocean: { "--cream": "#F7FAFC", "--sage": "#0E4A5A", "--clay": "#8C2412" },
  };
  const good = [{ id: "", swatch: ["#FAF6EF", "#2F4A37", "#763A1D"] }];
  const drifted = [{ id: "ocean", swatch: ["#F7FAFC", "#0E4A5A", "#AE2E1E"] }];
  const missing = [{ id: "sunrise", swatch: ["#FDF7F0", "#4A1F3D", "#832E0E"] }];
  const short = [{ id: "ocean", swatch: ["#F7FAFC", "#0E4A5A"] }];

  const cases = [
    ["matching swatches pass", checkThemes(good, palettes).length === 0, true],
    ["a drifted swatch is caught", checkThemes(drifted, palettes).length === 1, true],
    ["a theme with no CSS block is caught", checkThemes(missing, palettes).length === 1, true],
    ["a short swatch tuple is caught", checkThemes(short, palettes).length === 1, true],
    [
      "the real themes file parses",
      parseThemeEntries(readFileSync("lib/themes.ts", "utf8")).length >= 4,
      true,
    ],
    [
      "parsing keeps the default theme's empty id",
      parseThemeEntries(readFileSync("lib/themes.ts", "utf8"))[0].id === "",
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
