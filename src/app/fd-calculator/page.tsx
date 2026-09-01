import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { FdClient } from "@/components/calculators/fd-client";

const title = "FD Calculator — Fixed Deposit Maturity Calculator";
const description = "Calculate your Fixed Deposit maturity value and interest earned, with quarterly compounding — the standard structure used by Indian banks.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const faqs = [
  {
    q: "How is FD interest compounded?",
    a: "Most Indian banks compound FD interest quarterly, even when they quote an annual rate — this calculator uses quarterly compounding by default, which is why the effective return is slightly higher than the stated rate.",
  },
  {
    q: "Is FD interest taxable?",
    a: "Yes — FD interest is added to your total income and taxed at your income tax slab rate. Banks deduct TDS (10%, or 20% without PAN) if annual interest exceeds ₹40,000 (₹50,000 for senior citizens), but you still owe tax at your actual slab rate.",
  },
  {
    q: "What's the difference between cumulative and non-cumulative FDs?",
    a: "A cumulative FD reinvests interest and pays it all out at maturity (what this calculator computes) — a non-cumulative FD pays interest out periodically (monthly/quarterly/annually) instead, resulting in a lower total payout since that interest doesn't compound further.",
  },
  {
    q: "Can I withdraw an FD early?",
    a: "Yes, but most banks charge a penalty (typically 0.5-1% lower interest rate) for premature withdrawal, so the actual maturity value would be lower than what this calculator shows for the full tenure.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="FD Calculator"
      intro="Calculate your Fixed Deposit's maturity value and interest earned, with standard quarterly compounding."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("FD Calculator", faqs)}
      methodology={
        <p className="text-muted">
          Maturity = P(1 + r/4)⁴ᵗ, where P is the deposit amount, r is the
          annual interest rate, and t is the tenure in years — quarterly
          compounding, the standard structure most Indian banks use.
        </p>
      }
    >
      <FdClient />
    </CalcPage>
  );
}
