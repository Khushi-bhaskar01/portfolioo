import { textures } from "./mc/textures";

export function FooterSection() {
  return (
    <footer className="site-footer mc-footer">
      <div className="bedrock" style={{ backgroundImage: textures.bedrock }} aria-hidden="true" />
      <div className="footer-meta">
        <span>© 2026 KHUSHI BHASKAR</span>
        <span>BUILT BLOCK BY BLOCK</span>
      </div>
    </footer>
  );
}
