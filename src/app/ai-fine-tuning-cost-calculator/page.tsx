import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { FineTuningCostClient } from "@/components/calculators/finetuning-cost-client";

const title = "AI Fine-Tuning Cost Calculator — OpenAI Training Pricing";
const description = "Estimate the one-time training cost of fine-tuning an OpenAI model, based on your dataset size, epochs, and model choice.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "Is fine-tuning training a one-time cost?",
    a: "Yes — training is billed once per run, based on your dataset's token count and how many epochs you train for. Ongoing use of the fine-tuned model is billed separately, at inference time, on every request.",
  },
  {
    q: "What's an epoch, and why does it multiply the cost?",
    a: "An epoch is one full pass through your training dataset. Training for 3 epochs processes your dataset 3 times, which is why the token-based training cost scales linearly with epoch count.",
  },
  {
    q: "Should I fine-tune, or use a bigger prompt with examples instead?",
    a: "Few-shot prompting (examples in the prompt) is usually cheaper and faster to iterate on for most tasks. Fine-tuning pays off when you need consistent behavior at high volume, want to shorten prompts, or need a capability few-shot examples can't reliably teach.",
  },
  {
    q: "Why is reinforcement fine-tuning priced differently?",
    a: "Reinforcement fine-tuning (used for o-series reasoning models) trains through many sampled rollouts rather than a fixed pass over labeled examples, so it's billed by compute time (GPU-hours) instead of a flat per-token rate.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="AI Fine-Tuning Cost Calculator"
      intro="Estimate the one-time training cost of fine-tuning an OpenAI model on your dataset."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("AI Fine-Tuning Cost Calculator", faqs)}
      methodology={
        <p className="text-muted">
          Token-based training: cost = dataset tokens × epochs ÷ 1,000,000 ×
          price per million tokens. Reinforcement fine-tuning: cost =
          training hours × price per hour.
        </p>
      }
    >
      <FineTuningCostClient />
    </CalcPage>
  );
}
