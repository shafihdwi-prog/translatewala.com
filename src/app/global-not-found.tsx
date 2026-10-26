import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/icons";
import "./globals.css";
import "./fonts.css";
export const metadata={metadataBase:new URL("https://translatewala.com"),title:"Page not found | TranslateWala",robots:{index:false,follow:false}};
export default function GlobalNotFound(){return <html lang="en"><body><div className="container" style={{paddingTop:35}}><Link href="/" aria-label="TranslateWala home"><Image src="/images/translatewala-logo.webp" alt="TranslateWala" width={218} height={26}/></Link></div><main className="error-page"><p className="eyebrow">A SMALL DETOUR · 404</p><h1>This page got lost in translation.</h1><p>The address may have changed. Let’s get you back to the right words.</p><div className="hero-buttons"><Link href="/" className="button">Back to our homepage<Icon name="arrow" size={17}/></Link><Link href="/contact" className="button button-outline">Contact us<Icon name="mail" size={17}/></Link></div></main></body></html>;}
