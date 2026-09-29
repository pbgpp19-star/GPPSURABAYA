import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";

export async function PUT(req: Request, ctx: RouteContext<"/api/matches/[id]">) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const b = await req.json();
  const item = await prisma.match.update({
    where: { id: Number(id) },
    data: {
      tanggal: b.tanggal !== undefined ? String(b.tanggal) : undefined,
      lawan: b.lawan !== undefined ? String(b.lawan) : undefined,
      logoLawan: b.logoLawan !== undefined ? String(b.logoLawan) : undefined,
      skorKami: b.skorKami !== undefined ? (b.skorKami === null || b.skorKami === "" ? null : Number(b.skorKami)) : undefined,
      skorLawan: b.skorLawan !== undefined ? (b.skorLawan === null || b.skorLawan === "" ? null : Number(b.skorLawan)) : undefined,
      status: b.status !== undefined ? String(b.status) : undefined,
    },
  });
  return NextResponse.json({ item });
}

export async function DELETE(_: Request, ctx: RouteContext<"/api/matches/[id]">) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  await prisma.match.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
