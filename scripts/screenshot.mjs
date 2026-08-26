// Captures every route at three viewports so layout regressions are visible
// rather than merely absent from the test output.
//   npm run dev, then npm run shots
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { routes } from "../lib/routes.ts";
import { COMP_ROUTES } from "./verify-layout.mjs";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const OUT = ".screenshots";

// Desktop, phone, and desktop at 200% zoom (half the CSS pixels, same layout work).
const VIEWPORTS = [
  { name: "desktop", size: "1440,2400" },
  { name: "phone", size: "390,1800" },
  { name: "zoom200", size: "720,2400" },
];

mkdirSync(OUT, { recursive: true });

// The /designs comps are review tooling, not client routes, so they are not
// in lib/routes.ts -- but they are exactly the pages "verify visually" most
// needs to catch, and verify-layout.mjs already carries the route list, so
// reuse it here rather than duplicating it.
const allRoutes = [...routes, ...COMP_ROUTES.map((path) => ({ path }))];

for (const route of allRoutes) {
  const slug = route.path === "/" ? "home" : route.path.replace(/\//g, "");
  for (const vp of VIEWPORTS) {
    const file = `${OUT}/${slug}-${vp.name}.png`;
    execFileSync(
      "google-chrome",
      [
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--hide-scrollbars",
        `--window-size=${vp.size}`,
        `--screenshot=${file}`,
        `${BASE}${route.path}`,
      ],
      { stdio: "ignore" }
    );
    console.log(`  ${file}`);
  }
}
console.log(`\n${allRoutes.length * VIEWPORTS.length} screenshots in ${OUT}/`);
