import { NextResponse } from "next/server";
import { prisma, dbReady } from "@/lib/db";
import { DEFAULT_GALLERY } from "@/lib/defaults";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const live = await dbReady().catch(() => false);
  if (!live) return NextResponse.json({ items: DEFAULT_GALLERY, dbLive: false });
  const items = await prisma.galleryItem.findMany({ orderBy: { urutan: "asc" } });
  return NextResponse.json({ items, dbLive: true });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = await req.json();
  const item = await prisma.galleryItem.create({
    data: { image: String(b.image || ""), caption: String(b.caption || ""), urutan: Number(b.urutan || 0) },
  });
  return NextResponse.json({ item });
}
