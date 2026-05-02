import type { Metadata } from "next";

import { awards } from "@/data/awards";

export const metadata: Metadata = { title: "Awards" };

export default function AwardsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 pb-16 pt-[80px]">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight text-neutral-900">
        Awards
      </h1>

      <ol className="space-y-4">
        {awards.map((award, i) => (
          <li
            key={i}
            className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="font-semibold text-neutral-900">{award.name}</h2>
                <p className="mt-0.5 text-sm text-neutral-500">
                  {award.date} · {award.givenBy}
                </p>
              </div>

              {award.url && (
                <a
                  href={award.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 shrink-0 text-xs text-neutral-400 transition-colors hover:text-neutral-800"
                >
                  View →
                </a>
              )}
            </div>

            {award.description && (
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {award.description}
              </p>
            )}
          </li>
        ))}
      </ol>
    </main>
  );
}
