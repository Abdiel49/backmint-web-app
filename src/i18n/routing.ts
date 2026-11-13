import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  defaultLocale: "es",
  localePrefix: "always",
  locales: ["en", "es"],
});
