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
}: {
  image: Img;
  caption?: string;
  tinted?: boolean;
}) {
  return (
    <div className={tinted ? "bg-sand" : undefined}>
      <div className="mx-auto max-w-6xl px-5 py-14">
        <figure>
          <Image
            src={image.src}
            alt={image.decorative ? "" : image.alt}
            aria-hidden={image.decorative || undefined}
            unoptimized={isSvg(image.src)}
            width={1200}
            height={800}
            className="w-full rounded-3xl"
          />
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
