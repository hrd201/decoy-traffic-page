# Incident Checklist

## A. Health
- `sudo systemctl is-active openclaw-gateway.service`
- `openclaw gateway health`

## B. Logs
- `sudo journalctl -u openclaw-gateway.service --since '10 minutes ago' --no-pager`
- Filter: `fetch failed|undici|sendMessage|Port 18789|lock timeout`

## C. Conflict
- `ss -ltnp | grep 18789`
- `pgrep -af 'openclaw|openclaw-gateway'`

## D. Recovery
- Controlled restart: `sudo systemctl restart openclaw-gateway.service`
- Re-check health after 5-10s

## E. Report
- Time range
- Error count
- Current state
- Next action