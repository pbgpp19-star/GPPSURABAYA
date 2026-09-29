import { PrismaClient } from "../app/generated/prisma/client";

// Bersihkan parameter yang tidak didukung engine Prisma di serverless
// (mis. channel_binding=require dari Neon) agar koneksi tidak gagal diam-diam.
function cleanDatabaseUrl(u: string | undefined): string | undefined {
  if (!u) return u;
  return u
    .replace(/&channel_binding=[^&]*/g, "")
    .replace(/\?channel_binding=[^&]*&?/g, "?")
    .replace(/[?&]$/, "");
}

if (process.env.DATABASE_URL) {
  process.env.DATABASE_URL = cleanDatabaseUrl(process.env.DATABASE_URL);
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // DATABASE_URL dibaca otomatis oleh Prisma dari env
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function dbReady(): Promise<boolean> {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("johndoe")) return false;
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
