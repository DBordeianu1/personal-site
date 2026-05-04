"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import type { Project } from "@/data/projects";

type Props = { projects: Project[] };

const REVEAL_STYLE = {
  opacity: 0,
  transform: "translateY(24px)",
  transition: "none",
} as const;

function Slideshow({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <div className="relative h-56 w-full overflow-hidden rounded-t-2xl sm:h-auto sm:w-2/5 sm:shrink-0 sm:rounded-t-none sm:rounded-l-2xl">
      <Image
        src={images[idx]}
        fill
        alt={`Screenshot ${idx + 1}`}
        className="object-cover"
        sizes="(max-width: 640px) 100vw, 40vw"
        unoptimized={images[idx].endsWith(".png")}
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-black/40 px-3 py-1.5 text-white transition-colors hover:bg-black/60"
          >
            ←
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-black/40 px-3 py-1.5 text-white transition-colors hover:bg-black/60"
          >
            →
          </button>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1.5 w-1.5 cursor-pointer rounded-full transition-colors ${
                  i === idx ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function TechPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-neutral-300 px-2.5 py-0.5 text-xs text-neutral-600">
      {label}
    </span>
  );
}

function LinkButton({ href, label, variant = "outline" }: { href: string; label: string; variant?: "outline" | "filled" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        variant === "filled"
          ? "inline-flex items-center gap-1 rounded-lg bg-neutral-400 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-neutral-500"
          : "inline-flex items-center gap-1 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 transition-colors hover:border-neutral-500 hover:text-neutral-900"
      }
    >
      {label} ↗
    </a>
  );
}

export function ProjectsSection({ projects }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => b.date.localeCompare(a.date));
  const rest = projects
    .filter((p) => !p.featured)
    .sort((a, b) => b.date.localeCompare(a.date));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll<HTMLElement>("[data-reveal]"));

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

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [projects]);

  if (projects.length === 0) {
    return (
      <p className="text-base text-neutral-400">No projects yet — check back soon.</p>
    );
  }

  return (
    <div ref={containerRef} className="space-y-8">

      {/* Featured — full-width cards, one per featured project */}
      {featured.map((f) => (
        <div
          key={f.name}
          data-reveal
          style={REVEAL_STYLE}
          className="rounded-2xl border border-neutral-200 bg-white shadow-sm transition duration-200 ease-out hover:-translate-y-1 hover:shadow-md"
        >
          <div className={`flex flex-col sm:flex-row sm:items-stretch ${f.imageSrc ? "sm:min-h-[300px]" : ""}`}>
            {(f.images ?? (f.imageSrc ? [f.imageSrc] : null)) && (
              <Slideshow images={f.images ?? [f.imageSrc!]} />
            )}
            <div className="flex flex-1 flex-col justify-center gap-4 p-8">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#DDEAF7] px-3 py-1 text-xs font-medium text-[#1A5C9A]">
                  Featured
                </span>
                {f.teamProject && (
                  <span className="rounded-full bg-[#FFEEAB] px-3 py-1 text-xs font-medium text-[#A8795E]">
                    Team project
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">{f.name}</h2>
                <p className="mt-1 text-sm text-neutral-400">{f.period}</p>
                <p className="mt-1 text-base font-medium text-neutral-700">{f.tagline}</p>
              </div>
              {f.description && (
                <p className="text-base leading-relaxed text-neutral-600">{f.description}</p>
              )}
              <div className="flex flex-wrap gap-2">
                {f.techStack.map((tech) => (
                  <TechPill key={tech} label={tech} />
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {f.githubUrl && <LinkButton href={f.githubUrl} label="GitHub" variant="filled" />}
                {f.liveUrl && <LinkButton href={f.liveUrl} label="Live demo" />}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Grid — hover + reveal on the same element */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {rest.map((project) => (
            <div
              key={project.name}
              data-reveal
              style={REVEAL_STYLE}
              className="flex flex-col sm:flex-row h-full rounded-2xl border border-neutral-200 bg-white shadow-sm transition duration-200 ease-out hover:-translate-y-1 hover:shadow-md"
            >
              {project.imageSrc && (
                <div className="relative h-48 w-full overflow-hidden rounded-t-2xl sm:h-auto sm:w-2/5 sm:shrink-0 sm:rounded-t-none sm:rounded-l-2xl">
                  <Image
                    src={project.imageSrc}
                    fill
                    alt={`${project.name} screenshot`}
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 20vw"
                    unoptimized={project.imageSrc.endsWith(".png")}
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-4 p-5">
                {project.teamProject && (
                  <span className="w-fit rounded-full bg-[#FFEEAB] px-2.5 py-0.5 text-xs font-medium text-[#A8795E]">
                    Team project
                  </span>
                )}
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-neutral-900">{project.name}</h3>
                  <p className="text-xs text-neutral-400">{project.period}</p>
                  <p className="text-sm font-medium text-neutral-700">{project.tagline}</p>
                  {project.description && (
                    <p className="pt-1 text-sm leading-relaxed text-neutral-600">{project.description}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <TechPill key={tech} label={tech} />
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.githubUrl && <LinkButton href={project.githubUrl} label="GitHub" variant="filled" />}
                  {project.liveUrl && <LinkButton href={project.liveUrl} label="Live demo" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
