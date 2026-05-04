import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getTrack } from "@/lib/youtube/track";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest): Promise<NextResponse> {
  try {
    const meta = await getTrack();
    console.info(`[youtube] served: ${meta.title} by ${meta.artist}`);
    return NextResponse.json(meta, {
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[youtube] GET /api/track failed: ${message}`);
    return NextResponse.json({ error: "unavailable" }, { status: 502 });
  }
}
