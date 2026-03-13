import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--client-300)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--client-500)] text-white shadow-lg shadow-[var(--client-500)]/25 hover:bg-[var(--client-600)]",
        supply:
          "bg-[var(--supply-500)] text-[var(--supply-950)] shadow-lg shadow-[var(--supply-500)]/20 hover:bg-[var(--supply-400)]",
        outline:
          "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
      },
      size: {
        default: "h-11 px-5",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, size, variant, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
