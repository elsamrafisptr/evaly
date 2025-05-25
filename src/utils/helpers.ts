import { routing } from "@/i18n/routing";

export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (
    process.env.VERCEL_ENV === "production" &&
    process.env.VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
};

export const getI18nPath = (url: string, locale: string) => {
  if (locale === routing.defaultLocale) {
    return url;
  }

  return `/${locale}${url}`;
};

export const SITE_URL = getBaseUrl().replace(/\/+$/, "");
export const DEFAULT_IMAGE = `${SITE_URL}/images/og-default.png`;
export const DEFAULT_TWITTER_IMAGE = `${SITE_URL}/images/twitter-default.png`;

export function makeAlternates(path: string) {
  return {
    canonical: `${SITE_URL}${path}`,
    languages: Object.fromEntries(
      routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`])
    ),
  };
}
