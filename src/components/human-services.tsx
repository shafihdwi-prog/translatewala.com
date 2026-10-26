import { WhatsAppLink } from "./whatsapp-link";
import { projectMessage } from "@/lib/whatsapp";

export const humanServices = [
  { title: "Medical translation", text: "Reports, prescriptions and discharge summaries, with medical terms handled carefully.", tag: "Documents" },
  { title: "Legal translation", text: "Agreements, affidavits and company documents for the use you specify.", tag: "Documents" },
  { title: "Certificate translation", text: "Birth, death, marriage, education and medical certificates.", tag: "Personal" },
  { title: "Banking & financial translation", text: "Bank statements, salary slips and other financial papers, with figures checked.", tag: "Finance" },
  { title: "Notary & attestation support", text: "Guidance for notary and MEA India attestation steps. We do not replace the authority.", tag: "Support" },
  { title: "FRRO, visa & exit-permit support", text: "Help with visa papers, FRRO registration and GCC exit-permit document preparation.", tag: "Support" },
  { title: "Design & Arabization", text: "Signboards, logos, banners, brochures and labels adapted for Arabic or Urdu readers.", tag: "Design" },
  { title: "Ticket booking support", text: "Flight and train ticket booking assistance when you need a hand with the process.", tag: "Travel" },
  { title: "Chat & voice-over support", text: "Customer chat support and voice-over for Arabic, English or an agreed Indian language.", tag: "Media" },
];

export function HumanServices() {
  return <section className="section human-services" id="human-services"><div className="container">
    <div className="showcase-heading"><div><p className="eyebrow"><span />Human translation services</p><h2>Documents, support and design.<br />Listed the way we actually work.</h2><p>Taken from TranslateWala’s human-translation service list. Send the document type and the country of use. We confirm the scope before calling it official.</p></div></div>
    <div className="service-table">{humanServices.map(service => <article key={service.title}><div><small>{service.tag}</small><h3>{service.title}</h3></div><p>{service.text}</p><WhatsAppLink className="text-link" icon={false} message={projectMessage({ service: service.title })}>Discuss</WhatsAppLink></article>)}</div>
  </div></section>;
}
