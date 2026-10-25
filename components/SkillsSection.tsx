"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ItemSlot } from "./mc/ItemSlot";
import { PixelIcon, type PixelIconName } from "./mc/PixelIcon";

gsap.registerPlugin(useGSAP);

type KnowledgeGroup = {
  title: string;
  icon: PixelIconName;
  items: string[];
};

type SkillsSectionProps = {
  knowledgeAreas: KnowledgeGroup[];
};

// Items fill the crafting grid in a pickaxe pattern: top row, then down the middle.
const RECIPE = [0, 1, 2, 4, 7];

export function SkillsSection({ knowledgeAreas }: SkillsSectionProps) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const group = knowledgeAreas[active];

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".craft-item", { scale: 0.4, autoAlpha: 0, duration: 0.35, ease: "back.out(2)", stagger: 0.05 });
        gsap.from(".craft-output .pixel-icon", { scale: 0, rotate: -20, duration: 0.5, delay: 0.25, ease: "back.out(2)" });
      });
    },
    { scope: root, dependencies: [active] }
  );

  return (
    <section ref={root} id="stack" className="stack section-stack reveal">
      <div className="section-kicker">STACK / 05</div>

      <div className="crafting">
        <div className="craft-tabs" role="tablist" aria-label="Skill categories">
          {knowledgeAreas.map((area, index) => (
            <button
              key={area.title}
              type="button"
              role="tab"
              aria-selected={index === active}
              className={`craft-tab${index === active ? " is-active" : ""}`}
              onClick={() => setActive(index)}
            >
              {area.title}
            </button>
          ))}
        </div>

        <div className="craft-table" role="tabpanel" aria-label={group.title}>
          <div className="craft-grid">
            {Array.from({ length: 9 }, (_, cell) => {
              const item = group.items[RECIPE.indexOf(cell)];
              return (
                <ItemSlot className="craft-slot" key={cell}>
                  {item && <span className="craft-item">{item}</span>}
                </ItemSlot>
              );
            })}
          </div>

          <span className="craft-arrow" aria-hidden="true" />

          <div className="craft-output">
            <ItemSlot className="craft-output-slot">
              <PixelIcon name={group.icon} size={56} />
            </ItemSlot>
            <span>{group.title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
