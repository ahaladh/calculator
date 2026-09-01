import { describe, expect, it } from "vitest";
import { calculateCompoundInterest } from "./compound-interest";

describe("calculateCompoundInterest", () => {
  it("matches the textbook example: $1,000 at 5% annually for 10 years ≈ $1,628.89", () => {
    const result = calculateCompoundInterest({
      principal: 1000,
      annualRatePct: 5,
      years: 10,
      compoundingFrequency: 1,
    });
    expect(result.maturityAmount).toBe("1628.89");
  });

  it("compounds more frequently to a higher amount than annual compounding", () => {
    const annual = calculateCompoundInterest({
      principal: 100_000,
      annualRatePct: 8,
      years: 5,
      compoundingFrequency: 1,
    });
    const monthly = calculateCompoundInterest({
      principal: 100_000,
      annualRatePct: 8,
      years: 5,
      compoundingFrequency: 12,
    });
    expect(Number(monthly.maturityAmount)).toBeGreaterThan(Number(annual.maturityAmount));
  });

  it("returns zero interest for a zero rate", () => {
    const result = calculateCompoundInterest({
      principal: 5000,
      annualRatePct: 0,
      years: 3,
      compoundingFrequency: 4,
    });
    expect(result.interestEarned).toBe("0.00");
  });
});
