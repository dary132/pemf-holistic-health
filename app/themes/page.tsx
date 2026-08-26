import type { Metadata } from "next";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { routes } from "@/lib/routes";

/* A review tool, not a page of the site.
 *
 * It is absent from lib/routes.ts on purpose, which keeps it out of the header
 * nav, out of sitemap.xml and out of scripts/verify-site.mjs -- all three read
 * that one list. noindex/nofollow below keeps it out of search results, so the
 * only way in is the link, which is exactly what sharing it with the client
 * needs. Delete this directory once a palette is chosen. */
export const metadata: Metadata = {
  title: "Theme preview",
  robots: { index: false, follow: false },
};

export default function Themes() {
  return (
    <main id="main">
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h1>Theme preview</h1>
          <span className="u-accent-rule" />
          <p className="u-lead mt-6 text-ink-soft">
            Pick a palette below, then browse the site as usual — the choice follows you
            from page to page until you come back here and change it. Nothing here is
            live to the public.
          </p>

          <div className="mt-10">
            <ThemeSwitcher />
          </div>
          <p className="u-lead mt-10 text-ink-soft">
            Looking for different page layouts rather than different colours?{" "}
            <Link href="/designs">Design directions</Link> has three.
          </p>

          <h2 className="mt-14">Browse the site in this theme</h2>
          <span className="u-accent-rule" />
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {routes.map((r) => (
              <li key={r.path}>
                <Link href={r.path}>{r.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
