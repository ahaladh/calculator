import Decimal from "decimal.js";

export type BmiCategory = "Underweight" | "Normal" | "Overweight" | "Obese";

export interface BmiInput {
  weightKg: number;
  heightCm: number;
}

export interface BmiResult {
  bmi: string;
  category: BmiCategory;
  healthyWeightRangeKg: { min: string; max: string };
}

/** WHO adult BMI categories. Not applicable to children, pregnant people, or highly muscular individuals. */
export function categorizeBmi(bmi: number): BmiCategory {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

/** BMI = weight(kg) / height(m)^2 */
export function calculateBmi(input: BmiInput): BmiResult {
  const weight = new Decimal(Math.max(0, input.weightKg));
  const heightM = new Decimal(Math.max(0, input.heightCm)).div(100);

  if (heightM.isZero()) {
    return {
      bmi: "0.0",
      category: "Underweight",
      healthyWeightRangeKg: { min: "0.0", max: "0.0" },
    };
  }

  const bmi = weight.div(heightM.pow(2));
  const heightSq = heightM.pow(2);

  return {
    bmi: bmi.toFixed(1),
    category: categorizeBmi(bmi.toNumber()),
    healthyWeightRangeKg: {
      min: new Decimal(18.5).times(heightSq).toFixed(1),
      max: new Decimal(24.9).times(heightSq).toFixed(1),
    },
  };
}

export function kgFromLb(lb: number): number {
  return lb * 0.45359237;
}

export function cmFromFeetInches(feet: number, inches: number): number {
  return (feet * 12 + inches) * 2.54;
}
