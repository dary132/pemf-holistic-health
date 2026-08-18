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
  children?: ReactNode;
}) {
  return (
    <section id={id} className={tinted ? "bg-sand" : undefined}>
      <div className="mx-auto max-w-6xl px-5 py-14 sm:py-16">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="text-clay font-medium tracking-widest uppercase text-sm mb-2">{eyebrow}</p>
          )}
          <Heading className="text-3xl sm:text-4xl text-sage">{title}</Heading>
          {intro && <p className="mt-4 max-w-[62ch] text-ink-soft leading-relaxed">{intro}</p>}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
