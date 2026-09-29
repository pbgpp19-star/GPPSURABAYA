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
    const file = form.get("file");
    if (!(file instanceof File) || file.size === 0)
      return NextResponse.json({ error: "Tidak ada file / file kosong." }, { status: 400 });
    if (!file.type.startsWith("image/"))
      return NextResponse.json({ error: "File harus gambar." }, { status: 400 });
    if (file.size > 8_000_000)
      return NextResponse.json(
        { error: `File ${(file.size / 1048576).toFixed(1)}MB melebihi batas 8MB. Kecilkan dulu.` },
        { status: 413 }
      );

    // Cloudinary (seperti project Urrahman) — permanen di local & Vercel
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (cloudName && apiKey && apiSecret) {
      try {
        const { v2: cloudinary } = await import("cloudinary");
        cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
        const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");
        const dataUri = `data:${file.type};base64,${base64}`;
        const result = await cloudinary.uploader.upload(dataUri, { folder: "pbgpp" });
        return NextResponse.json({ url: result.secure_url as string });
      } catch (e) {
        return NextResponse.json(
          { error: `Upload Cloudinary gagal: ${msg(e)}` },
          { status: 502 }
        );
      }
    }

    // Fallback lokal bila Cloudinary belum dikonfigurasi
    try {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase().slice(0, 5);
      const fname = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const dir = path.join(process.cwd(), "public", "uploads");
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, fname), Buffer.from(await file.arrayBuffer()));
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
