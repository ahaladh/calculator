"use client";

import { useEffect, useRef } from "react";

interface BlobConfig {
  top: string;
  left: string;
  size: string;
  color: string;
  amplitude: number;
  frequency: number;
  phase: number;
}

const BLOBS: BlobConfig[] = [
  {
    top: "-8%",
    left: "8%",
    size: "h-[26rem] w-[26rem]",
    color: "bg-indigo-400/25 dark:bg-indigo-500/15",
    amplitude: 130,
    frequency: 0.0022,
    phase: 0,
  },
  {
    top: "18%",
    left: "68%",
    size: "h-[22rem] w-[22rem]",
    color: "bg-emerald-400/20 dark:bg-emerald-500/12",
    amplitude: 170,
    frequency: 0.0015,
    phase: 2.1,
  },
  {
    top: "48%",
    left: "-4%",
    size: "h-80 w-80",
    color: "bg-rose-400/20 dark:bg-rose-500/12",
    amplitude: 110,
    frequency: 0.0027,
    phase: 4.2,
  },
  {
    top: "72%",
    left: "58%",
    size: "h-[24rem] w-[24rem]",
    color: "bg-amber-400/15 dark:bg-amber-500/10",
    amplitude: 150,
    frequency: 0.0019,
    phase: 1.4,
  },
  {
    top: "95%",
    left: "20%",
    size: "h-72 w-72",
    color: "bg-sky-400/20 dark:bg-sky-500/12",
    amplitude: 120,
    frequency: 0.0024,
    phase: 5.5,
  },
];

export function ParallaxBackground() {
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function update() {
      const y = window.scrollY;
      BLOBS.forEach((blob, i) => {
        const el = blobRefs.current[i];
        if (!el) return;
        const dy = Math.sin(y * blob.frequency + blob.phase) * blob.amplitude;
        const dx = Math.cos(y * blob.frequency * 0.7 + blob.phase) * (blob.amplitude * 0.6);
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
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          ref={(el) => {
            blobRefs.current[i] = el;
          }}
          className={`absolute rounded-full blur-2xl ${blob.size} ${blob.color}`}
          style={{ top: blob.top, left: blob.left, willChange: "transform" }}
        />
      ))}
    </div>
  );
}
