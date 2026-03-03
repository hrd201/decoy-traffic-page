# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

### GitHub 推送权限问题
- 遇到权限问题自动切换到 root: `sudo -u root bash -c "命令"`

### RDP 服务器

- **服务器**：61.138.213.163
- **SSH 端口**：8877
- **用户名**：openclaw
- **SSH 密码**：环境变量 `$RDP_PASSWORD`
- **RDP 本地端口**：13389（通过 SSH 隧道）
- **DISPLAY 编号**：:20

### Notion

- **API Key**: 环境变量 `$NOTION_API_KEY`
- **主页面**: open-claw
- **URL**: https://www.notion.so/open-claw-30c3d91f2f008014bbcedf406ce05eec
- **父页面 ID**: 30c3d91f2f008014bbcedf406ce05eec
- **运维笔记数据库**: 30f3d91f2f0081e79b9af318c93807d1
- **说明**: 新建页面默认创建在此页面下作为子页面
