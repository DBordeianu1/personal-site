"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
};

const REVEAL_STYLE: React.CSSProperties = {
  opacity: 0,
  transform: "translateY(24px)",
  transition: "none",
};

export function RevealSection({ children, className = "", id, as: Tag = "section" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    // @ts-expect-error – dynamic tag with ref is safe here
    <Tag ref={ref} id={id} className={className} style={REVEAL_STYLE}>
      {children}
    </Tag>
  );
}
