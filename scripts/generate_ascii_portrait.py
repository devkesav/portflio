#!/usr/bin/env python3
"""Regenerate theme-aware ASCII portraits from assets/source/portrait.png.

Pipeline:
  1. Crop x 5%-95%, y 0%-65%; pad transparent headroom to 4% above the hair.
  2. Remove the background with rembg; outside the subject stays blank.
  3. Grayscale -> bilateral (7, 40, 40) -> CLAHE (2.0, 8x8) -> gamma 0.8.
  4. Canny edges ONLY inside a feathered face mask (eyes/brows/nose/mouth/beard).
  5. Gaussian blur sigma 0.7 -> INTER_AREA resize to the monospace grid.
  6. Dark theme: bright = dense. Light theme: 1 - gray, so dark = dense.
     No CSS invert filter is used; each theme gets its own .txt file.

Rows use the measured JetBrains Mono cell aspect: advance width 0.6em,
line-height 1em => rows = cols * (img_h / img_w) * 0.6.

Usage:
  python scripts/generate_ascii_portrait.py --cols 170
  python scripts/generate_ascii_portrait.py --cols 190 --ramp old \
      --output-dark /tmp/190d.txt --output-light /tmp/190l.txt

Dependencies:
  pip install pillow numpy rembg opencv-python-headless onnxruntime
  YuNet face detector model is bundled at assets/models/yunet.onnx.
"""

import argparse
import math
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from rembg import new_session, remove

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_SOURCE = ROOT / "assets" / "source" / "portrait.png"
DEFAULT_OUTPUT_DARK = ROOT / "src" / "data" / "portrait-dark.txt"
DEFAULT_OUTPUT_LIGHT = ROOT / "src" / "data" / "portrait-light.txt"
FACE_MODEL = ROOT / "assets" / "models" / "yunet.onnx"

RAMP_NEW = " .'`^,:;il!~+*ox%#@&"
RAMP_OLD = " .:-=+*#%@"
DEFAULT_CROP = (0.05, 0.0, 0.95, 0.65)
HEADROOM_FRACTION = 0.04
CHAR_ASPECT = 0.6  # measured in Chromium: JetBrains Mono advance 60px @ 100px
FALLBACK_FACE = (0.318, 0.217, 0.327, 0.573)  # x, y, w, h fractions of padded crop


def prepare_crop(source: Path, crop, session):
    """Cut out the subject, then pad transparent headroom above the hair."""
    image = Image.open(source).convert("RGBA")
    width, height = image.size
    x0, y0, x1, y1 = crop
    box = (round(width * x0), round(height * y0), round(width * x1), round(height * y1))
    cropped = image.crop(box)

    cutout = remove(cropped, session=session)
    rgb = np.asarray(cutout.convert("RGB"))
    alpha = np.asarray(cutout)[:, :, 3]

    fg = alpha > 128
    rows = np.where(fg)[0]
    top = int(rows.min()) if rows.size else 0
    wanted = math.ceil(cropped.height * HEADROOM_FRACTION)
    pad = max(0, wanted - top)

    if pad:
        rgb = np.pad(rgb, ((pad, 0), (0, 0), (0, 0)), mode="constant", constant_values=0)
        alpha = np.pad(alpha, ((pad, 0), (0, 0)), mode="constant", constant_values=0)

    return Image.fromarray(rgb), alpha


def find_face(rgb: np.ndarray):
    """Locate the face for the feature-only edge mask."""
    height, width = rgb.shape[:2]
    if FACE_MODEL.exists():
        try:
            gray = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)
            detector = cv2.FaceDetectorYN_create(
                str(FACE_MODEL), "", (width, height), 0.5, 0.3, 5000
            )
            _, faces = detector.detect(gray)
            if faces is not None and len(faces):
                face = max(faces, key=lambda f: f[2] * f[3])
                return tuple(float(v) for v in face[:4])
        except cv2.error:
            pass

    fx, fy, fw, fh = FALLBACK_FACE
    return fx * width, fy * height, fw * width, fh * height


