// Crawls a running dev server and enforces the SEO checks from
// docs/superpowers/specs/2026-08-17-multipage-seo-design.md
// Usage: npm run dev, then npm run verify
import { routes } from "../lib/routes.ts";

const BASE = process.env.BASE_URL || "http://localhost:3000";

// This ROUTES array is hand-maintained here, separate from lib/routes.ts,
// because it carries two things the nav/sitemap source has no use for:
// `jsonLd`, the structured-data types each route must emit, and
// `mustContain`, a verbatim phrase from the client document that proves the
// page's real content has landed. Each page task adds its own before
// building it. Because the two lists are independent, a route added to one
// and not the other would silently go unchecked — the length assertion
// just below closes that gap.
const ROUTES = [
  {
    path: "/",
    jsonLd: ["LocalBusiness", "WebSite"],
    mustContain: [
      "Try adding a holistic approach by laying on the PEMF body mat.",
      "A holistic approach recognizes that your physical, mental, emotional, and spiritual well-being are deeply intertwined.",
    ],
  },
  {
    path: "/pemf",
    jsonLd: ["BreadcrumbList"],
    mustContain: [
      "Air, food, water, sunshine and Earth's Magnetic Field Energy are natural essentials for human health.",
      "Magnetic field is an essential environmental factor for human existence.",
    ],
  },
  {
    path: "/holistic-health",
    jsonLd: ["BreadcrumbList"],
    mustContain: [
      "Holistic health is a wellness approach that considers a person's physical, intellectual, mental, emotional, social, and spiritual well-being, recognizing these interconnected aspects as essential for optimal health and balance.",
    ],
  },
  {
    path: "/mental-health",
    jsonLd: ["BreadcrumbList"],
    mustContain: [
      "Brainwave Entrainment is a holistic experience for the brain, also known as Spa for the Mind, reduces stress, resulting in relaxation, calmness and ease.",
      "Stress is a physiological and psychological response to perceived or real challenges or threats.",
      "Relaxation is the state of being calm, comfortable, and free from stress.",
    ],
  },
  {
    path: "/energy",
    jsonLd: ["BreadcrumbList"],
    mustContain: [
      "Try this holistic approach using PEMF system to enhance your energy, stamina, and power and you will feel the difference.",
    ],
  },
  {
    path: "/sports-health",
    jsonLd: ["BreadcrumbList"],
    mustContain: [
      "The IMRS Prime accelerates rejuvenation after physical activity, thus allowing you to train harder, perform better and compete more often.",
    ],
  },
  {
    path: "/sleep-health",
    jsonLd: ["BreadcrumbList"],
    mustContain: ["Deep sleep is crucial for physical and mental rejuvenation."],
  },
  {
    path: "/pets-health",
    jsonLd: ["BreadcrumbList"],
    mustContain: [
      "PEMF for Pets Health",
      "Dog knows PEMF is good for his health and wellness.",
    ],
  },
  {
    path: "/products",
    jsonLd: ["BreadcrumbList", "Product"],
    mustContain: [
      "World's only 6-dimensional PEMF wellness system!",
      "The Earth Resonance (7.83 Hz):",
      "It's not about overwhelming the body with power—it's about supporting it with resonance.",
    ],
  },
  {
    path: "/contact",
    jsonLd: ["BreadcrumbList"],
    mustContain: ["Office and Home Visits Available"],
  },
];

const REDIRECTS = [
  { from: "/what-is-pemf", to: "/pemf" },
  { from: "/benefits", to: "/holistic-health" },
];

let failures = 0;
const fail = (m) => {
  console.error(`  FAIL ${m}`);
  failures++;
};
const pass = (m) => console.log(`  ok   ${m}`);
const check = (cond, okMsg, failMsg) => {
  if (cond) pass(okMsg);
  else fail(failMsg);
};

// React SSR escapes text-node punctuation as HTML entities (an apostrophe
// in genuine body copy renders as `&#x27;`, not `'`), so the raw fetched
// HTML never contains the plain characters a mustContain phrase is written
// with even when that exact sentence is really on the page. Decode before
// matching so this stays a check on rendered content, not on markup escaping.
function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

// A route added to lib/routes.ts (nav/sitemap) but not to ROUTES above (this
// harness), or vice versa, must fail loudly rather than silently go unchecked.
if (ROUTES.length !== routes.length) {
  console.error(
    `\nFAIL ROUTES (scripts/verify-site.mjs) has ${ROUTES.length} entries but ` +
      `routes (lib/routes.ts) has ${routes.length}. Keep them in sync.`
  );
  process.exit(1);
}

