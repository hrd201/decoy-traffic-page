# 项目：MacBook 节点配置

## 概述

将 MacBook Pro 部署为 OpenClaw 备用节点，实现浏览器和GUI功能。

## 架构

```
nf 服务器 (Gateway) ←── SSH 隧道 ──→ MacBook Pro (Node)
                                    - browser: 浏览器控制
                                    - system: 命令执行
```

## 连接方式

- SSH隧道：`ssh -N -L 18789:127.0.0.1:18789 openclaw@61.138.213.163 -p 8877`
- 节点启动：`openclaw node run --host 127.0.0.1 --port 18789 --display-name "macbook-pro"`

## 状态

- ✅ 已配对
- ✅ 可连接（需要开机）
- ⚠️ SSH 隧道需要保持

## 问题记录

- 2026-02-24：审批问题 - 设置 security=full 解决
- 2026-02-24：MacBook 节点 /bin/sh 找不到 - Mac 使用 zsh

---

*最后更新：2026-02-24*
