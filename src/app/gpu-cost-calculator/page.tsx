import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { GpuCostClient } from "@/components/calculators/gpu-cost-client";

const title = "GPU Cost Calculator — Cloud H100, A100 & B200 Rental Pricing";
const description = "Calculate the cost of renting cloud GPUs — H100, A100, and B200 — across major providers, based on GPU count and usage hours.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "Why do GPU prices vary so much between providers?",
    a: "Hyperscalers (AWS, Azure, GCP) charge a premium for integrated tooling, SLAs, and enterprise support; specialized GPU clouds (RunPod, Lambda, CoreWeave) and spot marketplaces (Vast.ai) undercut them significantly by focusing purely on compute.",
  },
  {
    q: "Should I rent on-demand or reserve capacity?",
    a: "On-demand is simplest for short or bursty workloads. For sustained, predictable usage over months, reserved or committed-use pricing (often 30-50% cheaper) is usually worth the commitment — check each provider's reserved pricing separately.",
  },
  {
    q: "Is it cheaper to rent a GPU or use a hosted API?",
    a: "For most application workloads, a hosted LLM API (billed per token) is cheaper and far simpler than renting and managing GPUs yourself. Renting GPUs directly makes sense mainly for training, fine-tuning, or workloads with very high, sustained inference volume.",
  },
  {
    q: "Does this include storage, networking, or data transfer costs?",
    a: "No — this estimates GPU compute time only. Storage, egress bandwidth, and orchestration costs are billed separately and vary by provider.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="GPU Cost Calculator"
      intro="Estimate the cost of renting cloud GPUs for training or self-hosted inference."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("GPU Cost Calculator", faqs)}
      methodology={
        <p className="text-muted">
          cost = GPU count × price per GPU-hour × hours per day × days per
          month. Rates are representative on-demand list prices gathered
          from provider pricing pages and GPU rental trackers.
        </p>
      }
    >
      <GpuCostClient />
    </CalcPage>
  );
}
