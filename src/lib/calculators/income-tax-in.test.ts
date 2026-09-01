import { describe, expect, it } from "vitest";
import { calculateIncomeTax } from "./income-tax-in";

describe("calculateIncomeTax — new regime", () => {
  it("is fully tax-free at the effective ₹12.75L threshold (₹12L taxable + ₹75K standard deduction)", () => {
    const result = calculateIncomeTax({ annualIncome: 1_275_000, regime: "new" });
    expect(result.taxableIncome).toBe("1200000.00");
    expect(result.totalTax).toBe("0.00");
  });

  it("computes slab tax plus 4% cess just above the rebate threshold", () => {
    const result = calculateIncomeTax({ annualIncome: 1_500_000, regime: "new" });
    expect(result.taxableIncome).toBe("1425000.00");
    expect(result.taxBeforeRebate).toBe("93750.00");
    expect(result.rebate).toBe("0.00");
    expect(result.totalTax).toBe("97500.00");
  });

  it("charges 30% on income above ₹24L", () => {
    const result = calculateIncomeTax({ annualIncome: 3_075_000, regime: "new" });
    // taxable = 30,00,000; tax = 20000+40000+60000+80000+100000+(6,00,000*0.30=180000) = 480000
    expect(result.taxBeforeRebate).toBe("480000.00");
  });
});

describe("calculateIncomeTax — old regime", () => {
  it("is tax-free at exactly ₹5L taxable income (rebate wipes out the slab tax)", () => {
    const result = calculateIncomeTax({ annualIncome: 550_000, regime: "old" });
    expect(result.taxableIncome).toBe("500000.00");
    expect(result.totalTax).toBe("0.00");
  });

  it("applies slab tax plus cess above the rebate threshold", () => {
    const result = calculateIncomeTax({ annualIncome: 600_000, regime: "old" });
    expect(result.taxableIncome).toBe("550000.00");
    expect(result.taxBeforeRebate).toBe("22500.00");
    expect(result.totalTax).toBe("23400.00");
  });

  it("reduces taxable income with additional deductions like 80C", () => {
    const withoutDeductions = calculateIncomeTax({ annualIncome: 800_000, regime: "old" });
    const withDeductions = calculateIncomeTax({
      annualIncome: 800_000,
      regime: "old",
      otherDeductions: 150_000,
    });
    expect(Number(withDeductions.totalTax)).toBeLessThan(Number(withoutDeductions.totalTax));
  });
});

describe("calculateIncomeTax — shared behavior", () => {
  it("never produces a negative taxable income", () => {
    const result = calculateIncomeTax({ annualIncome: 10_000, regime: "new" });
    expect(Number(result.taxableIncome)).toBe(0);
    expect(result.totalTax).toBe("0.00");
  });

  it("net income equals gross income minus total tax", () => {
    const result = calculateIncomeTax({ annualIncome: 2_000_000, regime: "new" });
    const net = 2_000_000 - Number(result.totalTax);
    expect(Number(result.netIncome)).toBeCloseTo(net, 2);
  });
});
