import type { Metadata } from "next";
import Link from "next/link";
import { PROFILE, SKILLS, EXPERIENCE, EDUCATION } from "@/lib/portfolio";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { PortfolioParallax } from "@/components/portfolio-parallax";

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
    <div className="relative overflow-hidden bg-[#050608] text-neutral-100">
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

        <header className="relative flex flex-col gap-6">
          <div
            aria-hidden="true"
            className="animate-pulse-glow absolute -left-20 -top-24 -z-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
          />

          <span
            className="animate-fade-in-up w-fit rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-neutral-300 backdrop-blur-sm"
            style={{ animationDelay: "0ms" }}
          >
            {PROFILE.role} · {PROFILE.location}
          </span>

          <h1
            className="animate-fade-in-up bg-gradient-to-r from-white via-blue-100 to-violet-200 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            {PROFILE.name}
          </h1>

          <p
            className="animate-fade-in-up max-w-2xl text-lg leading-relaxed text-neutral-400"
            style={{ animationDelay: "160ms" }}
          >
            {PROFILE.summary}
          </p>

          <div
            className="animate-fade-in-up flex flex-wrap gap-2"
            style={{ animationDelay: "240ms" }}
          >
            {SKILLS.map((skill, i) => (
              <span
                key={skill}
                className="animate-fade-in-up rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-neutral-200 backdrop-blur-sm transition-colors hover:border-blue-400/40 hover:text-white"
                style={{ animationDelay: `${280 + i * 40}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>

          <div
            className="animate-fade-in-up mt-2 flex flex-wrap gap-3"
            style={{ animationDelay: "320ms" }}
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
        </header>

        <RevealOnScroll className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Experience</h2>
          <div className="flex flex-col gap-6">
            {EXPERIENCE.map((job) => (
              <div
                key={job.company}
                className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{job.role}</h3>
                    <p className="text-sm text-neutral-400">
                      {job.company} · {job.location}
                    </p>
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
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Education</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {EDUCATION.map((edu) => (
              <div
                key={edu.degree}
                className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all hover:border-violet-400/30 hover:bg-white/[0.05]"
              >
                <h3 className="font-semibold text-white">{edu.degree}</h3>
                <p className="text-sm text-neutral-400">
                  {edu.institution} · {edu.location}
                </p>
                <p className="text-sm text-neutral-500">{edu.date}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
