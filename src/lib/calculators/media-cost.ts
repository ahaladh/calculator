import Decimal from "decimal.js";
import { getImageModel, getVideoModel } from "./media-pricing";

export interface FlatCostResult {
  costPerUnit: string;
  totalCost: string;
  costPerMonth: string;
}

export function calculateImageCost(
  modelId: string,
  imagesPerRun: number,
  runsPerDay: number,
): FlatCostResult | null {
  const model = getImageModel(modelId);
  if (!model) return null;
  return computeFlatCost(model.pricePerUnit, Math.max(0, imagesPerRun), runsPerDay);
}

export function calculateVideoCost(
  modelId: string,
  secondsPerVideo: number,
  videosPerDay: number,
): FlatCostResult | null {
  const model = getVideoModel(modelId);
  if (!model) return null;
  return computeFlatCost(model.pricePerUnit, Math.max(0, secondsPerVideo), videosPerDay);
}

function computeFlatCost(
  pricePerUnit: number,
  unitsPerRun: number,
  runsPerDay: number,
): FlatCostResult {
  const units = new Decimal(Math.max(0, unitsPerRun));
  const runs = new Decimal(Math.max(0, runsPerDay));
  const costPerUnit = new Decimal(pricePerUnit);
  const totalCost = units.times(costPerUnit);
  const costPerDay = totalCost.times(runs);

  return {
    costPerUnit: costPerUnit.toFixed(4),
    totalCost: totalCost.toFixed(4),
    costPerMonth: costPerDay.times(30).toFixed(2),
  };
}
