import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { RagCostClient } from "@/components/calculators/rag-cost-client";

const title = "RAG Cost Calculator — Retrieval-Augmented Generation Pricing";
const description = "Estimate the full cost of a RAG pipeline — indexing, query embedding, and LLM generation — based on your corpus size, retrieval settings, and query volume.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/rag-cost-calculator" },
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "What costs make up a RAG pipeline?",
    a: "Three separate costs: a one-time (or periodic) indexing cost to embed your corpus, a small per-query embedding cost for the user's question, and the LLM generation cost for producing an answer from the retrieved context — plus vector database hosting, which isn't token-based and is estimated separately.",
  },
  {
    q: "Why does retrieved context dominate the generation cost?",
    a: "Each retrieved chunk gets added to the LLM's input — retrieving 5 chunks of 300 tokens each adds 1,500 input tokens per query, on top of the user's question, often making retrieved context the largest single cost driver in a RAG system.",
  },
  {
    q: "How can I reduce RAG costs without hurting answer quality?",
    a: "Reduce chunk size or the number of chunks retrieved, use a cheaper model for generation, cache repeated system-prompt instructions, and re-index only when your corpus actually changes rather than on a fixed schedule.",
  },
  {
    q: "Does this include vector database hosting costs?",
    a: "No — vector database storage and query costs vary widely by provider (managed service vs. self-hosted) and aren't token-based, so add your vector DB's hosting fee on top of this estimate.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="RAG Cost Calculator"
      intro="Estimate the full monthly cost of a retrieval-augmented generation pipeline — indexing, retrieval, and generation."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("RAG Cost Calculator", faqs)}
      methodology={
        <p className="text-muted">
          total = one-time indexing cost + (query embedding cost × queries)
          + LLM generation cost, where generation input tokens = retrieved
          chunks × average chunk size + query tokens.
        </p>
      }
    >
      <RagCostClient />
    </CalcPage>
  );
}
