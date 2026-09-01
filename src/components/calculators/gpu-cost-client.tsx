"use client";

import { useMemo, useState } from "react";
import { calculateGpuCost } from "@/lib/calculators/gpu-cost";
import { GPU_OPTIONS, getGpuOption } from "@/lib/calculators/gpu-pricing";
import { CalculatorShell } from "@/components/calculator-shell";
import { NumberField } from "@/components/ui/number-field";

const currency = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

export function GpuCostClient() {
  const [gpuId, setGpuId] = useState("h100-sxm-runpod");
  const [gpuCount, setGpuCount] = useState(1);
  const [hoursPerDay, setHoursPerDay] = useState(24);
  const [daysPerMonth, setDaysPerMonth] = useState(30);

  const option = useMemo(() => getGpuOption(gpuId), [gpuId]);
  const result = useMemo(
    () => calculateGpuCost({ gpuId, gpuCount, hoursPerDay, daysPerMonth }),
    [gpuId, gpuCount, hoursPerDay, daysPerMonth],
  );

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">Cluster</h2>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              GPU &amp; provider
            </label>
            <select
              value={gpuId}
              onChange={(e) => setGpuId(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            >
              {GPU_OPTIONS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.gpu} — {g.provider} (${g.pricePerHour.toFixed(2)}/hr)
                </option>
              ))}
            </select>
          </div>
          <NumberField
            label="Number of GPUs"
            value={gpuCount}
            onChange={setGpuCount}
            min={1}
            max={512}
            step={1}
          />
          <NumberField
            label="Hours per day"
            value={hoursPerDay}
            onChange={setHoursPerDay}
            min={0}
            max={24}
            step={1}
          />
          <NumberField
            label="Days per month"
            value={daysPerMonth}
            onChange={setDaysPerMonth}
            min={0}
            max={31}
            step={1}
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
                  <p className="text-muted">Per hour ({gpuCount}× GPU)</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {currency(Number(result.costPerHour))}
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-muted">Per day</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {currency(Number(result.costPerDay))}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted">
                Rate shown for {option?.gpu} on {option?.provider}:{" "}
                ${option?.pricePerHour.toFixed(2)}/GPU-hour on-demand. Spot,
                reserved, or marketplace pricing can run substantially lower
                — this estimate uses on-demand list rates.
              </p>
            </>
          ) : (
            <p className="text-sm text-red-500">Unknown GPU option.</p>
          )}
        </>
      }
    />
  );
}
