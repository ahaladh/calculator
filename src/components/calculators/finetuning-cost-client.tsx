"use client";

import { useMemo, useState } from "react";
import { calculateFineTuneCost } from "@/lib/calculators/finetuning-cost";
import { FINE_TUNE_MODELS, getFineTuneModel } from "@/lib/calculators/finetuning-pricing";
import { CalculatorShell } from "@/components/calculator-shell";
import { NumberField } from "@/components/ui/number-field";

const currency = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

export function FineTuningCostClient() {
  const [modelId, setModelId] = useState("gpt-4o-mini-2024-07-18");
  const [trainingTokens, setTrainingTokens] = useState(1_000_000);
  const [epochs, setEpochs] = useState(3);
  const [trainingHours, setTrainingHours] = useState(4);

  const model = getFineTuneModel(modelId);
  const result = useMemo(
    () => calculateFineTuneCost({ modelId, trainingTokens, epochs, trainingHours }),
    [modelId, trainingTokens, epochs, trainingHours],
  );

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">Training job</h2>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Model</label>
            <select
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            >
              {FINE_TUNE_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
            {model?.note && <p className="text-xs text-muted">{model.note}</p>}
          </div>

          {model?.billingUnit === "per_hour" ? (
            <NumberField
              label="Training compute hours"
              value={trainingHours}
              onChange={setTrainingHours}
              min={0}
              max={500}
              step={1}
            />
          ) : (
            <>
              <NumberField
                label="Training dataset tokens"
                value={trainingTokens}
                onChange={setTrainingTokens}
                min={0}
                max={100_000_000}
                step={10_000}
              />
              <NumberField
                label="Epochs"
                value={epochs}
                onChange={setEpochs}
                min={1}
                max={20}
                step={1}
              />
            </>
          )}
        </>
      }
      output={
        <>
          <h2 className="text-lg font-semibold">Training cost</h2>
          {result ? (
            <>
              <p className="text-4xl font-bold tabular-nums text-accent">
                {currency(Number(result.trainingCost))}
              </p>
              <p className="text-sm text-muted">
                {result.billingUnit === "per_hour"
                  ? "One-time cost for this training run, billed by compute hour."
                  : "One-time cost for this training run, billed per token across all epochs."}
              </p>
              <p className="text-sm text-muted">
                After training, inference on your fine-tuned model is billed
                separately at the provider&apos;s tuned-model inference rate
                — check OpenAI&apos;s fine-tuning pricing page for the
                current rate, since it can exceed the base model&apos;s
                price and may change independently of training price.
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
