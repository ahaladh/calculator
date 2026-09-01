import { describe, expect, it } from "vitest";
import { calculateCalories } from "./calorie";

describe("calculateCalories", () => {
  it("computes BMR for a male using Mifflin-St Jeor", () => {
    const result = calculateCalories({
      sex: "male",
      age: 30,
      weightKg: 80,
      heightCm: 180,
      activityLevel: "moderate",
    });
    // 10*80 + 6.25*180 - 5*30 + 5 = 1780
    expect(result.bmr).toBe("1780");
    expect(result.maintenanceCalories).toBe("2759");
  });

  it("computes a lower BMR for a female at the same stats (161 offset instead of +5)", () => {
    const male = calculateCalories({
      sex: "male",
      age: 30,
      weightKg: 70,
      heightCm: 170,
      activityLevel: "sedentary",
    });
    const female = calculateCalories({
      sex: "female",
      age: 30,
      weightKg: 70,
      heightCm: 170,
      activityLevel: "sedentary",
    });
    expect(Number(female.bmr)).toBeLessThan(Number(male.bmr));
    expect(Number(male.bmr) - Number(female.bmr)).toBe(166);
  });

  it("orders calorie targets loss < maintenance < gain", () => {
    const result = calculateCalories({
      sex: "female",
      age: 25,
      weightKg: 60,
      heightCm: 165,
      activityLevel: "light",
    });
    expect(Number(result.weightLossCalories)).toBeLessThan(Number(result.mildLossCalories));
    expect(Number(result.mildLossCalories)).toBeLessThan(Number(result.maintenanceCalories));
    expect(Number(result.maintenanceCalories)).toBeLessThan(Number(result.mildGainCalories));
    expect(Number(result.mildGainCalories)).toBeLessThan(Number(result.weightGainCalories));
  });

  it("never returns a negative BMR", () => {
    const result = calculateCalories({
      sex: "female",
      age: 90,
      weightKg: 5,
      heightCm: 50,
      activityLevel: "sedentary",
    });
    expect(Number(result.bmr)).toBeGreaterThanOrEqual(0);
  });
});
