import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getTrack } from "@/lib/lastfm/track";
import { currentSong } from "@/data/current-song";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest): Promise<NextResponse> {
  try {
    const meta = await getTrack(currentSong.artist, currentSong.track);
    console.info(`[lastfm] served: ${meta.name} by ${meta.artist}`);
    return NextResponse.json(meta, {
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[lastfm] GET /api/track failed: ${message}`);
    return NextResponse.json({ error: "unavailable" }, { status: 502 });
  }
}
