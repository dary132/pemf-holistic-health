"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { PhoneButton } from "./PhoneButton";

/** Full-screen call prompt, 45 seconds after the page loads. Site owner's
 *  request, 2026-09-04: "a javascript popup that full screens after 45
 *  seconds directing the user to call now ... that they have to close".
 *
 *  Copy: the client's own call-to-action block, exactly as components/CTA.tsx
 *  renders it -- "Call | Text | WhatsApp", "Certified PEMF Expert Sharon",
 *  "for Appointment" with the office number -- plus the PhoneButton and the
 *  WhatsApp link. Nothing is written for the popup itself: "Call now" is not
 *  in the client document, so the heading the client already uses does that
 *  job. "Close" is in verify-jsx-copy's CHROME_ALLOWLIST.
 *
 *  Behaviour:
 *  - Once per browser session (sessionStorage), so a visitor who closes it
 *    and moves to another page is not asked again three pages running. A
 *    new tab or a new visit asks again. If storage is unavailable it simply
 *    shows on every page load.
 *  - Dismissed only by the Close button or the Escape key -- Escape is the
 *    keyboard form of the same button, required for a modal dialog. Clicking
 *    the backdrop does nothing, which is "they have to close".
 *  - While open: role="dialog" aria-modal, focus moves to the Close button,
 *    and body scroll is locked so the page behind cannot move. On close,
 *    focus returns to wherever it was.
 *  - The timer is per page load, not accumulated across pages: simple, and
 *    the once-per-session rule means at most one prompt per visit anyway.
 *
 *  Colours are the CTA band's (--band / --band-ink), already registered as a
 *  text pair in scripts/verify-contrast.mjs; the inverse PhoneButton exists
 *  for exactly this surface. z-[90]: above the sticky header (z-50), below
 *  the skip link's focus z-[100]. */
const DELAY_MS = 45_000;
const STORAGE_KEY = "pemf-call-popup-shown";

export function CallPopup() {
  const [open, setOpen] = useState(false);
  // Both typed with a `| null` union rather than a bare `<HTMLButtonElement>`:
  // verify-jsx-copy's tag scanner reads a bare generic as a JSX opening tag
  // and then checks the following code as page copy.
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* storage blocked: fall through and show */
    }
    const id = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      setOpen(true);
    }, DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="call-popup-title"
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-band px-5 py-10 text-band-ink"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={() => setOpen(false)}
        className="absolute right-5 top-5 inline-flex min-h-[56px] items-center justify-center rounded-full border-2 border-band-ink/60 px-8 text-lg font-bold text-band-ink hover:bg-band-ink/10"
      >
        Close
      </button>
      <div className="w-full max-w-2xl text-center">
        {/* Explicit colour for the same reason as in CTA.tsx: the global
            heading rule would otherwise paint this sage on sage. */}
        <h2
          id="call-popup-title"
          className="text-4xl text-band-ink sm:text-5xl"
        >
          Call | Text | WhatsApp
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-band-ink/90">
          Certified PEMF Expert Sharon
          <br />
          for Appointment {site.officePhone}
        </p>
        <div className="mx-auto mt-10 grid max-w-md gap-4">
          <PhoneButton variant="inverse" />
          <a
            href={site.whatsappHref}
            className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-band-ink/40 px-8 py-3.5 font-bold text-band-ink transition hover:bg-band-ink/10"
          >
            WhatsApp {site.whatsapp}
          </a>
        </div>
      </div>
    </div>
  );
}
