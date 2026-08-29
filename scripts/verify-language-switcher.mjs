// Fails the build if the language switcher cannot clear an active Google
// Translate cookie -- the bug that made English unreachable on the custom
// domain (2026-08-29).
//
//   npm run verify:lang
//
// Why this test models cookies instead of calling a browser: the failure is
// entirely about WHICH domain a cookie is written to and which domains a
// deletion targets, and that is invisible to any check that only looks at
// `document.cookie` from one host. So the jar below implements the parts of
// RFC 6265 the bug turns on -- host-only vs. domain cookies, suffix
// validation, public-suffix rejection, and the rule that a deletion only
// removes the cookie with the SAME (name, domain) key.
//
// The widget's own cookie writer is reproduced verbatim from Google's
// shipped el_main.js (function Gw), which walks the hostname down to its
// last two labels and writes the cookie twice: host-only, then again with
// `;domain=<registrable domain>`. That second write is the one the switcher
// used to leave behind.
import { clearTranslateCookie, cookieDomains } from "../lib/googtrans.ts";

// Public suffixes the cases below need. A cookie whose Domain attribute is a
// public suffix is rejected by the browser, which is exactly why the bug
// never appeared on *.vercel.app.
const PUBLIC_SUFFIXES = new Set(["com", "app", "vercel.app"]);

/** A cookie jar for one host, implementing the domain rules the bug turns on. */
class CookieJar {
  constructor(host) {
    this.host = host;
    this.store = new Map(); // `${name}|${domainKey}` -> value; "" key = host-only
  }

  /** RFC 6265 domain-match: the cookie's domain covers this jar's host. */
  #matches(domainKey) {
    if (domainKey === "") return true; // host-only, and we only model one host
    return this.host === domainKey || this.host.endsWith(`.${domainKey}`);
  }

  set cookie(str) {
    const [pair, ...attrs] = str.split(";").map((s) => s.trim());
    const eq = pair.indexOf("=");
    const name = pair.slice(0, eq);
    const value = pair.slice(eq + 1);

    let domainKey = "";
    let expired = false;
    for (const attr of attrs) {
      const [rawKey, rawValue = ""] = attr.split("=").map((s) => s.trim());
      const key = rawKey.toLowerCase();
      if (key === "domain") {
        // A leading dot is ignored: ".example.com" and "example.com" are the
        // same stored cookie, which is why clearing both spellings of the
        // hostname never reached the registrable domain.
        const domain = rawValue.replace(/^\./, "").toLowerCase();
        const coversHost = this.host === domain || this.host.endsWith(`.${domain}`);
        if (!coversHost || PUBLIC_SUFFIXES.has(domain)) return; // browser rejects
        domainKey = domain;
      }
      if (key === "expires" && new Date(rawValue).getTime() < Date.now()) expired = true;
    }

    const storeKey = `${name}|${domainKey}`;
    if (expired) this.store.delete(storeKey);
    else this.store.set(storeKey, value);
  }

  get cookie() {
    return [...this.store]
      .filter(([storeKey]) => this.#matches(storeKey.split("|")[1]))
      .map(([storeKey, value]) => `${storeKey.split("|")[0]}=${value}`)
      .join("; ");
  }
}

/** Google's own writer, transcribed from el_main.js's Gw(). */
function widgetWritesGoogtrans(jar, value) {
  const labels = jar.host.split(".");
  while (labels.length > 2) labels.shift();
  const domainAttr = `;domain=${labels.join(".")}`;
  const cookie = `googtrans=${value};path=/`;
  jar.cookie = cookie;
  jar.cookie = cookie + domainAttr;
}

function activeLanguage(jar) {
  const match = jar.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
  return match ? (decodeURIComponent(match[1]).split("/")[2] ?? "") : "";
}

/** A visitor picks Spanish, the widget loads and rewrites the cookie, then
 *  the visitor picks English. Returns the language still active afterwards. */
function languageAfterReturningToEnglish(host) {
  const jar = new CookieJar(host);
  jar.cookie = "googtrans=/en/es; path=/"; // the switcher's own write
  widgetWritesGoogtrans(jar, "/en/es"); // the widget's, on the next load
  clearTranslateCookie(host, jar); // the visitor picks English
  return activeLanguage(jar);
}

const cases = [
  [
    "returns to English on a custom subdomain (the reported bug)",
    () => languageAfterReturningToEnglish("pemf.darytechnologies.com") === "",
  ],
  [
    "returns to English on an apex domain",
    () => languageAfterReturningToEnglish("darytechnologies.com") === "",
  ],
  [
    // Why the bug went unnoticed in testing: vercel.app is a public suffix,
    // so the widget's second write is rejected and only the host-only cookie
    // -- which the old code did clear -- ever exists.
    "returns to English on the vercel.app deployment",
    () => languageAfterReturningToEnglish("pemf-holistic-health.vercel.app") === "",
  ],
  [
    "returns to English on a deep subdomain",
    () => languageAfterReturningToEnglish("a.b.pemf.darytechnologies.com") === "",
  ],
  [
    "covers the registrable domain the widget writes to",
    () => cookieDomains("pemf.darytechnologies.com").includes("darytechnologies.com"),
  ],
  [
    "offers no domain to clear for a single-label host",
    () => cookieDomains("localhost").length === 0,
  ],
  [
    // The guard proves it can fail: a jar the clear never touches must stay
    // translated, or every case above would pass vacuously.
    "detects a cookie that was never cleared",
    () => {
      const jar = new CookieJar("pemf.darytechnologies.com");
      widgetWritesGoogtrans(jar, "/en/es");
      return activeLanguage(jar) === "es";
    },
  ],
];

let failures = 0;
for (const [name, run] of cases) {
  if (run()) console.log(`  ok   ${name}`);
  else {
    console.error(`  FAIL ${name}`);
    failures++;
  }
}
console.log(failures ? `\n${failures} LANGUAGE SWITCHER FAILURE(S)` : "\nLanguage switcher clears every cookie variant");
process.exit(failures ? 1 : 0);
