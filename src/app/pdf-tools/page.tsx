import type { Metadata } from "next";
import Link from "next/link";
import { CategoryIcon, CATEGORY_STYLES } from "@/components/category-icon";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { PDF_TOOLS, PDF_TOOLS_URL } from "@/lib/pdf-tools";

const title = "PDF Tools — Merge, Split, Compress, Edit & Sign PDFs";
const description =
  "A self-hosted PDF toolkit: merge, split, compress, convert, edit, fill forms, sign, redact, and protect PDF files, with original uploads deleted after processing.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pdf-tools" },
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const NOTES = [
  "Files you upload are deleted right after processing, and download links are private and expire after a short time.",
  "Viewing a PDF happens entirely in your browser — nothing is uploaded.",
  "Signing adds a visual signature, not a certificate-based digital signature.",
  "Converting PDFs to Word, Excel, and PowerPoint is approximate; complex layouts will not match exactly.",
];

export default function PdfToolsPage() {
  const style = CATEGORY_STYLES.company;

  return (
    <div className="flex flex-col">
      <div className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 90% at 15% 0%, var(--color-accent) 0%, transparent 60%)",
            opacity: 0.08,
          }}
        />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-20 sm:px-6">
          <span className="w-fit rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
            {PDF_TOOLS_URL ? "PDF toolkit" : "PDF toolkit · launching soon"}
          </span>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Everything you need to work with PDFs.
          </h1>
          <p className="max-w-xl text-lg text-muted">
            Merge, split, compress, convert, edit, fill, sign, redact, and protect PDF files from
            one place.
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            {PDF_TOOLS_URL ? (
              <a
                href={PDF_TOOLS_URL}
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                Open PDF Tools
              </a>
            ) : (
              <Link
                href="/contact#contact"
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                Ask about early access
              </Link>
            )}
            <Link
              href="/calculators"
              className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Free calculators
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 py-16 sm:px-6">
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold tracking-tight">What it can do</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PDF_TOOLS.map((tool, i) => (
              <RevealOnScroll key={tool.title} style={{ transitionDelay: `${(i % 6) * 60}ms` }}>
                <div className="flex h-full flex-col gap-3 rounded-xl border border-border bg-surface p-5">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${style.badge}`}
                  >
                    <CategoryIcon slug="company" className={`h-4 w-4 ${style.text}`} />
                  </span>
                  <h3 className="font-semibold">{tool.title}</h3>
                  <p className="text-sm text-muted">{tool.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Good to know</h2>
          <ul className="flex max-w-2xl flex-col gap-2 pl-5 text-muted">
            {NOTES.map((note) => (
              <li key={note} className="list-disc leading-relaxed">
                {note}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold tracking-tight">Want this on your own domain?</h2>
            <p className="max-w-xl text-muted">
              The toolkit is self-hostable and its branding is configurable. We can set it up and
              run it for you.
            </p>
          </div>
          <Link
            href="/contact#contact"
            className="shrink-0 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Get in touch
          </Link>
        </section>
      </div>
    </div>
  );
}
