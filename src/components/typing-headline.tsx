"use client";

import { useEffect, useState } from "react";

const phrases = [
  [
    { text: "Indian language", color: "red" },
    { text: " translation", color: "blue" },
  ],
  [
    { text: "for the GCC", color: "blue" },
    { text: " & beyond.", color: "red" },
  ],
];

export function TypingHeadline() {
  const [reduced, setReduced] = useState(false);
  const [phrase, setPhrase] = useState(0);
  const [count, setCount] = useState(0);
  const full = phrases[phrase].map(part => part.text).join("");

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced) return;
    if (count < full.length) {
      const timer = window.setTimeout(() => setCount(count + 1), count === 0 ? 280 : 46);
      return () => window.clearTimeout(timer);
    }
    const hold = window.setTimeout(() => {
      setCount(0);
      setPhrase(current => (current + 1) % phrases.length);
    }, 1700);
    return () => window.clearTimeout(hold);
  }, [count, full.length, reduced]);

  if (reduced) {
    return <span className="typed-line"><span className="typed-red">Indian language</span> <span className="typed-blue">translation for the GCC.</span></span>;
  }

  let remaining = count;
  return <span className="typed-line" aria-hidden="true">{phrases[phrase].map(part => {
    const visible = part.text.slice(0, Math.max(0, remaining));
    remaining -= part.text.length;
    return <span key={part.text} className={part.color === "red" ? "typed-red" : "typed-blue"}>{visible}</span>;
  })}<span className="typed-caret" /></span>;
}
