import type { Metadata } from "next";
import {
  AiCalculatorPage,
  buildAiCalculatorJsonLd,
} from "@/components/calculators/ai-calculator-page";

const title = "AI API Cost Calculator — Budget Your LLM API Spend";
const description = "Plan your AI API budget before you build. Estimate monthly and yearly spend for OpenAI, Claude, and Gemini API calls based on your expected request volume and token usage.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "How do I estimate my request volume before launch?",
    a: "Start from expected daily active users × average requests per user per day. For a chatbot, 1-3 requests per session is typical; for an agent with tool calls, count each model call in the loop separately.",
  },
  {
    q: "Does this account for system prompts and conversation history?",
    a: "Include them in your input token count — every prior turn you resend to a stateless API counts as input tokens on that request, which is why long conversations get progressively more expensive without caching.",
  },
  {
    q: "Can I compare providers side by side?",
    a: "Yes — the comparison table below the calculator shows every model's projected monthly cost for the same usage, sorted cheapest to most expensive.",
  },
  {
    q: "What's the biggest lever for reducing API costs?",
    a: "Prompt caching for repeated context, choosing a smaller/cheaper model for routine tasks, and trimming unnecessary output length typically save more than switching providers.",
  },
];

export default function Page() {
  return (
    <AiCalculatorPage
      h1="AI API Cost Calculator"
      intro="Budget your AI API spend before you build. Model your expected usage and see the monthly bill across providers."
      defaultModelId="gpt-5.1"
      faqs={faqs}
      jsonLd={buildAiCalculatorJsonLd("AI API Cost Calculator", faqs)}
    />
  );
}
