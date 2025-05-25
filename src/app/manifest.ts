import { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const locale = "en";

  const t = await getTranslations({
    namespace: "Manifest",
    locale,
  });

  return {
    name: t("name"),
    short_name: t("shortName"),
    description: t("description"),
    start_url: `/${locale}/?source=pwa`,
    scope: `/${locale}/`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#101E33",
    icons: [
      {
        src: "/src/app/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    categories: ["education", "AI", "startup", "utilities"],
  };
}
