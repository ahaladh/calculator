import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { EmiClient } from "@/components/calculators/emi-client";

const title = "EMI Calculator — Calculate Loan EMI Online";
const description = "Calculate your Equated Monthly Installment (EMI) for any loan — home, car, or personal. See total interest, total payment, and how EMI changes by tenure.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/emi-calculator" },
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "What is EMI?",
    a: "EMI (Equated Monthly Installment) is the fixed monthly payment you make to repay a loan — a mix of principal and interest — until the loan is fully paid off over its tenure.",
  },
  {
    q: "Does a longer tenure always cost more?",
    a: "A longer tenure lowers your monthly EMI but increases the total interest paid over the life of the loan, since you're borrowing the money for longer. Compare tenures in the table to see the trade-off.",
  },
  {
    q: "How does the interest rate affect my EMI?",
    a: "EMI is highly sensitive to rate — even a 0.5% change on a large, long-tenure loan can shift the monthly payment noticeably. Always use your bank's actual sanctioned rate, not just the advertised starting rate.",
  },
  {
    q: "Can I reduce my total interest without changing the EMI?",
    a: "Yes — making occasional lump-sum prepayments toward the principal reduces the outstanding balance, which cuts total interest even if your regular EMI stays the same.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="EMI Calculator"
      intro="Calculate your monthly loan EMI, total interest, and total repayment — for home, car, or personal loans."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("EMI Calculator", faqs)}
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
