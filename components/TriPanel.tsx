import Image from "next/image";
import type { Panel } from "@/lib/content/types";
import { isSvg } from "@/lib/content/images";

/** The document's recurring three-column block: text, image, text.
 *  Collapses to a single column below 900px so nothing is squeezed. */
export function TriPanel({
  heading,
  panels,
  tinted = false,
  panelTitleAs = "h3",
}: {
  heading?: string;
  panels: Panel[];
  tinted?: boolean;
  /** Level for each panel's own title (panel.title), default "h3" -- correct
   *  when `heading` renders its own h2 directly above them. A page that
   *  places this TriPanel straight after its `<Section titleAs="h1" />` with
   *  no `heading` here has nothing at h2, so panel titles must be "h2"
   *  themselves or the page skips a level (h1 -> h3). See app/energy,
   *  app/mental-health and app/pets-health, spec fix-wave item I-7. */
  panelTitleAs?: "h2" | "h3";
}) {
  const PanelHeading = panelTitleAs;
  return (
    <div className={tinted ? "bg-sand" : undefined}>
      <div className="mx-auto max-w-6xl px-5 py-14">
        {heading && <h2 className="mb-10 text-3xl">{heading}</h2>}
        <div className="grid gap-8 lg:grid-cols-3">
          {panels.map((panel, i) => (
            // Index key is safe: panels is a static list, never reordered or
            // filtered, and only changes when the page's content module changes.
            // Keying on title/image would collide if two panels shared a title.
            <div
              key={i}
              className="rounded-3xl border border-rule bg-white p-6"
            >
              {panel.image && (
                <Image
                  src={panel.image.src}
                  alt={panel.image.decorative ? "" : panel.image.alt}
                  aria-hidden={panel.image.decorative || undefined}
                  unoptimized={isSvg(panel.image.src)}
                  width={700}
                  height={520}
                  className={
                    panel.image.contain
                      ? "mb-5 h-auto w-full object-contain"
                      : "mb-5 h-auto w-full rounded-2xl object-cover"
                  }
                />
              )}
              {panel.title && <PanelHeading className="text-xl">{panel.title}</PanelHeading>}
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
                      {item.text && <dd className="text-ink-soft">{item.text}</dd>}
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
