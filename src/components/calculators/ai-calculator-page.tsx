import { AiCostCalculatorClient } from "@/components/calculators/ai-cost-calculator-client";
import { CalcPage, buildCalcJsonLd, type Faq } from "@/components/calculators/calc-page";

export type { Faq };
export const buildAiCalculatorJsonLd = buildCalcJsonLd;

export function AiCalculatorPage({
  h1,
  intro,
  defaultModelId,
  leadWithComparison,
  faqs,
  jsonLd,
}: {
  h1: string;
  intro: string;
  defaultModelId?: string;
  leadWithComparison?: boolean;
  faqs: Faq[];
  jsonLd: object;
}) {
  const methodology = (
    <>
      <p className="text-muted">
        Providers bill input and output tokens separately, per million
        tokens (MTok). Cached input tokens — a repeated prompt prefix the
        provider recognizes — are billed at a discounted rate.
      </p>
      <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-sm">
        cost = (input_tokens − cached_tokens) × input_rate{"\n"}
        {"     "}+ cached_tokens × cached_rate{"\n"}
        {"     "}+ output_tokens × output_rate
      </pre>
    </>
  );

  return (
    <CalcPage h1={h1} intro={intro} faqs={faqs} jsonLd={jsonLd} methodology={methodology}>
      <AiCostCalculatorClient
        defaultModelId={defaultModelId}
        leadWithComparison={leadWithComparison}
      />
    </CalcPage>
  );
}
