import type { Metadata } from "next";
import {
  AiCalculatorPage,
  buildAiCalculatorJsonLd,
} from "@/components/calculators/ai-calculator-page";

const title = "AI Model Cost Comparison — GPT vs Claude vs Gemini";
const description = "Side-by-side AI model cost comparison across every current OpenAI, Anthropic, and Google model. Enter your usage once and see every model's monthly cost ranked cheapest first.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "What models are included in this comparison?",
    a: "Every current-generation OpenAI GPT model, every current Claude model, and every current Gemini model — ranging from budget/mini tiers to flagship reasoning models.",
  },
  {
    q: "Why does the ranking change when I adjust token counts?",
    a: "Models have different input-to-output price ratios. A model that's cheapest for input-heavy workloads (e.g. summarization) can rank differently for output-heavy workloads (e.g. long-form generation).",
  },
  {
    q: "Does a lower cost per token mean lower total cost?",
    a: "Not necessarily — it means lower cost for the same token counts. A less capable cheap model may need more tokens (retries, longer reasoning, verbose output) to complete the same task as a pricier one.",
  },
  {
    q: "How is context window relevant to cost?",
    a: "A larger context window lets you fit more history or reference material into one request without truncating, but it doesn't change the per-token price — long conversations still cost more the more tokens you resend each turn.",
  },
];

export default function Page() {
  return (
    <AiCalculatorPage
      h1="AI Model Cost Comparison"
      intro="See every current GPT, Claude, and Gemini model's monthly cost for the same usage, ranked cheapest first."
      defaultModelId="gpt-5.1"
      leadWithComparison
      faqs={faqs}
      jsonLd={buildAiCalculatorJsonLd("AI Model Cost Comparison", faqs)}
    />
  );
}
