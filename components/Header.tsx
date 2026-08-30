"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navGroups } from "@/lib/routes";
import { site } from "@/lib/site";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import TextSizeControl from "@/components/TextSizeControl";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);
  const pathname = usePathname();
  const groupRef = useRef<HTMLDivElement>(null);

  // A hover-only menu is unusable with an unsteady hand, so the group opens on
  // click. It must therefore also close on Escape and on an outside click.
  useEffect(() => {
    if (!groupOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setGroupOpen(false);
    const onClick = (e: MouseEvent) => {
      if (groupRef.current && !groupRef.current.contains(e.target as Node))
        setGroupOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [groupOpen]);

  const linkClass = (href: string) =>
    `inline-flex min-h-[48px] items-center whitespace-nowrap px-2 font-bold no-underline ${
      pathname === href ? "text-clay underline underline-offset-8" : "text-ink-soft hover:text-clay"
    }`;

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-sage text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-1 px-5 text-base font-semibold">
          <div className="flex flex-wrap items-center">
            <a
              href={site.officePhoneHref}
              className="inline-flex min-h-[48px] items-center underline-offset-4 no-underline hover:underline"
            >
              Office {site.officePhone}
            </a>
            <span aria-hidden="true" className="px-2">
              ·
            </span>
            <a
              href={site.whatsappHref}
              className="inline-flex min-h-[48px] items-center underline-offset-4 no-underline hover:underline"
            >
              WhatsApp {site.whatsapp}
            </a>
          </div>
          {/* flex-wrap and the tighter small-screen gap are what keep the bar
              from scrolling sideways at the largest text size: every gap here
              is rem-based, so it grows with the reader's choice just as the
              buttons do, and on a narrow phone the row has to be allowed to
              wrap rather than push past the viewport. */}
          <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 sm:gap-x-6">
            {/* The address gives way to the text-size control below xl: the
                control is the one thing here a reader who cannot read the
                page needs, so it outranks an address that also sits in the
                footer and in the CTA on every page. */}
            <p className="hidden xl:block">{site.address.join(", ")}</p>
            <TextSizeControl />
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <header className="border-b-2 border-rule bg-cream">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4">
          {/* nowrap only from xl, where the nav sits inline beside it and a
              wrapped wordmark looks broken. On a phone at the largest text
              size the name must be free to wrap, or it pushes the page
              sideways. */}
          <Link
            href="/"
            className="min-w-0 text-2xl font-semibold no-underline xl:whitespace-nowrap"
          >
            <span className="font-[family-name:var(--font-display)] text-sage">PEMF </span>
            <span className="font-[family-name:var(--font-display)] text-clay">
              for Holistic Health
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-5 xl:flex">
            {navGroups.map((entry) =>
              entry.kind === "link" ? (
                <Link
                  key={entry.route.path}
                  href={entry.route.path}
                  aria-current={pathname === entry.route.path ? "page" : undefined}
                  className={linkClass(entry.route.path)}
                >
                  {entry.route.label}
                </Link>
              ) : (
                <div key={entry.label} ref={groupRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setGroupOpen(!groupOpen)}
                    aria-expanded={groupOpen}
                    aria-controls="wellness-menu"
                    className="inline-flex min-h-[48px] items-center px-2 font-bold text-ink-soft hover:text-clay"
                  >
                    {entry.label} <span aria-hidden="true">&nbsp;▾</span>
                  </button>
                  {groupOpen && (
                    <ul
                      id="wellness-menu"
                      className="absolute left-0 top-full z-50 min-w-[15rem] rounded-2xl border-2 border-rule bg-white p-2 shadow-lg"
                    >
                      {entry.children.map((child) => (
                        <li key={child.path}>
                          <Link
                            href={child.path}
                            onClick={() => setGroupOpen(false)}
                            className="flex min-h-[48px] items-center rounded-xl px-4 font-bold text-ink-soft no-underline hover:bg-sand hover:text-clay"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            )}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="inline-flex min-h-[48px] min-w-[48px] shrink-0 items-center justify-center rounded-xl border-2 border-button px-4 font-bold text-button xl:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {menuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Main"
            className="border-t-2 border-rule bg-white px-5 py-3 xl:hidden"
          >
            <ul>
              {navGroups.flatMap((entry) =>
                entry.kind === "link" ? [entry.route] : [...entry.children]
              ).map((route) => (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    onClick={() => setMenuOpen(false)}
                    aria-current={pathname === route.path ? "page" : undefined}
                    className="flex min-h-[56px] items-center border-b border-rule font-bold text-ink-soft no-underline"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </div>
  );
}
