import Decimal from "decimal.js";
import { getFineTuneModel } from "./finetuning-pricing";

const MTOK = new Decimal(1_000_000);

export interface FineTuneCostInput {
  modelId: string;
  trainingTokens: number;
  epochs: number;
  trainingHours: number;
}

export interface FineTuneCostResult {
  trainingCost: string;
  billingUnit: "per_mtok" | "per_hour";
}

export function calculateFineTuneCost(
  input: FineTuneCostInput,
): FineTuneCostResult | null {
  const model = getFineTuneModel(input.modelId);
  if (!model) return null;

  if (model.billingUnit === "per_hour") {
    const hours = new Decimal(Math.max(0, input.trainingHours));
    return {
      trainingCost: hours.times(model.trainingPrice).toFixed(2),
      billingUnit: "per_hour",
    };
  }

  const tokens = new Decimal(Math.max(0, input.trainingTokens));
  const epochs = new Decimal(Math.max(1, input.epochs));
  const cost = tokens.times(epochs).div(MTOK).times(model.trainingPrice);
  return { trainingCost: cost.toFixed(2), billingUnit: "per_mtok" };
}
