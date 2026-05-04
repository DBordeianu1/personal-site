"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import type { TrackMeta } from "@/lib/youtube/types";
import { currentSong } from "@/data/current-song";

const thumbnailUrl = `https://img.youtube.com/vi/${currentSong.youtubeVideoId}/mqdefault.jpg`;
const youtubeUrl = `https://www.youtube.com/watch?v=${currentSong.youtubeVideoId}`;

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ok"; track: TrackMeta };

function Thumbnail() {
  return (
    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
      <Image
        src={thumbnailUrl}
        alt="Album cover"
        fill
        sizes="64px"
        className="object-cover"
      />
    </div>
  );
}

export function CurrentSong() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/track")
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}`);
        return res.json() as Promise<TrackMeta>;
      })
      .then((track) => { if (!cancelled) setState({ status: "ok", track }); })
      .catch(() => { if (!cancelled) setState({ status: "error" }); });
    return () => { cancelled = true; };
  }, []);

  if (state.status === "loading") {
    return (
      <div className="flex w-fit animate-pulse items-center gap-5 rounded-2xl border border-neutral-200 bg-white p-5">
        <Thumbnail />
        <div className="space-y-2">
          <div className="h-4 w-36 rounded-full bg-neutral-100" />
          <div className="h-3 w-24 rounded-full bg-neutral-100" />
          <div className="h-3 w-20 rounded-full bg-neutral-100" />
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <a
        href={youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex w-fit cursor-pointer items-center gap-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition duration-200 ease-out hover:-translate-y-1 hover:shadow-md"
      >
        <Thumbnail />
        <p className="text-xs text-neutral-400 transition-colors group-hover:text-neutral-700">
          Listen on YouTube ↗
        </p>
      </a>
    );
  }

  const { track } = state;

  return (
    <a
      href={youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-fit cursor-pointer items-center gap-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition duration-200 ease-out hover:-translate-y-1 hover:shadow-md"
    >
      <Thumbnail />
      <div>
        <p className="font-semibold text-neutral-900">{track.title}</p>
        <p className="text-sm text-neutral-500">{track.artist}</p>
        {currentSong.note && (
          <p className="mt-1 text-sm italic text-neutral-400">{currentSong.note}</p>
        )}
        <p className="mt-2 text-xs text-neutral-400 transition-colors group-hover:text-neutral-700">
          Listen on YouTube ↗
        </p>
      </div>
    </a>
  );
}
