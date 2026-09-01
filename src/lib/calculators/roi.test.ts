import { describe, expect, it } from "vitest";
import { calculateRoi } from "./roi";

describe("calculateRoi", () => {
  it("values time saved at hours × weeks/month × hourly rate × employees", () => {
    const result = calculateRoi({
      employeesAffected: 10,
      hoursSavedPerWeek: 5,
      hourlyLaborCost: 40,
      monthlyAiCost: 0,
      oneTimeSetupCost: 0,
    });
    // 10 * 5 * 4.345 * 40 = 8690
    expect(result.monthlyValueOfTimeSaved).toBe("8690.00");
  });

  it("computes net savings and ROI percent against AI cost", () => {
    const result = calculateRoi({
      employeesAffected: 10,
      hoursSavedPerWeek: 5,
      hourlyLaborCost: 40,
      monthlyAiCost: 2000,
      oneTimeSetupCost: 0,
    });
    expect(result.netMonthlySavings).toBe("6690.00");
    expect(Number(result.roiPct)).toBeCloseTo(334.5, 0);
  });

  it("computes payback period in months when there is a setup cost and positive savings", () => {
    const result = calculateRoi({
      employeesAffected: 10,
      hoursSavedPerWeek: 5,
      hourlyLaborCost: 40,
      monthlyAiCost: 2000,
      oneTimeSetupCost: 13380,
    });
    expect(result.paybackMonths).toBe("2.0");
  });

  it("returns null payback when net savings are not positive", () => {
    const result = calculateRoi({
      employeesAffected: 1,
      hoursSavedPerWeek: 1,
      hourlyLaborCost: 10,
      monthlyAiCost: 10_000,
      oneTimeSetupCost: 5000,
    });
    expect(result.paybackMonths).toBeNull();
  });

  it("does not divide by zero when AI cost is zero", () => {
    const result = calculateRoi({
      employeesAffected: 1,
      hoursSavedPerWeek: 1,
      hourlyLaborCost: 10,
      monthlyAiCost: 0,
      oneTimeSetupCost: 0,
    });
    expect(result.roiPct).toBe("0.0");
  });
});
