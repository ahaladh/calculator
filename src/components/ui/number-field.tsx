"use client";

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  error?: string;
}

export function NumberField({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  prefix,
  suffix,
  error,
}: NumberFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          {prefix && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
              {prefix}
            </span>
          )}
          <input
            type="number"
            inputMode="decimal"
            value={Number.isNaN(value) ? "" : value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(e.target.valueAsNumber)}
            className={`w-full rounded-lg border border-border bg-background py-2.5 text-right text-base tabular-nums outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 ${
              prefix ? "pl-7" : "pl-3"
            } ${suffix ? "pr-9" : "pr-3"}`}
          />
          {suffix && (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted">
              {suffix}
            </span>
          )}
        </div>
      </div>
      {max !== undefined && (
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={Number.isNaN(value) ? min : value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="accent-accent"
        />
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
