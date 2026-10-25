// Seeded 8x8 pixel textures rendered to SVG data URIs, so server and client match and nothing is downloaded.
const SIZE = 8;

const random = (seed: number) => {
  let x = Math.imul(seed ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
};

type Pixel = (x: number, y: number, roll: number) => string;

const toUrl = (pixel: Pixel, seed: number) => {
  let rects = "";
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const fill = pixel(x, y, random(seed + y * SIZE + x));
      rects += `<rect x='${x}' y='${y}' width='1' height='1' fill='${fill}'/>`;
    }
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${SIZE} ${SIZE}' shape-rendering='crispEdges'>${rects}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

const pick = (palette: string[], roll: number) => palette[Math.floor(roll * palette.length)];

const GRASS = ["#8fae6b", "#86a463", "#98b775", "#7f9c5c"];
const DIRT = ["#9b7653", "#8d6a49", "#a57f5b", "#84623f"];
const STONE = ["#9a9a96", "#8e8e8a", "#a5a5a1", "#858581"];
const BEDROCK = ["#55575a", "#3f4144", "#6a6c6f", "#2f3133"];
const BARK = ["#7a5a3a", "#6b4e31", "#86653f"];
const LEAVES = ["#5f8a4a", "#557d42", "#6b9654", "#4c7039"];
const WATER = ["#5d86b0", "#6890b8", "#557ea6"];

// Grass reaches a few pixels down the side, ragged at the edge. `sideways` is for east faces, whose "up" points left.
const grassSide = (sideways: boolean): Pixel => (x, y, roll) => {
  const [along, depth] = sideways ? [y, x] : [x, y];
  const reach = 2 + (random(along + 40) < 0.45 ? 1 : 0);
  return depth < reach ? pick(GRASS, roll) : pick(DIRT, roll);
};

export const textures = {
  grassTop: toUrl((_x, _y, roll) => pick(GRASS, roll), 1),
  grassSide: toUrl(grassSide(false), 2),
  grassSideEast: toUrl(grassSide(true), 2),
  dirt: toUrl((_x, _y, roll) => pick(DIRT, roll), 3),
  stone: toUrl((_x, _y, roll) => pick(STONE, roll), 4),
  bedrock: toUrl((_x, _y, roll) => pick(BEDROCK, roll), 5),
  bark: toUrl((x, _y, roll) => pick(BARK, (roll + (x % 3 === 0 ? 0.5 : 0)) % 1), 6),
  leaves: toUrl((_x, _y, roll) => pick(LEAVES, roll), 7),
  water: toUrl((_x, _y, roll) => pick(WATER, roll), 8),
};
