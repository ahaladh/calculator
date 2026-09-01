"use client";

import { useMemo, useState } from "react";
import {
  ACTIVITY_LABELS,
  ACTIVITY_MULTIPLIERS,
  calculateCalories,
  type ActivityLevel,
  type Sex,
} from "@/lib/calculators/calorie";
import { CalculatorShell } from "@/components/calculator-shell";
import { NumberField } from "@/components/ui/number-field";

const ACTIVITY_LEVELS = Object.keys(ACTIVITY_MULTIPLIERS) as ActivityLevel[];

export function CalorieClient() {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState(30);
  const [weightKg, setWeightKg] = useState(75);
  const [heightCm, setHeightCm] = useState(175);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");

  const result = useMemo(
    () => calculateCalories({ sex, age, weightKg, heightCm, activityLevel }),
    [sex, age, weightKg, heightCm, activityLevel],
  );

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">Your details</h2>
          <div className="flex gap-2">
            {(["male", "female"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSex(s)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium capitalize ${
                  sex === s
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <NumberField label="Age" value={age} onChange={setAge} min={15} max={100} step={1} suffix="yrs" />
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
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Activity level</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            >
              {ACTIVITY_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {ACTIVITY_LABELS[level]}
                </option>
              ))}
            </select>
          </div>
        </>
      }
      output={
        <>
          <h2 className="text-lg font-semibold">Daily calories</h2>
          <p className="text-4xl font-bold tabular-nums text-accent">
            {Number(result.maintenanceCalories).toLocaleString("en-US")}
            <span className="ml-2 text-base font-normal text-muted">
              cal/day to maintain
            </span>
          </p>
          <div className="rounded-lg border border-border p-4 text-sm">
            <p className="text-muted">Basal Metabolic Rate (BMR)</p>
            <p className="text-lg font-semibold tabular-nums">
              {Number(result.bmr).toLocaleString("en-US")} cal/day
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Calorie targets</h3>
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-3 py-2 text-muted">Lose weight (~1 lb/week)</td>
                    <td className="px-3 py-2 text-right font-semibold tabular-nums">
                      {Number(result.weightLossCalories).toLocaleString("en-US")}
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-3 py-2 text-muted">Mild loss (~0.5 lb/week)</td>
                    <td className="px-3 py-2 text-right font-semibold tabular-nums">
                      {Number(result.mildLossCalories).toLocaleString("en-US")}
                    </td>
                  </tr>
                  <tr className="border-b border-border bg-accent/5">
                    <td className="px-3 py-2 font-medium">Maintain weight</td>
                    <td className="px-3 py-2 text-right font-semibold tabular-nums">
                      {Number(result.maintenanceCalories).toLocaleString("en-US")}
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-3 py-2 text-muted">Mild gain (~0.5 lb/week)</td>
                    <td className="px-3 py-2 text-right font-semibold tabular-nums">
                      {Number(result.mildGainCalories).toLocaleString("en-US")}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-muted">Gain weight (~1 lb/week)</td>
                    <td className="px-3 py-2 text-right font-semibold tabular-nums">
                      {Number(result.weightGainCalories).toLocaleString("en-US")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-muted">
            Based on the Mifflin-St Jeor equation, the most widely validated
            BMR formula in current clinical use. Individual metabolism
            varies — treat this as a starting point, not a precise target.
          </p>
        </>
      }
    />
  );
}
