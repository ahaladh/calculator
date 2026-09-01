"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { calculateMortgage } from "@/lib/calculators/mortgage";
import { CalculatorShell } from "@/components/calculator-shell";
import { NumberField } from "@/components/ui/number-field";

const DEFAULTS = {
  principal: 450000,
  downPayment: 90000,
  annualRatePct: 6.5,
  termYears: 30,
};

function readParam(
  params: URLSearchParams,
  key: string,
  fallback: number,
): number {
  const raw = params.get(key);
  if (raw === null) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const PIE_COLORS = ["#2563eb", "#f97316"];

export function MortgageCalculatorClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [principal, setPrincipal] = useState(() =>
    readParam(searchParams, "p", DEFAULTS.principal),
  );
  const [downPayment, setDownPayment] = useState(() =>
    readParam(searchParams, "d", DEFAULTS.downPayment),
  );
  const [annualRatePct, setAnnualRatePct] = useState(() =>
    readParam(searchParams, "r", DEFAULTS.annualRatePct),
  );
  const [termYears, setTermYears] = useState(() =>
    readParam(searchParams, "t", DEFAULTS.termYears),
  );

  const error =
    annualRatePct > 100 || annualRatePct < 0
      ? "Interest rate cannot exceed 100%"
      : downPayment > principal
        ? "Down payment cannot exceed home price"
        : undefined;

  const result = useMemo(() => {
    if (error) return null;
    return calculateMortgage({
      principal,
      downPayment,
      annualRatePct,
      termYears,
    });
  }, [principal, downPayment, annualRatePct, termYears, error]);

  function syncUrl(next: {
    principal: number;
    downPayment: number;
    annualRatePct: number;
    termYears: number;
  }) {
    const params = new URLSearchParams();
    params.set("p", String(next.principal));
    params.set("d", String(next.downPayment));
    params.set("r", String(next.annualRatePct));
    params.set("t", String(next.termYears));
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  function update(field: "principal" | "downPayment" | "annualRatePct" | "termYears", value: number) {
    const next = { principal, downPayment, annualRatePct, termYears, [field]: value };
    setPrincipal(next.principal);
    setDownPayment(next.downPayment);
    setAnnualRatePct(next.annualRatePct);
    setTermYears(next.termYears);
    syncUrl(next);
  }

  function reset() {
    setPrincipal(DEFAULTS.principal);
    setDownPayment(DEFAULTS.downPayment);
    setAnnualRatePct(DEFAULTS.annualRatePct);
    setTermYears(DEFAULTS.termYears);
    router.replace("?", { scroll: false });
  }

  async function copyResult() {
    if (!result) return;
    await navigator.clipboard.writeText(
      `Monthly payment: $${result.monthlyPayment} | Total interest: $${result.totalInterest} | Total paid: $${result.totalPayment}`,
    );
  }

  async function copyShareLink() {
    await navigator.clipboard.writeText(window.location.href);
  }

  const chartData = result
    ? [
        { name: "Principal", value: Number(result.totalPrincipal) },
        { name: "Interest", value: Number(result.totalInterest) },
      ]
    : [];

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">Loan details</h2>
          <NumberField
            label="Home price"
            value={principal}
            onChange={(v) => update("principal", v)}
            min={0}
            max={2_000_000}
            step={5000}
            prefix="$"
          />
          <NumberField
            label="Down payment"
            value={downPayment}
            onChange={(v) => update("downPayment", v)}
            min={0}
            max={principal}
            step={5000}
            prefix="$"
            error={
              downPayment > principal ? "Cannot exceed home price" : undefined
            }
          />
          <NumberField
            label="Interest rate"
            value={annualRatePct}
            onChange={(v) => update("annualRatePct", v)}
            min={0}
            max={20}
            step={0.05}
            suffix="%"
            error={
              annualRatePct > 100 ? "Interest rate cannot exceed 100%" : undefined
            }
          />
          <NumberField
            label="Loan term"
            value={termYears}
            onChange={(v) => update("termYears", v)}
            min={1}
            max={40}
            step={1}
            suffix="yrs"
          />
          <button
            type="button"
            onClick={reset}
            className="mt-2 self-start text-sm font-medium text-muted underline-offset-4 hover:text-foreground hover:underline"
          >
            Reset defaults
          </button>
        </>
      }
      output={
        <>
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold">Monthly payment</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={copyResult}
                className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-background"
              >
                Copy result
              </button>
              <button
                type="button"
                onClick={copyShareLink}
                className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-background"
              >
                Share link
              </button>
            </div>
          </div>

          {result ? (
            <>
              <p className="text-4xl font-bold tabular-nums text-accent">
                {currency.format(Number(result.monthlyPayment))}
                <span className="ml-2 text-base font-normal text-muted">
                  /month
                </span>
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg border border-border p-4">
                  <p className="text-muted">Loan amount</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {currency.format(Number(result.totalPrincipal))}
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-muted">Total interest</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {currency.format(Number(result.totalInterest))}
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4 col-span-2">
                  <p className="text-muted">Total of all payments</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {currency.format(Number(result.totalPayment))}
                  </p>
                </div>
              </div>

              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={entry.name} fill={PIE_COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => currency.format(Number(value))}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 text-xs text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                  Principal
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                  Interest
                </span>
              </div>
            </>
          ) : (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </>
      }
    />
  );
}
