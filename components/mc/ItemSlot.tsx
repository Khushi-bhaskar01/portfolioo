import type { ReactNode } from "react";

type ItemSlotProps = {
  className?: string;
  children: ReactNode;
};

// Inventory-style slot: inset bevel frame with the translucent hover highlight from the game UI.
export function ItemSlot({ className = "", children }: ItemSlotProps) {
  return <div className={`mc-slot ${className}`.trim()}>{children}</div>;
}
