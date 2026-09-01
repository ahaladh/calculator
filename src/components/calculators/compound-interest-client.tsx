"use client";

import { useMemo, useState } from "react";
import {
  calculateCompoundInterest,
  COMPOUNDING_LABELS,
  type CompoundingFrequency,
} from "@/lib/calculators/compound-interest";
import { CalculatorShell } from "@/components/calculator-shell";
import { NumberField } from "@/components/ui/number-field";

const currency = (v: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(v);

const FREQUENCIES: CompoundingFrequency[] = [1, 2, 4, 12, 365];

export function CompoundInterestClient() {
  const [principal, setPrincipal] = useState(100_000);
  const [annualRatePct, setAnnualRatePct] = useState(8);
  const [years, setYears] = useState(10);
  const [compoundingFrequency, setCompoundingFrequency] = useState<CompoundingFrequency>(4);

  const result = useMemo(
    () => calculateCompoundInterest({ principal, annualRatePct, years, compoundingFrequency }),
    [principal, annualRatePct, years, compoundingFrequency],
  );

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">Investment details</h2>
          <NumberField
            label="Principal"
            value={principal}
            onChange={setPrincipal}
            min={0}
            max={10_000_000}
            step={1000}
            prefix="₹"
          />
          <NumberField
            label="Annual interest rate"
            value={annualRatePct}
            onChange={setAnnualRatePct}
            min={0}
            max={30}
            step={0.25}
            suffix="%"
          />
          <NumberField
            label="Time period"
            value={years}
            onChange={setYears}
            min={0}
            max={40}
            step={1}
            suffix="yrs"
          />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              Compounding frequency
            </label>
            <select
              value={compoundingFrequency}
              onChange={(e) =>
                setCompoundingFrequency(Number(e.target.value) as CompoundingFrequency)
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            >
              {FREQUENCIES.map((f) => (
                <option key={f} value={f}>
                  {COMPOUNDING_LABELS[f]}
                </option>
              ))}
            </select>
          </div>
        </>
      }
      output={
        <>
          <h2 className="text-lg font-semibold">Maturity amount</h2>
          <p className="text-4xl font-bold tabular-nums text-accent">
            {currency(Number(result.maturityAmount))}
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
        </>
      }
    />
  );
}
