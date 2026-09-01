"use client";

import { useMemo, useState } from "react";
import { calculateEmbeddingCost } from "@/lib/calculators/embedding-cost";
import { EMBEDDING_MODELS, getEmbeddingModel } from "@/lib/calculators/embedding-pricing";
import { PROVIDER_LABELS } from "@/lib/calculators/ai-pricing";
import { CalculatorShell } from "@/components/calculator-shell";
import { NumberField } from "@/components/ui/number-field";

const currency = (v: number, digits = 4) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: digits,
  }).format(v);

export function EmbeddingCostClient() {
  const [modelId, setModelId] = useState("text-embedding-3-small");
  const [documentCount, setDocumentCount] = useState(50_000);
  const [avgTokensPerDocument, setAvgTokensPerDocument] = useState(300);
  const [reindexesPerMonth, setReindexesPerMonth] = useState(1);

  const model = getEmbeddingModel(modelId);
  const result = useMemo(
    () => calculateEmbeddingCost({ modelId, documentCount, avgTokensPerDocument }),
    [modelId, documentCount, avgTokensPerDocument],
  );

  const monthlyCost = result ? Number(result.indexingCost) * reindexesPerMonth : 0;

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">Corpus</h2>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              Embedding model
            </label>
            <select
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            >
              {EMBEDDING_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label} — {PROVIDER_LABELS[m.provider]}
                </option>
              ))}
            </select>
            {model && (
              <p className="text-xs text-muted">
                {currency(model.pricePerMTok, 2)}/M tokens
                {model.note && <span className="block">{model.note}</span>}
              </p>
            )}
          </div>
          <NumberField
            label="Documents / chunks to embed"
            value={documentCount}
            onChange={setDocumentCount}
            min={0}
            max={5_000_000}
            step={1000}
          />
          <NumberField
            label="Average tokens per chunk"
            value={avgTokensPerDocument}
            onChange={setAvgTokensPerDocument}
            min={1}
            max={8000}
            step={50}
          />
          <NumberField
            label="Full re-indexes per month"
            value={reindexesPerMonth}
            onChange={setReindexesPerMonth}
            min={0}
            max={30}
            step={1}
          />
        </>
      }
      output={
        <>
          <h2 className="text-lg font-semibold">Indexing cost</h2>
          {result ? (
            <>
              <p className="text-4xl font-bold tabular-nums text-accent">
                {currency(Number(result.indexingCost))}
                <span className="ml-2 text-base font-normal text-muted">
                  per full index
                </span>
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg border border-border p-4">
                  <p className="text-muted">Total tokens embedded</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {result.totalTokens.toLocaleString("en-US")}
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-muted">Estimated monthly cost</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {currency(monthlyCost, 2)}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted">
                This covers indexing only (turning your corpus into vectors).
                Query-time embedding and LLM generation cost are estimated
                separately in the{" "}
                <a href="/rag-cost-calculator" className="text-accent underline">
                  RAG Cost Calculator
                </a>
                .
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
