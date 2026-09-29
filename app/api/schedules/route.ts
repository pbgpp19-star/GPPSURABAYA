import { NextResponse } from "next/server";
import { prisma, dbReady } from "@/lib/db";
import { DEFAULT_SCHEDULES } from "@/lib/defaults";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const live = await dbReady().catch(() => false);
  if (!live) return NextResponse.json({ items: DEFAULT_SCHEDULES, dbLive: false });
  const items = await prisma.schedule.findMany({ orderBy: { urutan: "asc" } });
  return NextResponse.json({ items, dbLive: true });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = await req.json();
  const item = await prisma.schedule.create({
    data: {
      hari: String(b.hari || ""),
      jam: String(b.jam || ""),
      tempat: String(b.tempat || ""),
      image: String(b.image || ""),
      urutan: Number(b.urutan || 0),
      aktif: b.aktif !== false,
    },
  });
  return NextResponse.json({ item });
}
