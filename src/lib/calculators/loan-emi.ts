import { calculateMortgage, type MortgageInput } from "./mortgage";

export interface TenureComparisonRow {
  years: number;
  emi: string;
  totalInterest: string;
  totalPayment: string;
}

const STANDARD_TENURES = [5, 10, 15, 20, 25, 30];

export function compareTenures(
  input: Omit<MortgageInput, "termYears">,
  tenures: number[] = STANDARD_TENURES,
): TenureComparisonRow[] {
  return tenures.map((years) => {
    const result = calculateMortgage({ ...input, termYears: years });
    return {
      years,
      emi: result.monthlyPayment,
      totalInterest: result.totalInterest,
      totalPayment: result.totalPayment,
    };
  });
}
