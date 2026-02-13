---
name: gateway-stability-guard
description: Diagnose and stabilize OpenClaw gateway/channel reliability issues. Use when users report fetch failed, Telegram send failures, gateway restart loops, port conflicts, delayed replies, or WebUI/TUI inconsistency.
---

# Gateway Stability Guard

## Goal
Restore stable messaging and gateway uptime quickly, then provide a brief root-cause + action summary.

## Fast Triage
Run in this order:
1. Service state (`systemctl is-active`, `openclaw gateway health`)
2. Recent logs (last 5-15 minutes) for `fetch failed`, `undici`, Telegram send failures, port conflicts
3. Process/port ownership check for duplicate gateway instances

## Repair Playbook
- If gateway restart loop or port conflict appears: stop duplicate process path and keep only systemd-managed instance.
- If transient network error only: avoid unnecessary restart; monitor next window.
- If recurring bursts: perform controlled restart and verify health post-restart.
- For WebUI instability behind reverse proxy: tune proxy timeouts and websocket headers.

## Response Contract
Always return:
1. Result (fixed / monitoring / not fixed)
2. Cause (best current hypothesis)
3. Next action (explicit command or watch window)

Never return bare "fetch failed".

## References
- Incident checklist: `references/incident-checklist.md`
- Nginx tuning notes: `references/webui-proxy-notes.md`
