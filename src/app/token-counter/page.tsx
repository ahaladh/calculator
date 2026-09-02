import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { TokenCounterClient } from "@/components/calculators/token-counter-client";

const title = "Token Counter — Count Characters, Words & AI Tokens";
const description = "Free online token counter. Paste any text to instantly see character count, word count, and estimated AI token count for GPT, Claude, and Gemini.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/token-counter" },
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "What's the difference between a word count and a token count?",
    a: "A word counter splits on whitespace. A token counter splits the way an LLM's tokenizer does — subword units that don't map 1:1 to words, which is why token counts are usually higher than word counts.",
  },
  {
    q: "How many tokens is 1,000 words?",
    a: "Roughly 1,300 tokens for English prose, using the common ¾-word-per-token rule of thumb — the exact figure varies by tokenizer and content type (code and non-English text tokenize differently).",
  },
  {
    q: "Can I use this to check if my text fits a model's context window?",
    a: "Yes — compare the estimated token count here against your target model's context window. For a detailed budget across a full conversation, use the Context Window Calculator.",
  },
  {
    q: "Does this tool store or send my text anywhere?",
    a: "No — the count is computed entirely in your browser from the text you paste; nothing is sent to a server.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="Token Counter"
      intro="Paste any text to count characters, words, and estimated AI tokens across major model tokenizers."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("Token Counter", faqs)}
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
