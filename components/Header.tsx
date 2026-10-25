import { ThemeToggle } from "./ThemeToggle";
import { HudClock } from "./HudClock";

export function Header({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <header className="topbar">
      <div className="brand-mark">KB / DEV</div>
      <HudClock />
      <nav className="topnav" aria-label="Main navigation">
        <a href="#work">WORK</a>
        <a href="#experience">EXPERIENCE</a>
        <a href="#research">RESEARCH</a>
        <a href="#stack">STACK</a>
        <a href="#about">ABOUT</a>
      </nav>
      <ThemeToggle />
      <button className="connect-button" onClick={onMenuOpen}>CONNECT →</button>
    </header>
  );
}
