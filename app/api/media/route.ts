import { NextResponse } from "next/server";
import { readdir, stat, unlink } from "fs/promises";
import path from "path";
import { requireAdmin } from "@/lib/requireAdmin";

const DIR = path.join(process.cwd(), "public", "uploads");

function cloudinaryReady() {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

function publicIdFromUrl(url: string): string | null {
  // https://res.cloudinary.com/<cloud>/image/upload/v123/pbgpp/nama.ext -> pbgpp/nama
  const m = url.match(/\/upload\/(?:v\d+\/)?(.+)$/);
  if (!m) return null;
  return m[1].replace(/\.[a-zA-Z0-9]+$/, "");
}

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
    // folder belum ada = lewati
  }

  // Cloudinary (folder pbgpp)
  if (cloudinaryReady()) {
    try {
      const { v2: cloudinary } = await import("cloudinary");
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      const res = await cloudinary.api.resources({
        type: "upload",
        prefix: "pbgpp/",
        max_results: 100,
      });
      for (const r of res.resources as { secure_url: string; public_id: string; bytes: number; created_at: string }[]) {
        items.push({
          url: r.secure_url,
          name: r.public_id.split("/").pop() || r.public_id,
          size: r.bytes || 0,
          at: new Date(r.created_at).getTime() || 0,
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

  // Cloudinary
  if (url.includes("res.cloudinary.com") && cloudinaryReady()) {
    const pid = publicIdFromUrl(url);
    if (!pid) return NextResponse.json({ error: "URL tidak dikenal" }, { status: 400 });
    try {
      const { v2: cloudinary } = await import("cloudinary");
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      await cloudinary.uploader.destroy(pid);
      return NextResponse.json({ ok: true });
    } catch {
      return NextResponse.json({ error: "Gagal menghapus di Cloudinary" }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "URL tidak dikenal" }, { status: 400 });
}
