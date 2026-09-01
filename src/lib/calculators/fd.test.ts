import { describe, expect, it } from "vitest";
import { calculateFd } from "./fd";

describe("calculateFd", () => {
  it("defaults to quarterly compounding", () => {
    const result = calculateFd({ principal: 100_000, annualRatePct: 7, years: 5 });
    // ₹1,00,000 at 7% quarterly for 5 years ≈ ₹1,41,478
    expect(Number(result.maturityValue)).toBeCloseTo(141_478, -1);
  });

  it("allows overriding the compounding frequency", () => {
    const quarterly = calculateFd({ principal: 100_000, annualRatePct: 7, years: 5 });
    const annual = calculateFd({
      principal: 100_000,
      annualRatePct: 7,
      years: 5,
      compoundingFrequency: 1,
    });
    expect(Number(quarterly.maturityValue)).toBeGreaterThan(Number(annual.maturityValue));
  });
});
