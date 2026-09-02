import type { ReactNode } from "react";

const PATHS: Record<string, ReactNode> = {
  finance: (
    <>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </>
  ),
  health: (
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  ),
  "ai-model-cost": (
    <>
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
    </>
  ),
  "tokens-context": (
    <>
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="4" y1="15" x2="20" y2="15" />
      <line x1="10" y1="3" x2="8" y2="21" />
      <line x1="16" y1="3" x2="14" y2="21" />
    </>
  ),
  "ai-infrastructure": (
    <>
      <rect x="2" y="3" width="20" height="6" rx="1.5" />
      <rect x="2" y="15" width="20" height="6" rx="1.5" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </>
  ),
  "ai-business": (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  company: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </>
  ),
  "web-development": (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <line x1="2" y1="9" x2="22" y2="9" />
      <line x1="6" y1="6.5" x2="6.01" y2="6.5" />
    </>
  ),
  "whmcs-module": (
    <>
      <path d="M21 8l-9-5-9 5 9 5 9-5z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <line x1="12" y1="13" x2="12" y2="21" />
    </>
  ),
  "whmcs-theming": (
    <>
      <path d="M12 2a10 10 0 1 0 8.5 15.3c.6-1 .3-2.3-.8-2.8-1-.5-2.2-.1-2.7.9a2 2 0 0 1-3.7-1c0-1.1.9-2 2-2h2.2c1.7 0 3-1.3 3-3A10 10 0 0 0 12 2z" />
      <line x1="7" y1="9" x2="7.01" y2="9" />
      <line x1="10.5" y1="6.5" x2="10.51" y2="6.5" />
      <line x1="15" y1="7" x2="15.01" y2="7" />
    </>
  ),
  "hosting-plugin": (
    <>
      <path d="M9 2v6" />
      <path d="M15 2v6" />
      <path d="M6 8h12v3a6 6 0 0 1-12 0V8z" />
      <path d="M12 17v5" />
    </>
  ),
  "billing-automation": <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  "domain-ssl-tooling": (
    <>
      <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
};

// One restrained ink treatment for every category — an editorial catalog
// reads calmer differentiated by label, not by a different color per icon.
const NEUTRAL_STYLE = { badge: "bg-foreground/[0.05]", text: "text-foreground" };

export const CATEGORY_STYLES: Record<string, { badge: string; text: string }> = {
  finance: NEUTRAL_STYLE,
  health: NEUTRAL_STYLE,
  "ai-model-cost": NEUTRAL_STYLE,
  "tokens-context": NEUTRAL_STYLE,
  "ai-infrastructure": NEUTRAL_STYLE,
  "ai-business": NEUTRAL_STYLE,
  company: NEUTRAL_STYLE,
  "web-development": NEUTRAL_STYLE,
  "whmcs-module": NEUTRAL_STYLE,
  "whmcs-theming": NEUTRAL_STYLE,
  "hosting-plugin": NEUTRAL_STYLE,
  "billing-automation": NEUTRAL_STYLE,
  "domain-ssl-tooling": NEUTRAL_STYLE,
};

export function CategoryIcon({ slug, className }: { slug: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {PATHS[slug] ?? <circle cx="12" cy="12" r="9" />}
    </svg>
  );
}
