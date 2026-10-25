"use client";
import { useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BlockButton } from "./mc/BlockButton";
import { ItemSlot } from "./mc/ItemSlot";
import { ItemTooltip, moveTooltip, type TooltipItem } from "./mc/ItemTooltip";
import { Voxel } from "./mc/Voxel";
import { textures } from "./mc/textures";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type Project = {
  number: string;
  kind: string;
  title: string;
  text: string;
  stack: string;
  color: string;
  image: string;
  href?: string;
};

type WorkSectionProps = {
  projects: Project[];
};

// Island heightmap: digits are grass height, "w" is water, "." is empty.
const TERRAIN = [
  "..2221111...",
  ".222211111..",
  "112211111111",
  "111111111111",
  "11111111111w",
  "1111111111ww",
  ".11111111www",
  "..1111111ww.",
  "...11111....",
];
const COLS = TERRAIN[0].length;
const ROWS = TERRAIN.length;
const WATER_LEVEL = 0.8;

// Where each project block sits (top-left cell of its 2x2 footprint).
const PLOTS = [
  { x: 1, y: 3 },
  { x: 5, y: 2 },
  { x: 8, y: 3 },
  { x: 4, y: 6 },
];
const TREES = [
  { x: 2, y: 1 },
  { x: 9, y: 1 },
];

const heightAt = (x: number, y: number) => {
  const cell = TERRAIN[y]?.[x];
  if (!cell || cell === ".") return 0;
  return cell === "w" ? WATER_LEVEL : Number(cell);
};

const side = (edge: string, sideways = false): CSSProperties => ({
  backgroundImage: `${edge}, ${textures.stone}, ${textures.dirt}`,
  backgroundRepeat: sideways ? "repeat-y, repeat-y, repeat" : "repeat-x, repeat-x, repeat",
  backgroundPosition: sideways ? "left, right, 0 0" : "top, bottom, 0 0",
});

const GROUND = { top: { backgroundImage: textures.grassTop }, south: side(textures.grassSide), east: side(textures.grassSideEast, true) };
const WATER = { top: { backgroundImage: textures.water }, south: { backgroundImage: textures.water }, east: { backgroundImage: textures.water } };
const BARK = { top: { backgroundImage: textures.bark }, south: { backgroundImage: textures.bark }, east: { backgroundImage: textures.bark } };
const LEAVES = { top: { backgroundImage: textures.leaves }, south: { backgroundImage: textures.leaves }, east: { backgroundImage: textures.leaves } };

// Columns start one unit below the surface so the island's cliffs show dirt and stone.
const terrain = TERRAIN.flatMap((row, y) =>
  row.split("").flatMap((cell, x) => {
    if (cell === ".") return [];
    const top = heightAt(x, y);
    return [{
      key: `${x}-${y}`,
      x, y, h: top + 1,
      faces: cell === "w" ? WATER : GROUND,
      showSouth: heightAt(x, y + 1) < top,
      showEast: heightAt(x + 1, y) < top,
    }];
  })
);

const toTooltipItem = (project: Project): TooltipItem => ({
  title: project.title,
  subtitle: project.kind,
  source: "Click to inspect",
});

