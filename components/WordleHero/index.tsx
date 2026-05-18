"use client";

import { useEffect, useState } from "react";

const LETTERS = ["D", "A", "N", "I", "E", "L", "A"];
const FLIP_MS    = 700;
const STAGGER_MS = 350;

// (100vw - 32px) / 7 ensures all tiles fit any viewport; 32px = safety margin + total gap
const TILE_SIZE = "clamp(34px, calc((100vw - 48px) / 7), 78px)";

function Tile({ letter, animate, delay }: { letter: string; animate: boolean; delay: number }) {
  return (
    <div
      className="flex items-center justify-center border-2 text-lg min-[480px]:text-2xl sm:text-3xl font-bold uppercase select-none"
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
        ...(animate
          ? {
              backgroundColor: "var(--wordle-tile-bg)",
              borderColor: "var(--wordle-tile-border-init)",
              color: "var(--wordle-tile-color)",
              animation: `wordle-flip-correct ${FLIP_MS}ms ease-in-out forwards`,
              animationDelay: `${delay}ms`,
            }
          : {
              backgroundColor: "var(--wordle-correct)",
              borderColor: "var(--wordle-correct)",
              color: "white",
            }),
      }}
    >
      {letter}
    </div>
  );
}

export function WordleHero() {
  const [animate, setAnimate] = useState<boolean | null>(null);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const seen = sessionStorage.getItem("wordle-hero-shown");
    if (seen) {
      setAnimate(false);
    } else {
      sessionStorage.setItem("wordle-hero-shown", "1");
      setAnimate(true);
    }
  }, []);

  const replay = () => {
    setAnimKey((k) => k + 1);
    setAnimate(true);
  };

  if (animate === null) return null;

  return (
    <div key={animKey} className="flex gap-1 cursor-pointer" onClick={replay}>
      {LETTERS.map((letter, i) => (
        <Tile
          key={i}
          letter={letter}
          animate={animate}
          delay={i * STAGGER_MS}
        />
      ))}
    </div>
  );
}
