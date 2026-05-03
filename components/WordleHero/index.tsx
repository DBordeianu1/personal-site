"use client";

import { useEffect, useState } from "react";

const LETTERS = ["D", "A", "N", "I", "E", "L", "A"];
const FLIP_MS    = 700;
const STAGGER_MS = 350;

// clamp(42px, 11.5vw, 62px) keeps 7 tiles inside 360px viewport with gap-1
const TILE_SIZE = "clamp(42px, 11.5vw, 62px)";

function Tile({ letter, animate, delay }: { letter: string; animate: boolean; delay: number }) {
  return (
    <div
      className="flex items-center justify-center border-2 text-2xl font-bold uppercase select-none"
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
        ...(animate
          ? {
              backgroundColor: "white",
              borderColor: "#d3d6da",
              color: "#1a1a1b",
              animation: `wordle-flip-correct ${FLIP_MS}ms ease-in-out forwards`,
              animationDelay: `${delay}ms`,
            }
          : {
              backgroundColor: "#6aaa64",
              borderColor: "#6aaa64",
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

  useEffect(() => {
    const seen = sessionStorage.getItem("wordle-hero-shown");
    if (seen) {
      setAnimate(false);
    } else {
      sessionStorage.setItem("wordle-hero-shown", "1");
      setAnimate(true);
    }
  }, []);

  if (animate === null) return null;

  return (
    <div className="flex gap-1">
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
