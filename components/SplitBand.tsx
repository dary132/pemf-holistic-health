import Image from "next/image";
import type { Img } from "@/lib/content/types";
import { isSvg } from "@/lib/content/images";

/** Two-column image and text band. Stacks to one column below 900px.
 *
 *  The image sits in a `u-plate` -- the bordered, 12px-radius, shadowless
 *  plate the Clinical direction is built on -- rather than the soft
 *  `rounded-3xl ... shadow-sm` card this used before the 2026-08-26 roll-out.
 *  PanelGrid already used u-plate, so aligning this one (and Figure, and
 *  FrequencyCard) is what makes the nine inner pages match the home page
 *  instead of mixing two card languages on the same site. */
export function SplitBand({
  image,
  title,
  paragraphs = [],
  reverse = false,
  tinted = false,
  children,
}: {
  image: Img;
  title?: string;
  paragraphs?: string[];
  reverse?: boolean;
  tinted?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className={tinted ? "bg-sand" : undefined}>
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className={reverse ? "lg:order-2" : undefined}>
            <div className="u-plate p-3">
              <Image
                src={image.src}
                alt={image.decorative ? "" : image.alt}
                aria-hidden={image.decorative || undefined}
                unoptimized={isSvg(image.src)}
                width={900}
                height={700}
                className={
                  image.contain
                    ? "mx-auto h-auto w-full object-contain"
                    : "h-auto w-full rounded-lg object-cover"
                }
              />
            </div>
          </div>
          <div>
            {title && (
              <>
                <h2 className="text-3xl">{title}</h2>
                <span className="u-accent-rule" />
              </>
            )}
            {paragraphs.map((p) => (
              <p key={p} className="mt-4 max-w-[62ch] text-ink-soft">
                {p}
              </p>
            ))}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