export function WorkSection({ projects }: WorkSectionProps) {
  const root = useRef<HTMLElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const tooltip = useRef<HTMLDivElement>(null);
  const tilt = useRef<(event: ReactPointerEvent) => void>(() => {});
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const project = projects[active];

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".world .vx-body", {
          z: 360,
          duration: 0.7,
          ease: "bounce.out",
          stagger: { each: 0.008, from: "random" },
          clearProps: "transform",
          scrollTrigger: { trigger: ".world-viewport", start: "top 75%", once: true },
        });

        // Small orbit following the pointer; the CSS transform reads these variables.
        const camera = { rx: 58, rz: 38 };
        const apply = () => {
          world.current?.style.setProperty("--rx", `${camera.rx}deg`);
          world.current?.style.setProperty("--rz", `${camera.rz}deg`);
        };
        tilt.current = (event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width - 0.5;
          const py = (event.clientY - rect.top) / rect.height - 0.5;
          gsap.to(camera, { rz: 38 + px * 16, rx: 58 - py * 6, duration: 0.8, ease: "power3.out", overwrite: true, onUpdate: apply });
        };

        return () => {
          tilt.current = () => {};
        };
      });
    },
    { scope: root }
  );

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".inspect-body > *", { y: 12, autoAlpha: 0, duration: 0.4, ease: "power2.out", stagger: 0.05 });
      });
    },
    { scope: root, dependencies: [active] }
  );

  const hoverHandlers = (index: number) => ({
    onPointerEnter: (event: ReactPointerEvent) => {
      if (event.pointerType !== "mouse") return;
      setHovered(index);
      const native = event.nativeEvent;
      requestAnimationFrame(() => moveTooltip(tooltip.current, native));
    },
    onPointerMove: (event: ReactPointerEvent) => moveTooltip(tooltip.current, event.nativeEvent),
    onPointerLeave: () => setHovered(null),
    onClick: () => setActive(index),
  });

  return (
    <section ref={root} id="work" className="work section-stack reveal">
      <div className="section-header">
        <div className="section-kicker">SELECTED WORK / 01</div>
        <div className="mc-hint">HOVER A BLOCK · CLICK TO INSPECT</div>
      </div>

      <div className="work-layout">
        <div className="world-column">
          <div
            className="world-viewport"
            aria-hidden="true"
            onPointerMove={(event) => tilt.current(event)}
          >
            <div ref={world} className="world" style={{ "--cols": COLS, "--rows": ROWS } as CSSProperties}>
              {terrain.map(({ key, ...column }) => (
                <Voxel key={key} z={-1} {...column} />
              ))}

              {TREES.map(({ x, y }) => {
                const base = heightAt(x, y);
                return [
                  <Voxel key={`trunk-${x}`} x={x} y={y} z={base} h={3} faces={BARK} />,
                  <Voxel key={`leaves-${x}`} x={x - 1} y={y - 1} z={base + 2.5} w={3} d={3} h={2} faces={LEAVES} className="vx-leaves" />,
                ];
              })}

              {projects.slice(0, PLOTS.length).map((item, index) => {
                const { x, y } = PLOTS[index];
                const color = { backgroundColor: item.color };
                return (
                  <Voxel
                    key={item.title}
                    x={x}
                    y={y}
                    z={heightAt(x, y)}
                    w={2}
                    d={2}
                    h={2}
                    className={`vx-project${index === active ? " is-active" : ""}`}
                    faces={{ top: color, south: { ...color, backgroundImage: `url(${item.image})` }, east: color }}
                    top={<span className="vx-project-number">{item.number}</span>}
                    {...hoverHandlers(index)}
                  />
                );
              })}
            </div>
          </div>

          <div className="hotbar" role="group" aria-label="Choose a project">
            {projects.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={`hotbar-slot${index === active ? " is-active" : ""}`}
                aria-pressed={index === active}
                aria-label={item.title}
                onClick={() => setActive(index)}
              >
                <Image src={item.image} alt="" fill sizes="64px" />
                <span className="hotbar-number">{item.number}</span>
              </button>
            ))}
          </div>
        </div>

        <aside className="inspect" aria-live="polite">
          <div className="inspect-body" key={project.title}>
            <ItemSlot className="inspect-slot">
              <div className="inspect-image">
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  sizes="(max-width: 900px) calc(100vw - 48px), 420px"
                />
              </div>
            </ItemSlot>
            <div className="inspect-meta">#{project.number} · {project.kind}</div>
            <h3 className="inspect-title">{project.title}</h3>
            <p className="inspect-text">{project.text}</p>
            <div className="inspect-tags">
              {project.stack.split(" /").slice(0, 3).map((tag) => (
                <span key={tag}>+ {tag.trim()}</span>
              ))}
            </div>
            {project.href && (
              <BlockButton href={project.href} target="_blank" rel="noreferrer">
                OPEN PROJECT ↗
              </BlockButton>
            )}
          </div>
        </aside>
      </div>

      <ItemTooltip ref={tooltip} item={hovered === null ? null : toTooltipItem(projects[hovered])} />
    </section>
  );
}
