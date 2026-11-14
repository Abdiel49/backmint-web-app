import { getTranslations, setRequestLocale } from "next-intl/server";
import { DashboardOverview } from "@/widgets/dashboard-overview/dashboard-overview";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const translations = await getTranslations("Dashboard");

  return (
    <DashboardOverview
      copy={{
        activeAgreements: translations("activeAgreements"),
        availableToDeploy: translations("availableToDeploy"),
        capitalFlow: translations("capitalFlow"),
        confirmed: translations("confirmed"),
        dashboard: translations("dashboard"),
        deposited: translations("deposited"),
        escrowBalance: translations("escrowBalance"),
        fundingHealth: translations("fundingHealth"),
        fundingPipeline: translations("fundingPipeline"),
        inReview: translations("inReview"),
        latestActivity: translations("latestActivity"),
        menu: translations("menu"),
        milestones: translations("milestones"),
        openOpportunities: translations("openOpportunities"),
        organization: translations("organization"),
        overview: translations("overview"),
        pendingRelease: translations("pendingRelease"),
        projects: translations("projects"),
        reports: translations("reports"),
        search: translations("search"),
        settings: translations("settings"),
        testnet: translations("testnet"),
        thisMonth: translations("thisMonth"),
        totalCommitted: translations("totalCommitted"),
        transactionHistory: translations("transactionHistory"),
      }}
    />
  );
}