const titles = new Map();
const linkCache = new Map();

async function linkStatus(href) {
  if (!linkCache.has(href)) {
    const res = await fetch(BASE + href, { method: "GET" });
    linkCache.set(href, res.status);
  }
  return linkCache.get(href);
}

async function checkRoute({ path, jsonLd, mustContain = [] }) {
  console.log(`\n${path}`);
  const res = await fetch(BASE + path);
  if (res.status !== 200) return fail(`status ${res.status}`);
  pass("200");
  const html = await res.text();

  const h1s = [...html.matchAll(/<h1[\s>]/g)].length;
  check(h1s === 1, "exactly one h1", `${h1s} h1 elements, expected 1`);

  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  if (!title) fail("no <title>");
  else if (titles.has(title)) fail(`duplicate title, also on ${titles.get(title)}`);
  else {
    titles.set(title, path);
    pass(`title: ${title}`);
  }

  const desc = html.match(/<meta name="description" content="(.*?)"\/?>/s)?.[1];
  if (!desc) fail("no meta description");
  else if (desc.length > 160) fail(`description ${desc.length} chars, max 160`);
  else pass(`description ${desc.length} chars`);

  check(html.includes('rel="canonical"'), "canonical", "no canonical");

  check(
    !/youtube|youtu\.be/i.test(html),
    "no YouTube embed",
    "page contains a YouTube embed"
  );

  const blocks = [
    ...html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs),
  ].map((m) => m[1]);
  const types = [];
  for (const b of blocks) {
    try {
      const parsed = JSON.parse(b);
      types.push(...[parsed].flat().map((x) => x["@type"]));
    } catch (e) {
      fail(`unparseable JSON-LD: ${e.message}`);
    }
  }
  for (const want of jsonLd) {
    check(types.includes(want), `JSON-LD ${want}`, `missing JSON-LD ${want}`);
  }

  // Next embeds the full page metadata (title, description) as serialized
  // text inside a hydration/RSC-payload <script> tag on every page, and
  // that same title/description text can also sit in <head>. Simply
  // stripping tags (as an earlier version of this check did) leaves that
  // script/head text behind as "visible" content, so a mustContain phrase
  // that only ever exists in a page's <meta name="description"> can match
  // there and pass even when the page body renders nothing at all -- the
  // per-page proof of real content silently stops proving anything. Cut
  // out <head>, <script> and <style> bodies (any attributes, case-
  // insensitive, dot-matches-newline) before stripping tags, so only
  // genuine body text remains.
  const bodyOnly = html
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, " ")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ");
  const visible = decodeEntities(bodyOnly.replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));
  for (const phrase of mustContain) {
    check(
      visible.includes(phrase),
      `contains "${phrase.slice(0, 40)}…"`,
      `missing verbatim phrase: "${phrase}"`
    );
  }

  const hrefs = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);
  for (const href of [...new Set(hrefs)]) {
    if (!href || /\.(png|jpe?g|svg|ico|webp|xml|txt)$/.test(href)) continue;
    const status = await linkStatus(href);
    check(status === 200, `link ${href}`, `link ${href} -> ${status}`);
  }
}

for (const r of ROUTES) await checkRoute(r);

console.log("\n/sitemap.xml + /robots.txt");
const sm = await fetch(BASE + "/sitemap.xml");
if (sm.status !== 200) fail(`/sitemap.xml -> ${sm.status}`);
else {
  const body = await sm.text();
  const locs = [...body.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  check(
    locs.length === ROUTES.length,
    `sitemap has ${locs.length} urls`,
    `sitemap has ${locs.length} urls, expected ${ROUTES.length}`
  );
  for (const { path } of ROUTES) {
    if (path === "/") continue;
    check(locs.some((l) => l.endsWith(path)), `sitemap ${path}`, `sitemap missing ${path}`);
  }
}

const rb = await fetch(BASE + "/robots.txt");
if (rb.status !== 200) fail(`/robots.txt -> ${rb.status}`);
else {
  const body = await rb.text();
  check(body.includes("Sitemap:"), "robots links sitemap", "robots has no Sitemap:");
}

console.log("\nredirects");
for (const { from, to } of REDIRECTS) {
  const res = await fetch(BASE + from, { redirect: "manual" });
  check(res.status === 308, `${from} -> 308`, `${from} returned ${res.status}, expected 308`);
  const location = res.headers.get("location") ?? "";
  check(location.endsWith(to), `${from} -> ${to}`, `${from} points at ${location}`);
}

console.log(failures ? `\n${failures} FAILURE(S)` : "\nAll checks passed");
process.exit(failures ? 1 : 0);
