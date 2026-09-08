import Link from "next/link";

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Calculators", href: "/calculators" },
  { label: "Portfolio", href: "/portfolio" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <svg
              width="18"
              height="18"
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
          <span className="text-base font-semibold tracking-tight text-foreground">
            World of the Developers
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/calculators"
            className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent lg:hidden"
          >
            Calculators
          </Link>
          <Link
            href="/contact#contact"
            className="group flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            Contact
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
