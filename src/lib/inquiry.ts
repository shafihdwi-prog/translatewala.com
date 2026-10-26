import { countryNames, selectableLanguages, serviceNames } from "./site";

export type InquiryValues = {
  name: string; email: string; company: string; service: string; sourceLanguage: string; targetLanguage: string;
  country: string; deadline: string; description: string; consent: boolean; website: string; requestKey: string; locale: string;
};
export type InquiryErrors = Partial<Record<keyof InquiryValues, string>>;
export function validateInquiry(values: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {};
  const ar = values.locale === "ar";
  if (values.name.trim().length < 2 || values.name.length > 120) errors.name = ar ? "يرجى إدخال اسم من حرفين إلى ١٢٠ حرفاً." : "Please enter your name (2–120 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) || values.email.length > 254) errors.email = ar ? "يرجى إدخال بريد إلكتروني صالح." : "Please enter a valid email address.";
  if (values.company.length > 160) errors.company = ar ? "يرجى اختصار اسم المؤسسة." : "Please keep your organization name under 160 characters.";
  if (!serviceNames.includes(values.service as typeof serviceNames[number])) errors.service = ar ? "يرجى اختيار الخدمة." : "Please choose a service.";
  if (!countryNames.includes(values.country)) errors.country = ar ? "يرجى اختيار السوق المستهدف." : "Please choose your target market.";
  if (values.service === "Translation") {
    if (!selectableLanguages.includes(values.sourceLanguage)) errors.sourceLanguage = ar ? "يرجى اختيار لغة المصدر." : "Please choose the source language.";
    if (!selectableLanguages.includes(values.targetLanguage)) errors.targetLanguage = ar ? "يرجى اختيار اللغة المطلوبة." : "Please choose the target language.";
    if (values.sourceLanguage && values.sourceLanguage === values.targetLanguage && values.sourceLanguage !== "Other / please advise") errors.targetLanguage = ar ? "يجب أن تختلف اللغة المطلوبة عن لغة المصدر." : "Please choose a different target language.";
  }
  if (values.description.trim().length < 20 || values.description.length > 5000) errors.description = ar ? "يرجى وصف المشروع في ٢٠ إلى ٥٠٠٠ حرف." : "Please describe your project in 20–5,000 characters.";
  if (values.deadline) {
    const date = new Date(`${values.deadline}T23:59:59Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(values.deadline) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== values.deadline || date.getTime() < Date.now()) errors.deadline = ar ? "يرجى اختيار تاريخ اليوم أو تاريخ لاحق." : "Please choose today or a future date.";
  }
  if (!values.consent) errors.consent = ar ? "يرجى الموافقة على استخدام بياناتك للرد على طلبك." : "Please agree to the privacy notice so we can process your inquiry.";
  return errors;
}
