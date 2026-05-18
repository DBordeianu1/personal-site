"use client";

import { Fragment, useEffect, useRef } from "react";
import type { Education } from "@/data/education";

type Props = { items: Education[] };

const REVEAL_STYLE = {
  opacity: 0,
  transform: "translateY(24px)",
  transition: "none",
} as const;

export function EducationList({ items }: Props) {
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

  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div ref={listRef} className="space-y-0">
      {sorted.map((edu, i) => (
        <Fragment key={edu.institution}>
          <div
            data-reveal
            style={REVEAL_STYLE}
            className="py-8"
          >
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                {edu.url ? (
                  <a
                    href={edu.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {edu.institution}
                  </a>
                ) : (
                  edu.institution
                )}
              </h2>
              <p className="text-base text-neutral-600 dark:text-neutral-300">{edu.degree}</p>
              <p className="text-sm text-neutral-400 dark:text-neutral-400">{edu.years}</p>

              {edu.gpa && (
                <p className="mt-3 text-sm text-neutral-400 dark:text-neutral-400">
                  <span className="mr-3 font-medium text-neutral-500 dark:text-neutral-400">GPA</span>
                  {edu.gpa.value} / {edu.gpa.outOf}
                </p>
              )}

              {edu.courses && edu.courses.length > 0 && (
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {edu.courses.join(" · ")}
                </p>
              )}
            </div>
          </div>

          {i < sorted.length - 1 && (
            <div data-reveal style={REVEAL_STYLE}>
              <hr className="border-neutral-200 dark:border-neutral-800" />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
