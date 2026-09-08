import type { Metadata } from "next";
import Link from "next/link";
import { PROFILE, SKILLS, EXPERIENCE, EDUCATION } from "@/lib/portfolio";
import { RevealOnScroll } from "@/components/reveal-on-scroll";

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
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 py-12 sm:px-6">
      <Link
        href="/"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
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

      <header className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{PROFILE.name}</h1>
          <p className="text-lg text-muted">
            {PROFILE.role} · {PROFILE.location}
          </p>
        </div>
        <p className="max-w-2xl text-muted">{PROFILE.summary}</p>

        <div className="flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-medium text-foreground"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-2 flex flex-wrap gap-3">
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            LinkedIn
          </a>
          <Link
            href="/contact#contact"
            className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Get in touch
          </Link>
        </div>
      </header>

      <RevealOnScroll className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold tracking-tight">Experience</h2>
        <div className="flex flex-col gap-6">
          {EXPERIENCE.map((job) => (
            <div
              key={job.company}
              className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{job.role}</h3>
                  <p className="text-sm text-muted">
                    {job.company} · {job.location}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-medium text-muted">
                  {job.start} – {job.end}
                </p>
              </div>
              <ul className="flex flex-col gap-1.5 pl-5 text-sm text-muted">
                {job.highlights.map((point) => (
                  <li key={point} className="list-disc">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold tracking-tight">Education</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {EDUCATION.map((edu) => (
            <div
              key={edu.degree}
              className="flex flex-col gap-1 rounded-xl border border-border bg-surface p-5"
            >
              <h3 className="font-semibold">{edu.degree}</h3>
              <p className="text-sm text-muted">
                {edu.institution} · {edu.location}
              </p>
              <p className="text-sm text-muted">{edu.date}</p>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </div>
  );
}
