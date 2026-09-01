import { describe, expect, it } from "vitest";
import { calculateGpuCost } from "./gpu-cost";

describe("calculateGpuCost", () => {
  it("multiplies GPU count, hourly rate, hours/day, and days/month", () => {
    const result = calculateGpuCost({
      gpuId: "a100-typical",
      gpuCount: 4,
      hoursPerDay: 24,
      daysPerMonth: 30,
    });
    // 4 * $2.21 * 24 * 30 = $6,364.80
    expect(result!.costPerMonth).toBe("6364.80");
  });

  it("caps hours per day at 24 and days per month at 31", () => {
    const result = calculateGpuCost({
      gpuId: "h100-sxm-runpod",
      gpuCount: 1,
      hoursPerDay: 48,
      daysPerMonth: 60,
    });
    expect(result!.costPerDay).toBe((2.69 * 24).toFixed(2));
  });

  it("returns null for an unknown GPU option", () => {
    expect(
      calculateGpuCost({ gpuId: "nope", gpuCount: 1, hoursPerDay: 1, daysPerMonth: 1 }),
    ).toBeNull();
  });
});
