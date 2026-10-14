type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  return (
    <div className={open ? "menu-overlay open" : "menu-overlay"}>
      <button className="close-button" onClick={onClose}>CLOSE ×</button>
      <nav>
        <a href="#work" onClick={onClose}>WORK</a>
        <a href="#experience" onClick={onClose}>EXPERIENCE</a>
        <a href="#research" onClick={onClose}>RESEARCH</a>
        <a href="#stack" onClick={onClose}>STACK</a>
        <a href="#about" onClick={onClose}>ABOUT</a>
      </nav>
      <div className="menu-social">
        <a href="https://github.com/Khushi-bhaskar01" target="_blank" rel="noreferrer">GITHUB ↗</a>
        <a href="https://www.linkedin.com/in/khushi-bhaskar-b00586324/?isSelfProfile=true" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
        <a href="mailto:khushibhaskar.2006@gmail.com">EMAIL ↗</a>
      </div>
    </div>
  );
}
