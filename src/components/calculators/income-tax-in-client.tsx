"use client";

import { useMemo, useState } from "react";
import { calculateIncomeTax, type TaxRegime } from "@/lib/calculators/income-tax-in";
import { CalculatorShell } from "@/components/calculator-shell";
import { NumberField } from "@/components/ui/number-field";

const currency = (v: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(v);

export function IncomeTaxInClient() {
  const [annualIncome, setAnnualIncome] = useState(1_200_000);
  const [regime, setRegime] = useState<TaxRegime>("new");
  const [otherDeductions, setOtherDeductions] = useState(150_000);

  const result = useMemo(
    () => calculateIncomeTax({ annualIncome, regime, otherDeductions }),
    [annualIncome, regime, otherDeductions],
  );

  const otherRegime = regime === "new" ? "old" : "new";
  const otherResult = useMemo(
    () => calculateIncomeTax({ annualIncome, regime: otherRegime, otherDeductions }),
    [annualIncome, otherRegime, otherDeductions],
  );

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">Income details</h2>
          <div className="flex gap-2">
            {(["new", "old"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegime(r)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium capitalize ${
                  regime === r
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                {r} regime
              </button>
            ))}
          </div>
          <NumberField
            label="Annual gross income"
            value={annualIncome}
            onChange={setAnnualIncome}
            min={0}
            max={10_000_000}
            step={10_000}
            prefix="₹"
          />
          {regime === "old" && (
            <NumberField
              label="Other deductions (80C, 80D, HRA, etc.)"
              value={otherDeductions}
              onChange={setOtherDeductions}
              min={0}
              max={500_000}
              step={5000}
              prefix="₹"
            />
          )}
        </>
      }
      output={
        <>
          <h2 className="text-lg font-semibold">Tax payable</h2>
          <p className="text-4xl font-bold tabular-nums text-accent">
            {currency(Number(result.totalTax))}
            <span className="ml-2 text-base font-normal text-muted">/year</span>
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Taxable income</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(Number(result.taxableIncome))}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Section 87A rebate</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(Number(result.rebate))}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Health &amp; education cess (4%)</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(Number(result.cess))}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Net annual income</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(Number(result.netIncome))}
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-border p-4 text-sm">
            <p className="text-muted">
              Under the <span className="capitalize">{otherRegime}</span> regime, your
              tax would be
            </p>
            <p className="text-lg font-semibold tabular-nums">
              {currency(Number(otherResult.totalTax))}/year
            </p>
          </div>
          <p className="text-xs text-muted">
            Surcharge for income above ₹50L is not included. Old regime
            figures assume you qualify for the deductions entered — always
            verify eligibility before filing.
          </p>
        </>
      }
    />
  );
}
