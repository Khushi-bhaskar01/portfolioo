import { PixelIcon, type PixelIconName } from "./mc/PixelIcon";

type Advancement = {
  title: string;
  detail: string;
  icon: PixelIconName;
};

type LeadershipSectionProps = {
  achievements: Advancement[];
};

const roles: Advancement[] = [
  { title: "ACM", detail: "Secretary", icon: "book" },
  { title: "DevSource", detail: "Member → Lead", icon: "pickaxe" },
  { title: "Open Source", detail: "Contributor", icon: "chest" },
  { title: "Mentorship", detail: "Developer community", icon: "heart" },
];

function Toasts({ label, items }: { label: string; items: Advancement[] }) {
  return (
    <div className="toast-row">
      <div className="toast-label">{label}</div>
      <ul className="toasts">
        {items.map((item) => (
          <li className="toast" key={item.title}>
            <PixelIcon name={item.icon} size={32} />
            <div>
              <strong>{item.title}</strong>
              <span>{item.detail}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LeadershipSection({ achievements }: LeadershipSectionProps) {
  return (
    <section className="leadership section-stack reveal">
      <div className="section-kicker">ADVANCEMENTS / 06</div>
      <Toasts label="ROLES" items={roles} />
      <Toasts label="WINS" items={achievements} />
    </section>
  );
}
