import Link from "next/link";


const builds = [
  { name: "Company website", detail: "Home, about, services and contact. The usual first site for a Gulf or India-linked business.", stack: "Custom pages" },
  { name: "WooCommerce shop", detail: "Product catalogue, cart, checkout and a simple admin. Payment-gateway fees stay separate.", stack: "WooCommerce" },
  { name: "Service landing page", detail: "One clear offer, one enquiry path, and a WhatsApp button for people who would rather talk.", stack: "Landing page" },
  { name: "Clinic or institute site", detail: "Services, timings, location and appointment or enquiry details, written so visitors can act.", stack: "Information site" },
  { name: "Arabic and English site", detail: "Two language versions, with Arabic set right to left. Translation is scoped on its own.", stack: "Bilingual" },
  { name: "Catalogue without checkout", detail: "Products or services listed clearly when you need enquiries, not an online payment flow.", stack: "Catalogue" },
];

export function WebsiteBuilds() {
  return <section className="section site-builds"><div className="container">
    <div className="showcase-heading"><div><p className="eyebrow"><span />What we actually build</p><h2>Real website types.<br />Not a vague “digital solution”.</h2><p>These are the kinds of sites we scope. We do not show invented client logos. If your brief is different, we say so before quoting.</p></div><Link href="/packages" className="text-link">See starting prices</Link></div>
    <div className="build-grid">{builds.map(item => <article key={item.name}><small>{item.stack}</small><h3>{item.name}</h3><p>{item.detail}</p></article>)}</div>
  </div></section>;
}
