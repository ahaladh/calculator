import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { SaasCostClient } from "@/components/calculators/saas-cost-client";

const title = "AI SaaS Cost Calculator — Per-User AI Cost & Pricing";
const description = "Estimate your AI feature's cost per user and get a suggested subscription price at your target margin, based on token usage and active user count.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "How do I estimate token usage per user before launch?",
    a: "Prototype the feature and log actual token usage from real or representative sessions — usage varies a lot by feature type (a chat assistant uses far more tokens than a one-shot classifier), so an early estimate should come from real prompts, not a guess.",
  },
  {
    q: "Why does the suggested price assume a fixed margin?",
    a: "It's a starting point for AI cost alone — your actual pricing should also account for hosting, support, sales, and other overhead. Treat the suggested figure as a floor, not a finished price.",
  },
  {
    q: "What happens to margin if usage is heavier than expected?",
    a: "Cost scales directly with tokens used, so a subset of power users generating far more tokens than average can quietly erode margin on a flat-price plan — consider usage tiers or overage pricing if that's a risk.",
  },
  {
    q: "Should I pass AI costs through directly, or bundle them into a flat price?",
    a: "Bundling is simpler for users but riskier for you if usage varies widely; usage-based or tiered pricing protects margin better but adds billing complexity. Many SaaS products start bundled and add usage limits once real data comes in.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="AI SaaS Cost Calculator"
      intro="Estimate your AI feature's cost per user, and get a starting price suggestion at your target margin."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("AI SaaS Cost Calculator", faqs)}
      methodology={
        <p className="text-muted">
          cost per user = per-user token usage priced at the model&apos;s
          rate. suggested price = cost per user ÷ (1 − target margin).
          Total cost = cost per user × active users.
        </p>
      }
    >
      <SaasCostClient />
    </CalcPage>
  );
}
