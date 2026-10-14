import Image from "next/image";

export type Project = {
  number: string;
  kind: string;
  title: string;
  text: string;
  stack: string;
  tone: string;
  image: string;
  href?: string;
};

type WorkSectionProps = {
  projects: Project[];
};

export function WorkSection({ projects }: WorkSectionProps) {
  return (
    <section id="work" className="work section-stack reveal">
      <div className="section-header">
        <div className="section-kicker">SELECTED WORK / 02</div>
        <div className="section-link">VIEW ALL PROJECTS →</div>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <article className={`project-card ${project.tone}`} key={project.title}>
            <div className="project-visual">
              <div className="project-visual-inner" />
              <Image
                className="project-image"
                src={project.image}
                alt={`${project.title} project preview`}
                fill
                sizes="(max-width: 600px) calc(100vw - 48px), (max-width: 980px) calc((100vw - 80px) / 2), 25vw"
              />
            </div>

            <div className="project-topline">
              <span className="project-number">{project.number}</span>
              <span className="project-kind">{project.kind}</span>
            </div>

            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.text}</p>
              <div className="tech-tags">
                {project.stack.split(" /").map((tag) => (
                  <span key={tag}>{tag.trim()}</span>
                ))}
              </div>
              {project.href && (
                <a href={project.href} className="project-link" target="_blank" rel="noreferrer">
                  VIEW PROJECT →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
