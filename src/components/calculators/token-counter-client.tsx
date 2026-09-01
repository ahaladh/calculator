"use client";

import { useMemo, useState } from "react";
import {
  estimateTokens,
  statsFromText,
  TOKENIZER_LABELS,
  type TokenizerFamily,
} from "@/lib/calculators/token-estimate";
import { calculateAiCost } from "@/lib/calculators/ai-cost";
import { CalculatorShell } from "@/components/calculator-shell";

const FAMILIES: TokenizerFamily[] = ["gpt", "claude", "gemini"];
const SAMPLE_MODEL: Record<TokenizerFamily, string> = {
  gpt: "gpt-5.1",
  claude: "claude-sonnet-5",
  gemini: "gemini-3.5-flash",
};

export function TokenCounterClient() {
  const [text, setText] = useState("");

  const stats = useMemo(() => statsFromText(text), [text]);

  const rows = useMemo(
    () =>
      FAMILIES.map((family) => {
        const tokens = estimateTokens(stats.characters, family);
        const cost = calculateAiCost({
          modelId: SAMPLE_MODEL[family],
          inputTokens: tokens,
          outputTokens: 0,
          requestsPerDay: 1,
        });
        return { family, tokens, costPerRequest: cost?.costPerRequest ?? "0" };
      }),
    [stats.characters],
  );

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">Your text</h2>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your prompt or document here…"
            rows={12}
            className="w-full resize-y rounded-lg border border-border bg-background p-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          <button
            type="button"
            onClick={() => setText("")}
            className="self-start text-sm font-medium text-muted underline-offset-4 hover:text-foreground hover:underline"
          >
            Clear text
          </button>
        </>
      }
      output={
        <>
          <h2 className="text-lg font-semibold">Token count</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Characters</p>
              <p className="text-2xl font-semibold tabular-nums">
                {stats.characters.toLocaleString("en-US")}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-muted">Words</p>
              <p className="text-2xl font-semibold tabular-nums">
                {stats.words.toLocaleString("en-US")}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Estimated tokens by model family</h3>
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-surface text-left text-xs text-muted">
                  <tr>
                    <th className="px-3 py-2 font-medium">Tokenizer</th>
                    <th className="px-3 py-2 text-right font-medium">Tokens</th>
                    <th className="px-3 py-2 text-right font-medium">
                      Cost as input (example model)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.family} className="border-t border-border">
                      <td className="px-3 py-2">{TOKENIZER_LABELS[row.family]}</td>
                      <td className="px-3 py-2 text-right tabular-nums">
                        {row.tokens.toLocaleString("en-US")}
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums text-muted">
                        ${row.costPerRequest}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      }
    />
  );
}
