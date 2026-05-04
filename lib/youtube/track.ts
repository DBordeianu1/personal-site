import "server-only";

import { currentSong } from "@/data/current-song";
import type { TrackMeta } from "./types";

function parseTitle(raw: string): { title: string; artist: string } {
  const cleaned = raw.replace(/[\(\[](?:official|lyrics?|audio|video|hd|4k|mv)[^\)\]]*[\)\]]/gi, "").trim();
  const dashIdx = cleaned.indexOf(" - ");
  if (dashIdx !== -1) {
    return {
      artist: cleaned.slice(0, dashIdx).trim(),
      title: cleaned.slice(dashIdx + 3).trim(),
    };
  }
  return { artist: "", title: cleaned };
}

export async function getTrack(): Promise<TrackMeta> {
  const { youtubeVideoId } = currentSong;
  const videoUrl = `https://www.youtube.com/watch?v=${youtubeVideoId}`;

  const res = await fetch(
    `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) throw new Error(`oEmbed responded with ${res.status}`);

  const data = await res.json();
  const { title, artist } = parseTitle(data.title as string);

  return {
    title: title || (data.title as string),
    artist: artist || (data.author_name as string),
    thumbnailUrl: `https://img.youtube.com/vi/${youtubeVideoId}/mqdefault.jpg`,
    youtubeUrl: videoUrl,
  };
}
