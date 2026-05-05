"use client";

import { useState } from "react";
import Link from "next/link";
import { CurrentSong } from "@/components/CurrentSong";

const NAV_LINKS = [
  { label: "Education",        href: "/education" },
  { label: "Experience/Volunteering",  href: "/experience" },
  { label: "Projects",         href: "/projects" },
  { label: "Awards",           href: "/awards" },
];

function Item({ question, children }: { question: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer items-center gap-3 py-5 text-left text-base font-medium text-neutral-900 transition-colors hover:text-neutral-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 text-neutral-400 transition-transform duration-300"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
        {question}
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? "600px" : "0px" }}
      >
        <div className="pb-5 text-sm leading-relaxed text-neutral-600">
          {children}
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <div className="divide-y-0">
      <Item question="Where can I learn more about you?">
        <p className="mb-4">Have a look at the different sections of the website:</p>
        <div className="flex flex-wrap gap-2">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="rounded-full bg-[#DDEAF7] px-4 py-1.5 text-sm font-medium text-[#1A5C9A] transition-colors hover:bg-[#c8dff2]"
            >
              {label} ↗
            </Link>
          ))}
        </div>
      </Item>

      <Item question="What are you working on right now?">
        <p>
          I&apos;m starting my internship at Solace as a Software Developer, building
          full-stack features for the PubSub+ Cloud Console on the Event Mesh &amp;
          Observability team. Outside of work, I&apos;m always coming up with side
          projects... this site being one of them.
        </p>
      </Item>

      <Item question="What other interests do you have, outside of tech?">
        <p>
          I love painting using watercolour, staying active (swimming, running,
          badminton), playing board/video games, and taking photos.
        </p>
        <Link href="/gallery" className="mt-2 inline-block text-[#1A5C9A] hover:underline">
          You can check out my photography work here ↗
        </Link>
      </Item>

      <Item question="What song have you been playing on repeat lately?">
        <div className="mt-1">
          <CurrentSong />
        </div>
      </Item>
    </div>
  );
}
