"use client";

import { useEffect, useState } from "react";
import { WordleHero } from "@/components/WordleHero";

export function HeroSection() {
  const [fade, setFade] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("hero-bg-shown")) {
      sessionStorage.setItem("hero-bg-shown", "1");
      setFade(true);
    }
    setReady(true);
  }, []);

  return (
    <section
      className="flex min-h-[100svh] flex-col items-center justify-center gap-6 pt-16"
      style={{
        backgroundColor: "#f5f0e8",
        animation: ready && fade ? "hero-bg-fade 2s ease-out forwards" : undefined,
      }}
    >
      <div className="flex flex-col items-start gap-4">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
          Hi! I&apos;m
        </h1>
        <WordleHero />
      </div>

      <a
        href="#content"
        className="mt-4 text-base italic text-neutral-400 transition-colors hover:text-neutral-600"
      >
        Scroll ↓
      </a>
    </section>
  );
}
