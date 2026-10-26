"use client";
import Link from "next/link";
import { Icon } from "@/components/icons";
export default function ArabicError({reset}:{error:Error & {digest?:string};reset:()=>void}){return <main id="main-content" className="error-page"><p className="eyebrow">انقطاع مؤقت</p><h1>لنحاول الاتصال مجدداً.</h1><p>تعذر تحميل الصفحة. يرجى إعادة المحاولة أو التواصل معنا مباشرةً.</p><div className="hero-buttons"><button className="button" onClick={reset}>إعادة المحاولة<Icon name="arrow" size={17}/></button><Link href="/ar" className="button button-outline">العودة إلى الرئيسية</Link></div></main>;}
