"use client";

import { useMemo, useState } from "react";
import { calculateRoi } from "@/lib/calculators/roi";
import { CalculatorShell } from "@/components/calculator-shell";
import { NumberField } from "@/components/ui/number-field";

const currency = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

export function RoiClient() {
  const [employeesAffected, setEmployeesAffected] = useState(10);
  const [hoursSavedPerWeek, setHoursSavedPerWeek] = useState(5);
  const [hourlyLaborCost, setHourlyLaborCost] = useState(45);
  const [monthlyAiCost, setMonthlyAiCost] = useState(500);
  const [oneTimeSetupCost, setOneTimeSetupCost] = useState(2000);

  const result = useMemo(
    () =>
      calculateRoi({
        employeesAffected,
        hoursSavedPerWeek,
        hourlyLaborCost,
        monthlyAiCost,
        oneTimeSetupCost,
      }),
    [employeesAffected, hoursSavedPerWeek, hourlyLaborCost, monthlyAiCost, oneTimeSetupCost],
  );

  const netPositive = Number(result.netMonthlySavings) >= 0;

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">Time saved &amp; cost</h2>
          <NumberField
            label="Employees using the AI tool"
            value={employeesAffected}
            onChange={setEmployeesAffected}
            min={0}
            max={100_000}
            step={1}
          />
          <NumberField
            label="Hours saved per employee per week"
            value={hoursSavedPerWeek}
            onChange={setHoursSavedPerWeek}
            min={0}
            max={40}
            step={0.5}
          />
          <NumberField
            label="Fully-loaded hourly labor cost"
            value={hourlyLaborCost}
            onChange={setHourlyLaborCost}
            min={0}
            max={500}
            step={5}
            prefix="$"
          />
          <NumberField
            label="Monthly AI subscription / API cost"
            value={monthlyAiCost}
            onChange={setMonthlyAiCost}
            min={0}
            max={1_000_000}
            step={50}
            prefix="$"
          />
          <NumberField
            label="One-time setup / integration cost"
            value={oneTimeSetupCost}
            onChange={setOneTimeSetupCost}
            min={0}
            max={1_000_000}
            step={500}
            prefix="$"
          />
        </>
      }
      output={
        <>
          <h2 className="text-lg font-semibold">Return on investment</h2>
          <p
            className={`text-4xl font-bold tabular-nums ${netPositive ? "text-accent" : "text-red-500"}`}
          >
            {result.roiPct}%
            <span className="ml-2 text-base font-normal text-muted">
              monthly ROI
            </span>
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Value of time saved / month</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(Number(result.monthlyValueOfTimeSaved))}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Net monthly savings</p>
              <p
                className={`text-lg font-semibold tabular-nums ${netPositive ? "" : "text-red-500"}`}
              >
                {currency(Number(result.netMonthlySavings))}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4 col-span-2">
              <p className="text-muted">Payback period on setup cost</p>
              <p className="text-lg font-semibold tabular-nums">
                {result.paybackMonths ? `${result.paybackMonths} months` : "—"}
              </p>
            </div>
          </div>
          {!netPositive && (
            <p className="text-sm text-red-500">
              At this usage, the AI subscription costs more than the labor
              time it saves — reduce cost, increase hours saved, or expand to
              more employees to reach positive ROI.
            </p>
          )}
        </>
      }
    />
  );
}
