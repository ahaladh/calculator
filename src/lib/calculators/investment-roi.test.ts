import { describe, expect, it } from "vitest";
import { calculateInvestmentRoi } from "./investment-roi";

describe("calculateInvestmentRoi", () => {
  it("computes total ROI percent from initial and final value", () => {
    const result = calculateInvestmentRoi({
      initialInvestment: 100_000,
      finalValue: 150_000,
      years: 5,
    });
    expect(result.netGain).toBe("50000.00");
    expect(result.roiPct).toBe("50.00");
  });

  it("computes CAGR that compounds to the final value over the holding period", () => {
    const result = calculateInvestmentRoi({
      initialInvestment: 100_000,
      finalValue: 200_000,
      years: 10,
    });
    // doubling in 10 years ≈ 7.18% CAGR
    expect(Number(result.cagrPct)).toBeCloseTo(7.18, 1);
  });

  it("returns null CAGR when years is zero", () => {
    const result = calculateInvestmentRoi({
      initialInvestment: 100_000,
      finalValue: 120_000,
      years: 0,
    });
    expect(result.cagrPct).toBeNull();
  });

  it("handles a loss (final value below initial investment)", () => {
    const result = calculateInvestmentRoi({
      initialInvestment: 100_000,
      finalValue: 80_000,
      years: 2,
    });
    expect(result.netGain).toBe("-20000.00");
    expect(result.roiPct).toBe("-20.00");
  });
});
