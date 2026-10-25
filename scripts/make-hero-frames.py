"""Render the hero "pixel portrait" video and slice it into WebP frames.

Frames 0-49:  pixel tiles fly in from 3D space and assemble into the portrait.
Frames 50-89: the portrait extrudes into a voxel relief while the camera orbits,
              then settles back to the flat, uncut portrait.

Usage (needs numpy, pillow, imageio-ffmpeg):
    python scripts/make-hero-frames.py
Outputs assets/hero.webm (source video) and public/hero/frames/hero_000.webp ...
"""
import math
import random
import shutil
import subprocess
import tempfile
from pathlib import Path

import imageio_ffmpeg
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "bw.png"
OUT = ROOT / "public" / "hero"
FRAMES_OUT = OUT / "frames"

CANVAS = 1000
IMAGE = 750
TILE = 25
GRID = IMAGE // TILE
FOCAL = 1400
ASSEMBLE = 50
ORBIT = 40
FPS = 30

random.seed(7)


def ease_out_cubic(t):
    return 1 - (1 - t) ** 3


def ease_in_out(t):
    return t * t * (3 - 2 * t)


def build_tiles():
    src = Image.open(SRC).convert("RGBA").resize((IMAGE, IMAGE), Image.NEAREST)
    lum = np.asarray(src.convert("L"), dtype=np.float32) / 255
    max_dist = math.hypot(GRID / 2, GRID / 2)
    tiles = []
    for gy in range(GRID):
        for gx in range(GRID):
            box = (gx * TILE, gy * TILE, gx * TILE + TILE, gy * TILE + TILE)
            x = box[0] + TILE / 2 - IMAGE / 2
            y = box[1] + TILE / 2 - IMAGE / 2
            dist = math.hypot(gx - GRID / 2, gy - GRID / 2) / max_dist
            tiles.append({
                "img": src.crop(box),
                "home": (x, y),
                "start": (x * 1.8 + random.uniform(-420, 420),
                          y * 1.8 + random.uniform(-420, 420),
                          random.uniform(-650, 2600)),
                "delay": dist * 0.45 + random.uniform(0, 0.12),
                "depth": float(lum[box[1]:box[3], box[0]:box[2]].mean()) * 80
                         + random.uniform(0, 12),
            })
    return tiles


def project(x, y, z, rot_y, rot_x):
    cy, sy = math.cos(rot_y), math.sin(rot_y)
    x, z = x * cy + z * sy, -x * sy + z * cy
    cx, sx = math.cos(rot_x), math.sin(rot_x)
    y, z = y * cx - z * sx, y * sx + z * cx
    scale = FOCAL / (FOCAL + z)
    return CANVAS / 2 + x * scale, CANVAS / 2 + y * scale, z, scale


def render(tiles, frame):
    canvas = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
    placed = []
    if frame < ASSEMBLE:
        t = frame / (ASSEMBLE - 1)
        for tile in tiles:
            local = min(max((t - tile["delay"]) / 0.43, 0), 1)
            k = ease_out_cubic(local)
            sx, sy, sz = tile["start"]
            hx, hy = tile["home"]
            x, y, z = sx + (hx - sx) * k, sy + (hy - sy) * k, sz * (1 - k)
            alpha = min(local / 0.3, 1)
            placed.append((tile, *project(x, y, z, 0, 0), alpha, 1.0))
    else:
        # Rise into the relief and settle back, so the last frames are the clean portrait.
        p = min((frame - ASSEMBLE) / (ORBIT - 6), 1)
        u = math.sin(math.pi * ease_in_out(p))
        for tile in tiles:
            hx, hy = tile["home"]
            z = -tile["depth"] * u
            placed.append((tile, *project(hx, hy, z, math.radians(-24) * u,
                                          math.radians(9) * u), 1.0, 1 - 0.08 * u))

    placed.sort(key=lambda p: -p[3])
    for tile, px, py, _z, scale, alpha, shrink in placed:
        if alpha <= 0:
            continue
        size = max(1, round(TILE * scale * shrink))
        img = tile["img"] if size == TILE else tile["img"].resize((size, size), Image.NEAREST)
        if alpha < 1:
            img = img.copy()
            img.putalpha(img.getchannel("A").point(lambda a: int(a * alpha)))
        canvas.alpha_composite(img, (round(px - size / 2), round(py - size / 2)))
    return canvas


def main():
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    tiles = build_tiles()
    OUT.mkdir(parents=True, exist_ok=True)
    if FRAMES_OUT.exists():
        shutil.rmtree(FRAMES_OUT)
    FRAMES_OUT.mkdir()

    with tempfile.TemporaryDirectory() as tmp:
        for frame in range(ASSEMBLE + ORBIT):
            render(tiles, frame).save(f"{tmp}/f_{frame:03d}.png")

        video = ROOT / "assets" / "hero.webm"
        video.parent.mkdir(exist_ok=True)
        subprocess.run([ffmpeg, "-y", "-loglevel", "error", "-framerate", str(FPS),
                        "-i", f"{tmp}/f_%03d.png", "-c:v", "libvpx-vp9",
                        "-pix_fmt", "yuva420p", "-b:v", "0", "-crf", "24",
                        "-auto-alt-ref", "0", str(video)], check=True)

    subprocess.run([ffmpeg, "-y", "-loglevel", "error", "-c:v", "libvpx-vp9",
                    "-i", str(video), "-vf", "scale=800:-1:flags=neighbor",
                    "-c:v", "libwebp", "-quality", "76", "-start_number", "0",
                    str(FRAMES_OUT / "hero_%03d.webp")], check=True)

    count = len(list(FRAMES_OUT.glob("*.webp")))
    print(f"wrote {video.relative_to(ROOT)} and {count} frames")


if __name__ == "__main__":
    main()
