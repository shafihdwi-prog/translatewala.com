import Link from "next/link";
import { QuoteForm, type QuoteDefaults } from "./quote-form";
import { Breadcrumbs, Eyebrow } from "./ui";
import { Icon } from "./icons";
import { WhatsAppLink } from "./whatsapp-link";
import { serviceNames, site } from "@/lib/site";
import { projectMessage } from "@/lib/whatsapp";

export function QuotePage(props: QuoteDefaults) {
  const ar = props.arabic;
  const service = serviceNames.includes(props.defaultService as typeof serviceNames[number]) ? props.defaultService : "Translation & Digital Services";
  const message = projectMessage({ service: ar ? "الترجمة والخدمات الرقمية" : service, arabic: ar });
  return <main id="main-content"><section className="page-heading quote-page-heading"><div className="container">
    {ar ? <nav className="breadcrumbs" aria-label="مسار التصفح"><Link href="/ar">الرئيسية</Link><span>/</span><span aria-current="page">ناقش مشروعك</span></nav> : <Breadcrumbs items={[{ label: "Let’s Talk" }]} />}
    <Eyebrow>{ar ? "تواصل مباشر. خطوة أوضح." : "A DIRECT CONVERSATION. A CLEARER NEXT STEP."}</Eyebrow>
    <h1>{ar ? "أخبرنا بما تحتاجه. ولنتحدث عنه." : "Tell us what you need. Let’s talk it through."}</h1>
    <p>{ar ? "ابدأ مباشرةً عبر واتساب. ناقش الترجمة أو الموقع أو إدارة التواصل الاجتماعي، أو استخدم النموذج الاختياري لتنظيم متطلباتك أولاً." : "Start directly on WhatsApp. Discuss a translation, a website or a social media plan — or use the optional brief builder below to organize your requirements first."}</p>
    <div className="hero-buttons"><WhatsAppLink message={message}>{ar ? "تواصل مع TranslateWala" : "Chat with TranslateWala"}</WhatsAppLink><a className="text-link" href="#project-brief">{ar ? "أو جهّز تفاصيل مشروعك" : "Or prepare a project brief"}<Icon name="arrow" size={17} /></a></div>
    <span className="quote-direct-note"><Icon name="check" size={14} />{ar ? "لا تحتاج إلى تعبئة نموذج لبدء المحادثة." : "No form is required to start a WhatsApp conversation."}</span>
  </div></section><div className="container quote-layout" id="project-brief"><QuoteForm {...props} /><aside className="quote-aside">
    <div className="direct-contact-card"><span><Icon name="whatsapp" size={18} />{ar ? "لنتحدث مباشرةً" : "LET’S KEEP IT PERSONAL"}</span><h2>{ar ? "المحادثة هي أبسط بداية." : "A conversation is the simplest start."}</h2><p>{ar ? "لست متأكداً من اللغة أو الباقة المناسبة؟ أخبرنا عن متطلباتك وسنناقش النطاق والخطوات التالية." : "Not sure about a language pair or the right package? Tell us about your business and we’ll discuss the scope and next steps."}</p><WhatsAppLink message={message}>{ar ? "ابدأ محادثة واتساب" : "Start a WhatsApp conversation"}</WhatsAppLink><small dir="ltr">{site.phone}</small></div>
    <div className="quote-aside-box"><h3>{ar ? "ما الذي يساعدنا على فهم مشروعك؟" : "A helpful first message includes…"}</h3><ul>{(ar ? ["الخدمة أو الباقة التي تفكر فيها.", "اللغات والجمهور المستهدف.", "نوع المحتوى أو الصفحات أو المنصات المطلوبة.", "السوق المقصود والموعد المفضل."] : ["The service or package you’re considering.", "Your languages and intended audience.", "The content, pages or platforms you need.", "Your target market and preferred timeline."]).map(item => <li key={item}><Icon name="check" size={15} />{item}</li>)}</ul></div>
    <div className="quote-aside-box"><h3>{ar ? "تبحث عن باقة رقمية؟" : "Looking for a digital package?"}</h3><p>{ar ? "قارن باقات المواقع وإدارة المحتوى والإعلانات قبل بدء المحادثة." : "Compare website, organic social and paid campaign options, with the inclusions and starting prices clearly explained."}</p><Link href="/packages" className="text-link" style={{ marginTop: 15 }}>{ar ? "استكشف الباقات بالإنجليزية" : "Explore packages & pricing"}<Icon name="arrow-up-right" size={16} /></Link></div>
    <div className="quote-aside-box"><h3>{ar ? "ترجمة للاستخدام الرسمي؟" : "Need an official translation?"}</h3><p>{ar ? "حدد الجهة المستلمة والدولة. يجب التحقق من متطلبات القبول والاعتماد قبل تأكيد الخدمة." : "Mention the receiving authority and country. Certification, legal translator eligibility and acceptance requirements are checked before the work is agreed."}</p></div>
    <div className="aside-contact-list"><a href={`mailto:${site.email}`}><span><Icon name="mail" size={18} /></span><bdi>{site.email}</bdi></a></div>
  </aside></div></main>;
}
