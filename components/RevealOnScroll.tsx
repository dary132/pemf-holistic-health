"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Fades cards and text blocks in as they scroll into view.
 *
 *  Three things about this are deliberate and should not be "simplified".
 *
 *  1. Nothing is hidden by this component. The hiding rule lives in
 *     globals.css under `.js-reveal [data-reveal]`, and `.js-reveal` is put on
 *     <html> by the pre-paint script in app/layout.tsx. So a visitor with no
 *     JavaScript, a blocked bundle, or a crawler reading the page sees every
 *     word immediately -- the copy is never dependent on script to exist. On
 *     a site whose client cites FDA exposure, hiding text behind an animation
 *     that might not run is not an acceptable trade.
 *
 *  2. The same CSS is wrapped in `prefers-reduced-motion: no-preference`, so
 *     anyone who asked their system for stillness never has content hidden
 *     from them in the first place. This component reveals everything at once
 *     for them as well, belt and braces, because the class is what the
 *     failsafe in layout.tsx keys on.
 *
 *  3. The failsafe. If this bundle never executes, the pre-paint script's
 *     timer removes `.js-reveal` a few seconds in and the page becomes fully
 *     visible on its own. Clearing that timer here is how the page says "the
 *     script arrived, I will handle the reveal myself". Without it, a failed
 *     bundle would leave the page permanently blank below the hero.
 *
 *  Re-running on pathname change is required, not incidental: this component
 *  is mounted once in the root layout, so a client-side navigation swaps the
 *  page's DOM underneath it without remounting. Without `pathname` in the
 *  dependency list, every route after the first would keep its content hidden. */
export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // The pre-paint script set this. Tell it the bundle is alive so it stops
    // counting down to the "show everything" failsafe.
    const w = window as Window & { __revealFailsafe?: number };
    if (w.__revealFailsafe) {
      clearTimeout(w.__revealFailsafe);
      w.__revealFailsafe = undefined;
    }

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (targets.length === 0) return;

    const revealAll = () => targets.forEach((el) => el.classList.add("is-revealed"));

    // Someone who asked for stillness gets the content, not the animation.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      revealAll();
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          // One-shot: content that has been read should not fade again on the
          // way back up. Re-animating on every scroll past is the thing that
          // makes this pattern feel broken rather than considered.
          observer.unobserve(entry.target);
        }
      },
      // A little below the fold, so a card is already settled by the time it
      // is comfortably in view rather than finishing its fade at the edge.
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
