export interface ExperienceEntry {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  date: string;
}

export const PROFILE = {
  name: "Ahaladh P",
  role: "Software Developer",
  location: "Kozhikode, Kerala, India",
  email: "ahaladh4011@gmail.com",
  linkedin: "https://www.linkedin.com/in/ahaladh-p-7b03b399",
  tagline: "Building reliable web platforms, end to end.",
  taglineAccent: "reliable",
  summary:
    "Software developer with 6+ years building web applications and hosting-industry tooling — Laravel and PHP on the backend, React and Node.js on the front end, with deep, hands-on experience customizing and extending WHMCS and WordPress for real client businesses.",
};

export const STATS = [
  { value: "6+", label: "Years experience" },
  { value: "3", label: "Companies" },
  { value: "13", label: "Technologies" },
];

export const SKILLS = [
  "Laravel",
  "PHP",
  "React",
  "Node.js",
  "MongoDB",
  "MySQL",
  "WordPress",
  "WHMCS",
  "JavaScript",
  "Tailwind CSS",
  "HTML & CSS",
  "REST APIs",
  "Git & GitHub",
];

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "PEWEO Sàrl",
    role: "Software Developer",
    location: "Luxembourg",
    start: "Oct 2023",
    end: "Present",
    highlights: [
      "Build and maintain Laravel (PHP) web applications alongside full-stack projects on React, Node.js, and MongoDB.",
      "Developed the open-source Upmind provision-provider-base module (PHP) for the EuroDNS domain registrar.",
      "Customize WHMCS extensively — themes, templates, and third-party integrations — and build custom modules for domain provisioning and invoicing automation.",
      "Integrate WHMCS and WordPress sites with external APIs for domain registrars, payment gateways, and server provisioning.",
      "Build WordPress themes, custom plugins, and WooCommerce e-commerce sites end to end.",
    ],
  },
  {
    company: "Zonat Sarl",
    role: "Software Developer",
    location: "Luxembourg",
    start: "Jun 2021",
    end: "Oct 2023",
    highlights: [
      "Developed and maintained Laravel (PHP) web applications to established coding standards.",
      "Customized WHMCS for client-specific needs — theming, templates, third-party module integration — and built custom modules for provisioning and invoicing.",
      "Integrated payment gateways and domain-registrar APIs; built custom WordPress themes, plugins, and WooCommerce storefronts.",
      "Designed and optimized MySQL database schemas and queries for data integrity and performance.",
    ],
  },
  {
    company: "Bpract Software Solutions LLP",
    role: "Software Developer",
    location: "Kozhikode, India",
    start: "Sep 2018",
    end: "Apr 2021",
    highlights: [
      "Designed MLM (multi-level marketing) system architectures in Laravel — binary, matrix, unilevel, and hybrid compensation plans with genealogy trees and commission history.",
      "Built commission-calculation engines that tracked and disbursed member earnings based on sales volume, rank, and performance.",
      "Integrated e-wallets and payment gateways (PayPal, Stripe, and cryptocurrency) for secure fund transfers within MLM platforms.",
      "Customized WooCommerce storefronts and built custom WordPress plugins and WooCommerce extensions for bespoke payment and shipping needs.",
    ],
  },
];

export const EDUCATION: EducationEntry[] = [
  {
    degree: "B.Tech, Computer Science & Engineering",
    institution: "Government Engineering College, Idukki",
    location: "Idukki, Kerala",
    date: "2018",
  },
  {
    degree: "Diploma, Computer Engineering",
    institution: "Kerala Government Polytechnic College",
    location: "Kozhikode",
    date: "2015",
  },
  {
    degree: "Higher Secondary, Computer Science",
    institution: "Rahmania H.S.S",
    location: "Kozhikode",
    date: "2012",
  },
  {
    degree: "SSLC",
    institution: "St. Joseph's BHSS",
    location: "Kozhikode",
    date: "2010",
  },
];
