import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { CompoundInterestClient } from "@/components/calculators/compound-interest-client";

const title = "Compound Interest Calculator — Calculate Maturity Value";
const description = "Calculate compound interest on any principal, with annual, semi-annual, quarterly, monthly, or daily compounding. See maturity value and total interest earned.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "What's the difference between simple and compound interest?",
    a: "Simple interest is calculated only on the original principal for the entire period. Compound interest is calculated on the principal plus all previously earned interest, so returns accelerate over time.",
  },
  {
    q: "Does compounding frequency really make a difference?",
    a: "Yes, though the effect is smaller than the rate or time period — daily compounding earns more than annual compounding at the same nominal rate, because interest starts earning its own interest sooner.",
  },
  {
    q: "What's the 'Rule of 72'?",
    a: "A quick mental shortcut: divide 72 by your annual interest rate to estimate how many years it takes an investment to double. At 8%, for example, that's roughly 9 years — this calculator gives you the exact figure.",
  },
  {
    q: "Where is compound interest used in real life?",
    a: "Fixed deposits, recurring deposits, savings accounts, bonds, and loan interest all use compound interest — this calculator's formula is the building block behind the FD and RD calculators on this site.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="Compound Interest Calculator"
      intro="Calculate how your money grows with compound interest, at any compounding frequency."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("Compound Interest Calculator", faqs)}
      methodology={
        <p className="text-muted">
          A = P(1 + r/n)ⁿᵗ, where P is principal, r is the annual interest
          rate, n is the number of compounding periods per year, and t is
          time in years.
        </p>
      }
    >
      <CompoundInterestClient />
    </CalcPage>
  );
}
