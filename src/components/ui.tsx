import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./icons";
import { WhatsAppLink } from "./whatsapp-link";
import { faqs, processSteps, site } from "@/lib/site";
import { projectMessage } from "@/lib/whatsapp";

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}><span />{children}</p>;
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return <><nav aria-label="Breadcrumb" className="breadcrumbs">{all.map((item, i) => <span key={i}>{i > 0 && <span className="breadcrumb-separator">/</span>}{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}</nav><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: all.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.label, ...(item.href ? { item: site.url + item.href } : {}) })) }).replace(/</g, "\\u003c") }} /></>;
}

export function SectionHeading({ eyebrow, title, description, action }: { eyebrow: string; title: ReactNode; description?: string; action?: { label: string; href: string } }) {
  return <div className="section-heading"><div><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div>{action && <Link href={action.href} className="text-link">{action.label}<Icon name="arrow-up-right" size={18} /></Link>}</div>;
}

export function QuoteCTA({ compact = false, service }: { compact?: boolean; service?: string }) {
  return <section className={`quote-cta ${compact ? "compact-cta" : ""}`}><div className="container"><div className="cta-inner"><div><Eyebrow light>YOUR NEXT PROJECT STARTS WITH A CONVERSATION</Eyebrow><h2>Good ideas deserve<br />a clear next step.</h2><p>{service ? "Tell us about your business and what you have in mind. Let’s find the right starting point together." : "Translation, a new website or a more consistent social presence. Let’s talk about what you need."}</p></div><div className="cta-actions"><WhatsAppLink className="button button-white" message={projectMessage({ service: service || "Translation & Digital Services" })}>Let’s talk on WhatsApp<Icon name="arrow-up-right" size={17} /></WhatsAppLink><a href={`mailto:${site.email}`}><Icon name="mail" size={17} />{site.email}</a><span>Your requirements, scope and pricing — clear before we begin.</span></div><div className="cta-orbit" aria-hidden="true"><span /><span /><span /></div></div></div></section>;
}

export function Workflow() {
  return <section className="section workflow-section"><div className="container"><SectionHeading eyebrow="SIMPLE FROM THE FIRST WORD" title="A clear process. A human connection." description="From your first conversation to your agreed deliverables, know what happens next." /><div className="workflow-grid">{processSteps.map((step, i) => <div className="workflow-step" key={step.title}><div className="step-top"><span>0{i + 1}</span><div />{i < 3 && <Icon name="arrow" size={16} />}</div><h3>{step.title}</h3><p>{step.text}</p></div>)}</div></div></section>;
}

export function FAQ({ items = faqs }: { items?: { question: string; answer: string }[] }) {
  return <section className="section faq-section" id="questions"><div className="container faq-layout"><div><Eyebrow>A LITTLE MORE CLARITY</Eyebrow><h2>Good questions.<br />Straightforward answers.</h2><p>Something else on your mind?</p><WhatsAppLink className="text-link whatsapp-text">Ask us on WhatsApp</WhatsAppLink></div><div className="faq-list">{items.map(item => <details key={item.question}><summary>{item.question}<Icon name="plus" size={19} /></summary><p>{item.answer}</p></details>)}</div></div></section>;
}

export function QualityStrip({ digital = false }: { digital?: boolean }) {
  const points = digital ? [
    { icon: "document", title: "A clearly defined scope", text: "Agree on deliverables, responsibilities and pricing before work starts." },
    { icon: "layers", title: "A consistent brand presence", text: "Design, content and language considered around your audience." },
    { icon: "whatsapp", title: "A direct conversation", text: "Discuss your questions and next steps with TranslateWala on WhatsApp." },
  ] : [
    { icon: "users", title: "People, not just words", text: "Human-led translation, informed by your audience and context." },
    { icon: "check", title: "Clarity before commitment", text: "Language pair, scope and pricing confirmed before we begin." },
    { icon: "whatsapp", title: "Personal project coordination", text: "Start with a WhatsApp conversation and a clear understanding of your needs." },
  ];
  return <section className="quality-strip"><div className="container quality-grid">{points.map(point => <div key={point.title}><Icon name={point.icon} size={25} /><span><h3>{point.title}</h3><p>{point.text}</p></span></div>)}</div></section>;
}
