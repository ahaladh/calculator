import { describe, expect, it } from "vitest";
import { calculateBmi, categorizeBmi, cmFromFeetInches, kgFromLb } from "./bmi";

describe("calculateBmi", () => {
  it("matches the standard example: 70kg at 175cm ≈ 22.9 BMI, Normal", () => {
    const result = calculateBmi({ weightKg: 70, heightCm: 175 });
    expect(result.bmi).toBe("22.9");
    expect(result.category).toBe("Normal");
  });

  it("classifies underweight and obese correctly", () => {
    expect(calculateBmi({ weightKg: 45, heightCm: 175 }).category).toBe("Underweight");
    expect(calculateBmi({ weightKg: 100, heightCm: 175 }).category).toBe("Obese");
  });

  it("computes a healthy weight range for the given height", () => {
    const result = calculateBmi({ weightKg: 70, heightCm: 175 });
    expect(Number(result.healthyWeightRangeKg.min)).toBeLessThan(70);
    expect(Number(result.healthyWeightRangeKg.max)).toBeGreaterThan(70);
  });

  it("does not divide by zero when height is zero", () => {
    const result = calculateBmi({ weightKg: 70, heightCm: 0 });
    expect(result.bmi).toBe("0.0");
  });
});

describe("categorizeBmi boundaries", () => {
  it.each([
    [18.4, "Underweight"],
    [18.5, "Normal"],
    [24.9, "Normal"],
    [25, "Overweight"],
    [29.9, "Overweight"],
    [30, "Obese"],
  ] as const)("classifies %f as %s", (bmi, expected) => {
    expect(categorizeBmi(bmi)).toBe(expected);
  });
});

describe("unit conversions", () => {
  it("converts pounds to kilograms", () => {
    expect(kgFromLb(154)).toBeCloseTo(69.85, 1);
  });

  it("converts feet+inches to centimeters", () => {
    expect(cmFromFeetInches(5, 9)).toBeCloseTo(175.26, 1);
  });
});
