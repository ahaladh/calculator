import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
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
      <div className="border-b border-border">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-28 sm:px-6 sm:py-36">
          <span
            className="animate-fade-in-up text-xs font-medium uppercase tracking-[0.2em] text-muted"
            style={{ animationDelay: "0ms" }}
          >
            IT Development Studio
          </span>
          <h1
            className="animate-fade-in-up font-serif text-4xl font-normal leading-[1.1] tracking-tight text-foreground sm:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            Custom IT development for hosting &amp; web businesses.
          </h1>
          <p
            className="animate-fade-in-up max-w-xl text-lg leading-relaxed text-muted"
            style={{ animationDelay: "160ms" }}
          >
            From single-page websites to WHMCS modules and hosting panel
            plugins — built exactly to your workflow, not a generic
            template.
          </p>

          <div
            className="animate-fade-in-up mt-4 flex flex-wrap items-center gap-8"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/contact#contact"
              className="rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              Get in touch
            </Link>
            <Link
              href="/calculators"
              className="group flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              Free calculators
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-20 px-4 py-24 sm:px-6">
        <RevealOnScroll className="flex flex-col gap-10">
          <div id="services" className="flex scroll-mt-20 flex-col gap-3">
            <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground">
              Services
            </h2>
            <p className="max-w-xl text-muted">
              Practical, purpose-built development — no bloated agency
              retainers, just the thing you need shipped correctly.
            </p>
          </div>

          <div className="flex flex-col divide-y divide-border border-t border-border">
            {SERVICES.map((service, index) => (
              <div
                key={service.slug}
                id={service.slug}
                className="flex scroll-mt-24 flex-col gap-2 py-8 sm:flex-row sm:gap-10"
              >
                <span className="font-serif text-sm italic text-muted sm:w-10 sm:shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="max-w-xl text-muted">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <Link
            href="/calculators"
            className="group flex flex-col gap-3 border-t border-border pt-8"
          >
            <h2 className="font-serif text-2xl font-normal tracking-tight text-foreground">
              Free calculators, built on the side
            </h2>
            <p className="max-w-xl text-muted">
              A free collection of finance, health, and AI-cost calculators —
              no sign-up, runs entirely in your browser.
            </p>
            <span className="mt-1 flex items-center gap-1.5 text-sm font-medium text-foreground">
              Browse calculators
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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
