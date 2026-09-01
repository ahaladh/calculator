import Decimal from "decimal.js";
import { getGpuOption } from "./gpu-pricing";

export interface GpuCostInput {
  gpuId: string;
  gpuCount: number;
  hoursPerDay: number;
  daysPerMonth: number;
}

export interface GpuCostResult {
  costPerHour: string;
  costPerDay: string;
  costPerMonth: string;
}

export function calculateGpuCost(input: GpuCostInput): GpuCostResult | null {
  const option = getGpuOption(input.gpuId);
  if (!option) return null;

  const gpuCount = new Decimal(Math.max(0, input.gpuCount));
  const hoursPerDay = new Decimal(Math.max(0, Math.min(24, input.hoursPerDay)));
  const daysPerMonth = new Decimal(Math.max(0, Math.min(31, input.daysPerMonth)));

  const costPerHour = gpuCount.times(option.pricePerHour);
  const costPerDay = costPerHour.times(hoursPerDay);
  const costPerMonth = costPerDay.times(daysPerMonth);

  return {
    costPerHour: costPerHour.toFixed(2),
    costPerDay: costPerDay.toFixed(2),
    costPerMonth: costPerMonth.toFixed(2),
  };
}
