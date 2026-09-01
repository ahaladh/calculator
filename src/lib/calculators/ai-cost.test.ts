import { describe, expect, it } from "vitest";
import { calculateAiCost, compareAllModels } from "./ai-cost";

describe("calculateAiCost", () => {
  it("computes cost from list price for a single request", () => {
    const result = calculateAiCost({
      modelId: "gpt-5.1",
      inputTokens: 1_000_000,
      outputTokens: 1_000_000,
      requestsPerDay: 1,
    });
    expect(result).not.toBeNull();
    expect(result!.costPerRequest).toBe("11.250000");
  });

  it("applies the cached-input discount to cached tokens only", () => {
    const result = calculateAiCost({
      modelId: "claude-opus-5",
      inputTokens: 1_000_000,
      cachedInputTokens: 1_000_000,
      outputTokens: 0,
      requestsPerDay: 1,
    });
    // fully cached: 1M tokens at the $0.50/MTok cached rate
    expect(result!.costPerRequest).toBe("0.500000");
  });

  it("scales day/month/year projections off requests per day", () => {
    const result = calculateAiCost({
      modelId: "gpt-4o-mini",
      inputTokens: 100_000,
      outputTokens: 50_000,
      requestsPerDay: 100,
    });
    const perRequest = Number(result!.costPerRequest);
    expect(Number(result!.costPerDay)).toBeCloseTo(perRequest * 100, 2);
    expect(Number(result!.costPerMonth)).toBeCloseTo(perRequest * 100 * 30, 2);
    expect(Number(result!.costPerYear)).toBeCloseTo(perRequest * 100 * 365, 2);
  });

  it("returns null for an unknown model id", () => {
    expect(calculateAiCost({ modelId: "not-a-model", inputTokens: 1, outputTokens: 1, requestsPerDay: 1 })).toBeNull();
  });

  it("never goes negative when cached tokens exceed input tokens", () => {
    const result = calculateAiCost({
      modelId: "gpt-5.1",
      inputTokens: 100,
      cachedInputTokens: 10_000,
      outputTokens: 0,
      requestsPerDay: 1,
    });
    expect(Number(result!.costPerRequest)).toBeGreaterThanOrEqual(0);
  });

  it("handles zero tokens and zero requests without error", () => {
    const result = calculateAiCost({
      modelId: "gpt-5.1",
      inputTokens: 0,
      outputTokens: 0,
      requestsPerDay: 0,
    });
    expect(result!.costPerRequest).toBe("0.000000");
    expect(result!.costPerMonth).toBe("0.00");
  });
});

describe("compareAllModels", () => {
  it("returns every model sorted from cheapest to most expensive monthly cost", () => {
    const rows = compareAllModels({
      inputTokens: 1000,
      outputTokens: 1000,
      requestsPerDay: 50,
    });
    expect(rows.length).toBeGreaterThan(20);
    for (let i = 1; i < rows.length; i++) {
      expect(Number(rows[i].costPerMonth)).toBeGreaterThanOrEqual(
        Number(rows[i - 1].costPerMonth),
      );
    }
  });
});
