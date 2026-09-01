import Decimal from "decimal.js";

export interface RdInput {
  monthlyDeposit: number;
  annualRatePct: number;
  tenureMonths: number;
}

export interface RdResult {
  totalDeposited: string;
  maturityValue: string;
  interestEarned: string;
}

/**
 * Standard Indian bank RD formula (quarterly-compounded):
 * M = R × [(1+i)^n − 1] / (1 − (1+i)^(−1/3)), i = rate/400, n = quarters.
 * Tenure is rounded to the nearest whole quarter, matching how banks
 * calendar RD maturity.
 */
export function calculateRd(input: RdInput): RdResult {
  const R = new Decimal(Math.max(0, input.monthlyDeposit));
  const rate = new Decimal(Math.max(0, input.annualRatePct));
  const tenureMonths = Math.max(3, Math.round(input.tenureMonths / 3) * 3);
  const n = new Decimal(tenureMonths / 3);
  const i = rate.div(400);

  const totalDeposited = R.times(tenureMonths);

  if (i.isZero()) {
    return {
      totalDeposited: totalDeposited.toFixed(2),
      maturityValue: totalDeposited.toFixed(2),
      interestEarned: "0.00",
    };
  }

  const onePlusI = i.plus(1);
  const maturityValue = R.times(onePlusI.pow(n).minus(1)).div(
    new Decimal(1).minus(onePlusI.pow(new Decimal(-1).div(3))),
  );

  return {
    totalDeposited: totalDeposited.toFixed(2),
    maturityValue: maturityValue.toFixed(2),
    interestEarned: maturityValue.minus(totalDeposited).toFixed(2),
  };
}
