import { getTranslations, setRequestLocale } from "next-intl/server";
import { LandingPage } from "@/widgets/landing-page/landing-page";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const translations = await getTranslations("Landing");

  return (
    <LandingPage
      copy={{
        explore: translations("explore"),
        eyebrow: translations("eyebrow"),
        fund: translations("fund"),
        headline: translations("headline"),
        statement: translations("statement"),
        testnet: translations("testnet"),
      }}
    />
  );
}
