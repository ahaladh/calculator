import Decimal from "decimal.js";

export interface RoiInput {
  employeesAffected: number;
  hoursSavedPerWeek: number;
  hourlyLaborCost: number;
  monthlyAiCost: number;
  oneTimeSetupCost: number;
}

export interface RoiResult {
  monthlyValueOfTimeSaved: string;
  netMonthlySavings: string;
  roiPct: string;
  paybackMonths: string | null;
}

const WEEKS_PER_MONTH = new Decimal(4.345);

export function calculateRoi(input: RoiInput): RoiResult {
  const employees = new Decimal(Math.max(0, input.employeesAffected));
  const hoursPerWeek = new Decimal(Math.max(0, input.hoursSavedPerWeek));
  const hourlyRate = new Decimal(Math.max(0, input.hourlyLaborCost));
  const monthlyAiCost = new Decimal(Math.max(0, input.monthlyAiCost));
  const setupCost = new Decimal(Math.max(0, input.oneTimeSetupCost));

  const monthlyValueOfTimeSaved = employees
    .times(hoursPerWeek)
    .times(WEEKS_PER_MONTH)
    .times(hourlyRate);

  const netMonthlySavings = monthlyValueOfTimeSaved.minus(monthlyAiCost);

  const roiPct = monthlyAiCost.isZero()
    ? new Decimal(0)
    : netMonthlySavings.div(monthlyAiCost).times(100);

  const paybackMonths =
    netMonthlySavings.gt(0) && setupCost.gt(0)
      ? setupCost.div(netMonthlySavings)
      : null;

  return {
    monthlyValueOfTimeSaved: monthlyValueOfTimeSaved.toFixed(2),
    netMonthlySavings: netMonthlySavings.toFixed(2),
    roiPct: roiPct.toFixed(1),
    paybackMonths: paybackMonths ? paybackMonths.toFixed(1) : null,
  };
}
