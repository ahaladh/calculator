"use client";

import { useMemo, useState } from "react";
import { calculateFd } from "@/lib/calculators/fd";
import { CalculatorShell } from "@/components/calculator-shell";
import { NumberField } from "@/components/ui/number-field";

const currency = (v: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(v);

export function FdClient() {
  const [principal, setPrincipal] = useState(500_000);
  const [annualRatePct, setAnnualRatePct] = useState(7);
  const [years, setYears] = useState(5);

  const result = useMemo(
    () => calculateFd({ principal, annualRatePct, years }),
    [principal, annualRatePct, years],
  );

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">Deposit details</h2>
          <NumberField
            label="Deposit amount"
            value={principal}
            onChange={setPrincipal}
            min={0}
            max={10_000_000}
            step={5000}
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
            value={years}
            onChange={setYears}
            min={0}
            max={10}
            step={0.25}
            suffix="yrs"
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
              <p className="text-muted">Principal</p>
              <p className="text-lg font-semibold tabular-nums">{currency(principal)}</p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Interest earned</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(Number(result.interestEarned))}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted">
            Assumes quarterly compounding, reinvested (cumulative) to
            maturity — the standard structure most Indian banks use. TDS may
            apply if annual interest exceeds ₹40,000 (₹50,000 for senior
            citizens) and isn&apos;t deducted in this estimate.
          </p>
        </>
      }
    />
  );
}
