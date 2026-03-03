---
name: homepage-daily-ops
description: Build and operate a homepage with daily content updates. Use when the user asks to design homepage structure, generate daily posts, maintain content calendar, publish update summaries, or set up OpenClaw cron-based daily website operations.
---

# Homepage Daily Ops

## Overview
Create and maintain a homepage that updates daily with consistent structure, clear sections, and publication-ready copy.

## Workflow
1. Confirm homepage goal: profile site, product site, or info/news style.
2. Build/update homepage information architecture using `references/homepage-structure.md`.
3. Draft daily content using `references/daily-update-template.md`.
4. Save daily content draft under `content/daily/YYYY-MM-DD.md` in workspace.
5. Prepare a concise publish note for user confirmation.

## Output Rules
- Keep copy concise and scannable.
- Use Chinese unless user asks otherwise.
- Include: title, highlights, main body, CTA.
- Include a 1-paragraph "today changed" summary.

## Cron Usage Pattern
When user asks for automation:
- Create isolated cron jobs that generate a daily draft and deliver a short summary to Telegram.
- Do not publish externally without explicit user confirmation.
- If generation fails, send failure cause + next action.

## References
- Homepage structure guide: `references/homepage-structure.md`
- Daily draft template: `references/daily-update-template.md`
