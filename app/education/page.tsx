import type { Metadata } from "next";

import { EducationList } from "@/components/EducationList";
import { ScrollToTop } from "@/components/ScrollToTop";
import { educations } from "@/data/education";

export const metadata: Metadata = { title: "Education" };

export default function EducationPage() {
  return (
    <main className="mx-auto max-w-4xl px-8 pb-8 pt-[80px]">
      <h1 className="mb-2 text-3xl font-semibold tracking-tight text-neutral-900">
        Education
      </h1>
      <EducationList items={educations} />
      <ScrollToTop />
    </main>
  );
}
