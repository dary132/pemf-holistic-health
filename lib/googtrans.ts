/** Cookie handling for the Google Translate widget the language switcher
 *  drives. Split out of components/LanguageSwitcher.tsx so the domain rules
 *  can be tested without a browser -- see scripts/verify-language-switcher.mjs. */

/** The subset of `document` these helpers touch, so a test can pass a jar. */
export type CookieStore = { cookie: string };

/** Every domain a `googtrans` cookie could have been written to from
 *  `hostname`, each with and without the leading dot browsers ignore.
 *
 *  The widget does not write the cookie to the host it runs on. Its own
 *  writer (function Gw in Google's el_main.js) walks the hostname down to
 *  its last two labels and sets the cookie twice -- host-only, then again
 *  with `;domain=<those two labels>`:
 *
 *      for (var c = location.hostname.split("."); c.length > 2;) c.shift();
 *      c = ";domain=" + c.join(".");
 *      document.cookie = a;
 *      try { document.cookie = a + c } catch (d) {}
 *
 *  So on pemf.darytechnologies.com the live cookie is on
 *  darytechnologies.com, and expiring only the spellings of the full
 *  hostname left it in place -- the visitor picked English, the page
 *  reloaded, the surviving cookie still read /en/es, and the widget
 *  translated again. Walking every parent domain covers that one, and any
 *  other level a future widget version might choose.
 *
 *  Stops before the final label: a cookie can never be set on a bare TLD. */
export function cookieDomains(hostname: string): string[] {
  const labels = hostname.split(".");
  const domains: string[] = [];
  for (let i = 0; i + 1 < labels.length; i++) {
    const domain = labels.slice(i).join(".");
    domains.push(domain, `.${domain}`);
  }
  return domains;
}

/** Expire `googtrans` everywhere it could live, so English actually sticks.
 *  Domains that do not cover the current host, or that are public suffixes,
 *  are rejected by the browser rather than erroring, so over-listing is
 *  safe and under-listing is the bug. */
export function clearTranslateCookie(
  hostname: string = location.hostname,
  store: CookieStore = document
) {
  const expiry = "expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  store.cookie = `googtrans=; ${expiry}`;
  for (const domain of cookieDomains(hostname)) {
    store.cookie = `googtrans=; ${expiry}; domain=${domain}`;
  }
}
