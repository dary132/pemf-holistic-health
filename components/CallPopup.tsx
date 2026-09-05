"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { PhoneButton } from "./PhoneButton";

/** Call prompt, 30 seconds after the page loads. Site owner's request,
 *  2026-09-04: "a javascript popup that full screens after 45 seconds
 *  directing the user to call now ... that they have to close" -- then,
 *  seeing it live, "a small call to action button but with some visibility
 *  of the page", so it is a compact card over a dimmed, still-visible page
 *  rather than a full-screen panel. Bottom of the screen on phones, centred
 *  from sm up.
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
 *  The card is a u-plate (white in every palette) with the site's normal ink
 *  and buttons, so every text pair on it is one already registered in
 *  scripts/verify-contrast.mjs; the backdrop carries no text. z-[90]: above
 *  the sticky header (z-50), below the skip link's focus z-[100]. */
// 45s at first; the owner asked for 30 the same day.
const DELAY_MS = 30_000;
const STORAGE_KEY = "pemf-call-popup-shown";

export function CallPopup() {
  const [open, setOpen] = useState(false);
  // Typed by casting the initial value, not with `useRef<...>()` generics:
  // verify-jsx-copy's tag scanner reads `<HTMLButtonElement>` (and the `|
  // null` form too) as a JSX opening tag and then checks the code after it
  // as page copy. No angle brackets, no false match.
  const closeRef = useRef(null as HTMLButtonElement | null);
  const restoreFocusRef = useRef(null as HTMLElement | null);

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
    /* Dimmed backdrop with the page visible through it, and a compact card
       rather than a full-screen panel -- owner, 2026-09-04, after seeing the
       full-screen version live: "a small call to action button but with
       some visibility of the page". The backdrop is inert on purpose; only
       the Close button (or Escape) dismisses. */
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-ink/50 p-4 sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="call-popup-title"
        className="u-plate relative w-full max-w-sm bg-white p-6 pt-7 text-center shadow-xl sm:p-8"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-button px-5 text-base font-bold text-button hover:bg-sand"
        >
          Close
        </button>
        <h2 id="call-popup-title" className="mt-8 text-2xl sm:text-3xl">
          Call | Text | WhatsApp
        </h2>
        <p className="mx-auto mt-3 leading-relaxed text-ink-soft">
          Certified PEMF Expert Sharon
          <br />
          for Appointment {site.officePhone}
        </p>
        <div className="mt-6 grid gap-3">
          <PhoneButton />
          <a
            href={site.whatsappHref}
            className="inline-flex min-h-[56px] items-center justify-center rounded-full border-[3px] border-button px-8 text-lg font-bold text-button no-underline hover:bg-sand"
          >
            WhatsApp {site.whatsapp}
          </a>
        </div>
      </div>
    </div>
  );
}
