import type { Metadata } from "next";
import { CalcPage, buildCalcJsonLd } from "@/components/calculators/calc-page";
import { SipClient } from "@/components/calculators/sip-client";

export const metadata: Metadata = {
  title: "SIP Calculator — Calculate Mutual Fund SIP Returns",
  description:
    "Calculate the maturity value of your SIP (Systematic Investment Plan). Enter monthly investment, expected return, and duration to see invested amount vs. wealth gained.",
};

const faqs = [
  {
    q: "What is a SIP?",
    a: "A Systematic Investment Plan (SIP) lets you invest a fixed amount into a mutual fund every month, rather than a lump sum — buying more units when prices are low and fewer when high, which averages out your purchase cost over time.",
  },
  {
    q: "What return rate should I assume?",
    a: "This calculator uses a fixed assumed annual return — actual mutual fund returns vary year to year and aren't guaranteed. Equity mutual funds have historically returned roughly 10-14% annually over long periods in India, but past performance doesn't guarantee future results.",
  },
  {
    q: "Why does a longer SIP duration matter so much?",
    a: "Compounding needs time to work — the same monthly amount invested for 20 years instead of 10 doesn't just double the maturity value, it multiplies it several times over, because each year's returns start earning returns of their own.",
  },
  {
    q: "Is a SIP the same as a fixed deposit?",
    a: "No — an FD offers a guaranteed, fixed return, while a SIP invests in market-linked mutual funds whose value can rise or fall. SIPs typically offer higher long-term return potential in exchange for that variability.",
  },
];

export default function Page() {
  return (
    <CalcPage
      h1="SIP Calculator"
      intro="Calculate the maturity value of your monthly SIP investment, and see how much of it is your own money versus market returns."
      faqs={faqs}
      jsonLd={buildCalcJsonLd("SIP Calculator", faqs)}
      methodology={
        <p className="text-muted">
          Maturity value = P × [(1+r)ⁿ − 1] / r × (1+r), where P is the
          monthly investment, r is the monthly return rate (annual return ÷
          12), and n is the number of months invested.
        </p>
      }
    >
      <SipClient />
    </CalcPage>
  );
}
