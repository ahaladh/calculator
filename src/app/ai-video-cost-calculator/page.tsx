import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { VideoCostClient } from "@/components/calculators/media-cost-client";

const title = "AI Video Generation Cost Calculator — Sora & Veo Pricing";
const description = "Estimate the cost of AI video generation across OpenAI Sora and Google Veo tiers. Enter seconds per video and videos per day to see your monthly spend.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ai-video-cost-calculator" },
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "How is AI video generation priced?",
    a: "Both OpenAI's Sora and Google's Veo bill per second of generated video, with the rate varying by model tier and resolution — higher resolution and higher-quality tiers cost more per second.",
  },
  {
    q: "Am I charged for failed generations?",
    a: "No — both OpenAI and Google only charge for successfully generated videos, so a failed or rejected generation shouldn't appear on your bill.",
  },
  {
    q: "What's the cheapest way to generate video at scale?",
    a: "Lower-tier, lower-resolution models — Veo 3.1 Lite at 720p or Sora 2 at 720p — cost the least per second. Reserve higher tiers for final output rather than iteration.",
  },
  {
    q: "Does a longer video cost proportionally more?",
    a: "Yes — cost scales linearly with duration in seconds, so a 16-second video costs roughly twice as much as an 8-second video at the same tier.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="AI Video Generation Cost Calculator"
      intro="Estimate what it costs to generate video at scale across OpenAI Sora and Google Veo tiers."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("AI Video Generation Cost Calculator", faqs)}
      methodology={
        <p className="text-muted">
          cost = seconds per video × price per second × videos per day × 30.
          Rates are sourced directly from OpenAI&apos;s and Google&apos;s own
          published pricing pages.
        </p>
      }
    >
      <VideoCostClient />
    </CalcPage>
  );
}
