import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function clean(s: string) {
  return s.replace(/:[^:@/\s]+@/g, ":***@").slice(0, 500);
}

export async function GET() {
  const raw = process.env.DATABASE_URL || "";
  let host = "none";
  try {
    host = new URL(raw).host || "none";
  } catch {
    host = "invalid-url-format";
  }
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, host, urlLen: raw.length });
  } catch (e) {
    return NextResponse.json({
      ok: false,
      host,
      hasUrl: !!raw,
      urlLen: raw.length,
      startsWith: raw.slice(0, 13),
      error: clean(e instanceof Error ? e.message : String(e)),
    });
  }
}
