import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";
import { CategoryIcon, CATEGORY_STYLES } from "@/components/category-icon";
import { RevealOnScroll } from "@/components/reveal-on-scroll";

const CATEGORY_ICON: Record<string, string> = {
  Finance: "finance",
  Health: "health",
  AI: "ai-model-cost",
  "Web Development": "web-development",
};

const title = "Blog — Finance, Health & AI Cost Guides";
const description =
  "Practical guides on loan math, investing, health metrics, AI API pricing, and WHMCS development — from the team behind the free calculators.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { title, description, images: ["/twitter-image"] },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

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
            {posts.length} guides
          </span>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Guides on the numbers behind your decisions.
          </h1>
          <p className="max-w-xl text-lg text-muted">
            How loan EMIs, investments, BMI, and AI API costs are actually
            calculated — and where the shortcuts and formulas fall short.
          </p>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 py-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => {
            const iconSlug = CATEGORY_ICON[post.category] ?? "company";
            const style = CATEGORY_STYLES[iconSlug];
            return (
              <RevealOnScroll key={post.slug} style={{ transitionDelay: `${i * 60}ms` }}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${style?.badge ?? "bg-accent/10"}`}
                    >
                      <CategoryIcon
                        slug={iconSlug}
                        className={`h-4 w-4 ${style?.text ?? "text-accent"}`}
                      />
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wide text-muted">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold leading-snug group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="flex-1 text-sm text-muted">{post.description}</p>
                  <p className="text-xs text-muted">
                    {formatDate(post.date)} · {post.readingTime}
                  </p>
                </Link>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </div>
  );
}
