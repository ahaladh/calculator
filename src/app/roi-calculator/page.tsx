import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { InvestmentRoiClient } from "@/components/calculators/investment-roi-client";

const title = "ROI Calculator — Return on Investment & CAGR";
const description = "Calculate the return on investment (ROI) and annualized return (CAGR) for any investment, given its initial value, final value, and holding period.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/roi-calculator" },
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "What's the difference between total ROI and CAGR?",
    a: "Total ROI is the overall percentage gain over the entire holding period, regardless of how long that took. CAGR (Compound Annual Growth Rate) annualizes that return, which is what makes it possible to fairly compare investments held for different lengths of time.",
  },
  {
    q: "Why does a 50% ROI over 5 years not mean 10% per year?",
    a: "Because returns compound, not add — a 50% total gain over 5 years works out to roughly 8.4% CAGR, not a flat 10%, since each year's growth builds on the previous year's already-grown value.",
  },
  {
    q: "Can ROI be negative?",
    a: "Yes — if the final value is lower than the initial investment, both ROI and CAGR will be negative, representing a loss on the investment.",
  },
  {
    q: "Does this account for dividends or additional contributions?",
    a: "No — this calculates ROI purely from an initial and final value. If you received income (dividends, rent) along the way or made additional contributions, add those to the final value or account for them separately for an accurate picture.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="ROI Calculator"
      intro="Calculate the total return and annualized return (CAGR) on any investment."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("ROI Calculator", faqs)}
      methodology={
        <p className="text-muted">
          ROI% = (Final value − Initial investment) ÷ Initial investment ×
          100. CAGR% = ((Final value ÷ Initial investment)^(1/years) − 1) ×
          100.
        </p>
      }
    >
      <InvestmentRoiClient />
    </CalcPage>
  );
}
