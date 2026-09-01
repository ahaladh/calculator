import Decimal from "decimal.js";
import { calculateAiCost } from "./ai-cost";

export interface SaasCostInput {
  modelId: string;
  inputTokensPerUser: number;
  outputTokensPerUser: number;
  requestsPerUserPerDay: number;
  activeUsers: number;
  targetMarginPct: number;
}

export interface SaasCostResult {
  totalMonthlyCost: string;
  costPerUserPerMonth: string;
  suggestedPricePerUser: string;
}

export function calculateSaasCost(input: SaasCostInput): SaasCostResult | null {
  const perUserCost = calculateAiCost({
    modelId: input.modelId,
    inputTokens: input.inputTokensPerUser,
    outputTokens: input.outputTokensPerUser,
    requestsPerDay: input.requestsPerUserPerDay,
  });
  if (!perUserCost) return null;

  const activeUsers = new Decimal(Math.max(0, input.activeUsers));
  const costPerUserPerMonth = new Decimal(perUserCost.costPerMonth);
  const totalMonthlyCost = costPerUserPerMonth.times(activeUsers);

  const margin = new Decimal(Math.max(0, Math.min(99, input.targetMarginPct))).div(100);
  const suggestedPricePerUser = costPerUserPerMonth.div(new Decimal(1).minus(margin));

  return {
    totalMonthlyCost: totalMonthlyCost.toFixed(2),
    costPerUserPerMonth: costPerUserPerMonth.toFixed(4),
    suggestedPricePerUser: suggestedPricePerUser.toFixed(2),
  };
}
