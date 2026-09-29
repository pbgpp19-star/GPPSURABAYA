"use client";
import { useEffect, useState } from "react";

type MediaItem = { url: string; name: string; size: number; at: number };

export default function MediaPicker({
  open,
  onClose,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  onPick: (url: string) => void;
}) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/media");
      const j = await res.json();
      setItems(j.items || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open) load();
  }, [open ]);

  async function upload(f: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", f);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || `Upload gagal (${res.status})`);
      await load();
      onPick(j.url as string);
      onClose();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setUploading(false);
    }
  }

  async function remove(url: string) {
    if (!confirm("Hapus file ini dari library? (Match yang sudah memakainya tetap menyimpan URL-nya)")) return;
    const res = await fetch(`/api/media?url=${encodeURIComponent(url)}`, { method: "DELETE" });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert(j.error || "Gagal menghapus");
      return;
    }
    load();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-2xl max-h-[80vh] overflow-auto rounded-2xl bg-white p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-black">Library Logo & Gambar</h3>
          <button onClick={onClose} className="rounded-lg border px-3 py-1 text-sm font-bold">
            Tutup ✕
          </button>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Klik gambar untuk memakai. Upload sekali, pakai berkali-kali.
        </p>

        <label className="mt-3 block cursor-pointer rounded-xl border-2 border-dashed border-slate-300 p-4 text-center text-sm font-bold text-slate-600 hover:border-teal-500 hover:text-teal-700">
          {uploading ? "Mengupload..." : "+ Upload logo/gambar baru"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
              e.target.value = "";
            }}
          />
        </label>

        {loading ? (
          <p className="mt-4 text-sm text-slate-500">Memuat library...</p>
        ) : items.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">
            Library masih kosong. Upload logo lawan pertama di atas.
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
            {items.map((it) => (
              <div key={it.url} className="group relative rounded-xl border p-2 hover:border-teal-500">
                <button
                  className="block w-full"
                  onClick={() => {
                    onPick(it.url);
                    onClose();
                  }}
                  title={it.name}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={it.url}
                    alt={it.name}
                    className="h-20 w-full object-contain rounded-lg bg-slate-100"
                  />
                  <div className="mt-1 truncate text-[11px] text-slate-500">{it.name}</div>
                </button>
                <button
                  onClick={() => remove(it.url)}
                  className="absolute top-1 right-1 hidden group-hover:block rounded-md bg-red-600 px-1.5 py-0.5 text-[11px] font-bold text-white"
                  title="Hapus dari library"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
