import type { Metadata } from "next";
import {
  AiCalculatorPage,
  buildAiCalculatorJsonLd,
} from "@/components/calculators/ai-calculator-page";

const title = "ChatGPT API Cost Calculator — GPT-5.6, GPT-5.1 & GPT-4o Pricing";
const description = "Calculate the cost of building on the ChatGPT (OpenAI) API. Compare GPT-5.6, GPT-5.1, GPT-4.1, and GPT-4o pricing for your exact token usage and request volume.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/chatgpt-api-cost-calculator" },
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "Is the ChatGPT API the same as OpenAI's API?",
    a: "Yes — 'ChatGPT API' commonly refers to OpenAI's Chat Completions / Responses API, which powers ChatGPT and is billed per token, separately from the consumer ChatGPT Plus subscription.",
  },
  {
    q: "Which GPT model should I use to keep costs down?",
    a: "GPT-5.6 Luna and GPT-5-nano are the cheapest current tiers, suited to simple classification or extraction. Reserve GPT-5.6 Sol or GPT-5.1 for tasks that need stronger reasoning.",
  },
  {
    q: "Does OpenAI offer a cheaper way to process large volumes?",
    a: "Yes — the Batch API processes non-latency-sensitive requests asynchronously at roughly half the standard per-token price. This calculator estimates standard synchronous pricing.",
  },
  {
    q: "How is this different from my ChatGPT Plus subscription cost?",
    a: "ChatGPT Plus is a flat monthly consumer subscription with usage limits. The API is billed per token with no subscription fee, which is typically far cheaper at low volume and more predictable at scale.",
  },
];

export default function Page() {
  return (
    <AiCalculatorPage
      h1="ChatGPT API Cost Calculator"
      intro="Estimate the cost of building on OpenAI's API — from GPT-5.6 down to GPT-4o — for your exact usage."
      defaultModelId="gpt-5.1"
      faqs={faqs}
      jsonLd={buildAiCalculatorJsonLd("ChatGPT API Cost Calculator", faqs)}
    />
  );
}
