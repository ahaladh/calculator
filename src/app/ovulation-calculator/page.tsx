import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { OvulationClient } from "@/components/calculators/ovulation-client";

const title = "Ovulation Calculator — Estimate Your Fertile Window";
const description = "Estimate your ovulation date and fertile window based on your last period and average cycle length. A statistical estimate — not a diagnosis or contraception method.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ovulation-calculator" },
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "How is ovulation date estimated?",
    a: "Ovulation is estimated to occur a fixed number of days (the luteal phase, typically ~14 days) before your next expected period — this offset is more consistent than the time from period start to ovulation, which varies with cycle length.",
  },
  {
    q: "What is the fertile window?",
    a: "The days in a cycle when conception is possible — sperm can survive in the reproductive tract for up to 5 days, and the egg is viable for about 24 hours after ovulation, giving a window of roughly 6 days ending the day after estimated ovulation.",
  },
  {
    q: "How accurate is this estimate?",
    a: "It's a statistical estimate based on average cycle patterns, not a measurement of your actual ovulation — actual timing varies cycle to cycle, especially with irregular cycles, stress, illness, or travel. Ovulation predictor kits or tracking basal body temperature give more direct signals.",
  },
  {
    q: "Can I use this for contraception?",
    a: "No — this calculator is not a reliable method of contraception. Cycle-based estimates can be wrong in either direction, and unprotected sex outside the calculated window can still result in pregnancy. Talk to a healthcare provider about reliable contraception options.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="Ovulation Calculator"
      intro="Estimate your ovulation date and fertile window based on your last period and cycle length."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("Ovulation Calculator", faqs)}
      methodology={
        <p className="text-muted">
          Ovulation date = last period start + (cycle length − luteal phase
          length). Fertile window = 5 days before ovulation through 1 day
          after. Next period = last period start + cycle length.
        </p>
      }
    >
      <OvulationClient />
    </CalcPage>
  );
}
