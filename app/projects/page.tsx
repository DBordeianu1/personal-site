import type { Metadata } from "next";

import { ProjectsSection } from "@/components/ProjectsSection";
import { ScrollToTop } from "@/components/ScrollToTop";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <main className="px-4 pb-4 pt-[80px]">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight text-neutral-900">
        Projects
      </h1>
      <ProjectsSection projects={projects} />
      <ScrollToTop />
    </main>
  );
}
