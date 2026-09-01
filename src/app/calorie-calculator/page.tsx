import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { CalorieClient } from "@/components/calculators/calorie-client";

const title = "Calorie Calculator — Daily Calorie Needs (BMR & TDEE)";
const description = "Calculate your daily calorie needs using the Mifflin-St Jeor equation. See your BMR, maintenance calories, and targets for weight loss or gain.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "What's the difference between BMR and TDEE?",
    a: "BMR (Basal Metabolic Rate) is the energy your body burns at complete rest just to stay alive. TDEE (Total Daily Energy Expenditure, shown here as 'maintenance calories') adds your activity level on top of BMR — it's the number that reflects how much you actually burn in a day.",
  },
  {
    q: "How many calories should I eat to lose weight?",
    a: "A deficit of about 500 calories/day below maintenance produces roughly 1 lb (0.45 kg) of weight loss per week, since 1 lb of body fat is roughly 3,500 calories — this calculator's 'weight loss' target uses that standard estimate.",
  },
  {
    q: "Why does activity level change the result so much?",
    a: "Activity level is a multiplier on your BMR, and the gap between sedentary (1.2×) and very active (1.9×) is large — be honest about your actual weekly exercise, since overestimating activity is one of the most common reasons calorie targets end up wrong.",
  },
  {
    q: "Is this calculator accurate for everyone?",
    a: "The Mifflin-St Jeor equation is validated for most healthy adults, but individual metabolism varies with muscle mass, genetics, and health conditions — treat the result as a starting point to adjust from based on your actual results over a few weeks, not a fixed target.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="Calorie Calculator"
      intro="Calculate your daily calorie needs — BMR, maintenance calories, and targets for weight loss or gain."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("Calorie Calculator", faqs)}
      methodology={
        <p className="text-muted">
          BMR (Mifflin-St Jeor): men = 10×weight(kg) + 6.25×height(cm) −
          5×age + 5; women = 10×weight(kg) + 6.25×height(cm) − 5×age − 161.
          Maintenance calories = BMR × activity multiplier.
        </p>
      }
    >
      <CalorieClient />
    </CalcPage>
  );
}
