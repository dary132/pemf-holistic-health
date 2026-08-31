import Image from "next/image";
import type { Panel } from "@/lib/content/types";
import { isSvg } from "@/lib/content/images";
import { RHYTHM, type Rhythm } from "@/lib/rhythm";
import { bandClass } from "@/lib/tones";
import { HeadingText } from "@/components/PemfWord";
import { blurFor } from "@/lib/content/blur";

/** The document's recurring three-column block. Every panel is a bordered
 *  plate of equal height, with a fixed-ratio media slot so the text baselines
 *  line up across the row. Collapses to one column below 1024px. */
export function PanelGrid({
  heading,
  panels,
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
    <div className={bandClass()}>
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
                    {...blurFor(panel.image.src)}
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
                  {/* The term carries the emphasis, client request
                      2026-08-31. It was `font-bold text-ink` against an
                      `text-ink-soft` description, which is far weaker than it
                      looks in the class list: body copy on this site is
                      already weight 600 (globals.css, raised for the elderly
                      audience), so "bold" bought a single 600->700 step, and
                      --ink against --ink-soft is two near-blacks. A term and
                      its definition were reading as one undifferentiated
                      block.

                      --sage is the fix rather than more weight, because it is
                      already this site's "this is a heading" signal -- every
                      h1/h2/h3 is --sage -- so a term picks up the existing
                      language instead of inventing a fourth emphasis device.
                      Weight went 700 -> 900 (font-black) on 2026-08-31, the
                      client asking for it "significantly bold ... thick". An
                      earlier version of this comment claimed there was nowhere
                      left to go on weight; that was wrong. Nunito Sans loads
                      from next/font with no `weight` option (app/layout.tsx),
                      which for a variable font ships the whole 200-1000 axis,
                      so 900 renders as a real weight rather than being
                      synthesised or snapped back to 700. Against 600 body copy
                      that is a 300-step difference where "bold" gave 100.

                      Contrast: these dl blocks sit inside u-plate, which is
                      --white, so --sage on --white is now a real text pair and
                      is registered in scripts/verify-contrast.mjs rather than
                      assumed. It measures 8.59:1 in the default palette, and
                      the checker holds all six palettes to the 7:1 floor.

                      Shared component, so this lands on every `items` block on
                      the site -- /mental-health, /energy, /pets-health and
                      /products. That is the point: one term/description
                      pattern should look the same everywhere. */}
                  {panel.items.map((item) => (
                    <div key={item.term}>
                      <dt className="text-lg font-black text-sage">{item.term}</dt>
                      {item.text && <dd className="mt-1 text-ink-soft">{item.text}</dd>}
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
