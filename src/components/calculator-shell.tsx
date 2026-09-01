import type { ReactNode } from "react";

export function CalculatorShell({
  inputs,
  output,
}: {
  inputs: ReactNode;
  output: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:items-start">
      <div className="flex flex-col gap-6 rounded-2xl border border-border bg-surface p-6 lg:col-span-2">
        {inputs}
      </div>
      <div className="flex flex-col gap-6 rounded-2xl border border-border bg-surface p-6 lg:sticky lg:top-6 lg:col-span-3">
        {output}
      </div>
    </div>
  );
}
