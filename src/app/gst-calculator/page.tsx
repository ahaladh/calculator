import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { GstClient } from "@/components/calculators/gst-client";

const title = "GST Calculator — Add or Remove GST (India, GST 2.0 Rates)";
const description = "Calculate GST (Goods and Services Tax) on any amount — add GST to a base price or extract it from a GST-inclusive total, using the current GST 2.0 rate slabs.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/gst-calculator" },
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "What are the current GST rate slabs?",
    a: "Following the GST 2.0 rate rationalization effective 22 September 2025, India's GST structure was simplified to primarily 5% and 18%, with 0% for exempt essentials and a 40% slab for select luxury and sin goods — replacing the earlier 5/12/18/28% four-slab system.",
  },
  {
    q: "What's the difference between 'Add GST' and 'Remove GST'?",
    a: "Add GST calculates the tax on top of a known base price (useful for invoicing). Remove GST does the reverse — extracting the base price and tax amount from a total that already includes GST (useful when you only know the final price you paid).",
  },
  {
    q: "Why isn't my item's GST rate listed here?",
    a: "GST rates are assigned per item/service category by the GST Council, not a single universal rate — use the custom rate field if your specific item falls outside the standard 0/5/18/40% slabs.",
  },
  {
    q: "Is GST charged on the entire supply chain?",
    a: "Yes — GST applies at each stage of the supply chain, but businesses can claim input tax credit for GST already paid on their purchases, so only the value added at each stage is effectively taxed.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="GST Calculator"
      intro="Add GST to a base price, or extract the base price and tax from a GST-inclusive total — using the current GST 2.0 rates."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("GST Calculator", faqs)}
      methodology={
        <p className="text-muted">
          Add GST: total = base × (1 + rate). Remove GST: base = total ÷ (1
          + rate). GST amount is the difference between total and base in
          both directions.
        </p>
      }
    >
      <GstClient />
    </CalcPage>
  );
}
