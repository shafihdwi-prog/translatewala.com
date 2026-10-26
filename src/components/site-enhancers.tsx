"use client";

import { useEffect, useState } from "react";

const pickable = ".industry-card, .showcase-card, .build-grid article, .service-table article, .use-case-card, .home-service-card, .package-card, .language-card, .content-card, .digital-teaser-card, .compact-post a, .index-card a, .index-feature a, .marquee-chip";

export function PickHighlighter() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const card = (event.target as HTMLElement | null)?.closest(pickable);
      if (!card?.parentElement) return;
      [...card.parentElement.children].forEach(child => child.classList.remove("is-picked"));
      card.classList.add("is-picked");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

export function ThemeToggle() {
  const [night, setNight] = useState(false);
  useEffect(() => { setNight(document.documentElement.dataset.theme === "night"); }, []);
  function toggle() {
    const next = document.documentElement.dataset.theme === "night" ? "day" : "night";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("tw-theme", next);
    setNight(next === "night");
  }
  return <button type="button" className="theme-toggle" onClick={toggle} aria-pressed={night} aria-label={night ? "Switch to day mode" : "Switch to night mode"}>{night ? <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.5A8 8 0 0 1 9.5 4 7 7 0 1 0 20 15.5Z"/></svg>}</button>;
}

export const themeBootScript = `(function(){try{var t=localStorage.getItem("tw-theme");if(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)t="night";if(t==="night"||t==="day")document.documentElement.dataset.theme=t;}catch(e){}})();`;
