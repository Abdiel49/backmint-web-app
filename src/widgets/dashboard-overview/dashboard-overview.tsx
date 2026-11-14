import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  ChevronDown,
  ClipboardCheck,
  FileText,
  Landmark,
  LayoutDashboard,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Sparkles,
  Target,
} from "lucide-react";
import { BrandMark } from "@/shared/ui/molecules/brand-mark/brand-mark";

type DashboardCopy = {
  activeAgreements: string;
  availableToDeploy: string;
  capitalFlow: string;
  confirmed: string;
  dashboard: string;
  deposited: string;
  escrowBalance: string;
  fundingHealth: string;
  fundingPipeline: string;
  inReview: string;
  latestActivity: string;
  menu: string;
  milestones: string;
  openOpportunities: string;
  organization: string;
  overview: string;
  pendingRelease: string;
  projects: string;
  reports: string;
  search: string;
  settings: string;
  testnet: string;
  thisMonth: string;
  totalCommitted: string;
  transactionHistory: string;
};

type DashboardOverviewProps = {
  copy: DashboardCopy;
};

const chartPoints = "0,102 58,84 116,92 174,54 232,66 290,28 348,42 406,18 464,30";

const navigation = [
  { icon: LayoutDashboard, key: "dashboard" },
  { icon: Target, key: "projects" },
  { icon: FileText, key: "fundingPipeline" },
  { icon: ClipboardCheck, key: "milestones" },
  { icon: Landmark, key: "reports" },
] as const;

const flowRows = [
  { amount: "$42,400", label: "Riverbend Climate Lab", status: "Deposit confirmed", tone: "positive" },
  { amount: "$18,000", label: "Civic Mesh Initiative", status: "Milestone review", tone: "warning" },
  { amount: "$8,250", label: "Open Fields Collective", status: "Awaiting signature", tone: "neutral" },
] as const;

const activities = [
  { action: "Milestone approved", detail: "Community air-monitoring network", time: "18m" },
  { action: "Agreement signed", detail: "Civic Mesh Initiative", time: "1h" },
  { action: "Evidence submitted", detail: "Riverbend Climate Lab", time: "3h" },
] as const;

