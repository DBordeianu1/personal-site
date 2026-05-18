"use client";

import { useState } from "react";
import Link from "next/link";
import { useDarkMode } from "@/components/DarkModeProvider";

const links = [
  { label: "Home",                    href: "/" },
  { label: "Education",               href: "/education" },
  { label: "Experience/Volunteering", href: "/experience" },
  { label: "Projects",                href: "/projects" },
  { label: "Awards",                  href: "/awards" },
  { label: "Gallery",                 href: "/gallery" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  const { toggle } = useDarkMode();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800">
      <div className="flex h-16 items-center justify-between px-4">
        <button
          type="button"
          onClick={toggle}
          className="font-semibold tracking-tight text-neutral-900 dark:text-white cursor-pointer select-none transition-opacity hover:opacity-70"
          aria-label="Toggle dark mode"
        >
          Daniela Bordeianu
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden flex flex-col justify-center gap-1.5 p-2 cursor-pointer"
        >
          <span className={`block h-0.5 w-5 bg-neutral-700 dark:bg-neutral-300 transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-5 bg-neutral-700 dark:bg-neutral-300 transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-neutral-700 dark:bg-neutral-300 transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <ul className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-4 py-3 flex flex-col gap-4">
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="block text-sm text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
