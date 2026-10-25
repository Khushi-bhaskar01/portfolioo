"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COLS = 32;
const ROWS = 4;
// Dense at the top, dissolving towards the bottom.
const DENSITY = [0.9, 0.6, 0.32, 0.12];

// Seeded so the server and client render the same pattern.
const random = (seed: number) => {
  let x = Math.imul(seed ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
};

const blocks = Array.from({ length: COLS * ROWS }, (_, index) => {
  const row = Math.floor(index / COLS);
  const filled = random(index + 1) < DENSITY[row];
  const ink = random(index + 101) < 0.18;
  return filled ? (ink ? "ink" : "accent") : "empty";
});

export function PixelWipe() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".pixel-wipe-block", {
          scale: 0,
          ease: "none",
          stagger: { each: 0.02, from: "random" },
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom 60%",
            scrub: 0.6,
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="pixel-wipe" aria-hidden="true">
      {blocks.map((tone, index) => (
        <i key={index} className={`pixel-wipe-block pixel-wipe-${tone}`} />
      ))}
    </div>
  );
}
