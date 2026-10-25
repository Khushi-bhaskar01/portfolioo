"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ASSEMBLED, FRAME_COUNT, getHeroFrames } from "./heroFrames";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Chars = ({ text }: { text: string }) => (
  <>
    {text.split("").map((c, i) => (
      <span key={i} className="char">
        {c === " " ? "\u00A0" : c}
      </span>
    ))}
  </>
);

// Frames 0-49 assemble the portrait, 50-89 turn it in 3D and settle back flat.
export function HeroSection({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const introRef = useRef<gsap.core.Timeline | null>(null);

  // The intro waits behind the loader and plays as the loader dissolves.
  useEffect(() => {
    if (ready) introRef.current?.play();
  }, [ready]);

  useGSAP(
    () => {
      // ---------- FRAME SEQUENCE ----------
      const canvas = root.current?.querySelector<HTMLCanvasElement>(".hero-frames canvas");
      const context = canvas?.getContext("2d");
      const sequence = { intro: 0, orbit: 0 };
      const frames = getHeroFrames();

      const render = () => {
        if (!canvas || !context) return;
        const index = sequence.intro < ASSEMBLED
          ? Math.round(sequence.intro)
          : ASSEMBLED + Math.round(sequence.orbit);
        const frame = frames[index];
        if (!frame.complete || !frame.naturalWidth) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(frame, 0, 0, canvas.width, canvas.height);
      };
      frames.forEach((frame) => frame.addEventListener("load", render, { once: true }));

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) sequence.intro = ASSEMBLED;
      render();

      // ---------- INTRO ----------
      const intro = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
      introRef.current = intro;

      intro
        .from(".hero-title-layer .char", {
          yPercent: 120,
          scale: 1.6,
          autoAlpha: 0,
          rotateX: -60,
          transformOrigin: "50% 100%",
          duration: 1.2,
          stagger: 0.05,
        })
        .to(
          sequence,
          {
            intro: ASSEMBLED,
            duration: reduceMotion ? 0 : 2.2,
            ease: "power2.out",
            onUpdate: render,
          },
          0.15
        )
        .from(".hero-badge", { y: -20, autoAlpha: 0, stagger: 0.15, duration: 0.8 }, 1.6)
        .from(".status-line", { x: -20, autoAlpha: 0, stagger: 0.25, duration: 0.5 }, "-=0.4");

      const media = gsap.matchMedia();
      media.add("(max-width: 800px)", () => {
        const copy = root.current?.querySelector<HTMLElement>(".hero-copy");
        const title = root.current?.querySelector<HTMLElement>(".hero-title-layer-mid");
        const heading = root.current?.querySelector<HTMLElement>(".hero-heading");
        if (!copy || !title || !heading) return;

        gsap.set(copy, { clearProps: "transform" });
        gsap.to(title, {
          autoAlpha: 0,
          yPercent: -18,
          scrollTrigger: {
            trigger: heading,
            start: "top 88%",
            end: "top 68%",
            scrub: true,
          },
        });
      });

      media.add("(min-width: 801px)", () => {
        const image = root.current?.querySelector<HTMLElement>(".hero-uploaded-image");
        const copy = root.current?.querySelector<HTMLElement>(".hero-copy");
        const visual = root.current?.querySelector<HTMLElement>(".hero-visual-wrap");
        if (!image || !copy || !visual) return;

        gsap.set(copy, { autoAlpha: 0, x: -64 });

        gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=100%",
            scrub: 1,
            pin: root.current,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          defaults: { ease: "none" },
        })
          .to(image, {
            x: () => Math.max(0, visual.clientWidth / 2 - 76 - image.offsetWidth / 2),
            scale: 0.94,
          }, 0)
          .to(visual, { backgroundPosition: "18px 0px" }, 0)
          .to(sequence, { orbit: FRAME_COUNT - 1 - ASSEMBLED, onUpdate: render }, 0)
          .to(copy, { autoAlpha: 1, x: 0 }, 0.27)
          .to(".hero-title-layer-top", { yPercent: -65, autoAlpha: 0 }, 0)
          .to(".hero-title-layer-mid", { yPercent: -45, autoAlpha: 0, duration: 0.24 }, 0)
          .to(".hero-title-layer-bottom", { yPercent: 55, autoAlpha: 0 }, 0)
          .to(".hero-badge", { autoAlpha: 0 }, 0);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="hero editorial-block hero-centered">
      <div className="hero-visual-wrap">
        <div className="hero-title-layer hero-title-layer-top"><Chars text="BUILDING" /></div>
        <div className="hero-title-layer hero-title-layer-mid"><Chars text="SYSTEMS" /></div>

        <div className="hero-portrait-stage">
          <div className="hero-badge">
            <span className="dot" /> OPEN TO BUILDING
          </div>
          <div className="hero-badge right-badge"> • NEW DELHI, INDIA</div>

          <div
            className="hero-uploaded-image hero-frames"
            role="img"
            aria-label="Grayscale pixel-art portrait of Khushi Bhaskar"
          >
            <canvas width={800} height={800} />
          </div>
        </div>

        <div className="hero-title-layer hero-title-layer-bottom"><Chars text="THAT THINK." /></div>

        <div className="hero-copy hero-copy-centered">
          <div className="eyebrow">SOFTWARE DEVELOPER • AI / ML • FULL-STACK </div>
          <h1 className="hero-heading">Khushi Bhaskar</h1>
          <p className="hero-subtitle">
            Third-year B.Tech CSE (AI) student building production systems, intelligent applications, and developer-focused products.
          </p>

          <div className="hero-actions">
            <a href="#work" className="primary-action">VIEW PROJECTS</a>
            <a href="#contact" className="secondary-action">LET&apos;S CONNECT</a>
          </div>

          <div className="status-panel">
            <div className="status-line">&gt; booting portfolio...</div>
            <div className="status-line">&gt; loading projects...</div>
            <div className="status-line">&gt; initializing AI systems...</div>
            <div className="status-line status-online">&gt; status: online</div>
          </div>
        </div>
      </div>
    </section>
  );
}