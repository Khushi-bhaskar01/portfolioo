type KnowledgeGroup = {
  title: string;
  items: string[];
};

type SkillsSectionProps = {
  knowledgeAreas: KnowledgeGroup[];
};

export function SkillsSection({ knowledgeAreas }: SkillsSectionProps) {
  return (
    <section id="stack" className="stack section-stack reveal">
      <div className="section-header">
        <div className="section-kicker">SYSTEM STACK / 05</div>
      </div>

      <div className="stack-grid">
        {knowledgeAreas.map((group) => (
          <div className="stack-group" key={group.title}>
            <div className="stack-title">{group.title}</div>
            <ul>
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
