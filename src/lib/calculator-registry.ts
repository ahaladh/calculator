export interface CalcEntry {
  slug: string;
  title: string;
  description: string;
}

export interface CalcSection {
  category: string;
  slug: string;
  items: CalcEntry[];
}

export const CALCULATOR_SECTIONS: CalcSection[] = [
  {
    category: "Finance",
    slug: "finance",
    items: [
      {
        slug: "mortgage-calculator",
        title: "Mortgage Payment Calculator",
        description:
          "Estimate your monthly payment, total interest, and amortization breakdown.",
      },
      {
        slug: "emi-calculator",
        title: "EMI Calculator",
        description: "Monthly EMI, total interest, and EMI by tenure.",
      },
      {
        slug: "loan-calculator",
        title: "Loan Calculator",
        description: "Compare EMI and total interest across loan tenures.",
      },
      {
        slug: "sip-calculator",
        title: "SIP Calculator",
        description: "Maturity value of a monthly SIP investment.",
      },
      {
        slug: "compound-interest-calculator",
        title: "Compound Interest Calculator",
        description: "Maturity value at any compounding frequency.",
      },
      {
        slug: "fd-calculator",
        title: "FD Calculator",
        description: "Fixed Deposit maturity value, quarterly compounded.",
      },
      {
        slug: "rd-calculator",
        title: "RD Calculator",
        description: "Recurring Deposit maturity value.",
      },
      {
        slug: "gst-calculator",
        title: "GST Calculator",
        description: "Add or remove GST using current GST 2.0 rates.",
      },
      {
        slug: "income-tax-calculator",
        title: "Income Tax Calculator",
        description: "India income tax, FY 2026-27, new vs old regime.",
      },
      {
        slug: "salary-calculator",
        title: "Salary Calculator",
        description: "CTC to in-hand monthly salary breakdown.",
      },
      {
        slug: "roi-calculator",
        title: "ROI Calculator",
        description: "Total return and annualized return (CAGR) on an investment.",
      },
    ],
  },
  {
    category: "Health",
    slug: "health",
    items: [
      {
        slug: "bmi-calculator",
        title: "BMI Calculator",
        description: "Body Mass Index and healthy weight range.",
      },
      {
        slug: "calorie-calculator",
        title: "Calorie Calculator",
        description: "Daily calorie needs — BMR, TDEE, and weight targets.",
      },
      {
        slug: "ovulation-calculator",
        title: "Ovulation Calculator",
        description: "Estimated fertile window from your cycle length.",
      },
    ],
  },
  {
    category: "AI Model Cost",
    slug: "ai-model-cost",
    items: [
      {
        slug: "ai-token-cost-calculator",
        title: "AI Token Cost Calculator",
        description: "Estimate what your AI tokens cost per request, day, and month.",
      },
      {
        slug: "ai-api-cost-calculator",
        title: "AI API Cost Calculator",
        description: "Budget your AI API spend before you build.",
      },
      {
        slug: "llm-cost-calculator",
        title: "LLM Cost Calculator",
        description: "Compare LLM pricing side by side for your exact usage.",
      },
      {
        slug: "ai-model-cost-comparison",
        title: "AI Model Cost Comparison",
        description: "Every current GPT, Claude, and Gemini model, ranked by cost.",
      },
      {
        slug: "chatgpt-api-cost-calculator",
        title: "ChatGPT API Cost Calculator",
        description: "GPT-5.6, GPT-5.1, and GPT-4o pricing for your usage.",
      },
      {
        slug: "openai-token-cost-calculator",
        title: "OpenAI Token Cost Calculator",
        description: "Token pricing across every current OpenAI model.",
      },
      {
        slug: "claude-api-cost-calculator",
        title: "Claude API Cost Calculator",
        description: "Anthropic Opus, Sonnet, and Haiku pricing for your usage.",
      },
      {
        slug: "gemini-api-cost-calculator",
        title: "Gemini API Cost Calculator",
        description: "Google Gemini Flash and Pro pricing for your usage.",
      },
    ],
  },
  {
    category: "Tokens & Context",
    slug: "tokens-context",
    items: [
      {
        slug: "prompt-token-calculator",
        title: "Prompt Token Calculator",
        description: "Count tokens in a prompt across GPT, Claude, and Gemini.",
      },
      {
        slug: "token-counter",
        title: "Token Counter",
        description: "Characters, words, and AI tokens for any text.",
      },
      {
        slug: "context-window-calculator",
        title: "Context Window Calculator",
        description: "See how much of a model's context window you're using.",
      },
    ],
  },
  {
    category: "AI Infrastructure",
    slug: "ai-infrastructure",
    items: [
      {
        slug: "rag-cost-calculator",
        title: "RAG Cost Calculator",
        description: "Indexing, retrieval, and generation cost for a RAG pipeline.",
      },
      {
        slug: "embedding-cost-calculator",
        title: "Embedding Cost Calculator",
        description: "Cost to embed your document corpus for search.",
      },
      {
        slug: "ai-agent-cost-calculator",
        title: "AI Agent Cost Calculator",
        description: "Multi-step tool-calling agent cost, with compounding context.",
      },
      {
        slug: "ai-fine-tuning-cost-calculator",
        title: "AI Fine-Tuning Cost Calculator",
        description: "One-time training cost to fine-tune an OpenAI model.",
      },
      {
        slug: "gpu-cost-calculator",
        title: "GPU Cost Calculator",
        description: "Cloud H100, A100, and B200 rental cost by provider.",
      },
      {
        slug: "ai-image-generation-cost-calculator",
        title: "AI Image Generation Cost Calculator",
        description: "GPT Image and Imagen pricing per image, at scale.",
      },
      {
        slug: "ai-video-cost-calculator",
        title: "AI Video Generation Cost Calculator",
        description: "Sora and Veo pricing per second, at scale.",
      },
    ],
  },
  {
    category: "AI Business",
    slug: "ai-business",
    items: [
      {
        slug: "ai-saas-cost-calculator",
        title: "AI SaaS Cost Calculator",
        description: "Per-user AI cost and a suggested subscription price.",
      },
      {
        slug: "ai-roi-calculator",
        title: "AI ROI Calculator",
        description: "Return on investment for adopting an AI tool.",
      },
    ],
  },
];

export function findCalcEntry(slug: string): CalcEntry | undefined {
  for (const section of CALCULATOR_SECTIONS) {
    const found = section.items.find((item) => item.slug === slug);
    if (found) return found;
  }
  return undefined;
}
