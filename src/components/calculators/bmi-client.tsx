"use client";

import { useMemo, useState } from "react";
import { calculateBmi, cmFromFeetInches, kgFromLb } from "@/lib/calculators/bmi";
import { CalculatorShell } from "@/components/calculator-shell";
import { NumberField } from "@/components/ui/number-field";

const CATEGORY_COLOR: Record<string, string> = {
  Underweight: "text-blue-500",
  Normal: "text-accent",
  Overweight: "text-orange-500",
  Obese: "text-red-500",
};

export function BmiClient() {
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [weightKg, setWeightKg] = useState(70);
  const [heightCm, setHeightCm] = useState(175);
  const [weightLb, setWeightLb] = useState(154);
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(9);

  const effectiveWeightKg = units === "metric" ? weightKg : kgFromLb(weightLb);
  const effectiveHeightCm =
    units === "metric" ? heightCm : cmFromFeetInches(heightFeet, heightInches);

  const result = useMemo(
    () => calculateBmi({ weightKg: effectiveWeightKg, heightCm: effectiveHeightCm }),
    [effectiveWeightKg, effectiveHeightCm],
  );

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">Your measurements</h2>
          <div className="flex gap-2">
            {(["metric", "imperial"] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnits(u)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium capitalize ${
                  units === u
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                {u === "metric" ? "kg / cm" : "lb / ft-in"}
              </button>
            ))}
          </div>

          {units === "metric" ? (
            <>
              <NumberField
                label="Weight"
                value={weightKg}
                onChange={setWeightKg}
                min={0}
                max={300}
                step={0.5}
                suffix="kg"
              />
              <NumberField
                label="Height"
                value={heightCm}
                onChange={setHeightCm}
                min={0}
                max={250}
                step={1}
                suffix="cm"
              />
            </>
          ) : (
            <>
              <NumberField
                label="Weight"
                value={weightLb}
                onChange={setWeightLb}
                min={0}
                max={660}
                step={1}
                suffix="lb"
              />
              <div className="flex gap-3">
                <NumberField
                  label="Height (feet)"
                  value={heightFeet}
                  onChange={setHeightFeet}
                  min={0}
                  max={8}
                  step={1}
                />
                <NumberField
                  label="Height (inches)"
                  value={heightInches}
                  onChange={setHeightInches}
                  min={0}
                  max={11}
                  step={1}
                />
              </div>
            </>
          )}
        </>
      }
      output={
        <>
          <h2 className="text-lg font-semibold">Your BMI</h2>
          <p className={`text-4xl font-bold tabular-nums ${CATEGORY_COLOR[result.category]}`}>
            {result.bmi}
            <span className="ml-2 text-base font-normal text-muted">{result.category}</span>
          </p>
          <div className="rounded-lg border border-border p-4 text-sm">
            <p className="text-muted">Healthy weight range for your height</p>
            <p className="text-lg font-semibold tabular-nums">
              {result.healthyWeightRangeKg.min} – {result.healthyWeightRangeKg.max} kg
            </p>
          </div>
          <div className="flex justify-between text-xs text-muted">
            <span>Underweight &lt;18.5</span>
            <span>Normal 18.5–24.9</span>
            <span>Overweight 25–29.9</span>
            <span>Obese ≥30</span>
          </div>
          <p className="text-xs text-muted">
            BMI is a screening tool, not a diagnosis — it doesn&apos;t
            distinguish muscle from fat and isn&apos;t reliable for
            athletes, pregnant people, or children. Talk to a healthcare
            provider for a full assessment.
          </p>
        </>
      }
    />
  );
}
