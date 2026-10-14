"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    const grid = document.querySelector<HTMLElement>(".scroll-grid");
    const gridMotion = gsap.matchMedia();
    const ornaments = gsap.utils.toArray<HTMLElement>(".scroll-ornament");

    if (grid) {
      gridMotion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(grid, {
          "--grid-x": "28px",
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        ornaments.forEach((ornament) => {
          const drift = Number(ornament.dataset.drift ?? 20);

          gsap.to(ornament, {
            x: drift,
            y: drift > 0 ? 34 : -34,
            rotate: drift > 0 ? 8 : -8,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.4,
              invalidateOnRefresh: true,
            },
          });
        });
      });
    }

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gridMotion.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="scroll-grid" aria-hidden="true">
        <div className="scroll-ornament ornament-left ornament-upper" data-drift="26">
          <span className="doodle doodle-sparkle"><i /></span>
          <span className="pixel-cluster pixel-cluster-a"><i /><i /><i /><i /><i /><i /></span>
        </div>
        <div className="scroll-ornament ornament-right ornament-upper" data-drift="-22">
          <span className="doodle doodle-orbit"><i /></span>
          <span className="pixel-cluster pixel-cluster-b"><i /><i /><i /><i /><i /><i /></span>
        </div>
        <div className="scroll-ornament ornament-left ornament-lower" data-drift="-18">
          <span className="doodle doodle-flower"><i /><i /><i /><i /><i /></span>
          <span className="pixel-cluster pixel-cluster-c"><i /><i /><i /><i /><i /><i /></span>
        </div>
        <div className="scroll-ornament ornament-right ornament-lower" data-drift="24">
          <span className="doodle doodle-github">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M12 .297a12 12 0 0 0-3.79 23.4c.6.111.82-.261.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.304.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.123-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 6.004 0c2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.805 5.625-5.476 5.92.43.372.814 1.102.814 2.222v3.293c0 .319.216.694.825.576A12.001 12.001 0 0 0 12 .297Z" />
            </svg>
          </span>
          <span className="pixel-cluster pixel-cluster-d"><i /><i /><i /><i /><i /><i /></span>
        </div>
      </div>
      {children}
    </>
  );
}