import Decimal from "decimal.js";

export interface InvestmentRoiInput {
  initialInvestment: number;
  finalValue: number;
  years: number;
}

export interface InvestmentRoiResult {
  netGain: string;
  roiPct: string;
  cagrPct: string | null;
}

export function calculateInvestmentRoi(input: InvestmentRoiInput): InvestmentRoiResult {
  const initial = new Decimal(Math.max(0, input.initialInvestment));
  const final = new Decimal(Math.max(0, input.finalValue));
  const years = new Decimal(Math.max(0, input.years));

  const netGain = final.minus(initial);
  const roiPct = initial.isZero() ? new Decimal(0) : netGain.div(initial).times(100);

  const cagrPct =
    initial.gt(0) && final.gt(0) && years.gt(0)
      ? final.div(initial).pow(new Decimal(1).div(years)).minus(1).times(100)
      : null;

  return {
    netGain: netGain.toFixed(2),
    roiPct: roiPct.toFixed(2),
    cagrPct: cagrPct ? cagrPct.toFixed(2) : null,
  };
}
