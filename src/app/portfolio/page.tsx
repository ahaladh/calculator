import type { Metadata } from "next";
import Link from "next/link";
import { PROFILE, SKILLS, STATS, EXPERIENCE, EDUCATION } from "@/lib/portfolio";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { PortfolioParallax } from "@/components/portfolio-parallax";
import { ScrollParallaxLayer } from "@/components/scroll-parallax-layer";
import { CursorSpotlight } from "@/components/cursor-spotlight";

const [taglineBefore, taglineAfter] = PROFILE.tagline.split(PROFILE.taglineAccent);

const INITIALS = PROFILE.name
  .split(" ")
  .map((part) => part[0])
  .join("");

const MONOGRAM_GRADIENTS = [
  "from-blue-500 to-violet-500",
  "from-emerald-500 to-cyan-500",
  "from-amber-500 to-rose-500",
  "from-fuchsia-500 to-indigo-500",
];

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const title = `Portfolio — ${PROFILE.name}`;
const description = `${PROFILE.name}, ${PROFILE.role} — Laravel, PHP, React, and WHMCS/WordPress specialist. Experience, skills, and education.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/portfolio" },
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

export default function PortfolioPage() {
  return (
    <div className="bg-dot-grid relative overflow-hidden bg-[#050608] text-neutral-100">
      <PortfolioParallax />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-20 px-4 py-16 sm:px-6">
        <Link
          href="/"
          className="flex w-fit items-center gap-1.5 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          Home
        </Link>

        <CursorSpotlight>
          <ScrollParallaxLayer speed={0.08}>
            <header className="relative flex flex-col gap-7">
              <div
                aria-hidden="true"
                className="animate-pulse-glow pointer-events-none absolute -left-20 -top-24 -z-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="animate-pulse-glow pointer-events-none absolute -right-16 top-10 -z-10 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl"
                style={{ animationDelay: "2s" }}
              />

              <div
                className="animate-fade-in-up flex items-center gap-4"
                style={{ animationDelay: "0ms" }}
              >
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${MONOGRAM_GRADIENTS[0]} text-lg font-bold text-white shadow-lg shadow-blue-500/25`}
                >
                  {INITIALS}
                </div>
                <span className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-neutral-300 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {PROFILE.name} · {PROFILE.role}
                </span>
              </div>

              <h1
                className="animate-fade-in-up max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl"
                style={{ animationDelay: "80ms" }}
              >
                {taglineBefore}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                  {PROFILE.taglineAccent}
                </span>
                {taglineAfter}
              </h1>

              <p
                className="animate-fade-in-up max-w-2xl text-lg leading-relaxed text-neutral-400"
                style={{ animationDelay: "160ms" }}
              >
                {PROFILE.summary}
              </p>

              <div
                className="animate-fade-in-up mt-2 flex flex-wrap gap-3"
                style={{ animationDelay: "240ms" }}
              >
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30"
                >
                  LinkedIn
                </a>
                <Link
                  href="/contact#contact"
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-neutral-200 backdrop-blur-sm transition-colors hover:border-white/30 hover:text-white"
                >
                  Get in touch
                </Link>
              </div>

              <div
                className="animate-fade-in-up mt-2 flex flex-wrap items-center gap-6 sm:gap-10"
                style={{ animationDelay: "300ms" }}
              >
                {STATS.map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-6 sm:gap-10">
                    {i > 0 && <span className="h-8 w-px bg-white/10" aria-hidden="true" />}
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-white">{stat.value}</span>
                      <span className="text-xs text-neutral-500">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {SKILLS.map((skill, i) => (
                  <span
                    key={skill}
                    className="animate-fade-in-up rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-neutral-200 backdrop-blur-sm transition-colors hover:border-blue-400/40 hover:text-white"
                    style={{ animationDelay: `${340 + i * 40}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </header>
          </ScrollParallaxLayer>
        </CursorSpotlight>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none relative mt-4 flex overflow-hidden border-y border-white/10 py-4"
      >
        <div className="animate-marquee flex shrink-0 items-center gap-6 pr-6">
          {[...SKILLS, ...SKILLS].map((skill, i) => (
            <span
              key={i}
              className="flex items-center gap-6 whitespace-nowrap font-mono text-sm uppercase tracking-[0.2em] text-neutral-600"
            >
              {skill}
              <span className="text-neutral-700">+</span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-20 px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-6">
          <RevealOnScroll>
            <h2 className="text-2xl font-semibold tracking-tight text-white">Experience</h2>
          </RevealOnScroll>
          <div className="flex flex-col gap-6">
            {EXPERIENCE.map((job, i) => (
              <RevealOnScroll key={job.company} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-blue-500/10">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${MONOGRAM_GRADIENTS[i % MONOGRAM_GRADIENTS.length]} text-sm font-bold text-white`}
                      >
                        {initialsOf(job.company)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{job.role}</h3>
                        <p className="text-sm text-neutral-400">
                          {job.company} · {job.location}
                        </p>
                      </div>
                    </div>
                    <p className="shrink-0 text-sm font-medium text-neutral-500">
                      {job.start} – {job.end}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-1.5 pl-5 text-sm text-neutral-400">
                    {job.highlights.map((point) => (
                      <li key={point} className="list-disc marker:text-blue-400/60">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <RevealOnScroll>
            <h2 className="text-2xl font-semibold tracking-tight text-white">Education</h2>
          </RevealOnScroll>
          <div className="grid gap-4 sm:grid-cols-2">
            {EDUCATION.map((edu, i) => (
              <RevealOnScroll key={edu.degree} style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all hover:border-violet-400/30 hover:bg-white/[0.05]">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${MONOGRAM_GRADIENTS[(i + 1) % MONOGRAM_GRADIENTS.length]} text-xs font-bold text-white`}
                    >
                      {initialsOf(edu.institution)}
                    </div>
                    <h3 className="font-semibold text-white">{edu.degree}</h3>
                  </div>
                  <p className="text-sm text-neutral-400">
                    {edu.institution} · {edu.location}
                  </p>
                  <p className="text-sm text-neutral-500">{edu.date}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
