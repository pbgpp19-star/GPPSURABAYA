"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: u, password: p }),
    });
    setLoading(false);
    if (!res.ok) {
      setErr("Username / password salah");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-white p-8 card-shadow">
        <h1 className="font-display text-2xl font-black">ADMIN PB.GPP</h1>
        <p className="text-sm text-slate-500">Login untuk kelola konten & gambar.</p>
        <input
          className="mt-5 w-full border rounded-lg px-3 py-2 text-sm"
          placeholder="Username"
          value={u}
          onChange={(e) => setU(e.target.value)}
        />
        <input
          className="mt-3 w-full border rounded-lg px-3 py-2 text-sm"
          placeholder="Password"
          type="password"
          value={p}
          onChange={(e) => setP(e.target.value)}
        />
        {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
        <button
          disabled={loading}
          className="btn-gradient mt-4 w-full rounded-lg py-2.5 text-sm font-bold text-white"
        >
          {loading ? "Memeriksa..." : "MASUK"}
        </button>
        <p className="mt-3 text-xs text-slate-400">
          Default: admin / gpp-admin-2026 (ganti via env ADMIN_USER & ADMIN_PASS)
        </p>
      </form>
    </main>
  );
}
