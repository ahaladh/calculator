import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { RoiClient } from "@/components/calculators/roi-client";

const title = "AI ROI Calculator — Return on Investment for AI Tools";
const description = "Calculate the return on investment of adopting an AI tool — value of time saved versus subscription cost, net monthly savings, and payback period.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "How do I estimate hours saved per employee?",
    a: "Time a task before and after introducing the AI tool for a small group of users, or survey users directly — a rough estimate from a short pilot is far more reliable than guessing from vendor marketing claims.",
  },
  {
    q: "What counts as 'fully-loaded hourly labor cost'?",
    a: "Salary plus benefits, payroll taxes, and overhead — not just base pay. It's typically 1.25-1.4x an employee's base hourly wage, and using base pay alone will understate the real value of time saved.",
  },
  {
    q: "Is a payback period always meaningful?",
    a: "Only when there's a one-time setup cost to recoup — if you're only paying an ongoing subscription with no upfront investment, monthly net savings and ROI percent are the more relevant numbers.",
  },
  {
    q: "What if hours saved are hard to quantify?",
    a: "For tools that improve quality rather than save time directly (fewer errors, better output), estimate the dollar value of that improvement — a reduced error rate translated into avoided rework cost — and use that as your 'value' input instead.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="AI ROI Calculator"
      intro="Calculate the return on investment of an AI tool — time saved versus what it costs to run."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("AI ROI Calculator", faqs)}
      methodology={
        <p className="text-muted">
          value of time saved = employees × hours saved/week × 4.345 ×
          hourly labor cost. net savings = value of time saved − monthly AI
          cost. ROI% = net savings ÷ AI cost. Payback = setup cost ÷ net
          monthly savings.
        </p>
      }
    >
      <RoiClient />
    </CalcPage>
  );
}
