const roles = [
  { title: "DevSource", meta: "Member → Lead" },
  { title: "ACM", meta: "Secretary" },
  { title: "Open Source", meta: "Contributor" },
  { title: "Mentorship", meta: "Developer Community" },
];

export function LeadershipSection() {
  return (
    <section className="leadership section-stack reveal">
      <div className="section-header">
        <div className="section-kicker">BEYOND THE CODE / 06</div>
      </div>

      <p className="leadership-description">
        I joined DevSource as a member, became its lead, and now serve as Secretary of ACM. DevSource is a club under ACM.
      </p>

      <div className="leadership-grid">
        {roles.map((role) => (
          <div className="leadership-card" key={role.title}>
            <div className="leadership-title">{role.title}</div>
            <div className="leadership-meta">{role.meta}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
