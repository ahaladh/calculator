import type { ReactNode } from "react";
import Link from "next/link";

export interface Faq {
  q: string;
  a: string;
}

export function buildCalcJsonLd(name: string, faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "All",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export function CalcPage({
  h1,
  intro,
  faqs,
  jsonLd,
  methodology,
  children,
}: {
  h1: string;
  intro: string;
  faqs: Faq[];
  jsonLd: object;
  methodology?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col gap-6">
        <Link
          href="/calculators"
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
          All calculators
        </Link>
        <header className="flex flex-col gap-2">
          <h1 className="font-serif text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
            {h1}
          </h1>
          <p className="max-w-2xl text-muted">{intro}</p>
        </header>
      </div>

      {children}

      {methodology && (
        <section className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl font-normal tracking-tight text-foreground">
            How this is calculated
          </h2>
          {methodology}
          <p className="text-xs text-muted">
            Pricing is verified against provider pricing pages as of
            2026-09-01. AI and cloud pricing changes frequently — confirm the
            current rate on the provider&apos;s own pricing page before
            budgeting.
          </p>
        </section>
      )}

      <section className="flex flex-col gap-4">
        <h2 className="font-serif text-2xl font-normal tracking-tight text-foreground">
          Frequently asked questions
        </h2>
        <div className="flex flex-col divide-y divide-border rounded-lg border border-border">
          {faqs.map((f) => (
            <details key={f.q} className="group p-4">
              <summary className="cursor-pointer list-none font-medium marker:content-none">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
