import { NextResponse } from "next/server";
import { prisma, dbReady } from "@/lib/db";
import { DEFAULT_MEMBERS } from "@/lib/defaults";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const live = await dbReady().catch(() => false);
  if (!live) return NextResponse.json({ items: DEFAULT_MEMBERS, dbLive: false });
  const items = await prisma.member.findMany({ orderBy: { id: "asc" } });
  return NextResponse.json({ items, dbLive: true });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = await req.json();
  const item = await prisma.member.create({
    data: {
      nama: String(b.nama || ""),
      level: String(b.level || "Member"),
      foto: String(b.foto || ""),
      wa: String(b.wa || ""),
      aktif: b.aktif !== false,
    },
  });
  return NextResponse.json({ item });
}
