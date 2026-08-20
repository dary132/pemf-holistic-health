"""Generate the sports-health icon set and the small conceptual icons.

The three sports icons were one matched set in the client's deck (white figures
on black). They have to stay a set, so the figure is defined once here and each
icon adds only its own motif. Hand-writing three near-identical figures invites
them drifting apart.
"""

SAGE, CLAY, CREAM, INK = "#2F4A37", "#763A1D", "#FAF6EF", "#2A2E27"
FONT = "system-ui, -apple-system, Segoe UI, sans-serif"

HEAD = '  <circle cx="200" cy="96" r="27" fill="%s" />'
BODY = """  <g stroke="%s" stroke-width="15" stroke-linecap="round" fill="none">
    <path d="M200 130 V 236" />
    <path d="M156 160 H 244" />
    <path d="M156 160 L 132 224" />
    <path d="M244 160 L 268 224" />
    <path d="M172 236 H 228" />
    <path d="M172 236 L 160 320" />
    <path d="M228 236 L 240 320" />
  </g>"""


def frame(title, body):
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">\n'
        f"  <title>{title}</title>\n\n"
        '  <circle cx="200" cy="200" r="170" fill="#2F4A37" opacity="0.07" />\n\n'
        f"{body}\n"
        "</svg>\n"
    )


def write(name, title, body):
    open(f"public/images/{name}.svg", "w").write(frame(title, body))
    print("wrote", name)


# ---------------------------------------------------------------- passive warm-up
# Figure plus a rising column, for heat building without exertion.
write("passive-warmup", "Passive warm-up", "\n".join([
    '  <defs><marker id="pw-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" '
    f'markerHeight="5.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{CLAY}" /></marker></defs>',
    f'  <path d="M96 322 V 122" stroke="{CLAY}" stroke-width="16" stroke-linecap="round" '
    '        marker-end="url(#pw-a)" />',
    f'  <g stroke="{CLAY}" stroke-width="9" stroke-linecap="round" opacity="0.45">',
    '    <path d="M62 300 H 130" />',
    '    <path d="M62 258 H 130" />',
    '    <path d="M62 216 H 130" />',
    "  </g>",
    HEAD % SAGE,
    BODY % SAGE,
]))

# ---------------------------------------------------------------- rejuvenation
# Figure inside an unclosed loop, for recovery returning to a starting point.
write("rejuvenation", "Rejuvenation after activity", "\n".join([
    '  <defs><marker id="rj-a" viewBox="0 0 10 10" refX="7" refY="5" markerUnits="userSpaceOnUse" '
    f'markerWidth="30" markerHeight="30" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{CLAY}" /></marker></defs>',
    f'  <path d="M312 176 A 130 130 0 1 1 250 82" fill="none" stroke="{CLAY}" '
    '        stroke-width="15" stroke-linecap="round" marker-end="url(#rj-a)" />',
    HEAD % SAGE,
    BODY % SAGE,
]))

# ---------------------------------------------------------------- performance
# Figure beside a rising series. A gauge was tried first and rejected: at this
# size its arc crossed the figure's legs and the needle ran through the body.
write("performance", "Enhanced athletic performance", "\n".join([
    HEAD % SAGE,
    BODY % SAGE,
    f'  <g fill="{CLAY}">',
    '    <rect x="286" y="266" width="26" height="56" rx="7" opacity="0.45" />',
    '    <rect x="322" y="228" width="26" height="94" rx="7" opacity="0.7" />',
    '    <rect x="358" y="184" width="26" height="138" rx="7" />',
    "  </g>",
    f'  <path d="M276 326 H 392" stroke="{INK}" stroke-width="7" stroke-linecap="round" opacity="0.5" />',
]))

# ---------------------------------------------------------------- energy
# Two batteries, low and full, rather than a cartoon office worker.
write("energy-battery", "Energy levels rising from low to full", "\n".join([
    '  <defs><marker id="eb-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" '
    f'markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{CLAY}" /></marker></defs>',
    f'  <rect x="40" y="150" width="120" height="100" rx="14" fill="none" stroke="{INK}" stroke-width="9" />',
    f'  <rect x="160" y="180" width="16" height="40" rx="5" fill="{INK}" />',
    f'  <rect x="56" y="166" width="24" height="68" rx="6" fill="{CLAY}" opacity="0.85" />',
    f'  <path d="M186 200 H 226" stroke="{CLAY}" stroke-width="10" stroke-linecap="round" '
    '        marker-end="url(#eb-a)" />',
    f'  <rect x="240" y="150" width="120" height="100" rx="14" fill="none" stroke="{INK}" stroke-width="9" />',
    f'  <rect x="360" y="180" width="16" height="40" rx="5" fill="{INK}" />',
    f'  <g fill="{SAGE}">',
    '    <rect x="256" y="166" width="24" height="68" rx="6" />',
    '    <rect x="288" y="166" width="24" height="68" rx="6" />',
    '    <rect x="320" y="166" width="24" height="68" rx="6" />',
    "  </g>",
]))

# ---------------------------------------------------------------- stress meter
write("stress-meter", "A gauge showing stress levels from low to high", "\n".join([
    f'  <path d="M62 300 A 138 138 0 0 1 338 300" fill="none" stroke="{SAGE}" '
    '        stroke-width="30" stroke-linecap="round" opacity="0.25" />',
    f'  <path d="M62 300 A 138 138 0 0 1 140 175" fill="none" stroke="{SAGE}" stroke-width="30" stroke-linecap="round" />',
    f'  <path d="M140 175 A 138 138 0 0 1 260 175" fill="none" stroke="{CLAY}" stroke-width="30" opacity="0.5" />',
    f'  <path d="M260 175 A 138 138 0 0 1 338 300" fill="none" stroke="{CLAY}" stroke-width="30" stroke-linecap="round" />',
    f'  <path d="M200 300 L 286 206" stroke="{INK}" stroke-width="13" stroke-linecap="round" />',
    f'  <circle cx="200" cy="300" r="21" fill="{INK}" />',
    f'  <circle cx="200" cy="300" r="8" fill="{CREAM}" />',
    f'  <text x="52" y="344" font-family="{FONT}" font-size="25" fill="{INK}">Low</text>',
    f'  <text x="348" y="344" font-family="{FONT}" font-size="25" fill="{INK}" text-anchor="end">High</text>',
]))

# ---------------------------------------------------------------- brainwave entrainment
# Head in profile with a wave through it. The replaced file showed a brain with
# "Mental training (Brain Wave Entrainment)" burnt into the image, and its alt
# text described goggles that were not in the picture at all.
write("brainwave-entrainment", "A head in profile with a brainwave passing through it", "\n".join([
    f'  <path d="M138 300 V 250 C 96 232, 84 176, 112 138 C 146 92, 226 78, 268 112 '
    'C 312 148, 306 206, 278 226 L 278 262 C 278 280, 266 290, 248 290 L 232 290 '
    f'L 232 300 Z" fill="{SAGE}" />',
    f'  <path d="M126 190 L 152 190 L 168 150 L 190 234 L 212 172 L 228 208 L 258 208" '
    f'fill="none" stroke="{CREAM}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" />',
    f'  <g stroke="{CLAY}" stroke-width="9" stroke-linecap="round" opacity="0.55">',
    '    <path d="M310 154 C 330 176, 330 206, 310 228" />',
    '    <path d="M340 132 C 372 170, 372 212, 340 250" />',
    "  </g>",
]))
print("done")
