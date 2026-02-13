#!/usr/bin/env bash
set -euo pipefail

WS="/home/openclaw/.openclaw/workspace"
HUB="$WS/skills-hub"
SRC="$WS/skills"

mkdir -p "$HUB/skills"

# Sync selected skills (safe overwrite)
for s in homepage-daily-ops gateway-stability-guard infringement-monitor-compliance phoenix-ops; do
  rm -rf "$HUB/skills/$s"
  cp -a "$SRC/$s" "$HUB/skills/"
done

cd "$HUB"

git add skills README.md 2>/dev/null || true

if git diff --cached --quiet; then
  echo "NO_CHANGES"
  exit 0
fi

git commit -m "chore(skills): sync workspace skills $(date +%F-%H%M)"
git push origin main

echo "SYNC_OK"