#!/usr/bin/env python3
"""Extract all prose from the client document into a committed plaintext file.

The output is the source of truth for scripts/verify-copy.mjs. Regenerate with:
    python3 scripts/extract-doc.py
Text baked into images is NOT in document.xml; that lives in the hand-written
companion file docs/exiga-jasmin-2026-image-text.txt.

On xml.etree: this is a developer script run by hand against a document the
client sent us, never against untrusted input and never on a server, so the
stdlib parser is appropriate here. If this ever parses a file from an unknown
source, switch to defusedxml first -- stdlib ElementTree is vulnerable to
entity-expansion denial of service.
"""
import zipfile
from xml.etree import ElementTree as ET

DOCX = "Website Exiga Jasmin 2026.docx"
OUT = "docs/exiga-jasmin-2026.txt"
W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


def paragraph_text(p):
    out = []
    for node in p.iter():
        if node.tag == W + "t":
            out.append(node.text or "")
        elif node.tag in (W + "tab", W + "br"):
            out.append(" ")
    return "".join(out)


def main():
    z = zipfile.ZipFile(DOCX)
    doc = ET.fromstring(z.read("word/document.xml"))
    lines = []
    for p in doc.iter(W + "p"):
        text = paragraph_text(p).strip()
        if text:
            lines.append(text)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
    print(f"{len(lines)} paragraphs -> {OUT}")


if __name__ == "__main__":
    main()
