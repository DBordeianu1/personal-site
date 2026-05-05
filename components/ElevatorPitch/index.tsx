"use client";

import { useEffect, useRef, useState } from "react";

const MAIN_TEXT =
  "I like building solutions that are both functional and thoughtful, which is why Computer Science felt right. This summer, I'll be interning at Solace as a Software Developer, exploring Cloud Infrastructure and Observability.";

const PS_TEXT =
  "P.S. View this on a laptop to catch the interactive details since I've added a few (okay, a lot) of hover effects into the UI for you to discover.";

const SPEED_MS = 28;
const SESSION_KEY = "elevator-pitch-shown";

export function ElevatorPitch() {
  const [mainDisplayed, setMainDisplayed] = useState("");
  const [psDisplayed, setPsDisplayed] = useState("");
  const [phase, setPhase] = useState<"idle" | "main" | "ps" | "done">("idle");
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setMainDisplayed(MAIN_TEXT);
      setPsDisplayed(PS_TEXT);
      setPhase("done");
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          observer.disconnect();
          sessionStorage.setItem(SESSION_KEY, "1");
          setPhase("main");
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Type MAIN_TEXT
  useEffect(() => {
    if (phase !== "main") return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setMainDisplayed(MAIN_TEXT.slice(0, i));
      if (i >= MAIN_TEXT.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("ps"), 300);
      }
    }, SPEED_MS);
    return () => clearInterval(interval);
  }, [phase]);

  // Type PS_TEXT
  useEffect(() => {
    if (phase !== "ps") return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setPsDisplayed(PS_TEXT.slice(0, i));
      if (i >= PS_TEXT.length) {
        clearInterval(interval);
        setPhase("done");
      }
    }, SPEED_MS);
    return () => clearInterval(interval);
  }, [phase]);

  const psDone = phase === "done";

  return (
    <div ref={ref} className="w-full space-y-4 border-l-4 border-neutral-200 pl-5">

      {/* Main pitch */}
      <div className="relative text-left text-base leading-relaxed text-neutral-900">
        <span className="invisible" aria-hidden="true">{MAIN_TEXT}</span>
        <span className="absolute inset-0">
          {mainDisplayed}
          {phase === "main" && (
            <span className="ml-0.5 inline-block h-[1.1em] w-px align-middle animate-pulse bg-neutral-900" />
          )}
        </span>
      </div>

      {/* PS — ghost always rendered to lock the height; overlay appears once main is done */}
      <div className="relative text-left text-sm italic leading-relaxed text-neutral-500">
        <span className="invisible" aria-hidden="true">{PS_TEXT}</span>
        {(phase === "ps" || phase === "done") && (
          <span className="absolute inset-0">
            {psDisplayed}
            {!psDone && (
              <span className="ml-0.5 inline-block h-[1.1em] w-px align-middle animate-pulse bg-neutral-500" />
            )}
          </span>
        )}
      </div>
    </div>
  );
}
