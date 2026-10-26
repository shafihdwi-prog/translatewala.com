import { Breadcrumbs } from "@/components/ui";
import { BlogIndex } from "@/components/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Journal | TranslateWala", "Practical writing on Indian language translation, multilingual websites and social content for GCC audiences.", "/blog");

export default function BlogPage() {
  return <main id="main-content"><section className="page-heading journal-heading"><div className="container"><Breadcrumbs items={[{ label: "Journal" }]} /><p className="eyebrow"><span />TranslateWala Journal</p><h1>Clear thinking for cross-border communication.</h1><p>Language, websites and social content — written for businesses working between India and the Gulf.</p></div></section><section className="section"><div className="container"><BlogIndex /></div></section></main>;
}
