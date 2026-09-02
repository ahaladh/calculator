export interface ServiceEntry {
  slug: string;
  icon: string;
  title: string;
  description: string;
}

export const SERVICES: ServiceEntry[] = [
  {
    slug: "single-page-website-development",
    icon: "web-development",
    title: "Single-Page Website Development",
    description:
      "Fast, focused one-page websites for landing pages, portfolios, and product launches — designed and shipped quickly.",
  },
  {
    slug: "whmcs-module-development",
    icon: "whmcs-module",
    title: "WHMCS Module Development",
    description:
      "Custom WHMCS provisioning, payment gateway, and addon modules built to your exact billing and automation workflow.",
  },
  {
    slug: "whmcs-customization-theming",
    icon: "whmcs-theming",
    title: "WHMCS Customization & Theming",
    description:
      "Custom WHMCS templates and client-area theming that match your brand, without touching core files.",
  },
  {
    slug: "hosting-panel-plugin-development",
    icon: "hosting-plugin",
    title: "Hosting Panel Plugin Development",
    description:
      "Custom plugins and integrations for cPanel, Plesk, and WHM that extend what your hosting platform can do.",
  },
  {
    slug: "billing-automation",
    icon: "billing-automation",
    title: "Billing & Invoicing Automation",
    description:
      "Automate recurring billing, invoicing, and provisioning workflows so nothing needs a manual click.",
  },
  {
    slug: "domain-ssl-tooling",
    icon: "domain-ssl-tooling",
    title: "Domain & SSL Management Tools",
    description:
      "Custom tooling for domain registration, DNS, and SSL provisioning integrated into your existing systems.",
  },
];
