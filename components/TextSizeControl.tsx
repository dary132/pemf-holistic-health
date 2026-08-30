"use client";

import { useSyncExternalStore } from "react";

/** Reader-controlled text size.
 *
 *  The whole site is sized in rem off a single root font-size, so one
 *  multiplier on <html> grows every heading, card, nav item and paragraph
 *  together instead of only the body copy. That is the difference between
 *  a page that scales and a page that breaks: nothing here overrides an
 *  individual element's size, so the proportions the design was drawn at
 *  survive at every step.
 *
 *  Why a control at all, when the browser already has zoom: research on older
 *  users finds they largely do not discover or use browser zoom, and many
 *  blame themselves rather than the page when text is hard to read -- so the
 *  failure is silent and you never hear about it. An on-page control is the
 *  one they can see.
 *
 *  The choice is written to localStorage and re-applied before first paint by
 *  the script in app/layout.tsx, so a returning reader never sees the page
 *  flash at the default size first. */

/** 1 is the design's own size. The floor is deliberately not far below it --
 *  the base is already set for this audience -- and the ceiling reaches about
 *  29px on a desktop, near the size research suggests for comfortable reading
 *  at arm's length for a reader in their eighties. */
const STEPS = [0.9, 1, 1.15, 1.3];
const DEFAULT_INDEX = 1;
export const TEXT_SCALE_KEY = "pemf-text-scale";

/** The stored size is external state, so it is read through a store rather
 *  than copied into React state inside an effect -- the same shape
 *  LanguageSwitcher uses for its cookie, and the reason both avoid a
 *  set-state-in-effect cascade on every mount. */
const listeners = new Set<() => void>();
function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}
function getIndex(): number {
  try {
    const found = STEPS.indexOf(Number(localStorage.getItem(TEXT_SCALE_KEY)));
    return found === -1 ? DEFAULT_INDEX : found;
  } catch {
    // Private mode, or storage blocked. The default stands.
    return DEFAULT_INDEX;
  }
}
/** The server has no reader and no storage, so it always renders the default. */
const getServerIndex = () => DEFAULT_INDEX;

export default function TextSizeControl() {
  const index = useSyncExternalStore(subscribe, getIndex, getServerIndex);

  const set = (next: number) => {
    const clamped = Math.min(Math.max(next, 0), STEPS.length - 1);
    document.documentElement.style.setProperty("--text-scale", String(STEPS[clamped]));
    try {
      localStorage.setItem(TEXT_SCALE_KEY, String(STEPS[clamped]));
    } catch {
      // Storage blocked: the size still changes for this visit, it just will
      // not survive to the next one.
    }
    listeners.forEach((l) => l());
  };

  const btn =
    "inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-lg border-2 border-white/60 px-2 font-bold leading-none no-underline hover:bg-white hover:text-sage disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-white sm:px-3";

  return (
    <div className="flex items-center gap-2">
      {/* A label, not an icon alone: an unlabelled A-with-arrows is guessable
          at best, and this is the control the reader most needs to find. */}
      <span aria-hidden="true" className="hidden sm:inline">
        Text size
      </span>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => set(index - 1)}
          disabled={index === 0}
          aria-label="Make the text smaller"
          className={`${btn} text-base`}
        >
          A&minus;
        </button>
        <button
          type="button"
          onClick={() => set(DEFAULT_INDEX)}
          aria-label="Reset the text to the standard size"
          className={`${btn} text-lg`}
        >
          A
        </button>
        <button
          type="button"
          onClick={() => set(index + 1)}
          disabled={index === STEPS.length - 1}
          aria-label="Make the text bigger"
          className={`${btn} text-xl`}
        >
          A+
        </button>
      </div>
      {/* Announced to a screen reader on change, silent visually: the size
          change is obvious to anyone who can see it. */}
      <span aria-live="polite" className="sr-only">
        {`Text size ${index + 1} of ${STEPS.length}`}
      </span>
    </div>
  );
}
