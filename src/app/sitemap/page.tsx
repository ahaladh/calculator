import type { Metadata } from "next";
import Link from "next/link";
import { CALCULATOR_SECTIONS } from "@/lib/calculator-registry";
import { BLOG_POSTS } from "@/lib/blog";
import { CategoryIcon, CATEGORY_STYLES } from "@/components/category-icon";

const title = "Sitemap";
const description = "Every page on World of the Developers, in one place.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sitemap" },
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

const SITE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/calculators", label: "Calculators" },
  { href: "/blog", label: "Blog" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact#about", label: "About" },
  { href: "/contact#contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export default function SitemapPage() {
  const companyStyle = CATEGORY_STYLES.company;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-12 sm:px-6">
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

      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Sitemap</h1>
        <p className="max-w-2xl text-muted">
          Every page on World of the Developers. Looking for machine-readable
          version? See{" "}
          <a href="/sitemap.xml" className="text-accent hover:underline">
            sitemap.xml
          </a>
          .
        </p>
      </header>

      <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-md ${companyStyle?.badge ?? "bg-accent/10"}`}
            >
              <CategoryIcon
                slug="company"
                className={`h-3.5 w-3.5 ${companyStyle?.text ?? "text-accent"}`}
              />
            </span>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Site
            </h2>
          </div>
          <ul className="flex flex-col gap-2.5">
            {SITE_LINKS.map((link) => (
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

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-md ${CATEGORY_STYLES.finance?.badge ?? "bg-accent/10"}`}
            >
              <CategoryIcon
                slug="finance"
                className={`h-3.5 w-3.5 ${CATEGORY_STYLES.finance?.text ?? "text-accent"}`}
              />
            </span>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Blog
            </h2>
          </div>
          <ul className="flex flex-col gap-2.5">
            {BLOG_POSTS.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {CALCULATOR_SECTIONS.map((section) => {
          const style = CATEGORY_STYLES[section.slug];
          return (
            <div key={section.slug} className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-md ${style?.badge ?? "bg-accent/10"}`}
                >
                  <CategoryIcon
                    slug={section.slug}
                    className={`h-3.5 w-3.5 ${style?.text ?? "text-accent"}`}
                  />
                </span>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  {section.category}
                </h2>
              </div>
              <ul className="flex flex-col gap-2.5">
                {section.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/${item.slug}`}
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
