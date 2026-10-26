import { site } from "./site";

export const defaultWhatsAppMessage = "Hello TranslateWala, I’d like to discuss a translation or digital-services project. Please help me with the right next step.";

export function whatsappUrl(message = defaultWhatsAppMessage) {
  return `${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function projectMessage({ service = "Translation", country, language, packageName, price, arabic = false }: {
  service?: string;
  country?: string;
  language?: string;
  packageName?: string;
  price?: string;
  arabic?: boolean;
} = {}) {
  if (arabic) {
    return [
      "مرحباً TranslateWala، أود مناقشة مشروع جديد.",
      `الخدمة: ${service}`,
      country ? `السوق المستهدف: ${country}` : "",
      language ? `اللغة المطلوبة: ${language}` : "",
      packageName ? `الباقة: ${packageName}` : "",
      "يرجى مساعدتي في تحديد نطاق العمل والتكلفة والموعد المناسب.",
    ].filter(Boolean).join("\n");
  }
  return [
    "Hello TranslateWala, I’d like to discuss a project.",
    `Service: ${service}`,
    packageName ? `Package: ${packageName}` : "",
    price ? `Published starting price: ${price}` : "",
    country ? `Target market: ${country}` : "",
    language ? `Language requirement: ${language}` : "",
    "",
    "Please help me confirm the scope, pricing and next steps.",
  ].filter((line, index, lines) => line !== "" || index === lines.length - 2).join("\n");
}
