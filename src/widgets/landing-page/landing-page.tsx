import { ArrowUpRight, Landmark, ShieldCheck, Sprout } from "lucide-react";
import { Button } from "@/shared/ui/atoms/button/button";
import { StatusBadge } from "@/shared/ui/atoms/status-badge/status-badge";
import { BrandMark } from "@/shared/ui/molecules/brand-mark/brand-mark";

type LandingPageProps = {
  copy: {
    explore: string;
    eyebrow: string;
    fund: string;
    headline: string;
    statement: string;
    testnet: string;
  };
};

const principles = [
  { icon: ShieldCheck, label: "Human approval" },
  { icon: Landmark, label: "Clear obligations" },
  { icon: Sprout, label: "Evidence first" },
];

export function LandingPage({ copy }: LandingPageProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--background)] px-5 py-5 text-[var(--foreground)] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex items-center justify-between border-b border-[var(--line)] pb-5">
          <BrandMark />
          <StatusBadge tone="mint">{copy.testnet}</StatusBadge>
        </header>

        <section className="grid min-h-[74vh] items-end gap-10 py-14 lg:grid-cols-[1.5fr_0.7fr] lg:py-20">
          <div>
            <p className="mb-7 text-xs font-bold uppercase tracking-[0.18em] text-[var(--coral)]">{copy.eyebrow}</p>
            <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-6xl leading-[0.88] tracking-[-0.075em] sm:text-7xl lg:text-9xl">
              {copy.headline}
            </h1>
            <p className="mt-9 max-w-xl text-lg leading-8 text-[color:color-mix(in_srgb,var(--forest)_78%,transparent)]">
              {copy.statement}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button>{copy.fund}<ArrowUpRight className="size-4" /></Button>
              <Button variant="secondary">{copy.explore}</Button>
            </div>
          </div>

          <aside className="border-l border-[var(--line)] pl-6 lg:pb-2">
            <p className="mb-12 max-w-xs font-[family-name:var(--font-display)] text-3xl leading-none tracking-[-0.05em] text-[var(--forest)]">
              Funding should be a record of trust, not a leap of faith.
            </p>
            <div className="grid gap-4">
              {principles.map(({ icon: Icon, label }, index) => (
                <div className="flex items-center gap-4 border-t border-[var(--line)] pt-4" key={label}>
                  <span className="text-xs font-bold text-[var(--coral)]">0{index + 1}</span>
                  <Icon aria-hidden="true" className="size-5 text-[var(--forest)]" />
                  <span className="text-sm font-bold">{label}</span>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
