import { describe, expect, it } from "vitest";
import { calculateSaasCost } from "./saas-cost";

describe("calculateSaasCost", () => {
  it("multiplies per-user monthly cost by active users", () => {
    const result = calculateSaasCost({
      modelId: "gpt-4o-mini",
      inputTokensPerUser: 1000,
      outputTokensPerUser: 500,
      requestsPerUserPerDay: 5,
      activeUsers: 1000,
      targetMarginPct: 0,
    });
    expect(result).not.toBeNull();
    const perUser = Number(result!.costPerUserPerMonth);
    expect(Number(result!.totalMonthlyCost)).toBeCloseTo(perUser * 1000, 1);
  });

  it("computes a suggested price that yields the target margin", () => {
    const result = calculateSaasCost({
      modelId: "gpt-4o-mini",
      inputTokensPerUser: 1000,
      outputTokensPerUser: 500,
      requestsPerUserPerDay: 5,
      activeUsers: 100,
      targetMarginPct: 80,
    });
    const cost = Number(result!.costPerUserPerMonth);
    const price = Number(result!.suggestedPricePerUser);
    // margin = (price - cost) / price
    const impliedMargin = (price - cost) / price;
    expect(impliedMargin).toBeCloseTo(0.8, 1);
  });

  it("returns null for an unknown model", () => {
    expect(
      calculateSaasCost({
        modelId: "nope",
        inputTokensPerUser: 1,
        outputTokensPerUser: 1,
        requestsPerUserPerDay: 1,
        activeUsers: 1,
        targetMarginPct: 0,
      }),
    ).toBeNull();
  });
});
