// Captures every route at three viewports so layout regressions are visible
// rather than merely absent from the test output.
//   npm run dev, then npm run shots
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { routes } from "../lib/routes.ts";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const OUT = ".screenshots";

// Desktop, phone, and desktop at 200% zoom (half the CSS pixels, same layout work).
const VIEWPORTS = [
  { name: "desktop", size: "1440,2400" },
  { name: "phone", size: "390,1800" },
  { name: "zoom200", size: "720,2400" },
];

mkdirSync(OUT, { recursive: true });

for (const route of routes) {
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
console.log(`\n${routes.length * VIEWPORTS.length} screenshots in ${OUT}/`);
