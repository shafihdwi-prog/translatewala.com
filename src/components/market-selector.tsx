"use client";
import { useState, type KeyboardEvent } from "react";
import { WhatsAppLink } from "./whatsapp-link";
import { projectMessage } from "@/lib/whatsapp";
import { countries } from "@/lib/site";
import { Icon } from "./icons";

export function MarketSelector() {
  const [active,setActive] = useState(0);
  const country = countries[active];
  function keyboard(e:KeyboardEvent<HTMLButtonElement>,index:number) {
    let next=index;
    if (e.key === "ArrowRight") next=(index+1)%countries.length;
    else if (e.key === "ArrowLeft") next=(index-1+countries.length)%countries.length;
    else if (e.key === "Home") next=0;
    else if (e.key === "End") next=countries.length-1;
    else return;
    e.preventDefault();setActive(next);document.getElementById(`market-tab-${next}`)?.focus();
  }
  return <section className="market-section" id="markets"><div className="container"><div className="market-layout"><div className="market-intro"><p className="eyebrow eyebrow-light"><span/>INDIAN ROOTS. GULF CONNECTIONS.</p><h2>Closer to your audience.<br/>Across the GCC.</h2><p>Language is personal. Your market is too. Connect with Indian-language audiences, wherever your business takes you.</p><div className="market-connection" aria-hidden="true"><span>भारत<small>INDIA</small></span><i/><Icon name="globe" size={30}/><i/><span>الخليج<small>THE GULF</small></span></div></div><div className="market-detail" role="tabpanel" id={`market-panel-${active}`} aria-labelledby={`market-tab-${active}`} tabIndex={0}><span className="market-country"><Icon name="location" size={16}/>{country.name}</span><h3>{country.title}</h3><p>{country.description}</p><ul>{country.uses.map(use=><li key={use}><Icon name="check" size={15}/>{use}</li>)}</ul><WhatsAppLink message={projectMessage({country:country.name})} className="text-link" icon={false}>Discuss your {country.short} project<Icon name="arrow-up-right" size={17}/></WhatsAppLink></div></div><div className="market-tabs" role="tablist" aria-label="Choose a GCC market">{countries.map((c,i)=><button key={c.code} role="tab" id={`market-tab-${i}`} aria-selected={active===i} aria-controls={`market-panel-${i}`} tabIndex={active===i?0:-1} onClick={()=>setActive(i)} onKeyDown={e=>keyboard(e,i)}><span className="market-tab-code">{c.code}</span>{c.short}<Icon name="arrow-up-right" size={15}/></button>)}</div><p className="market-note">Supporting GCC enquiries remotely. No local office or regulatory approval is implied.</p></div></section>;
}
