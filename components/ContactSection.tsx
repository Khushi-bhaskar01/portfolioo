import { BlockButton } from "./mc/BlockButton";

export function ContactSection() {
  return (
    <section id="contact" className="contact section-stack reveal">
      <div className="section-kicker">CONTACT / 07</div>

      <div className="contact-mc">
        <h2>Let&apos;s build something useful.</h2>
        <p>Open to internships and research collaborations.</p>
        <div className="contact-buttons">
          <BlockButton href="mailto:khushibhaskar.2006@gmail.com">EMAIL</BlockButton>
          <BlockButton href="https://github.com/Khushi-bhaskar01" target="_blank" rel="noreferrer" variant="ghost">
            GITHUB ↗
          </BlockButton>
          <BlockButton
            href="https://www.linkedin.com/in/khushi-bhaskar-b00586324/"
            target="_blank"
            rel="noreferrer"
            variant="ghost"
          >
            LINKEDIN ↗
          </BlockButton>
        </div>
      </div>
    </section>
  );
}
