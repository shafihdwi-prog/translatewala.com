import { QuotePage } from "@/components/quote-page";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = {...pageMetadata("Request a Translation or Digital Services Quote","Start directly on WhatsApp or prepare an optional project brief. Discuss translation, website packages and social media services for GCC audiences.","/request-a-quote"),alternates:{canonical:`${site.url}/request-a-quote`,languages:{en:`${site.url}/request-a-quote`,ar:`${site.url}/ar/request-a-quote`,"x-default":`${site.url}/request-a-quote`}}};
export default async function RequestQuote({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}) {
  const query=await searchParams;
  return <QuotePage defaultService={typeof query.service==="string"?query.service:undefined} defaultCountry={typeof query.country==="string"?query.country:undefined} defaultTarget={typeof query.target==="string"?query.target:undefined}/>;
}
