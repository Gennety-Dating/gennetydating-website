#!/usr/bin/env python3
"""
Bake the blur + darkening of the landing-page pinned photo backgrounds directly
into JPG assets.

WHY: on iOS Safari with `viewport-fit=cover`, a runtime `filter: blur()` (and, to
a lesser degree, `opacity`) on the full-screen sticky background promotes it to a
GPU composite layer that WebKit does not repaint inside the notch / home-indicator
safe-area insets during scroll. The result is black bars at the top/bottom of the
screen over the photo sections. Baking the effect into an opaque image removes the
composite trigger entirely, so the background paints edge to edge.

The blend reproduces exactly what the CSS used to layer (sRGB compositing):
  section 1 (HowItWorks/Matchmaker): photo @0.55 over #111111, then a #111111 @0.45
    overlay  ->  0.3025*photo + 0.6975*#111111,  blur ~8px
  section 2 (Comparison/Testimonials/FAQ): photo @0.35 over #111111
    ->  0.35*photo + 0.65*#111111,  blur ~12px

Tweak `radius` (softness) and `photo_weight` (how much photo vs. #111111 base)
below and re-run:  python3 scripts/bake-photo-backgrounds.py
"""
from PIL import Image, ImageFilter

BASE = (17, 17, 17)  # #111111

# (source, destination, gaussian blur radius, photo weight 0..1)
JOBS = [
    ("public/images/matchmaker-works-bg.jpg",
     "public/images/matchmaker-works-bg-soft.jpg", 4, 0.3025),
    ("public/images/matchmaker-bg-1.jpg",
     "public/images/matchmaker-bg-1-soft.jpg", 5, 0.35),
    ("public/images/mobile-comparison-faq-bg.jpg",
     "public/images/mobile-comparison-faq-bg-soft.jpg", 12, 0.35),
]


def bake(src: str, dst: str, radius: float, photo_weight: float) -> None:
    blurred = Image.open(src).convert("RGB").filter(
        ImageFilter.GaussianBlur(radius=radius)
    )
    px = blurred.load()
    w, h = blurred.size
    base_weight = 1.0 - photo_weight
    br, bg, bb = BASE
    out = Image.new("RGB", (w, h))
    op = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            op[x, y] = (
                int(r * photo_weight + br * base_weight + 0.5),
                int(g * photo_weight + bg * base_weight + 0.5),
                int(b * photo_weight + bb * base_weight + 0.5),
            )
    out.save(dst, "JPEG", quality=86, optimize=True, progressive=True)
    print(f"baked {dst}  ({w}x{h})")


if __name__ == "__main__":
    for job in JOBS:
        bake(*job)
