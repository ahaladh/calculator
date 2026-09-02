import { FloatingCardsVisual, type FloatingCard } from "@/components/hero-visual";

const SERVICE_CARDS: FloatingCard[] = [
  {
    slug: "web-development",
    label: "Website Development",
    badge: "bg-cyan-500/15",
    text: "text-cyan-600 dark:text-cyan-400",
    top: "6%",
    left: "6%",
    delay: "0s",
    duration: "5.5s",
    rotate: "-6deg",
  },
  {
    slug: "whmcs-module",
    label: "WHMCS Module",
    badge: "bg-orange-500/15",
    text: "text-orange-600 dark:text-orange-400",
    top: "50%",
    left: "0%",
    delay: "1.1s",
    duration: "6.5s",
    rotate: "4deg",
  },
  {
    slug: "whmcs-theming",
    label: "WHMCS Theming",
    badge: "bg-fuchsia-500/15",
    text: "text-fuchsia-600 dark:text-fuchsia-400",
    top: "0%",
    left: "58%",
    delay: "0.5s",
    duration: "6s",
    rotate: "5deg",
  },
  {
    slug: "hosting-plugin",
    label: "Hosting Plugin",
    badge: "bg-teal-500/15",
    text: "text-teal-600 dark:text-teal-400",
    top: "38%",
    left: "72%",
    delay: "1.6s",
    duration: "5s",
    rotate: "-4deg",
  },
  {
    slug: "billing-automation",
    label: "Billing Automation",
    badge: "bg-yellow-500/15",
    text: "text-yellow-600 dark:text-yellow-400",
    top: "70%",
    left: "44%",
    delay: "0.8s",
    duration: "7s",
    rotate: "3deg",
  },
];

export function ServicesHeroVisual() {
  return <FloatingCardsVisual cards={SERVICE_CARDS} />;
}
