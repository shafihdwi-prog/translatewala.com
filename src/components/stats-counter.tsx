"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 5, suffix: "+", label: "Years of industry experience", icon: "trophy", tone: "blue" },
  { value: 40, suffix: "+", label: "Languages served", icon: "languages", tone: "violet" },
  { value: 100, suffix: "+", label: "Clients globally", icon: "handshake", tone: "green" },
  { value: 50, suffix: "+", label: "Projects each month", icon: "briefcase", tone: "amber" },
  { value: 98, suffix: "%", label: "Client satisfaction", icon: "smile", tone: "teal" },
  { value: 5, suffix: "+ Million", label: "Words translated each year", icon: "document", tone: "rose", featured: true },
];

function IconMark({ name }: { name: string }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, "aria-hidden": true };
  if (name === "trophy") return <svg {...common}><rect x="4" y="5" width="16" height="14" rx="1.5"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>;
  if (name === "languages") return <svg {...common}><path d="M4 6h10M9 4v2M6 6c1 3 3 5 6 6M14 19l2.5-6L19 19"/></svg>;
  if (name === "handshake") return <svg {...common}><circle cx="8" cy="8" r="2.2"/><circle cx="16" cy="9" r="2.2"/><path d="M4 19c1-3 2.5-4.5 4.5-4.5S12 16 12 19M12 19c.4-2.4 1.8-3.6 4-3.6 2 0 3.4 1.2 4 3.6"/></svg>;
  if (name === "briefcase") return <svg {...common}><path d="M5 19V8h14v11M9 8V6h6v2M5 12h14"/></svg>;
  if (name === "smile") return <svg {...common}><path d="M4 16c2 3 5 4 8 4s6-1 8-4"/><path d="M7 10h.01M17 10h.01"/></svg>;
  return <svg {...common}><path d="M7 3h7l4 4v14H7V3zM14 3v4h4M9 12h6M9 16h4"/></svg>;
}

function Count({ target, start, suffix }: { target: number; start: boolean; suffix: string }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setValue(target); return; }
    setValue(0);
    const steps = Math.max(24, target);
    let step = 0;
    const timer = window.setInterval(() => {
      step += 1;
      setValue(Math.min(target, Math.round((step / steps) * target)));
      if (step >= steps) window.clearInterval(timer);
    }, 2200 / steps);
    return () => window.clearInterval(timer);
  }, [start, target]);
  return <strong className={start ? "is-counting" : ""}>{value}<small>{suffix}</small></strong>;
}

export function StatsCounter() {
  const ref = useRef<HTMLElement>(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setStart(true); }, { threshold: 0.25 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <section className="stats-section" ref={ref} aria-label="TranslateWala work in numbers"><div className="container stats-layout">
    <div className="stats-heading"><p className="eyebrow eyebrow-light"><span />Published figures</p><h2>Our work in numbers</h2><p>The count begins as this section comes into view.</p></div>
    <div className="stats-grid">{stats.map(stat => <article className={stat.featured ? "stat-card featured-stat" : "stat-card"} key={stat.label}><span className={`stat-icon tone-${stat.tone}`}><IconMark name={stat.icon} /></span><Count target={stat.value} suffix={stat.suffix} start={start} /><span>{stat.label}</span></article>)}</div>
  </div><p className="stats-source">These are TranslateWala’s published figures. Language availability and project scope are still confirmed individually.</p></section>;
}
