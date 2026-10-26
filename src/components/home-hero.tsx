import Image from "next/image";
import Link from "next/link";
import { Icon } from "./icons";
import { TypingHeadline } from "./typing-headline";
import { WhatsAppLink } from "./whatsapp-link";
import { projectMessage } from "@/lib/whatsapp";

const spoken = [
  { text: "മലയാളം", name: "Malayalam", lang: "ml", font: "malayalam" },
  { text: "தமிழ்", name: "Tamil", lang: "ta", font: "tamil" },
  { text: "हिन्दी", name: "Hindi", lang: "hi", font: "devanagari" },
  { text: "العربية", name: "Arabic", lang: "ar", font: "arabic" },
  { text: "English", name: "English", lang: "en", font: "english" },
];

export function HomeHero() {
  return <section className="cinema-hero"><Image src="/images/dubai-skyline.webp" alt="" fill priority sizes="100vw" className="cinema-photo" /><div className="cinema-shade" /><div className="container cinema-content"><p className="cinema-kicker"><span />Indian languages. Then the Gulf.</p><h1><span className="sr-only">Indian language translation for the GCC and beyond.</span><TypingHeadline /></h1><div className="hero-language-line" aria-label="Malayalam, Tamil, Hindi, Arabic and English">{spoken.map(item => <span key={item.name}><b className={`font-${item.font}`} lang={item.lang}>{item.text}</b>{item.name}</span>)}</div><p className="hero-reach">Written for the people your business needs to reach.</p><div className="hero-buttons"><WhatsAppLink message={projectMessage({ service: "Translation" })}>Get a Quote on WhatsApp</WhatsAppLink><Link href="/languages" className="button button-white">Explore languages<Icon name="arrow" size={16} /></Link></div></div></section>;
}
