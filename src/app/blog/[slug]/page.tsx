import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: ["/opengraph-image"],
    },
    twitter: {
      title: post.title,
      description: post.description,
      images: ["/twitter-image"],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "World of the Developers" },
    publisher: { "@type": "Organization", name: "World of the Developers" },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/blog"
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
        All guides
      </Link>

      <header className="flex flex-col gap-3">
        <span className="w-fit rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
          {post.category}
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
        <p className="text-sm text-muted">
          {formatDate(post.date)} · {post.readingTime}
        </p>
      </header>

      <article className="flex flex-col gap-8">
        {post.sections.map((section, i) => (
          <section key={i} className="flex flex-col gap-3">
            {section.heading && (
              <h2 className="text-xl font-semibold tracking-tight">{section.heading}</h2>
            )}
            {section.paragraphs.map((p, j) => (
              <p key={j} className="leading-relaxed text-foreground/90">
                {p}
              </p>
            ))}
            {section.list && (
              <ul className="flex flex-col gap-2 pl-5 text-foreground/90">
                {section.list.map((item, k) => (
                  <li key={k} className="list-disc leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>

      {post.relatedCalculator && (
        <Link
          href={`/${post.relatedCalculator.slug}`}
          className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-surface p-5 transition-all hover:border-accent hover:shadow-md"
        >
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Try the calculator
            </p>
            <p className="font-semibold group-hover:text-accent">
              {post.relatedCalculator.label}
            </p>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
}
