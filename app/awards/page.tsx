import type { Metadata } from "next";

import { AwardsList } from "@/components/AwardsList";
import { ScrollToTop } from "@/components/ScrollToTop";
import { awards } from "@/data/awards";

export const metadata: Metadata = { title: "Awards" };

export default function AwardsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-16 pt-[80px]">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
        Awards
      </h1>
      <AwardsList awards={awards} />
      <ScrollToTop />
    </main>
  );
}
