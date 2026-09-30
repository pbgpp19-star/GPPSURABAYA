"use client";
import { useEffect, useState } from "react";
import MediaPicker from "./MediaPicker";

type AnyObj = Record<string, unknown>;

async function uploadFile(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((j as { error?: string }).error || `Upload gagal (${res.status})`);
  return (j as { url: string }).url;
}

function UploadInput({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <input
        className="flex-1 border rounded-lg px-2 py-1.5 text-xs"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/images/... atau URL hasil upload"
      />
      <label className="cursor-pointer rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white">
        {busy ? "..." : "Upload"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            setBusy(true);
            try {
              const url = await uploadFile(f);
              onChange(url);
            } catch (err) {
              alert((err as Error).message);
            } finally {
              setBusy(false);
            }
          }}
        />
      </label>
    </div>
  );
}

export default function AdminClient() {
  const [tab, setTab] = useState("pengaturan");
  const [settings, setSettings] = useState<AnyObj>({});
  const [schedules, setSchedules] = useState<AnyObj[]>([]);
  const [matches, setMatches] = useState<AnyObj[]>([]);
  const [gallery, setGallery] = useState<AnyObj[]>([]);
  const [members, setMembers] = useState<AnyObj[]>([]);
  const [dbLive, setDbLive] = useState(false);
  const [msg, setMsg] = useState("");
  const [pickerFor, setPickerFor] = useState<number | null>(null);

  async function load(retry = true) {
    const [s, j, m, g, mb] = await Promise.all([
      fetch("/api/settings").then((r) => r.json()),
      fetch("/api/schedules").then((r) => r.json()),
      fetch("/api/matches").then((r) => r.json()),
      fetch("/api/gallery").then((r) => r.json()),
      fetch("/api/members").then((r) => r.json()),
    ]);
    setSettings(s.settings || {});
    setSchedules(j.items || []);
    setMatches(m.items || []);
    setGallery(g.items || []);
    setMembers(mb.items || []);
    const live = !!s.dbLive;
    setDbLive(live);
    // Database yang baru bangun (cold start) kadang gagal di percobaan pertama:
    // coba sekali lagi diam-diam tanpa banner peringatan.
    if (!live && retry) {
      setTimeout(() => load(false), 2500);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function saveSettings() {
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const j = await res.json();
    setMsg(res.ok ? "Pengaturan tersimpan ✓" : j.error || "Gagal menyimpan");
    setTimeout(() => setMsg(""), 3000);
  }

  async function crud(
    base: string,
    method: string,
    body?: AnyObj,
    id?: number
  ) {
    const res = await fetch(id ? `${base}/${id}` : base, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert(j.error || "Gagal");
      return;
    }
    const label =
      method === "DELETE" ? "Terhapus ✓" : method === "POST" ? "Ditambahkan ✓" : "Tersimpan ✓";
    setMsg(label);
    setTimeout(() => setMsg(""), 3000);
    load();
  }

  const TABS = ["pengaturan", "jadwal", "match", "galeri", "member"];

  return (
    <div>
      <div className="mt-4 flex gap-2 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-2 text-sm font-bold capitalize ${
              tab === t ? "bg-slate-900 text-white" : "bg-slate-100"
            }`}
          >
            {t}
          </button>
        ))}
        <button
          onClick={async () => {
            await fetch("/api/admin/login", { method: "DELETE" });
            location.href = "/admin/login";
          }}
          className="ml-auto rounded-lg border px-4 py-2 text-sm font-bold"
        >
          Keluar
        </button>
      </div>
      {msg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-xl">
          {msg}
        </div>
      )}

      {tab === "pengaturan" && (
        <div className="mt-4 rounded-xl border p-5 grid gap-3">
          {[
            ["hero_kicker", "Kicker Hero"],
            ["hero_desc", "Deskripsi Hero"],
            ["about_text", "Teks Tentang"],
            ["wa_number", "Nomor WA (628...)"],
            ["wa_text", "Pesan WA otomatis"],
            ["instagram", "Instagram URL"],
            ["youtube", "YouTube URL"],
            ["alamat", "Alamat"],
            ["seo_title", "Judul SEO (tab browser & hasil Google)"],
            ["seo_description", "Deskripsi SEO (cuplikan Google & share link)"],
          ].map(([k, label]) => (
            <label key={k} className="text-sm">
              <div className="font-bold mb-1">{label}</div>
              <textarea
                className="w-full border rounded-lg px-3 py-2"
                rows={k.includes("text") || k.includes("desc") ? 3 : 1}
                value={String(settings[k] ?? "")}
                onChange={(e) => setSettings({ ...settings, [k]: e.target.value })}
              />
            </label>
          ))}
          {(["logo", "hero_image", "about_image", "cta_bg"] as const).map((k) => (
            <div key={k} className="text-sm">
              <div className="font-bold mb-1 capitalize">{k.replace("_", " ")}</div>
              <UploadInput
                value={String(settings[k] ?? "")}
                onChange={(url) => setSettings({ ...settings, [k]: url })}
              />
            </div>
          ))}
          <button onClick={saveSettings} className="btn-gradient rounded-lg py-2.5 text-sm font-bold text-white">
            Simpan Pengaturan
          </button>
        </div>
      )}

      {tab === "jadwal" && (
        <div className="mt-4 grid gap-3">
          <button
            onClick={() => crud("/api/schedules", "POST", { hari: "SELASA", jam: "20:00 - 23:00", tempat: "Lapangan Badminton (Surabaya)", image: "/images/placeholder.svg", urutan: schedules.length + 1 })}
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-bold text-white w-fit"
          >
            + Tambah Jadwal
          </button>
          {schedules.map((it: AnyObj, i: number) => (
            <div key={String(it.id)} className="rounded-xl border p-4 grid gap-2 text-sm">
              <div className="grid sm:grid-cols-3 gap-2">
                <input className="border rounded px-2 py-1" value={String(it.hari ?? "")} onChange={(e) => { const v = [...schedules]; v[i] = { ...v[i], hari: e.target.value }; setSchedules(v); }} placeholder="Hari" />
                <input className="border rounded px-2 py-1" value={String(it.jam ?? "")} onChange={(e) => { const v = [...schedules]; v[i] = { ...v[i], jam: e.target.value }; setSchedules(v); }} placeholder="Jam" />
                <input className="border rounded px-2 py-1" value={String(it.tempat ?? "")} onChange={(e) => { const v = [...schedules]; v[i] = { ...v[i], tempat: e.target.value }; setSchedules(v); }} placeholder="Tempat" />
              </div>
              <UploadInput value={String(it.image ?? "")} onChange={(url) => { const v = [...schedules]; v[i] = { ...v[i], image: url }; setSchedules(v); }} />
              <div className="flex gap-2">
                <button onClick={() => crud("/api/schedules", "PUT", it, Number(it.id))} className="rounded bg-slate-900 text-white px-3 py-1 text-xs font-bold">Simpan</button>
                <button onClick={() => crud("/api/schedules", "DELETE", undefined, Number(it.id))} className="rounded bg-red-100 text-red-700 px-3 py-1 text-xs font-bold">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "match" && (
        <div className="mt-4 grid gap-3">
          <button
            onClick={() => crud("/api/matches", "POST", { tanggal: "SABTU, ...", lawan: "PB.X", logoLawan: "/images/placeholder.svg", skorKami: null, skorLawan: null, status: "AKAN_DATANG" })}
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-bold text-white w-fit"
          >
            + Tambah Match
          </button>
          {matches.map((it: AnyObj, i: number) => (
            <div key={String(it.id)} className="rounded-xl border p-4 grid gap-2 text-sm">
              <div className="grid sm:grid-cols-2 gap-2">
                <input className="border rounded px-2 py-1" value={String(it.tanggal ?? "")} onChange={(e) => { const v = [...matches]; v[i] = { ...v[i], tanggal: e.target.value }; setMatches(v); }} placeholder="Tanggal" />
                <input className="border rounded px-2 py-1" value={String(it.lawan ?? "")} onChange={(e) => { const v = [...matches]; v[i] = { ...v[i], lawan: e.target.value }; setMatches(v); }} placeholder="Lawan" />
                <input className="border rounded px-2 py-1" value={it.skorKami === null ? "" : String(it.skorKami ?? "")} onChange={(e) => { const v = [...matches]; v[i] = { ...v[i], skorKami: e.target.value === "" ? null : Number(e.target.value) }; setMatches(v); }} placeholder="Skor kami" />
                <input className="border rounded px-2 py-1" value={it.skorLawan === null ? "" : String(it.skorLawan ?? "")} onChange={(e) => { const v = [...matches]; v[i] = { ...v[i], skorLawan: e.target.value === "" ? null : Number(e.target.value) }; setMatches(v); }} placeholder="Skor lawan" />
                <select className="border rounded px-2 py-1" value={String(it.status ?? "AKAN_DATANG")} onChange={(e) => { const v = [...matches]; v[i] = { ...v[i], status: e.target.value }; setMatches(v); }}>
                  <option>AKAN_DATANG</option><option>MENANG</option><option>KALAH</option><option>SERI</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={String(it.logoLawan || "/images/placeholder.svg")}
                  alt="logo lawan"
                  className="h-10 w-10 object-contain rounded-lg bg-slate-100 border shrink-0"
                />
                <input
                  className="flex-1 border rounded-lg px-2 py-1.5 text-xs"
                  value={String(it.logoLawan ?? "")}
                  onChange={(e) => { const v = [...matches]; v[i] = { ...v[i], logoLawan: e.target.value }; setMatches(v); }}
                  placeholder="URL logo lawan"
                />
                <button
                  onClick={() => setPickerFor(i)}
                  className="rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-bold text-white whitespace-nowrap"
                >
                  Pilih dari Library
                </button>
              </div>
              <div className="flex gap-2">
                <button onClick={() => crud("/api/matches", "PUT", it, Number(it.id))} className="rounded bg-slate-900 text-white px-3 py-1 text-xs font-bold">Simpan</button>
                <button onClick={() => crud("/api/matches", "DELETE", undefined, Number(it.id))} className="rounded bg-red-100 text-red-700 px-3 py-1 text-xs font-bold">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "galeri" && (
        <div className="mt-4 grid gap-3">
          <button
            onClick={() => crud("/api/gallery", "POST", { image: "/images/placeholder.svg", caption: "Kegiatan baru", urutan: gallery.length + 1 })}
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-bold text-white w-fit"
          >
            + Tambah Foto
          </button>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {gallery.map((it: AnyObj) => (
              <div key={String(it.id)} className="rounded-xl border p-3 text-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={String(it.image)} alt="" className="h-32 w-full object-cover rounded-lg bg-slate-100" />
                <UploadInput value={String(it.image ?? "")} onChange={async (url) => { await crud("/api/gallery", "PUT", { ...it, image: url }, Number(it.id)); }} />
                <input className="mt-2 w-full border rounded px-2 py-1" defaultValue={String(it.caption ?? "")} placeholder="Caption" id={`cap-${it.id}`} />
                <div className="mt-2 flex gap-2">
                  <button onClick={() => { const el = document.getElementById(`cap-${it.id}`) as HTMLInputElement; crud("/api/gallery", "PUT", { caption: el.value }, Number(it.id)); }} className="rounded bg-slate-900 text-white px-3 py-1 text-xs font-bold">Simpan</button>
                  <button onClick={() => crud("/api/gallery", "DELETE", undefined, Number(it.id))} className="rounded bg-red-100 text-red-700 px-3 py-1 text-xs font-bold">Hapus</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "member" && (
        <div className="mt-4 grid gap-3">
          <button
            onClick={() => crud("/api/members", "POST", { nama: "Nama Baru", level: "Beginner", foto: "/images/placeholder.svg", wa: "", aktif: true })}
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-bold text-white w-fit"
          >
            + Tambah Member
          </button>
          {members.map((it: AnyObj, i: number) => (
            <div key={String(it.id)} className="rounded-xl border p-4 grid gap-2 text-sm">
              <div className="grid sm:grid-cols-3 gap-2">
                <input className="border rounded px-2 py-1" value={String(it.nama ?? "")} onChange={(e) => { const v = [...members]; v[i] = { ...v[i], nama: e.target.value }; setMembers(v); }} placeholder="Nama" />
                <input className="border rounded px-2 py-1" value={String(it.level ?? "")} onChange={(e) => { const v = [...members]; v[i] = { ...v[i], level: e.target.value }; setMembers(v); }} placeholder="Level" />
                <input className="border rounded px-2 py-1" value={String(it.wa ?? "")} onChange={(e) => { const v = [...members]; v[i] = { ...v[i], wa: e.target.value }; setMembers(v); }} placeholder="WA" />
              </div>
              <UploadInput value={String(it.foto ?? "")} onChange={(url) => { const v = [...members]; v[i] = { ...v[i], foto: url }; setMembers(v); }} />
              <div className="flex gap-2">
                <button onClick={() => crud("/api/members", "PUT", it, Number(it.id))} className="rounded bg-slate-900 text-white px-3 py-1 text-xs font-bold">Simpan</button>
                <button onClick={() => crud("/api/members", "DELETE", undefined, Number(it.id))} className="rounded bg-red-100 text-red-700 px-3 py-1 text-xs font-bold">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <MediaPicker
        open={pickerFor !== null}
        onClose={() => setPickerFor(null)}
        onPick={(url) => {
          if (pickerFor === null) return;
          const v = [...matches];
          v[pickerFor] = { ...v[pickerFor], logoLawan: url };
          setMatches(v);
        }}
      />
    </div>
  );
}
