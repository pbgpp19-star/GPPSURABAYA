import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.ADMIN_SECRET ?? "dev-secret-min-32-karakter-gpp-surabaya-123"
);

export async function signAdmin(username: string) {
  return await new SignJWT({ username, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function verifyAdmin(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch {
    return null;
  }
}

export function checkCredentials(user: string, pass: string) {
  return (
    user === (process.env.ADMIN_USER ?? "admin") &&
    pass === (process.env.ADMIN_PASS ?? "gpp-admin-2026")
  );
}
