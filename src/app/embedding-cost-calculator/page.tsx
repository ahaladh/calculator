import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { EmbeddingCostClient } from "@/components/calculators/embedding-cost-client";

const title = "Embedding Cost Calculator — OpenAI & Google Pricing";
const description = "Calculate the cost of embedding your document corpus with OpenAI or Google embedding models, based on document count, chunk size, and re-indexing frequency.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "Why is embedding so much cheaper than chat completion?",
    a: "Embedding models only produce a fixed-size vector, not generated text, so there's no expensive output-token cost — pricing is a single low per-token input rate, often 50-250x cheaper than LLM output pricing.",
  },
  {
    q: "How should I choose a chunk size?",
    a: "Smaller chunks (200-400 tokens) retrieve more precisely but need more chunks per query; larger chunks (800-1500 tokens) capture more context per chunk but can dilute retrieval relevance. Chunk size also directly sets your indexing token count.",
  },
  {
    q: "Do I need to re-embed my whole corpus regularly?",
    a: "Only if the underlying documents change. A static knowledge base needs one indexing pass; a frequently updated corpus (docs, tickets, changing product data) needs periodic re-indexing, which this calculator lets you factor in as a monthly cost.",
  },
  {
    q: "Which embedding model should I use?",
    a: "text-embedding-3-small is the cheapest and fine for most retrieval use cases; text-embedding-3-large trades roughly 6x the cost for higher-dimensional, generally more accurate embeddings on harder retrieval tasks.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="Embedding Cost Calculator"
      intro="Estimate the cost of embedding your document corpus for search or retrieval."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("Embedding Cost Calculator", faqs)}
      methodology={
        <p className="text-muted">
          cost = documents × average tokens per document ÷ 1,000,000 ×
          price per million tokens. Multiply by re-indexes per month for an
          ongoing monthly figure.
        </p>
      }
    >
      <EmbeddingCostClient />
    </CalcPage>
  );
}
