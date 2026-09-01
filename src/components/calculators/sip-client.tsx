"use client";

import { useMemo, useState } from "react";
import { calculateSip } from "@/lib/calculators/sip";
import { CalculatorShell } from "@/components/calculator-shell";
import { NumberField } from "@/components/ui/number-field";

const currency = (v: number, digits = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: digits,
  }).format(v);

export function SipClient() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10_000);
  const [annualReturnPct, setAnnualReturnPct] = useState(12);
  const [years, setYears] = useState(10);

  const result = useMemo(
    () => calculateSip({ monthlyInvestment, annualReturnPct, years }),
    [monthlyInvestment, annualReturnPct, years],
  );

  const investedShare =
    Number(result.investedAmount) > 0
      ? (Number(result.investedAmount) / Number(result.maturityValue)) * 100
      : 0;

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">SIP details</h2>
          <NumberField
            label="Monthly investment"
            value={monthlyInvestment}
            onChange={setMonthlyInvestment}
            min={0}
            max={1_000_000}
            step={500}
            prefix="₹"
          />
          <NumberField
            label="Expected annual return"
            value={annualReturnPct}
            onChange={setAnnualReturnPct}
            min={0}
            max={30}
            step={0.5}
            suffix="%"
          />
          <NumberField
            label="Investment period"
            value={years}
            onChange={setYears}
            min={1}
            max={40}
            step={1}
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
              <p className="text-muted">Amount invested</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(Number(result.investedAmount))}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Wealth gained</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(Number(result.wealthGained))}
              </p>
            </div>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${investedShare}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted">
            <span>Invested ({investedShare.toFixed(0)}%)</span>
            <span>Returns ({(100 - investedShare).toFixed(0)}%)</span>
          </div>
        </>
      }
    />
  );
}
