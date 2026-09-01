import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { AgentCostClient } from "@/components/calculators/agent-cost-client";

const title = "AI Agent Cost Calculator — Multi-Step Tool-Calling Cost";
const description = "Estimate the cost of an AI agent that loops through multiple tool calls per task. Accounts for the compounding input tokens each step resends.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "Why does an agent cost more than a single API call?",
    a: "Every step in an agent loop resends the entire conversation so far — prior responses and tool results — as input tokens, because the API is stateless. A 5-step task doesn't cost 5x a single call; it costs more, because later steps carry a longer accumulated history.",
  },
  {
    q: "What's the biggest lever for reducing agent costs?",
    a: "Trimming or caching the tool results appended to context — a step that returns a large search result or file contents grows every subsequent step's input cost. Prompt caching on the stable prefix of that growing context is often the single biggest saving.",
  },
  {
    q: "Should I use a cheaper model for agent loops?",
    a: "It depends on the task — a cheaper model that needs more steps or retries to complete a task can end up costing more overall than a pricier model that finishes reliably in fewer steps. Measure cost per completed task, not cost per step.",
  },
  {
    q: "How do I estimate steps per task before building the agent?",
    a: "Prototype a handful of representative tasks manually or in a test harness and count the actual tool calls used — this is far more reliable than guessing, since step count varies a lot by task complexity.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="AI Agent Cost Calculator"
      intro="Estimate the cost of a multi-step, tool-calling AI agent — accounting for how context compounds across steps."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("AI Agent Cost Calculator", faqs)}
      methodology={
        <p className="text-muted">
          Each step&apos;s input tokens = all prior steps&apos; output +
          tool results, since the conversation is resent in full every
          step. Total task cost sums every step&apos;s input and output
          cost; monthly cost = cost per task × tasks per day × 30.
        </p>
      }
    >
      <AgentCostClient />
    </CalcPage>
  );
}
