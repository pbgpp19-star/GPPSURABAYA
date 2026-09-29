import { NextResponse } from "next/server";
import { readdir, stat, unlink } from "fs/promises";
import path from "path";
import { requireAdmin } from "@/lib/requireAdmin";

const DIR = path.join(process.cwd(), "public", "uploads");

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const items: { url: string; name: string; size: number; at: number }[] = [];

  // File lokal (public/uploads)
  try {
    const files = await readdir(DIR);
    for (const f of files) {
      if (f.startsWith(".")) continue;
      const st = await stat(path.join(DIR, f));
      if (!st.isFile()) continue;
      items.push({ url: `/uploads/${f}`, name: f, size: st.size, at: st.mtimeMs });
    }
  } catch {
    // folder belum ada = library kosong
  }

  // Vercel Blob (production)
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { list } = await import("@vercel/blob");
      const res = await list({ prefix: "pbgpp/" });
      for (const b of res.blobs) {
        items.push({
          url: b.url,
          name: b.pathname.split("/").pop() || b.url,
          size: b.size,
          at: new Date(b.uploadedAt).getTime(),
        });
      }
    } catch {
      // abaikan, tampilkan yang lokal saja
    }
  }

  items.sort((a, b) => b.at - a.at);
  return NextResponse.json({ items });
}

export async function DELETE(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url).searchParams.get("url") || "";

  // File lokal — basename mencegah path traversal
  if (url.startsWith("/uploads/")) {
    const fname = path.basename(url);
    try {
      await unlink(path.join(DIR, fname));
    } catch {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  }

  // Vercel Blob
  if (url.startsWith("http") && process.env.BLOB_READ_WRITE_TOKEN) {
    const { del } = await import("@vercel/blob");
    await del(url);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "URL tidak dikenal" }, { status: 400 });
}
