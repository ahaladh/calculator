export interface BlogSection {
  heading?: string;
  paragraphs: string[];
  list?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: string;
  relatedCalculator?: { slug: string; label: string };
  sections: BlogSection[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-emi-is-calculated",
    title: "How EMI Is Calculated: The Complete Formula Explained",
    description:
      "The exact formula banks use to calculate your loan EMI, a worked example, and how principal, rate, and tenure each move your monthly payment.",
    date: "2026-08-04",
    category: "Finance",
    readingTime: "5 min read",
    relatedCalculator: { slug: "emi-calculator", label: "EMI Calculator" },
    sections: [
      {
        paragraphs: [
          "Every EMI you've ever paid — on a home loan, a car loan, a personal loan — comes from the same formula. Once you understand it, the number on your loan statement stops being a mystery the bank generated and becomes something you can verify yourself in under a minute.",
        ],
      },
      {
        heading: "The formula",
        paragraphs: [
          "EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ − 1)",
          "Where P is the principal (the amount you borrow), r is the monthly interest rate (your annual rate divided by 12, then divided by 100 to convert from a percentage), and n is the total number of monthly installments (loan tenure in years × 12).",
        ],
      },
      {
        heading: "A worked example",
        paragraphs: [
          "Say you borrow ₹10,00,000 at 9% annual interest for 5 years.",
        ],
        list: [
          "P = 10,00,000",
          "r = 9 / 12 / 100 = 0.0075",
          "n = 5 × 12 = 60",
          "EMI = 10,00,000 × 0.0075 × (1.0075)⁶⁰ / ((1.0075)⁶⁰ − 1) ≈ ₹20,758",
        ],
      },
      {
        heading: "Why your EMI stays flat but the interest portion doesn't",
        paragraphs: [
          "The EMI amount is fixed for the life of the loan, but what it's made of changes every month. Early on, most of each payment goes toward interest, because interest is calculated on the outstanding principal — which is still close to the full loan amount. As you keep paying, the principal shrinks, so the interest portion of each EMI shrinks with it, and a larger share goes toward paying down principal. This is why prepaying a loan early saves disproportionately more interest than prepaying the same amount later in the tenure.",
        ],
      },
      {
        heading: "What actually moves your EMI",
        paragraphs: ["Three levers, and they don't move your EMI equally:"],
        list: [
          "Principal — a linear relationship. Borrow 20% more, pay roughly 20% more EMI.",
          "Interest rate — the most sensitive lever, because r is compounded n times in the formula. A 1-percentage-point rate difference on a 20-year home loan changes the EMI far more than the same 1-point difference on a 2-year personal loan.",
          "Tenure — a longer tenure lowers your EMI, but increases total interest paid over the life of the loan, sometimes dramatically. Doubling your tenure rarely halves your EMI — it usually reduces it by less than that, while total interest paid goes up.",
        ],
      },
      {
        heading: "Try it yourself",
        paragraphs: [
          "Rather than trust a bank's quoted figure blindly, plug your own principal, rate, and tenure into the formula — or use our EMI Calculator, which also breaks down the full month-by-month interest-vs-principal split so you can see exactly where your money goes over the life of the loan.",
        ],
      },
    ],
  },
  {
    slug: "sip-vs-lump-sum-investing",
    title: "SIP vs Lump Sum: Which Investment Strategy Actually Wins?",
    description:
      "The math behind SIP and lump-sum investing, when each one wins historically, and how to decide which fits your situation.",
    date: "2026-08-11",
    category: "Finance",
    readingTime: "6 min read",
    relatedCalculator: { slug: "sip-calculator", label: "SIP Calculator" },
    sections: [
      {
        paragraphs: [
          "\"Should I invest all at once, or a little every month?\" is one of the most common investing questions, and the honest answer is: it depends on what the market does after you invest — which nobody can predict. But the math behind each approach is well understood, and that math tells you a lot about which one suits your situation.",
        ],
      },
      {
        heading: "What each one actually is",
        paragraphs: [
          "A lump sum investment puts your entire amount to work on day one. A Systematic Investment Plan (SIP) spreads the same total amount across fixed monthly installments over a period of time, buying more units when prices are low and fewer when prices are high — a mechanism called rupee cost averaging.",
        ],
      },
      {
        heading: "The SIP maturity formula",
        paragraphs: [
          "M = P × [((1 + i)ⁿ − 1) / i] × (1 + i)",
          "Where M is the maturity value, P is the amount invested each month, i is the expected monthly rate of return, and n is the number of months. Because each monthly installment compounds for a different length of time — the first installment compounds the longest, the last one barely compounds at all — a SIP's effective average holding period is shorter than a lump sum invested for the same total duration.",
        ],
      },
      {
        heading: "When lump sum tends to win",
        paragraphs: [
          "In a market that trends upward fairly steadily over your investment horizon, a lump sum wins, because 100% of your money is compounding from day one instead of trickling in over months or years. If you already have the capital available and the horizon is long, historical data on broad equity indices generally favors lump sum over SIP — the cost of waiting to deploy capital tends to outweigh the benefit of averaging.",
        ],
      },
      {
        heading: "When SIP tends to win",
        paragraphs: [
          "SIP earns its value in two situations: when you don't have the capital available as a lump sum in the first place (most salaried investors), and when the market is volatile or falling during your investment period — buying consistently through a downturn brings your average purchase price down, so the eventual recovery is worth more to you than it would be to someone who put everything in right before the drop.",
        ],
      },
      {
        heading: "The behavioral factor the math doesn't capture",
        paragraphs: [
          "There's a non-mathematical reason SIP is recommended so often: discipline. A SIP is automated and emotion-free — it buys on the worst days of a crash without you having to make a decision under stress. A lump sum requires you to correctly time a single large decision, and most investors are bad at timing markets, not because they lack information but because fear and greed distort judgment exactly when it matters most.",
        ],
      },
      {
        heading: "A practical way to decide",
        paragraphs: [
          "If you're investing money you'll earn over time (a salary), SIP is the only realistic option, and that's fine — it's proven, disciplined, and removes timing risk entirely. If you're sitting on a lump sum today (a bonus, an inheritance, a sale), the historical edge leans toward investing it immediately rather than staggering it in — but if market timing anxiety would keep you from investing at all otherwise, splitting it into a SIP over 6–12 months is a reasonable compromise between the two.",
        ],
      },
      {
        heading: "Run the numbers on your own scenario",
        paragraphs: [
          "Our SIP Calculator lets you model your own monthly amount, expected return, and duration to see the maturity value — useful for comparing against what the same total invested as a lump sum would return at the same assumed rate.",
        ],
      },
    ],
  },
  {
    slug: "fixed-deposit-vs-recurring-deposit",
    title: "Fixed Deposit vs Recurring Deposit: How to Choose",
    description:
      "FD and RD both pay guaranteed interest, but they solve different problems. Here's how the compounding, liquidity, and tax treatment differ.",
    date: "2026-08-18",
    category: "Finance",
    readingTime: "4 min read",
    relatedCalculator: { slug: "fd-calculator", label: "FD Calculator" },
    sections: [
      {
        paragraphs: [
          "Fixed Deposits (FDs) and Recurring Deposits (RDs) are both bank products that pay a guaranteed, fixed rate of interest — no market risk, no surprises. The difference isn't the safety, it's how you fund them and how the money grows.",
        ],
      },
      {
        heading: "The core difference",
        paragraphs: [
          "An FD takes a lump sum today and locks it away for a fixed tenure, earning interest (almost always compounded quarterly at Indian banks) on the full amount from day one. An RD takes a fixed amount every month for the tenure, and each monthly installment earns interest only from the date it's deposited — so the first installment earns interest for the whole tenure, while the last installment barely earns any.",
        ],
      },
      {
        heading: "Which one fits which situation",
        paragraphs: [
          "FD is the right tool when you already have a lump sum sitting idle — a bonus, maturity proceeds from another investment, savings you won't need for a defined period — and want it to earn more than a savings account without taking on risk.",
          "RD is the right tool when you don't have a lump sum but do have a predictable monthly surplus, and want to build a corpus with the discipline of a fixed monthly commitment — similar in spirit to a SIP, but with FD-like guaranteed returns instead of market-linked ones.",
        ],
      },
      {
        heading: "Liquidity and penalties",
        paragraphs: [
          "Both products charge a premature-withdrawal penalty (typically a 0.5–1% reduction in the interest rate) if you break the deposit before maturity. Neither is designed for money you might need on short notice — that's what a savings account or a liquid fund is for.",
        ],
      },
      {
        heading: "Tax treatment",
        paragraphs: [
          "Interest from both FDs and RDs is fully taxable at your income tax slab rate — there's no special concessional rate. Banks deduct TDS (10%, or 20% if you haven't submitted PAN) once your annual interest crosses ₹40,000 across all deposits with that bank (₹50,000 for senior citizens), but TDS deduction doesn't mean the tax liability is settled — you still owe tax at your actual slab rate, and TDS is only credited against that.",
        ],
      },
      {
        heading: "Compare your own numbers",
        paragraphs: [
          "Because an RD's installments each compound for a different length of time, its effective return on the total amount deposited is lower than an FD's stated rate would suggest for the same principal. Use our FD Calculator and RD Calculator side by side with your actual numbers rather than assuming the quoted interest rate tells the whole story.",
        ],
      },
    ],
  },
  {
    slug: "understanding-bmi-what-it-does-and-doesnt-tell-you",
    title: "Understanding BMI: What It Measures and Where It Falls Short",
    description:
      "BMI is a 200-year-old formula still used as a first-pass health screen today. Here's what it actually calculates, and the specific situations where it misleads.",
    date: "2026-08-25",
    category: "Health",
    readingTime: "5 min read",
    relatedCalculator: { slug: "bmi-calculator", label: "BMI Calculator" },
    sections: [
      {
        paragraphs: [
          "Body Mass Index shows up on every health checkup form, but very few people who see their number understand what it's actually measuring — or, just as importantly, what it isn't.",
        ],
      },
      {
        heading: "The formula",
        paragraphs: [
          "BMI = weight (kg) ÷ height (m)²",
          "That's the entire calculation. It converts your weight and height into a single ratio, then compares that ratio against population-level categories established by the World Health Organization: under 18.5 is Underweight, 18.5–24.9 is Normal, 25–29.9 is Overweight, and 30 and above is Obese.",
        ],
      },
      {
        heading: "What it's actually good for",
        paragraphs: [
          "BMI was never designed to diagnose an individual — it was designed in the 1830s (by mathematician Adolphe Quetelet) as a population-level statistic, and it's still useful at that scale: public health researchers use it to track obesity trends across large groups, and doctors use it as a fast, free, first-pass screening question — is this person's weight, relative to height, in a range associated with elevated health risk, worth a closer look?",
        ],
      },
      {
        heading: "Where it breaks down for individuals",
        paragraphs: ["BMI has one structural blind spot: it cannot distinguish muscle from fat. That one limitation cascades into several specific failure cases:"],
        list: [
          "Muscular and athletic people are frequently misclassified as \"overweight\" or even \"obese\" by BMI, because muscle is denser than fat and adds weight without adding the health risk BMI is trying to flag.",
          "Older adults can have a \"normal\" BMI while having lost significant muscle mass and gained fat — a composition shift BMI can't see, since it only looks at the total.",
          "It doesn't account for where fat is stored. Visceral fat around the abdomen carries meaningfully higher cardiovascular risk than fat stored elsewhere, at the same BMI.",
          "It isn't calibrated for children, pregnant people, or the elderly — all three groups have body composition patterns the original formula wasn't built around.",
          "It doesn't vary by sex or ethnicity, despite research showing health risk at a given BMI can differ across both.",
        ],
      },
      {
        heading: "What to pair it with",
        paragraphs: [
          "If you want a fuller picture, waist-to-hip ratio and waist circumference are simple, free measurements that add information about fat distribution BMI can't provide. Body fat percentage (from bioelectrical impedance scales, skinfold calipers, or DEXA scans) directly measures what BMI can only guess at. None of these are a substitute for medical advice — they're additional data points that make the picture more complete.",
        ],
      },
      {
        heading: "The bottom line",
        paragraphs: [
          "Treat BMI as a starting question, not an answer. If your number is outside the \"normal\" range, that's worth a conversation with a healthcare provider who can look at your actual body composition, health markers, and personal risk factors — not a verdict to act on by itself. Our BMI Calculator gives you the number and category in both metric and imperial units, exactly as described above — nothing more, nothing less.",
        ],
      },
    ],
  },
  {
    slug: "ai-api-pricing-explained",
    title: "AI API Pricing Explained: How Token-Based Costs Actually Work",
    description:
      "Why AI APIs bill in tokens instead of requests, why output costs more than input, and practical ways to estimate and reduce your spend.",
    date: "2026-09-01",
    category: "AI",
    readingTime: "6 min read",
    relatedCalculator: { slug: "ai-token-cost-calculator", label: "AI Token Cost Calculator" },
    sections: [
      {
        paragraphs: [
          "If you've ever looked at an AI provider's pricing page and seen numbers like \"$3 per million input tokens, $15 per million output tokens\" and felt no wiser for it, this is the explanation that pricing page assumed you already had.",
        ],
      },
      {
        heading: "What a token actually is",
        paragraphs: [
          "A token is a chunk of text — roughly ¾ of a word in English on average, though it varies by language and content. \"Calculator\" might be one token; a rare word or a chunk of code might be split into several. Providers bill by token count, not by word count or character count, because tokens are what the underlying model actually processes.",
        ],
      },
      {
        heading: "Why input and output are priced differently",
        paragraphs: [
          "Every API call has two token counts: input tokens (what you send — your prompt, any context, conversation history) and output tokens (what the model generates back). Output tokens almost always cost more per token than input tokens, often 4–5x more, because generating each output token requires a full forward pass through the model, while processing input tokens can be batched and parallelized more efficiently. A short question that produces a long, detailed answer will cost more than the input length alone suggests.",
        ],
      },
      {
        heading: "Cached tokens: the discount most people miss",
        paragraphs: [
          "If you send the same prompt prefix repeatedly — a system prompt, a long document you're asking multiple questions about — most providers let that prefix be cached, and charge a significantly discounted rate (often 90% off) for the cached portion on subsequent calls. This matters enormously for any application that reuses context: a chatbot with a long system prompt, or a tool that answers several questions against the same document, can cut costs dramatically just by structuring calls so the repeated part comes first and stays identical between calls.",
        ],
      },
      {
        heading: "The basic cost formula",
        paragraphs: [
          "cost = (input_tokens − cached_tokens) × input_rate + cached_tokens × cached_rate + output_tokens × output_rate",
          "Multiply that per-request cost by your expected requests per day, and you have a daily estimate; multiply by 30 for a monthly one. The two numbers that swing this the most are output length (verbose responses cost more) and whether you're taking advantage of caching for repeated context.",
        ],
      },
      {
        heading: "Practical ways to reduce spend",
        paragraphs: ["A few changes typically move the needle more than switching providers:"],
        list: [
          "Cap output length explicitly where the use case allows it — an unconstrained model will often generate more than the answer actually needs.",
          "Structure prompts so repeated content (system instructions, reference documents) comes first and stays byte-identical between calls, so it's eligible for the cached-token discount.",
          "Use a smaller, cheaper model for simple classification or extraction tasks, and reserve the most capable (and expensive) model for tasks that actually need its reasoning ability.",
          "Trim conversation history you send back on each turn — older context that's no longer relevant to the current question is pure cost with no benefit.",
        ],
      },
      {
        heading: "Estimate your own usage",
        paragraphs: [
          "Our AI Token Cost Calculator (and the model-specific calculators for OpenAI, Claude, and Gemini) let you plug in your expected input/output token counts and request volume to see per-request, daily, and monthly costs across current model pricing — useful for budgeting before you build, not just after the bill arrives.",
        ],
      },
    ],
  },
  {
    slug: "whmcs-module-development-guide",
    title: "WHMCS Module Development: A Practical Guide for Hosting Businesses",
    description:
      "What WHMCS modules actually do, the three types you'll encounter, and how to decide between an existing module and a custom-built one.",
    date: "2026-09-08",
    category: "Web Development",
    readingTime: "6 min read",
    sections: [
      {
        paragraphs: [
          "WHMCS runs the billing, provisioning, and support side of a huge share of the web hosting industry — but almost no hosting business runs it unmodified. Understanding what modules do and don't cover is the difference between a smooth automated workflow and a support team doing by hand what software should be doing automatically.",
        ],
      },
      {
        heading: "What a WHMCS module actually is",
        paragraphs: [
          "A module is a self-contained package of PHP code that plugs into one of WHMCS's defined extension points and lets it talk to an external system on your behalf, following a documented interface WHMCS itself calls at the right moments — when an order is placed, when an invoice is paid, when a service is due for renewal, and so on.",
        ],
      },
      {
        heading: "The three types you'll run into",
        paragraphs: ["Almost every WHMCS module falls into one of three categories:"],
        list: [
          "Provisioning modules — connect WHMCS to the system that actually creates the service: a hosting control panel, a domain registrar, a VPS platform. When a customer orders and pays, the provisioning module is what calls the registrar's or control panel's API to actually create the account, register the domain, or spin up the server, instead of a human doing it manually.",
          "Payment gateway modules — connect WHMCS to a payment processor, handling the checkout flow, capturing payments, and reporting successful or failed transactions back to WHMCS so invoices update automatically.",
          "Addon modules — extend the WHMCS admin area itself: custom reporting dashboards, client-area widgets, automation for tasks WHMCS doesn't handle out of the box (custom notifications, integrations with a support desk, usage-based billing logic).",
        ],
      },
      {
        heading: "When an existing module is enough",
        paragraphs: [
          "WHMCS has a large marketplace of modules for popular registrars, control panels, and payment gateways, and if you're using a widely-supported provider, an existing module — free or paid — is almost always the right call. It's tested against real production traffic by many other hosting companies, and maintained against WHMCS's own version updates, which a one-off custom module usually isn't.",
        ],
      },
      {
        heading: "When custom development is the right call",
        paragraphs: [
          "Custom development earns its cost in a few specific situations: you're integrating with a registrar, control panel, or internal system that has no existing module; an existing module covers 80% of what you need but is missing a specific automation your business depends on; or you need business logic that's genuinely unique to how you operate — a non-standard provisioning workflow, a billing rule no off-the-shelf module anticipates.",
        ],
      },
      {
        heading: "What makes a module reliable in production",
        paragraphs: [
          "The failure modes that actually hurt hosting businesses are rarely \"the module doesn't work\" — they're edge cases: what happens when the external API times out mid-provisioning, when a webhook arrives out of order, when a customer cancels between payment and provisioning completing. A module worth trusting with real customer accounts handles those cases explicitly — retries, idempotency, logging that lets you diagnose a stuck order without guessing — not just the happy path where everything responds instantly and in order.",
        ],
      },
      {
        heading: "Getting it built",
        paragraphs: [
          "If you're evaluating whether your integration needs a custom WHMCS module, or already know it does and need it built, that's exactly the kind of work described on our Services page — reach out and we can talk through what you're trying to automate.",
        ],
      },
    ],
  },
  {
    slug: "compound-interest-explained",
    title: "Compound Interest Explained: Why Time Matters More Than the Rate",
    description:
      "How compound interest actually works, a worked comparison against simple interest, the Rule of 72, and why starting early beats chasing a higher rate.",
    date: "2026-10-05",
    category: "Finance",
    readingTime: "5 min read",
    relatedCalculator: {
      slug: "compound-interest-calculator",
      label: "Compound Interest Calculator",
    },
    sections: [
      {
        paragraphs: [
          "Compound interest is the single idea behind fixed deposits, recurring deposits, savings accounts, bonds, and the interest on every loan you've ever taken. It's simple to state — interest earns interest — but its effect over long periods is large enough that it's worth understanding properly rather than just trusting a bank's maturity figure.",
        ],
      },
      {
        heading: "Simple vs compound interest",
        paragraphs: [
          "Simple interest is calculated only on the original principal, for the whole period. Compound interest is calculated on the principal plus all the interest already earned, so each period's interest is slightly larger than the last.",
          "Take ₹1,00,000 invested at 8% a year for 10 years. With simple interest you earn ₹8,000 every year, ₹80,000 in total, ending at ₹1,80,000. With annual compounding the balance grows to about ₹2,15,892 — the extra ₹35,892 is purely interest earning interest.",
        ],
      },
      {
        heading: "The formula",
        paragraphs: [
          "A = P × (1 + r/n)^(n×t)",
          "Where P is the principal, r is the annual interest rate as a decimal, n is how many times per year interest is compounded, and t is the time in years. A is the final amount, so the interest earned is A − P.",
        ],
      },
      {
        heading: "Does compounding frequency matter?",
        paragraphs: [
          "A little. Run the same ₹1,00,000 at 8% for 10 years with monthly compounding instead of annual, and the maturity value rises to roughly ₹2,21,964 — about ₹6,000 more than annual compounding. The gain is real but modest compared with the effect of the rate or the time period, because the difference only comes from interest starting to earn interest a bit sooner.",
        ],
      },
      {
        heading: "The Rule of 72",
        paragraphs: [
          "A quick mental shortcut for how long money takes to double: divide 72 by the annual rate. At 8%, that's 72 ÷ 8 = 9 years. The exact answer is about 9.01 years, so the shortcut is very close in the range of rates most people actually deal with. It's a good sanity check on any claimed return — if someone promises to double your money in two years, that implies about 36% a year, which should make you ask hard questions.",
        ],
      },
      {
        heading: "Why starting early beats a higher rate",
        paragraphs: [
          "Because growth compounds, the later years do most of the work — the balance is bigger, so the same percentage produces a bigger rupee gain. That's why adding five extra years to the start of an investment usually helps more than finding a rate one or two percentage points higher. Time is the one input you can't buy back later.",
        ],
      },
      {
        heading: "The same math works against you on debt",
        paragraphs: [
          "Everything above applies in reverse to borrowing. A credit card balance that compounds monthly at a high rate grows the same way your savings would — which is why paying down high-interest debt is often a better 'return' than almost any investment available to you.",
        ],
      },
      {
        heading: "Run your own numbers",
        paragraphs: [
          "Our Compound Interest Calculator lets you change the principal, rate, period, and compounding frequency (annual through daily) and see the maturity value and total interest instantly. It's also the building block behind the FD and RD calculators on this site.",
        ],
      },
    ],
  },
  {
    slug: "how-gst-is-calculated",
    title: "How GST Is Calculated: Adding and Removing It Correctly",
    description:
      "The two formulas for adding GST to a price and extracting it from a GST-inclusive total, the common mistake that gets the second one wrong, and how CGST, SGST, and IGST split.",
    date: "2026-10-05",
    category: "Finance",
    readingTime: "5 min read",
    relatedCalculator: { slug: "gst-calculator", label: "GST Calculator" },
    sections: [
      {
        paragraphs: [
          "Almost everyone who invoices in India eventually has to do one of two GST calculations: add GST to a price they know, or work out how much of a final price was GST. They use different formulas, and mixing them up is one of the most common small accounting errors.",
        ],
      },
      {
        heading: "Adding GST to a base price",
        paragraphs: [
          "total = base × (1 + rate)",
          "If a service costs ₹10,000 before tax and the GST rate is 18%, the GST is ₹10,000 × 0.18 = ₹1,800 and the invoice total is ₹11,800.",
        ],
      },
      {
        heading: "Removing GST from a GST-inclusive total",
        paragraphs: [
          "base = total ÷ (1 + rate)",
          "Working backwards from ₹11,800 at 18%: base = 11,800 ÷ 1.18 = ₹10,000, so the GST portion is ₹1,800.",
        ],
      },
      {
        heading: "The mistake almost everyone makes once",
        paragraphs: [
          "The tempting shortcut for the second case is to take 18% of the total and subtract it: 18% of ₹11,800 is ₹2,124, giving a 'base' of ₹9,676. That's wrong, because the 18% was applied to the base price, not to the total. The tax is 18% of the smaller number, so you have to divide by 1.18 rather than subtract 18% of the larger one. The error grows with the rate and the amount, so it matters on large invoices.",
        ],
      },
      {
        heading: "CGST, SGST, and IGST",
        paragraphs: [
          "For a sale within a single state, the GST is split equally between the central government (CGST) and the state government (SGST) — at an 18% rate, that's 9% each. For a sale between states, the full amount is charged as IGST instead. The total tax is the same either way; only how it's recorded and shared between governments differs, and your invoice has to show the correct split.",
        ],
      },
      {
        heading: "Input tax credit: why GST isn't a cascading tax",
        paragraphs: [
          "GST applies at every stage of a supply chain, but a registered business can claim credit for GST it already paid on its own purchases against the GST it collects on sales. So only the value a business adds is effectively taxed, instead of tax piling on top of tax at each stage. That's the main reason GST replaced the older system of multiple overlapping indirect taxes.",
        ],
      },
      {
        heading: "Rates: check the one for your item",
        paragraphs: [
          "Since the GST 2.0 rationalization that took effect on 22 September 2025, the structure is built mainly around 5% and 18%, with 0% for exempt essentials and a 40% rate for select luxury and sin goods. But rates are assigned per item or service category by the GST Council, so always confirm the rate that applies to your specific supply against the official notification rather than assuming a default.",
        ],
      },
      {
        heading: "Skip the arithmetic",
        paragraphs: [
          "Our GST Calculator handles both directions — add GST or remove it — for the standard slabs or a custom rate, and shows the base, the tax, and the total together.",
        ],
      },
    ],
  },
  {
    slug: "how-income-tax-slabs-work-india",
    title: "How Income Tax Slabs Really Work: Marginal Rates, Rebate, and Cess",
    description:
      "Why moving into a higher slab doesn't tax your whole income at that rate, how the 87A rebate and 4% cess fit in, and how to think about old vs new regime.",
    date: "2026-10-05",
    category: "Finance",
    readingTime: "6 min read",
    relatedCalculator: { slug: "income-tax-calculator", label: "Income Tax Calculator" },
    sections: [
      {
        paragraphs: [
          "One of the most persistent tax myths is that earning a rupee more can push you into a higher slab and make you take home less overall. It can't — because slab rates are marginal, not applied to your whole income. Understanding that one idea removes most of the confusion about income tax.",
        ],
      },
      {
        heading: "Marginal slabs, explained with an example",
        paragraphs: [
          "Each slab's rate applies only to the portion of your taxable income that falls inside that slab. The numbers below are illustrative, to show the mechanics — the actual slabs differ by regime and financial year.",
          "Suppose slabs of 0% up to ₹4,00,000, 5% from ₹4,00,000 to ₹8,00,000, and 10% from ₹8,00,000 to ₹12,00,000, and a taxable income of ₹10,00,000:",
        ],
        list: [
          "First ₹4,00,000 taxed at 0% = ₹0",
          "Next ₹4,00,000 taxed at 5% = ₹20,000",
          "Remaining ₹2,00,000 taxed at 10% = ₹20,000",
          "Total tax before cess = ₹40,000, an effective rate of 4% on the full ₹10,00,000",
        ],
      },
      {
        heading: "Marginal rate vs effective rate",
        paragraphs: [
          "In that example your marginal rate — the rate on your next rupee of income — is 10%, but your effective rate — total tax divided by total income — is only 4%. The effective rate is always lower than the marginal rate, which is why a raise never makes you worse off: only the additional income is taxed at the higher rate.",
        ],
      },
      {
        heading: "Standard deduction and taxable income",
        paragraphs: [
          "Slabs apply to taxable income, not gross salary. For salaried taxpayers, a standard deduction comes off first, and under the old regime further deductions (80C investments, home loan interest, HRA, and others) can reduce taxable income more. Always work out taxable income before applying the slabs.",
        ],
      },
      {
        heading: "The Section 87A rebate",
        paragraphs: [
          "A rebate under Section 87A can cancel the tax entirely for taxable income up to a threshold. That's why someone can fall inside a taxable slab on paper and still pay nothing. Above the threshold, the rebate generally disappears, and tax is charged on the full slab structure — so the rules near the threshold deserve a careful calculation.",
        ],
      },
      {
        heading: "Health and education cess",
        paragraphs: [
          "After the tax and any rebate are calculated, a flat 4% cess is added on top of the tax amount (not on your income). Using the earlier example, ₹40,000 of tax becomes ₹41,600 with cess, before any rebate. Surcharge, a separate additional charge for very high incomes, applies on top of that above ₹50 lakh.",
        ],
      },
      {
        heading: "Old regime or new regime?",
        paragraphs: [
          "The new regime has lower rates and fewer deductions; the old regime has higher rates but lets you claim a long list of deductions. The new regime tends to win when you claim few deductions, and the old one can win when your deductions are large — but the crossover point depends on your exact numbers, so the only reliable way to choose is to compute both. Tax rules change with each Budget, so check the current figures for your financial year.",
        ],
      },
      {
        heading: "Compare both regimes on your own income",
        paragraphs: [
          "Our Income Tax Calculator computes the tax under both regimes side by side for the current rules, including rebate and cess, so you can see which one leaves you with more. It's an estimate, not tax advice — confirm anything important with the official Income Tax Department sources or a qualified professional.",
        ],
      },
    ],
  },
  {
    slug: "mortgage-amortization-explained",
    title: "Mortgage Amortization Explained: Where Your Payment Actually Goes",
    description:
      "How a mortgage payment is calculated, why early payments are mostly interest, and what a 15-year vs 30-year term really costs in total interest.",
    date: "2026-10-05",
    category: "Finance",
    readingTime: "6 min read",
    relatedCalculator: { slug: "mortgage-calculator", label: "Mortgage Payment Calculator" },
    sections: [
      {
        paragraphs: [
          "A mortgage payment looks like one number, but it's really two moving parts — interest and principal — and the balance between them shifts every single month. Seeing that split is the key to understanding why mortgages cost so much more than the sticker price, and what actually helps reduce the total.",
        ],
      },
      {
        heading: "The payment formula",
        paragraphs: [
          "M = P × [r × (1 + r)ⁿ] / [(1 + r)ⁿ − 1]",
          "P is the loan amount, r is the monthly interest rate (annual rate ÷ 12), and n is the number of monthly payments. It's the same amortization formula behind the EMI on any fixed-rate loan, which is why our EMI and mortgage calculators agree.",
        ],
      },
      {
        heading: "A worked example",
        paragraphs: [
          "Borrow $300,000 at 6.5% over 30 years: r = 0.065 ÷ 12 ≈ 0.005417 and n = 360. That gives a monthly payment of about $1,896. Over 360 payments you'd pay roughly $682,600 in total — meaning about $382,600 of it is interest, more than the amount you borrowed.",
        ],
      },
      {
        heading: "Why the first payments are almost all interest",
        paragraphs: [
          "Each month's interest is the monthly rate times the remaining balance. In month one, that's $300,000 × 0.005417 ≈ $1,625 of the $1,896 payment, leaving only about $271 to reduce the principal. As the balance falls, the interest portion shrinks and the principal portion grows, even though the total payment never changes. That's the shape of an amortization schedule: interest-heavy at the start, principal-heavy at the end.",
        ],
      },
      {
        heading: "15 years vs 30 years",
        paragraphs: [
          "At the same 6.5% rate, a 15-year term on the same $300,000 has a payment of about $2,613 a month — roughly $717 more than the 30-year payment — but total interest drops to about $170,000, less than half of the 30-year figure. In practice, shorter terms also tend to come with lower rates, widening the gap further. The trade-off is monthly cash flow against total cost.",
        ],
      },
      {
        heading: "What actually reduces total interest",
        paragraphs: ["Three levers do most of the work:"],
        list: [
          "A larger down payment — borrow less, pay less interest on every month's balance.",
          "A shorter term — higher payment, much lower total interest.",
          "Extra principal payments — because interest is calculated on the remaining balance, any extra amount applied early reduces every later month's interest, and the earlier it's paid, the more it saves.",
        ],
      },
      {
        heading: "What the payment formula leaves out",
        paragraphs: [
          "The formula covers principal and interest only. Property taxes, homeowners insurance, and any association dues are billed on top, so your real monthly housing cost will be higher than the figure the formula gives. Budget with all of them included.",
        ],
      },
      {
        heading: "See your own schedule",
        paragraphs: [
          "Our Mortgage Payment Calculator updates as you change the home price, down payment, rate, and term, and shows the month-by-month amortization breakdown — handy for testing how much an extra payment or a shorter term would really save.",
        ],
      },
    ],
  },
  {
    slug: "how-many-calories-should-you-eat",
    title: "How Many Calories Should You Eat? BMR, TDEE, and the Math Behind It",
    description:
      "How the Mifflin-St Jeor equation estimates your BMR, how activity level turns it into TDEE, and how to use the number for weight loss or gain without overtrusting it.",
    date: "2026-10-05",
    category: "Health",
    readingTime: "6 min read",
    relatedCalculator: { slug: "calorie-calculator", label: "Calorie Calculator" },
    sections: [
      {
        paragraphs: [
          "Every calorie target you see online starts from the same two numbers: how much energy your body burns at rest, and how much more it burns because you move around. Knowing how those are estimated tells you how far to trust the result — and how to adjust it from real-world feedback.",
        ],
      },
      {
        heading: "Step 1: BMR, your resting burn",
        paragraphs: [
          "Basal Metabolic Rate (BMR) is the energy your body uses at complete rest just to keep you alive — breathing, circulation, temperature control. One of the most widely used estimates is the Mifflin-St Jeor equation:",
          "Men: BMR = 10 × weight (kg) + 6.25 × height (cm) − 5 × age + 5",
          "Women: BMR = 10 × weight (kg) + 6.25 × height (cm) − 5 × age − 161",
          "For a 30-year-old man who weighs 75 kg and is 175 cm tall: 750 + 1,093.75 − 150 + 5 ≈ 1,699 calories a day at rest.",
        ],
      },
      {
        heading: "Step 2: TDEE, your real daily burn",
        paragraphs: [
          "Total Daily Energy Expenditure (TDEE) multiplies BMR by an activity factor:",
        ],
        list: [
          "Sedentary (little or no exercise): ×1.2",
          "Lightly active (light exercise 1–3 days a week): ×1.375",
          "Moderately active (3–5 days a week): ×1.55",
          "Very active (6–7 days a week): ×1.725",
          "Extra active (hard daily training or a physical job): ×1.9",
        ],
      },
      {
        heading: "Putting the two together",
        paragraphs: [
          "The same man, moderately active: 1,699 × 1.55 ≈ 2,633 calories a day to maintain his weight. Lightly active, it's about 2,336. That gap of nearly 300 calories from a single wrong guess about activity is why people so often land on a target that doesn't match their results — overestimating activity is the most common error.",
        ],
      },
      {
        heading: "Turning maintenance into a goal",
        paragraphs: [
          "A common rule of thumb is that about 3,500 calories equals roughly one pound (0.45 kg) of body fat, so a daily deficit of around 500 calories works out to about a pound lost per week, and a similar surplus to about a pound gained. It's an approximation, not a law — the body adapts, water weight fluctuates, and the real rate drifts over time. Treat it as a starting estimate to adjust from.",
        ],
      },
      {
        heading: "Use it as a starting point, then adjust",
        paragraphs: [
          "The equation is validated for most healthy adults, but individual metabolism varies with muscle mass, genetics, and health conditions. The practical approach is to eat at your estimated target for two to three weeks, track what the scale and your energy levels actually do, and nudge the target up or down based on that real data rather than the formula alone.",
        ],
      },
      {
        heading: "When to see a professional",
        paragraphs: [
          "Calculators are informational, not medical advice. If you're pregnant, managing a health condition, recovering from an eating disorder, or planning a large change in weight, a doctor or registered dietitian can set a target that accounts for things a formula can't see.",
        ],
      },
      {
        heading: "Get your own number",
        paragraphs: [
          "Our Calorie Calculator applies the Mifflin-St Jeor equation to your age, height, weight, and activity level, and shows your BMR, maintenance calories, and targets for weight loss or gain.",
        ],
      },
    ],
  },
  {
    slug: "llm-context-windows-explained",
    title: "LLM Context Windows Explained: Why Long Conversations Get Expensive",
    description:
      "What a context window is, how conversation history quietly multiplies your token costs, and practical ways to stay under the limit.",
    date: "2026-10-05",
    category: "AI",
    readingTime: "5 min read",
    relatedCalculator: { slug: "context-window-calculator", label: "Context Window Calculator" },
    sections: [
      {
        paragraphs: [
          "A model's context window is the maximum amount of text — measured in tokens — it can consider in a single request. Everything has to fit inside it: your instructions, any documents you attach, the conversation so far, and the answer the model is about to write. Understanding how that space gets used explains both why long chats hit limits and why they get costly.",
        ],
      },
      {
        heading: "What counts against the window",
        paragraphs: ["Four things share the same budget:"],
        list: [
          "The system prompt and any standing instructions",
          "Documents, search results, or other context you include",
          "The full conversation history sent with each new message",
          "The response itself — you need to leave room for the model's output",
        ],
      },
      {
        heading: "Why conversation costs grow faster than you expect",
        paragraphs: [
          "Chat APIs are stateless: to continue a conversation, you resend the earlier turns with every new message. So the input tokens on each turn include everything said so far.",
          "Say each turn adds about 500 tokens. On turn 1 you send 500 tokens, on turn 2 about 1,000, on turn 10 about 5,000. Over a 20-turn conversation, the total input tokens you pay for is roughly 500 × (1 + 2 + … + 20) = 105,000 — more than ten times the 10,000 tokens of genuinely new content. Cost grows roughly with the square of the conversation length, not in a straight line.",
        ],
      },
      {
        heading: "What happens when you exceed the limit",
        paragraphs: [
          "Depending on the API, the request either fails outright or the oldest content is silently dropped to make room. Neither is good — a failed request breaks the user experience, and silently dropped history can make the model forget instructions or facts you were relying on without any visible error.",
        ],
      },
      {
        heading: "Bigger windows aren't automatically better",
        paragraphs: [
          "A larger window lets you fit more, but it doesn't guarantee the model uses everything equally well. Models can lose track of details buried in the middle of very long inputs, and a bigger window also means a bigger bill if you fill it. Match the window to what the task needs, not to the largest available.",
        ],
      },
      {
        heading: "How to stay under budget",
        paragraphs: ["The same few techniques cover most cases:"],
        list: [
          "Summarize or drop older turns once they're no longer needed.",
          "Retrieve only the relevant passages (retrieval-augmented generation) instead of pasting whole documents every turn.",
          "Keep repeated content — system prompts, reference text — identical and at the start of the request so it can benefit from prompt caching where the provider offers it.",
          "Cap the maximum response length so the output doesn't consume budget you didn't plan for.",
        ],
      },
      {
        heading: "Check how much of the window you're using",
        paragraphs: [
          "Our Context Window Calculator shows how much of a model's window your content uses, how much budget remains, and roughly how many more messages will fit — a useful check before you ship a feature that sends long histories.",
        ],
      },
    ],
  },
  {
    slug: "rag-cost-breakdown",
    title: "What Does a RAG Pipeline Actually Cost? Indexing, Retrieval, and Generation",
    description:
      "The three cost components of a retrieval-augmented generation system, a worked per-query example, and why retrieved context is usually the biggest lever.",
    date: "2026-10-05",
    category: "AI",
    readingTime: "6 min read",
    relatedCalculator: { slug: "rag-cost-calculator", label: "RAG Cost Calculator" },
    sections: [
      {
        paragraphs: [
          "Retrieval-augmented generation (RAG) lets a language model answer questions using your own documents by fetching the relevant passages and including them in the prompt. It's a popular architecture, but its cost is spread across several places, and the biggest one isn't the one most teams budget for first.",
        ],
      },
      {
        heading: "The three cost components",
        paragraphs: ["A RAG system's bill comes from three separate places:"],
        list: [
          "Indexing — converting your documents into embeddings once (and again whenever they change). This is a one-time or periodic cost that scales with the size of your corpus.",
          "Query embedding — embedding each user question so it can be matched against the index. It's tiny per query, because questions are short.",
          "Generation — the language model call that writes the answer from the retrieved context. This is almost always the dominant ongoing cost.",
        ],
      },
      {
        heading: "Why generation dominates, and why retrieved context is the lever",
        paragraphs: [
          "Every chunk you retrieve is added to the model's input. Retrieve 5 chunks of 300 tokens each and you've added 1,500 input tokens to every single query — on top of the user's question and your system prompt. Output tokens also cost more per token than input tokens, but it's usually the retrieved context that makes the input side large.",
        ],
      },
      {
        heading: "A worked per-query example",
        paragraphs: [
          "The prices below are illustrative, to show the structure of the calculation — substitute your provider's current rates.",
          "Assume input tokens cost $3 per million and output tokens $15 per million. One query sends about 1,750 input tokens (1,500 of retrieved context + 200 of system prompt + 50 for the question) and gets a 300-token answer.",
        ],
        list: [
          "Input: 1,750 × $3 ÷ 1,000,000 ≈ $0.00525",
          "Output: 300 × $15 ÷ 1,000,000 = $0.0045",
          "Total ≈ $0.00975 per query, or about $97.50 a day at 10,000 queries a day",
        ],
      },
      {
        heading: "What changing one setting does",
        paragraphs: [
          "Retrieve 3 chunks instead of 5 and the input drops to about 1,150 tokens. The per-query cost falls to roughly $0.00795 — around 18% lower — from a one-line configuration change, and whether answer quality holds up is something you can test directly. That's why the number of chunks retrieved and the chunk size are the first knobs to examine.",
        ],
      },
      {
        heading: "Indexing is usually the cheap part",
        paragraphs: [
          "Embedding models are priced far lower than generation models. Embedding a 10-million-token corpus at an illustrative $0.10 per million tokens costs about $1. It only becomes meaningful with very large or very frequently changing corpora — which is why re-indexing only when documents actually change, instead of on a fixed schedule, is a sensible habit.",
        ],
      },
      {
        heading: "What's not in the token math",
        paragraphs: [
          "The vector database that stores your embeddings isn't billed per token. Managed services charge for storage and queries, and self-hosting has its own infrastructure cost. Add that to the model costs for a realistic total.",
        ],
      },
      {
        heading: "Ways to reduce cost without hurting quality",
        paragraphs: ["The usual levers, roughly in order of impact:"],
        list: [
          "Retrieve fewer or smaller chunks, and test that answers stay good.",
          "Use a smaller, cheaper model for straightforward questions.",
          "Keep the system prompt identical between calls so prompt caching can discount it.",
          "Re-index only when the underlying content changes.",
        ],
      },
      {
        heading: "Estimate your own pipeline",
        paragraphs: [
          "Our RAG Cost Calculator takes your corpus size, retrieval settings, and query volume and breaks the estimate into indexing, query embedding, and generation — so you can see which part of your own pipeline is driving the spend.",
        ],
      },
    ],
  },
  {
    slug: "single-page-website-vs-multi-page",
    title: "Single-Page Website vs Multi-Page: Which Is Right for Your Business?",
    description:
      "When a one-page website is the smarter choice, where it limits your SEO, and the hybrid approach that gets the best of both.",
    date: "2026-10-05",
    category: "Web Development",
    readingTime: "5 min read",
    sections: [
      {
        paragraphs: [
          "A single-page website puts everything — your offer, proof, pricing, and contact details — on one long, scrolling page. It's fast to build, easy to maintain, and often more persuasive than a sprawling site. But it isn't right for every business, and the SEO trade-offs are the part most people overlook.",
        ],
      },
      {
        heading: "When a single page works well",
        paragraphs: ["It's a strong fit when the goal is narrow and the story is short:"],
        list: [
          "A landing page for one product, offer, or campaign.",
          "A personal portfolio or a small business with a handful of services.",
          "An event, launch, or waitlist page where one clear call to action matters most.",
          "A first version you want live quickly, before investing in a larger site.",
        ],
      },
      {
        heading: "Why it can convert better",
        paragraphs: [
          "A single page controls the narrative: visitors move through a deliberate sequence — problem, solution, proof, action — without wandering off to a menu of other pages. Fewer choices usually means a clearer path to the one action you want, and a lean page is easier to keep fast on mobile connections, which helps both users and search rankings.",
        ],
      },
      {
        heading: "Where it limits your SEO",
        paragraphs: [
          "Search engines rank pages, and a single-page site gives you exactly one URL to rank. That one page has to target everything you offer, which dilutes focus — it's hard for one page to rank well for several unrelated search topics at once. You also have fewer places to earn links, fewer title tags and descriptions to tailor, and less room for the depth of content that long-tail searches reward.",
        ],
      },
      {
        heading: "When you need multiple pages",
        paragraphs: [
          "Move to a multi-page structure when you have distinct services or products that people search for separately, when you want to publish guides or articles that attract search traffic, or when you need separate legal, pricing, or location pages. A page per topic lets each one target its own search intent with its own title, description, and content.",
        ],
      },
      {
        heading: "The hybrid approach",
        paragraphs: [
          "Many sites do best with a focused single-page homepage that covers the core offer, plus separate pages for what genuinely needs its own URL — a blog, individual service pages, and policy pages. You keep the clarity of one persuasive page while giving search engines more to index and more ways to find you.",
        ],
      },
      {
        heading: "Technical basics that matter either way",
        paragraphs: ["Whichever structure you choose, a few fundamentals carry the SEO load:"],
        list: [
          "A unique, descriptive title and meta description for every page.",
          "A canonical URL and a sitemap submitted to search engines.",
          "Clean heading structure — one H1, with sections marked by H2s.",
          "Fast loading and a layout that works properly on phones.",
          "Structured data where it fits, so search engines understand the content.",
        ],
      },
      {
        heading: "Need one built?",
        paragraphs: [
          "Single-page websites are one of the services we build. If you're deciding between one page and several, or want help setting up the SEO basics properly from the start, get in touch via the contact page and we can talk through what fits your business.",
        ],
      },
    ],
  },
  {
    slug: "how-to-pay-off-a-loan-faster",
    title: "How to Pay Off a Loan Faster: What Extra Payments Really Save",
    description:
      "A worked example of how small extra payments shorten a loan and cut total interest, plus when prepaying makes sense and when it doesn't.",
    date: "2026-10-28",
    category: "Finance",
    readingTime: "5 min read",
    relatedCalculator: { slug: "loan-calculator", label: "Loan Calculator" },
    sections: [
      {
        paragraphs: [
          "On a long loan, most of your early payments go to interest rather than the amount you borrowed. That's why even modest extra payments make a surprisingly large difference: every extra rupee or dollar goes straight against the principal, so the interest that would have been charged on it in every future month simply never exists.",
        ],
      },
      {
        heading: "A worked example",
        paragraphs: [
          "Take a $200,000 loan at 6% annual interest over 30 years. The standard monthly payment is about $1,199.10, and over the full term you'd pay roughly $231,700 in interest — more than the amount you borrowed.",
          "Now add a fixed extra amount to every payment:",
        ],
        list: [
          "Extra $100 a month: the loan is cleared in about 24 years 7 months instead of 30, and total interest falls by roughly $49,000.",
          "Extra $200 a month: the loan is cleared in about 21 years, and total interest falls by roughly $80,000.",
        ],
      },
      {
        heading: "Why the savings are so large",
        paragraphs: [
          "Interest is calculated on the outstanding balance. Reduce the balance sooner and every later month's interest is smaller, which leaves more of the regular payment to reduce principal, which shrinks the balance further. The effect compounds in your favour — and it's strongest when the extra payments happen early in the loan, when the balance is highest.",
        ],
      },
      {
        heading: "Ways to pay extra",
        paragraphs: ["You don't need a windfall. Common approaches:"],
        list: [
          "Round your payment up to a fixed higher figure.",
          "Make one extra payment a year, for example from a bonus.",
          "Increase your payment whenever your income rises.",
          "Switch to a shorter term when you refinance, if the higher payment is comfortable.",
        ],
      },
      {
        heading: "When prepaying isn't the best use of money",
        paragraphs: [
          "Paying down a loan gives a guaranteed return equal to its interest rate, which is attractive for high-rate debt like credit cards and personal loans. For a low-rate loan, you may do better building an emergency fund first or investing, depending on your risk comfort. Also check your loan terms: some lenders charge prepayment penalties or fees, and in some countries the interest on certain loans (like home loans) carries tax benefits that change the maths.",
        ],
      },
      {
        heading: "Make sure the extra goes to principal",
        paragraphs: [
          "Tell your lender explicitly that extra amounts should be applied to principal rather than held toward your next scheduled payment. Otherwise a lender may treat the extra as an early payment and the interest saving won't happen.",
        ],
      },
      {
        heading: "Run your own numbers",
        paragraphs: [
          "Our Loan Calculator shows your payment, total interest, and the breakdown for your own amount, rate, and term, so you can compare a few extra-payment scenarios before deciding what's realistic for your budget.",
        ],
      },
    ],
  },
  {
    slug: "recurring-deposit-how-it-works",
    title: "How a Recurring Deposit Works: Maturity Amount Explained",
    description:
      "How monthly RD instalments grow with compounding, a worked maturity example, and the mistakes that reduce what you actually receive.",
    date: "2026-10-28",
    category: "Finance",
    readingTime: "5 min read",
    relatedCalculator: { slug: "rd-calculator", label: "RD Calculator" },
    sections: [
      {
        paragraphs: [
          "A recurring deposit (RD) is a savings product where you deposit a fixed amount every month for a fixed period, and the bank pays a guaranteed interest rate. It suits people who prefer building a lump sum from regular income rather than depositing a large amount at once.",
        ],
      },
      {
        heading: "Why each instalment earns different interest",
        paragraphs: [
          "Unlike a fixed deposit, where the full amount is invested from day one, an RD grows in pieces. The first instalment stays invested for the whole tenure, the second for one month less, and so on — the last one earns almost nothing. Banks typically compound RD interest quarterly, so the maturity amount is the sum of every instalment grown for the time it was actually invested.",
        ],
      },
      {
        heading: "A worked example",
        paragraphs: [
          "Deposit ₹5,000 a month for 5 years (60 instalments) at 7% a year, compounded quarterly. You invest ₹3,00,000 in total. The maturity value comes to roughly ₹3,59,700, which means about ₹59,700 is interest.",
          "Treat that as an estimate: banks differ slightly in how they count the days an instalment is invested and how they round, so the figure on your own deposit receipt may vary by a small amount.",
        ],
      },
      {
        heading: "RD versus FD",
        paragraphs: [
          "Both pay a fixed rate with no market risk. An FD makes sense when you already have a lump sum. An RD makes sense when you're saving from monthly income. Because an RD's money is invested for less time on average, the total interest earned is lower than an FD of the same total amount — the trade-off is the discipline and accessibility of small monthly amounts.",
        ],
      },
      {
        heading: "Mistakes that cost you",
        paragraphs: ["A few things reduce what you actually get:"],
        list: [
          "Missing instalments — banks usually charge a small penalty for each late deposit, and repeated misses can cause the account to be closed early.",
          "Closing early — premature closure typically lowers the interest rate that applies.",
          "Ignoring tax — RD interest is taxable at your income tax slab rate, and TDS may be deducted when interest crosses the bank's threshold.",
        ],
      },
      {
        heading: "Estimate your maturity amount",
        paragraphs: [
          "Our RD Calculator takes your monthly instalment, interest rate, and tenure and shows the maturity value and interest earned. It's a quick way to decide how large an instalment you need to hit a savings goal by a given date.",
        ],
      },
    ],
  },
  {
    slug: "how-to-calculate-roi",
    title: "How to Calculate ROI (and Why Annualised ROI Matters)",
    description:
      "The ROI formula, a worked example, and why comparing investments needs an annualised figure rather than a headline percentage.",
    date: "2026-10-28",
    category: "Finance",
    readingTime: "4 min read",
    relatedCalculator: { slug: "roi-calculator", label: "ROI Calculator" },
    sections: [
      {
        paragraphs: [
          "Return on investment (ROI) answers a simple question: for every unit of money you put in, how much did you get back? It's used for everything from stocks and property to marketing campaigns and software purchases, which is exactly why it's easy to misuse.",
        ],
      },
      {
        heading: "The formula",
        paragraphs: [
          "ROI = (final value − initial investment) ÷ initial investment × 100",
          "If you put in 12,000 and it grows to 15,000, the gain is 3,000 and the ROI is 3,000 ÷ 12,000 = 25%.",
        ],
      },
      {
        heading: "The catch: ROI ignores time",
        paragraphs: [
          "A 25% ROI sounds good, but the time it took matters enormously. If that 25% arrived in one year, it's an excellent return. If it took ten years, it's modest — less than 3% a year on average. A raw ROI percentage can't tell those two cases apart.",
        ],
      },
      {
        heading: "Annualised ROI",
        paragraphs: [
          "To compare investments held for different lengths of time, convert the result to an annual rate: annualised ROI = (final ÷ initial)^(1 ÷ years) − 1.",
          "For the same 25% total return earned over 3 years, that's 1.25^(1/3) − 1 ≈ 7.7% a year. Now you can set it directly against a savings account rate or another investment.",
        ],
      },
      {
        heading: "Common ways ROI misleads",
        paragraphs: ["Watch for these when someone quotes you an ROI figure:"],
        list: [
          "Costs left out — fees, taxes, maintenance, and your own time all reduce the real return.",
          "No time period — always ask how long it took.",
          "Risk ignored — a high ROI from a risky bet isn't comparable to a modest, steady one.",
          "Selective examples — one successful campaign or trade doesn't show a typical outcome.",
        ],
      },
      {
        heading: "Where ROI is most useful",
        paragraphs: [
          "ROI works well as a quick first filter for business decisions — whether a tool, campaign, or hire pays for itself — as long as you include all the costs and the time horizon. For long investments, pair it with the annualised figure.",
        ],
      },
      {
        heading: "Calculate it",
        paragraphs: [
          "Our ROI Calculator takes your initial investment, final value, and time period, and returns the total ROI and the annualised rate, so you can compare options on equal footing.",
        ],
      },
    ],
  },
  {
    slug: "ctc-vs-in-hand-salary",
    title: "CTC vs In-Hand Salary: Why Your Take-Home Is Lower",
    description:
      "What a cost-to-company figure includes, which deductions reduce your monthly pay, and how to estimate your real take-home before accepting an offer.",
    date: "2026-10-28",
    category: "Finance",
    readingTime: "5 min read",
    relatedCalculator: { slug: "salary-calculator", label: "Salary Calculator" },
    sections: [
      {
        paragraphs: [
          "A job offer is usually stated as CTC — cost to company — which is the total amount the employer spends on you in a year. That's not the amount that lands in your bank account each month, and the gap often surprises people who compare offers on the headline number alone.",
        ],
      },
      {
        heading: "What CTC typically includes",
        paragraphs: ["The exact structure varies by employer, but CTC commonly bundles:"],
        list: [
          "Fixed pay — basic salary, house rent allowance (HRA), and other allowances.",
          "Employer's contribution to the provident fund (PF).",
          "Gratuity provision, which you receive only after completing the qualifying service period.",
          "Insurance premiums and other benefits paid on your behalf.",
          "Variable pay or bonuses, which are often paid only if targets are met.",
        ],
      },
      {
        heading: "What reduces your monthly in-hand pay",
        paragraphs: [
          "Starting from the gross monthly figure, several deductions come out before payment:",
        ],
        list: [
          "Your own contribution to the provident fund, commonly set as a percentage of basic salary.",
          "Income tax deducted at source (TDS), based on your expected annual tax liability.",
          "Professional tax, where your state charges it.",
          "Any other deductions such as insurance top-ups or loan recoveries.",
        ],
      },
      {
        heading: "Why two offers with the same CTC can pay differently",
        paragraphs: [
          "Imagine two offers of the same CTC. One has a large variable component that is not guaranteed, and the other pays almost everything as fixed salary. The second gives a higher and more predictable monthly amount. Likewise, a higher basic salary raises PF and gratuity contributions, which increases your long-term savings but lowers your monthly take-home.",
        ],
      },
      {
        heading: "Questions to ask before accepting",
        paragraphs: ["A few questions give you a much clearer picture:"],
        list: [
          "What portion is fixed and what portion is variable, and how reliably is the variable paid?",
          "Is the PF contribution calculated on the full basic salary or a capped amount?",
          "Which benefits (insurance, allowances) are included in CTC and what are they worth to you?",
          "Is the tax regime chosen by default, and can you change it?",
        ],
      },
      {
        heading: "Estimate your take-home",
        paragraphs: [
          "Our Salary Calculator turns an annual figure into an estimated monthly breakdown so you can compare offers on take-home rather than CTC. Treat the result as an estimate — your payslip depends on your employer's salary structure and your declared tax details.",
        ],
      },
    ],
  },
  {
    slug: "ovulation-and-fertile-window-explained",
    title: "Ovulation and the Fertile Window: How the Dates Are Estimated",
    description:
      "How ovulation is predicted from your cycle length, what the fertile window is, and why a calculator can only ever give an estimate.",
    date: "2026-10-28",
    category: "Health",
    readingTime: "5 min read",
    relatedCalculator: { slug: "ovulation-calculator", label: "Ovulation Calculator" },
    sections: [
      {
        paragraphs: [
          "Ovulation is the point in the menstrual cycle when an ovary releases an egg. Knowing roughly when it happens helps people who are trying to conceive plan, and helps others understand their cycle. The important word is roughly — the date is an estimate, not a certainty.",
        ],
      },
      {
        heading: "How the estimate works",
        paragraphs: [
          "The phase between ovulation and your next period (the luteal phase) is fairly consistent from cycle to cycle, usually around 12 to 16 days and often close to 14. Because it's the more stable part, ovulation is estimated by counting back about 14 days from when your next period is expected, rather than counting forward from the last one.",
          "For a typical 28-day cycle that gives ovulation around day 14. For a 30-day cycle it's around day 16, and for a 35-day cycle around day 21. This is why a longer cycle doesn't mean ovulation happens on day 14.",
        ],
      },
      {
        heading: "The fertile window",
        paragraphs: [
          "Pregnancy is possible in the days leading up to ovulation, not just on the day itself, because sperm can survive in the body for up to about five days. The egg survives for roughly a day after release. The fertile window is therefore usually described as the five days before ovulation plus the day of ovulation — about six days in total.",
        ],
      },
      {
        heading: "Why it's only an estimate",
        paragraphs: [
          "A calculator assumes your cycle is regular and that you know its typical length. In practice, stress, illness, travel, breastfeeding, and conditions such as PCOS can shift ovulation, and cycles can vary from month to month. If your cycles are irregular, a calendar-based estimate may be well off.",
        ],
      },
      {
        heading: "Signs that can help confirm it",
        paragraphs: ["Some people combine the calendar estimate with body signals:"],
        list: [
          "Cervical mucus that becomes clear, slippery, and stretchy around ovulation.",
          "A small, sustained rise in basal body temperature after ovulation has occurred.",
          "Positive results on ovulation predictor kits, which detect the hormone surge that precedes ovulation.",
        ],
      },
      {
        heading: "Important to know",
        paragraphs: [
          "An ovulation calculator is not a contraception method and shouldn't be relied on to prevent pregnancy. If you've been trying to conceive for a year without success (six months if you're over 35), or your cycles are very irregular or absent, speak to a doctor — this guide is general information, not medical advice.",
        ],
      },
      {
        heading: "Try the calculator",
        paragraphs: [
          "Our Ovulation Calculator takes your last period date and cycle length and shows the estimated ovulation day and fertile window, which you can use as a starting point for tracking.",
        ],
      },
    ],
  },
  {
    slug: "what-are-tokens-in-ai",
    title: "What Are Tokens in AI? How Text Becomes Cost",
    description:
      "How language models split text into tokens, a rule of thumb for estimating counts, and why token counts drive both pricing and context limits.",
    date: "2026-10-28",
    category: "AI",
    readingTime: "5 min read",
    relatedCalculator: { slug: "token-counter", label: "Token Counter" },
    sections: [
      {
        paragraphs: [
          "Language models don't read words or letters. They read tokens — chunks of text that a tokenizer produces before the model ever sees the input. Tokens are also the unit that API providers bill in and that context limits are measured in, so understanding them is the foundation for estimating any AI cost.",
        ],
      },
      {
        heading: "What a token is",
        paragraphs: [
          "A token can be a whole common word, a piece of a longer or rarer word, a punctuation mark, or even a space attached to a word. A short, common word like cat is usually one token, while a long or unusual word may be split into several pieces.",
        ],
      },
      {
        heading: "A useful rule of thumb",
        paragraphs: [
          "For ordinary English text, one token is roughly four characters, or about three-quarters of a word. That means:",
        ],
        list: [
          "100 tokens is about 75 words.",
          "1,000 words is about 1,300 tokens.",
          "A full page of text (around 500 words) is about 650 tokens.",
        ],
      },
      {
        heading: "When the rule of thumb breaks down",
        paragraphs: [
          "It's an average for English prose, and several kinds of content tokenize less efficiently:",
        ],
        list: [
          "Source code and JSON, with their symbols and structure.",
          "Many non-English languages, especially those with non-Latin scripts, which can need noticeably more tokens for the same meaning.",
          "Numbers, URLs, and unusual names.",
        ],
      },
      {
        heading: "Different models count differently",
        paragraphs: [
          "Each model family has its own tokenizer, so the same text can produce different counts on different models. For budgeting, count with the tokenizer of the model you'll actually call, and treat a general estimate as a starting point.",
        ],
      },
      {
        heading: "Why tokens determine your bill",
        paragraphs: [
          "Providers charge per token, typically quoted per million, with separate prices for input tokens (what you send) and output tokens (what the model writes). Output is usually priced higher. Your cost for a request is input tokens times the input rate plus output tokens times the output rate, and your monthly cost is that multiplied by how many requests you make.",
        ],
      },
      {
        heading: "Why tokens determine what fits",
        paragraphs: [
          "A model's context window is also measured in tokens, and it has to hold your instructions, any documents, the conversation so far, and the model's reply. Long inputs can crowd out the answer, which is why counting tokens matters for quality as well as cost.",
        ],
      },
      {
        heading: "Count your own text",
        paragraphs: [
          "Our Token Counter gives you a quick estimate for any text you paste in, so you can size prompts and documents before you put a price on them.",
        ],
      },
    ],
  },
  {
    slug: "ai-agent-cost-explained",
    title: "Why AI Agents Cost More Than You Expect",
    description:
      "How multi-step agent loops resend a growing context at every step, a worked cost example, and practical ways to keep agent spending under control.",
    date: "2026-10-28",
    category: "AI",
    readingTime: "6 min read",
    relatedCalculator: { slug: "ai-agent-cost-calculator", label: "AI Agent Cost Calculator" },
    sections: [
      {
        paragraphs: [
          "A single chatbot reply is one model call. An agent is different: it plans, calls tools, reads the results, and decides what to do next, often across many steps. Each of those steps is a model call you pay for, and the cost grows faster than the number of steps suggests.",
        ],
      },
      {
        heading: "The hidden multiplier: resending context",
        paragraphs: [
          "At every step the model needs the instructions, the task, and everything that has happened so far, including previous tool results. That whole history is sent again as input tokens on the next call. So input grows with each step, and total input across a run grows much faster than the number of steps.",
        ],
      },
      {
        heading: "A worked example",
        paragraphs: [
          "The prices here are illustrative — substitute your provider's current rates. Assume input at $3 per million tokens and output at $15 per million. An agent starts with 2,000 tokens of instructions and task, and each step adds about 800 tokens of tool output to the context. It runs 10 steps and writes about 300 tokens of output per step.",
        ],
        list: [
          "Input across the run: 2,000 + 2,800 + 3,600 + … up to 9,200 tokens on the last step, totalling 56,000 input tokens — nearly three times the 20,000 you'd get by assuming a flat 2,000 per step.",
          "Input cost: 56,000 × $3 ÷ 1,000,000 ≈ $0.168",
          "Output cost: 3,000 × $15 ÷ 1,000,000 = $0.045",
          "Total ≈ $0.21 per run, or about $210 for 1,000 runs",
        ],
      },
      {
        heading: "What else adds cost",
        paragraphs: ["Beyond the basic loop, spend rises when:"],
        list: [
          "The agent retries failed tool calls or goes down unproductive paths.",
          "Reasoning models produce long internal thinking that's billed as output.",
          "Several sub-agents run in parallel, each with its own context.",
          "Tool results are large and get pasted into context in full.",
        ],
      },
      {
        heading: "How to keep it under control",
        paragraphs: ["The most effective levers are about limiting how much context accumulates:"],
        list: [
          "Set a maximum number of steps so a stuck agent can't loop indefinitely.",
          "Summarise or trim old tool output instead of carrying all of it forward.",
          "Return only the fields a tool result needs, not the full response.",
          "Use prompt caching for the stable part of the prompt, where your provider supports it.",
          "Route simple steps to a smaller, cheaper model.",
        ],
      },
      {
        heading: "Budget with a range, not a number",
        paragraphs: [
          "Agent runs vary — some finish in three steps, others in twenty. It's safer to estimate an average and a worst case than to rely on one figure, and to log real token usage per run once you're in production.",
        ],
      },
      {
        heading: "Estimate your agent's cost",
        paragraphs: [
          "Our AI Agent Cost Calculator lets you set the number of steps, tokens per step, and run volume, so you can see how quickly cost scales before you commit to a design.",
        ],
      },
    ],
  },
  {
    slug: "fine-tuning-cost-explained",
    title: "How Much Does Fine-Tuning an AI Model Cost?",
    description:
      "How training cost is calculated from dataset size and epochs, what comes on top of training, and when fine-tuning is worth it compared with better prompting.",
    date: "2026-10-28",
    category: "AI",
    readingTime: "5 min read",
    relatedCalculator: {
      slug: "ai-fine-tuning-cost-calculator",
      label: "AI Fine-Tuning Cost Calculator",
    },
    sections: [
      {
        paragraphs: [
          "Fine-tuning trains an existing model further on your own examples so it follows a particular style, format, or task more reliably. Hosted fine-tuning services bill mainly by the number of tokens processed during training, which makes the training cost easy to estimate — but it isn't the only cost.",
        ],
      },
      {
        heading: "How training cost is calculated",
        paragraphs: [
          "Training cost = tokens in your dataset × number of epochs × the provider's training price per token. An epoch is one full pass over the dataset, and models are commonly trained for several.",
          "As an illustration, take a 5-million-token dataset trained for 3 epochs. That's 15 million training tokens. At an illustrative $8 per million tokens, the training cost is about $120. Check your provider's current price before relying on any figure like this.",
        ],
      },
      {
        heading: "Costs that come on top",
        paragraphs: ["The training run is often the smaller part of the total:"],
        list: [
          "Preparing data — collecting, cleaning, and labelling examples usually takes more effort than the compute.",
          "Experiments — you'll rarely get the best result on the first run, so budget for several.",
          "Inference — fine-tuned models are often priced higher per token than the base model, and that applies to every request you make afterwards.",
          "Evaluation — testing the tuned model against a held-out set to confirm it's actually better.",
        ],
      },
      {
        heading: "Quality of data beats quantity",
        paragraphs: [
          "A few hundred to a few thousand high-quality, consistent examples often beat a much larger noisy dataset. Duplicates and contradictory examples increase cost without improving the result.",
        ],
      },
      {
        heading: "Do you need fine-tuning at all?",
        paragraphs: [
          "Before paying for it, check whether simpler options solve the problem. Clearer instructions, a few examples in the prompt, or retrieval of relevant documents handle many cases at no training cost. Fine-tuning tends to pay off when you need a consistent output format or tone at high volume, or want a smaller, cheaper model to match a larger model's quality on one narrow task.",
        ],
      },
      {
        heading: "Estimate your run",
        paragraphs: [
          "Our AI Fine-Tuning Cost Calculator takes your dataset size, epochs, and training price and returns the training cost, so you can compare it with the savings you expect at inference.",
        ],
      },
    ],
  },
  {
    slug: "self-hosting-llm-gpu-vs-api",
    title: "Self-Hosting an LLM: GPU Cost vs Paying per API Token",
    description:
      "How to compare renting GPUs against a pay-per-token API, the break-even maths, and the hidden costs of running models yourself.",
    date: "2026-10-28",
    category: "AI",
    readingTime: "6 min read",
    relatedCalculator: { slug: "gpu-cost-calculator", label: "GPU Cost Calculator" },
    sections: [
      {
        paragraphs: [
          "An API charges you for each token you use and nothing when idle. A GPU you rent or buy costs the same whether it's busy or not. That one difference decides most self-hosting questions: self-hosting only wins when you keep the hardware busy enough.",
        ],
      },
      {
        heading: "Step 1: price the always-on GPU",
        paragraphs: [
          "Start with the hourly price of the GPU you need, multiplied by the hours it runs. At an illustrative $2 an hour, one GPU running around the clock for 30 days costs $2 × 24 × 30 = $1,440 a month. A model that needs several GPUs multiplies that accordingly.",
        ],
      },
      {
        heading: "Step 2: find the break-even volume",
        paragraphs: [
          "Divide the monthly GPU cost by the API's price per token to see how many tokens the API would have to process to cost the same. If a comparable hosted model costs a blended $2 per million tokens, $1,440 buys 720 million tokens a month on the API. Below that volume the API is cheaper; above it, a well-utilised GPU may be.",
          "These prices are illustrative — substitute real quotes from your provider and the API you're comparing against.",
        ],
      },
      {
        heading: "Utilisation is the catch",
        paragraphs: [
          "That break-even assumes the GPU can actually process that many tokens. Real throughput depends on the model size, how well requests are batched, and how steadily traffic arrives. Spiky or low traffic leaves the GPU idle while you still pay for it, which is the usual reason self-hosting turns out more expensive than expected.",
        ],
      },
      {
        heading: "Costs people forget",
        paragraphs: ["Beyond the GPU rental itself, count:"],
        list: [
          "Engineering time to deploy, monitor, scale, and update the model.",
          "Storage, networking, and redundancy so a single failure doesn't take you offline.",
          "The gap in quality between an open model you can host and the best hosted models for your task.",
          "Idle capacity you keep for peak load.",
        ],
      },
      {
        heading: "When self-hosting makes sense",
        paragraphs: [
          "It's most compelling with high, steady volume; strict data-residency or privacy requirements; or a need to customise the model deeply. For prototypes, uneven traffic, or small teams, paying per token is usually simpler and cheaper — and you can revisit the decision as volume grows.",
        ],
      },
      {
        heading: "Compare your own numbers",
        paragraphs: [
          "Our GPU Cost Calculator estimates the monthly cost of running GPUs for your hours and count, which you can set against your expected API bill to find your own break-even point.",
        ],
      },
    ],
  },
  {
    slug: "technical-seo-checklist-small-business-website",
    title: "A Technical SEO Checklist for a Small Business Website",
    description:
      "The practical technical SEO basics — titles, canonicals, sitemaps, speed, mobile, and structured data — that help a small site get found and indexed.",
    date: "2026-10-28",
    category: "Web Development",
    readingTime: "6 min read",
    sections: [
      {
        paragraphs: [
          "Good content can't rank if search engines can't find, read, and understand your pages. Technical SEO is the groundwork that makes that possible. The checklist below covers the fundamentals for a small business website, in roughly the order worth tackling them.",
        ],
      },
      {
        heading: "1. Make sure pages can be crawled and indexed",
        paragraphs: ["Start by confirming search engines are allowed in and can find everything:"],
        list: [
          "Publish a robots.txt that doesn't accidentally block important pages.",
          "Create an XML sitemap listing your public pages and submit it in Google Search Console.",
          "Link every important page from somewhere else on your site, so crawlers can reach it.",
          "Check the Pages report in Search Console to see what is indexed and why anything isn't.",
        ],
      },
      {
        heading: "2. One URL per page",
        paragraphs: [
          "If the same page is reachable at several addresses — with and without www, with a trailing slash, or over HTTP and HTTPS — search engines may split their attention between the copies. Choose one preferred version, redirect the others to it, and add a canonical tag on each page pointing to its preferred URL.",
        ],
      },
      {
        heading: "3. Unique titles and descriptions",
        paragraphs: [
          "Every page needs its own title tag and meta description that describe what is on that page. Titles are a strong ranking signal and appear as the blue link in results, so keep them clear and reasonably short; descriptions don't affect ranking directly but influence whether people click. Avoid repeating the same text across pages.",
        ],
      },
      {
        heading: "4. Clean heading structure",
        paragraphs: [
          "Use one H1 that states the page's topic, and break the content into sections with H2s and, where needed, H3s. Headings help both readers and search engines understand how the content is organised.",
        ],
      },
      {
        heading: "5. Speed and Core Web Vitals",
        paragraphs: [
          "Google measures real-world experience through Core Web Vitals. The commonly cited targets for a good experience are:",
        ],
        list: [
          "Largest Contentful Paint (loading) of 2.5 seconds or less.",
          "Interaction to Next Paint (responsiveness) of 200 milliseconds or less.",
          "Cumulative Layout Shift (visual stability) of 0.1 or less.",
        ],
      },
      {
        heading: "6. Mobile-friendly layout",
        paragraphs: [
          "Google primarily uses the mobile version of your pages for indexing. Make sure text is readable without zooming, tap targets aren't cramped, and nothing scrolls sideways on a phone. Test on a real device, not only in a desktop browser.",
        ],
      },
      {
        heading: "7. Structured data",
        paragraphs: [
          "Structured data (schema.org markup in JSON-LD) tells search engines explicitly what a page is — an organisation, an article, a product, a local business. It can make results eligible for richer displays, though it never guarantees them. Add only markup that matches content actually visible on the page.",
        ],
      },
      {
        heading: "8. Images and links",
        paragraphs: [
          "Give meaningful images descriptive alt text, compress them so they don't slow the page, and use descriptive link text rather than click here. Fix or redirect broken links so visitors and crawlers don't hit dead ends.",
        ],
      },
      {
        heading: "Then keep publishing",
        paragraphs: [
          "Technical SEO removes obstacles; it doesn't create demand. Pair it with genuinely useful pages and guides that answer what your customers search for. If you'd like help setting up the technical foundations on a new or existing site, get in touch through the contact page.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
