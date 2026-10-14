const items = [
  {
    company: "CHALKSNBOARD",
    role: "Software Developer Intern",
    period: "Jun 2026 — Sep 2026",
    text: "Built production CRM workflows, real-time communication flows, AI-assisted operations, and backend services supporting large-scale lead operations.",
  },
  {
    company: "POLICY PERSPECTIVE FOUNDATION",
    role: "Full Stack Developer Intern",
    period: "Apr 2026 — Jul 2026",
    text: "Modernized internal product architecture and shipped full-stack functionality for a public-interest platform focused on accessibility and delivery.",
  },
  {
    company: "VAULTOFCODE",
    role: "Web Development Intern",
    period: "2025",
    text: "Built responsive web interfaces and product experiences while learning production-focused software engineering practices.",
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="experience section-stack reveal">
      <div className="section-header compact">
        <div className="section-kicker">FROM CODE TO PRODUCTION / 03</div>
      </div>

      <div className="timeline">
        {items.map((item) => (
          <article className="timeline-item" key={item.company}>
            <div className="timeline-date">{item.period}</div>
            <div className="timeline-body">
              <div className="timeline-company">{item.company}</div>
              <div className="timeline-role">{item.role}</div>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
