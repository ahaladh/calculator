import Link from "next/link";
import { CALCULATOR_SECTIONS } from "@/lib/calculator-registry";
import { SERVICES } from "@/lib/services";

const COMPANY_LINKS = [
  { label: "About", href: "/contact#about" },
  { label: "Contact", href: "/contact#contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
        {title}
      </h3>
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
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_2fr] lg:gap-16">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <Link href="/" className="w-fit font-serif text-lg tracking-tight text-foreground">
              World of the Developers
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Custom IT development for hosting and web businesses, plus a
              free collection of finance, health, and AI-cost calculators on
              the side.
            </p>
          </div>

          <FooterColumn title="Company" links={COMPANY_LINKS} />
        </div>

        <div className="flex flex-col gap-10 lg:border-l lg:border-border lg:pl-12">
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Services
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 sm:grid-cols-3">
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/#${service.slug}`}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              href="/calculators"
              className="w-fit text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:text-accent"
            >
              Calculators
            </Link>
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
              {CALCULATOR_SECTIONS.map((section) => (
                <FooterColumn
                  key={section.slug}
                  title={section.category}
                  links={section.items.map((item) => ({
                    href: `/${item.slug}`,
                    label: item.title,
                  }))}
                />
              ))}
            </div>
          </div>
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
            <Link href="/sitemap" className="transition-colors hover:text-accent">
              Sitemap
            </Link>
            <Link href="/privacy-policy" className="transition-colors hover:text-accent">
              Privacy Policy
            </Link>
            <span>© {year} World of the Developers</span>
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
