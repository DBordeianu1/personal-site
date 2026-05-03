import { WordleHero } from "@/components/WordleHero";

export default function Home() {
  return (
    <main className="px-4 pt-24 sm:px-8">
      <h1 className="mb-3 text-3xl font-semibold tracking-tight text-neutral-900">Hi! I&apos;m</h1>
      <WordleHero />
    </main>
  );
}
