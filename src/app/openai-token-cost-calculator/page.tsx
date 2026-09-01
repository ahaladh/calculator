import type { Metadata } from "next";
import {
  AiCalculatorPage,
  buildAiCalculatorJsonLd,
} from "@/components/calculators/ai-calculator-page";

const title = "OpenAI Token Cost Calculator — GPT Pricing by Model";
const description = "Calculate OpenAI token costs across GPT-5.6, GPT-5, GPT-4.1, and GPT-4o. Enter input/output token counts to see per-request and monthly pricing for every current OpenAI model.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "How many tokens is my prompt?",
    a: "As a rule of thumb, 1 token ≈ 4 characters ≈ ¾ of a word in English. For exact counts, use OpenAI's tokenizer or the `tiktoken` library — this calculator takes token counts as input rather than raw text.",
  },
  {
    q: "What's the price difference between GPT-5.6 tiers?",
    a: "GPT-5.6 Sol, Terra, and Luna are priced roughly 20x apart between the cheapest and most capable tier — Luna costs $0.20/$1.20 per million input/output tokens, Sol costs $4.00/$20.00.",
  },
  {
    q: "Does OpenAI charge for cached tokens?",
    a: "Yes, at a discount — repeated prompt prefixes (like a fixed system prompt) are automatically detected and billed at the cached input rate, roughly 10% of the standard input rate, with no code changes required.",
  },
  {
    q: "Are older models like GPT-3.5 still cheaper?",
    a: "GPT-3.5 Turbo remains inexpensive but is now a legacy model; GPT-5-nano and GPT-5.6 Luna are comparably priced with significantly better capability for most tasks.",
  },
];

export default function Page() {
  return (
    <AiCalculatorPage
      h1="OpenAI Token Cost Calculator"
      intro="Calculate OpenAI API token costs for every current GPT model, from GPT-5.6 Luna to GPT-5.6 Sol."
      defaultModelId="gpt-4o-mini"
      faqs={faqs}
      jsonLd={buildAiCalculatorJsonLd("OpenAI Token Cost Calculator", faqs)}
    />
  );
}
