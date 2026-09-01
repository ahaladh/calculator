"use client";

import { useMemo, useState } from "react";
import { calculateAiCost, compareAllModels } from "@/lib/calculators/ai-cost";
import { MODELS, PROVIDER_LABELS, getModel, type Provider } from "@/lib/calculators/ai-pricing";
import { CalculatorShell } from "@/components/calculator-shell";
import { NumberField } from "@/components/ui/number-field";

const currency = (value: number, maxFractionDigits = 2) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: maxFractionDigits,
  }).format(value);

const PROVIDERS: Provider[] = ["openai", "anthropic", "google"];

export function AiCostCalculatorClient({
  defaultModelId = "gpt-5.1",
  leadWithComparison = false,
}: {
  defaultModelId?: string;
  leadWithComparison?: boolean;
}) {
  const [modelId, setModelId] = useState(defaultModelId);
  const [inputTokens, setInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);
  const [cachedInputTokens, setCachedInputTokens] = useState(0);
  const [requestsPerDay, setRequestsPerDay] = useState(1000);

  const model = useMemo(() => getModel(modelId), [modelId]);
  const result = useMemo(
    () =>
      calculateAiCost({
        modelId,
        inputTokens,
        outputTokens,
        cachedInputTokens,
        requestsPerDay,
      }),
    [modelId, inputTokens, outputTokens, cachedInputTokens, requestsPerDay],
  );

  const comparison = useMemo(
    () =>
      compareAllModels({ inputTokens, outputTokens, cachedInputTokens, requestsPerDay }),
    [inputTokens, outputTokens, cachedInputTokens, requestsPerDay],
  );

  const inputs = (
    <>
      <h2 className="text-lg font-semibold">Usage</h2>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Model</label>
        <select
          value={modelId}
          onChange={(e) => setModelId(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        >
          {PROVIDERS.map((provider) => (
            <optgroup key={provider} label={PROVIDER_LABELS[provider]}>
              {MODELS.filter((m) => m.provider === provider).map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {model && (
          <p className="text-xs text-muted">
            {currency(model.inputPerMTok, 2)}/M in
            {model.cachedInputPerMTok !== undefined &&
              ` · ${currency(model.cachedInputPerMTok, 3)}/M cached in`}{" "}
            · {currency(model.outputPerMTok, 2)}/M out · {model.contextWindow} context
            {model.note && <span className="block">{model.note}</span>}
          </p>
        )}
      </div>

      <NumberField
        label="Input tokens per request"
        value={inputTokens}
        onChange={setInputTokens}
        min={0}
        max={200_000}
        step={100}
      />
      <NumberField
        label="Cached input tokens"
        value={cachedInputTokens}
        onChange={setCachedInputTokens}
        min={0}
        max={inputTokens}
        step={100}
        error={
          cachedInputTokens > inputTokens
            ? "Cannot exceed input tokens"
            : undefined
        }
      />
      <NumberField
        label="Output tokens per request"
        value={outputTokens}
        onChange={setOutputTokens}
        min={0}
        max={100_000}
        step={100}
      />
      <NumberField
        label="Requests per day"
        value={requestsPerDay}
        onChange={setRequestsPerDay}
        min={0}
        max={1_000_000}
        step={100}
      />
    </>
  );

  const output = (
    <>
      <h2 className="text-lg font-semibold">Estimated cost</h2>
      {result ? (
        <>
          <p className="text-4xl font-bold tabular-nums text-accent">
            {currency(Number(result.costPerMonth))}
            <span className="ml-2 text-base font-normal text-muted">/month</span>
          </p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Per request</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(Number(result.costPerRequest), 6)}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Per day</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(Number(result.costPerDay))}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Per year</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(Number(result.costPerYear))}
              </p>
            </div>
          </div>
        </>
      ) : (
        <p className="text-sm text-red-500">Unknown model.</p>
      )}

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Compare across models</h3>
        <div className="max-h-80 overflow-y-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-surface text-left text-xs text-muted">
              <tr>
                <th className="px-3 py-2 font-medium">Model</th>
                <th className="px-3 py-2 font-medium">Provider</th>
                <th className="px-3 py-2 text-right font-medium">Per month</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => {
                const rowModel = getModel(row.modelId);
                if (!rowModel) return null;
                return (
                  <tr
                    key={row.modelId}
                    className={`border-t border-border ${
                      row.modelId === modelId ? "bg-accent/10" : ""
                    }`}
                  >
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        onClick={() => setModelId(row.modelId)}
                        className="text-left font-medium hover:text-accent"
                      >
                        {rowModel.label}
                      </button>
                    </td>
                    <td className="px-3 py-2 text-muted">
                      {PROVIDER_LABELS[rowModel.provider]}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {currency(Number(row.costPerMonth))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  return (
    <CalculatorShell
      inputs={leadWithComparison ? output : inputs}
      output={leadWithComparison ? inputs : output}
    />
  );
}
