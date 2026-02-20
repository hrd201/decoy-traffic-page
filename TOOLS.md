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
- **SSH 密码**：hrd!188789
- **RDP 本地端口**：13389（通过 SSH 隧道）
- **DISPLAY 编号**：:20
