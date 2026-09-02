import type { Metadata } from "next";
import Link from "next/link";
import { CALCULATOR_SECTIONS } from "@/lib/calculator-registry";
import { CategoryIcon, CATEGORY_STYLES } from "@/components/category-icon";
import { HeroVisual } from "@/components/hero-visual";
import { AnimatedCounter } from "@/components/animated-counter";
import { RevealOnScroll } from "@/components/reveal-on-scroll";

const totalCalculators = CALCULATOR_SECTIONS.reduce(
  (sum, section) => sum + section.items.length,
  0,
);

const title = "Free Calculators — Finance, Health & AI Cost Tools";
const description =
  "Fast, precise calculators for finance, health, and AI costs — built with arbitrary-precision math and verified against known benchmarks. No sign-up required.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/calculators" },
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

export default function CalculatorsPage() {
  return (
    <div className="flex flex-col">
      <div className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 90% at 15% 0%, var(--color-accent) 0%, transparent 60%)",
            opacity: 0.08,
          }}
        />
        <div className="relative mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className="flex flex-col gap-5">
            <span
              className="animate-fade-in-up w-fit rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted"
              style={{ animationDelay: "0ms" }}
            >
              <AnimatedCounter value={totalCalculators} /> free calculators ·
              no sign-up
            </span>
            <h1
              className="animate-fade-in-up max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl"
              style={{ animationDelay: "80ms" }}
            >
              Numbers you can trust, answers in seconds.
            </h1>
            <p
              className="animate-fade-in-up max-w-xl text-lg text-muted"
              style={{ animationDelay: "160ms" }}
            >
              Fast, precise calculators for finance, health, and AI costs —
              built with arbitrary-precision math and verified against known
              benchmarks.
            </p>

            <div
              className="animate-fade-in-up mt-2 flex flex-wrap gap-2"
              style={{ animationDelay: "240ms" }}
            >
              {CALCULATOR_SECTIONS.map((section) => {
                const style = CATEGORY_STYLES[section.slug];
                return (
                  <Link
                    key={section.slug}
                    href={`#${section.slug}`}
                    className="flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full ${style?.badge ?? "bg-accent/10"}`}
                    >
                      <CategoryIcon
                        slug={section.slug}
                        className={`h-3 w-3 ${style?.text ?? "text-accent"}`}
                      />
                    </span>
                    {section.category}
                  </Link>
                );
              })}
            </div>
          </div>

          <HeroVisual />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 py-16 sm:px-6">
        {CALCULATOR_SECTIONS.map((section) => {
          const style = CATEGORY_STYLES[section.slug];
          return (
            <RevealOnScroll key={section.slug} className="flex flex-col gap-5">
              <div id={section.slug} className="flex scroll-mt-20 items-center gap-2.5">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${style?.badge ?? "bg-accent/10"}`}
                >
                  <CategoryIcon
                    slug={section.slug}
                    className={`h-4.5 w-4.5 ${style?.text ?? "text-accent"}`}
                  />
                </span>
                <h2 className="text-lg font-semibold tracking-tight">
                  {section.category}
                </h2>
                <span className="text-sm text-muted">{section.items.length}</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((calc) => (
                  <Link
                    key={calc.slug}
                    href={`/${calc.slug}`}
                    className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${style?.badge ?? "bg-accent/10"} transition-transform group-hover:scale-110`}
                    >
                      <CategoryIcon
                        slug={section.slug}
                        className={`h-4.5 w-4.5 ${style?.text ?? "text-accent"}`}
                      />
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-semibold group-hover:text-accent">
                        {calc.title}
                      </h3>
                      <p className="text-sm text-muted">{calc.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </RevealOnScroll>
          );
        })}
      </div>
    </div>
  );
}
