import { describe, expect, it } from "vitest";
import { calculateRd } from "./rd";

describe("calculateRd", () => {
  it("computes maturity value using the standard quarterly RD formula", () => {
    const result = calculateRd({
      monthlyDeposit: 10_000,
      annualRatePct: 7,
      tenureMonths: 36,
    });
    expect(result.totalDeposited).toBe("360000.00");
    expect(result.maturityValue).toBe("401372.98");
  });

  it("rounds tenure to the nearest whole quarter", () => {
    const exact = calculateRd({ monthlyDeposit: 5000, annualRatePct: 6, tenureMonths: 12 });
    const rounded = calculateRd({ monthlyDeposit: 5000, annualRatePct: 6, tenureMonths: 13 });
    expect(rounded.maturityValue).toBe(exact.maturityValue);
  });

  it("returns the sum of deposits with zero interest at a 0% rate", () => {
    const result = calculateRd({ monthlyDeposit: 2000, annualRatePct: 0, tenureMonths: 24 });
    expect(result.maturityValue).toBe("48000.00");
    expect(result.interestEarned).toBe("0.00");
  });
});
