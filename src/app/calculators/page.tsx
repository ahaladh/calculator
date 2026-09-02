import type { Metadata } from "next";
import Link from "next/link";
import { CALCULATOR_SECTIONS } from "@/lib/calculator-registry";
import { CategoryIcon, CATEGORY_STYLES } from "@/components/category-icon";
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
      <div className="border-b border-border">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-24 sm:px-6 sm:py-32">
          <span
            className="animate-fade-in-up text-xs font-medium uppercase tracking-[0.2em] text-muted"
            style={{ animationDelay: "0ms" }}
          >
            <AnimatedCounter value={totalCalculators} /> free calculators · no
            sign-up
          </span>
          <h1
            className="animate-fade-in-up font-serif text-4xl font-normal leading-[1.1] tracking-tight text-foreground sm:text-5xl"
            style={{ animationDelay: "80ms" }}
          >
            Numbers you can trust, answers in seconds.
          </h1>
          <p
            className="animate-fade-in-up max-w-xl text-lg leading-relaxed text-muted"
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
            {CALCULATOR_SECTIONS.map((section) => (
              <Link
                key={section.slug}
                href={`#${section.slug}`}
                className="rounded-md border border-border px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:border-foreground hover:text-foreground"
              >
                {section.category}
              </Link>
            ))}
          </div>
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
                <h2 className="font-serif text-xl font-normal tracking-tight text-foreground">
                  {section.category}
                </h2>
                <span className="text-sm text-muted">{section.items.length}</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((calc) => (
                  <Link
                    key={calc.slug}
                    href={`/${calc.slug}`}
                    className="group flex flex-col gap-3 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-foreground"
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${style?.badge ?? "bg-accent/10"}`}
                    >
                      <CategoryIcon
                        slug={section.slug}
                        className={`h-4.5 w-4.5 ${style?.text ?? "text-accent"}`}
                      />
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-semibold text-foreground">
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
