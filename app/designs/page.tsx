import type { Metadata } from "next";
import Link from "next/link";

/* A review tool, not a page of the site. Same arrangement as /themes: absent
 * from lib/routes.ts, so out of the header nav, out of sitemap.xml and out of
 * scripts/verify-site.mjs -- all three read that one list -- and noindex so it
 * stays out of search results. The only way in is the link, which is exactly
 * what sharing it with the client needs. Delete this directory, and the two
 * losing directions, once one is chosen. */
export const metadata: Metadata = {
  title: "Design directions",
  robots: { index: false, follow: false },
};

const DIRECTIONS = [
  {
    href: "/designs/editorial?theme=",
    name: "Editorial",
    note: "The current site pushed much further. Wordmark hard left, photograph bleeding off the right edge, numbered sections, hairline rules. Premium and calm.",
  },
  {
    href: "/designs/clinical?theme=ocean",
    name: "Clinical",
    note: "Two-column hero and a credential strip directly beneath it. Bordered plates, three-column cards. Organised, credible, information-forward.",
  },
  {
    href: "/designs/photographic?theme=sunrise",
    name: "Photographic",
    note: "Full-bleed photograph with the wordmark on a scrim, alternating image bands. Warm and aspirational — and undersold by the one lifestyle photograph that exists.",
  },
];

export default function Designs() {
  return (
    <main id="main">
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h1>Design directions</h1>
          <span className="u-accent-rule" />
          <p className="u-lead mt-6 text-ink-soft">
            Three home pages, three directions. Each opens in the palette that suits it;
            the picker at{" "}
            <Link href="/themes">Theme preview</Link> still re-skins any of them. Nothing
            here is live to the public.
          </p>

          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {DIRECTIONS.map((d) => (
              <li key={d.href} className="u-plate p-6">
                <h2 className="text-2xl">
                  <Link href={d.href}>{d.name}</Link>
                </h2>
                <span className="u-accent-rule" />
                <p className="mt-4 leading-relaxed text-ink-soft">{d.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
