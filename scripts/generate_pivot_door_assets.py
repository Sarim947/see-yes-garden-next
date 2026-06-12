from pathlib import Path
from PIL import Image, ImageFilter, ImageOps, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "public/images/products/pivot-door"
SRC = BASE / "source"


def open_rgba(path: Path) -> Image.Image:
    return Image.open(path).convert("RGBA")


def cover(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    return ImageOps.fit(image.convert("RGB"), size, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5)).convert("RGBA")


def contain(image: Image.Image, size: tuple[int, int], bg=(255, 255, 255, 255), padding=0) -> Image.Image:
    canvas = Image.new("RGBA", size, bg)
    inner = (size[0] - padding * 2, size[1] - padding * 2)
    work = image.copy()
    work.thumbnail(inner, Image.Resampling.LANCZOS)
    x = (size[0] - work.width) // 2
    y = (size[1] - work.height) // 2
    canvas.alpha_composite(work, (x, y))
    return canvas


def make_door_cutout(path: Path) -> Image.Image:
    src = open_rgba(path)
    rgb = src.convert("RGB")
    px = rgb.load()
    w, h = rgb.size
    seen = set()
    stack = []

    def near_white(x: int, y: int) -> bool:
        r, g, b = px[x, y]
        return r > 238 and g > 238 and b > 238 and max(r, g, b) - min(r, g, b) < 18

    for x in range(w):
        if near_white(x, 0):
            stack.append((x, 0))
        if near_white(x, h - 1):
            stack.append((x, h - 1))
    for y in range(h):
        if near_white(0, y):
            stack.append((0, y))
        if near_white(w - 1, y):
            stack.append((w - 1, y))

    mask = Image.new("L", (w, h), 255)
    mask_px = mask.load()
    while stack:
        x, y = stack.pop()
        if (x, y) in seen or x < 0 or y < 0 or x >= w or y >= h:
            continue
        seen.add((x, y))
        if not near_white(x, y):
            continue
        mask_px[x, y] = 0
        stack.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))

    mask = mask.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.35))
    src.putalpha(mask)
    bbox = src.getbbox()
    return src.crop(bbox) if bbox else src


def soft_gradient(size: tuple[int, int]) -> Image.Image:
    w, h = size
    bg = Image.new("RGBA", size, "#f3f6f1")
    draw = ImageDraw.Draw(bg)
    for y in range(h):
        t = y / max(1, h - 1)
        r = int(245 - 26 * t)
        g = int(248 - 31 * t)
        b = int(244 - 27 * t)
        draw.line([(0, y), (w, y)], fill=(r, g, b, 255))
    return bg


def dark_product_backdrop(size: tuple[int, int]) -> Image.Image:
    w, h = size
    bg = Image.new("RGBA", size, "#092318")
    draw = ImageDraw.Draw(bg)
    for y in range(h):
        t = y / max(1, h - 1)
        r = int(8 + 15 * t)
        g = int(35 + 38 * t)
        b = int(24 + 22 * t)
        draw.line([(0, y), (w, y)], fill=(r, g, b, 255))
    draw.ellipse((-w * 0.2, -h * 0.25, w * 0.75, h * 0.65), fill=(30, 110, 66, 45))
    draw.ellipse((w * 0.45, h * 0.45, w * 1.25, h * 1.2), fill=(255, 255, 255, 24))
    return bg


def add_panel(canvas: Image.Image, xyxy: tuple[int, int, int, int], fill=(246, 249, 246, 235), outline=(255, 255, 255, 64)) -> None:
    overlay = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw.rounded_rectangle(xyxy, radius=38, fill=fill, outline=outline, width=2)
    canvas.alpha_composite(overlay)


def add_shadow(base: Image.Image, cutout: Image.Image, xy: tuple[int, int], blur=18, offset=(22, 28), opacity=100) -> None:
    alpha = cutout.getchannel("A")
    shadow = Image.new("RGBA", cutout.size, (0, 0, 0, opacity))
    shadow.putalpha(alpha.filter(ImageFilter.GaussianBlur(blur)))
    base.alpha_composite(shadow, (xy[0] + offset[0], xy[1] + offset[1]))


def place_door(canvas: Image.Image, door: Image.Image, box: tuple[int, int], center_x: float, bottom: int) -> Image.Image:
    work = door.copy()
    work.thumbnail(box, Image.Resampling.LANCZOS)
    x = int(canvas.width * center_x - work.width / 2)
    y = bottom - work.height
    add_shadow(canvas, work, (x, y))
    canvas.alpha_composite(work, (x, y))
    return canvas


def scene_background(size: tuple[int, int], source: Path) -> Image.Image:
    bg = cover(Image.open(source), size)
    bg = bg.filter(ImageFilter.GaussianBlur(1.2))
    overlay = Image.new("RGBA", size, (5, 38, 24, 70))
    bg.alpha_composite(overlay)
    return bg


def save(img: Image.Image, path: Path, quality=92) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.convert("RGB").save(path, quality=quality, optimize=True)


