import { describe, expect, it } from "vitest";
import { calculateSip } from "./sip";

describe("calculateSip", () => {
  it("matches the well-known ₹10,000/month, 12%, 10-year benchmark (~₹23.2L)", () => {
    const result = calculateSip({
      monthlyInvestment: 10_000,
      annualReturnPct: 12,
      years: 10,
    });
    expect(result.investedAmount).toBe("1200000.00");
    expect(Number(result.maturityValue)).toBeCloseTo(2_323_391, -3);
  });

  it("falls back to simple sum of contributions at 0% return", () => {
    const result = calculateSip({
      monthlyInvestment: 5000,
      annualReturnPct: 0,
      years: 2,
    });
    expect(result.maturityValue).toBe("120000.00");
    expect(result.wealthGained).toBe("0.00");
  });

  it("wealth gained equals maturity minus invested amount", () => {
    const result = calculateSip({
      monthlyInvestment: 15_000,
      annualReturnPct: 10,
      years: 15,
    });
    const gained = Number(result.maturityValue) - Number(result.investedAmount);
    expect(Number(result.wealthGained)).toBeCloseTo(gained, 2);
  });
});
