import { getBaseUrl } from "@/utils/helpers";
import type { MetadataRoute } from "next";

function normalizeBaseUrl(): string {
  const base = getBaseUrl();
  return base.replace(/\/+$/, "");
}

const BASE_URL = normalizeBaseUrl();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/dashboard/", "/s/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
