/* eslint-disable @typescript-eslint/no-unused-vars */
import { getBaseUrl, makeAlternates, SITE_URL } from "@/utils/helpers";
import ComingSoonPage from "../_components/coming-soon";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

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
    title: "For Schools — Engage & Certify Your Students",
    description:
      "Empower educators with customizable quizzes, progress tracking, and certification paths—all in one educator-focused assessment platform.",
    metadataBase: new URL(SITE_URL),
    alternates: makeAlternates("/schools"),
    category: "",
    manifest: "",
    keywords: "",
    openGraph: {
      title: "For Schools — Engage & Certify Your Students",
      description:
        "Empower educators with quizzes, progress analytics, and certification management in an easy-to-use platform.",
      url: `${SITE_URL}/schools`,
      siteName: "Evaly",
      images: [
        {
          url: `${SITE_URL}/images/og-schools.png`,
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
      title: "For Schools — Engage & Certify Your Students",
      description:
        "Empower educators with quizzes, progress analytics, and certification management.",
      images: [`${SITE_URL}/images/twitter-schools.png`],
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
