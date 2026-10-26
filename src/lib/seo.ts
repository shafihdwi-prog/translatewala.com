import type { Metadata } from "next";
import { site } from "./site";

export function pageMetadata(title: string, description: string, path = "/", arabic = false): Metadata {
  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: { canonical: `${site.url}${path}` },
    openGraph: { title: `${title} | ${site.name}`, description, url: `${site.url}${path}`, siteName: site.name, locale: arabic ? "ar" : "en_GB", type: "website", images: [{ url: `${site.url}/opengraph-image`, width: 1200, height: 630, alt: "TranslateWala — Indian languages. Gulf connections." }] },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: [`${site.url}/opengraph-image`] },
  };
}
export const baseMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "TranslateWala | Indian Language Translation for the GCC", template: "%s | TranslateWala" },
  description: site.description,
  applicationName: site.name,
  icons: { icon: "/icon.svg" },
    keywords: ["Indian language translation GCC", "Malayalam translation UAE", "Tamil translation Dubai", "Hindi translation Saudi Arabia", "Arabic to Malayalam translation", "website design for GCC businesses", "TranslateWala"],
    category: "Translation and digital services",
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  };
