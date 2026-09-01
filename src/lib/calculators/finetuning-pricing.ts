export type BillingUnit = "per_mtok" | "per_hour";

export interface FineTuneModelPricing {
  id: string;
  label: string;
  billingUnit: BillingUnit;
  trainingPrice: number; // $/M tokens for per_mtok, $/hour for per_hour
  note?: string;
}

/** OpenAI fine-tuning training prices, verified against OpenAI's pricing page as of 2026-09-01. */
export const FINE_TUNE_MODELS: FineTuneModelPricing[] = [
  { id: "gpt-4o-mini-2024-07-18", label: "GPT-4o Mini", billingUnit: "per_mtok", trainingPrice: 3.0 },
  { id: "gpt-4o-2024-08-06", label: "GPT-4o", billingUnit: "per_mtok", trainingPrice: 25.0 },
  { id: "gpt-4.1-2025-04-14", label: "GPT-4.1", billingUnit: "per_mtok", trainingPrice: 25.0 },
  {
    id: "o4-mini-2025-04-16",
    label: "o4-mini (reinforcement fine-tuning)",
    billingUnit: "per_hour",
    trainingPrice: 100.0,
    note: "Reinforcement fine-tuning is billed by training compute hours, not tokens.",
  },
];

export function getFineTuneModel(id: string): FineTuneModelPricing | undefined {
  return FINE_TUNE_MODELS.find((m) => m.id === id);
}
