import crypto from "node:crypto";
import { loadState, saveState } from "./token-store.js";

function b64url(input) {
  return Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function sha256(str) {
  return crypto.createHash("sha256").update(str).digest();
}

export function createAuthUrl(cfg) {
  const state = crypto.randomBytes(16).toString("hex");
  const verifier = b64url(crypto.randomBytes(32));
  const challenge = b64url(sha256(verifier));

  const u = new URL(cfg.authUrl);
  u.searchParams.set("response_type", "code");
  u.searchParams.set("client_id", cfg.clientId);
  u.searchParams.set("redirect_uri", cfg.redirectUri);
  u.searchParams.set("scope", cfg.scope || "");
  u.searchParams.set("state", state);
  u.searchParams.set("code_challenge", challenge);
  u.searchParams.set("code_challenge_method", "S256");

  const prev = loadState() || {};
  saveState({ ...prev, oauth: { state, verifier, createdAt: Date.now() } });
  return u.toString();
}

export async function completeAuth(cfg, callbackUrl) {
  const saved = loadState();
  if (!saved?.oauth?.state || !saved?.oauth?.verifier) throw new Error("No pending login. Run login first.");

  const cb = new URL(callbackUrl);
  const code = cb.searchParams.get("code");
  const state = cb.searchParams.get("state");
  if (!code) throw new Error("Callback URL missing code");
  if (state !== saved.oauth.state) throw new Error("State mismatch");

  const form = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: cfg.clientId,
    redirect_uri: cfg.redirectUri,
    code_verifier: saved.oauth.verifier
  });

  const res = await fetch(cfg.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString()
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) {
    throw new Error(`Token exchange failed: ${res.status} ${JSON.stringify(data)}`);
  }

  const expiresAt = Date.now() + ((data.expires_in || 3600) * 1000);
  saveState({
    oauth: null,
    token: {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      token_type: data.token_type,
      scope: data.scope,
      expires_at: expiresAt
    }
  });

  return { expiresAt };
}
