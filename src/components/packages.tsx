"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { Eyebrow } from "./ui";
import { WhatsAppLink } from "./whatsapp-link";
import { projectMessage } from "@/lib/whatsapp";
import { comparisonRows, formatPackagePrice, socialPackages, websitePackages, type DigitalPackage, type PackageCategory } from "@/lib/packages";

export function PackageCard({ plan }: { plan: DigitalPackage }) {
  const service = plan.category === "websites" ? "Web Design" : "Social Media Management";
  return (
    <article className={`package-card ${plan.featured ? "package-featured" : ""}`} data-package={plan.id}>
      {plan.badge && <span className="package-badge">{plan.badge}</span>}
      <div className="package-card-head">
        <span className="package-symbol"><Icon name={plan.category === "websites" ? "monitor" : "social"} size={23} /></span>
        <span className="package-label">{plan.label}</span>
      </div>
      <h3>{plan.name}</h3>
      <p className="package-description">{plan.description}</p>
      <div className="package-price">
        {plan.price !== null ? <><span className="price-prefix">{plan.category === "social" ? "MONTHLY FEE STARTS AT" : "PROJECT STARTS AT"}</span><strong><span>₹</span>{plan.price.toLocaleString("en-IN")}</strong><span className="price-period">{plan.category === "social" ? "Indian rupees per month. Ad spend is extra." : "Indian rupees. One website project, not a monthly fee."}</span><span className="price-plain">You pay the agreed price after we confirm pages, languages and extras.</span></> : <><span className="price-prefix">PRICE SET AFTER A SHORT BRIEF</span><strong className="custom-price">Custom quote</strong><span className="price-period">No fixed monthly fee until the scope is written down.</span></>}
      </div>
      <WhatsAppLink className={`button package-button ${plan.featured ? "button-white" : "button-outline"}`} message={projectMessage({ service, packageName: plan.name, price: formatPackagePrice(plan) })} aria-label={`Discuss ${plan.name} on WhatsApp`}>Discuss this package<Icon name="arrow-up-right" size={15} /></WhatsAppLink>
      <div className="package-best-for"><strong>A GOOD FIT FOR</strong><p>{plan.bestFor}</p></div>
      <ul className="package-features">{plan.features.map(feature => <li key={feature}><Icon name="check" size={15} /><span>{feature}</span></li>)}</ul>
      <p className="package-note">{plan.note}</p>
    </article>
  );
}

export function PackageComparison({ category }: { category: PackageCategory }) {
  const plans = category === "websites" ? websitePackages : socialPackages;
  return <details className="package-comparison"><summary><span><Icon name="layers" size={19} />Compare the package details</span><Icon name="plus" size={19} /></summary><div className="comparison-scroll" role="region" aria-label={`${category === "websites" ? "Website" : "Social media"} package comparison`} tabIndex={0}><table><caption>Compare the published starting packages. Your final scope is confirmed before work begins.</caption><thead><tr><th scope="col">What’s included</th>{plans.map(p => <th scope="col" key={p.id}>{p.name}</th>)}</tr></thead><tbody>{comparisonRows[category].map(row => <tr key={row.label}><th scope="row">{row.label}</th>{row.values.map((value, i) => <td key={i}>{value}</td>)}</tr>)}</tbody></table></div></details>;
}

export function PricingSection({ category, compact = false }: { category: PackageCategory; compact?: boolean }) {
  const isWeb = category === "websites";
  const plans = isWeb ? websitePackages : socialPackages;
  return <section className={`section pricing-section ${compact ? "pricing-compact" : ""}`} id="packages"><div className="container">
    <div className="section-heading pricing-heading"><div><Eyebrow>{isWeb ? "WEBSITE DESIGN PACKAGES" : "SOCIAL MEDIA PACKAGES"}</Eyebrow><h2>{isWeb ? <>A website for your next<br />stage of business.</> : <>A more consistent presence.<br />A plan that fits.</>}</h2><p className="section-description">{isWeb ? "From your first business website to a more ambitious digital experience. Compare the starting packages, then refine the details with us." : "Choose organic content management, a paid campaign scope or a coordinated custom plan. See the difference before you decide."}</p></div><span className="pricing-currency"><Icon name="info" size={16} />All prices in INR</span></div>
    <div className="package-grid">{plans.map(plan => <PackageCard key={plan.id} plan={plan} />)}</div>
    <PricingNote category={category} />
    <PackageComparison category={category} />
    <PackageHelp />
  </div></section>;
}

export function PricingNote({ category }: { category: PackageCategory }) {
  return <div className="pricing-note"><Icon name="info" size={17} /><p><strong>Clear starting prices. No hidden assumptions.</strong> These are the published INR starting packages from TranslateWala’s India service catalogue. International scope, billing currency, taxes and final pricing are confirmed in your proposal. {category === "websites" ? "*Domain/hosting terms and renewals are confirmed separately. Premium assets, plugins, payment-provider fees, maintenance and multilingual work may add to the scope." : "Advertising spend is not included in any package. Language adaptation, production, account access and approval responsibilities are agreed before work begins."}</p></div>;
}

export function PackageHelp() {
  return <div className="package-help"><span className="package-help-icon"><Icon name="message" size={25} /></span><div><h3>Not sure which package is right?</h3><p>Tell us about your business. We’ll help you choose a sensible starting point.</p></div><WhatsAppLink message="Hello TranslateWala, I’d like help choosing between your website design and social media packages. Please help me find the right fit for my business.">Help me choose</WhatsAppLink></div>;
}

export function PackageExplorer({ initialCategory = "websites" }: { initialCategory?: PackageCategory }) {
  const [category, setCategory] = useState<PackageCategory>(initialCategory);
  function choose(next: PackageCategory) {
    setCategory(next);
    const url = new URL(window.location.href);
    url.searchParams.set("service", next);
    window.history.replaceState(null, "", url);
  }
  function keyboard(event: KeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? "websites" : event.key === "End" ? "social" : category === "websites" ? "social" : "websites";
    choose(next);
    document.getElementById(`package-tab-${next}`)?.focus();
  }
  const plans = category === "websites" ? websitePackages : socialPackages;
  return <section className="section pricing-section packages-directory" id="plans"><div className="container"><div className="package-tabs-row"><div role="tablist" aria-label="Choose a digital service" className="package-tabs">{(["websites", "social"] as const).map(item => <button key={item} id={`package-tab-${item}`} role="tab" aria-selected={category === item} aria-controls="package-panel" tabIndex={category === item ? 0 : -1} onClick={() => choose(item)} onKeyDown={keyboard}><Icon name={item === "websites" ? "monitor" : "social"} size={19} /><span>{item === "websites" ? "Website Design" : "Social Media Management"}</span><small>4 packages</small></button>)}</div><span className="pricing-currency">Starting prices in INR</span></div><div id="package-panel" role="tabpanel" aria-labelledby={`package-tab-${category}`} tabIndex={0}><div className="package-category-heading"><div><h2>{category === "websites" ? "Your business deserves a better digital home." : "Make your presence more purposeful."}</h2><p>{category === "websites" ? "Compare business websites, professional experiences and e-commerce projects." : "Organic content and paid campaigns are clearly separated, so you know what you’re choosing."}</p></div><Link href={category === "websites" ? "/web-design" : "/social-media-management"} className="text-link">Explore the service<Icon name="arrow-up-right" size={17} /></Link></div><div className="package-grid">{plans.map(plan => <PackageCard key={plan.id} plan={plan} />)}</div><PricingNote category={category} /><PackageComparison key={category} category={category} /></div><PackageHelp /></div></section>;
}
