"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FRAME_COUNT, onHeroFramesProgress } from "./heroFrames";

gsap.registerPlugin(useGSAP);

const BLOCK = 96;

type Grid = { cols: number; rows: number };

export function Loader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<Grid | null>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setGrid({
      cols: Math.ceil(window.innerWidth / BLOCK),
      rows: Math.ceil(window.innerHeight / BLOCK),
    });
  }, []);

  useGSAP(
    () => {
      if (!grid) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const counter = { value: 0 };
      let target = 0;
      let exiting = false;

      gsap.from(".boot-line-h", { scaleX: 0, duration: 1, ease: "power3.inOut", stagger: 0.12 });
      gsap.from(".boot-line-v", { scaleY: 0, duration: 1, ease: "power3.inOut", stagger: 0.12 });
      gsap.from(".boot-cross, .boot-notch, .boot-hud", {
        autoAlpha: 0,
        duration: 0.5,
        delay: 0.6,
        stagger: 0.04,
      });

      const unsubscribe = onHeroFramesProgress((progress) => {
        target = progress;
      });
      // Never trap the visitor behind a slow network.
      const fallback = window.setTimeout(() => (target = 1), 8000);

      const exit = () => {
        exiting = true;
        unsubscribe();
        const exitTimeline = gsap.timeline();
        if (reduceMotion) {
          exitTimeline.to(root.current, { autoAlpha: 0, duration: 0.3, onComplete: onDone });
          return;
        }
        // Start the hero as the blocks fall away, so the portrait assembles behind them.
        exitTimeline
          .to(".boot-content", { autoAlpha: 0, y: -24, duration: 0.45, ease: "power2.in" })
          .set(root.current, { backgroundColor: "transparent" })
          .call(onDone)
          .to(".boot-block", {
            autoAlpha: 0,
            duration: 0.01,
            stagger: { grid: [grid.rows, grid.cols], from: "random", amount: 0.9 },
          })
          .set(root.current, { display: "none" });
      };

      // Count smoothly toward real progress, never faster than ~1.4s for the full run.
      const tick = () => {
        if (exiting) return;
        const step = Math.min(gsap.ticker.deltaRatio() * 1.2, target * 100 - counter.value);
        if (step > 0) counter.value += step;
        setPercent(Math.floor(counter.value));
        if (counter.value >= 100) exit();
      };
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        window.clearTimeout(fallback);
        unsubscribe();
      };
    },
    { scope: root, dependencies: [grid] }
  );

  const frames = Math.round((percent / 100) * FRAME_COUNT);

  return (
    <div ref={root} className="boot" aria-live="polite" aria-label={`Loading ${percent}%`}>
      {grid && (
        <div
          className="boot-blocks"
          style={{ gridTemplateColumns: `repeat(${grid.cols}, 1fr)`, gridTemplateRows: `repeat(${grid.rows}, 1fr)` }}
          aria-hidden="true"
        >
          {Array.from({ length: grid.cols * grid.rows }, (_, index) => (
            <i key={index} className="boot-block" />
          ))}
        </div>
      )}

      <div className="boot-content" aria-hidden="true">
        <span className="boot-line-h" style={{ top: "33.333%" }} />
        <span className="boot-line-h" style={{ top: "66.666%" }} />
        <span className="boot-line-v" style={{ left: "33.333%" }} />
        <span className="boot-line-v" style={{ left: "66.666%" }} />
        {["33.333% 33.333%", "33.333% 66.666%", "66.666% 33.333%", "66.666% 66.666%"].map((position) => {
          const [top, left] = position.split(" ");
          return <span key={position} className="boot-cross" style={{ top, left }} />;
        })}
        <span className="boot-notch boot-notch-top" />
        <span className="boot-notch boot-notch-bottom" />
        <span className="boot-notch boot-notch-left" />
        <span className="boot-notch boot-notch-right" />

        <span className="boot-hud boot-hud-tl">KB / DEV</span>
        <span className="boot-hud boot-hud-tr">NEW DELHI, IN — 28.61° N, 77.21° E</span>
        <span className="boot-hud boot-hud-bl">BOOTING PORTFOLIO</span>
        <span className="boot-hud boot-hud-br">FRAMES {String(frames).padStart(2, "0")} / {FRAME_COUNT}</span>

        <strong className="boot-count">{String(percent).padStart(2, "0")}%</strong>
      </div>
    </div>
  );
}
