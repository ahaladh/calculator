"use client";

import { useMemo, useState } from "react";
import { calculateMortgage } from "@/lib/calculators/mortgage";
import { compareTenures } from "@/lib/calculators/loan-emi";
import { CalculatorShell } from "@/components/calculator-shell";
import { NumberField } from "@/components/ui/number-field";

const currency = (v: number, digits = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: digits,
  }).format(v);

export function EmiClient() {
  const [principal, setPrincipal] = useState(2_000_000);
  const [annualRatePct, setAnnualRatePct] = useState(8.5);
  const [termYears, setTermYears] = useState(20);

  const result = useMemo(
    () => calculateMortgage({ principal, annualRatePct, termYears }),
    [principal, annualRatePct, termYears],
  );

  const tenureRows = useMemo(
    () => compareTenures({ principal, annualRatePct }),
    [principal, annualRatePct],
  );

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">Loan details</h2>
          <NumberField
            label="Loan amount"
            value={principal}
            onChange={setPrincipal}
            min={0}
            max={20_000_000}
            step={50_000}
            prefix="₹"
          />
          <NumberField
            label="Interest rate"
            value={annualRatePct}
            onChange={setAnnualRatePct}
            min={0}
            max={20}
            step={0.05}
            suffix="%"
            error={annualRatePct > 100 ? "Interest rate cannot exceed 100%" : undefined}
          />
          <NumberField
            label="Loan tenure"
            value={termYears}
            onChange={setTermYears}
            min={1}
            max={30}
            step={1}
            suffix="yrs"
          />
        </>
      }
      output={
        <>
          <h2 className="text-lg font-semibold">Monthly EMI</h2>
          <p className="text-4xl font-bold tabular-nums text-accent">
            {currency(Number(result.monthlyPayment))}
            <span className="ml-2 text-base font-normal text-muted">/month</span>
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Total interest</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(Number(result.totalInterest))}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Total payment</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(Number(result.totalPayment))}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">EMI by tenure</h3>
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-surface text-left text-xs text-muted">
                  <tr>
                    <th className="px-3 py-2 font-medium">Tenure</th>
                    <th className="px-3 py-2 text-right font-medium">EMI</th>
                    <th className="px-3 py-2 text-right font-medium">Total interest</th>
                  </tr>
                </thead>
                <tbody>
                  {tenureRows.map((row) => (
                    <tr
                      key={row.years}
                      className={`border-t border-border ${row.years === termYears ? "bg-accent/10" : ""}`}
                    >
                      <td className="px-3 py-2">
                        <button
                          type="button"
                          onClick={() => setTermYears(row.years)}
                          className="font-medium hover:text-accent"
                        >
                          {row.years} yrs
                        </button>
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums">
                        {currency(Number(row.emi))}
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums text-muted">
                        {currency(Number(row.totalInterest))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      }
    />
  );
}
