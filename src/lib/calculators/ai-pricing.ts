export type Provider = "openai" | "anthropic" | "google";

export interface ModelPricing {
  id: string;
  label: string;
  provider: Provider;
  contextWindow: string;
  inputPerMTok: number;
  cachedInputPerMTok?: number;
  outputPerMTok: number;
  note?: string;
}

export const PROVIDER_LABELS: Record<Provider, string> = {
  openai: "OpenAI",
  anthropic: "Anthropic",
  google: "Google",
};

/**
 * Pricing verified against each provider's own published pricing page /
 * documentation as of 2026-09-01. AI pricing changes frequently — treat
 * these as estimates and check the provider's pricing page for the
 * authoritative, current rate before making purchasing decisions.
 */
export const MODELS: ModelPricing[] = [
  // OpenAI
  { id: "gpt-5.6-sol", label: "GPT-5.6 Sol", provider: "openai", contextWindow: "1.05M", inputPerMTok: 4.0, cachedInputPerMTok: 0.4, outputPerMTok: 20.0 },
  { id: "gpt-5.6-terra", label: "GPT-5.6 Terra", provider: "openai", contextWindow: "1.05M", inputPerMTok: 2.0, cachedInputPerMTok: 0.2, outputPerMTok: 12.0 },
  { id: "gpt-5.6-luna", label: "GPT-5.6 Luna", provider: "openai", contextWindow: "1.05M", inputPerMTok: 0.2, cachedInputPerMTok: 0.02, outputPerMTok: 1.2 },
  { id: "gpt-5.1", label: "GPT-5.1", provider: "openai", contextWindow: "400K", inputPerMTok: 1.25, cachedInputPerMTok: 0.125, outputPerMTok: 10.0 },
  { id: "gpt-5-mini", label: "GPT-5 Mini", provider: "openai", contextWindow: "400K", inputPerMTok: 0.25, cachedInputPerMTok: 0.025, outputPerMTok: 2.0 },
  { id: "gpt-5-nano", label: "GPT-5 Nano", provider: "openai", contextWindow: "400K", inputPerMTok: 0.05, cachedInputPerMTok: 0.005, outputPerMTok: 0.4 },
  { id: "gpt-4.1", label: "GPT-4.1", provider: "openai", contextWindow: "1M", inputPerMTok: 2.0, cachedInputPerMTok: 0.5, outputPerMTok: 8.0 },
  { id: "gpt-4.1-mini", label: "GPT-4.1 Mini", provider: "openai", contextWindow: "1M", inputPerMTok: 0.4, cachedInputPerMTok: 0.1, outputPerMTok: 1.6 },
  { id: "gpt-4o", label: "GPT-4o", provider: "openai", contextWindow: "128K", inputPerMTok: 2.5, cachedInputPerMTok: 1.25, outputPerMTok: 10.0 },
  { id: "gpt-4o-mini", label: "GPT-4o Mini", provider: "openai", contextWindow: "128K", inputPerMTok: 0.15, cachedInputPerMTok: 0.075, outputPerMTok: 0.6 },
  { id: "o3", label: "o3", provider: "openai", contextWindow: "200K", inputPerMTok: 2.0, cachedInputPerMTok: 0.5, outputPerMTok: 8.0 },
  { id: "gpt-3.5-turbo", label: "GPT-3.5 Turbo", provider: "openai", contextWindow: "16K", inputPerMTok: 0.5, outputPerMTok: 1.5 },

  // Anthropic — https://docs.claude.com/en/docs/about-claude/pricing
  { id: "claude-fable-5", label: "Claude Fable 5", provider: "anthropic", contextWindow: "1M", inputPerMTok: 10.0, cachedInputPerMTok: 1.0, outputPerMTok: 50.0 },
  { id: "claude-opus-5", label: "Claude Opus 5", provider: "anthropic", contextWindow: "1M", inputPerMTok: 5.0, cachedInputPerMTok: 0.5, outputPerMTok: 25.0 },
  { id: "claude-opus-4-8", label: "Claude Opus 4.8", provider: "anthropic", contextWindow: "1M", inputPerMTok: 5.0, cachedInputPerMTok: 0.5, outputPerMTok: 25.0 },
  { id: "claude-opus-4-6", label: "Claude Opus 4.6", provider: "anthropic", contextWindow: "1M", inputPerMTok: 5.0, cachedInputPerMTok: 0.5, outputPerMTok: 25.0 },
  { id: "claude-sonnet-5", label: "Claude Sonnet 5", provider: "anthropic", contextWindow: "1M", inputPerMTok: 2.0, cachedInputPerMTok: 0.2, outputPerMTok: 10.0 },
  { id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6", provider: "anthropic", contextWindow: "1M", inputPerMTok: 3.0, cachedInputPerMTok: 0.3, outputPerMTok: 15.0 },
  { id: "claude-haiku-4-5", label: "Claude Haiku 4.5", provider: "anthropic", contextWindow: "200K", inputPerMTok: 1.0, cachedInputPerMTok: 0.1, outputPerMTok: 5.0 },

  // Google — https://ai.google.dev/gemini-api/docs/pricing
  { id: "gemini-3.7-flash", label: "Gemini 3.7 Flash", provider: "google", contextWindow: "1M", inputPerMTok: 0.75, cachedInputPerMTok: 0.075, outputPerMTok: 3.75, note: "Introductory rate through Dec 31, 2026; doubles Jan 1, 2027." },
  { id: "gemini-3.5-flash", label: "Gemini 3.5 Flash", provider: "google", contextWindow: "1M", inputPerMTok: 1.5, cachedInputPerMTok: 0.15, outputPerMTok: 9.0 },
  { id: "gemini-3.5-flash-lite", label: "Gemini 3.5 Flash-Lite", provider: "google", contextWindow: "1M", inputPerMTok: 0.3, cachedInputPerMTok: 0.03, outputPerMTok: 2.5 },
  { id: "gemini-3.1-pro-preview", label: "Gemini 3.1 Pro", provider: "google", contextWindow: "200K", inputPerMTok: 2.0, cachedInputPerMTok: 0.2, outputPerMTok: 12.0, note: "Rate for prompts ≤200K tokens; $4.00 / $18.00 above that." },
];

export function getModel(id: string): ModelPricing | undefined {
  return MODELS.find((m) => m.id === id);
}

/** Parses a context-window label like "1M", "400K", "128K" into a token count. */
export function parseContextWindow(label: string): number {
  const match = label.match(/^([\d.]+)([KM])$/i);
  if (!match) return 0;
  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();
  return unit === "M" ? value * 1_000_000 : value * 1_000;
}

export function modelsByProvider(provider: Provider): ModelPricing[] {
  return MODELS.filter((m) => m.provider === provider);
}
