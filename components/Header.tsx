"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="sticky top-0 z-50">
      {/* Top contact bar */}
      <div className="bg-brand-dark text-white text-sm sm:text-base">
        <div className="mx-auto max-w-6xl px-4 py-1.5 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 sm:justify-between">
          <p>
            <a href={site.phoneHref} className="hover:text-accent-light">
              Call / Text / WhatsApp {site.phone}
            </a>
          </p>
          <p className="hidden md:block text-white/90">
            {site.address.join(", ")} · Office and Home Visits Available
          </p>
        </div>
      </div>

      {/* Main nav */}
      <header className="bg-white/95 backdrop-blur border-b border-brand/10 shadow-sm">
        <div className="mx-auto max-w-6xl px-4 flex items-center justify-between gap-4 py-3">
          <Link href="/" className="shrink-0">
            <span className="font-display text-xl sm:text-2xl text-brand-dark tracking-wide">
              PEMF <span className="text-accent">for Holistic Health</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-base font-medium text-ink-soft">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={
                  isActive(link.href)
                    ? "whitespace-nowrap font-semibold text-brand"
                    : "whitespace-nowrap hover:text-brand transition-colors"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="lg:hidden rounded-md border border-brand/20 p-2 text-brand-dark"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <nav className="lg:hidden border-t border-brand/10 bg-white px-4 py-3 grid grid-cols-2 gap-2 text-base text-ink-soft">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={
                  isActive(link.href)
                    ? "rounded-md px-3 py-2 bg-brand-light font-semibold text-brand"
                    : "rounded-md px-3 py-2 hover:bg-brand-light hover:text-brand"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </div>
  );
}
