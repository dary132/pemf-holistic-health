#!/usr/bin/env python3
"""Extract and rename the images the 2026 document introduces.

The other 30 images in the document are already byte-identical to files in
public/images/ and are left alone. Run from the repo root:
    python3 scripts/extract-images.py

CAUTION: two committed files are post-processed after extraction and will be
clobbered by a blind re-run (2026-08-20):
  essential-air.png                 third-party watermark painted out, top right
  earth-magnetic-field-shield.png   cropped to rows 10-186 to drop a watermark
                                    and the burnt-in caption (the caption is
                                    repeated as text in lib/content/pemf.ts)
"""
import zipfile

DOCX = "Website Exiga Jasmin 2026.docx"
OUT = "public/images"

RENAMES = {
    "image3.jpeg": "holistic-anatomy.jpeg",
    "image6.png": "essential-air.png",
    "image7.png": "essential-food.png",
    "image8.png": "essential-water.png",
    "image9.png": "essential-sunshine.png",
    "image10.jpeg": "essential-earth-field.jpeg",
    "image11.png": "earth-magnetic-field-shield.png",
    "image12.png": "magnetic-field-weakening.png",
    # Superseded 2026-08-31: the client supplied a 2048x1397 copy of this same
    # chart, now at sources-of-radiation-hires.jpg. The mapping stays as the
    # record of where the original came from.
    "image13.png": "sources-of-radiation.png",
    "image15.png": "pemf-mimics-earth-field.png",
    "image18.png": "exagon-brain-banner.png",
    "image23.png": "passive-warmup.png",
    "image24.png": "rejuvenation.png",
    "image25.png": "performance.png",
    "image43.png": "spectrum-of-vitality.png",
    "image45.png": "why-low-frequency.png",
}


def main():
    z = zipfile.ZipFile(DOCX)
    for src, dest in RENAMES.items():
        data = z.read(f"word/media/{src}")
        with open(f"{OUT}/{dest}", "wb") as f:
            f.write(data)
        print(f"{src} -> {dest} ({len(data)} bytes)")
    print(f"\n{len(RENAMES)} images extracted")


if __name__ == "__main__":
    main()
