#!/usr/bin/env bash
set -euo pipefail

STATE_DIR="/home/openclaw/.openclaw/workspace/.state"
OUT_DIR="/home/openclaw/.openclaw/workspace/forensics/fetch-failed"
mkdir -p "$STATE_DIR" "$OUT_DIR"

CURSOR_FILE="$STATE_DIR/fetch-failed-journal.cursor"
LAST_ALERT_FILE="$STATE_DIR/fetch-failed-last-alert.ts"

# Pull fresh logs only
if [[ -f "$CURSOR_FILE" ]]; then
  NEW_LOGS=$(sudo journalctl -u openclaw-gateway.service --no-pager --after-cursor "$(cat "$CURSOR_FILE")" -o short-iso || true)
else
  NEW_LOGS=$(sudo journalctl -u openclaw-gateway.service --since '10 minutes ago' --no-pager -o short-iso || true)
fi

# Update cursor from latest journal line when possible
LATEST_CURSOR=$(sudo journalctl -u openclaw-gateway.service -n 1 --show-cursor --no-pager 2>/dev/null | sed -n 's/^-- cursor: //p' | tail -n1)
[[ -n "${LATEST_CURSOR:-}" ]] && echo "$LATEST_CURSOR" > "$CURSOR_FILE"

PATTERN='TypeError: fetch failed|sendMessage failed|sendChatAction failed|Network request for|Suppressed AbortError'
if ! grep -Eiq "$PATTERN" <<<"$NEW_LOGS"; then
  echo "NO_HIT"
  exit 0
fi

# De-dup frequent alerts (60s)
NOW=$(date +%s)
LAST=0
[[ -f "$LAST_ALERT_FILE" ]] && LAST=$(cat "$LAST_ALERT_FILE" 2>/dev/null || echo 0)
if (( NOW - LAST < 60 )); then
  echo "DEDUP_SUPPRESSED"
  exit 0
fi

echo "$NOW" > "$LAST_ALERT_FILE"
TS=$(date +%F-%H%M%S)
PKG="$OUT_DIR/$TS"
mkdir -p "$PKG"

# Save matched lines + context window
sudo journalctl -u openclaw-gateway.service --since '5 minutes ago' --no-pager -o short-iso > "$PKG/journal-5m.log" || true
grep -Ein "$PATTERN" "$PKG/journal-5m.log" > "$PKG/matches.log" || true

# Quick environment snapshot
{
  echo "timestamp=$TS"
  echo "service=$(sudo systemctl is-active openclaw-gateway.service || true)"
  echo "health_start"
  openclaw gateway health || true
  echo "health_end"
} > "$PKG/status.txt"

{
  echo "=== DNS ==="
  getent hosts api.telegram.org || true
  getent hosts api.openai.com || true
  echo "=== ROUTE ==="
  ip route || true
  echo "=== TCP ==="
  ss -s || true
} > "$PKG/network.txt"

COUNT=$(grep -Eic "$PATTERN" "$PKG/journal-5m.log" || true)
FIRST=$(head -n1 "$PKG/matches.log" 2>/dev/null | cut -d: -f1-2 || true)
LASTM=$(tail -n1 "$PKG/matches.log" 2>/dev/null | cut -d: -f1-2 || true)

echo "HIT count=$COUNT package=$PKG first=$FIRST last=$LASTM"
