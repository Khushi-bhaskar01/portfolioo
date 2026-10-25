import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

type VoxelProps = HTMLAttributes<HTMLDivElement> & {
  x: number;
  y: number;
  z?: number;
  w?: number;
  d?: number;
  h?: number;
  top?: ReactNode;
  south?: ReactNode;
  east?: ReactNode;
  faces?: { top?: CSSProperties; south?: CSSProperties; east?: CSSProperties };
  showSouth?: boolean;
  showEast?: boolean;
};

// A box in the world grid. Only the three faces the camera can see are rendered: top, south (+y) and east (+x).
// Sizes are in grid units; the parent `.world` sets the unit length through --u.
export function Voxel({
  x, y, z = 0, w = 1, d = 1, h = 1,
  top, south, east, faces = {},
  showSouth = true, showEast = true,
  className = "", style, ...props
}: VoxelProps) {
  const vars = { "--x": x, "--y": y, "--z": z, "--w": w, "--d": d, "--h": h } as CSSProperties;

  return (
    <div className={`vx ${className}`.trim()} style={{ ...vars, ...style }} {...props}>
      <div className="vx-body">
        <div className="vx-face vx-top" style={faces.top}>{top}</div>
        {showSouth && <div className="vx-face vx-south" style={faces.south}>{south}</div>}
        {showEast && <div className="vx-face vx-east" style={faces.east}>{east}</div>}
      </div>
    </div>
  );
}
