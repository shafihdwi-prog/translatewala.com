import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer, WhatsAppButton } from "@/components/footer";
import { PickHighlighter, themeBootScript } from "@/components/site-enhancers";
import { baseMetadata } from "@/lib/seo";
import "../globals.css";
import "../fonts.css";
import "../enhancements.css";
import "../refresh.css";

export const metadata = {...baseMetadata,title:{default:"TranslateWala | ترجمة اللغات الهندية لأسواق الخليج",template:"%s | TranslateWala"}};
export default function ArabicLayout({children}: {children:ReactNode}) {
  return <html lang="ar" dir="rtl" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeBootScript }} /></head><body><PickHighlighter /><Header arabic/>{children}<Footer arabic/><WhatsAppButton arabic/></body></html>;
}