def paste_contain(canvas: Image.Image, image: Image.Image, box: tuple[int, int, int, int], shadow=True) -> None:
    x1, y1, x2, y2 = box
    work = image.convert("RGBA")
    scale = min((x2 - x1) / work.width, (y2 - y1) / work.height)
    work = work.resize((int(work.width * scale), int(work.height * scale)), Image.Resampling.LANCZOS)
    x = x1 + (x2 - x1 - work.width) // 2
    y = y1 + (y2 - y1 - work.height) // 2
    if shadow:
        shadow_img = Image.new("RGBA", work.size, (0, 0, 0, 120))
        shadow_img.putalpha(work.getchannel("A").filter(ImageFilter.GaussianBlur(18)))
        canvas.alpha_composite(shadow_img, (x + 16, y + 18))
    canvas.alpha_composite(work, (x, y))


def product_layout(source: Image.Image, size: tuple[int, int], crop_focus=(0.5, 0.5)) -> Image.Image:
    canvas = dark_product_backdrop(size)
    bg = cover(source, size).filter(ImageFilter.GaussianBlur(10))
    tint = Image.new("RGBA", size, (4, 28, 18, 135))
    bg.alpha_composite(tint)
    canvas.alpha_composite(bg)
    margin_x = int(size[0] * 0.055)
    margin_y = int(size[1] * 0.07)
    add_panel(canvas, (margin_x, margin_y, size[0] - margin_x, size[1] - margin_y))
    paste_contain(canvas, source, (margin_x + 35, margin_y + 35, size[0] - margin_x - 35, size[1] - margin_y - 35), shadow=True)
    return canvas


door_ref = SRC / "pivot-door-reference.jpg"
door = make_door_cutout(door_ref)
door.save(SRC / "pivot-door-cutout.png")
structure = open_rgba(SRC / "pivot-structure-reference.png")
parts = open_rgba(SRC / "pivot-parts-reference.png")
villa = BASE / "application-scenes/02-luxury-villa-scene.jpg"
ai_scene = SRC / "ai-integrated-scene.png"

# Product card and carousel 1 use the integrated scene when available.
if ai_scene.exists():
    integrated = open_rgba(ai_scene)
    save(cover(integrated, (1110, 600)), BASE / "product-card/pivot-door-card-desktop.jpg")
    save(cover(integrated, (630, 600)), BASE / "product-card/pivot-door-card-mobile.jpg")
    hero_desktop = cover(integrated, (1600, 1200))
    hero_mobile = cover(integrated, (1260, 1200))
    save(hero_desktop, BASE / "detail-carousel/desktop/01-scene-main.jpg")
    save(hero_mobile, BASE / "detail-carousel/mobile/01-scene-main-mobile.jpg")
else:
    desktop_card = scene_background((1110, 600), villa)
    desktop_card = place_door(desktop_card, door, (470, 560), 0.70, 590)
    save(desktop_card, BASE / "product-card/pivot-door-card-desktop.jpg")
    mobile_card = scene_background((630, 600), villa)
    mobile_card = place_door(mobile_card, door, (440, 560), 0.58, 590)
    save(mobile_card, BASE / "product-card/pivot-door-card-mobile.jpg")
    hero_desktop = scene_background((1600, 1200), villa)
    hero_desktop = place_door(hero_desktop, door, (820, 1120), 0.62, 1160)
    save(hero_desktop, BASE / "detail-carousel/desktop/01-scene-main.jpg")
    hero_mobile = scene_background((1260, 1200), villa)
    hero_mobile = place_door(hero_mobile, door, (820, 1120), 0.53, 1160)
    save(hero_mobile, BASE / "detail-carousel/mobile/01-scene-main-mobile.jpg")

# Carousel 2: white-background main product shot.
white_desktop = contain(door, (1600, 1200), bg=(255, 255, 255, 255), padding=90)
save(white_desktop, BASE / "detail-carousel/desktop/02-white-main.jpg")
white_mobile = contain(door, (1260, 1200), bg=(255, 255, 255, 255), padding=70)
save(white_mobile, BASE / "detail-carousel/mobile/02-white-main-mobile.jpg")

# Carousel 3 and 4: product-style layouts, not tiny images on blank white.
save(product_layout(structure, (1600, 1200)), BASE / "detail-carousel/desktop/03-pivot-structure.jpg")
save(product_layout(structure, (1260, 1200)), BASE / "detail-carousel/mobile/03-pivot-structure-mobile.jpg")
save(product_layout(parts, (1600, 1200)), BASE / "detail-carousel/desktop/04-pivot-hardware.jpg")
save(product_layout(parts, (1260, 1200)), BASE / "detail-carousel/mobile/04-pivot-hardware-mobile.jpg")

# Application scenes: normalize to 1200x900.
for file in [
    BASE / "application-scenes/01-office-workplace-scene.jpg",
    BASE / "application-scenes/02-luxury-villa-scene.jpg",
    BASE / "application-scenes/03-luxury-apartment-scene.jpg",
]:
    img = cover(Image.open(file), (1200, 900))
    save(img, file)

# Related product image: crop from carousel 1.
related = cover(hero_desktop, (930, 600))
save(related, BASE / "related-products/pivot-door-related.jpg")

print("Generated pivot door assets in", BASE)
