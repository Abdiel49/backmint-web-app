import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold tracking-[0.02em] transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--coral)] disabled:pointer-events-none disabled:opacity-50",
  {
    defaultVariants: {
      variant: "primary",
    },
    variants: {
      variant: {
        primary: "bg-[var(--forest)] text-[var(--surface)] hover:-translate-y-0.5",
        secondary:
          "border border-[var(--forest)] text-[var(--forest)] hover:bg-[var(--mint)]",
      },
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant }), className)} {...props} />;
}
