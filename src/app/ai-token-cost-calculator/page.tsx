import type { Metadata } from "next";
import {
  AiCalculatorPage,
  buildAiCalculatorJsonLd,
} from "@/components/calculators/ai-calculator-page";

const title = "AI Token Cost Calculator — Estimate LLM Token Spend";
const description = "Estimate what your AI tokens actually cost. Enter input/output token counts and requests per day to get per-request, daily, and monthly spend across OpenAI, Anthropic, and Google models.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "What is a token?",
    a: "A token is the unit LLM providers bill by — roughly 4 characters or ¾ of a word in English. A 1,000-word prompt is typically around 1,300 tokens.",
  },
  {
    q: "Why are input and output tokens priced differently?",
    a: "Generating output tokens costs more compute per token than reading input tokens, so providers charge a higher per-token rate for output — often 4-6x the input rate.",
  },
  {
    q: "What are cached input tokens?",
    a: "When you send the same prompt prefix repeatedly (a system prompt, long context document), providers can cache it and charge a discounted rate — typically 10% of the standard input rate — on subsequent requests.",
  },
  {
    q: "How accurate is this estimate?",
    a: "This calculator uses each provider's published list price. Your actual bill depends on exact tokenization, any volume discounts, and rate changes — check the provider's pricing page for the authoritative current rate.",
  },
];

export default function Page() {
  return (
    <AiCalculatorPage
      h1="AI Token Cost Calculator"
      intro="Enter your token usage to estimate what it costs to run — per request, per day, and per month — across every major LLM provider."
      defaultModelId="gpt-5.1"
      faqs={faqs}
      jsonLd={buildAiCalculatorJsonLd("AI Token Cost Calculator", faqs)}
    />
  );
}
