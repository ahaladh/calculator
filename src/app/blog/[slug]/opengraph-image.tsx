import type { ReactNode } from "react";
import { ImageResponse } from "next/og";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

const CATEGORY_ART: Record<string, { bg: string; iconBg: string; path: ReactNode }> = {
  Finance: {
    bg: "#065f46",
    iconBg: "#059669",
    path: (
      <g>
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </g>
    ),
  },
  Health: {
    bg: "#9f1239",
    iconBg: "#e11d48",
    path: (
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    ),
  },
  AI: {
    bg: "#3730a3",
    iconBg: "#4f46e5",
    path: (
      <g>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="15" x2="23" y2="15" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="15" x2="4" y2="15" />
      </g>
    ),
  },
  "Web Development": {
    bg: "#155e75",
    iconBg: "#0891b2",
    path: (
      <g>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <line x1="2" y1="9" x2="22" y2="9" />
        <line x1="6" y1="6.5" x2="6.01" y2="6.5" />
      </g>
    ),
  },
};

const DEFAULT_ART = { bg: "#1e293b", iconBg: "#475569", path: null };

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const art = (post && CATEGORY_ART[post.category]) || DEFAULT_ART;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: art.bg,
          fontFamily: "sans-serif",
          padding: 64,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              backgroundColor: art.iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {art.path}
            </svg>
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: "rgba(255,255,255,0.8)",
              textTransform: "uppercase",
              letterSpacing: 4,
            }}
          >
            {post?.category ?? "Blog"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.15,
            maxWidth: 1000,
          }}
        >
          {post?.title ?? "World of the Developers Blog"}
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.65)" }}>
          World of the Developers · Blog
        </div>
      </div>
    ),
    { ...size },
  );
}
