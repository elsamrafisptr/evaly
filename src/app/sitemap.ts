import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getBaseUrl } from "@/utils/helpers";
import type { MetadataRoute } from "next";
import type { Videos } from "next/dist/lib/metadata/types/metadata-types";

function normalizeBaseUrl(): string {
  const base = getBaseUrl();
  return base.replace(/\/+$/, "");
}

const BASE_URL = normalizeBaseUrl();

type Href = Parameters<typeof getPathname>[0]["href"];
type ChangeFreqType =
  | "yearly"
  | "always"
  | "never"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly";

const DEFAULT_CHANGEFREQ: ChangeFreqType = "yearly";
const DEFAULT_PRIORITY: number | undefined = 0.8;
const DEFAULT_IMAGES: string[] = [];
const DEFAULT_VIDEOS: Videos[] = [];

const ROUTE_CONFIGS: Record<
  string,
  {
    changeFrequency?: ChangeFreqType;
    priority?: number;
    images?: string[];
    videos?: Videos[];
  }
> = {
  "/": {
    changeFrequency: "weekly",
    priority: 1.0,
  },
  "/schools": {
    changeFrequency: "monthly",
    priority: 0.9,
  },
  "/companies": {
    changeFrequency: "monthly",
    priority: 0.9,
  },
  "/pricing": {
    changeFrequency: "monthly",
    priority: 0.75,
  },
};

const ROUTES = Object.keys(ROUTE_CONFIGS);

function buildUrl(href: Href, locale: string): string {
  const path = getPathname({ locale, href });
  return `${BASE_URL}${path}`;
}

function generateEntries(): MetadataRoute.Sitemap {
  const now = new Date();

  return ROUTES.flatMap((href) => {
    const config = ROUTE_CONFIGS[href] || {};

    return routing.locales.map((locale) => {
      const url = buildUrl(href as Href, locale);

      return {
        url,
        lastModified: now,
        changeFrequency: config.changeFrequency ?? DEFAULT_CHANGEFREQ,
        priority: config.priority ?? DEFAULT_PRIORITY,
        images: config.images ?? DEFAULT_IMAGES,
        videos: config.videos ?? DEFAULT_VIDEOS,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((alt) => [alt, buildUrl(href as Href, alt)])
          ),
        },
      };
    });
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  return generateEntries();
}
