import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { CALCULATOR_SECTIONS } from "@/lib/calculator-registry";

const title = "About & Contact";
const description = "Learn what World of the Developers builds, how the calculators are made, and get in touch with questions or feedback.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
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
        Home
      </Link>

      <section id="about" className="flex scroll-mt-20 flex-col gap-4">
        <h1 className="font-serif text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
          About World of the Developers
        </h1>
        <p className="max-w-2xl text-muted">
          World of the Developers builds custom IT tooling — single-page
          websites, WHMCS modules, and hosting panel plugins — and
          maintains a free collection of {totalCalculators} calculators for
          finance, health, and AI costs on the side.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="font-semibold">Built to your workflow</h2>
            <p className="mt-1 text-sm text-muted">
              Every project is scoped to what you actually need — no
              generic templates or bloated agency retainers.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="font-semibold">Checked against benchmarks</h2>
            <p className="mt-1 text-sm text-muted">
              Calculator formulas are verified against known worked
              examples and official pricing sources — not just implemented
              and assumed correct.
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
          <h2 className="font-serif text-2xl font-normal tracking-tight text-foreground">Contact</h2>
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
