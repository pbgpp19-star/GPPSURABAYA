# PB.GPP Surabaya — Landing + Admin
Next.js 16 (App Router) + Tailwind v4 + Prisma 6 + Postgres (Neon) + Vercel Blob.

## 1. Jalankan lokal
```bash
npm install
npm run dev
# buka http://localhost:3000
# admin: http://localhost:3000/admin  (user: admin / pass: gpp-admin-2026)
```
Tanpa DATABASE_URL, website tampil dengan data placeholder persis layout gambar.

## 2. Buat database Neon (gratis)
1. https://neon.tech → New Project → region Singapore.
2. Copy connection string (pooled): `postgresql://...@ep-xxx.neon.tech/neondb?sslmode=require`
3. Isi `.env`: `DATABASE_URL="..."` lalu:
```bash
npx prisma migrate dev --name init
npm run db:seed
```

## 3. Deploy ke Vercel
1. Push repo ke GitHub, Import di vercel.com.
2. Tambah Environment Variables:
   - `DATABASE_URL` (Neon pooled)
   - `ADMIN_USER`, `ADMIN_PASS`, `ADMIN_SECRET` (acak 32+ char)
   - `BLOB_READ_WRITE_TOKEN` (Vercel Dashboard → Storage → Blob → Create → Connect)
   - `NEXT_PUBLIC_WA_NUMBER` (opsional)
3. Deploy. Setelah itu jalankan sekali (local):
```bash
DATABASE_URL="..." npx prisma migrate deploy
DATABASE_URL="..." npm run db:seed
```

## 4. Ganti gambar placeholder dengan foto asli
- Via Admin → tab Galeri/Jadwal/Match/Member/Pengaturan → Upload.
- Atau taruh file di `public/images/` dengan nama sama.
- Di production wajib ada `BLOB_READ_WRITE_TOKEN` agar upload permanen (filesystem Vercel ephemeral).

## Struktur
- `app/page.tsx` — landing persis gambar (Hero, Highlights, Tentang, Jadwal, Match, Galeri, CTA, Footer)
- `app/{tentang,jadwal,match,galeri,member,kontak}` — sub-halaman
- `app/admin` — login + dashboard (teks, jadwal, match, galeri, member, upload)
- `app/api/*` — CRUD + upload
- `prisma/schema.prisma` — model Postgres
