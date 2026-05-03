import type { Metadata } from "next";

import { ExperienceList } from "@/components/ExperienceList";
import { ScrollToTop } from "@/components/ScrollToTop";
import { experiences } from "@/data/experience";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <main className="mx-auto max-w-4xl px-8 pb-8 pt-[80px]">
      <ExperienceList items={experiences} />
      <ScrollToTop />
    </main>
  );
}
