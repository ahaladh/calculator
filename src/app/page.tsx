import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { CategoryIcon, CATEGORY_STYLES } from "@/components/category-icon";
import { ServicesHeroVisual } from "@/components/services-hero-visual";
import { AnimatedCounter } from "@/components/animated-counter";
import { RevealOnScroll } from "@/components/reveal-on-scroll";

const title = "World of the Developers — Web, WHMCS & Hosting Panel Development";
const description =
  "Custom IT services for hosting and web businesses: single-page website development, WHMCS module development, hosting panel plugins, and billing automation.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

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
        <div className="relative mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className="flex flex-col gap-5">
            <span
              className="animate-fade-in-up w-fit rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted"
              style={{ animationDelay: "0ms" }}
            >
              <AnimatedCounter value={SERVICES.length} /> services · custom-built
            </span>
            <h1
              className="animate-fade-in-up max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl"
              style={{ animationDelay: "80ms" }}
            >
              Custom IT development for hosting &amp; web businesses.
            </h1>
            <p
              className="animate-fade-in-up max-w-xl text-lg text-muted"
              style={{ animationDelay: "160ms" }}
            >
              From single-page websites to WHMCS modules and hosting panel
              plugins — built exactly to your workflow, not a generic
              template.
            </p>

            <div
              className="animate-fade-in-up mt-2 flex flex-wrap gap-3"
              style={{ animationDelay: "240ms" }}
            >
              <Link
                href="/contact#contact"
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                Get in touch
              </Link>
              <Link
                href="/calculators"
                className="flex items-center gap-1.5 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Free calculators
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
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <ServicesHeroVisual />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 py-16 sm:px-6">
        <RevealOnScroll className="flex flex-col gap-5">
          <div id="services" className="flex scroll-mt-20 flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">Services</h2>
            <p className="max-w-2xl text-muted">
              Practical, purpose-built development — no bloated agency
              retainers, just the thing you need shipped correctly.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const style = CATEGORY_STYLES[service.icon];
              return (
                <div
                  key={service.slug}
                  id={service.slug}
                  className="flex scroll-mt-24 flex-col gap-3 rounded-xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${style?.badge ?? "bg-accent/10"}`}
                  >
                    <CategoryIcon
                      slug={service.icon}
                      className={`h-4.5 w-4.5 ${style?.text ?? "text-accent"}`}
                    />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                    <p className="text-sm text-muted">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <Link
            href="/calculators"
            className="group flex flex-col items-start gap-4 rounded-2xl border border-border bg-surface p-8 transition-all hover:border-accent hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <CategoryIcon slug="finance" className="h-6 w-6 text-accent" />
              </span>
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold tracking-tight">
                  Free calculators, built on the side
                </h2>
                <p className="max-w-xl text-muted">
                  A free collection of finance, health, and AI-cost
                  calculators — no sign-up, runs entirely in your browser.
                </p>
              </div>
            </div>
            <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors group-hover:border-accent group-hover:text-accent">
              Browse calculators
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </RevealOnScroll>

        <RevealOnScroll>
          <Link
            href="/pdf-tools"
            className="group flex flex-col items-start gap-4 rounded-2xl border border-border bg-surface p-8 transition-all hover:border-accent hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <CategoryIcon slug="company" className="h-6 w-6 text-accent" />
              </span>
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold tracking-tight">
                  PDF tools
                </h2>
                <p className="max-w-xl text-muted">
                  Merge, split, compress, convert, edit, and sign PDFs
                  from one toolkit.
                </p>
              </div>
            </div>
            <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors group-hover:border-accent group-hover:text-accent">
              Explore PDF tools
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </RevealOnScroll>
      </div>
    </div>
  );
}
