import Decimal from "decimal.js";

export interface SipInput {
  monthlyInvestment: number;
  annualReturnPct: number;
  years: number;
}

export interface SipResult {
  investedAmount: string;
  maturityValue: string;
  wealthGained: string;
}

/** Standard SIP future-value formula: FV = P × [(1+r)^n − 1] / r × (1+r) */
export function calculateSip(input: SipInput): SipResult {
  const P = new Decimal(Math.max(0, input.monthlyInvestment));
  const r = new Decimal(input.annualReturnPct).div(100).div(12);
  const n = new Decimal(Math.max(0, input.years)).times(12);

  const investedAmount = P.times(n);

  if (r.isZero() || n.isZero()) {
    return {
      investedAmount: investedAmount.toFixed(2),
      maturityValue: investedAmount.toFixed(2),
      wealthGained: "0.00",
    };
  }

  const maturityValue = P.times(r.plus(1).pow(n).minus(1))
    .div(r)
    .times(r.plus(1));

  return {
    investedAmount: investedAmount.toFixed(2),
    maturityValue: maturityValue.toFixed(2),
    wealthGained: maturityValue.minus(investedAmount).toFixed(2),
  };
}
