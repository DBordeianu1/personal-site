import "server-only";

import { currentSong } from "@/data/current-song";
import type { TrackMeta } from "./types";

function parseTitle(raw: string, channelTitle: string): { title: string; artist: string } {
  // Strip common suffixes like "(Official Video)", "[Official Audio]", etc.
  const cleaned = raw.replace(/[\(\[](?:official|lyrics?|audio|video|hd|4k|mv)[^\)\]]*[\)\]]/gi, "").trim();

  const dashIdx = cleaned.indexOf(" - ");
  if (dashIdx !== -1) {
    return {
      artist: cleaned.slice(0, dashIdx).trim(),
      title: cleaned.slice(dashIdx + 3).trim(),
    };
  }

  // Fallback: use channel name as artist, full title as track name
  return { artist: channelTitle, title: cleaned };
}

export async function getTrack(): Promise<TrackMeta> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) throw new Error("YOUTUBE_API_KEY is not set");

  const { youtubeVideoId } = currentSong;

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeVideoId}&key=${key}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) throw new Error(`YouTube API responded with ${res.status}`);

  const data = await res.json();
  const item = data.items?.[0];
  if (!item) throw new Error(`Video not found: ${youtubeVideoId}`);

  const { title, artist } = parseTitle(item.snippet.title, item.snippet.channelTitle);

  return {
    title,
    artist,
    thumbnailUrl:
      item.snippet.thumbnails?.medium?.url ??
      item.snippet.thumbnails?.default?.url,
    youtubeUrl: `https://www.youtube.com/watch?v=${youtubeVideoId}`,
  };
}
