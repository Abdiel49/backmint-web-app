import { cn } from "@/shared/lib/cn";

type StatusBadgeProps = {
  children: string;
  tone?: "mint" | "coral" | "neutral";
};

const tones = {
  coral: "bg-[var(--coral)] text-white",
  mint: "bg-[var(--mint)] text-[var(--forest)]",
  neutral: "border border-[var(--line)] text-[var(--forest)]",
};

export function StatusBadge({ children, tone = "neutral" }: StatusBadgeProps) {
  return (
    <span className={cn("rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]", tones[tone])}>
      {children}
    </span>
  );
}
