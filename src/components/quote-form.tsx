"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { countryNames, selectableLanguages, serviceNames, site } from "@/lib/site";
import { validateInquiry, type InquiryErrors, type InquiryValues } from "@/lib/inquiry";
import { Icon } from "./icons";
import { WhatsAppLink } from "./whatsapp-link";
import { projectMessage } from "@/lib/whatsapp";

const arabicNames: Record<string, string> = { "Translation": "الترجمة", "Web Design": "تصميم المواقع", "Social Media Management": "إدارة التواصل الاجتماعي", "Arabic": "العربية", "English": "الإنجليزية", "Malayalam": "المالايالامية", "Tamil": "التاميلية", "Hindi": "الهندية", "Telugu": "التيلوغوية", "Kannada": "الكانادية", "Bengali": "البنغالية", "Urdu": "الأردية", "Punjabi": "البنجابية", "Marathi": "الماراثية", "Other / please advise": "لغة أخرى / أحتاج إلى المشورة", "United Arab Emirates": "الإمارات العربية المتحدة", "Saudi Arabia": "المملكة العربية السعودية", "Qatar": "قطر", "Kuwait": "الكويت", "Oman": "عُمان", "Bahrain": "البحرين", "India": "الهند", "Other international market": "سوق دولي آخر" };
export type QuoteDefaults = { defaultService?: string; defaultCountry?: string; defaultTarget?: string; arabic?: boolean };

