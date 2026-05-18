import { ProtectedAboutImage } from "@/components/ProtectedAboutImage";
import { HeroSection } from "@/components/HeroSection";
import { ElevatorPitch } from "@/components/ElevatorPitch";
import { FAQ } from "@/components/FAQ";
import { RevealSection } from "@/components/RevealSection";
import { ScrollToTop } from "@/components/ScrollToTop";

const LANGUAGES = [
  { name: "English",  level: "Native" },
  { name: "French",   level: "Native" },
  { name: "Romanian", level: "Native" },
  { name: "Spanish",  level: "Intermediate" },
];

export default function Home() {
  return (
    <main>

      {/* 1 — Hero */}
      <RevealSection as="div">
        <HeroSection />
      </RevealSection>

      <hr className="border-neutral-200 dark:border-neutral-800" />

      {/* 2 — About */}
      <section className="bg-white dark:bg-black px-6 py-14 sm:px-12">
        <div className="mx-auto flex max-w-lg flex-col items-center gap-8">

          <RevealSection as="div" className="w-full text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              About
            </h2>
          </RevealSection>

          <RevealSection as="div">
            <ProtectedAboutImage />
          </RevealSection>

          <RevealSection as="div" className="w-full">
            <ElevatorPitch />
          </RevealSection>

          <RevealSection as="div" className="w-full">
            <div className="flex w-full flex-wrap justify-start gap-2">
              {LANGUAGES.map(({ name, level }) => (
                <span
                  key={name}
                  className="group relative cursor-default rounded-full bg-[#DDEAF7] dark:bg-[#1A5C9A] px-4 py-1.5 text-sm text-[#1A5C9A] dark:text-[#DDEAF7] transition-colors hover:bg-[#c8dff2] dark:hover:bg-[#1e6aad]"
                >
                  {name}
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-neutral-800 dark:bg-neutral-100 px-2 py-1 text-xs text-white dark:text-neutral-900 opacity-0 transition-opacity group-hover:opacity-100">
                    {level}
                  </span>
                </span>
              ))}
            </div>
          </RevealSection>

        </div>
      </section>

      <hr className="border-neutral-200 dark:border-neutral-800" />

      {/* 3 — FAQ */}
      <RevealSection className="bg-[#f5f0e8] dark:bg-[#2b2b2b] px-6 py-14 sm:px-12">
        <h2 className="mb-8 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
          FAQ
        </h2>
        <FAQ />
      </RevealSection>

      <hr className="border-neutral-200 dark:border-neutral-800" />

      {/* 4 — Get in Touch */}
      <section className="bg-white dark:bg-black px-6 py-14 text-center sm:px-12">
        <div className="mx-auto max-w-lg">

          <RevealSection as="div">
            <h2 className="mb-8 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              Get in touch
            </h2>
          </RevealSection>

          <RevealSection as="div">
            <div className="flex justify-center gap-8 text-base">
              <a href="https://www.linkedin.com/in/danielabordeianu/" target="_blank" rel="noopener noreferrer" className="text-[#1A5C9A] dark:text-[#DDEAF7] hover:underline">LinkedIn</a>
              <a href="https://github.com/DBordeianu1" target="_blank" rel="noopener noreferrer" className="text-[#1A5C9A] dark:text-[#DDEAF7] hover:underline">GitHub</a>
            </div>
          </RevealSection>

          <RevealSection as="div">
            <p className="mt-10 text-sm text-neutral-400">© Daniela Bordeianu 2026</p>
          </RevealSection>

        </div>
      </section>

      <ScrollToTop />
    </main>
  );
}
