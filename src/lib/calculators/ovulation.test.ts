import { describe, expect, it } from "vitest";
import { calculateOvulation } from "./ovulation";

describe("calculateOvulation", () => {
  it("estimates ovulation 14 days before the next period for a standard 28-day cycle", () => {
    const result = calculateOvulation({
      lastPeriodDate: "2026-01-01",
      cycleLengthDays: 28,
      lutealPhaseDays: 14,
    });
    expect(result!.nextPeriodDate).toBe("2026-01-29");
    expect(result!.ovulationDate).toBe("2026-01-15");
  });

  it("shifts ovulation later for a longer cycle with the same luteal phase", () => {
    const short = calculateOvulation({
      lastPeriodDate: "2026-01-01",
      cycleLengthDays: 26,
      lutealPhaseDays: 14,
    });
    const long = calculateOvulation({
      lastPeriodDate: "2026-01-01",
      cycleLengthDays: 32,
      lutealPhaseDays: 14,
    });
    expect(new Date(long!.ovulationDate).getTime()).toBeGreaterThan(
      new Date(short!.ovulationDate).getTime(),
    );
  });

  it("computes a 6-day fertile window ending the day after ovulation", () => {
    const result = calculateOvulation({
      lastPeriodDate: "2026-03-10",
      cycleLengthDays: 28,
      lutealPhaseDays: 14,
    });
    const start = new Date(result!.fertileWindowStart);
    const end = new Date(result!.fertileWindowEnd);
    const days = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    expect(days).toBe(6);
  });

  it("returns two upcoming ovulation estimates spaced one cycle apart", () => {
    const result = calculateOvulation({
      lastPeriodDate: "2026-01-01",
      cycleLengthDays: 30,
      lutealPhaseDays: 14,
    });
    expect(result!.upcomingOvulationDates).toHaveLength(2);
    const [first, second] = result!.upcomingOvulationDates;
    const gap =
      (new Date(second).getTime() - new Date(first).getTime()) / (1000 * 60 * 60 * 24);
    expect(gap).toBe(30);
  });

  it("returns null for an invalid date string", () => {
    expect(
      calculateOvulation({ lastPeriodDate: "not-a-date", cycleLengthDays: 28, lutealPhaseDays: 14 }),
    ).toBeNull();
  });

  it("clamps cycle length and luteal phase to plausible physiological ranges", () => {
    const result = calculateOvulation({
      lastPeriodDate: "2026-01-01",
      cycleLengthDays: 5,
      lutealPhaseDays: 30,
    });
    // clamped to cycleLength=21, lutealPhase=16 → ovulation offset = 5 days
    expect(result!.ovulationDate).toBe("2026-01-06");
  });
});
