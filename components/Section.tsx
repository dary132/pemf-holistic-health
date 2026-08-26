import type { ReactNode } from "react";
import { RHYTHM, type Rhythm } from "@/lib/rhythm";

export function Section({
  id,
  eyebrow,
  title,
  titleAs: Heading = "h2",
  intro,
  tinted = false,
  rhythm = "normal",
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  /** The page's leading Section uses "h1"; every other Section stays "h2". */
  titleAs?: "h1" | "h2";
  intro?: string;
  tinted?: boolean;
  /** Vertical rhythm. Uniform padding on every section gives the eye no cue
   *  about what groups with what, so this is chosen per section. */
  rhythm?: Rhythm;
  children?: ReactNode;
}) {
  return (
    <section id={id} className={tinted ? "bg-sand" : undefined}>
      <div className={`mx-auto max-w-6xl px-5 ${RHYTHM[rhythm]}`}>
        <div data-reveal className="max-w-3xl">
          {eyebrow && (
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-clay">
              {eyebrow}
            </p>
          )}
          <Heading>{title}</Heading>
          {/* Emphasis device, shared by every theme. Under the Vital Spectrum
              theme this bar is what walks the seven wordmark colours down the
              page: globals.css sets --accent-rule per top-level band and the
              custom property inherits down to here. */}
          <span className="u-accent-rule" />
          {intro && <p className="u-lead mt-4 leading-relaxed text-ink-soft">{intro}</p>}
        </div>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
