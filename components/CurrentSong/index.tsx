"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import type { TrackMeta } from "@/lib/lastfm/types";
import { currentSong } from "@/data/current-song";

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ok"; track: TrackMeta };

function formatListeners(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return n.toLocaleString();
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
      .then((track) => {
        if (!cancelled) setState({ status: "ok", track });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "error") return null;

  if (state.status === "loading") {
    return (
      <div className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm animate-pulse">
        <div className="h-20 w-20 shrink-0 rounded-xl bg-neutral-200" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-3 w-28 rounded bg-neutral-200" />
          <div className="h-4 w-44 rounded bg-neutral-200" />
          <div className="h-3 w-32 rounded bg-neutral-200" />
          <div className="h-3 w-48 rounded bg-neutral-200" />
        </div>
      </div>
    );
  }

  const { track } = state;

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      {track.albumArtUrl && (
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
          <Image
            src={track.albumArtUrl}
            alt={`${track.albumName} cover art`}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">
          Current obsession
        </p>
        <p className="mt-0.5 truncate font-semibold text-neutral-900">
          {track.name}
        </p>
        <p className="truncate text-sm text-neutral-500">{track.artist}</p>
        {track.listeners > 0 && (
          <p className="mt-0.5 text-xs text-neutral-400">
            {formatListeners(track.listeners)} listeners on Last.fm
          </p>
        )}
        {currentSong.note && (
          <p className="mt-1.5 text-sm italic text-neutral-600 line-clamp-2">
            {currentSong.note}
          </p>
        )}
        <a
          href={track.lastfmUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-xs text-neutral-400 transition-colors hover:text-neutral-800"
        >
          Listen on Last.fm →
        </a>
      </div>
    </div>
  );
}
