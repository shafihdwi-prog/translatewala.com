import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import { Breadcrumbs, Eyebrow, QualityStrip, QuoteCTA } from "@/components/ui";
import { languages } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { projectMessage } from "@/lib/whatsapp";

export const dynamicParams = false;
export function generateStaticParams(){return languages.map(l=>({language:l.slug}));}
export async function generateMetadata({params}:{params:Promise<{language:string}>}) {
  const {language}=await params;const lang=languages.find(l=>l.slug===language);if(!lang)notFound();
  return pageMetadata(`${lang.name} Translation for GCC Audiences`,`${lang.summary} Discuss ${lang.name} translation requirements, audience context, script and file formats for your GCC project.`,`/languages/${lang.slug}`);
}
export default async function LanguageDetail({params}:{params:Promise<{language:string}>}) {
  const {language}=await params;const lang=languages.find(l=>l.slug===language);if(!lang)notFound();
  const message=projectMessage({service:"Translation",language:lang.name});
  return <main id="main-content"><section className="internal-hero"><div className="container"><Breadcrumbs items={[{label:"Our Languages",href:"/languages"},{label:`${lang.name} Translation`}]}/><div className="internal-hero-grid"><div><Eyebrow>{lang.name.toUpperCase()} FOR YOUR GCC AUDIENCE</Eyebrow><h1>{lang.name} translation.<br/><span className="accent-text">Meaningful connections.</span></h1><p>{lang.intro}</p><div className="hero-buttons"><WhatsAppLink message={message}>Discuss your {lang.name} project</WhatsAppLink></div></div><div className="language-detail-script"><span className={`native-language font-${lang.font}`} lang={lang.lang} dir={lang.lang==="ur"?"rtl":"ltr"}>{lang.native}</span><span>{lang.name.toUpperCase()}</span><small>LOCAL LANGUAGE. INTERNATIONAL POSSIBILITIES.</small></div></div></div></section><section className="section"><div className="container"><div className="section-heading"><div><Eyebrow>YOUR WORDS, IN CONTEXT</Eyebrow><h2>{lang.summary}</h2><p className="section-description">A translation is only useful when it works for the person reading it. Start with the use case that fits your project.</p></div></div><div className="content-card-grid three-cards">{lang.uses.map((use,i)=><article className="content-card" key={use.title}><span className="card-icon"><Icon name={["message","document","monitor"][i]} size={25}/></span><span className="card-number">0{i+1}</span><h3>{use.title}</h3><p>{use.text}</p></article>)}</div><div className="language-note"><strong>A detail worth getting right.</strong>{lang.note}</div></div></section><section className="section brief-section"><div className="container brief-layout"><div><Eyebrow>LET’S START WITH A GOOD BRIEF</Eyebrow><h2>What helps us scope your {lang.name} project?</h2><WhatsAppLink message={message} className="button button-outline">Get a quote on WhatsApp</WhatsAppLink></div><ul className="brief-list">{[...lang.brief,"All language combinations, subject suitability and delivery timelines are confirmed individually. No official acceptance or certification is implied."].map(note=><li key={note}><span><Icon name="check" size={16}/></span>{note}</li>)}</ul></div></section><section className="related-section"><div className="container"><span>Continue the conversation</span><Link href="/languages">Explore all languages<Icon name="arrow-up-right" size={17}/></Link><Link href="/arabic-translation">Arabic & Indian languages<Icon name="arrow-up-right" size={17}/></Link><Link href="/gcc-business-translation">For GCC businesses<Icon name="arrow-up-right" size={17}/></Link></div></section><QualityStrip/><QuoteCTA/></main>;
}
