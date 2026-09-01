"use client";

import { useMemo, useState } from "react";
import { calculateAgentCost } from "@/lib/calculators/agent-cost";
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

export function AgentCostClient() {
  const [modelId, setModelId] = useState("gpt-5.1");
  const [steps, setSteps] = useState(5);
  const [baseInputTokens, setBaseInputTokens] = useState(2000);
  const [outputTokensPerStep, setOutputTokensPerStep] = useState(300);
  const [toolResultTokensPerStep, setToolResultTokensPerStep] = useState(500);
  const [tasksPerDay, setTasksPerDay] = useState(200);

  const result = useMemo(
    () =>
      calculateAgentCost({
        modelId,
        steps,
        baseInputTokens,
        outputTokensPerStep,
        toolResultTokensPerStep,
        tasksPerDay,
      }),
    [modelId, steps, baseInputTokens, outputTokensPerStep, toolResultTokensPerStep, tasksPerDay],
  );

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">Agent task shape</h2>
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
            label="Steps (tool calls) per task"
            value={steps}
            onChange={setSteps}
            min={1}
            max={50}
            step={1}
          />
          <NumberField
            label="Base input tokens (system prompt + task)"
            value={baseInputTokens}
            onChange={setBaseInputTokens}
            min={0}
            max={100_000}
            step={100}
          />
          <NumberField
            label="Output tokens per step"
            value={outputTokensPerStep}
            onChange={setOutputTokensPerStep}
            min={0}
            max={10_000}
            step={50}
          />
          <NumberField
            label="Tool result tokens appended per step"
            value={toolResultTokensPerStep}
            onChange={setToolResultTokensPerStep}
            min={0}
            max={20_000}
            step={50}
          />
          <NumberField
            label="Tasks per day"
            value={tasksPerDay}
            onChange={setTasksPerDay}
            min={0}
            max={1_000_000}
            step={10}
          />
        </>
      }
      output={
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
                  <p className="text-muted">Per task</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {currency(Number(result.costPerTask), 4)}
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-muted">Per day</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {currency(Number(result.costPerDay))}
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-muted">Total tokens / task</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {(result.totalInputTokens + result.totalOutputTokens).toLocaleString("en-US")}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted">
                Because each step resends the full conversation so far,
                input tokens compound across steps — {steps} steps produced{" "}
                {result.totalInputTokens.toLocaleString("en-US")} total input tokens
                for this task, not {baseInputTokens.toLocaleString("en-US")}. Prompt
                caching on repeated prefixes can cut this significantly.
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
