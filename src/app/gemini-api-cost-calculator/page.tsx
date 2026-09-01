import type { Metadata } from "next";
import {
  AiCalculatorPage,
  buildAiCalculatorJsonLd,
} from "@/components/calculators/ai-calculator-page";

const title = "Gemini API Cost Calculator — Google AI Model Pricing";
const description = "Calculate Google Gemini API costs across Gemini 3.7 Flash, 3.5 Flash, Flash-Lite, and 3.1 Pro. Enter your token usage to see per-request and monthly pricing.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "What's the cheapest Gemini model?",
    a: "Gemini 3.5 Flash-Lite is the cheapest current-generation model at $0.30/$2.50 per million input/output tokens, suited to high-volume, simple tasks.",
  },
  {
    q: "Why does Gemini 3.1 Pro cost more above 200K tokens?",
    a: "Google prices long-context requests on a separate, higher tier — Gemini 3.1 Pro rises from $2.00/$12.00 to $4.00/$18.00 per million input/output tokens once a request exceeds 200K tokens.",
  },
  {
    q: "Is the Gemini 3.7 Flash price permanent?",
    a: "No — it's an introductory rate. Google's published pricing shows Gemini 3.7 Flash at $0.75/$3.75 per million tokens through the end of 2026, doubling to $1.50/$7.50 starting January 1, 2027.",
  },
  {
    q: "Does Gemini support prompt caching?",
    a: "Yes — cached input tokens are billed at a fraction of the standard input rate (around 10%), the same mechanism OpenAI and Anthropic use for repeated prompt prefixes.",
  },
];

export default function Page() {
  return (
    <AiCalculatorPage
      h1="Gemini API Cost Calculator"
      intro="Calculate Google Gemini API costs across Flash, Flash-Lite, and Pro tiers for your exact token usage."
      defaultModelId="gemini-3.5-flash"
      faqs={faqs}
      jsonLd={buildAiCalculatorJsonLd("Gemini API Cost Calculator", faqs)}
    />
  );
}
