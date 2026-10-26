"use client";
import Link from "next/link";
import { useState } from "react";
import { languages } from "@/lib/site";
import { Icon } from "./icons";
import { WhatsAppLink } from "./whatsapp-link";

export function LanguageExplorer({compact = false}: {compact?:boolean}) {
  const [query,setQuery] = useState("");
  const [filter,setFilter] = useState("all");
  const available = [...languages.map(l=>({...l,href:`/languages/${l.slug}`,group:"indian"})),{slug:"arabic",name:"Arabic",native:"العربية",lang:"ar",font:"arabic",summary:"Arabic, English and Indian-language connections.",href:"/arabic-translation",group:"international"},{slug:"english",name:"English",native:"Hello",lang:"en",font:"english",summary:"Your bridge to Indian-language and GCC audiences.",href:"/translation-services#language-pairs",group:"international"}];
  const filtered = compact ? available.slice(0,8) : available.filter(l=>(filter === "all" || l.group === filter) && `${l.name} ${l.native}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <div className={`language-explorer ${compact ? "compact-languages" : "full-languages"}`}>
    {!compact && <div className="language-toolbar"><div className="language-filters" role="group" aria-label="Filter languages"><button aria-pressed={filter==="all"} onClick={()=>setFilter("all")}>All languages</button><button aria-pressed={filter==="indian"} onClick={()=>setFilter("indian")}>Indian languages</button><button aria-pressed={filter==="international"} onClick={()=>setFilter("international")}>Arabic & English</button></div><label className="language-search"><Icon name="search" size={18}/><span className="sr-only">Search languages</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find your language"/></label></div>}
    <div className="language-grid">{filtered.map(l=><Link key={l.slug} href={l.href} className="language-card"><span lang={l.lang} dir={l.lang==="ar"||l.lang==="ur" ? "rtl":"ltr"} className={`native-language font-${l.font}`}>{l.native}</span><span className="language-card-name">{l.name}<Icon name="arrow-up-right" size={16}/></span>{!compact && <p>{l.summary}</p>}</Link>)}</div>
    {!filtered.length && <div className="empty-state" role="status"><Icon name="search" size={32}/><h3>Let’s find the right language for you.</h3><p>No languages match “{query}”. Ask us about your language pair.</p><WhatsAppLink className="text-link whatsapp-text" message={`Hello TranslateWala, I would like to enquire about this language: ${query}. Please help me confirm availability.`} icon={false}>Enquire on WhatsApp<Icon name="arrow-up-right" size={16}/></WhatsAppLink><button className="reset-filter" onClick={()=>{setQuery("");setFilter("all");}}>Clear filters</button></div>}
    {!compact && <p className="language-results" aria-live="polite">{filtered.length} language{filtered.length===1?"":"s"} shown · Language-pair availability is confirmed for each project.</p>}
  </div>;
}
