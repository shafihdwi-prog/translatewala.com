import { createHash, randomBytes } from "node:crypto";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { inquiries, inquiryRateLimits } from "@/db/schema";
import { validateInquiry, type InquiryValues } from "@/lib/inquiry";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const json = (data:unknown,status=200,extra:Record<string,string>={}) => Response.json(data,{status,headers:{"Cache-Control":"no-store",...extra}});

async function limited(key:string,max:number) {
  const hash=createHash("sha256").update(key).digest("hex");
  const rows=await db.insert(inquiryRateLimits).values({key:hash,hits:1,resetAt:new Date(Date.now()+3600000)}).onConflictDoUpdate({target:inquiryRateLimits.key,set:{hits:sql`CASE WHEN ${inquiryRateLimits.resetAt} < now() THEN 1 ELSE ${inquiryRateLimits.hits} + 1 END`,resetAt:sql`CASE WHEN ${inquiryRateLimits.resetAt} < now() THEN now() + interval '1 hour' ELSE ${inquiryRateLimits.resetAt} END`}}).returning({hits:inquiryRateLimits.hits});
  return rows[0].hits>max;
}
async function readBody(request:Request) {
  if(Number(request.headers.get("content-length")||0)>24000)throw new Error("TOO_LARGE");
  const reader=request.body?.getReader();if(!reader)throw new Error("INVALID_BODY");
  const chunks:Uint8Array[]=[];let size=0;
  while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>24000){await reader.cancel();throw new Error("TOO_LARGE");}chunks.push(value);}
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
export async function POST(request:Request) {
  const origin=request.headers.get("origin");
  try {
    const expectedHost=(request.headers.get("x-forwarded-host")||request.headers.get("host")||new URL(request.url).host).split(",")[0].trim();
    if(!origin || (new URL(origin).host!==expectedHost && origin!==site.url) || request.headers.get("sec-fetch-site")==="cross-site")return json({error:"This request must come from the TranslateWala website."},403);
  }catch{return json({error:"Invalid request origin."},403);}
  if(!request.headers.get("content-type")?.startsWith("application/json"))return json({error:"Please submit the website inquiry form."},415);
  let body:Record<string,unknown>;
  try{body=await readBody(request);if(!body||typeof body!=="object"||Array.isArray(body))throw new Error("INVALID_BODY");}catch(error){return json({error:error instanceof Error&&error.message==="TOO_LARGE"?"Your inquiry is too large. Please shorten the project description.":"The request could not be read. Please try again."},400);}
  const string=(name:string)=>typeof body[name]==="string"?(body[name] as string).trim():"";
  const values:InquiryValues={name:string("name"),email:string("email").toLowerCase(),company:string("company"),service:string("service"),sourceLanguage:string("sourceLanguage"),targetLanguage:string("targetLanguage"),country:string("country"),deadline:string("deadline"),description:string("description"),consent:body.consent===true,website:string("website"),requestKey:string("requestKey"),locale:body.locale==="ar"?"ar":"en"};
  const ar=values.locale==="ar";
  if(values.website)return json({error:"The inquiry could not be accepted. Please contact us directly."},400);
  if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(values.requestKey))return json({error:ar?"يرجى إعادة تحميل النموذج والمحاولة مجدداً.":"Please reload the form and try again."},400);
  const fields=validateInquiry(values);
  if(Object.keys(fields).length)return json({error:ar?"يرجى مراجعة الحقول الموضحة.":"Please check the highlighted fields.",fields},400);
  try {
    const existing=await db.select({reference:inquiries.reference,email:inquiries.email}).from(inquiries).where(eq(inquiries.requestKey,values.requestKey)).limit(1);
    if(existing[0])return existing[0].email===values.email?json({reference:existing[0].reference,saved:true,notificationSent:false}):json({error:"Please reload the form before submitting a new inquiry."},409);
    const ip=(request.headers.get("x-forwarded-for")?.split(",")[0].trim()||request.headers.get("x-real-ip")||"unknown").slice(0,100);
    if(await limited(`ip:${ip}`,15) || await limited(`email:${values.email}`,5))return json({error:ar?"تم إرسال عدة طلبات مؤخراً. يرجى المحاولة بعد ساعة أو التواصل معنا مباشرةً.":"Several inquiries have been submitted recently. Please try again in an hour or contact us by email or WhatsApp."},429,{"Retry-After":"3600"});
    const reference=`TW-${new Date().getUTCFullYear()}-${randomBytes(4).toString("hex").toUpperCase()}`;
    const result=await db.insert(inquiries).values({reference,requestKey:values.requestKey,name:values.name,email:values.email,company:values.company||null,service:values.service,sourceLanguage:values.service==="Translation"?values.sourceLanguage:null,targetLanguage:values.service==="Translation"?values.targetLanguage:null,country:values.country,deadline:values.deadline||null,description:values.description,consent:true,locale:values.locale}).onConflictDoNothing({target:inquiries.requestKey}).returning({reference:inquiries.reference});
    if(result[0])return json({reference:result[0].reference,saved:true,notificationSent:false},201);
    const duplicate=await db.select({reference:inquiries.reference,email:inquiries.email}).from(inquiries).where(eq(inquiries.requestKey,values.requestKey)).limit(1);
    if(duplicate[0]?.email===values.email)return json({reference:duplicate[0].reference,saved:true,notificationSent:false});
    return json({error:"A submission conflict occurred. Please reload the form and try again."},409);
  }catch(error){console.error("Inquiry database operation failed:",error instanceof Error?error.name:"UnknownError");return json({error:ar?"تعذر حفظ طلبك حالياً. يرجى المحاولة مجدداً أو التواصل معنا مباشرةً.":"We couldn’t save your inquiry right now. Please try again or contact us directly. No confirmation has been issued."},503);}
}
