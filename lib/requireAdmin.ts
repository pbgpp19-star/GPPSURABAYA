import { cookies } from "next/headers";
import { verifyAdmin } from "@/lib/auth";

export async function requireAdmin() {
  const jar = await cookies();
  const token = jar.get("gpp_admin")?.value;
  const payload = await verifyAdmin(token);
  return payload;
}
