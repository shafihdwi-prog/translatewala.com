import Link from "next/link";
import { languages } from "@/lib/site";
import { Icon } from "./icons";

export function LanguageShowcase() {
  return <section className="section language-showcase" id="languages"><div className="container">
    <div className="showcase-heading"><div><p className="eyebrow"><span />Indian languages first</p><h2>The language comes first.<br />Everything else follows.</h2><p>Malayalam, Tamil, Hindi and the other regional languages are the heart of TranslateWala. Websites and social media support that message — they do not replace it.</p></div><Link href="/languages" className="text-link">See every language<Icon name="arrow-up-right" size={16} /></Link></div>
    <div className="showcase-grid">{languages.map((language, index) => <Link href={`/languages/${language.slug}`} className={index === 0 ? "showcase-card showcase-lead" : "showcase-card"} key={language.slug}><span className="showcase-index">0{index + 1}</span><span className={`showcase-script font-${language.font}`} lang={language.lang}>{language.native}</span><span className="showcase-name">{language.name}<Icon name="arrow-up-right" size={15} /></span><small>{language.summary}</small></Link>)}<Link href="/request-a-quote" className="showcase-card showcase-more"><span className="showcase-script">+</span><span className="showcase-name">Another Indian language?</span><small>Ask us. Every language pair is confirmed before work begins.</small></Link></div>
  </div></section>;
}
