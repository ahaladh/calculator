"use client";

import { useMemo, useState } from "react";
import { calculateImageCost, calculateVideoCost } from "@/lib/calculators/media-cost";
import { IMAGE_MODELS, VIDEO_MODELS, type FlatUnitPricing } from "@/lib/calculators/media-pricing";
import { PROVIDER_LABELS } from "@/lib/calculators/ai-pricing";
import { CalculatorShell } from "@/components/calculator-shell";
import { NumberField } from "@/components/ui/number-field";

const currency = (v: number, digits = 2) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: digits,
  }).format(v);

function ModelSelect({
  models,
  value,
  onChange,
}: {
  models: FlatUnitPricing[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
    >
      {(["openai", "google"] as const).map((provider) => (
        <optgroup key={provider} label={PROVIDER_LABELS[provider]}>
          {models
            .filter((m) => m.provider === provider)
            .map((m) => (
              <option key={m.id} value={m.id}>
                {m.label} (${m.pricePerUnit.toFixed(4)})
              </option>
            ))}
        </optgroup>
      ))}
    </select>
  );
}

export function ImageCostClient() {
  const [modelId, setModelId] = useState("imagen-4-standard");
  const [imagesPerRun, setImagesPerRun] = useState(1);
  const [runsPerDay, setRunsPerDay] = useState(200);

  const model = IMAGE_MODELS.find((m) => m.id === modelId);
  const result = useMemo(
    () => calculateImageCost(modelId, imagesPerRun, runsPerDay),
    [modelId, imagesPerRun, runsPerDay],
  );

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">Generation volume</h2>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Model / tier</label>
            <ModelSelect models={IMAGE_MODELS} value={modelId} onChange={setModelId} />
            {model?.note && <p className="text-xs text-muted">{model.note}</p>}
          </div>
          <NumberField
            label="Images per request"
            value={imagesPerRun}
            onChange={setImagesPerRun}
            min={1}
            max={20}
            step={1}
          />
          <NumberField
            label="Requests per day"
            value={runsPerDay}
            onChange={setRunsPerDay}
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
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg border border-border p-4">
                  <p className="text-muted">Per image</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {currency(Number(result.costPerUnit), 4)}
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-muted">Per request</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {currency(Number(result.totalCost), 4)}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-red-500">Unknown model.</p>
          )}
        </>
      }
    />
  );
}

export function VideoCostClient() {
  const [modelId, setModelId] = useState("veo-3.1-fast-1080p");
  const [secondsPerVideo, setSecondsPerVideo] = useState(8);
  const [videosPerDay, setVideosPerDay] = useState(20);

  const result = useMemo(
    () => calculateVideoCost(modelId, secondsPerVideo, videosPerDay),
    [modelId, secondsPerVideo, videosPerDay],
  );

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">Generation volume</h2>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Model / tier</label>
            <ModelSelect models={VIDEO_MODELS} value={modelId} onChange={setModelId} />
          </div>
          <NumberField
            label="Seconds per video"
            value={secondsPerVideo}
            onChange={setSecondsPerVideo}
            min={1}
            max={60}
            step={1}
          />
          <NumberField
            label="Videos per day"
            value={videosPerDay}
            onChange={setVideosPerDay}
            min={0}
            max={100_000}
            step={5}
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
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg border border-border p-4">
                  <p className="text-muted">Per second</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {currency(Number(result.costPerUnit), 4)}
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-muted">Per video</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {currency(Number(result.totalCost), 4)}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-red-500">Unknown model.</p>
          )}
        </>
      }
    />
  );
}
