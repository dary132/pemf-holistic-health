#!/usr/bin/env python3
"""Extract and rename the images the 2026 document introduces.

The other 30 images in the document are already byte-identical to files in
public/images/ and are left alone. Run from the repo root:
    python3 scripts/extract-images.py
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
    "image13.png": "sources-of-radiation.png",
    "image15.png": "pemf-mimics-earth-field.png",
    "image18.png": "exagon-brain-banner.png",
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
