// Fails the build if any text/background pair drops below WCAG AAA (7:1), or if
// a decorative-only token is used for text. The audience is elderly; AAA is the
// requirement, not an aspiration.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

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
  // --blush and --mist were section grounds from 2026-08-28 until the Clinic
  // palette shipped on 2026-08-31 and cut the site to two grounds. Their pairs
  // are removed with them; --cream and --sand above are now the only grounds a
  // band can take, and --white below is the plate inside one.
  ["--white", "--sage"],
  ["--white", "--clay"],
  // --sage on --white: the term in every TriPanel `items` definition list
  // (components/TriPanel.tsx), which sits inside a u-plate and so lands on
  // --white rather than on a band ground. Added 2026-08-31 when the term moved
  // from --ink to --sage for emphasis. --white is the lightest ground on the
  // site, so this is the widest of the --sage pairs, but registering it is
  // what stops a future darkening of --white (or a theme that redefines it)
  // from quietly dropping these terms below AAA.
  ["--sage", "--white"],
  // --tc-1 on --white: the definition-list term and its accent bar
  // (components/TriPanel.tsx) went red on 2026-08-31 and sit inside a u-plate,
  // so this stop is now a text colour on the plate ground as well as a
  // wordmark stop. 8.71:1.
  ["--tc-1", "--white"],
  // Technicolor wordmark stops. The gradient only ever fills text on --cream,
  // so each stop is held to the text floor against cream alone.
  ["--tc-1", "--cream"],
  ["--tc-2", "--cream"],
  ["--tc-3", "--cream"],
  ["--tc-4", "--cream"],
  ["--tc-5", "--cream"],
  ["--tc-6", "--cream"],
  ["--tc-7", "--cream"],
  // Four of those stops are also the PEMF wordmark's letter colours
  // (components/PemfWord.tsx), and since 2026-08-30 that treatment is on
  // every heading opening with the word, not just the home hero. A heading
  // sits on any of the four grounds, so all four pairs are held for each --
  // the same treatment --sage and --clay get above. This is what caught
  // --tc-1 at 6.52:1 and --tc-4 at 6.69:1 on sand when the change was made.
  ["--tc-7", "--sand"],
  ["--tc-4", "--sand"],
  ["--tc-1", "--sand"],
  ["--tc-6", "--sand"],
  // The one full-colour section band and the only text colour allowed on it.
  ["--band-ink", "--band"],
  // Buttons. --button is both a text colour (the outline variant's border and
  // label, on --cream and on --sand) and a fill behind white text (the solid
  // variant), so all three directions are held to the floor. Registered here
  // rather than trusted: --button on --sand measures 7.01:1, one hundredth
  // above the floor, so any future nudge to either token must fail loudly.
  ["--button", "--cream"],
  ["--button", "--sand"],
  ["--button-ink", "--button"],
  ["--button-ink", "--button-hover"],
  // The inverse button on a --band surface: white fill, --button label.
  ["--button", "--white"],
];

// Never legal as a text colour or as a fill behind text.
const DECORATIVE_ONLY = ["--sage-soft", "--clay-soft", "--rule"];

// Decorative tokens in Tailwind class names (without the text- or bg- prefix)
const DECORATIVE_TAILWIND = ["sage-soft", "clay-soft", "rule"];

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
  // Digits are part of a token name here (--tc-1 ... --tc-7), so the character
  // class has to admit them or the numbered stops parse as missing.
  for (const m of css.matchAll(/(--[a-z0-9-]+):\s*(#[0-9a-fA-F]{6})/g)) tokens[m[1]] = m[2];
  return tokens;
}

/** `--band: var(--sage)` style aliases, resolved to the hex they point at.
 *  The emphasis tokens are declared this way so a theme that is happy with the
 *  default relationship does not have to restate a colour it already owns. */
export function resolveAliases(css, tokens) {
  const out = { ...tokens };
  const aliases = {};
  for (const m of css.matchAll(/(--[a-z0-9-]+):\s*var\((--[a-z0-9-]+)\)/g)) aliases[m[1]] = m[2];
  // Chains are at most two deep today (--band -> --sage -> hex). Looping to a
  // fixed point rather than assuming that depth means a longer chain added
  // later still resolves instead of silently reading as a missing token.
  for (let pass = 0; pass < 8; pass++) {
    let changed = false;
    for (const [name, target] of Object.entries(aliases)) {
      if (out[name] === undefined && out[target] !== undefined) {
        out[name] = out[target];
        changed = true;
      }
    }
    if (!changed) break;
  }
  return out;
}

/** Every palette in the stylesheet: the default under the key "" plus one
 *  entry per `:root[data-theme="..."]` block.
 *
 *  A theme block only restates the tokens it changes, so each is merged over
 *  the default before checking -- otherwise a theme that inherits --ink would
 *  report it as a missing token rather than checking the colour it actually
 *  renders. The selector must be exactly `:root[data-theme="x"] {`, which is
 *  what keeps the per-band `:root[data-theme="spectrum"] main > *:nth-child()`
 *  rules from being mistaken for palettes. */
export function parsePalettes(css) {
  const rootBlock = css.match(/:root\s*\{([^}]*)\}/);
  // Raw, deliberately: merge the literal hexes first and resolve aliases only
  // once a theme's own values are in place. Resolving the default palette
  // first and merging that would freeze `--band: var(--sage)` to the DEFAULT
  // sage, so every theme would be checked against a band colour it never
  // renders -- and would pass while shipping an unchecked one.
  const baseRaw = parseTokens(rootBlock ? rootBlock[1] : "");
  const palettes = { "": resolveAliases(css, baseRaw) };
  for (const m of css.matchAll(/:root\[data-theme="([a-z-]+)"\]\s*\{([^}]*)\}/g)) {
    palettes[m[1]] = resolveAliases(css, { ...baseRaw, ...parseTokens(m[2]) });
  }
  return palettes;
}

