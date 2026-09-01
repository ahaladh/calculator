import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { RdClient } from "@/components/calculators/rd-client";

export const metadata: Metadata = {
  title: "RD Calculator — Recurring Deposit Maturity Calculator",
  description:
    "Calculate your Recurring Deposit maturity value and interest earned, using the standard quarterly-compounded RD formula banks use.",
};

const faqs = [
  {
    q: "How is RD interest calculated?",
    a: "Each monthly deposit earns compound interest for the time remaining until maturity, compounded quarterly — so earlier deposits earn interest for longer than later ones. Banks use a specific formula to account for this, which this calculator implements.",
  },
  {
    q: "What's the difference between an RD and a SIP?",
    a: "Both involve regular monthly contributions, but an RD earns a fixed, guaranteed bank interest rate, while a SIP invests in market-linked mutual funds with variable, potentially higher long-term returns.",
  },
  {
    q: "Why is my tenure rounded to the nearest 3 months?",
    a: "Banks calculate RD maturity in quarters (3-month blocks) since interest compounds quarterly — a tenure of 13 months is treated the same as 12 for calculation purposes, which this calculator matches.",
  },
  {
    q: "Is RD interest taxable?",
    a: "Yes — like FD interest, RD interest is added to your taxable income and taxed at your slab rate, with TDS deducted by the bank if annual interest exceeds ₹40,000 (₹50,000 for senior citizens).",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="RD Calculator"
      intro="Calculate your Recurring Deposit's maturity value using the standard bank formula for quarterly-compounded RDs."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("RD Calculator", faqs)}
      methodology={
        <p className="text-muted">
          M = R × [(1+i)ⁿ − 1] / (1 − (1+i)⁻¹ᐟ³), where R is the monthly
          deposit, i is the quarterly rate (annual rate ÷ 400), and n is the
          number of quarters in the tenure.
        </p>
      }
    >
      <RdClient />
    </CalcPage>
  );
}
