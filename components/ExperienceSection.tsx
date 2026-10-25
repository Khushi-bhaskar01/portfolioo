import { textures } from "./mc/textures";

// Newest role on the surface; each step down digs one layer deeper.
const items = [
  {
    company: "ChalksNBoard",
    role: "Software Developer Intern",
    period: "JUN — SEP 2026",
    text: "CRM workflows, real-time messaging and AI-assisted ops.",
    layer: textures.grassSide,
  },
  {
    company: "Policy Perspective Foundation",
    role: "Full Stack Developer Intern",
    period: "APR — JUL 2026",
    text: "Modernised the platform and shipped full-stack features.",
    layer: textures.dirt,
  },
  {
    company: "VaultOfCode",
    role: "Web Development Intern",
    period: "2025",
    text: "Responsive interfaces and production web practices.",
    layer: textures.stone,
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="experience section-stack reveal">
      <div className="section-kicker">EXPERIENCE / 03</div>

      <ol className="strata">
        {items.map((item) => (
          <li className="stratum" key={item.company}>
            <span className="stratum-block" style={{ backgroundImage: item.layer }} aria-hidden="true" />
            <span className="stratum-date">{item.period}</span>
            <div className="stratum-who">
              <h3>{item.company}</h3>
              <span>{item.role}</span>
            </div>
            <p>{item.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