/** Find decorative tokens used in a colour-bearing declaration in CSS. */
export function findDecorativeMisuse(css) {
  const bad = [];

  // Check for decorative tokens as text color
  for (const token of DECORATIVE_ONLY) {
    const re = new RegExp(`(^|[^-])color:\\s*var\\(${token}\\)`, "gm");
    if (re.test(css)) bad.push(`${token} used as a text colour`);
  }

  // Check for decorative tokens as background when also used for text
  // Pattern: a rule that has both background: var(decorative) and color:
  for (const token of DECORATIVE_ONLY) {
    // Match rules that contain both background/background-color and color declarations
    const bgColorRe = new RegExp(
      `\\{[^}]*(?:background(?:-color)?:\\s*var\\(${token}\\)[^}]*color:|color:[^}]*background(?:-color)?:\\s*var\\(${token}\\))[^}]*\\}`,
      "gm"
    );
    if (bgColorRe.test(css)) bad.push(`${token} used as background for text`);
  }

  return bad;
}

/** Check a Tailwind className string for decorative token misuse. */
export function checkTailwindClassName(className) {
  const problems = [];

  // Check for decorative tokens used as text color
  for (const token of DECORATIVE_TAILWIND) {
    if (className.includes(`text-${token}`)) {
      problems.push(`text-${token} not allowed`);
    }
  }

  // Check for decorative tokens as background WITH text in same className
  for (const token of DECORATIVE_TAILWIND) {
    if (className.includes(`bg-${token}`)) {
      // Check if there's any text- utility in the same className
      if (/\btext-[a-z0-9-]+/.test(className)) {
        problems.push(`bg-${token} used with text utility`);
      }
    }
  }

  return problems;
}

/** Recursively walk directories, collecting TSX file paths. */
function collectTsxFiles(dir) {
  const files = [];
  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      if (entry === "node_modules" || entry === ".next") continue;
      const path = join(dir, entry);
      const stat = statSync(path);
      if (stat.isDirectory()) {
        files.push(...collectTsxFiles(path));
      } else if (entry.endsWith(".tsx")) {
        files.push(path);
      }
    }
  } catch {
    // Directory doesn't exist, skip
  }
  return files;
}

