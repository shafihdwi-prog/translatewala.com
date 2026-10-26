import { notFound } from "next/navigation";
import { ServicePage } from "@/components/service-page";
import { ContactPage } from "@/components/contact-page";
import { LegalPage } from "@/components/legal-page";
import { contentPages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { mainPageSlugs } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams(){return mainPageSlugs.map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;
  if(slug==="contact")return pageMetadata("Contact TranslateWala","Contact TranslateWala by verified email or WhatsApp. Discuss your translation, website or social media project for GCC and international audiences.","/contact");
  if(slug==="privacy-policy")return pageMetadata("Privacy Policy","How TranslateWala handles text project briefs and your chosen WhatsApp or email handoff. Read about privacy choices, data storage and external services.","/privacy-policy");
  if(slug==="terms-and-conditions")return pageMetadata("Terms & Conditions","Terms for using the TranslateWala international website and requesting translation or digital services. Projects are subject to a separately agreed scope.","/terms-and-conditions");
  const page=contentPages[slug];if(!page)notFound();
  return pageMetadata(page.metaTitle,page.description,`/${slug}`);
}
export default async function InformationPage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;
  if(slug==="contact")return <ContactPage/>;
  if(slug==="privacy-policy"||slug==="terms-and-conditions")return <LegalPage privacy={slug==="privacy-policy"}/>;
  const page=contentPages[slug];if(!page)notFound();
  return <ServicePage page={page} slug={slug}/>;
}
