"use client";

import { useEffect, useRef } from "react";
import type { Experience } from "@/data/experience";

type Props = { items: Experience[] };

const REVEAL_STYLE = {
  opacity: 0,
  transform: "translateY(24px)",
  transition: "none",
} as const;

function SkillPill({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-[#DDEAF7] px-2.5 py-0.5 text-xs font-medium text-[#1A5C9A]">
      {label}
    </span>
  );
}

function Section({ title, items }: { title: string; items: Experience[] }) {
  return (
    <section>
      <h2
        data-reveal
        style={REVEAL_STYLE}
        className="mb-8 text-3xl font-semibold tracking-tight text-neutral-900"
      >
        {title}
      </h2>
      <div className="space-y-10">
        {items.map((item, i) => (
          <div
            key={i}
            data-reveal
            style={REVEAL_STYLE}
            className="grid gap-2 sm:grid-cols-[240px_1fr] sm:gap-10"
          >
            <div className="pt-0.5">
              <p className="text-sm text-neutral-500">{item.period}</p>
            </div>
            <div>
              <p className="text-base text-neutral-600">
                {item.org}
                {item.location ? ` · ${item.location}` : ""}
              </p>
              <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
              <p className="mt-1.5 text-base leading-relaxed text-neutral-600">
                {item.description}
              </p>
              {item.skills.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.skills.map((skill) => (
                    <SkillPill key={skill} label={skill} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ExperienceList({ items }: Props) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const els = Array.from(list.querySelectorAll<HTMLElement>("[data-reveal]"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.style.transition = "opacity 0.55s ease-out, transform 0.55s ease-out";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            setTimeout(() => {
              if (el.style.opacity === "1") {
                el.style.transition = "";
                el.style.transform = "";
                el.style.opacity = "";
              }
            }, 600);
          } else {
            el.style.transition = "none";
            el.style.opacity = "0";
            const exitedTop = entry.boundingClientRect.top < 0;
            el.style.transform = exitedTop ? "translateY(-24px)" : "translateY(24px)";
          }
        });
      },
      { threshold: 0.08 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const work = items
    .filter((i) => i.category === "work")
    .sort((a, b) => b.date.localeCompare(a.date));

  const community = items
    .filter((i) => i.category === "community")
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div ref={listRef} className="space-y-12">
      <Section title="Work" items={work} />
      <div data-reveal style={REVEAL_STYLE}>
        <hr className="border-neutral-200" />
      </div>
      <Section title="Community" items={community} />
    </div>
  );
}
