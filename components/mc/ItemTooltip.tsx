"use client";
import { forwardRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type TooltipItem = {
  title: string;
  subtitle?: string;
  heading?: string;
  attributes?: string[];
  source?: string;
};

type ItemTooltipProps = {
  item: TooltipItem | null;
};

const OFFSET = 16;

// Places the tooltip beside the pointer, flipping to the other side near the viewport edges.
export function moveTooltip(tooltip: HTMLElement | null, event: PointerEvent) {
  if (!tooltip) return;
  const { offsetWidth: width, offsetHeight: height } = tooltip;
  let x = event.clientX + OFFSET;
  let y = event.clientY - OFFSET;
  if (x + width > window.innerWidth - 8) x = event.clientX - OFFSET - width;
  if (y + height > window.innerHeight - 8) y = window.innerHeight - 8 - height;
  tooltip.style.transform = `translate3d(${Math.max(8, x)}px, ${Math.max(8, y)}px, 0)`;
}

// Minecraft item tooltip. Decorative only: the same information is always visible on the card itself.
export const ItemTooltip = forwardRef<HTMLDivElement, ItemTooltipProps>(function ItemTooltip({ item }, ref) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div ref={ref} className={`mc-tooltip${item ? " is-open" : ""}`} aria-hidden="true">
      {item && (
        <>
          <div className="mc-tooltip-title">{item.title}</div>
          {item.subtitle && <div className="mc-tooltip-subtitle">{item.subtitle}</div>}
          {item.attributes?.length ? (
            <div className="mc-tooltip-group">
              {item.heading && <div className="mc-tooltip-subtitle">{item.heading}</div>}
              {item.attributes.map((attribute) => (
                <div className="mc-tooltip-attribute" key={attribute}>+ {attribute}</div>
              ))}
            </div>
          ) : null}
          {item.source && <div className="mc-tooltip-source">{item.source}</div>}
        </>
      )}
    </div>,
    document.body
  );
});
