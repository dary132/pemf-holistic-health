import type { ReactNode } from "react";

/** Editorial's structural device: the section number sits in the outer margin
 *  as a hairline-ruled marker rather than in the heading. Bare numerals are
 *  safe under the copy guard -- verify-jsx-copy.mjs only checks text nodes
 *  with at least two words and at least one letter, so "01" is skipped by
 *  design rather than by luck (see the spec's Constraints section). */
export function NumberedSection({
  n,
  id,
  title,
  children,
}: {
  n: string;
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id}>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="grid gap-8 md:grid-cols-[4rem_1fr]">
          <div aria-hidden="true" className="hidden md:block">
            <span className="text-2xl font-bold tabular-nums text-clay">{n}</span>
            <span className="mt-3 block h-px w-full bg-rule" />
          </div>
          <div>
            <h2 className="max-w-[20ch]">{title}</h2>
            <span className="u-accent-rule" />
            <div className="mt-8 max-w-[62ch]">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
