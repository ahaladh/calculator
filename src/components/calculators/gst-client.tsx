"use client";

import { useMemo, useState } from "react";
import { addGst, removeGst, GST_RATES } from "@/lib/calculators/gst";
import { CalculatorShell } from "@/components/calculator-shell";
import { NumberField } from "@/components/ui/number-field";

const currency = (v: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(v);

export function GstClient() {
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [amount, setAmount] = useState(10_000);
  const [ratePct, setRatePct] = useState<number>(18);

  const result = useMemo(
    () => (mode === "add" ? addGst(amount, ratePct) : removeGst(amount, ratePct)),
    [mode, amount, ratePct],
  );

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">Amount &amp; rate</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode("add")}
              className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium ${
                mode === "add"
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-muted hover:text-foreground"
              }`}
            >
              Add GST
            </button>
            <button
              type="button"
              onClick={() => setMode("remove")}
              className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium ${
                mode === "remove"
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-muted hover:text-foreground"
              }`}
            >
              Remove GST
            </button>
          </div>
          <NumberField
            label={mode === "add" ? "Amount (excl. GST)" : "Amount (incl. GST)"}
            value={amount}
            onChange={setAmount}
            min={0}
            max={10_000_000}
            step={100}
            prefix="₹"
          />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">GST rate</label>
            <div className="flex flex-wrap gap-2">
              {GST_RATES.map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setRatePct(rate)}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
                    ratePct === rate
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border text-muted hover:text-foreground"
                  }`}
                >
                  {rate}%
                </button>
              ))}
            </div>
            <NumberField
              label="Custom rate"
              value={ratePct}
              onChange={setRatePct}
              min={0}
              max={100}
              step={0.5}
              suffix="%"
            />
          </div>
        </>
      }
      output={
        <>
          <h2 className="text-lg font-semibold">Breakdown</h2>
          <p className="text-4xl font-bold tabular-nums text-accent">
            {currency(Number(result.totalAmount))}
            <span className="ml-2 text-base font-normal text-muted">total</span>
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Base amount</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(Number(result.baseAmount))}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">GST ({ratePct}%)</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(Number(result.gstAmount))}
              </p>
            </div>
          </div>
        </>
      }
    />
  );
}
