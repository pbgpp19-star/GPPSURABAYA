import { NextResponse } from "next/server";
import { prisma, dbReady } from "@/lib/db";
import { DEFAULT_SETTINGS } from "@/lib/defaults";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const live = await dbReady().catch(() => false);
  if (!live) return NextResponse.json({ settings: DEFAULT_SETTINGS, dbLive: false });
  const rows = await prisma.siteSetting.findMany();
  const settings = { ...DEFAULT_SETTINGS };
  for (const r of rows) settings[r.key] = r.value;
  return NextResponse.json({ settings, dbLive: true });
}

export async function PUT(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const live = await dbReady().catch(() => false);
  if (!live)
    return NextResponse.json(
      { error: "DATABASE_URL belum dikonfigurasi. Isi Neon Postgres dulu." },
      { status: 400 }
    );
  const entries = Object.entries(body as Record<string, string>);
  for (const [key, value] of entries) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value: String(value ?? "") },
      create: { key, value: String(value ?? "") },
    });
  }
  return NextResponse.json({ ok: true });
}
