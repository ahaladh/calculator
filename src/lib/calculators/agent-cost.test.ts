import { describe, expect, it } from "vitest";
import { calculateAgentCost } from "./agent-cost";

describe("calculateAgentCost", () => {
  it("charges input tokens once for a single-step task", () => {
    const result = calculateAgentCost({
      modelId: "gpt-5.1",
      steps: 1,
      baseInputTokens: 1_000_000,
      outputTokensPerStep: 0,
      toolResultTokensPerStep: 0,
      tasksPerDay: 1,
    });
    expect(result!.totalInputTokens).toBe(1_000_000);
    expect(result!.costPerTask).toBe("1.2500");
  });

  it("grows input tokens across steps as context accumulates", () => {
    const result = calculateAgentCost({
      modelId: "gpt-5.1",
      steps: 3,
      baseInputTokens: 1000,
      outputTokensPerStep: 200,
      toolResultTokensPerStep: 300,
      tasksPerDay: 1,
    });
    // step1: input=1000; step2: input=1000+200+300=1500; step3: input=1500+500=2000
    expect(result!.totalInputTokens).toBe(1000 + 1500 + 2000);
    expect(result!.totalOutputTokens).toBe(600);
  });

  it("scales monthly cost from cost per task and tasks per day", () => {
    const result = calculateAgentCost({
      modelId: "claude-haiku-4-5",
      steps: 2,
      baseInputTokens: 500,
      outputTokensPerStep: 100,
      toolResultTokensPerStep: 100,
      tasksPerDay: 200,
    });
    const perTask = Number(result!.costPerTask);
    expect(Number(result!.costPerDay)).toBeCloseTo(perTask * 200, 1);
    expect(Number(result!.costPerMonth)).toBeCloseTo(perTask * 200 * 30, 1);
  });

  it("returns null for an unknown model", () => {
    expect(
      calculateAgentCost({
        modelId: "nope",
        steps: 1,
        baseInputTokens: 1,
        outputTokensPerStep: 1,
        toolResultTokensPerStep: 1,
        tasksPerDay: 1,
      }),
    ).toBeNull();
  });

  it("treats a fractional or zero step count as at least one step", () => {
    const result = calculateAgentCost({
      modelId: "gpt-5.1",
      steps: 0,
      baseInputTokens: 100,
      outputTokensPerStep: 50,
      toolResultTokensPerStep: 0,
      tasksPerDay: 1,
    });
    expect(result!.totalInputTokens).toBe(100);
  });
});
