#!/usr/bin/env node
import { loadState, clearState, getPath } from "./token-store.js";
import { createAuthUrl, completeAuth } from "./oauth-link.js";

const cfg = {
  authUrl: process.env.OAUTH_AUTH_URL || "",
  tokenUrl: process.env.OAUTH_TOKEN_URL || "",
  clientId: process.env.OAUTH_CLIENT_ID || "",
  redirectUri: process.env.OAUTH_REDIRECT_URI || "",
  scope: process.env.OAUTH_SCOPE || "openid profile offline_access"
};

function requireCfg() {
  const miss = Object.entries(cfg).filter(([k, v]) => ["authUrl","tokenUrl","clientId","redirectUri"].includes(k) && !v).map(([k]) => k);
  if (miss.length) {
    console.error("Missing env:", miss.join(", "));
    process.exit(1);
  }
}

const [,, cmd, ...args] = process.argv;

(async () => {
  try {
    if (cmd === "login") {
      requireCfg();
      const url = createAuthUrl(cfg);
      console.log("授权链接:\n" + url);
      console.log("\n授权后，把浏览器回调地址完整复制给:\n  oauth-link-auth complete \"<callback_url>\"");
      return;
    }

    if (cmd === "complete") {
      requireCfg();
      const callback = args[0];
      if (!callback) throw new Error("Need callback_url");
      const out = await completeAuth(cfg, callback);
      console.log("授权成功，token 已保存。expires_at:", new Date(out.expiresAt).toISOString());
      return;
    }

    if (cmd === "status") {
      const st = loadState();
      const exp = st?.token?.expires_at;
      console.log(JSON.stringify({
        loggedIn: Boolean(st?.token?.access_token),
        expiresAt: exp ? new Date(exp).toISOString() : null,
        storePath: getPath()
      }, null, 2));
      return;
    }

    if (cmd === "logout") {
      clearState();
      console.log("已清除本地授权状态");
      return;
    }

    console.log("Usage: oauth-link-auth <login|complete|status|logout>");
    process.exit(1);
  } catch (e) {
    console.error(String(e?.message || e));
    process.exit(1);
  }
})();
