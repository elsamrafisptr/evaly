import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/components/provider";
import { Toaster } from "@/components/ui/sonner";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getBaseUrl } from "@/utils/helpers";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

  console.log(t);

  return {
    title: {
      default: "Evaly - Smarter Evaluations, Better Outcomes",
      template: "%s | Evaly",
      absolute: "Evaly - Smarter Evaluations, Better Outcomes",
    },
    description:
      "Evaly is an innovative assessment solution designed to simplify the creation of customized evaluations, knowledge checks, and certifications.",
    metadataBase: new URL(getBaseUrl().replace(/\/+$/, "")),
    alternates: {
      canonical: new URL(getBaseUrl().replace(/\/+$/, "")),
      languages: Object.fromEntries(
        routing.locales.map((lang) => [lang, `${getBaseUrl()}/${lang}`])
      ),
    },
    openGraph: {
      title: "Evaly – Smarter Evaluations, Better Outcomes",
      description:
        "Design and deliver impactful knowledge checks and evaluations with Evaly’s intuitive platform.",
      url: new URL(getBaseUrl().replace(/\/+$/, "")),
      siteName: "Evaly",
      images: [
        {
          url: `${getBaseUrl()}/og-image.png`,
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
      title: "Evaly – Smarter Evaluations, Better Outcomes",
      description:
        "Create customizable evaluations and tests that drive learning outcomes and certifications.",
      images: [`${getBaseUrl()}/twitter-image.png`],
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

// Generate static params for all locales and for all pages
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale as never)) {
    notFound();
  }
  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable}`}
    >
      {/* <ReactScan /> */}
      <body className={`antialiased min-h-svh flex flex-col`}>
        <Provider>
          <NextIntlClientProvider messages={messages}>
            {children}
            <Toaster />
          </NextIntlClientProvider>
        </Provider>
      </body>
    </html>
  );
}
