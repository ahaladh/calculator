import Link from "next/link";
import { CALCULATOR_SECTIONS } from "@/lib/calculator-registry";
import { CategoryIcon, CATEGORY_STYLES } from "@/components/category-icon";

const COMPANY_LINKS = [
  { label: "About", href: "/contact#about" },
  { label: "Contact", href: "/contact#contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

function FooterColumn({
  slug,
  title,
  links,
}: {
  slug: string;
  title: string;
  links: { href: string; label: string }[];
}) {
  const style = CATEGORY_STYLES[slug];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-md ${style?.badge ?? "bg-accent/10"}`}
        >
          <CategoryIcon slug={slug} className={`h-3.5 w-3.5 ${style?.text ?? "text-accent"}`} />
        </span>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
          {title}
        </h3>
      </div>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-accent/15 bg-surface">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_2fr] lg:gap-16">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex w-fit items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="8" y1="6" x2="16" y2="6" />
                  <line x1="8" y1="10" x2="8" y2="10.01" />
                  <line x1="12" y1="10" x2="12" y2="10.01" />
                  <line x1="16" y1="10" x2="16" y2="10.01" />
                  <line x1="8" y1="14" x2="8" y2="14.01" />
                  <line x1="12" y1="14" x2="12" y2="14.01" />
                  <line x1="16" y1="14" x2="16" y2="14.01" />
                  <line x1="8" y1="18" x2="16" y2="18" />
                </svg>
              </span>
              <span className="text-lg font-semibold tracking-tight text-foreground">
                Calculator Hub
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Free, precise calculators for finance, health, and AI costs —
              built with arbitrary-precision math and no sign-up required.
            </p>
          </div>

          <FooterColumn slug="company" title="Company" links={COMPANY_LINKS} />
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:border-l lg:border-border lg:pl-12">
          {CALCULATOR_SECTIONS.map((section) => (
            <FooterColumn
              key={section.slug}
              slug={section.slug}
              title={section.category}
              links={section.items.map((item) => ({
                href: `/${item.slug}`,
                label: item.title,
              }))}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-start sm:justify-between sm:px-6">
          <p className="max-w-2xl text-xs leading-relaxed text-muted">
            All calculators on this site are provided for general
            informational purposes only and don&apos;t constitute
            financial, tax, legal, or medical advice. Verify important
            figures — loan rates, tax rules, AI/cloud pricing, and health
            guidance all change — with an authoritative source or qualified
            professional before acting on them.
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2 whitespace-nowrap text-xs text-muted">
            <Link href="/privacy-policy" className="transition-colors hover:text-accent">
              Privacy Policy
            </Link>
            <span>© {year} Calculator Hub</span>
            <a
              href="#"
              className="flex items-center gap-1 font-medium transition-colors hover:text-accent"
            >
              Back to top
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
