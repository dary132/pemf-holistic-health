import Image from "next/image";
import type { Panel } from "@/lib/content/types";
import { isSvg } from "@/lib/content/images";
import { RHYTHM, type Rhythm } from "@/lib/rhythm";
import { TONE_BG, type Tone } from "@/lib/tones";
import { HeadingText } from "@/components/PemfWord";

/** The document's recurring three-column block. Every panel is a bordered
 *  plate of equal height, with a fixed-ratio media slot so the text baselines
 *  line up across the row. Collapses to one column below 1024px. */
export function PanelGrid({
  heading,
  panels,
  tone,
  panelTitleAs = "h3",
  rhythm = "normal",
  columns = 3,
}: {
  heading?: string;
  panels: Panel[];
  /** Desktop column count, default 3. Use 2 when the panel count is a
   *  multiple of two (e.g. the four /products accessories), so the grid
   *  fills every row instead of wrapping 3 + 1. */
  columns?: 2 | 3;
  /** Ground tint; omitted means the cream page ground shows through. */
  tone?: Tone;
  /** Level for each panel's own title (panel.title), default "h3" -- correct
   *  when `heading` renders its own h2 directly above them. A page that
   *  places this grid straight after its `<Section titleAs="h1" />` with no
   *  `heading` here has nothing at h2, so panel titles must be "h2"
   *  themselves or the page skips a level (h1 -> h3). See app/energy,
   *  app/mental-health and app/pets-health. verify:layout gates this. */
  panelTitleAs?: "h2" | "h3";
  rhythm?: Rhythm;
}) {
  const PanelHeading = panelTitleAs;
  return (
    <div className={tone && TONE_BG[tone]}>
      <div className={`mx-auto max-w-6xl px-5 ${RHYTHM[rhythm]}`}>
        {heading && (
          <h2 className="mb-10">
            <HeadingText text={heading} />
          </h2>
        )}
        <div
          className={`grid items-stretch gap-8 ${
            columns === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"
          }`}
        >
          {panels.map((panel, i) => (
            // Index key is safe: panels is a static list, never reordered or
            // filtered, and only changes when the page's content module changes.
            // Keying on title/image would collide if two panels shared a title.
            <div key={i} data-reveal className="u-plate flex flex-col p-6">
              {panel.image && (
                <div
                  className={`u-plate-media ${panel.image.dark ? "u-plate-media-dark " : ""}mb-5`}
                >
                  <Image
                    src={panel.image.src}
                    alt={panel.image.decorative ? "" : panel.image.alt}
                    aria-hidden={panel.image.decorative || undefined}
                    unoptimized={isSvg(panel.image.src)}
                    width={700}
                    height={525}
                    className={
                      panel.image.contain
                        ? "h-full w-full object-contain p-1"
                        : "h-full w-full object-cover"
                    }
                  />
                </div>
              )}
              {panel.title && (
                <PanelHeading>
                  <HeadingText text={panel.title} />
                </PanelHeading>
              )}
              {panel.paragraphs?.map((p) => (
                <p key={p} className="mt-4 text-ink-soft">
                  {p}
                </p>
              ))}
              {panel.bullets && (
                <ul className="u-bullets mt-4 text-ink-soft">
                  {panel.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
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
