import Link from "next/link";
import { CALCULATOR_SECTIONS } from "@/lib/calculator-registry";
import { CategoryIcon, CATEGORY_STYLES } from "@/components/category-icon";

const totalCalculators = CALCULATOR_SECTIONS.reduce(
  (sum, section) => sum + section.items.length,
  0,
);

export default function Home() {
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
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-20 sm:px-6">
          <span className="w-fit rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
            {totalCalculators} free calculators · no sign-up
          </span>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Numbers you can trust, answers in seconds.
          </h1>
          <p className="max-w-xl text-lg text-muted">
            Fast, precise calculators for finance, health, and AI costs —
            built with arbitrary-precision math and verified against known
            benchmarks.
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
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
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 py-16 sm:px-6">
        {CALCULATOR_SECTIONS.map((section) => {
          const style = CATEGORY_STYLES[section.slug];
          return (
            <div
              key={section.slug}
              id={section.slug}
              className="flex scroll-mt-20 flex-col gap-5"
            >
              <div className="flex items-center gap-2.5">
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
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${style?.badge ?? "bg-accent/10"}`}
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
