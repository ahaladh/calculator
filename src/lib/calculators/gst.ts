import Decimal from "decimal.js";

/**
 * GST 2.0 rate slabs, effective 22 Sep 2025 — the old 5/12/18/28% structure
 * was rationalized to primarily 0/5/18%, with a 40% slab for select
 * luxury/sin goods (the 12% and 28% slabs were retired).
 */
export const GST_RATES = [0, 5, 18, 40] as const;

export interface GstResult {
  baseAmount: string;
  gstAmount: string;
  totalAmount: string;
}

/** Add GST on top of a base (pre-tax) amount. */
export function addGst(baseAmount: number, ratePct: number): GstResult {
  const base = new Decimal(Math.max(0, baseAmount));
  const rate = new Decimal(Math.max(0, ratePct));
  const gstAmount = base.times(rate).div(100);
  const totalAmount = base.plus(gstAmount);
  return {
    baseAmount: base.toFixed(2),
    gstAmount: gstAmount.toFixed(2),
    totalAmount: totalAmount.toFixed(2),
  };
}

/** Extract the base amount and GST from a GST-inclusive total. */
export function removeGst(totalAmount: number, ratePct: number): GstResult {
  const total = new Decimal(Math.max(0, totalAmount));
  const rate = new Decimal(Math.max(0, ratePct));
  const base = total.div(rate.div(100).plus(1));
  const gstAmount = total.minus(base);
  return {
    baseAmount: base.toFixed(2),
    gstAmount: gstAmount.toFixed(2),
    totalAmount: total.toFixed(2),
  };
}
