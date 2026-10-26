import Link from "next/link";
import { Icon } from "@/components/icons";
import { Eyebrow } from "@/components/ui";
export default function NotFound(){return <main id="main-content" className="error-page"><Eyebrow>A SMALL DETOUR</Eyebrow><h1>This page got lost in translation.</h1><p>The address may have changed. Let’s get you back to the right words.</p><div className="hero-buttons"><Link href="/" className="button">Back to our homepage<Icon name="arrow" size={17}/></Link><Link href="/languages" className="button button-outline">Explore our languages<Icon name="globe" size={17}/></Link></div></main>;}
