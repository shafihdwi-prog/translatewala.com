import Link from "next/link";
import Image from "next/image";
import { type ContentPage } from "@/lib/pages";
import { Breadcrumbs, Eyebrow, FAQ, QualityStrip, QuoteCTA, Workflow } from "./ui";
import { Icon } from "./icons";
import { LanguageExplorer } from "./language-explorer";
import { MarketSelector } from "./market-selector";
import { WhatsAppLink } from "./whatsapp-link";
import { PricingSection } from "./packages";
import { DigitalWorkflow, MultilingualDigitalSection, ServiceDeepDive, TranslationUseCases, WhoWeWorkWith } from "./expanded-content";
import { projectMessage } from "@/lib/whatsapp";
import { socialDetails, websiteDetails } from "@/lib/service-details";
import { HumanServices } from "./human-services";
import { WebsiteBuilds } from "./website-builds";

function ServiceArtwork({ kind }: { kind: string }) {
  if (kind === "monitor") return <div className="service-artwork web-artwork" aria-hidden="true"><div className="mini-browser"><div className="browser-bar"><i /><i /><i /><span>yourbrand.com</span></div><div className="mini-nav"><b>yourbrand<span>®</span></b><span>About &nbsp; Services &nbsp; Contact</span></div><div className="mini-hero"><small>A NEW PERSPECTIVE</small><strong>Your business.<br /><em>Beautifully connected.</em></strong><span className="mini-button">Let’s connect ↗</span></div><div className="mini-bottom"><span /><span /><span /></div></div><span className="artwork-tag"><Icon name="globe" size={15} />Made for a multilingual world</span></div>;
  if (kind === "social") return <div className="service-artwork social-artwork" aria-hidden="true"><div className="social-preview"><div className="social-profile"><span>B</span><b>yourbrand<small>Here to make a connection.</small></b><i>•••</i></div><div className="social-post"><small>MORE THAN A MESSAGE.</small><strong>Make it<br /><em>meaningful.</em></strong><span>yourbrand ↗</span></div><div className="social-reactions">♡ &nbsp; ◯ &nbsp; ↗<span>▱</span></div></div><span className="artwork-tag"><Icon name="check" size={15} />Your brand. A consistent voice.</span></div>;
  return <div className="service-artwork translation-artwork" aria-hidden="true"><div className="script-orbit"><span className="orbit-script orbit-script-one font-arabic" lang="ar">مرحبا</span><span className="orbit-script orbit-script-two font-malayalam" lang="ml">നമസ്കാരം</span><span className="orbit-script orbit-script-three font-tamil" lang="ta">வணக்கம்</span><span className="orbit-script orbit-script-four font-devanagari" lang="hi">नमस्ते</span><div className="orbit-center"><Icon name={kind} size={53} /></div><span className="orbit-label">ONE MESSAGE.<br />MANY POSSIBILITIES.</span></div></div>;
}

export function ServicePage({ page, slug }: { page: ContentPage; slug: string }) {
  const digital = slug === "web-design" || slug === "social-media-management";
  const category = slug === "web-design" ? "websites" : "social";
  const message = projectMessage({ service: page.service || (slug === "about" ? "Translation & Digital Services" : "Translation") });
  return <main id="main-content">
    {slug === "about" && <div className="container" style={{paddingTop:28}}><div className="page-visual"><Image src="/images/digital-studio.webp" alt="A workspace used to plan language and digital projects" fill sizes="100vw" /><span>About TranslateWala — language first, digital when you need it.</span></div></div>}<section className="internal-hero"><div className="container"><Breadcrumbs items={digital ? [{ label: "Digital Solutions", href: "/digital-solutions" }, { label: page.service === "Web Design" ? "Website Design" : "Social Media Management" }] : [{ label: page.eyebrow.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) }]} /><div className="internal-hero-grid"><div><Eyebrow>{page.eyebrow}</Eyebrow><h1>{page.title.split("\n").map((line, i) => <span key={line} className={i === 1 ? "accent-text" : ""}>{line}{i === 0 && <br />}</span>)}</h1><p>{page.intro}</p><div className="hero-buttons"><WhatsAppLink message={message}>{digital ? "Discuss your project" : "Get a Quote on WhatsApp"}</WhatsAppLink><a href={digital ? "#packages" : "#explore"} className={digital ? "button button-outline" : "text-link"}>{digital ? "Explore packages" : "Explore the possibilities"}<Icon name={digital ? "arrow-up-right" : "arrow"} size={17} /></a></div><div className="hero-whatsapp-note"><Icon name="check" size={14} />A direct conversation. An individually confirmed scope.</div></div><ServiceArtwork kind={page.icon} /></div></div></section>
    {digital && <nav className="service-jump-nav" aria-label="On this service page"><div className="container"><div className="service-jump-links"><a href="#explore">Service overview</a><a href="#packages">Packages & pricing</a><a href="#how-we-work">How we work</a><a href="#questions">Your questions</a></div><span className="service-starting-price">Starting at <strong>{category === "websites" ? "₹7,999" : "₹1,999"}</strong><small>INR {category === "social" ? "/ month" : "/ project"}</small></span></div></nav>}
    <section className="section" id="explore"><div className="container"><div className="section-heading"><div><Eyebrow>BUILT AROUND YOUR NEEDS</Eyebrow><h2>{page.sectionTitle}</h2><p className="section-description wide-description">{page.sectionIntro}</p></div></div><div className={`content-card-grid ${page.cards.length === 3 ? "three-cards" : ""}`}>{page.cards.map((card, i) => <article className="content-card" key={card.title}><span className="card-icon"><Icon name={card.icon} size={26} /></span><span className="card-number">0{i + 1}</span><h3>{card.title}</h3><p>{card.text}</p></article>)}</div></div></section>
    {digital && <><WebsiteBuilds /><PricingSection category={category} /><ServiceDeepDive kind={category} /><MultilingualDigitalSection /></>}
    {(slug === "indian-language-translation" || slug === "translation-services") && <section className="section section-tinted"><div className="container"><div className="section-heading"><div><Eyebrow>LOCAL LANGUAGES. GLOBAL REACH.</Eyebrow><h2>Find the language that feels like home.</h2></div><Link href="/languages" className="text-link">Explore all languages<Icon name="arrow-up-right" size={17} /></Link></div><LanguageExplorer compact /></div></section>}
    {slug === "translation-services" && <><HumanServices /><TranslationUseCases /></>}
    {(slug === "about" || slug === "industries") && <WhoWeWorkWith />}
    {slug === "gcc-business-translation" && <MarketSelector />}
    <section className="section brief-section" id="language-pairs"><div className="container brief-layout"><div><Eyebrow>A BETTER BRIEF. A BETTER START.</Eyebrow><h2>{page.notesTitle}</h2><WhatsAppLink className="button button-outline" message={message}>Discuss your requirements</WhatsAppLink></div><ul className="brief-list">{page.notes.map(note => <li key={note}><span><Icon name="check" size={17} /></span>{note}</li>)}</ul></div></section>
    {page.related && <section className="related-section"><div className="container"><span>Keep exploring</span>{page.related.map(link => <Link key={link.href} href={link.href}>{link.title}<Icon name="arrow-up-right" size={17} /></Link>)}</div></section>}
    {digital ? <DigitalWorkflow kind={category} /> : slug !== "about" ? <Workflow /> : null}
    <QualityStrip digital={digital} />
    {digital ? <FAQ items={category === "websites" ? websiteDetails.faqs : socialDetails.faqs} /> : slug === "translation-services" ? <FAQ /> : null}
    <QuoteCTA service={page.service} />
  </main>;
}
