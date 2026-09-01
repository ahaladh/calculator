"use client";

import { useMemo, useState } from "react";
import { calculateSaasCost } from "@/lib/calculators/saas-cost";
import { MODELS, PROVIDER_LABELS } from "@/lib/calculators/ai-pricing";
import { CalculatorShell } from "@/components/calculator-shell";
import { NumberField } from "@/components/ui/number-field";

const currency = (v: number, digits = 2) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: digits,
  }).format(v);

export function SaasCostClient() {
  const [modelId, setModelId] = useState("gpt-4o-mini");
  const [inputTokensPerUser, setInputTokensPerUser] = useState(2000);
  const [outputTokensPerUser, setOutputTokensPerUser] = useState(1000);
  const [requestsPerUserPerDay, setRequestsPerUserPerDay] = useState(3);
  const [activeUsers, setActiveUsers] = useState(1000);
  const [targetMarginPct, setTargetMarginPct] = useState(80);

  const result = useMemo(
    () =>
      calculateSaasCost({
        modelId,
        inputTokensPerUser,
        outputTokensPerUser,
        requestsPerUserPerDay,
        activeUsers,
        targetMarginPct,
      }),
    [modelId, inputTokensPerUser, outputTokensPerUser, requestsPerUserPerDay, activeUsers, targetMarginPct],
  );

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">Product usage</h2>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Model</label>
            <select
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            >
              {(["openai", "anthropic", "google"] as const).map((provider) => (
                <optgroup key={provider} label={PROVIDER_LABELS[provider]}>
                  {MODELS.filter((m) => m.provider === provider).map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <NumberField
            label="Input tokens per user per request"
            value={inputTokensPerUser}
            onChange={setInputTokensPerUser}
            min={0}
            max={100_000}
            step={100}
          />
          <NumberField
            label="Output tokens per user per request"
            value={outputTokensPerUser}
            onChange={setOutputTokensPerUser}
            min={0}
            max={50_000}
            step={100}
          />
          <NumberField
            label="Requests per user per day"
            value={requestsPerUserPerDay}
            onChange={setRequestsPerUserPerDay}
            min={0}
            max={1000}
            step={1}
          />
          <NumberField
            label="Active users"
            value={activeUsers}
            onChange={setActiveUsers}
            min={0}
            max={10_000_000}
            step={100}
          />
          <NumberField
            label="Target gross margin"
            value={targetMarginPct}
            onChange={setTargetMarginPct}
            min={0}
            max={95}
            step={5}
            suffix="%"
          />
        </>
      }
      output={
        <>
          <h2 className="text-lg font-semibold">Cost &amp; suggested pricing</h2>
          {result ? (
            <>
              <p className="text-4xl font-bold tabular-nums text-accent">
                {currency(Number(result.totalMonthlyCost))}
                <span className="ml-2 text-base font-normal text-muted">
                  /month total AI cost
                </span>
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg border border-border p-4">
                  <p className="text-muted">Cost per user / month</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {currency(Number(result.costPerUserPerMonth), 4)}
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-muted">Suggested price / user / month</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {currency(Number(result.suggestedPricePerUser))}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted">
                Suggested price covers AI inference cost only, at your target
                gross margin — it doesn&apos;t include hosting, support, or
                other overhead. Add those separately for a full pricing
                model.
              </p>
            </>
          ) : (
            <p className="text-sm text-red-500">Unknown model.</p>
          )}
        </>
      }
    />
  );
}
