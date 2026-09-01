"use client";

import { useMemo, useState } from "react";
import { calculateInvestmentRoi } from "@/lib/calculators/investment-roi";
import { CalculatorShell } from "@/components/calculator-shell";
import { NumberField } from "@/components/ui/number-field";

const currency = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

export function InvestmentRoiClient() {
  const [initialInvestment, setInitialInvestment] = useState(10_000);
  const [finalValue, setFinalValue] = useState(15_000);
  const [years, setYears] = useState(5);

  const result = useMemo(
    () => calculateInvestmentRoi({ initialInvestment, finalValue, years }),
    [initialInvestment, finalValue, years],
  );

  const isGain = Number(result.netGain) >= 0;

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">Investment</h2>
          <NumberField
            label="Initial investment"
            value={initialInvestment}
            onChange={setInitialInvestment}
            min={0}
            max={10_000_000}
            step={100}
            prefix="$"
          />
          <NumberField
            label="Final value"
            value={finalValue}
            onChange={setFinalValue}
            min={0}
            max={10_000_000}
            step={100}
            prefix="$"
          />
          <NumberField
            label="Holding period"
            value={years}
            onChange={setYears}
            min={0}
            max={50}
            step={1}
            suffix="yrs"
          />
        </>
      }
      output={
        <>
          <h2 className="text-lg font-semibold">Return</h2>
          <p
            className={`text-4xl font-bold tabular-nums ${isGain ? "text-accent" : "text-red-500"}`}
          >
            {result.roiPct}%
            <span className="ml-2 text-base font-normal text-muted">total ROI</span>
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Net gain / loss</p>
              <p
                className={`text-lg font-semibold tabular-nums ${isGain ? "" : "text-red-500"}`}
              >
                {currency(Number(result.netGain))}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Annualized return (CAGR)</p>
              <p className="text-lg font-semibold tabular-nums">
                {result.cagrPct ? `${result.cagrPct}%` : "—"}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted">
            Total ROI measures the full-period return; CAGR annualizes it,
            which is what makes investments of different holding periods
            comparable.
          </p>
        </>
      }
    />
  );
}
