import type { MetadataRoute } from "next";

const BASE = "https://pb-gppsurabaya.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/tentang", "/jadwal", "/match", "/galeri", "/member", "/kontak"];
  const now = new Date();
  return pages.map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.8,
  }));
}
