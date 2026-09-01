import Decimal from "decimal.js";
import { getEmbeddingModel } from "./embedding-pricing";

const MTOK = new Decimal(1_000_000);

export interface EmbeddingCostInput {
  modelId: string;
  documentCount: number;
  avgTokensPerDocument: number;
}

export interface EmbeddingCostResult {
  totalTokens: number;
  indexingCost: string;
}

export function calculateEmbeddingCost(
  input: EmbeddingCostInput,
): EmbeddingCostResult | null {
  const model = getEmbeddingModel(input.modelId);
  if (!model) return null;

  const documentCount = new Decimal(Math.max(0, input.documentCount));
  const avgTokens = new Decimal(Math.max(0, input.avgTokensPerDocument));
  const totalTokens = documentCount.times(avgTokens);
  const indexingCost = totalTokens.div(MTOK).times(model.pricePerMTok);

  return {
    totalTokens: totalTokens.toNumber(),
    indexingCost: indexingCost.toFixed(4),
  };
}
