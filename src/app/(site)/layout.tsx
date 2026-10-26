import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer, WhatsAppButton } from "@/components/footer";
import { PickHighlighter, themeBootScript } from "@/components/site-enhancers";
import { baseMetadata } from "@/lib/seo";
import "../globals.css";
import "../fonts.css";
import "../enhancements.css";
import "../refresh.css";

export const metadata = baseMetadata;
export default function EnglishLayout({children}: {children:ReactNode}) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeBootScript }} /></head><body><PickHighlighter /><Header/>{children}<Footer/><WhatsAppButton/></body></html>;
}
