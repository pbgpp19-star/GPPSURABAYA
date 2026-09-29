import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";

export async function PUT(req: Request, ctx: RouteContext<"/api/members/[id]">) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const b = await req.json();
  const item = await prisma.member.update({
    where: { id: Number(id) },
    data: {
      nama: b.nama !== undefined ? String(b.nama) : undefined,
      level: b.level !== undefined ? String(b.level) : undefined,
      foto: b.foto !== undefined ? String(b.foto) : undefined,
      wa: b.wa !== undefined ? String(b.wa) : undefined,
      aktif: b.aktif !== undefined ? Boolean(b.aktif) : undefined,
    },
  });
  return NextResponse.json({ item });
}

export async function DELETE(_: Request, ctx: RouteContext<"/api/members/[id]">) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  await prisma.member.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
