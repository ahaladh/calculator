export interface GpuOption {
  id: string;
  gpu: string;
  provider: string;
  pricePerHour: number;
  note?: string;
}

/**
 * Representative on-demand hourly rates gathered from provider pricing
 * pages and cloud GPU rate trackers as of 2026-09-01. Spot/marketplace
 * rates can run significantly lower; check the provider directly.
 */
export const GPU_OPTIONS: GpuOption[] = [
  { id: "h100-sxm-runpod", gpu: "H100 SXM 80GB", provider: "RunPod", pricePerHour: 2.69 },
  { id: "h100-pcie-runpod", gpu: "H100 PCIe 80GB", provider: "RunPod", pricePerHour: 1.99 },
  { id: "h100-lambda", gpu: "H100 SXM 80GB", provider: "Lambda", pricePerHour: 3.99 },
  { id: "h100-coreweave", gpu: "H100 PCIe 80GB", provider: "CoreWeave", pricePerHour: 4.25 },
  { id: "h100-hyperscaler", gpu: "H100 80GB", provider: "AWS/Azure/GCP (on-demand)", pricePerHour: 6.98 },
  { id: "h100-vastai", gpu: "H100 80GB", provider: "Vast.ai (marketplace, from)", pricePerHour: 1.49 },
  { id: "a100-typical", gpu: "A100 80GB", provider: "Typical on-demand", pricePerHour: 2.21 },
  { id: "b200-spot", gpu: "B200", provider: "Spot / discounted", pricePerHour: 2.12 },
  { id: "b200-capacity-block", gpu: "B200", provider: "AWS Capacity Block", pricePerHour: 9.36 },
];

export function getGpuOption(id: string): GpuOption | undefined {
  return GPU_OPTIONS.find((g) => g.id === id);
}
