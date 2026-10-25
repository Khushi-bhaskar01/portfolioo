import { BlockButton } from "./mc/BlockButton";
import { ItemSlot } from "./mc/ItemSlot";
import { PixelIcon } from "./mc/PixelIcon";

export function ResearchSection() {
  return (
    <section id="research" className="research section-stack reveal">
      <div className="section-kicker">RESEARCH / 04</div>

      <article className="tome">
        <ItemSlot className="tome-slot">
          <span className="tome-glint">
            <PixelIcon name="book" size={88} />
          </span>
        </ItemSlot>

        <div className="tome-body">
          <div className="tome-venue">ICICC 2026 · SPRINGER</div>
          <h3>Transformer-Based Sentiment Analysis Utilizing DistilBERT</h3>
          <div className="tome-tags">
            <span>+ DistilBERT</span>
            <span>+ IMDb</span>
            <span>+ NLP</span>
          </div>
          <BlockButton
            href="https://link.springer.com/chapter/10.1007/978-3-032-28307-8_18"
            target="_blank"
            rel="noreferrer"
            variant="ghost"
          >
            READ PAPER ↗
          </BlockButton>
        </div>
      </article>
    </section>
  );
}
