"use client";

import Image from "next/image";

export function ProtectedAboutImage() {
  return (
    <div
      className="relative w-64 overflow-hidden rounded-2xl sm:w-55"
      style={{ aspectRatio: "1/1" }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Image
        src="/about-960.jpg"
        fill
        alt="Daniela Bordeianu"
        className="select-none object-cover"
        unoptimized
        preload
        draggable={false}
      />
    </div>
  );
}
