import { describe, expect, it } from "vitest";
import { calculateSalary } from "./salary-in";

describe("calculateSalary", () => {
  it("computes a full CTC-to-in-hand breakdown", () => {
    const result = calculateSalary({
      annualCtc: 1_200_000,
      basicPct: 40,
      employerPfPct: 12,
      employeePfPct: 12,
      professionalTaxAnnual: 2400,
      regime: "new",
    });
    // basic = 40% of 12L = 4,80,000
    expect(result.basic).toBe("480000.00");
    // employer PF = 12% of basic = 57,600
    expect(result.employerPf).toBe("57600.00");
    expect(result.employeePf).toBe("57600.00");
    // gross = CTC - employer PF = 11,42,400
    expect(result.grossSalary).toBe("1142400.00");
  });

  it("monthly in-hand is annual in-hand divided by 12", () => {
    const result = calculateSalary({
      annualCtc: 1_800_000,
      basicPct: 40,
      employerPfPct: 12,
      employeePfPct: 12,
      professionalTaxAnnual: 2400,
      regime: "new",
    });
    expect(Number(result.monthlyInHand)).toBeCloseTo(Number(result.annualInHand) / 12, 2);
  });

  it("never produces a negative in-hand amount", () => {
    const result = calculateSalary({
      annualCtc: 10_000,
      basicPct: 100,
      employerPfPct: 12,
      employeePfPct: 12,
      professionalTaxAnnual: 2400,
      regime: "old",
    });
    expect(Number(result.annualInHand)).toBeGreaterThanOrEqual(0);
  });

  it("a higher basic percentage increases PF deductions", () => {
    const lowBasic = calculateSalary({
      annualCtc: 1_500_000,
      basicPct: 30,
      employerPfPct: 12,
      employeePfPct: 12,
      professionalTaxAnnual: 2400,
      regime: "new",
    });
    const highBasic = calculateSalary({
      annualCtc: 1_500_000,
      basicPct: 50,
      employerPfPct: 12,
      employeePfPct: 12,
      professionalTaxAnnual: 2400,
      regime: "new",
    });
    expect(Number(highBasic.employeePf)).toBeGreaterThan(Number(lowBasic.employeePf));
  });
});
