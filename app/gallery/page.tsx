import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { ScrollToTop } from "@/components/ScrollToTop";
import { photos } from "@/data/photos";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <main className="relative px-4 pb-4 pt-[80px]">
      <h1 className="mb-2 text-3xl font-semibold tracking-tight text-neutral-900">
        Gallery
      </h1>
      <p className="mb-8 text-base font-normal text-neutral-500">
        Original content featuring photography captured by a Nikon D5300 digital camera
      </p>
      <Gallery photos={photos} />
      <ScrollToTop />
    </main>
  );
}
