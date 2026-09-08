"use client";

import { useEffect, useRef } from "react";

interface GlowConfig {
  top: string;
  left: string;
  size: string;
  color: string;
  amplitude: number;
  frequency: number;
  phase: number;
}

const GLOWS: GlowConfig[] = [
  {
    top: "-10%",
    left: "5%",
    size: "h-[28rem] w-[28rem]",
    color: "bg-blue-500/25",
    amplitude: 140,
    frequency: 0.002,
    phase: 0,
  },
  {
    top: "25%",
    left: "65%",
    size: "h-[24rem] w-[24rem]",
    color: "bg-violet-500/20",
    amplitude: 170,
    frequency: 0.0016,
    phase: 2.4,
  },
  {
    top: "60%",
    left: "0%",
    size: "h-80 w-80",
    color: "bg-cyan-400/15",
    amplitude: 120,
    frequency: 0.0026,
    phase: 4.6,
  },
  {
    top: "85%",
    left: "55%",
    size: "h-[26rem] w-[26rem]",
    color: "bg-fuchsia-500/15",
    amplitude: 150,
    frequency: 0.0019,
    phase: 1.2,
  },
];

export function PortfolioParallax() {
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function update() {
      const y = window.scrollY;
      GLOWS.forEach((glow, i) => {
        const el = glowRefs.current[i];
        if (!el) return;
        const dy = Math.sin(y * glow.frequency + glow.phase) * glow.amplitude;
        const dx = Math.cos(y * glow.frequency * 0.7 + glow.phase) * (glow.amplitude * 0.6);
        el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      });
      rafId.current = null;
    }

    function onScroll() {
      if (rafId.current == null) {
        rafId.current = requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {GLOWS.map((glow, i) => (
        <div
          key={i}
          ref={(el) => {
            glowRefs.current[i] = el;
          }}
          className={`absolute rounded-full blur-3xl ${glow.size} ${glow.color}`}
          style={{ top: glow.top, left: glow.left, willChange: "transform" }}
        />
      ))}
    </div>
  );
}
