import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { BmiClient } from "@/components/calculators/bmi-client";

const title = "BMI Calculator — Body Mass Index Calculator";
const description =
  "Calculate your Body Mass Index (BMI) in metric or imperial units. See your BMI category and a healthy weight range for your height.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/bmi-calculator" },
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "What is BMI?",
    a: "Body Mass Index is a screening measure that relates your weight to your height (weight ÷ height²), used as a quick, population-level indicator of whether weight falls in a range associated with health risk.",
  },
  {
    q: "What are the BMI categories?",
    a: "Under 18.5 is Underweight, 18.5-24.9 is Normal, 25-29.9 is Overweight, and 30+ is Obese — the WHO's standard adult classification, used by this calculator.",
  },
  {
    q: "Is BMI accurate for everyone?",
    a: "No — BMI doesn't distinguish muscle from fat, so it can misclassify very muscular people as overweight, and it isn't designed for children, pregnant people, or the elderly, whose body composition differs from the general adult population BMI was calibrated on.",
  },
  {
    q: "What should I do if my BMI is outside the normal range?",
    a: "Treat it as a starting point for a conversation, not a diagnosis — a healthcare provider can assess body composition, health markers, and personal risk factors far more accurately than BMI alone.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="BMI Calculator"
      intro="Calculate your Body Mass Index and see where it falls relative to standard weight categories."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("BMI Calculator", faqs)}
      methodology={
        <p className="text-muted">
          BMI = weight(kg) ÷ height(m)². Categories follow the WHO adult
          classification: Underweight &lt;18.5, Normal 18.5-24.9, Overweight
          25-29.9, Obese ≥30.
        </p>
      }
    >
      <BmiClient />
    </CalcPage>
  );
}
