import Decimal from "decimal.js";

export type CompoundingFrequency = 1 | 2 | 4 | 12 | 365;

export const COMPOUNDING_LABELS: Record<CompoundingFrequency, string> = {
  1: "Annually",
  2: "Semi-annually",
  4: "Quarterly",
  12: "Monthly",
  365: "Daily",
};

export interface CompoundInterestInput {
  principal: number;
  annualRatePct: number;
  years: number;
  compoundingFrequency: CompoundingFrequency;
}

export interface CompoundInterestResult {
  maturityAmount: string;
  interestEarned: string;
}

/** A = P(1 + r/n)^(n×t) */
export function calculateCompoundInterest(
  input: CompoundInterestInput,
): CompoundInterestResult {
  const P = new Decimal(Math.max(0, input.principal));
  const r = new Decimal(input.annualRatePct).div(100);
  const n = new Decimal(input.compoundingFrequency);
  const t = new Decimal(Math.max(0, input.years));

  const maturityAmount = P.times(r.div(n).plus(1).pow(n.times(t)));

  return {
    maturityAmount: maturityAmount.toFixed(2),
    interestEarned: maturityAmount.minus(P).toFixed(2),
  };
}
