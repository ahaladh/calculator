import { CategoryIcon } from "@/components/category-icon";

export interface FloatingCard {
  slug: string;
  label: string;
  badge: string;
  text: string;
  top: string;
  left: string;
  delay: string;
  duration: string;
  rotate: string;
}

const CALCULATOR_CARDS: FloatingCard[] = [
  {
    slug: "finance",
    label: "EMI Calculator",
    badge: "bg-emerald-500/15",
    text: "text-emerald-600 dark:text-emerald-400",
    top: "6%",
    left: "8%",
    delay: "0s",
    duration: "5.5s",
    rotate: "-6deg",
  },
  {
    slug: "health",
    label: "BMI Calculator",
    badge: "bg-rose-500/15",
    text: "text-rose-600 dark:text-rose-400",
    top: "52%",
    left: "0%",
    delay: "1.1s",
    duration: "6.5s",
    rotate: "4deg",
  },
  {
    slug: "ai-model-cost",
    label: "AI Token Cost",
    badge: "bg-indigo-500/15",
    text: "text-indigo-600 dark:text-indigo-400",
    top: "0%",
    left: "58%",
    delay: "0.5s",
    duration: "6s",
    rotate: "5deg",
  },
  {
    slug: "ai-infrastructure",
    label: "GPU Cost",
    badge: "bg-sky-500/15",
    text: "text-sky-600 dark:text-sky-400",
    top: "38%",
    left: "72%",
    delay: "1.6s",
    duration: "5s",
    rotate: "-4deg",
  },
  {
    slug: "ai-business",
    label: "AI ROI",
    badge: "bg-amber-500/15",
    text: "text-amber-600 dark:text-amber-400",
    top: "70%",
    left: "46%",
    delay: "0.8s",
    duration: "7s",
    rotate: "3deg",
  },
];

export function FloatingCardsVisual({ cards }: { cards: FloatingCard[] }) {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto h-72 w-full max-w-md sm:h-80 lg:mx-0 lg:h-96 lg:max-w-none"
    >
      <div
        className="animate-blob absolute left-[10%] top-[10%] h-40 w-40 rounded-full bg-indigo-400/30 blur-3xl"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="animate-blob absolute right-[8%] top-[20%] h-44 w-44 rounded-full bg-emerald-400/25 blur-3xl"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="animate-blob absolute bottom-[6%] left-[30%] h-36 w-36 rounded-full bg-rose-400/25 blur-3xl"
        style={{ animationDelay: "6s" }}
      />

      {cards.map((card) => (
        <div
          key={card.slug}
          className="animate-icon-float absolute flex items-center gap-2 rounded-xl border border-border bg-background/90 px-3 py-2.5 shadow-lg backdrop-blur-sm"
          style={{
            top: card.top,
            left: card.left,
            animationDelay: card.delay,
            animationDuration: card.duration,
            transform: `rotate(${card.rotate})`,
          }}
        >
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${card.badge}`}
          >
            <CategoryIcon slug={card.slug} className={`h-4 w-4 ${card.text}`} />
          </span>
          <span className="whitespace-nowrap text-xs font-semibold text-foreground">
            {card.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function HeroVisual() {
  return <FloatingCardsVisual cards={CALCULATOR_CARDS} />;
}
