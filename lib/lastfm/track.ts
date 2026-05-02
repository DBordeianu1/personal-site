import "server-only";

import type { TrackMeta } from "./types";

type LastFmTrackResponse = {
  track: {
    name: string;
    url: string;
    listeners: string;
    playcount: string;
    artist: { name: string };
    album?: {
      title: string;
      image: Array<{ "#text": string; size: string }>;
    };
  };
};

type ItunesSearchResponse = {
  resultCount: number;
  results: Array<{ artworkUrl100: string }>;
};

async function getAlbumArtFromItunes(artist: string, track: string): Promise<string> {
  const query = encodeURIComponent(`${artist} ${track}`);
  try {
    const res = await fetch(
      `https://itunes.apple.com/search?term=${query}&entity=song&limit=1`,
      { signal: AbortSignal.timeout(3000) }
    );
    if (!res.ok) return "";
    const data = (await res.json()) as ItunesSearchResponse;
    const artwork = data.results[0]?.artworkUrl100;
    if (!artwork) return "";
    // Upgrade thumbnail to full-size artwork
    return artwork.replace("100x100bb", "600x600bb");
  } catch {
    return "";
  }
}

export async function getTrack(artist: string, track: string): Promise<TrackMeta> {
  const apiKey = process.env.LASTFM_API_KEY;

  if (!apiKey) {
    console.error("[lastfm] missing env var: LASTFM_API_KEY");
    throw new Error("Last.fm API key is not configured");
  }

  const params = new URLSearchParams({
    method: "track.getInfo",
    api_key: apiKey,
    artist,
    track,
    format: "json",
  });

  const res = await fetch(`https://ws.audioscrobbler.com/2.0/?${params}`, {
    signal: AbortSignal.timeout(3000),
  });

  if (!res.ok) {
    const text = await res.text();
    console.warn(`[lastfm] track fetch failed: ${res.status} — ${text}`);
    throw new Error(`Last.fm track fetch failed with status ${res.status}`);
  }

  const data = (await res.json()) as LastFmTrackResponse;
  const t = data.track;

  // Last.fm no longer returns album art — use iTunes as the source
  const albumArtUrl = await getAlbumArtFromItunes(artist, track);

  return {
    name: t.name,
    artist: t.artist.name,
    albumName: t.album?.title ?? "",
    albumArtUrl,
    listeners: parseInt(t.listeners, 10),
    playCount: parseInt(t.playcount, 10),
    lastfmUrl: t.url,
  };
}
