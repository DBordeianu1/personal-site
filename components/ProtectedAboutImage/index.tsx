"use client";

import Image from "next/image";

export function ProtectedAboutImage() {
  return (
    <div
      className="relative w-64 overflow-hidden rounded-2xl sm:w-80"
      style={{ aspectRatio: "3/2" }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Image
        src="/about.jpg"
        fill
        alt="Daniela Bordeianu"
        className="select-none object-cover"
        sizes="(max-width: 640px) 256px, 320px"
        priority
        draggable={false}
      />
    </div>
  );
}
