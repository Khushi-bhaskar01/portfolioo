import { ItemSlot } from "./mc/ItemSlot";
import { PixelIcon, type PixelIconName } from "./mc/PixelIcon";

const focus: { label: string; icon: PixelIconName }[] = [
  { label: "FULL-STACK", icon: "pickaxe" },
  { label: "AI / ML", icon: "book" },
  { label: "BACKEND", icon: "chest" },
  { label: "PRODUCT", icon: "compass" },
];

export function AboutSection() {
  return (
    <section id="about" className="about section-stack reveal">
      <div className="section-kicker">ABOUT / 02</div>

      <div className="about-layout">
        <blockquote className="about-quote-mc">
          I don&apos;t just build interfaces. I build the systems behind them.
        </blockquote>

        <div className="about-side">
          <p className="about-line">
            B.Tech CSE (AI) at USICT, GGSIPU — building full-stack products and AI workflows.
          </p>

          <ul className="about-hotbar" aria-label="Focus areas">
            {focus.map((item) => (
              <li key={item.label}>
                <ItemSlot className="about-slot">
                  <PixelIcon name={item.icon} size={36} />
                </ItemSlot>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
