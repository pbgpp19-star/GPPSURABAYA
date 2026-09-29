import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/requireAdmin";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-black">Dashboard Admin PB.GPP</h1>
            <p className="text-sm text-slate-500">Kelola teks, jadwal, match, galeri, member & upload gambar.</p>
          </div>
          <a href="/" className="rounded-lg border px-4 py-2 text-sm font-bold bg-white">Lihat Website →</a>
        </div>
        <AdminClient />
      </div>
    </main>
  );
}
