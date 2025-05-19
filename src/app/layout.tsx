import { generateOgImageUrl } from "@/lib/metadata";
import { sanityFetch } from "@/sanity/lib/live";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  // fetch data
  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  return {
    title: {
      template: `%s | ${settings?.seo?.seoTitle}`,
      default: settings?.seo?.seoTitle, // a default is required when creating a template
    },
    description: settings?.seo?.seoDescription,
    openGraph: {
      images: await generateOgImageUrl(settings?.seo?.seoImage),
    },

    icons: {
      shortcut: { url: "/favicon.svg", type: "image/x-icon" },
      icon: [
        { url: "/favicon.ico", type: "image/x-icon" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
        { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
        {
          url: "/favicon-196x196.png",
          type: "image/png",
          sizes: "196x196",
        },
      ],
      apple: [
        { url: "/favicon-57x57.png", sizes: "57x57", type: "image/png" },
        { url: "/favicon-60x60.png", sizes: "60x60", type: "image/png" },
        { url: "/favicon-72x72.png", sizes: "72x72", type: "image/png" },
        { url: "/favicon-76x76.png", sizes: "76x76", type: "image/png" },
        {
          url: "/favicon-114x114.png",
          sizes: "114x114",
          type: "image/png",
        },
        {
          url: "/favicon-120x120.png",
          sizes: "120x120",
          type: "image/png",
        },
        {
          url: "/favicon-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          url: "/favicon-152x152.png",
          sizes: "152x152",
          type: "image/png",
        },
        {
          url: "/favicon-180x180.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
