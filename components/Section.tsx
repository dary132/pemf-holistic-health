import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  tinted = false,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  tinted?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={tinted ? "bg-brand-light/60" : undefined}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">{eyebrow}</p>
          )}
          <h2 className="font-display text-3xl sm:text-4xl text-brand-dark">{title}</h2>
          {intro && <p className="mt-4 text-ink-soft leading-relaxed">{intro}</p>}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
