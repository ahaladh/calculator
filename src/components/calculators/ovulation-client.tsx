"use client";

import { useEffect, useMemo, useState } from "react";
import { calculateOvulation } from "@/lib/calculators/ovulation";
import { CalculatorShell } from "@/components/calculator-shell";
import { NumberField } from "@/components/ui/number-field";

function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

// A fixed placeholder, not "today" — these pages are statically prerendered
// at build time, so seeding state with the build server's "today" would
// mismatch the client's actual current date on every subsequent visit and
// break hydration. The real current date is set client-side after mount.
const PLACEHOLDER_DATE = "2026-01-01";

export function OvulationClient() {
  const [lastPeriodDate, setLastPeriodDate] = useState(PLACEHOLDER_DATE);
  const [cycleLengthDays, setCycleLengthDays] = useState(28);
  const [lutealPhaseDays, setLutealPhaseDays] = useState(14);

  useEffect(() => {
    // Sets the real current date once, client-side only, after the
    // placeholder-based SSR render has already hydrated successfully.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLastPeriodDate(todayIso());
  }, []);

  const result = useMemo(
    () => calculateOvulation({ lastPeriodDate, cycleLengthDays, lutealPhaseDays }),
    [lastPeriodDate, cycleLengthDays, lutealPhaseDays],
  );

  return (
    <CalculatorShell
      inputs={
        <>
          <h2 className="text-lg font-semibold">Cycle details</h2>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              First day of your last period
            </label>
            <input
              type="date"
              value={lastPeriodDate}
              onChange={(e) => setLastPeriodDate(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <NumberField
            label="Average cycle length"
            value={cycleLengthDays}
            onChange={setCycleLengthDays}
            min={21}
            max={45}
            step={1}
            suffix="days"
          />
          <NumberField
            label="Luteal phase length"
            value={lutealPhaseDays}
            onChange={setLutealPhaseDays}
            min={10}
            max={16}
            step={1}
            suffix="days"
          />
          <p className="text-xs text-muted">
            Not sure of your luteal phase length? 14 days is a typical
            default — most people don&apos;t know theirs exactly unless
            it&apos;s been measured.
          </p>
        </>
      }
      output={
        <>
          <h2 className="text-lg font-semibold">Estimated fertile window</h2>
          {result ? (
            <>
              <p className="text-2xl font-bold tabular-nums text-accent">
                {formatDate(result.fertileWindowStart)} – {formatDate(result.fertileWindowEnd)}
              </p>
              <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                <div className="rounded-lg border border-border p-4">
                  <p className="text-muted">Estimated ovulation date</p>
                  <p className="text-lg font-semibold">{formatDate(result.ovulationDate)}</p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-muted">Next period expected</p>
                  <p className="text-lg font-semibold">{formatDate(result.nextPeriodDate)}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold">Following cycles</h3>
                <ul className="text-sm text-muted">
                  {result.upcomingOvulationDates.map((date) => (
                    <li key={date}>{formatDate(date)}</li>
                  ))}
                </ul>
              </div>
              <p className="text-xs text-muted">
                This is a statistical estimate based on average cycle
                timing, not a measurement of your actual ovulation — actual
                timing varies cycle to cycle. It is not a reliable method of
                contraception. If you&apos;re tracking for conception or
                have fertility concerns, talk to a healthcare provider.
              </p>
            </>
          ) : (
            <p className="text-sm text-red-500">Enter a valid date.</p>
          )}
        </>
      }
    />
  );
}
