import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";

export async function PUT(req: Request, ctx: RouteContext<"/api/schedules/[id]">) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const b = await req.json();
  const item = await prisma.schedule.update({
    where: { id: Number(id) },
    data: {
      hari: b.hari !== undefined ? String(b.hari) : undefined,
      jam: b.jam !== undefined ? String(b.jam) : undefined,
      tempat: b.tempat !== undefined ? String(b.tempat) : undefined,
      image: b.image !== undefined ? String(b.image) : undefined,
      urutan: b.urutan !== undefined ? Number(b.urutan) : undefined,
      aktif: b.aktif !== undefined ? Boolean(b.aktif) : undefined,
    },
  });
  return NextResponse.json({ item });
}

export async function DELETE(_: Request, ctx: RouteContext<"/api/schedules/[id]">) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  await prisma.schedule.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
