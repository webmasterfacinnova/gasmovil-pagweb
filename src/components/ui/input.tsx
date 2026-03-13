import type * as React from "react";
import { cn } from "../../lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-[var(--client-300)] focus:outline-none focus:ring-4 focus:ring-[var(--client-100)]/60",
        className,
      )}
      {...props}
    />
  );
}
