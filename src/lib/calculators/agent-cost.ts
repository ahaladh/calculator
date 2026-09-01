import Decimal from "decimal.js";
import { getModel } from "./ai-pricing";

export interface AgentCostInput {
  modelId: string;
  steps: number;
  baseInputTokens: number;
  outputTokensPerStep: number;
  toolResultTokensPerStep: number;
  tasksPerDay: number;
}

export interface AgentCostResult {
  totalInputTokens: number;
  totalOutputTokens: number;
  costPerTask: string;
  costPerDay: string;
  costPerMonth: string;
}

const MTOK = new Decimal(1_000_000);

/**
 * Simulates a tool-calling agent loop: each step resends the growing
 * conversation (all prior output + tool results) as input tokens, since
 * the Messages/Chat Completions APIs are stateless.
 */
export function calculateAgentCost(input: AgentCostInput): AgentCostResult | null {
  const model = getModel(input.modelId);
  if (!model) return null;

  const steps = Math.max(1, Math.floor(input.steps));
  const baseInput = new Decimal(Math.max(0, input.baseInputTokens));
  const outputPerStep = new Decimal(Math.max(0, input.outputTokensPerStep));
  const toolResultPerStep = new Decimal(Math.max(0, input.toolResultTokensPerStep));
  const tasksPerDay = new Decimal(Math.max(0, input.tasksPerDay));

  let totalInputTokens = new Decimal(0);
  let accumulatedContext = baseInput;

  for (let step = 0; step < steps; step++) {
    totalInputTokens = totalInputTokens.plus(accumulatedContext);
    accumulatedContext = accumulatedContext.plus(outputPerStep).plus(toolResultPerStep);
  }

  const totalOutputTokens = outputPerStep.times(steps);

  const inputCost = totalInputTokens.div(MTOK).times(model.inputPerMTok);
  const outputCost = totalOutputTokens.div(MTOK).times(model.outputPerMTok);
  const costPerTask = inputCost.plus(outputCost);
  const costPerDay = costPerTask.times(tasksPerDay);

  return {
    totalInputTokens: totalInputTokens.toNumber(),
    totalOutputTokens: totalOutputTokens.toNumber(),
    costPerTask: costPerTask.toFixed(4),
    costPerDay: costPerDay.toFixed(2),
    costPerMonth: costPerDay.times(30).toFixed(2),
  };
}
