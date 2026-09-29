import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";

export async function PUT(req: Request, ctx: RouteContext<"/api/gallery/[id]">) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const b = await req.json();
  const item = await prisma.galleryItem.update({
    where: { id: Number(id) },
    data: {
      image: b.image !== undefined ? String(b.image) : undefined,
      caption: b.caption !== undefined ? String(b.caption) : undefined,
      urutan: b.urutan !== undefined ? Number(b.urutan) : undefined,
    },
  });
  return NextResponse.json({ item });
}

export async function DELETE(_: Request, ctx: RouteContext<"/api/gallery/[id]">) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  await prisma.galleryItem.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
