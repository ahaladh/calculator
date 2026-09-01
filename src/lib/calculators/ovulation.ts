export interface OvulationInput {
  /** Start date of the last menstrual period, as "YYYY-MM-DD". */
  lastPeriodDate: string;
  cycleLengthDays: number;
  lutealPhaseDays: number;
}

export interface OvulationResult {
  ovulationDate: string;
  fertileWindowStart: string;
  fertileWindowEnd: string;
  nextPeriodDate: string;
  /** Estimated ovulation date for the following 2 cycles, for a quick look ahead. */
  upcomingOvulationDates: string[];
}

function parseUtcDate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function addDaysUtc(date: Date, days: number): Date {
  const result = new Date(date.getTime());
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * Ovulation typically occurs (luteal phase length) days before the next
 * period — the luteal phase is comparatively fixed, while the follicular
 * phase (period start to ovulation) varies with cycle length. This is a
 * statistical estimate, not a measurement — actual ovulation timing varies
 * cycle to cycle and isn't reliable for contraception.
 */
export function calculateOvulation(input: OvulationInput): OvulationResult | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.lastPeriodDate)) return null;

  const lastPeriod = parseUtcDate(input.lastPeriodDate);
  if (Number.isNaN(lastPeriod.getTime())) return null;

  const cycleLength = Math.max(21, Math.min(45, Math.round(input.cycleLengthDays)));
  const lutealPhase = Math.max(10, Math.min(16, Math.round(input.lutealPhaseDays)));

  const ovulationOffset = cycleLength - lutealPhase;
  const ovulationDate = addDaysUtc(lastPeriod, ovulationOffset);
  const nextPeriodDate = addDaysUtc(lastPeriod, cycleLength);

  const upcomingOvulationDates = [1, 2].map((n) =>
    toIsoDate(addDaysUtc(ovulationDate, cycleLength * n)),
  );

  return {
    ovulationDate: toIsoDate(ovulationDate),
    fertileWindowStart: toIsoDate(addDaysUtc(ovulationDate, -5)),
    fertileWindowEnd: toIsoDate(addDaysUtc(ovulationDate, 1)),
    nextPeriodDate: toIsoDate(nextPeriodDate),
    upcomingOvulationDates,
  };
}
