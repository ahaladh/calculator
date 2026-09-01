import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { MortgageCalculatorClient } from "@/components/calculators/mortgage-calculator-client";

export const metadata: Metadata = {
  title: "Mortgage Payment Calculator — Estimate Your Monthly Payment",
  description:
    "Calculate your monthly mortgage payment, total interest, and amortization breakdown. Free, precise, and updates instantly as you adjust home price, down payment, rate, and term.",
};

const faqs = [
  {
    q: "How is my monthly mortgage payment calculated?",
    a: "Your payment is calculated using the standard amortization formula: M = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the loan principal, r is the monthly interest rate, and n is the total number of monthly payments.",
  },
  {
    q: "Does this include property taxes and insurance?",
    a: "No. This calculator estimates principal and interest only. Property taxes, homeowners insurance, and any HOA dues would be added on top of the amount shown here.",
  },
  {
    q: "How does a larger down payment change my payment?",
    a: "A larger down payment reduces the amount you finance, which lowers both your monthly payment and the total interest paid over the life of the loan.",
  },
  {
    q: "What happens if I choose a shorter loan term?",
    a: "A shorter term (e.g. 15 years instead of 30) increases your monthly payment but significantly reduces total interest paid, since the balance is paid off faster.",
  },
  {
    q: "Can I share or bookmark my calculation?",
    a: "Yes. Every input you change is saved to the page URL, so you can bookmark it, refresh the page, or copy the link to share your exact scenario.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Mortgage Payment Calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    },
  ],
};

export default function MortgageCalculatorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col gap-6">
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
          All calculators
        </Link>
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Mortgage Payment Calculator
          </h1>
          <p className="max-w-2xl text-muted">
            Estimate your monthly principal &amp; interest payment, see the
            interest-vs-principal breakdown, and share your exact scenario via
            a link.
          </p>
        </header>
      </div>

      <Suspense fallback={<div className="h-96" />}>
        <MortgageCalculatorClient />
      </Suspense>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          How the formula works
        </h2>
        <p className="text-muted">
          Monthly principal &amp; interest is calculated with the standard
          amortization formula:
        </p>
        <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-sm">
          M = P × [ r(1 + r)^n ] / [ (1 + r)^n − 1 ]
        </pre>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
          <li>
            <strong className="text-foreground">P</strong> — loan principal
            (home price minus down payment)
          </li>
          <li>
            <strong className="text-foreground">r</strong> — monthly interest
            rate (annual rate ÷ 12)
          </li>
          <li>
            <strong className="text-foreground">n</strong> — total number of
            monthly payments (years × 12)
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Worked examples
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { price: "$450,000", down: "$90,000", rate: "6.5%", term: "30 yr", payment: "$2,275.44" },
            { price: "$300,000", down: "$60,000", rate: "5.75%", term: "30 yr", payment: "$1,400.57" },
            { price: "$250,000", down: "$50,000", rate: "4.25%", term: "15 yr", payment: "$1,504.56" },
          ].map((ex) => (
            <div
              key={ex.price + ex.term}
              className="rounded-lg border border-border p-4 text-sm"
            >
              <p className="font-medium">
                {ex.price} home, {ex.down} down
              </p>
              <p className="text-muted">
                {ex.rate} rate · {ex.term} term
              </p>
              <p className="mt-2 text-lg font-semibold tabular-nums">
                {ex.payment}
                <span className="text-sm font-normal text-muted">/mo</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">
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
