import { describe, expect, it } from "vitest";
import { compareTenures } from "./loan-emi";

describe("compareTenures", () => {
  it("returns one row per requested tenure, longer tenures have lower EMI", () => {
    const rows = compareTenures(
      { principal: 2_000_000, annualRatePct: 8.5 },
      [10, 20, 30],
    );
    expect(rows).toHaveLength(3);
    expect(Number(rows[0].emi)).toBeGreaterThan(Number(rows[1].emi));
    expect(Number(rows[1].emi)).toBeGreaterThan(Number(rows[2].emi));
  });

  it("longer tenures pay more total interest despite a lower EMI", () => {
    const rows = compareTenures(
      { principal: 2_000_000, annualRatePct: 8.5 },
      [10, 30],
    );
    expect(Number(rows[1].totalInterest)).toBeGreaterThan(Number(rows[0].totalInterest));
  });
});
