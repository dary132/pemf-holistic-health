import { JsonLd } from "./JsonLd";
import { faqSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/content/types";

/**
 * Renders a question list and its FAQPage structured data from one array,
 * so the visible copy and the schema can never drift apart.
 */
export function FAQ({ heading, items }: { heading: string; items: FaqItem[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <h2 className="font-display text-3xl text-brand-dark sm:text-4xl">{heading}</h2>
      <dl className="mt-8 grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.q}
            className="rounded-2xl border border-brand/10 bg-white p-6 shadow-sm"
          >
            <dt className="font-display text-lg text-brand-dark">{item.q}</dt>
            <dd className="mt-2 text-base leading-relaxed text-ink-soft">{item.a}</dd>
          </div>
        ))}
      </dl>
      <JsonLd data={faqSchema(items)} />
    </section>
  );
}
