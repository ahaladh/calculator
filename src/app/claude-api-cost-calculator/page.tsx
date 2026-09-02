import type { Metadata } from "next";
import {
  AiCalculatorPage,
  buildAiCalculatorJsonLd,
} from "@/components/calculators/ai-calculator-page";

const title = "Claude API Cost Calculator — Anthropic Model Pricing";
const description = "Calculate Claude API costs across Opus 5, Sonnet 5, and Haiku 4.5. Enter your token usage to see per-request, daily, and monthly Anthropic API pricing.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/claude-api-cost-calculator" },
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "What's the price difference between Claude Opus, Sonnet, and Haiku?",
    a: "Claude Opus 5 ($5/$25 per MTok input/output) is Anthropic's flagship for complex agentic and coding work; Sonnet 5 ($2/$10) balances cost and capability for everyday tasks; Haiku 4.5 ($1/$5) is the fastest and cheapest tier, suited to high-volume, latency-sensitive workloads.",
  },
  {
    q: "How much does Claude prompt caching save?",
    a: "Anthropic prices cached input tokens at roughly 10% of the standard input rate — for Claude Opus 5 that's $0.50/MTok cached versus $5.00/MTok standard, a meaningful saving for repeated system prompts or long reference documents.",
  },
  {
    q: "What is Claude Fable 5?",
    a: "Claude Fable 5 is Anthropic's most capable widely released model, priced above Opus 5 at $10/$50 per MTok, intended for the most demanding reasoning and long-horizon agentic work.",
  },
  {
    q: "Does Claude pricing differ on AWS Bedrock or Google Vertex AI?",
    a: "Anthropic's first-party API rates (used in this calculator) also apply on Microsoft Foundry. Amazon Bedrock and Google Vertex AI are partner-operated with separate pricing — check AWS's or Google Cloud's pricing pages for those rates.",
  },
];

export default function Page() {
  return (
    <AiCalculatorPage
      h1="Claude API Cost Calculator"
      intro="Calculate Anthropic Claude API costs across Opus, Sonnet, and Haiku for your exact token usage."
      defaultModelId="claude-opus-5"
      faqs={faqs}
      jsonLd={buildAiCalculatorJsonLd("Claude API Cost Calculator", faqs)}
    />
  );
}
