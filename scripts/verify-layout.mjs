// Fails the build if any route's heading outline is invalid: a page must have
// exactly one h1, must start at h1, and must never skip a level going down
// (h1 -> h3). Screen-reader users navigate by heading; a skipped level reads
// as a missing section.
//
//   npm run verify:layout                 check every route against a dev server
//   npm run verify:layout -- --self-test  prove the checker rejects bad outlines
//
// Requires `npm run dev` to be running, same as verify-site.mjs.
import { routes } from "../lib/routes.ts";

// Comp routes are deliberately absent from lib/routes.ts -- they are review
// tooling, not pages of the client's site, so they must stay out of the nav
// and the sitemap. That also put them outside this guard's reach, which is
// the gap this list closes: a comp with two <h1>s is exactly the error these
// compositions invite and exactly what a client reviewing a layout will not
// notice. Each comp task appends its own route here as it is built; deleting
// a losing direction means deleting its line.
export const COMP_ROUTES = ["/designs", "/designs/editorial"];

const BASE = process.env.BASE_URL || "http://localhost:3000";

/** Heading levels in document order, script payloads removed.
 *  Next inlines an RSC payload into <script> tags that can contain escaped
 *  markup; scanning it would report headings that never render. */
export function headingLevels(html) {
  const body = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  return [...body.matchAll(/<h([1-6])[\s>]/gi)].map((m) => Number(m[1]));
}

/** Returns an array of problem strings; empty means the outline is valid. */
export function outlineProblems(levels) {
  const problems = [];
  const h1s = levels.filter((l) => l === 1).length;
  if (h1s !== 1) problems.push(`expected exactly one h1, found ${h1s}`);
  if (levels.length && levels[0] !== 1) problems.push(`starts at h${levels[0]}, not h1`);
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) {
      problems.push(`skips h${levels[i - 1]} -> h${levels[i]} at position ${i}`);
    }
  }
  return problems;
}

async function main() {
  if (process.argv.includes("--self-test")) return selfTest();

  let failures = 0;
  for (const route of [...routes, ...COMP_ROUTES.map((path) => ({ path }))]) {
    const res = await fetch(`${BASE}${route.path}`);
    if (!res.ok) {
      console.error(`FAIL ${route.path}: HTTP ${res.status}`);
      failures++;
      continue;
    }
    const levels = headingLevels(await res.text());
    const problems = outlineProblems(levels);
    if (problems.length) {
      for (const p of problems) console.error(`FAIL ${route.path}: ${p}`);
      console.error(`      outline: ${levels.map((l) => "h" + l).join(" ")}`);
      failures += problems.length;
    } else {
      console.log(`  ok   ${route.path.padEnd(18)} ${levels.map((l) => "h" + l).join(" ")}`);
    }
  }
  console.log(failures ? `\n${failures} LAYOUT FAILURE(S)` : "\nAll heading outlines valid");
  process.exit(failures ? 1 : 0);
}

function selfTest() {
  const cases = [
    ["accepts a valid outline", [1, 2, 3, 2, 3], true],
    ["rejects an h1 -> h3 skip", [1, 3], false],
    ["rejects a missing h1", [2, 3], false],
    ["rejects two h1s", [1, 1, 2], false],
    ["accepts jumping back up any distance", [1, 2, 3, 3, 2], true],
    ["ignores headings inside a script payload", headingLevels(
      '<script>{"x":"<h3>fake</h3>"}</script><h1>a</h1><h2>b</h2>'), true],
  ];
  let failures = 0;
  for (const [name, input, shouldPass] of cases) {
    const passed = outlineProblems(input).length === 0;
    if (passed === shouldPass) console.log(`  ok   ${name}`);
    else {
      console.error(`  FAIL ${name}: expected ${shouldPass ? "accept" : "reject"}`);
      failures++;
    }
  }
  console.log(failures ? `\n${failures} SELF-TEST FAILURE(S)` : "\nSelf-test passed");
  process.exit(failures ? 1 : 0);
}

main();
