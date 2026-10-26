import { languages } from "@/lib/site";

const extras = [
  { name: "Arabic", native: "العربية", lang: "ar", font: "arabic" },
  { name: "English", native: "English", lang: "en", font: "english" },
];

export function LanguageMarquee() {
  const items = [...languages.map(language => ({ name: language.name, native: language.native, lang: language.lang, font: language.font })), ...extras];
  const loop = [...items, ...items];
  return <section className="language-marquee-section" aria-label="Indian and Gulf languages"><div className="language-marquee"><div className="marquee-track">{loop.map((item, index) => <span className="marquee-chip" key={`${item.lang}-${index}`}><span className={`marquee-native font-${item.font}`} lang={item.lang}>{item.native}</span>{item.name}</span>)}</div></div></section>;
}
