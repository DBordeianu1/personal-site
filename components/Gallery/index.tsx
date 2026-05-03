"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import { generate, render } from "@/lib/gallery/index";
import type { Photo } from "@/lib/gallery/types";

type Props = { photos: Photo[] };

const GUTTER = 16;

const REVEAL_STYLE = {
  opacity: 0,
  transform: "translateY(24px)",
  transition: "none",
} as const;

export function Gallery({ photos }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const prevWidthRef = useRef(0);
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);

  // Measure container width and recompute layout on resize
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const newWidth = Math.round(entry.contentRect.width);
      if (Math.abs(newWidth - prevWidthRef.current) > 1) {
        prevWidthRef.current = newWidth;
        setContainerWidth(newWidth);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { rects, containerHeight } = useMemo(() => {
    if (containerWidth === 0) return { rects: [], containerHeight: 0 };
    const tree = generate(photos, containerWidth);
    return render(tree, containerWidth, GUTTER);
  }, [photos, containerWidth]);

  // Reveal tiles as they scroll into view
  useEffect(() => {
    const container = containerRef.current;
    if (!container || rects.length === 0) return;

    const figures = Array.from(container.querySelectorAll("figure"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.style.transition = "opacity 0.55s ease-out, transform 0.55s ease-out";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
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

    figures.forEach((fig) => observer.observe(fig));
    return () => observer.disconnect();
  }, [rects]);

  // Close lightbox on Escape
  useEffect(() => {
    if (!lightboxPhoto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxPhoto(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxPhoto]);

  // Lock background scroll while lightbox is open, compensating for scrollbar
  // width so the page doesn't shift when the scrollbar disappears.
  useEffect(() => {
    if (lightboxPhoto) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [lightboxPhoto]);

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ minHeight: "60vh", height: containerHeight > 0 ? containerHeight : undefined }}
      >
        {rects.map((rect, i) => {
          const photo = photos[i];
          return (
            <figure
              key={photo.id}
              className="group absolute m-0 cursor-pointer overflow-hidden rounded-2xl"
              style={{
                left: rect.x,
                top: rect.y,
                width: rect.w,
                height: rect.h,
                ...REVEAL_STYLE,
              }}
              onClick={() => setLightboxPhoto(photo)}
              onMouseEnter={() => { const i = new window.Image(); i.src = photo.src; }}
              onContextMenu={(e) => e.preventDefault()}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={`${Math.round(rect.w)}px`}
                className="object-cover"
                draggable={false}
                preload={i < 4}
              />
              <figcaption className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 px-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <p className="line-clamp-3 text-center text-sm font-medium leading-snug text-white">
                  {photo.alt}
                </p>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center gap-3 bg-black/92"
          onClick={() => setLightboxPhoto(null)}
        >
          <button
            aria-label="Close"
            className="absolute right-5 top-5 cursor-pointer text-2xl text-white/50 transition-colors hover:text-white"
            onClick={() => setLightboxPhoto(null)}
          >
            ✕
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightboxPhoto.src}
            alt={lightboxPhoto.alt}
            className="max-h-[90vh] max-w-[90vw] cursor-pointer rounded-2xl object-contain"
            onClick={() => setLightboxPhoto(null)}
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />

          <p className="text-sm text-white/50">{lightboxPhoto.alt}</p>
        </div>
      )}
    </>
  );
}
