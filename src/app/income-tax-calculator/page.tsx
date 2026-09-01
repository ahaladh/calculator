import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { IncomeTaxInClient } from "@/components/calculators/income-tax-in-client";

export const metadata: Metadata = {
  title: "Income Tax Calculator — India, FY 2026-27 (New & Old Regime)",
  description:
    "Calculate your income tax for FY 2026-27 (AY 2027-28) under both the new and old tax regimes, and compare which one saves you more.",
};

const faqs = [
  {
    q: "Which tax regime should I choose?",
    a: "The new regime usually wins if you claim few deductions — its ₹75,000 standard deduction and ₹60,000 rebate make income up to ₹12.75L effectively tax-free. The old regime can still work out cheaper if you have substantial deductions (80C investments, home loan interest, HRA) — compare both using this calculator.",
  },
  {
    q: "Why is my tax zero even though I'm in a taxable slab?",
    a: "Section 87A gives a rebate that fully cancels out tax liability up to a threshold — ₹12L taxable income under the new regime, ₹5L under the old regime. Above that threshold, you pay tax on the full slab structure with no rebate.",
  },
  {
    q: "What is the Health & Education Cess?",
    a: "A flat 4% additional charge on your calculated tax (after any rebate), used to fund health and education initiatives. It applies under both tax regimes and is included automatically in this calculator's total.",
  },
  {
    q: "Does this include surcharge for high income?",
    a: "No — surcharge (an additional charge on tax, not income) applies above ₹50 lakh in both regimes and isn't included here. If your income is in that range, add surcharge separately or consult a tax professional.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="Income Tax Calculator (India)"
      intro="Calculate your income tax for FY 2026-27 under the new or old regime, and see which one works out cheaper for you."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("Income Tax Calculator India", faqs)}
      methodology={
        <p className="text-muted">
          Tax is computed slab-by-slab on taxable income (gross income minus
          standard deduction, plus other deductions under the old regime),
          then a Section 87A rebate is applied if taxable income is within
          threshold, followed by a 4% Health &amp; Education Cess on the
          remaining tax.
        </p>
      }
    >
      <IncomeTaxInClient />
    </CalcPage>
  );
}
