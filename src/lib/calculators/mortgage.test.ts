import { describe, expect, it } from "vitest";
import { calculateMortgage } from "./mortgage";

describe("calculateMortgage", () => {
  it("matches the standard amortization formula for a typical loan", () => {
    const result = calculateMortgage({
      principal: 450000,
      annualRatePct: 6.5,
      termYears: 30,
    });
    expect(result.monthlyPayment).toBe("2844.31");
    expect(result.amortization).toHaveLength(360);
  });

  it("applies a down payment before financing the remainder", () => {
    const withDownPayment = calculateMortgage({
      principal: 450000,
      annualRatePct: 6.5,
      termYears: 30,
      downPayment: 90000,
    });
    const equivalent = calculateMortgage({
      principal: 360000,
      annualRatePct: 6.5,
      termYears: 30,
    });
    expect(withDownPayment.monthlyPayment).toBe(equivalent.monthlyPayment);
  });

  it("handles a 0% interest rate by dividing principal evenly", () => {
    const result = calculateMortgage({
      principal: 12000,
      annualRatePct: 0,
      termYears: 1,
    });
    expect(result.monthlyPayment).toBe("1000.00");
    expect(result.totalInterest).toBe("0.00");
  });

  it("does not go negative when down payment exceeds principal", () => {
    const result = calculateMortgage({
      principal: 100000,
      annualRatePct: 5,
      termYears: 15,
      downPayment: 150000,
    });
    expect(result.monthlyPayment).toBe("0.00");
    expect(result.amortization).toHaveLength(0);
  });

  it("amortizes the full balance to zero by the final payment", () => {
    const result = calculateMortgage({
      principal: 250000,
      annualRatePct: 4.25,
      termYears: 15,
    });
    const last = result.amortization[result.amortization.length - 1];
    expect(last.balance).toBe("0.00");
  });

  it("keeps monthly payment stable for very large principals", () => {
    const result = calculateMortgage({
      principal: 999_999_999_999,
      annualRatePct: 3.9,
      termYears: 30,
    });
    expect(Number(result.monthlyPayment)).toBeGreaterThan(0);
    expect(Number.isFinite(Number(result.monthlyPayment))).toBe(true);
  });
});
