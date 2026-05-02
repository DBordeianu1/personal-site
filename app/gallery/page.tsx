import { Gallery } from "@/components/Gallery";
import { photos } from "@/data/photos";

export default function GalleryPage() {
  return (
    <main className="relative px-4 pb-4 pt-[80px]">
      <Gallery photos={photos} />
    </main>
  );
}
