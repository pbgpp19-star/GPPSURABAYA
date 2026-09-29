import { prisma, dbReady } from "./db";
import { DEFAULT_SETTINGS, DEFAULT_SCHEDULES, DEFAULT_MATCHES, DEFAULT_GALLERY, DEFAULT_MEMBERS } from "./defaults";

export type SiteData = {
  settings: Record<string, string>;
  schedules: typeof DEFAULT_SCHEDULES;
  matches: typeof DEFAULT_MATCHES;
  gallery: typeof DEFAULT_GALLERY;
  members: typeof DEFAULT_MEMBERS;
  dbLive: boolean;
};

export async function getSiteData(): Promise<SiteData> {
  const live = await dbReady().catch(() => false);
  if (!live) {
    return {
      settings: DEFAULT_SETTINGS,
      schedules: DEFAULT_SCHEDULES,
      matches: DEFAULT_MATCHES as SiteData["matches"],
      gallery: DEFAULT_GALLERY,
      members: DEFAULT_MEMBERS,
      dbLive: false,
    };
  }
  try {
    const [rows, schedules, matches, gallery, members] = await Promise.all([
      prisma.siteSetting.findMany(),
      prisma.schedule.findMany({ where: { aktif: true }, orderBy: { urutan: "asc" } }),
      prisma.match.findMany({ orderBy: { id: "desc" }, take: 12 }),
      prisma.galleryItem.findMany({ orderBy: { urutan: "asc" } }),
      prisma.member.findMany({ where: { aktif: true }, orderBy: { id: "asc" } }),
    ]);
    const settings: Record<string, string> = { ...DEFAULT_SETTINGS };
    for (const r of rows) settings[r.key] = r.value;
    return {
      settings,
      schedules: schedules.length ? schedules.map((s) => ({ ...s })) : DEFAULT_SCHEDULES,
      matches: (matches.length ? matches : DEFAULT_MATCHES) as SiteData["matches"],
      gallery: gallery.length ? gallery.map((g) => ({ ...g })) : DEFAULT_GALLERY,
      members: members.length ? members.map((m) => ({ ...m })) : DEFAULT_MEMBERS,
      dbLive: true,
    };
  } catch {
    return {
      settings: DEFAULT_SETTINGS,
      schedules: DEFAULT_SCHEDULES,
      matches: DEFAULT_MATCHES as SiteData["matches"],
      gallery: DEFAULT_GALLERY,
      members: DEFAULT_MEMBERS,
      dbLive: false,
    };
  }
}
