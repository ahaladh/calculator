import Decimal from "decimal.js";

export type TaxRegime = "new" | "old";

interface Slab {
  upTo: number | null;
  ratePct: number;
}

/**
 * FY 2026-27 (AY 2027-28) slabs, unchanged from FY 2025-26 per Union
 * Budget 2026 (no slab changes announced). New regime is the default
 * regime; old regime remains available by election.
 */
const NEW_REGIME_SLABS: Slab[] = [
  { upTo: 400_000, ratePct: 0 },
  { upTo: 800_000, ratePct: 5 },
  { upTo: 1_200_000, ratePct: 10 },
  { upTo: 1_600_000, ratePct: 15 },
  { upTo: 2_000_000, ratePct: 20 },
  { upTo: 2_400_000, ratePct: 25 },
  { upTo: null, ratePct: 30 },
];

/** Old regime slabs for individuals under 60; senior citizens get a higher exemption. */
const OLD_REGIME_SLABS: Slab[] = [
  { upTo: 250_000, ratePct: 0 },
  { upTo: 500_000, ratePct: 5 },
  { upTo: 1_000_000, ratePct: 20 },
  { upTo: null, ratePct: 30 },
];

const REGIME_CONFIG: Record<
  TaxRegime,
  { slabs: Slab[]; standardDeduction: number; rebateThreshold: number; rebateMax: number }
> = {
  new: {
    slabs: NEW_REGIME_SLABS,
    standardDeduction: 75_000,
    rebateThreshold: 1_200_000,
    rebateMax: 60_000,
  },
  old: {
    slabs: OLD_REGIME_SLABS,
    standardDeduction: 50_000,
    rebateThreshold: 500_000,
    rebateMax: 12_500,
  },
};

function slabTax(taxableIncome: Decimal, slabs: Slab[]): Decimal {
  let tax = new Decimal(0);
  let lowerBound = new Decimal(0);
  for (const slab of slabs) {
    if (taxableIncome.lte(lowerBound)) break;
    const upper = slab.upTo === null ? taxableIncome : Decimal.min(taxableIncome, slab.upTo);
    const amountInSlab = upper.minus(lowerBound);
    tax = tax.plus(amountInSlab.times(slab.ratePct).div(100));
    lowerBound = slab.upTo === null ? taxableIncome : new Decimal(slab.upTo);
  }
  return tax;
}

export interface IncomeTaxInput {
  annualIncome: number;
  regime: TaxRegime;
  /** Old regime only: 80C/80D/HRA exemption/home loan interest etc. */
  otherDeductions?: number;
}

export interface IncomeTaxResult {
  taxableIncome: string;
  taxBeforeRebate: string;
  rebate: string;
  cess: string;
  totalTax: string;
  netIncome: string;
  effectiveRatePct: string;
}

/** Cess is Health & Education Cess at 4% of tax after rebate. Surcharge for income above ₹50L is not included. */
export function calculateIncomeTax(input: IncomeTaxInput): IncomeTaxResult {
  const config = REGIME_CONFIG[input.regime];
  const grossIncome = new Decimal(Math.max(0, input.annualIncome));
  const otherDeductions =
    input.regime === "old" ? new Decimal(Math.max(0, input.otherDeductions ?? 0)) : new Decimal(0);
  const totalDeductions = new Decimal(config.standardDeduction).plus(otherDeductions);
  const taxableIncome = Decimal.max(0, grossIncome.minus(totalDeductions));

  const taxBeforeRebate = slabTax(taxableIncome, config.slabs);
  const rebate = taxableIncome.lte(config.rebateThreshold)
    ? Decimal.min(taxBeforeRebate, config.rebateMax)
    : new Decimal(0);
  const taxAfterRebate = Decimal.max(0, taxBeforeRebate.minus(rebate));
  const cess = taxAfterRebate.times(4).div(100);
  const totalTax = taxAfterRebate.plus(cess);
  const netIncome = grossIncome.minus(totalTax);
  const effectiveRatePct = grossIncome.isZero()
    ? new Decimal(0)
    : totalTax.div(grossIncome).times(100);

  return {
    taxableIncome: taxableIncome.toFixed(2),
    taxBeforeRebate: taxBeforeRebate.toFixed(2),
    rebate: rebate.toFixed(2),
    cess: cess.toFixed(2),
    totalTax: totalTax.toFixed(2),
    netIncome: netIncome.toFixed(2),
    effectiveRatePct: effectiveRatePct.toFixed(2),
  };
}
