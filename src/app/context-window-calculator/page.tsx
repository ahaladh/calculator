import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { ContextWindowClient } from "@/components/calculators/context-window-client";

export const metadata: Metadata = {
  title: "Context Window Calculator — Check How Much Fits",
  description:
    "Calculate how much of a model's context window your conversation or document uses, how much budget remains, and how many more messages will fit.",
};

const faqs = [
  {
    q: "What happens when I exceed the context window?",
    a: "The request fails outright, or (depending on the API) the oldest content is silently dropped — neither is good. Trim history, summarize, or use a model with a larger context window before you hit the limit.",
  },
  {
    q: "Why reserve tokens for the response?",
    a: "The model's output also counts against the context window on some APIs, and even where it doesn't, you need room for `max_tokens` — leaving no budget for a response causes a truncated or failed generation.",
  },
  {
    q: "Does a bigger context window mean better quality?",
    a: "Not necessarily — a larger window lets you fit more content, but models can still lose track of details in very long contexts ('lost in the middle'). Bigger isn't automatically better for accuracy.",
  },
  {
    q: "How do I stay under budget in a long conversation?",
    a: "Summarize or drop older turns, use server-side compaction where the provider offers it, or retrieve only relevant context (RAG) instead of resending the full history every turn.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="Context Window Calculator"
      intro="See how much of a model's context window your content uses, and how much room is left."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("Context Window Calculator", faqs)}
      methodology={
        <p className="text-muted">
          used = existing tokens + reserved output tokens. remaining budget =
          context window − used. Context window sizes are each
          provider&apos;s published maximum for that model.
        </p>
      }
    >
      <ContextWindowClient />
    </CalcPage>
  );
}
