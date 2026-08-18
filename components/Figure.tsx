import Image from "next/image";
import type { Img } from "@/lib/content/types";

/** Full-width captioned artwork, shown whole and never cropped. */
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
