import Image from "next/image";
import type { Panel } from "@/lib/content/types";

/** The document's recurring three-column block: text, image, text.
 *  Collapses to a single column below 900px so nothing is squeezed. */
export function TriPanel({
  heading,
  panels,
  tinted = false,
}: {
  heading?: string;
  panels: Panel[];
  tinted?: boolean;
}) {
  return (
    <div className={tinted ? "bg-sand" : undefined}>
      <div className="mx-auto max-w-6xl px-5 py-14">
        {heading && <h2 className="mb-10 text-3xl">{heading}</h2>}
        <div className="grid gap-8 lg:grid-cols-3">
          {panels.map((panel, i) => (
            <div
              key={panel.title ?? panel.image?.src ?? i}
              className="rounded-3xl border border-rule bg-white p-6"
            >
              {panel.image && (
                <Image
                  src={panel.image.src}
                  alt={panel.image.decorative ? "" : panel.image.alt}
                  aria-hidden={panel.image.decorative || undefined}
                  width={700}
                  height={520}
                  className={
                    panel.image.contain
                      ? "mb-5 h-auto w-full object-contain"
                      : "mb-5 h-auto w-full rounded-2xl object-cover"
                  }
                />
              )}
              {panel.title && <h3 className="text-xl">{panel.title}</h3>}
              {panel.paragraphs?.map((p) => (
                <p key={p} className="mt-3 text-ink-soft">
                  {p}
                </p>
              ))}
              {panel.items && (
                <dl className="mt-3 space-y-3">
                  {panel.items.map((item) => (
                    <div key={item.term}>
                      <dt className="font-bold text-ink">{item.term}</dt>
                      <dd className="text-ink-soft">{item.text}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
