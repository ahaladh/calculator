import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { TokenCounterClient } from "@/components/calculators/token-counter-client";

export const metadata: Metadata = {
  title: "Prompt Token Calculator — Count Tokens in Your Prompt",
  description:
    "Paste your prompt to estimate its token count across GPT, Claude, and Gemini tokenizers, plus what it would cost as input to a sample model from each.",
};

const faqs = [
  {
    q: "Why does my prompt's token count matter?",
    a: "Providers bill by token, and models have a maximum context window measured in tokens — knowing your prompt's token count tells you both what it costs and whether it fits.",
  },
  {
    q: "Does punctuation and whitespace count as tokens?",
    a: "Yes — tokenizers split on subword units, not just words, so punctuation, whitespace, and formatting all consume tokens, which is part of why token counts run higher than word counts.",
  },
  {
    q: "Why do different models report different token counts for the same text?",
    a: "Each provider trains its own tokenizer with a different vocabulary, so the same text splits into a different number of tokens depending on which model will process it.",
  },
  {
    q: "Is this an exact count?",
    a: "No — this uses a character-based estimate (roughly 4 characters per token), a widely used approximation. For an exact count, use the provider's own tokenizer.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="Prompt Token Calculator"
      intro="Paste your prompt to estimate its token count and cost across GPT, Claude, and Gemini tokenizers."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("Prompt Token Calculator", faqs)}
      methodology={
        <p className="text-muted">
          tokens ≈ characters ÷ 4 (English prose rule of thumb, varies
          slightly by tokenizer family). For exact counts, use the
          provider&apos;s own tokenizer library.
        </p>
      }
    >
      <TokenCounterClient />
    </CalcPage>
  );
}
