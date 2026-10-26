"use client";
import Link from "next/link";
import { Icon } from "@/components/icons";
export default function ErrorPage({reset}:{error:Error & {digest?:string};reset:()=>void}){return <main id="main-content" className="error-page"><p className="eyebrow">A TEMPORARY INTERRUPTION</p><h1>Let’s try that connection again.</h1><p>We couldn’t load this page. Your privacy matters, so no technical details are shown here.</p><div className="hero-buttons"><button className="button" onClick={reset}>Try again<Icon name="arrow" size={17}/></button><Link href="/contact" className="button button-outline">Contact us directly<Icon name="mail" size={17}/></Link></div></main>;}