/** Find decorative token misuse in Tailwind classes within TSX files. */
export function findDecorativeMisuseTailwind() {
  const bad = [];
  const files = [];

  // Collect all TSX files from components and app directories
  files.push(...collectTsxFiles("components"));
  files.push(...collectTsxFiles("app"));

  for (const file of files) {
    try {
      const content = readFileSync(file, "utf8");

      // Find all className attributes (handles single quotes, double quotes, and backticks)
      const classNameMatches = content.matchAll(/className=["'`]([^"'`]+)["'`]/g);
      for (const match of classNameMatches) {
        const className = match[1];
        const problems = checkTailwindClassName(className);
        for (const problem of problems) {
          bad.push(`${file}: ${problem}`);
        }
      }
    } catch {
      // Skip files that can't be read
    }
  }

  return bad;
}

function main() {
  const css = readFileSync("app/globals.css", "utf8");

  if (process.argv.includes("--self-test")) return selfTest();

  const palettes = parsePalettes(css);
  let failures = 0;
  // Every palette, not just the default. A theme that ships an unchecked
  // palette is a theme that quietly voids the AAA claim on nine of ten pages.
  for (const [name, tokens] of Object.entries(palettes)) {
    const label = name || "default";
    let themeFailures = 0;
    for (const [fg, bg] of TEXT_PAIRS) {
      if (!tokens[fg] || !tokens[bg]) {
        console.error(`  FAIL [${label}] missing token ${!tokens[fg] ? fg : bg}`);
        themeFailures++;
        continue;
      }
      const r = ratio(tokens[fg], tokens[bg]);
      if (r < AAA) {
        console.error(`  FAIL [${label}] ${fg} on ${bg} = ${r.toFixed(2)}:1, need ${AAA}:1`);
        themeFailures++;
      }
    }
    if (themeFailures === 0) {
      console.log(`  ok   ${label.padEnd(9)} ${TEXT_PAIRS.length} pairs AAA`);
    }
    failures += themeFailures;
  }
  for (const problem of findDecorativeMisuse(css)) {
    console.error(`  FAIL ${problem}`);
    failures++;
  }
  for (const problem of findDecorativeMisuseTailwind()) {
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
    ["clay on cream is AAA", ratio("#763A1D", "#FAF6EF") >= 7, true],
    ["old clay-soft on cream fails", ratio("#C9784F", "#FAF6EF") >= 7, false],
    ["old sage-soft on cream fails", ratio("#6E8F70", "#FAF6EF") >= 7, false],
    [
      "decorative misuse in CSS color is caught",
      findDecorativeMisuse("a { color: var(--clay-soft); }").length === 1,
      true,
    ],
    [
      "decorative token as text color in Tailwind is caught",
      checkTailwindClassName("px-4 text-clay-soft font-bold").length > 0,
      true,
    ],
    [
      "decorative bg with text utility in Tailwind is caught",
      checkTailwindClassName("bg-clay-soft text-ink px-4").length > 0,
      true,
    ],
    [
      "decorative bg alone in Tailwind is allowed",
      checkTailwindClassName("bg-clay-soft px-4 py-2").length === 0,
      true,
    ],
    [
      "non-decorative properties are not false-positives",
      findDecorativeMisuse("a { border-color: var(--rule); }").length === 0,
      true,
    ],
    // --- theme parsing -----------------------------------------------------
    [
      "every theme block is found as its own palette",
      Object.keys(
        parsePalettes(`:root{--sage:#2F4A37;}:root[data-theme="ocean"]{--sage:#0E4A5A;}`)
      ).join(",") === ",ocean",
      true,
    ],
    [
      "a theme inherits tokens it does not restate",
      parsePalettes(`:root{--ink:#2A2E27;--sage:#2F4A37;}:root[data-theme="ocean"]{--sage:#0E4A5A;}`)
        .ocean["--ink"] === "#2A2E27",
      true,
    ],
    // The regression that made this checker worth rewriting: --band is an
    // alias for --sage, so a theme that restates --sage must get a --band to
    // match. Resolving the default palette before merging returned #2F4A37
    // here -- a colour that theme never paints -- and passed.
    [
      "an inherited alias re-resolves against the theme's own value",
      parsePalettes(
        `:root{--sage:#2F4A37;--band:var(--sage);}:root[data-theme="ocean"]{--sage:#0E4A5A;}`
      ).ocean["--band"] === "#0E4A5A",
      true,
    ],
    [
      "a theme's own value wins over the alias",
      parsePalettes(
        `:root{--sage:#2F4A37;--band:var(--sage);}:root[data-theme="x"]{--band:#111111;}`
      ).x["--band"] === "#111111",
      true,
    ],
    // Guards the selector shape: Spectrum's per-band rotation rules start with
    // the same :root[data-theme="..."] prefix and must not read as palettes.
    [
      "a scoped rule under a theme is not mistaken for a palette",
      Object.keys(
        parsePalettes(
          `:root{--sage:#2F4A37;}:root[data-theme="spectrum"] main > *:nth-child(1){--band:var(--tc-1);}`
        )
      ).join(",") === "",
      true,
    ],
    [
      "a theme below the floor is caught",
      ratio(
        parsePalettes(`:root{--cream:#FAF6EF;}:root[data-theme="bad"]{--clay:#C9784F;}`).bad[
          "--clay"
        ],
        "#FAF6EF"
      ) >= 7,
      false,
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

// Run only when executed directly. verify-themes.mjs imports parsePalettes
// from here; without this guard that import would run the whole contrast check
// and process.exit() as a side effect, so verify-themes could never report.
// Same guard, same reason, as the tail of verify-copy.mjs.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
