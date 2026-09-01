import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { SalaryInClient } from "@/components/calculators/salary-in-client";

const title = "Salary Calculator — CTC to In-Hand Salary (India)";
const description = "Convert your CTC to monthly in-hand salary. See the breakdown of basic pay, PF deductions, professional tax, and income tax under India's new or old tax regime.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "Why is my in-hand salary lower than my CTC divided by 12?",
    a: "CTC includes employer PF contribution, which never reaches your bank account — and your gross salary is further reduced by your own PF contribution, professional tax, and income tax before you see your take-home pay.",
  },
  {
    q: "What is Employer PF, and why does it reduce my gross salary?",
    a: "Employer PF is a retirement contribution your company makes on your behalf, calculated as a percentage of basic pay — it's part of your CTC (Cost to Company) but isn't part of your gross salary, since it goes straight into your PF account, not your paycheck.",
  },
  {
    q: "Why does basic salary percentage matter?",
    a: "A higher basic percentage increases your PF contribution (both yours and your employer's) and often your HRA, which changes your take-home pay and tax exemptions — companies structure this differently, so check your actual offer letter for the real breakdown.",
  },
  {
    q: "Is this an exact calculation of my payslip?",
    a: "No — this is a simplified model. Real payslips vary by employer (gratuity, insurance premiums, meal allowances, and bonus structuring all differ), so treat this as a directional estimate rather than your exact take-home figure.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="Salary Calculator"
      intro="Convert your CTC to monthly in-hand salary, with a full breakdown of PF, professional tax, and income tax."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("Salary Calculator India", faqs)}
      methodology={
        <p className="text-muted">
          Gross salary = CTC − Employer PF. In-hand = Gross salary −
          Employee PF − professional tax − income tax (computed on gross
          salary under your chosen regime).
        </p>
      }
    >
      <SalaryInClient />
    </CalcPage>
  );
}
