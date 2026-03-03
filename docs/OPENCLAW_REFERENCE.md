# OpenClaw 文档检索

> 本文档用于快速检索 OpenClaw 配置和运用问题
> 官方文档：https://docs.openclaw.ai/
> 本地文档：/usr/lib/node_modules/openclaw/docs/

---

## 目录结构

| 目录 | 说明 |
|------|------|
| `gateway/` | Gateway 配置、认证、网络 |
| `tools/` | 工具使用（browser、exec、nodes 等） |
| `channels/` | 频道配置（Telegram、Discord 等） |
| `nodes/` | 移动节点（iOS、Android） |
| `start/` | 入门指南 |
| `help/` | 故障排查 |
| `reference/` | 参考文档 |

---

## 核心命令

### Gateway 管理
```bash
# 启动 Gateway
openclaw gateway --port 18789
openclaw gateway run
systemctl start openclaw-root

# 配置
openclaw config get <key>
openclaw config set <key> <value>
openclaw config list
```

### 浏览器控制命令

```bash
# 基础操作
openclaw browser --browser-profile openclaw status      # 状态
openclaw browser --browser-profile openclaw start       # 启动
openclaw browser --browser-profile openclaw stop        # 停止
openclaw browser --browser-profile openclaw open <URL>  # 打开网页
openclaw browser --browser-profile openclaw snapshot    # 页面结构
openclaw browser --browser-profile openclaw screenshot  # 截屏

# 鼠标操作
openclaw browser --browser-profile openclaw click <ref>        # 点击
openclaw browser --browser-profile openclaw click <ref> --double  # 双击
openclaw browser --browser-profile openclaw type <ref> "文本"  # 输入
openclaw browser --browser-profile openclaw hover <ref>       # 悬停
openclaw browser --browser-profile openclaw drag <ref>        # 拖拽
openclaw browser --browser-profile openclaw select <ref> A B  # 选择
openclaw browser --browser-profile openclaw press Enter       # 按键
```

### 节点管理
```bash
openclaw nodes list
openclaw nodes status
openclaw nodes invoke --node <name> --command <cmd> --params '{}'
```

### 定时任务
```bash
openclaw cron list
openclaw cron add --name <name> --cron "<cron>" --message "<msg>"
```

---

## 常用配置

### 浏览器配置 (browser)
```json
{
  "browser": {
    "enabled": true,
    "defaultProfile": "chrome",
    "headless": true,
    "profiles": {
      "openclaw": { "cdpPort": 18800, "color": "#FF4500" },
      "chrome": { "cdpUrl": "http://127.0.0.1:18792" },
      "macbook": { "cdpUrl": "http://127.0.0.1:19000" }
    }
  }
}
```

### 模型配置
```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "openai/gpt-5.2-codex",
        "fallback": ["minimax-cn/MiniMax-M2.5"]
      },
      "thinking": "high"
    }
  }
}
```

### 心跳配置
```json
{
  "agents": {
    "defaults": {
      "heartbeat": {
        "every": "0m"  // 禁用
      }
    }
  }
}
```

---

## 关键端口

| 端口 | 用途 |
|------|------|
| 18789 | Gateway 主端口 |
| 18790 | Gateway WebSocket |
| 18791 | 本地浏览器控制 |
| 18792 | Chrome 扩展 relay |
| 18800 | openclaw 浏览器 profile |
| 19000 | 节点浏览器映射 |

---

## 工具使用

### browser 工具
```python
# 打开网页
browser(action="navigate", profile="openclaw", targetUrl="https://...")

# 截图
browser(action="screenshot", profile="openclaw")

# 点击
browser(action="act", profile="openclaw", request={"kind": "click", "ref": "e123"})

# 输入
browser(action="act", profile="openclaw", request={"kind": "type", "ref": "e123", "text": "hello"})
```

### exec 工具
```python
exec(command="ls -la", timeout=30)
```

---

## 故障排查

### Gateway 不响应
```bash
systemctl status openclaw-root
systemctl restart openclaw-root
openclaw doctor
```

### 浏览器问题
```bash
# 检查 profile
openclaw browser --browser-profile openclaw status

# 重启浏览器
openclaw browser --browser-profile openclaw stop
openclaw browser --browser-profile openclaw start
```

### 节点连接问题
```bash
openclaw nodes status
openclaw nodes describe <node>
```

---

## 文档速查

| 问题 | 文档位置 |
|------|----------|
| Gateway 配置 | `gateway/configuration.md` |
| 浏览器控制 | `tools/browser.md` |
| Chrome 扩展 | `tools/chrome-extension.md` |
| 节点配置 | `nodes/index.md` |
| 安全配置 | `gateway/security/index.md` |
| 心跳配置 | `gateway/heartbeat.md` |
| 定时任务 | `reference/wizard.md` |

---

*最后更新：2026-02-27*
