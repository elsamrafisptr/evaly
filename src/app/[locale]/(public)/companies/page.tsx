/* eslint-disable @typescript-eslint/no-unused-vars */
import { Metadata } from "next";
import ComingSoonPage from "../_components/coming-soon";
import { getTranslations } from "next-intl/server";
import { makeAlternates, SITE_URL } from "@/utils/helpers";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "",
  });

  return {
    title: "For Companies - Enterprise Grade Assessments",
    description:
      "Streamline your corporate training with Evaly’s bulk-evaluation workflows, detailed analytics, and automated certification management for your teams.",
    metadataBase: new URL(SITE_URL),
    alternates: makeAlternates("/companies"),
    category: "",
    manifest: "",
    keywords: "",
    openGraph: {
      title: "For Companies — Enterprise Grade Assessments",
      description:
        "Streamline corporate training with bulk workflows, analytics dashboards, and automated certification using Evaly.",
      url: `${SITE_URL}/companies`,
      siteName: "Evaly",
      images: [
        {
          url: `${SITE_URL}/images/og-companies.png`,
          width: 1200,
          height: 630,
          alt: "Evaly Open Graph Image",
        },
      ],
      locale: "en",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "For Companies — Enterprise Grade Assessments",
      description:
        "Streamline corporate training with bulk workflows and analytics dashboards.",
      images: [`${SITE_URL}/images/twitter-companies.png`],
      site: "@evalyapp",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", type: "image/x-icon" },
        { url: "/icons/icon-192x192.png", type: "image/png", sizes: "192x192" },
        {
          url: "/icons/maskable-icon.png",
          type: "image/png",
          sizes: "512x512",
        },
      ],
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
  };
}

export default ComingSoonPage;