export function DashboardOverview({ copy }: DashboardOverviewProps) {
  const navLabels = {
    dashboard: copy.dashboard,
    fundingPipeline: copy.fundingPipeline,
    milestones: copy.milestones,
    projects: copy.projects,
    reports: copy.reports,
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto flex min-h-screen max-w-[1680px]">
        <aside className="hidden w-[246px] shrink-0 flex-col border-r border-[var(--line)] bg-[#090f1b] px-4 py-5 lg:flex">
          <div className="px-3"><BrandMark /></div>
          <div className="mt-12 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">{copy.menu}</div>
          <nav className="mt-3 space-y-1" aria-label={copy.menu}>
            {navigation.map(({ icon: Icon, key }) => (
              <a
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${key === "dashboard" ? "bg-[var(--surface-raised)] text-white" : "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-white"}`}
                href="#overview"
                key={key}
              >
                <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.7} />
                {navLabels[key]}
              </a>
            ))}
          </nav>
          <div className="mt-auto rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent)]"><Sparkles aria-hidden="true" className="size-3.5" />{copy.testnet}</div>
            <p className="mt-2 text-xs leading-5 text-[var(--muted)]">Every balance and transaction is shown with its verification state.</p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="flex h-[72px] items-center justify-between border-b border-[var(--line)] px-5 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="lg:hidden"><BrandMark /></div>
              <button className="hidden items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-[var(--muted)] hover:bg-[var(--surface)] sm:flex" type="button">
                {copy.organization}<ChevronDown aria-hidden="true" className="size-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button aria-label={copy.search} className="grid size-10 place-items-center rounded-md border border-[var(--line)] text-[var(--muted)] transition-colors hover:border-[#53657f] hover:text-white" type="button"><Search aria-hidden="true" className="size-[18px]" /></button>
              <button aria-label="Notifications" className="grid size-10 place-items-center rounded-md border border-[var(--line)] text-[var(--muted)] transition-colors hover:border-[#53657f] hover:text-white" type="button"><Bell aria-hidden="true" className="size-[18px]" /></button>
              <button aria-label={copy.settings} className="grid size-10 place-items-center rounded-md bg-[var(--accent)] text-[var(--accent-ink)]" type="button"><Settings aria-hidden="true" className="size-[18px]" /></button>
            </div>
          </header>

          <div className="px-5 py-8 sm:px-8 lg:px-10">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold text-[var(--accent)]">{copy.overview}</p>
                <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">{copy.organization}</h1>
              </div>
              <button className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-md bg-white px-4 text-sm font-bold text-[#0a1020] transition-transform hover:-translate-y-0.5 md:self-auto" type="button"><Plus aria-hidden="true" className="size-4" />{copy.openOpportunities}</button>
            </div>

            <section className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label={copy.overview}>
              <MetricCard change="+12.8%" label={copy.totalCommitted} value="$184,620" />
              <MetricCard change="+8.4%" label={copy.escrowBalance} value="$92,840" />
              <MetricCard change="3 actions" label={copy.pendingRelease} value="$26,120" warning />
              <MetricCard change="+2 this month" label={copy.activeAgreements} value="14" />
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(290px,0.72fr)]">
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{copy.capitalFlow}</p>
                    <p className="mt-1 text-sm text-[var(--muted)]">{copy.thisMonth}</p>
                  </div>
                  <button aria-label="More capital flow options" className="grid size-8 place-items-center rounded-md text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-white" type="button"><MoreHorizontal aria-hidden="true" className="size-5" /></button>
                </div>
                <div className="mt-7 h-[210px] rounded-lg border border-[#1d2a3e] bg-[#0a101c] p-4">
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex justify-between text-xs text-[var(--muted)]"><span>$200k</span><span>$100k</span><span>$0</span></div>
                    <svg aria-label="Capital flow increased across the current month" className="h-[128px] w-full overflow-visible" role="img" viewBox="0 0 464 120">
                      <defs>
                        <linearGradient id="capitalArea" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#a3ff6f" stopOpacity="0.27" />
                          <stop offset="100%" stopColor="#a3ff6f" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d={`M ${chartPoints} L 464,120 L 0,120 Z`} fill="url(#capitalArea)" />
                      <polyline fill="none" points={chartPoints} stroke="#a3ff6f" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                      <circle cx="406" cy="18" fill="#a3ff6f" r="5" stroke="#0a101c" strokeWidth="3" />
                    </svg>
                    <div className="flex justify-between text-xs text-[var(--muted)]"><span>01 May</span><span>08 May</span><span>15 May</span><span>22 May</span><span>29 May</span></div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6">
                <p className="text-sm font-semibold text-white">{copy.fundingHealth}</p>
                <div className="mt-6 grid place-items-center">
                  <div className="grid size-40 place-items-center rounded-full border-[13px] border-[var(--accent)] border-r-[#34445a] border-b-[#34445a] text-center">
                    <div><strong className="block text-3xl tracking-[-0.06em] text-white">78%</strong><span className="text-[11px] font-medium uppercase tracking-[0.11em] text-[var(--muted)]">{copy.deposited}</span></div>
                  </div>
                </div>
                <div className="mt-7 space-y-3">
                  <HealthRow color="bg-[var(--accent)]" label={copy.confirmed} value="$92,840" />
                  <HealthRow color="bg-[var(--warning)]" label={copy.inReview} value="$26,120" />
                  <HealthRow color="bg-[#53657f]" label={copy.availableToDeploy} value="$65,660" />
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(290px,0.72fr)]">
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)]">
                <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4 sm:px-6">
                  <p className="text-sm font-semibold text-white">{copy.transactionHistory}</p>
                  <button className="text-xs font-semibold text-[var(--info)] hover:text-white" type="button">View all</button>
                </div>
                <div className="divide-y divide-[var(--line)]">
                  {flowRows.map((row) => (
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_150px_110px_auto] sm:px-6" key={row.label}>
                      <div className="min-w-0"><p className="truncate text-sm font-semibold text-white">{row.label}</p><p className="mt-1 text-xs text-[var(--muted)]">{row.status}</p></div>
                      <span className="hidden text-xs text-[var(--muted)] sm:block">Agreement</span>
                      <span className={`hidden rounded-full px-2 py-1 text-center text-[10px] font-bold uppercase tracking-[0.08em] sm:block ${row.tone === "positive" ? "bg-[#193022] text-[var(--accent)]" : row.tone === "warning" ? "bg-[#392e18] text-[var(--warning)]" : "bg-[#1b2638] text-[#aab9d0]"}`}>{row.status}</span>
                      <span className="text-sm font-bold text-white">{row.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6">
                <p className="text-sm font-semibold text-white">{copy.latestActivity}</p>
                <ol className="mt-5 space-y-5">
                  {activities.map((activity, index) => (
                    <li className="relative flex gap-3" key={activity.action}>
                      {index < activities.length - 1 ? <span className="absolute left-[9px] top-6 h-[calc(100%+7px)] border-l border-[var(--line)]" /> : null}
                      <span className="relative z-10 mt-1 size-[19px] shrink-0 rounded-full border-4 border-[var(--surface)] bg-[var(--accent)]" />
                      <div className="min-w-0"><div className="flex items-baseline justify-between gap-3"><p className="text-sm font-semibold text-white">{activity.action}</p><span className="text-[11px] text-[var(--muted)]">{activity.time}</span></div><p className="mt-1 truncate text-xs text-[var(--muted)]">{activity.detail}</p></div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function MetricCard({ change, label, value, warning = false }: { change: string; label: string; value: string; warning?: boolean }) {
  return (
    <article className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
      <div className="flex items-center justify-between gap-3"><p className="text-sm text-[var(--muted)]">{label}</p><span className={`inline-flex items-center gap-1 text-xs font-bold ${warning ? "text-[var(--warning)]" : "text-[var(--accent)]"}`}>{warning ? <ArrowDownRight aria-hidden="true" className="size-3.5" /> : <ArrowUpRight aria-hidden="true" className="size-3.5" />}{change}</span></div>
      <p className="mt-5 text-3xl font-bold tracking-[-0.06em] text-white">{value}</p>
    </article>
  );
}

function HealthRow({ color, label, value }: { color: string; label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 text-xs"><span className="flex items-center gap-2 text-[var(--muted)]"><span className={`size-2 rounded-full ${color}`} />{label}</span><span className="font-semibold text-white">{value}</span></div>;
}
