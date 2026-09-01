export type TokenizerFamily = "gpt" | "claude" | "gemini";

export const TOKENIZER_LABELS: Record<TokenizerFamily, string> = {
  gpt: "GPT (OpenAI)",
  claude: "Claude (Anthropic)",
  gemini: "Gemini (Google)",
};

/**
 * Characters-per-token varies by tokenizer and content. These are widely
 * cited rule-of-thumb averages for English prose, not exact tokenizer
 * output — use a provider's own tokenizer for exact counts.
 */
const CHARS_PER_TOKEN: Record<TokenizerFamily, number> = {
  gpt: 4.0,
  claude: 3.8,
  gemini: 4.0,
};

export interface TextStats {
  characters: number;
  words: number;
}

export function statsFromText(text: string): TextStats {
  const characters = text.length;
  const words = text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length;
  return { characters, words };
}

export function estimateTokens(
  characters: number,
  family: TokenizerFamily,
): number {
  if (characters <= 0) return 0;
  return Math.ceil(characters / CHARS_PER_TOKEN[family]);
}

export function estimateTokensFromWords(
  words: number,
  family: TokenizerFamily,
): number {
  // ~0.75 words per token is the standard English rule of thumb.
  const perWordFactor = family === "claude" ? 0.72 : 0.75;
  if (words <= 0) return 0;
  return Math.ceil(words / perWordFactor);
}
