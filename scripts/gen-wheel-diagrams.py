"""Generate the two wheel diagrams. Hand-writing eight donut segments and six
rotated petals invites arithmetic slips that only show up as a crooked render,
so the geometry is computed instead."""
import math

SAGE, CLAY, CREAM, INK = "#2F4A37", "#763A1D", "#FAF6EF", "#2A2E27"
FONT = "system-ui, -apple-system, Segoe UI, sans-serif"


def pt(cx, cy, r, deg):
    a = math.radians(deg)
    return cx + r * math.cos(a), cy + r * math.sin(a)


def donut_segment(cx, cy, r_out, r_in, a0, a1):
    x0o, y0o = pt(cx, cy, r_out, a0)
    x1o, y1o = pt(cx, cy, r_out, a1)
    x1i, y1i = pt(cx, cy, r_in, a1)
    x0i, y0i = pt(cx, cy, r_in, a0)
    large = 1 if (a1 - a0) % 360 > 180 else 0
    return (f"M{x0o:.1f} {y0o:.1f} A{r_out} {r_out} 0 {large} 1 {x1o:.1f} {y1o:.1f} "
            f"L{x1i:.1f} {y1i:.1f} A{r_in} {r_in} 0 {large} 0 {x0i:.1f} {y0i:.1f} Z")


def anchor_for(deg):
    c = math.cos(math.radians(deg))
    if c > 0.34:
        return "start"
    if c < -0.34:
        return "end"
    return "middle"


# ---------------------------------------------------------------- eight dimensions
labels = ["Physical", "Emotional", "Intellectual", "Social",
          "Spiritual", "Vocational", "Financial", "Environmental"]
cx, cy, r_out, r_in = 450, 310, 172, 104
gap = 1.6
parts = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 620" width="900" height="620">',
    "  <title>The eight dimensions of wellness</title>",
]
for i, label in enumerate(labels):
    a0 = -90 + i * 45 + gap
    a1 = -90 + (i + 1) * 45 - gap
    fill = SAGE if i % 2 == 0 else CLAY
    op = 0.9 if i % 4 in (0, 1) else 0.62
    parts.append(f'  <path d="{donut_segment(cx, cy, r_out, r_in, a0, a1)}" '
                 f'fill="{fill}" opacity="{op}" />')
    mid = -90 + i * 45 + 22.5
    lx, ly = pt(cx, cy, r_out + 26, mid)
    parts.append(f'  <text x="{lx:.1f}" y="{ly:.1f}" font-family="{FONT}" font-size="25" '
                 f'fill="{INK}" text-anchor="{anchor_for(mid)}" '
                 f'dominant-baseline="middle">{label}</text>')
parts += [
    f'  <circle cx="{cx}" cy="{cy}" r="{r_in - 10}" fill="{CREAM}" stroke="{INK}" stroke-width="3" />',
    f'  <text x="{cx}" y="{cy - 20}" font-family="{FONT}" font-size="27" font-weight="600" '
    f'fill="{INK}" text-anchor="middle">Eight</text>',
    f'  <text x="{cx}" y="{cy + 10}" font-family="{FONT}" font-size="27" font-weight="600" '
    f'fill="{INK}" text-anchor="middle">Dimensions</text>',
    f'  <text x="{cx}" y="{cy + 40}" font-family="{FONT}" font-size="27" font-weight="600" '
    f'fill="{INK}" text-anchor="middle">of Wellness</text>',
    "</svg>",
]
open("public/images/eight-dimensions.svg", "w").write("\n".join(parts) + "\n")

# ---------------------------------------------------------------- holistic flower
petals = ["Physical", "Mental", "Emotional", "Intellectual", "Social", "Spiritual"]
cx, cy = 320, 320
parts = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="640" height="640">',
    "  <title>The six aspects of holistic health</title>",
]
for i, label in enumerate(petals):
    deg = -90 + i * 60
    px, py = pt(cx, cy, 132, deg)
    op = 0.9 if i % 2 == 0 else 0.72
    parts.append(f'  <ellipse cx="{px:.1f}" cy="{py:.1f}" rx="104" ry="66" '
                 f'fill="{SAGE}" opacity="{op}" transform="rotate({deg:.1f} {px:.1f} {py:.1f})" />')
for i, label in enumerate(petals):
    deg = -90 + i * 60
    # Labels sit at the petal's own centre, not beyond it. The vertical petals
    # are only 2*ry across, so "Intellectual" at 23px overflowed and clipped;
    # 20px clears the narrowest petal with room to spare.
    px, py = pt(cx, cy, 132, deg)
    parts.append(f'  <text x="{px:.1f}" y="{py:.1f}" font-family="{FONT}" font-size="20" '
                 f'font-weight="600" fill="{CREAM}" text-anchor="middle" '
                 f'dominant-baseline="middle">{label}</text>')
parts += [
    f'  <circle cx="{cx}" cy="{cy}" r="74" fill="{INK}" />',
    f'  <text x="{cx}" y="{cy - 11}" font-family="{FONT}" font-size="22" font-weight="700" '
    f'fill="{CREAM}" text-anchor="middle">HOLISTIC</text>',
    f'  <text x="{cx}" y="{cy + 17}" font-family="{FONT}" font-size="22" font-weight="700" '
    f'fill="{CREAM}" text-anchor="middle">HEALTH</text>',
    "</svg>",
]
open("public/images/holistic-flower.svg", "w").write("\n".join(parts) + "\n")
print("wrote eight-dimensions.svg and holistic-flower.svg")
