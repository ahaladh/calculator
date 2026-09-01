import Decimal from "decimal.js";

export type Sex = "male" | "female";
export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: "Sedentary (little or no exercise)",
  light: "Lightly active (1-3 days/week)",
  moderate: "Moderately active (3-5 days/week)",
  active: "Active (6-7 days/week)",
  very_active: "Very active (hard exercise + physical job)",
};

export interface CalorieInput {
  sex: Sex;
  age: number;
  weightKg: number;
  heightCm: number;
  activityLevel: ActivityLevel;
}

export interface CalorieResult {
  bmr: string;
  maintenanceCalories: string;
  mildLossCalories: string;
  weightLossCalories: string;
  mildGainCalories: string;
  weightGainCalories: string;
}

/** Mifflin-St Jeor equation — the most widely validated BMR formula in modern clinical use. */
export function calculateCalories(input: CalorieInput): CalorieResult {
  const weight = new Decimal(Math.max(0, input.weightKg));
  const height = new Decimal(Math.max(0, input.heightCm));
  const age = new Decimal(Math.max(0, input.age));

  const base = weight.times(10).plus(height.times(6.25)).minus(age.times(5));
  const bmr = input.sex === "male" ? base.plus(5) : base.minus(161);
  const bmrClamped = Decimal.max(0, bmr);

  const maintenance = bmrClamped.times(ACTIVITY_MULTIPLIERS[input.activityLevel]);

  return {
    bmr: bmrClamped.toFixed(0),
    maintenanceCalories: maintenance.toFixed(0),
    mildLossCalories: maintenance.minus(250).toFixed(0),
    weightLossCalories: maintenance.minus(500).toFixed(0),
    mildGainCalories: maintenance.plus(250).toFixed(0),
    weightGainCalories: maintenance.plus(500).toFixed(0),
  };
}
