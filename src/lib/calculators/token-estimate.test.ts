import { describe, expect, it } from "vitest";
import { estimateTokens, estimateTokensFromWords, statsFromText } from "./token-estimate";

describe("statsFromText", () => {
  it("counts characters and words", () => {
    const stats = statsFromText("The quick brown fox jumps.");
    expect(stats.characters).toBe(26);
    expect(stats.words).toBe(5);
  });

  it("returns zero words for empty or whitespace-only text", () => {
    expect(statsFromText("").words).toBe(0);
    expect(statsFromText("   \n  ").words).toBe(0);
  });
});

describe("estimateTokens", () => {
  it("estimates roughly 1 token per 4 characters for GPT", () => {
    expect(estimateTokens(400, "gpt")).toBe(100);
  });

  it("returns 0 for empty input", () => {
    expect(estimateTokens(0, "gpt")).toBe(0);
    expect(estimateTokens(-5, "claude")).toBe(0);
  });

  it("differs slightly across tokenizer families for the same text", () => {
    const gpt = estimateTokens(1000, "gpt");
    const claude = estimateTokens(1000, "claude");
    expect(gpt).not.toBe(claude);
  });
});

describe("estimateTokensFromWords", () => {
  it("estimates tokens from a word count", () => {
    expect(estimateTokensFromWords(750, "gpt")).toBe(1000);
  });

  it("returns 0 for zero words", () => {
    expect(estimateTokensFromWords(0, "gemini")).toBe(0);
  });
});
