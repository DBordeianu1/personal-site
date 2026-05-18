"use client";

import { useEffect, useState } from "react";
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
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={thumbnailUrl}
      alt="Album cover"
      className="w-full object-cover sm:h-full sm:w-auto"
    />
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

  const cardClass =
    "group flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm transition duration-200 ease-out hover:-translate-y-1 hover:shadow-md sm:w-fit sm:flex-row sm:items-start";

  if (state.status === "loading") {
    return (
      <div className="flex w-full animate-pulse flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm sm:w-fit sm:flex-row sm:items-start">
        <div className="aspect-video w-full bg-neutral-100 dark:bg-neutral-800 sm:w-44" />
        <div className="flex flex-col gap-2 p-5 sm:p-6">
          <div className="h-4 w-36 rounded-full bg-neutral-100 dark:bg-neutral-800" />
          <div className="h-3 w-24 rounded-full bg-neutral-100 dark:bg-neutral-800" />
          <div className="h-3 w-28 rounded-full bg-neutral-100 dark:bg-neutral-800" />
          <div className="h-3 w-20 rounded-full bg-neutral-100 dark:bg-neutral-800" />
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className={cardClass}>
        <Thumbnail />
        <div className="flex flex-col justify-center p-5 sm:p-6">
          {currentSong.note && (
            <p className="text-sm italic text-neutral-400">{currentSong.note}</p>
          )}
          <p className="mt-2 text-sm text-neutral-400 transition-colors group-hover:text-neutral-700">
            Listen on YouTube ↗
          </p>
        </div>
      </a>
    );
  }

  const { track } = state;

  return (
    <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className={cardClass}>
      <Thumbnail />
      <div className="flex flex-col justify-center p-5 sm:p-6">
        <p className="text-lg font-semibold text-neutral-900 dark:text-white sm:text-xl">{track.title}</p>
        <p className="text-base text-neutral-500 dark:text-neutral-400">{track.artist}</p>
        {currentSong.note && (
          <p className="mt-5 text-sm italic text-neutral-400 dark:text-neutral-400">{currentSong.note}</p>
        )}
        <p className="mt-2 text-sm text-neutral-400 dark:text-neutral-400 transition-colors group-hover:text-neutral-700 dark:group-hover:text-white">
          Listen on YouTube ↗
        </p>
      </div>
    </a>
  );
}