export function QuoteForm({ defaultService = "Translation", defaultCountry = "", defaultTarget = "", arabic = false }: QuoteDefaults) {
  const [service, setService] = useState<string>(serviceNames.includes(defaultService as typeof serviceNames[number]) ? defaultService : "Translation");
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [serverError, setServerError] = useState("");
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState<{ reference: string; values: InquiryValues } | null>(null);
  const requestKey = useRef("");
  const requestPayload = useRef("");
  const successRef = useRef<HTMLDivElement>(null);
  const t = (en: string, ar: string) => arabic ? ar : en;
  const label = (name: string) => arabic ? arabicNames[name] || name : name;
  const error = (name: keyof InquiryValues) => errors[name] ? <p className="field-error" id={`${name}-error`}>{errors[name]}</p> : null;
  const props = (name: keyof InquiryValues) => ({ id: name, name, "aria-invalid": !!errors[name], "aria-describedby": errors[name] ? `${name}-error` : undefined });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setServerError("");
    const data = new FormData(event.currentTarget);
    if (!requestKey.current) requestKey.current = crypto.randomUUID();
    const value = (key: string) => String(data.get(key) || "").trim();
    const values: InquiryValues = { name: value("name"), email: value("email"), company: value("company"), service, sourceLanguage: service === "Translation" ? value("sourceLanguage") : "", targetLanguage: service === "Translation" ? value("targetLanguage") : "", country: value("country"), deadline: value("deadline"), description: value("description"), consent: data.get("consent") === "on", website: value("website"), requestKey: requestKey.current, locale: arabic ? "ar" : "en" };
    const nextErrors = validateInquiry(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setServerError(t("Please check the highlighted fields below.", "يرجى مراجعة الحقول الموضحة أدناه."));
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    const fingerprint = JSON.stringify({ ...values, requestKey: "" });
    if (requestPayload.current && requestPayload.current !== fingerprint) {
      requestKey.current = crypto.randomUUID();
      values.requestKey = requestKey.current;
    }
    requestPayload.current = fingerprint;
    setPending(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values), signal: controller.signal });
      const result = await response.json();
      if (!response.ok) {
        setErrors(result.fields || {});
        setServerError(result.error || t("We couldn’t prepare your brief. Please try again, or chat with us directly on WhatsApp.", "تعذر تجهيز التفاصيل. يرجى المحاولة مجدداً أو التواصل مباشرةً عبر واتساب."));
        return;
      }
      if (typeof result.reference !== "string") throw new Error("Invalid response");
      setSaved({ reference: result.reference, values });
      requestKey.current = "";
      requestPayload.current = "";
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setServerError(t("There was a connection problem. Your draft is still here. Try again, or start a WhatsApp conversation directly.", "حدثت مشكلة في الاتصال. بياناتك لا تزال هنا. حاول مجدداً أو ابدأ محادثة مباشرةً عبر واتساب."));
    } finally {
      window.clearTimeout(timeout);
      setPending(false);
    }
  }

  if (saved) {
    const value = saved.values;
    const message = [
      arabic ? "مرحباً TranslateWala، إليكم تفاصيل مشروعي:" : "Hello TranslateWala, here is my project brief:",
      "", `${arabic ? "المرجع" : "Reference"}: ${saved.reference}`,
      `${arabic ? "الاسم" : "Name"}: ${value.name}`,
      `${arabic ? "البريد" : "Email"}: ${value.email}`,
      value.company ? `${arabic ? "المؤسسة" : "Organization"}: ${value.company}` : "",
      `${arabic ? "الخدمة" : "Service"}: ${label(value.service)}`,
      `${arabic ? "السوق" : "Market"}: ${label(value.country)}`,
      value.sourceLanguage ? `${arabic ? "اللغات" : "Languages"}: ${label(value.sourceLanguage)} → ${label(value.targetLanguage)}` : "",
      value.deadline ? `${arabic ? "الموعد المفضل" : "Preferred deadline"}: ${value.deadline}` : "",
      "", value.description,
    ].filter((line, index) => line || index === 1).join("\n");
    return <div className="quote-success" role="status" tabIndex={-1} ref={successRef}>
      <span className="success-icon"><Icon name="check" size={31} /></span>
      <h2>{t("Your brief is ready to share.", "تفاصيل مشروعك جاهزة للمشاركة.")}</h2>
      <p>{t("A clear starting point for your conversation. Keep your saved reference below.", "بداية واضحة للمحادثة. احتفظ بالرقم المرجعي أدناه.")}</p>
      <div className="quote-reference" dir="ltr">{saved.reference}</div>
      <div className="success-next"><h3>{t("Let’s continue on WhatsApp.", "لنكمل المحادثة عبر واتساب.")}</h3><p>{t("Your brief is saved. No message has been sent automatically. Open WhatsApp to review the prepared project details, then press Send when you’re ready.", "تم حفظ التفاصيل دون إرسال أي رسالة تلقائياً. افتح واتساب لمراجعة معلومات مشروعك، ثم اضغط إرسال عندما تكون مستعداً.")}</p></div>
      <div className="success-actions"><WhatsAppLink message={message}>{t("Continue on WhatsApp", "المتابعة عبر واتساب")}</WhatsAppLink><a className="text-link" href={`mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry ${saved.reference}`)}&body=${encodeURIComponent(message)}`}><Icon name="mail" size={16} />{t("Email instead", "البريد بدلاً من ذلك")}</a></div>
      <button onClick={() => { setSaved(null); setErrors({}); setServerError(""); }}>{t("Prepare another brief", "تجهيز طلب آخر")}</button>
    </div>;
  }

  return <form className="quote-form" onSubmit={submit} noValidate aria-busy={pending}>
    <div className="form-intro"><div><h2>{t("Prepare a clear project brief.", "جهّز تفاصيل مشروعك.")}</h2><p>{t("Optional: organize your requirements before chatting.", "خطوة اختيارية لتنظيم متطلباتك قبل المحادثة.")}</p></div><span>{t("* Required fields", "* حقول مطلوبة")}</span></div>
    {serverError && <div className="form-error" role="alert"><Icon name="info" size={17} /><div><span>{serverError}</span><WhatsAppLink className="text-link whatsapp-text" message={projectMessage({ service: label(service), arabic })} style={{ marginTop: 9 }}>{t("Chat with us directly", "تواصل معنا مباشرةً")}</WhatsAppLink></div></div>}
    <span className="service-label" id="service-label">{t("How can we help? *", "كيف يمكننا مساعدتك؟ *")}</span>
    <div className="service-selectors" role="group" aria-labelledby="service-label">{serviceNames.map((name, i) => <button type="button" key={name} onClick={() => { setService(name); setErrors({}); setServerError(""); }} aria-pressed={service === name} disabled={pending}><Icon name={["languages", "monitor", "social"][i]} size={18} />{label(name)}</button>)}</div>{error("service")}
    <div className="form-grid">
      <div className="form-field"><label htmlFor="name">{t("Your name *", "الاسم *")}</label><input {...props("name")} autoComplete="name" placeholder={t("Full name", "الاسم الكامل")} maxLength={120} required />{error("name")}</div>
      <div className="form-field"><label htmlFor="email">{t("Email address *", "البريد الإلكتروني *")}</label><input {...props("email")} type="email" autoComplete="email" dir="ltr" placeholder="you@company.com" maxLength={254} required />{error("email")}</div>
      <div className="form-field"><label htmlFor="company">{t("Company / organization", "الشركة / المؤسسة")}<span>{t("(optional)", "(اختياري)")}</span></label><input {...props("company")} autoComplete="organization" placeholder={t("Your organization", "اسم المؤسسة")} maxLength={160} />{error("company")}</div>
      <div className="form-field"><label htmlFor="country">{t("Target market *", "السوق المستهدف *")}</label><select {...props("country")} defaultValue={countryNames.includes(defaultCountry) ? defaultCountry : ""} required><option value="">{t("Choose a country", "اختر الدولة")}</option>{countryNames.map(country => <option value={country} key={country}>{label(country)}</option>)}</select>{error("country")}</div>
      {service === "Translation" && <><div className="form-field"><label htmlFor="sourceLanguage">{t("Translate from *", "الترجمة من *")}</label><select {...props("sourceLanguage")} defaultValue="" required><option value="">{t("Source language", "لغة المصدر")}</option>{selectableLanguages.map(language => <option value={language} key={language}>{label(language)}</option>)}</select>{error("sourceLanguage")}</div><div className="form-field"><label htmlFor="targetLanguage">{t("Translate into *", "الترجمة إلى *")}</label><select {...props("targetLanguage")} defaultValue={selectableLanguages.includes(defaultTarget) ? defaultTarget : ""} required><option value="">{t("Target language", "اللغة المطلوبة")}</option>{selectableLanguages.map(language => <option value={language} key={language}>{label(language)}</option>)}</select>{error("targetLanguage")}</div></>}
      <div className="form-field full-width"><label htmlFor="description">{t("A little about your project *", "نبذة عن مشروعك *")}</label><textarea {...props("description")} rows={5} minLength={20} maxLength={5000} placeholder={service === "Translation" ? t("Tell us what you are translating, who it is for and the approximate content length. Please leave out sensitive personal details.", "أخبرنا بنوع المحتوى والجمهور وحجمه التقريبي، دون بيانات شخصية حساسة.") : service === "Web Design" ? t("Tell us about your business, the pages and features you need, preferred languages and any package you are considering.", "أخبرنا عن نشاطك والصفحات والمزايا المطلوبة واللغات والباقة التي تفكر فيها.") : t("Which platforms, audiences and languages are you focusing on? Include your preferred package and whether you need organic content or paid campaigns.", "ما المنصات والجمهور واللغات المستهدفة؟ اذكر الباقة المفضلة وما إذا كنت تحتاج إلى محتوى عضوي أو حملات مدفوعة.")} required />{error("description")}<p className="field-hint">{t("20–5,000 characters. Share the project context and what you want to achieve.", "من ٢٠ إلى ٥٠٠٠ حرف. شارك سياق المشروع والهدف منه.")}</p></div>
      <div className="form-field full-width"><label htmlFor="deadline">{t("Preferred deadline", "الموعد المفضل للتسليم")}<span>{t("(optional)", "(اختياري)")}</span></label><input {...props("deadline")} type="date" min={new Date().toISOString().slice(0, 10)} max="2100-12-31" />{error("deadline")}<p className="field-hint">{t("The timeline is confirmed after we review your requirements.", "يتم تأكيد الجدول الزمني بعد مراجعة متطلباتك.")}</p></div>
    </div>
    <div className="honeypot" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <div className="form-handoff-note"><Icon name="whatsapp" size={22} /><p><strong>{t("A brief now. A better conversation next.", "تفاصيل أوضح الآن، ومحادثة أفضل بعدها.")}</strong>{t("We’ll prepare your project details and a saved reference. You can review the message and send it directly in WhatsApp.", "نجهّز تفاصيل مشروعك مع رقم مرجعي. ويمكنك مراجعة الرسالة وإرسالها مباشرةً في واتساب.")}</p></div>
    <div className="consent-field"><label htmlFor="consent"><input {...props("consent")} type="checkbox" required /><span>{t("I agree to my details being saved to prepare this enquiry, as explained in the ", "أوافق على حفظ بياناتي لتجهيز هذا الطلب وفقاً لـ")}<Link href="/privacy-policy" target="_blank">{t("Privacy Policy", "سياسة الخصوصية (بالإنجليزية)")}</Link>{t(". I choose whether to share the prepared message on WhatsApp.", ". وأختار بنفسي مشاركة الرسالة المُعدّة عبر واتساب.")}</span></label>{error("consent")}</div>
    <button type="submit" className="button button-whatsapp form-submit" disabled={pending}><Icon name={pending ? "clock" : "whatsapp"} size={19} />{pending ? t("Preparing your brief…", "جارٍ تجهيز التفاصيل…") : t("Prepare WhatsApp Brief", "تجهيز الطلب لواتساب")}<Icon name="arrow-up-right" size={17} /></button>
    <p className="brief-footnote">{t("No payment or order is created. Nothing is sent automatically — you stay in control of the conversation.", "لا يتم إنشاء طلب شراء أو دفع، ولا تُرسل رسالة تلقائياً. أنت من يتحكم في بدء المحادثة.")}</p>
  </form>;
}
