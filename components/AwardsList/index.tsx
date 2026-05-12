"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import type { Award } from "@/data/awards";

type Props = { awards: Award[] };

const REVEAL_STYLE = {
  opacity: 0,
  transform: "translateY(24px)",
  transition: "none",
} as const;

export function AwardsList({ awards }: Props) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const items = Array.from(list.querySelectorAll("li"));

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

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <ol ref={listRef} className="space-y-4">
      {awards.map((award, i) => (
        <li
          key={i}
          style={REVEAL_STYLE}
          className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition duration-200 ease-out hover:-translate-y-1 hover:shadow-md"
        >
          <div className={`flex flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-6`}>
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold text-neutral-900">{award.name}</h2>
              <p className="mt-0.5 text-base text-neutral-400">
                {award.date} · {award.givenBy}
              </p>
              {award.description && (
                <p className="mt-2 text-base leading-relaxed text-neutral-600">
                  {award.description}
                </p>
              )}
            </div>

            {award.url && (
              <a
                href={award.url}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  award.thumbnailSrc
                    ? "group relative order-first h-48 w-full overflow-hidden rounded-xl sm:order-last sm:h-auto sm:w-[180px] sm:shrink-0"
                    : "order-first shrink-0 self-start text-sm text-neutral-400 transition-colors hover:text-neutral-800 sm:order-last"
                }
              >
                {award.thumbnailSrc ? (
                  <>
                    <Image
                      src={award.thumbnailSrc}
                      fill
                      alt={`${award.name} certificate`}
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 180px"
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-neutral-500/70 px-3 py-1 text-xs text-white/60 backdrop-blur-sm transition-colors duration-200 group-hover:bg-neutral-700/80 group-hover:text-white">
                      View ↗
                    </span>
                  </>
                ) : (
                  "View ↗"
                )}
              </a>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
