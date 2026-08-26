import Image from "next/image";
import type { Img } from "@/lib/content/types";
import { isSvg } from "@/lib/content/images";

/** Full-width captioned artwork, shown whole and never cropped.
 *  No `object-fit` or height constraint is applied, so nothing is ever
 *  cropped here regardless of `Img.contain` — that flag has no effect on
 *  this component. It only changes behaviour in `SplitBand` and `TriPanel`,
 *  which do constrain image height. */
export function Figure({
  image,
  caption,
  tinted = false,
  priority = false,
}: {
  image: Img;
  caption?: string;
  tinted?: boolean;
  /** Set on the one figure that is the page's LCP element (the home hero). */
  priority?: boolean;
}) {
  return (
    <div className={tinted ? "bg-sand" : undefined}>
      <div className="mx-auto max-w-6xl px-5 py-14">
        {/* The priority Figure is the page's LCP element. Starting it at
            opacity 0 would push Largest Contentful Paint out by the length of
            the fade, so it is never marked for reveal. */}
        <figure data-reveal={priority ? undefined : ""}>
          {/* Bordered plate, matching PanelGrid and SplitBand since the
              2026-08-26 Clinical roll-out. The image keeps its own smaller
              radius inside the plate, exactly as the home hero does. */}
          <div className="u-plate p-3">
            <Image
              src={image.src}
              alt={image.decorative ? "" : image.alt}
              aria-hidden={image.decorative || undefined}
              unoptimized={isSvg(image.src)}
              priority={priority}
              width={1200}
              height={800}
              className="w-full rounded-lg"
            />
          </div>
          {caption && (
            <figcaption className="mt-4 max-w-[62ch] text-lg text-ink-soft">
              {caption}
            </figcaption>
          )}
        </figure>
      </div>
    </div>
  );
}
