import { NextResponse } from "next/server";
import { prisma, dbReady } from "@/lib/db";
import { DEFAULT_MATCHES } from "@/lib/defaults";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const live = await dbReady().catch(() => false);
  if (!live) return NextResponse.json({ items: DEFAULT_MATCHES, dbLive: false });
  const items = await prisma.match.findMany({ orderBy: { id: "desc" } });
  return NextResponse.json({ items, dbLive: true });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = await req.json();
  const item = await prisma.match.create({
    data: {
      tanggal: String(b.tanggal || ""),
      lawan: String(b.lawan || ""),
      logoLawan: String(b.logoLawan || ""),
      skorKami: b.skorKami === null || b.skorKami === "" ? null : Number(b.skorKami),
      skorLawan: b.skorLawan === null || b.skorLawan === "" ? null : Number(b.skorLawan),
      status: String(b.status || "AKAN_DATANG"),
    },
  });
  return NextResponse.json({ item });
}
