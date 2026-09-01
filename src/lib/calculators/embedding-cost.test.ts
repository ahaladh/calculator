import { describe, expect, it } from "vitest";
import { calculateEmbeddingCost } from "./embedding-cost";

describe("calculateEmbeddingCost", () => {
  it("computes indexing cost from document count and average tokens", () => {
    const result = calculateEmbeddingCost({
      modelId: "text-embedding-3-small",
      documentCount: 10_000,
      avgTokensPerDocument: 500,
    });
    // 5,000,000 tokens * $0.02/MTok = $0.10
    expect(result!.totalTokens).toBe(5_000_000);
    expect(result!.indexingCost).toBe("0.1000");
  });

  it("returns null for an unknown model", () => {
    expect(
      calculateEmbeddingCost({ modelId: "nope", documentCount: 1, avgTokensPerDocument: 1 }),
    ).toBeNull();
  });

  it("handles zero documents", () => {
    const result = calculateEmbeddingCost({
      modelId: "text-embedding-3-large",
      documentCount: 0,
      avgTokensPerDocument: 500,
    });
    expect(result!.indexingCost).toBe("0.0000");
  });
});
