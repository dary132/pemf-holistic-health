import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  titleAs: Heading = "h2",
  intro,
  tinted = false,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  /** The page's leading Section uses "h1"; every other Section stays "h2". */
  titleAs?: "h1" | "h2";
  intro?: string;
  tinted?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={tinted ? "bg-brand-light/60" : undefined}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">{eyebrow}</p>
          )}
          <Heading className="font-display text-3xl sm:text-4xl text-brand-dark">{title}</Heading>
          {intro && <p className="mt-4 text-ink-soft leading-relaxed">{intro}</p>}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
