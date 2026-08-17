// Crawls a running dev server and enforces the SEO checks from
// docs/superpowers/specs/2026-08-17-multipage-seo-design.md
// Usage: npm run dev, then npm run verify
const BASE = process.env.BASE_URL || "http://localhost:3000";

// Add a route here BEFORE building it, so the harness fails first.
const ROUTES = [
  { path: "/", jsonLd: ["LocalBusiness", "WebSite"] },
  { path: "/what-is-pemf", jsonLd: ["BreadcrumbList", "FAQPage"] },
  { path: "/benefits", jsonLd: ["BreadcrumbList", "FAQPage"] },
  { path: "/products", jsonLd: ["BreadcrumbList", "FAQPage", "Product"] },
  { path: "/contact", jsonLd: ["BreadcrumbList", "FAQPage"] },
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

const titles = new Map();
const linkCache = new Map();

async function linkStatus(href) {
  if (!linkCache.has(href)) {
    const res = await fetch(BASE + href, { method: "GET" });
    linkCache.set(href, res.status);
  }
  return linkCache.get(href);
}

async function checkRoute({ path, jsonLd }) {
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

console.log(failures ? `\n${failures} FAILURE(S)` : "\nAll checks passed");
process.exit(failures ? 1 : 0);
