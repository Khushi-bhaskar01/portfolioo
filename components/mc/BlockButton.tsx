import type { AnchorHTMLAttributes, ReactNode } from "react";

type BlockButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  children: ReactNode;
};

// A link styled like a Minecraft UI button: stepped corners, bevelled edges, presses down on click.
export function BlockButton({ variant = "primary", size = "md", className = "", children, ...props }: BlockButtonProps) {
  return (
    <a className={`mc-button mc-button-${variant} mc-button-${size} ${className}`.trim()} {...props}>
      <span className="mc-button-face">{children}</span>
    </a>
  );
}
