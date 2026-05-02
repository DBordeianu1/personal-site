import { CurrentSong } from "@/components/CurrentSong";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 pt-16">
      <section className="w-full max-w-sm">
        <CurrentSong />
      </section>
    </main>
  );
}
