import { QuotePage } from "@/components/quote-page";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = {...pageMetadata("اطلب عرض سعر للترجمة والخدمات الرقمية","شاركنا لغات المشروع والسوق المستهدف والموعد المفضل للحصول على عرض يناسب احتياجاتك.","/ar/request-a-quote",true),alternates:{canonical:`${site.url}/ar/request-a-quote`,languages:{en:`${site.url}/request-a-quote`,ar:`${site.url}/ar/request-a-quote`,"x-default":`${site.url}/request-a-quote`}}};
export default async function ArabicQuote({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}) {
  const query=await searchParams;
  return <QuotePage arabic defaultService={typeof query.service==="string"?query.service:undefined} defaultCountry={typeof query.country==="string"?query.country:undefined} defaultTarget={typeof query.target==="string"?query.target:undefined}/>;
}
