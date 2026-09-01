import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { ImageCostClient } from "@/components/calculators/media-cost-client";

export const metadata: Metadata = {
  title: "AI Image Generation Cost Calculator — GPT Image & Imagen Pricing",
  description:
    "Estimate the cost of AI image generation across GPT Image and Google Imagen tiers. Enter images per request and requests per day to see your monthly spend.",
};

const faqs = [
  {
    q: "How is OpenAI's image generation actually billed?",
    a: "OpenAI bills image output by token, not by a flat per-image price — image quality and resolution determine how many output tokens a generated image consumes. This calculator converts that into an estimated per-image price using typical token counts for each quality tier.",
  },
  {
    q: "Why does image quality change the price so much?",
    a: "Higher quality tiers produce more detailed images using significantly more output tokens — moving from low to high quality can cost 10-20x more per image.",
  },
  {
    q: "Is Google Imagen priced the same way?",
    a: "No — Google prices Imagen models at a flat rate per image (e.g. Imagen 4 Standard at $0.04/image), regardless of prompt complexity, which makes Imagen pricing more predictable at scale.",
  },
  {
    q: "Does this include image editing or variation requests?",
    a: "No — this estimates text-to-image generation cost only. Editing an existing image typically also consumes input image tokens in addition to output tokens.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="AI Image Generation Cost Calculator"
      intro="Estimate what it costs to generate images at scale across OpenAI's GPT Image models and Google's Imagen tiers."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("AI Image Generation Cost Calculator", faqs)}
      methodology={
        <p className="text-muted">
          cost = images per request × price per image × requests per day ×
          30. OpenAI prices are estimated from published per-token image
          output rates using typical tokens-per-image counts; Google Imagen
          prices are flat per-image rates from provider pricing trackers.
        </p>
      }
    >
      <ImageCostClient />
    </CalcPage>
  );
}
