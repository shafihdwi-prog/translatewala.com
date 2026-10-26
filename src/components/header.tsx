"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icons";
import { languages } from "@/lib/site";
import { ThemeToggle } from "./site-enhancers";


export function Header({ arabic = false }: { arabic?: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const close = () => { setOpen(null); setMobile(false); };
  useEffect(() => {
    const pointer = (event: MouseEvent) => { if (ref.current && !ref.current.contains(event.target as Node)) { setOpen(null); setMobile(false); } };
    const key = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const active = document.activeElement as HTMLElement | null;
      const menu = active?.closest(".nav-dropdown, .locale-menu");
      const trigger = menu?.parentElement?.querySelector<HTMLButtonElement>("button");
      const inMobileNav = Boolean(active?.closest(".main-nav") && window.matchMedia("(max-width: 1060px)").matches);
      setOpen(null); setMobile(false);
      requestAnimationFrame(() => (inMobileNav ? ref.current?.querySelector<HTMLButtonElement>(".mobile-toggle") : trigger)?.focus());
    };
    document.addEventListener("mousedown", pointer);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("mousedown", pointer); document.removeEventListener("keydown", key); };
  }, []);
  const home = arabic ? "/ar" : "/";
  return <>
    <a href="#main-content" className="skip-link">{arabic ? "انتقل إلى المحتوى" : "Skip to content"}</a>
    <header className="site-header minimal-header" ref={ref}>
      <div className="container header-inner">
        <Link href={home} onClick={close} className="brand" aria-label="TranslateWala home"><Image src="/images/translatewala-logo.webp" alt="TranslateWala" width={188} height={22} priority /></Link>
        <nav className={`main-nav ${mobile ? "mobile-open" : ""}`} aria-label={arabic ? "القائمة الرئيسية" : "Main navigation"}>
          <Link href={home} onClick={close} className={pathname === home ? "nav-active" : ""}>{arabic ? "الرئيسية" : "Home"}</Link>
          {arabic ? <Link href="/ar#languages" onClick={close}>اللغات</Link> : <div className="nav-item"><button className={pathname.includes("languages") || pathname.includes("translation") ? "nav-active" : ""} onClick={() => setOpen(open === "languages" ? null : "languages")} aria-expanded={open === "languages"} aria-controls="language-menu">Languages<Icon name="chevron" size={12} /></button>{open === "languages" && <div className="nav-dropdown language-dropdown" id="language-menu"><div className="dropdown-language-grid">{languages.map(language => <Link key={language.slug} href={`/languages/${language.slug}`} onClick={close}><span lang={language.lang} className={`native font-${language.font}`}>{language.native}</span>{language.name}</Link>)}</div><Link className="dropdown-bottom" href="/languages" onClick={close}>All languages<Icon name="arrow" size={15} /></Link><Link className="dropdown-bottom" href="/translation-services" onClick={close}>Translation services<Icon name="arrow" size={15} /></Link></div>}</div>}
          {arabic ? <Link href="/ar#services" onClick={close}>الخدمات</Link> : <div className="nav-item"><button className={pathname.includes("digital") || pathname.includes("web-design") || pathname.includes("social") || pathname === "/packages" ? "nav-active" : ""} onClick={() => setOpen(open === "digital" ? null : "digital")} aria-expanded={open === "digital"} aria-controls="digital-menu">Digital<Icon name="chevron" size={12} /></button>{open === "digital" && <div className="nav-dropdown digital-dropdown" id="digital-menu"><Link href="/digital-solutions" onClick={close}><span className="dropdown-icon"><Icon name="globe" /></span><span><strong>Digital solutions</strong><small>Websites and social, planned together.</small></span></Link><Link href="/web-design" onClick={close}><span className="dropdown-icon"><Icon name="monitor" /></span><span><strong>Website design</strong><small>Business sites and multilingual pages.</small></span></Link><Link href="/social-media-management" onClick={close}><span className="dropdown-icon"><Icon name="social" /></span><span><strong>Social media</strong><small>Organic content and paid options.</small></span></Link><Link className="dropdown-bottom" href="/packages" onClick={close}>View packages<Icon name="arrow" size={15} /></Link></div>}</div>}
          <Link href="/blog" onClick={close} className={pathname.startsWith("/blog") ? "nav-active" : ""}>{arabic ? "المدونة" : "Blog"}</Link>
          <Link href="/about" onClick={close} className={pathname === "/about" ? "nav-active" : ""}>{arabic ? "من نحن" : "About"}</Link>
          <Link href="/contact" onClick={close} className={pathname === "/contact" ? "nav-active" : ""}>{arabic ? "تواصل" : "Contact"}</Link>
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <div className="locale-control"><button className="locale-button" onClick={() => setOpen(open === "locale" ? null : "locale")} aria-label={arabic ? "اختر اللغة" : "Choose website language"} aria-expanded={open === "locale"}><span>{arabic ? "AR" : "EN"}</span><Icon name="chevron" size={11} /></button>{open === "locale" && <div className="locale-menu" id="locale-menu"><Link href="/" lang="en" onClick={close}>English</Link><Link href="/ar" lang="ar" onClick={close}>العربية</Link></div>}</div>
          <button className="mobile-toggle" onClick={() => setMobile(!mobile)} aria-label={mobile ? "Close navigation" : "Open navigation"} aria-expanded={mobile}><Icon name={mobile ? "close" : "menu"} size={22} /></button>
        </div>
      </div>
    </header>
  </>;
}
