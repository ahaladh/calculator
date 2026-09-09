"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

export function CursorSpotlight({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    node.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div ref={ref} onMouseMove={handleMouseMove} className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(480px circle at var(--spot-x, 50%) var(--spot-y, 10%), rgba(96,165,250,0.10), transparent 65%)",
        }}
      />
      {children}
    </div>
  );
}
