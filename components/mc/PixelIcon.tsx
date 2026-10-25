// 8x8 item sprites. Each letter maps to a palette colour; "." is transparent.
const PALETTE: Record<string, string> = {
  c: "#63c7c0",
  d: "#2f8f8a",
  w: "#f4f4f0",
  b: "#8a6239",
  n: "#5e4126",
  k: "#3a3a3a",
  p: "#7a5bc0",
  q: "#553c91",
  y: "#e2b93b",
  o: "#b8862a",
  g: "#a3a3a3",
  r: "#c9463d",
  e: "#47c27a",
  f: "#23864a",
};

const SPRITES = {
  pickaxe: [
    "..cccc..",
    "....ccc.",
    "....bcc.",
    "...b..c.",
    "..b...c.",
    ".b......",
    "b.......",
    "........",
  ],
  book: [
    ".pppppp.",
    ".pqqqqpw",
    ".pqyyqpw",
    ".pqyyqpw",
    ".pqqqqpw",
    ".pppppqw",
    ".pppppqw",
    "..wwwwww",
  ],
  chest: [
    "........",
    ".nnnnnn.",
    ".nbbbbn.",
    ".nnnnnn.",
    ".nbyybn.",
    ".nbbbbn.",
    ".nnnnnn.",
    "........",
  ],
  compass: [
    "..gggg..",
    ".gwwwwg.",
    "gwwwrwwg",
    "gwwrrwwg",
    "gwwkkwwg",
    "gwwkwwwg",
    ".gwwwwg.",
    "..gggg..",
  ],
  diamond: [
    "........",
    "..cccc..",
    ".cwcccc.",
    "cwcccccd",
    ".cccccd.",
    "..cccd..",
    "...cd...",
    "........",
  ],
  emerald: [
    "........",
    "...ee...",
    "..ewee..",
    ".eweeef.",
    ".eeeeef.",
    "..eeef..",
    "...ef...",
    "........",
  ],
  gold: [
    "........",
    "........",
    "..yyyy..",
    ".ywyyyo.",
    "yyyyyyoo",
    "oooooooo",
    "........",
    "........",
  ],
  star: [
    "...y....",
    "...y....",
    "..yoy...",
    "yyowoyy.",
    "..yoy...",
    ".y...y..",
    "y.....y.",
    "........",
  ],
  heart: [
    "........",
    ".rr..rr.",
    "rwrrrrrr",
    "rrrrrrrr",
    ".rrrrrr.",
    "..rrrr..",
    "...rr...",
    "........",
  ],
} satisfies Record<string, string[]>;

export type PixelIconName = keyof typeof SPRITES;

type PixelIconProps = {
  name: PixelIconName;
  size?: number;
  className?: string;
};

export function PixelIcon({ name, size = 32, className = "" }: PixelIconProps) {
  return (
    <svg
      className={`pixel-icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 8 8"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {SPRITES[name].flatMap((row, y) =>
        row.split("").map((cell, x) =>
          cell === "." ? null : <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={PALETTE[cell]} />
        )
      )}
    </svg>
  );
}
