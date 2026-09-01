"use client";

import { useMemo, useState } from "react";
import { calculateSalary } from "@/lib/calculators/salary-in";
import type { TaxRegime } from "@/lib/calculators/income-tax-in";
import { CalculatorShell } from "@/components/calculator-shell";
import { NumberField } from "@/components/ui/number-field";

const currency = (v: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(v);

export function SalaryInClient() {
  const [annualCtc, setAnnualCtc] = useState(1_200_000);
  const [basicPct, setBasicPct] = useState(40);
  const [employerPfPct, setEmployerPfPct] = useState(12);
  const [employeePfPct, setEmployeePfPct] = useState(12);
  const [professionalTaxAnnual, setProfessionalTaxAnnual] = useState(2400);
  const [regime, setRegime] = useState<TaxRegime>("new");

  const result = useMemo(
    () =>
      calculateSalary({
        annualCtc,
        basicPct,
        employerPfPct,
        employeePfPct,
        professionalTaxAnnual,
        regime,
      }),
    [annualCtc, basicPct, employerPfPct, employeePfPct, professionalTaxAnnual, regime],
  );

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">CTC breakdown</h2>
          <NumberField
            label="Annual CTC"
            value={annualCtc}
            onChange={setAnnualCtc}
            min={0}
            max={20_000_000}
            step={10_000}
            prefix="₹"
          />
          <NumberField
            label="Basic salary (% of CTC)"
            value={basicPct}
            onChange={setBasicPct}
            min={10}
            max={70}
            step={5}
            suffix="%"
          />
          <NumberField
            label="Employer PF (% of basic)"
            value={employerPfPct}
            onChange={setEmployerPfPct}
            min={0}
            max={12}
            step={1}
            suffix="%"
          />
          <NumberField
            label="Employee PF (% of basic)"
            value={employeePfPct}
            onChange={setEmployeePfPct}
            min={0}
            max={12}
            step={1}
            suffix="%"
          />
          <NumberField
            label="Professional tax (annual)"
            value={professionalTaxAnnual}
            onChange={setProfessionalTaxAnnual}
            min={0}
            max={5000}
            step={100}
            prefix="₹"
          />
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
        </>
      }
      output={
        <>
          <h2 className="text-lg font-semibold">Take-home salary</h2>
          <p className="text-4xl font-bold tabular-nums text-accent">
            {currency(Number(result.monthlyInHand))}
            <span className="ml-2 text-base font-normal text-muted">/month</span>
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Basic salary</p>
              <p className="text-lg font-semibold tabular-nums">{currency(Number(result.basic))}</p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Gross salary</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(Number(result.grossSalary))}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Employee PF</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(Number(result.employeePf))}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Employer PF</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(Number(result.employerPf))}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Income tax</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(Number(result.incomeTax))}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Annual in-hand</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(Number(result.annualInHand))}
              </p>
            </div>
          </div>
          <p className="text-xs text-muted">
            A simplified model: CTC = Gross salary + Employer PF; in-hand =
            Gross salary − Employee PF − professional tax − income tax.
            Actual payslips vary by employer (gratuity, insurance, bonus
            structuring differ) — use this as a directional estimate.
          </p>
        </>
      }
    />
  );
}
