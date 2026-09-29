import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { requireAdmin } from "@/lib/requireAdmin";

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "Tidak ada file" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().slice(0, 5);
  const fname = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  // Production (Vercel + Blob token): upload ke Vercel Blob agar permanen
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`pbgpp/${fname}`, buffer, {
      access: "public",
      contentType: file.type || undefined,
    });
    return NextResponse.json({ url: blob.url });
  }

  // Lokal / fallback: simpan ke public/uploads
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, fname), buffer);
  return NextResponse.json({ url: `/uploads/${fname}` });
}
