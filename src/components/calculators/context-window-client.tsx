"use client";

import { useState } from "react";
import { MODELS, PROVIDER_LABELS, getModel, parseContextWindow } from "@/lib/calculators/ai-pricing";
import { CalculatorShell } from "@/components/calculator-shell";
import { NumberField } from "@/components/ui/number-field";

export function ContextWindowClient() {
  const [modelId, setModelId] = useState("gpt-5.1");
  const [existingTokens, setExistingTokens] = useState(20_000);
  const [reservedOutputTokens, setReservedOutputTokens] = useState(4_000);
  const [avgMessageTokens, setAvgMessageTokens] = useState(500);

  const model = getModel(modelId);
  const contextWindow = model ? parseContextWindow(model.contextWindow) : 0;
  const used = existingTokens + reservedOutputTokens;
  const remaining = Math.max(0, contextWindow - used);
  const usedPct = contextWindow > 0 ? Math.min(100, (used / contextWindow) * 100) : 0;
  const additionalMessages =
    avgMessageTokens > 0 ? Math.floor(remaining / avgMessageTokens) : 0;

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">Context budget</h2>
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
                      {m.label} ({m.contextWindow})
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <NumberField
            label="Existing conversation / document tokens"
            value={existingTokens}
            onChange={setExistingTokens}
            min={0}
            max={contextWindow || 1_000_000}
            step={1000}
          />
          <NumberField
            label="Reserved for the response"
            value={reservedOutputTokens}
            onChange={setReservedOutputTokens}
            min={0}
            max={128_000}
            step={500}
          />
          <NumberField
            label="Average tokens per additional message"
            value={avgMessageTokens}
            onChange={setAvgMessageTokens}
            min={1}
            max={20_000}
            step={50}
          />
        </>
      }
      output={
        <>
          <h2 className="text-lg font-semibold">Context window usage</h2>
          <p className="text-4xl font-bold tabular-nums text-accent">
            {usedPct.toFixed(1)}%
            <span className="ml-2 text-base font-normal text-muted">used</span>
          </p>
          <div className="h-3 w-full overflow-hidden rounded-full bg-border">
            <div
              className={`h-full rounded-full ${usedPct >= 100 ? "bg-red-500" : "bg-accent"}`}
              style={{ width: `${usedPct}%` }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Context window</p>
              <p className="text-lg font-semibold tabular-nums">
                {contextWindow.toLocaleString("en-US")} tokens
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Used (content + reserved)</p>
              <p className="text-lg font-semibold tabular-nums">
                {used.toLocaleString("en-US")} tokens
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Remaining budget</p>
              <p className="text-lg font-semibold tabular-nums">
                {remaining.toLocaleString("en-US")} tokens
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Additional messages that fit</p>
              <p className="text-lg font-semibold tabular-nums">
                {additionalMessages.toLocaleString("en-US")}
              </p>
            </div>
          </div>
          {used > contextWindow && (
            <p className="text-sm text-red-500">
              This exceeds the model&apos;s context window — you&apos;ll need to
              trim history, summarize, or use compaction before sending this
              request.
            </p>
          )}
        </>
      }
    />
  );
}
