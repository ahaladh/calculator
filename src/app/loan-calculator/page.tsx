import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { EmiClient } from "@/components/calculators/emi-client";

const title = "Loan Calculator — Compare EMI & Total Interest by Tenure";
const description = "Calculate loan EMI and compare total interest cost across different tenures. Free loan calculator for home, personal, car, and education loans.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/loan-calculator" },
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "How do I choose the right loan tenure?",
    a: "Balance affordability against total cost: a shorter tenure means a higher EMI but far less total interest, while a longer tenure eases monthly cash flow at a real long-term cost. Use the comparison table to see both sides for your exact loan amount.",
  },
  {
    q: "What's a healthy EMI-to-income ratio?",
    a: "Most lenders and financial planners suggest keeping total EMI obligations under 40% of your monthly take-home income, to leave room for other expenses and savings.",
  },
  {
    q: "Does the loan type change how EMI is calculated?",
    a: "No — the EMI formula is the same for home, car, personal, and education loans. What differs is the typical interest rate and tenure range each loan type carries.",
  },
  {
    q: "Should I prepay my loan or invest the extra money instead?",
    a: "Compare your loan's interest rate to the return you'd reasonably expect from investing — prepaying is usually the better move when your loan rate exceeds your expected investment return, especially for high-interest personal loans.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="Loan Calculator"
      intro="Calculate EMI for any loan and compare total interest cost across different repayment tenures."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("Loan Calculator", faqs)}
      methodology={
        <p className="text-muted">
          EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ − 1), where P is the loan amount, r
          is the monthly interest rate (annual rate ÷ 12), and n is the
          number of monthly installments (years × 12).
        </p>
      }
    >
      <EmiClient />
    </CalcPage>
  );
}
