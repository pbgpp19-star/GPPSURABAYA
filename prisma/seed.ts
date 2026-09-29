import "dotenv/config";
import { prisma } from "../lib/db";
import { DEFAULT_SETTINGS, DEFAULT_SCHEDULES, DEFAULT_MATCHES, DEFAULT_GALLERY, DEFAULT_MEMBERS } from "../lib/defaults";

async function main() {
  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  for (const s of DEFAULT_SCHEDULES) {
    await prisma.schedule.upsert({
      where: { id: s.id },
      update: { hari: s.hari, jam: s.jam, tempat: s.tempat, image: s.image, urutan: s.urutan, aktif: true },
      create: { hari: s.hari, jam: s.jam, tempat: s.tempat, image: s.image, urutan: s.urutan, aktif: true },
    });
  }
  for (const m of DEFAULT_MATCHES) {
    await prisma.match.upsert({
      where: { id: m.id },
      update: { tanggal: m.tanggal, lawan: m.lawan, logoLawan: m.logoLawan, skorKami: m.skorKami, skorLawan: m.skorLawan, status: m.status },
      create: { tanggal: m.tanggal, lawan: m.lawan, logoLawan: m.logoLawan, skorKami: m.skorKami, skorLawan: m.skorLawan, status: m.status },
    });
  }
  for (const g of DEFAULT_GALLERY) {
    await prisma.galleryItem.upsert({
      where: { id: g.id },
      update: { image: g.image, caption: g.caption, urutan: g.urutan },
      create: { image: g.image, caption: g.caption, urutan: g.urutan },
    });
  }
  for (const mb of DEFAULT_MEMBERS) {
    await prisma.member.upsert({
      where: { id: mb.id },
      update: { nama: mb.nama, level: mb.level, foto: mb.foto, wa: mb.wa, aktif: true },
      create: { nama: mb.nama, level: mb.level, foto: mb.foto, wa: mb.wa, aktif: true },
    });
  }
  console.log("Seed OK");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
