import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DIR = path.join(os.homedir(), ".oauth-link-auth");
const FILE = path.join(DIR, "auth.json");

export function loadState() {
  try { return JSON.parse(fs.readFileSync(FILE, "utf8")); } catch { return null; }
}

export function saveState(state) {
  if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true, mode: 0o700 });
  fs.writeFileSync(FILE, JSON.stringify(state, null, 2), { mode: 0o600 });
}

export function clearState() {
  try { fs.rmSync(FILE); } catch {}
}

export function getPath() { return FILE; }
