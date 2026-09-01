import Decimal from "decimal.js";
import { getModel, MODELS } from "./ai-pricing";

export interface AiCostInput {
  modelId: string;
  inputTokens: number;
  outputTokens: number;
  cachedInputTokens?: number;
  requestsPerDay: number;
}

export interface AiCostResult {
  costPerRequest: string;
  costPerDay: string;
  costPerMonth: string;
  costPerYear: string;
}

const MTOK = new Decimal(1_000_000);
const DAYS_PER_MONTH = 30;
const DAYS_PER_YEAR = 365;

export function calculateAiCost(input: AiCostInput): AiCostResult | null {
  const model = getModel(input.modelId);
  if (!model) return null;

  const cachedTokens = new Decimal(Math.max(0, input.cachedInputTokens ?? 0));
  const rawInputTokens = new Decimal(Math.max(0, input.inputTokens));
  const uncachedInputTokens = Decimal.max(0, rawInputTokens.minus(cachedTokens));
  const outputTokens = new Decimal(Math.max(0, input.outputTokens));
  const requestsPerDay = new Decimal(Math.max(0, input.requestsPerDay));

  const cachedRate = new Decimal(model.cachedInputPerMTok ?? model.inputPerMTok);

  const inputCost = uncachedInputTokens.div(MTOK).times(model.inputPerMTok);
  const cachedCost = cachedTokens.div(MTOK).times(cachedRate);
  const outputCost = outputTokens.div(MTOK).times(model.outputPerMTok);

  const costPerRequest = inputCost.plus(cachedCost).plus(outputCost);
  const costPerDay = costPerRequest.times(requestsPerDay);

  return {
    costPerRequest: costPerRequest.toFixed(6),
    costPerDay: costPerDay.toFixed(2),
    costPerMonth: costPerDay.times(DAYS_PER_MONTH).toFixed(2),
    costPerYear: costPerDay.times(DAYS_PER_YEAR).toFixed(2),
  };
}

export function compareAllModels(
  input: Omit<AiCostInput, "modelId">,
): Array<{ modelId: string } & AiCostResult> {
  return MODELS.map((m) => {
    const result = calculateAiCost({ ...input, modelId: m.id });
    return { modelId: m.id, ...(result as AiCostResult) };
  }).sort((a, b) => Number(a.costPerMonth) - Number(b.costPerMonth));
}