def face_feature_mask(shape, face) -> np.ndarray:
    """Feathered ellipse covering facial features, never the suit or shirt."""
    height, width = shape
    fx, fy, fw, fh = face
    cx = fx + fw * 0.5
    cy = fy + fh * 0.50
    rx = fw * 0.46
    ry = fh * 0.40

    yy, xx = np.ogrid[:height, :width]
    ellipse = (((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2) <= 1.0
    mask = (ellipse.astype(np.uint8) * 255)
    radius = max(3.0, fw * 0.04)
    return cv2.GaussianBlur(mask, (0, 0), radius).astype(np.float32) / 255.0


def to_lines(values: np.ndarray, ramp: str) -> list[str]:
    levels = len(ramp) - 1
    index = np.clip(np.rint(values * levels).astype(int), 0, levels)
    return ["".join(ramp[i] for i in row) for row in index]


def build(cols: int, ramp: str, source: Path, session, crop=DEFAULT_CROP) -> tuple[list[str], list[str]]:
    rgb_image, alpha = prepare_crop(source, crop, session)
    rgb = np.asarray(rgb_image)
    fg = alpha > 128

    gray = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)
    gray = cv2.bilateralFilter(gray, d=7, sigmaColor=40, sigmaSpace=40)

    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8)).apply(gray)
    base = (clahe.astype(np.float32) / 255.0) ** 0.8

    edges = cv2.Canny(clahe, 60, 140).astype(np.float32) / 255.0
    edges *= face_feature_mask(gray.shape, find_face(rgb))
    edges *= 0.62

    dark = np.clip(base + edges, 0, 1)
    # Light ink: invert only the subject before adding edges so edges stay dense.
    light = np.clip((1.0 - base) + edges, 0, 1)

    dark[~fg] = 0
    light[~fg] = 0
    dark = cv2.GaussianBlur(dark, (0, 0), 0.7)
    light = cv2.GaussianBlur(light, (0, 0), 0.7)
    dark[~fg] = 0
    light[~fg] = 0

    crop_h, crop_w = gray.shape
    # Preserve a full-height, recognizable portrait instead of stretching the
    # CSS line-height.
    rows = max(1, round(cols * (crop_h / crop_w) * CHAR_ASPECT * 1.30))
    target = (cols, rows)

    alpha_small = cv2.resize(
        (fg.astype(np.uint8) * 255), target, interpolation=cv2.INTER_AREA
    ).astype(np.float32) / 255.0

    outputs = []
    for values in (dark, light):
        small = cv2.resize(
            (values * 255).astype(np.uint8), target, interpolation=cv2.INTER_AREA
        ).astype(np.float32) / 255.0
        masked = small * alpha_small
        ys, xs = np.where(masked > 0.01)
        if xs.size:
            x0, x1 = xs.min(), xs.max() + 1
            y0, y1 = ys.min(), ys.max() + 1
            masked = masked[y0:y1, x0:x1]
        outputs.append(to_lines(masked, ramp))

    return outputs[0], outputs[1]


def preview(lines: list[str], path: Path, font_size: int = 6) -> None:
    font_paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf",
    ]
    font_path = next((p for p in font_paths if Path(p).exists()), None)
    font = ImageFont.truetype(font_path, font_size) if font_path else ImageFont.load_default()
    char_w = font.getlength("M")
    canvas = Image.new(
        "RGB",
        (round(char_w * len(lines[0])) + 24, round(font_size * len(lines)) + 24),
        "#0a0a0a",
    )
    draw = ImageDraw.Draw(canvas)
    for row, line in enumerate(lines):
        draw.text((12, 12 + row * font_size), line, font=font, fill="#e5e5e5")
    canvas.save(path)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, default=DEFAULT_SOURCE)
    parser.add_argument("--output-dark", type=Path, default=DEFAULT_OUTPUT_DARK)
    parser.add_argument("--output-light", type=Path, default=DEFAULT_OUTPUT_LIGHT)
    parser.add_argument("--cols", type=int, default=170)
    parser.add_argument("--crop", type=float, nargs=4, default=DEFAULT_CROP)
    parser.add_argument("--ramp", choices=("new", "old"), default="new")
    parser.add_argument("--preview", type=Path)
    args = parser.parse_args()

    ramp = RAMP_NEW if args.ramp == "new" else RAMP_OLD
    session = new_session("u2net")
    dark, light = build(args.cols, ramp, args.source, session, tuple(args.crop))

    for path, lines in ((args.output_dark, dark), (args.output_light, light)):
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text("\n".join(lines) + "\n")
        print(f"{path}: {len(lines[0])}x{len(lines)}")

    if args.preview:
        preview(dark, args.preview)
        print(f"preview: {args.preview}")


if __name__ == "__main__":
    main()
