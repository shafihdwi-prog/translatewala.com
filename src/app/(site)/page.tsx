import Link from "next/link";
import { Icon } from "@/components/icons";
import { FAQ, QualityStrip, QuoteCTA, SectionHeading, Workflow } from "@/components/ui";
import { LanguageShowcase } from "@/components/language-showcase";
import { MarketSelector } from "@/components/market-selector";
import { HomeHero } from "@/components/home-hero";
import { LanguageMarquee } from "@/components/language-marquee";
import { StatsCounter } from "@/components/stats-counter";
import { countries, faqs, industries, site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { DigitalPackagesTeaser, TranslationUseCases } from "@/components/expanded-content";
import { BlogGrid } from "@/components/blog";
import { HumanServices } from "@/components/human-services";
import { projectMessage } from "@/lib/whatsapp";

export const metadata = { ...pageMetadata("Indian Language Translation for the GCC & Beyond", site.description), alternates: { canonical: site.url, languages: { en: site.url, ar: `${site.url}/ar`, "x-default": site.url } } };

export default function HomePage() {
  return <main id="main-content">
    <HomeHero />
    <LanguageMarquee />
    <LanguageShowcase />
    <HumanServices />
    <StatsCounter />
    <div className="markets-strip"><div className="container"><span className="markets-strip-label"><Icon name="globe" size={20} /><span>GCC MARKETS</span></span><div className="markets-strip-countries">{countries.map(country => <WhatsAppLink key={country.code} className="country-whatsapp-link" message={projectMessage({ country: country.name })} icon={false} aria-label={`Discuss a project for ${country.name} on WhatsApp`}><span className="country-dot" />{country.short}</WhatsAppLink>)}</div></div></div>
    <TranslationUseCases />
    <MarketSelector />
    <DigitalPackagesTeaser />
    <section className="section industries-section"><div className="container"><SectionHeading eyebrow="INDUSTRIES" title="Different work. The same need to be understood." action={{ label: "Explore industries", href: "/industries" }} /><div className="industry-grid">{industries.map(industry => <Link href="/industries" key={industry.name} className="industry-card"><span className="industry-icon"><Icon name={industry.icon} size={24} /></span><div><h3>{industry.name}</h3><p>{industry.description}</p></div><Icon name="arrow-up-right" size={16} /></Link>)}</div></div></section>
    <Workflow /><QualityStrip /><FAQ /><BlogGrid /><QuoteCTA />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [{ "@type": "Organization", name: site.name, url: site.url, logo: `${site.url}/images/translatewala-original.png`, email: site.email, telephone: site.phoneLink, description: site.description, sameAs: ["https://www.translatewala.in/", "https://www.instagram.com/translatewala.in"], areaServed: countries.map(country => ({ "@type": "Country", name: country.name })) }, { "@type": "WebSite", name: site.name, url: site.url, inLanguage: ["en", "ar"], publisher: { "@type": "Organization", name: site.name } }, { "@type": "Service", name: "Indian regional language translation", serviceType: "Translation and localization", provider: { "@type": "Organization", name: site.name }, areaServed: countries.map(country => country.name), url: `${site.url}/translation-services` }, { "@type": "FAQPage", mainEntity: faqs.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }] }) }} />
  </main>;
}
