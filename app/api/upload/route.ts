import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { requireAdmin } from "@/lib/requireAdmin";

function msg(e: unknown) {
  return e instanceof Error ? e.message : String(e);
}

export async function POST(req: Request) {
  try {
    const admin = await requireAdmin();
    if (!admin)
      return NextResponse.json(
        { error: "Sesi habis / belum login. Logout lalu login ulang di /admin/login." },
        { status: 401 }
      );

    let form: FormData;
    try {
      form = await req.formData();
    } catch {
      return NextResponse.json({ error: "Data upload tidak terbaca." }, { status: 400 });
    }
    const file = form.get("file") as File | null;
    if (!file || file.size === 0)
      return NextResponse.json({ error: "Tidak ada file / file kosong." }, { status: 400 });
    if (file.size > 4_000_000)
      return NextResponse.json(
        { error: `File ${(file.size / 1048576).toFixed(1)}MB melebihi batas 4MB. Kecilkan dulu.` },
        { status: 413 }
      );

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().slice(0, 5);
    const fname = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    // Production (Vercel + Blob token): upload ke Vercel Blob agar permanen
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { put } = await import("@vercel/blob");
        const blob = await put(`pbgpp/${fname}`, buffer, {
          access: "public",
          contentType: file.type || undefined,
        });
        return NextResponse.json({ url: blob.url });
      } catch (e) {
        return NextResponse.json(
          {
            error: `Upload ke Blob gagal: ${msg(e)}. Cek BLOB_READ_WRITE_TOKEN di Vercel (jangan yang sensor ****).`,
          },
          { status: 502 }
        );
      }
    }

    // Lokal / fallback: simpan ke public/uploads
    try {
      const dir = path.join(process.cwd(), "public", "uploads");
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, fname), buffer);
      return NextResponse.json({ url: `/uploads/${fname}` });
    } catch (e) {
      return NextResponse.json(
        { error: `Gagal menyimpan file di server: ${msg(e)}` },
        { status: 500 }
      );
    }
  } catch (e) {
    return NextResponse.json({ error: `Server error: ${msg(e)}` }, { status: 500 });
  }
}
