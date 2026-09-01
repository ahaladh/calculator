import type { Provider } from "./ai-pricing";

export interface EmbeddingModelPricing {
  id: string;
  label: string;
  provider: Provider;
  pricePerMTok: number;
  note?: string;
}

/** Verified against each provider's own pricing page as of 2026-09-01. */
export const EMBEDDING_MODELS: EmbeddingModelPricing[] = [
  { id: "text-embedding-3-small", label: "text-embedding-3-small", provider: "openai", pricePerMTok: 0.02 },
  { id: "text-embedding-3-large", label: "text-embedding-3-large", provider: "openai", pricePerMTok: 0.13 },
  { id: "text-embedding-ada-002", label: "text-embedding-ada-002", provider: "openai", pricePerMTok: 0.1 },
  { id: "gemini-embedding-2", label: "Gemini Embedding 2", provider: "google", pricePerMTok: 0.2, note: "$0.45/M for image input." },
];

export function getEmbeddingModel(id: string): EmbeddingModelPricing | undefined {
  return EMBEDDING_MODELS.find((m) => m.id === id);
}
