import { describe, expect, it } from "vitest";
import { calculateFineTuneCost } from "./finetuning-cost";

describe("calculateFineTuneCost", () => {
  it("computes token-based training cost across epochs", () => {
    const result = calculateFineTuneCost({
      modelId: "gpt-4o-mini-2024-07-18",
      trainingTokens: 1_000_000,
      epochs: 3,
      trainingHours: 0,
    });
    // 3M tokens * $3.00/MTok = $9.00
    expect(result!.trainingCost).toBe("9.00");
    expect(result!.billingUnit).toBe("per_mtok");
  });

  it("computes hourly training cost for reinforcement fine-tuning", () => {
    const result = calculateFineTuneCost({
      modelId: "o4-mini-2025-04-16",
      trainingTokens: 0,
      epochs: 1,
      trainingHours: 5,
    });
    expect(result!.trainingCost).toBe("500.00");
    expect(result!.billingUnit).toBe("per_hour");
  });

  it("treats epochs below 1 as 1", () => {
    const result = calculateFineTuneCost({
      modelId: "gpt-4o-2024-08-06",
      trainingTokens: 1_000_000,
      epochs: 0,
      trainingHours: 0,
    });
    expect(result!.trainingCost).toBe("25.00");
  });

  it("returns null for an unknown model", () => {
    expect(
      calculateFineTuneCost({ modelId: "nope", trainingTokens: 1, epochs: 1, trainingHours: 1 }),
    ).toBeNull();
  });
});
