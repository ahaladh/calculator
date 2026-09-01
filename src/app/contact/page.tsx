import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { CALCULATOR_SECTIONS } from "@/lib/calculator-registry";

export const metadata: Metadata = {
  title: "About & Contact",
  description:
    "Learn what Calculator Hub is, how its calculators are built, and get in touch with questions or feedback.",
};

const totalCalculators = CALCULATOR_SECTIONS.reduce(
  (sum, section) => sum + section.items.length,
  0,
);

export default function ContactPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 py-12 sm:px-6">
      <Link
        href="/"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        All calculators
      </Link>

      <section id="about" className="flex scroll-mt-20 flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          About Calculator Hub
        </h1>
        <p className="max-w-2xl text-muted">
          Calculator Hub is a free collection of {totalCalculators}{" "}
          calculators spanning finance, health, and AI costs — built to be
          fast, precise, and usable without an account.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="font-semibold">Precise by default</h2>
            <p className="mt-1 text-sm text-muted">
              Every financial calculation runs on arbitrary-precision
              decimal math, not raw floating point — no rounding surprises
              on large numbers.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="font-semibold">Checked against benchmarks</h2>
            <p className="mt-1 text-sm text-muted">
              Formulas are verified against known worked examples and
              official pricing sources — not just implemented and assumed
              correct.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="font-semibold">No sign-up, no tracking walls</h2>
            <p className="mt-1 text-sm text-muted">
              Every calculator runs entirely in your browser. Nothing you
              enter is sent anywhere unless you use the contact form below.
            </p>
          </div>
        </div>
        <p className="max-w-2xl text-sm text-muted">
          Calculators here are informational tools, not professional
          advice — see each calculator&apos;s page for specifics, and the
          site-wide disclaimer in the footer.
        </p>
      </section>

      <section id="contact" className="flex scroll-mt-20 flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
          <p className="max-w-2xl text-muted">
            Found a bug, have a calculator request, or spotted a pricing
            figure that&apos;s gone stale? Send a message below.
          </p>
        </div>
        <div className="max-w-lg rounded-xl border border-border bg-surface p-6">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
