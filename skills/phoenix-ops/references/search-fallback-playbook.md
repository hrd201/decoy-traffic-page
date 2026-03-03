# Search Fallback Playbook (Google-first)

## Default
1. Use browser search with Google first.
2. Collect top relevant pages and summarize.

## If captcha / anti-bot / blocked page appears
1. Stop repeated retries immediately.
2. Ask for human captcha completion if interactive browsing is required.
3. Switch to backup sources in this order:
   - Official news pages (vendor websites)
   - Reputable media pages (Reuters, company blogs)
   - Direct URL fetch for known sources
4. Return result with a short note: "Google path blocked, fallback used".

## Safety and reliability
- Never attempt captcha bypass or security circumvention.
- Prefer fewer, higher-quality sources over many noisy sources.
- Keep query cadence human-like and avoid burst fetches.
