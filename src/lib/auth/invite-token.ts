const SECRET = () => process.env.SESSION_SECRET || "fallback-secret";
const TOKEN_TTL_MS = 15 * 60 * 1000; // 15 minutes

async function hmacSign(payload: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createInviteToken(): Promise<string> {
  const expires = Date.now() + TOKEN_TTL_MS;
  const payload = `invite:${expires}`;
  const sig = await hmacSign(payload);
  return btoa(`${payload}:${sig}`)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function verifyInviteToken(
  token: string
): Promise<{ valid: boolean; error?: string }> {
  try {
    const decoded = atob(token.replace(/-/g, "+").replace(/_/g, "/"));
    const parts = decoded.split(":");
    if (parts.length !== 3) return { valid: false, error: "Malformed token" };

    const [prefix, expiresStr, sig] = parts;
    const payload = `${prefix}:${expiresStr}`;
    const expectedSig = await hmacSign(payload);

    if (sig !== expectedSig) return { valid: false, error: "Invalid signature" };
    if (Date.now() > parseInt(expiresStr, 10))
      return { valid: false, error: "Token expired" };

    return { valid: true };
  } catch {
    return { valid: false, error: "Invalid token" };
  }
}
