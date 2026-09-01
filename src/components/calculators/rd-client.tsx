"use client";

import { useMemo, useState } from "react";
import { calculateRd } from "@/lib/calculators/rd";
import { CalculatorShell } from "@/components/calculator-shell";
import { NumberField } from "@/components/ui/number-field";

const currency = (v: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(v);

export function RdClient() {
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [annualRatePct, setAnnualRatePct] = useState(6.5);
  const [tenureMonths, setTenureMonths] = useState(36);

  const result = useMemo(
    () => calculateRd({ monthlyDeposit, annualRatePct, tenureMonths }),
    [monthlyDeposit, annualRatePct, tenureMonths],
  );

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">Deposit details</h2>
          <NumberField
            label="Monthly deposit"
            value={monthlyDeposit}
            onChange={setMonthlyDeposit}
            min={0}
            max={500_000}
            step={500}
            prefix="₹"
          />
          <NumberField
            label="Annual interest rate"
            value={annualRatePct}
            onChange={setAnnualRatePct}
            min={0}
            max={15}
            step={0.1}
            suffix="%"
          />
          <NumberField
            label="Tenure"
            value={tenureMonths}
            onChange={setTenureMonths}
            min={3}
            max={120}
            step={3}
            suffix="months"
          />
        </>
      }
      output={
        <>
          <h2 className="text-lg font-semibold">Maturity value</h2>
          <p className="text-4xl font-bold tabular-nums text-accent">
            {currency(Number(result.maturityValue))}
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Total deposited</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(Number(result.totalDeposited))}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Interest earned</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(Number(result.interestEarned))}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted">
            Uses the standard bank RD formula with quarterly compounding.
            Tenure is rounded to the nearest quarter (3-month multiple),
            matching how banks calendar RD maturity.
          </p>
        </>
      }
    />
  );
}
