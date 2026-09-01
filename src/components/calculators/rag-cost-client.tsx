"use client";

import { useMemo, useState } from "react";
import { calculateEmbeddingCost } from "@/lib/calculators/embedding-cost";
import { EMBEDDING_MODELS } from "@/lib/calculators/embedding-pricing";
import { calculateAiCost } from "@/lib/calculators/ai-cost";
import { MODELS, PROVIDER_LABELS, getModel } from "@/lib/calculators/ai-pricing";
import { CalculatorShell } from "@/components/calculator-shell";
import { NumberField } from "@/components/ui/number-field";

const currency = (v: number, digits = 2) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: digits,
  }).format(v);

export function RagCostClient() {
  const [embeddingModelId, setEmbeddingModelId] = useState("text-embedding-3-small");
  const [documentCount, setDocumentCount] = useState(50_000);
  const [avgTokensPerDocument, setAvgTokensPerDocument] = useState(300);

  const [llmModelId, setLlmModelId] = useState("gpt-5.1");
  const [queriesPerDay, setQueriesPerDay] = useState(500);
  const [chunksRetrieved, setChunksRetrieved] = useState(5);
  const [queryTokens, setQueryTokens] = useState(50);
  const [outputTokens, setOutputTokens] = useState(300);

  const llmModel = getModel(llmModelId);

  const indexing = useMemo(
    () =>
      calculateEmbeddingCost({
        modelId: embeddingModelId,
        documentCount,
        avgTokensPerDocument,
      }),
    [embeddingModelId, documentCount, avgTokensPerDocument],
  );

  const retrievedContextTokens = chunksRetrieved * avgTokensPerDocument;
  const inputTokensPerQuery = retrievedContextTokens + queryTokens;

  const generation = useMemo(
    () =>
      calculateAiCost({
        modelId: llmModelId,
        inputTokens: inputTokensPerQuery,
        outputTokens,
        requestsPerDay: queriesPerDay,
      }),
    [llmModelId, inputTokensPerQuery, outputTokens, queriesPerDay],
  );

  const queryEmbeddingCost = useMemo(
    () =>
      calculateEmbeddingCost({
        modelId: embeddingModelId,
        documentCount: queriesPerDay * 30,
        avgTokensPerDocument: queryTokens,
      }),
    [embeddingModelId, queriesPerDay, queryTokens],
  );

  const indexingCost = indexing ? Number(indexing.indexingCost) : 0;
  const generationMonthly = generation ? Number(generation.costPerMonth) : 0;
  const queryEmbeddingMonthly = queryEmbeddingCost
    ? Number(queryEmbeddingCost.indexingCost)
    : 0;
  const totalMonthly = indexingCost + generationMonthly + queryEmbeddingMonthly;

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">Indexing</h2>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              Embedding model
            </label>
            <select
              value={embeddingModelId}
              onChange={(e) => setEmbeddingModelId(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            >
              {EMBEDDING_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label} — {PROVIDER_LABELS[m.provider]}
                </option>
              ))}
            </select>
          </div>
          <NumberField
            label="Documents / chunks indexed"
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
            max={4000}
            step={50}
          />

          <h2 className="mt-4 text-lg font-semibold">Query &amp; generation</h2>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              Generation model
            </label>
            <select
              value={llmModelId}
              onChange={(e) => setLlmModelId(e.target.value)}
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
            label="Chunks retrieved per query"
            value={chunksRetrieved}
            onChange={setChunksRetrieved}
            min={1}
            max={50}
            step={1}
          />
          <NumberField
            label="User query tokens"
            value={queryTokens}
            onChange={setQueryTokens}
            min={1}
            max={2000}
            step={10}
          />
          <NumberField
            label="Generated answer tokens"
            value={outputTokens}
            onChange={setOutputTokens}
            min={1}
            max={4000}
            step={50}
          />
          <NumberField
            label="Queries per day"
            value={queriesPerDay}
            onChange={setQueriesPerDay}
            min={0}
            max={1_000_000}
            step={100}
          />
        </>
      }
      output={
        <>
          <h2 className="text-lg font-semibold">Estimated monthly cost</h2>
          <p className="text-4xl font-bold tabular-nums text-accent">
            {currency(totalMonthly)}
            <span className="ml-2 text-base font-normal text-muted">/month</span>
          </p>
          <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">One-time indexing</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(indexingCost, 4)}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Query embedding / mo</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(queryEmbeddingMonthly, 4)}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Generation / mo</p>
              <p className="text-lg font-semibold tabular-nums">
                {currency(generationMonthly)}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted">
            Retrieved context: {retrievedContextTokens.toLocaleString("en-US")} tokens
            + {queryTokens.toLocaleString("en-US")} query tokens ={" "}
            {inputTokensPerQuery.toLocaleString("en-US")} input tokens per query to{" "}
            {llmModel?.label ?? "the generation model"}. Vector database
            hosting/storage cost is not included — add your provider&apos;s
            hosting fee separately.
          </p>
        </>
      }
    />
  );
}
