import Decimal from "decimal.js";
import { calculateIncomeTax, type TaxRegime } from "./income-tax-in";

export interface SalaryInput {
  annualCtc: number;
  basicPct: number; // basic as % of CTC
  employerPfPct: number; // employer PF contribution as % of basic
  employeePfPct: number; // employee PF contribution as % of basic
  professionalTaxAnnual: number;
  regime: TaxRegime;
}

export interface SalaryResult {
  basic: string;
  employerPf: string;
  employeePf: string;
  grossSalary: string; // CTC minus employer PF (and other employer-only costs)
  professionalTax: string;
  incomeTax: string;
  annualInHand: string;
  monthlyInHand: string;
}

/**
 * A simplified CTC breakup. Real payslips vary by employer (gratuity,
 * insurance, bonus structuring differ), so this models the most common
 * structure: CTC = Gross Salary + Employer PF, Gross Salary = Basic + HRA +
 * other allowances (folded into "other allowances" here for simplicity).
 */
export function calculateSalary(input: SalaryInput): SalaryResult {
  const ctc = new Decimal(Math.max(0, input.annualCtc));
  const basicPct = new Decimal(Math.max(0, Math.min(100, input.basicPct)));
  const basic = ctc.times(basicPct).div(100);

  const employerPf = basic.times(Math.max(0, input.employerPfPct)).div(100);
  const employeePf = basic.times(Math.max(0, input.employeePfPct)).div(100);
  const professionalTax = new Decimal(Math.max(0, input.professionalTaxAnnual));

  const grossSalary = Decimal.max(0, ctc.minus(employerPf));
  const incomeCheck = calculateIncomeTax({
    annualIncome: grossSalary.toNumber(),
    regime: input.regime,
  });
  const incomeTax = new Decimal(incomeCheck.totalTax);

  const annualInHand = Decimal.max(
    0,
    grossSalary.minus(employeePf).minus(professionalTax).minus(incomeTax),
  );

  return {
    basic: basic.toFixed(2),
    employerPf: employerPf.toFixed(2),
    employeePf: employeePf.toFixed(2),
    grossSalary: grossSalary.toFixed(2),
    professionalTax: professionalTax.toFixed(2),
    incomeTax: incomeTax.toFixed(2),
    annualInHand: annualInHand.toFixed(2),
    monthlyInHand: annualInHand.div(12).toFixed(2),
  };
}
