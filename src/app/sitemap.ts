import type { MetadataRoute } from "next";
import { languages, mainPageSlugs, site } from "@/lib/site";
import { blogPosts } from "@/lib/blog";

export default function sitemap():MetadataRoute.Sitemap {
  const paths=["/",...mainPageSlugs.map(p=>`/${p}`),"/languages",...languages.map(l=>`/languages/${l.slug}`),"/request-a-quote","/digital-solutions","/packages","/blog",...blogPosts.map(p=>`/blog/${p.slug}`),"/ar","/ar/request-a-quote"];
  return paths.map(path=>({url:`${site.url}${path==="/"?"":path}`,changeFrequency:"monthly" as const,priority:path==="/"?1:path.includes("privacy")||path.includes("terms")?.3:path.includes("request-a-quote")?.7:.8,...(path==="/"||path==="/ar"?{alternates:{languages:{en:site.url,ar:`${site.url}/ar`,"x-default":site.url}}}:path==="/request-a-quote"||path==="/ar/request-a-quote"?{alternates:{languages:{en:`${site.url}/request-a-quote`,ar:`${site.url}/ar/request-a-quote`,"x-default":`${site.url}/request-a-quote`}}}:{})}));
}
