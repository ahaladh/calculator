import type { Metadata } from "next";
import {
  AiCalculatorPage,
  buildAiCalculatorJsonLd,
} from "@/components/calculators/ai-calculator-page";

const title = "LLM Cost Calculator — Compare Model Pricing Across Providers";
const description = "Compare LLM costs across every major model — GPT, Claude, and Gemini — side by side. See which model is cheapest for your exact token usage and request volume.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "Which LLM is cheapest?",
    a: "It depends entirely on your token mix and required quality. Budget-tier models (GPT-5.6 Luna, Gemini Flash-Lite, Claude Haiku) are cheapest per token, but a flagship model may finish a task in fewer, more accurate turns — making it cheaper per completed task.",
  },
  {
    q: "Should I compare cost per token or cost per task?",
    a: "Cost per token is easy to compare but misleading on its own. A cheaper model that needs retries or produces longer, less useful output can cost more per completed task than a pricier, more capable one.",
  },
  {
    q: "Do all providers price input and output tokens the same way?",
    a: "The mechanism is the same — separate per-token rates for input and output, usually with a cached-input discount — but the actual rates vary widely by provider and model tier, which is what this comparison table shows.",
  },
  {
    q: "How often does LLM pricing change?",
    a: "Frequently — new model releases, price cuts, and tiered rates for long-context requests are common. This calculator is checked against provider pricing pages, but always verify before committing to a large-scale budget.",
  },
];

export default function Page() {
  return (
    <AiCalculatorPage
      h1="LLM Cost Calculator"
      intro="Compare LLM pricing side by side across OpenAI, Anthropic, and Google for your exact usage pattern."
      defaultModelId="gpt-5.1"
      leadWithComparison
      faqs={faqs}
      jsonLd={buildAiCalculatorJsonLd("LLM Cost Calculator", faqs)}
    />
  );
}
