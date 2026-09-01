import type { Provider } from "./ai-pricing";

export interface FlatUnitPricing {
  id: string;
  label: string;
  provider: Provider;
  pricePerUnit: number;
  note?: string;
}

/**
 * Image generation pricing, $ per image. OpenAI's API bills image output by
 * token, not per image — these figures are derived from OpenAI's published
 * per-token output rate using the commonly documented tokens-per-image
 * count for a 1024×1024 image (~272 low / ~1056 medium / ~4160 high) — an
 * estimate, not OpenAI's own stated per-image price. Google Imagen/Gemini
 * image prices are flat per-image and sourced from third-party pricing
 * trackers, since Google's own docs page did not list a dedicated Imagen
 * pricing table at time of writing — confirm before budgeting at scale.
 */
export const IMAGE_MODELS: FlatUnitPricing[] = [
  { id: "gpt-image-2-low", label: "GPT Image 2 — Low", provider: "openai", pricePerUnit: 0.0075, note: "Estimated from token pricing." },
  { id: "gpt-image-2-medium", label: "GPT Image 2 — Medium", provider: "openai", pricePerUnit: 0.0317, note: "Estimated from token pricing." },
  { id: "gpt-image-2-high", label: "GPT Image 2 — High", provider: "openai", pricePerUnit: 0.1248, note: "Estimated from token pricing." },
  { id: "gpt-image-1.5-low", label: "GPT Image 1.5 — Low", provider: "openai", pricePerUnit: 0.0087, note: "Estimated from token pricing." },
  { id: "gpt-image-1.5-medium", label: "GPT Image 1.5 — Medium", provider: "openai", pricePerUnit: 0.0338, note: "Estimated from token pricing." },
  { id: "gpt-image-1.5-high", label: "GPT Image 1.5 — High", provider: "openai", pricePerUnit: 0.1331, note: "Estimated from token pricing." },
  { id: "gpt-image-1-mini-low", label: "GPT Image 1 Mini — Low", provider: "openai", pricePerUnit: 0.0022, note: "Estimated from token pricing." },
  { id: "gpt-image-1-mini-medium", label: "GPT Image 1 Mini — Medium", provider: "openai", pricePerUnit: 0.0084, note: "Estimated from token pricing." },
  { id: "gpt-image-1-mini-high", label: "GPT Image 1 Mini — High", provider: "openai", pricePerUnit: 0.0333, note: "Estimated from token pricing." },
  { id: "imagen-4-fast", label: "Imagen 4 — Fast", provider: "google", pricePerUnit: 0.02 },
  { id: "imagen-4-standard", label: "Imagen 4 — Standard", provider: "google", pricePerUnit: 0.04 },
  { id: "imagen-4-ultra", label: "Imagen 4 — Ultra", provider: "google", pricePerUnit: 0.06 },
  { id: "gemini-3-pro-image-standard", label: "Gemini 3 Pro Image — 1K/2K", provider: "google", pricePerUnit: 0.134 },
  { id: "gemini-3-pro-image-4k", label: "Gemini 3 Pro Image — 4K", provider: "google", pricePerUnit: 0.24 },
];

/**
 * Video generation pricing, $ per second of output. Sourced directly from
 * OpenAI's and Google's own pricing pages as of 2026-09-01.
 */
export const VIDEO_MODELS: FlatUnitPricing[] = [
  { id: "sora-2-720p", label: "Sora 2 — 720p", provider: "openai", pricePerUnit: 0.1 },
  { id: "sora-2-pro-720p", label: "Sora 2 Pro — 720p", provider: "openai", pricePerUnit: 0.3 },
  { id: "sora-2-pro-1024p", label: "Sora 2 Pro — 1024p", provider: "openai", pricePerUnit: 0.5 },
  { id: "sora-2-pro-1080p", label: "Sora 2 Pro — 1080p", provider: "openai", pricePerUnit: 0.7 },
  { id: "veo-3.1-lite-720p", label: "Veo 3.1 Lite — 720p", provider: "google", pricePerUnit: 0.05 },
  { id: "veo-3.1-lite-1080p", label: "Veo 3.1 Lite — 1080p", provider: "google", pricePerUnit: 0.08 },
  { id: "veo-3.1-fast-720p", label: "Veo 3.1 Fast — 720p", provider: "google", pricePerUnit: 0.1 },
  { id: "veo-3.1-fast-1080p", label: "Veo 3.1 Fast — 1080p", provider: "google", pricePerUnit: 0.12 },
  { id: "veo-3.1-fast-4k", label: "Veo 3.1 Fast — 4K", provider: "google", pricePerUnit: 0.3 },
  { id: "veo-3.1-standard-720p", label: "Veo 3.1 Standard — 720p", provider: "google", pricePerUnit: 0.4 },
  { id: "veo-3.1-standard-1080p", label: "Veo 3.1 Standard — 1080p", provider: "google", pricePerUnit: 0.4 },
  { id: "veo-3.1-standard-4k", label: "Veo 3.1 Standard — 4K", provider: "google", pricePerUnit: 0.6 },
];

export function getImageModel(id: string): FlatUnitPricing | undefined {
  return IMAGE_MODELS.find((m) => m.id === id);
}

export function getVideoModel(id: string): FlatUnitPricing | undefined {
  return VIDEO_MODELS.find((m) => m.id === id);
}
