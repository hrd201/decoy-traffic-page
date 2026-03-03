# MEMORY.md - 长期记忆索引

> 本地记忆系统入口，详见 [MEMORY_SYSTEM.md](memory/MEMORY_SYSTEM.md)

---

## 快速索引

### 👤 人物
- [达哥](memory/entities/people/达哥.md)

### 🖥️ 服务器
- [NF Gateway](memory/entities/servers/nf-gateway.md)

### 📁 项目
- [MacBook 节点配置](memory/entities/projects/macbook-node.md)

### ⚙️ 偏好
- [用户偏好](memory/preferences/user-preferences.md)

---

## 重要信息

### 服务器信息

| 服务器 | IP | 端口 | 用户 |
|--------|-----|------|------|
| NF Gateway | 127.0.0.1 | 18789 | openclaw |
| RDP/SSH | 61.138.213.163 | 8877 | openclaw |
| 代理1 | 199.180.112.86 | 29571 | root |
| 代理2 | 67.230.172.130 | 28696 | root |

### 用户偏好

- 搜索：bing
- 模型：MiniMax M2.5
- 桌面：XFCE

---

## 检索

使用 `memory_search` 工具搜索：
```bash
memory_search(query="MacBook")
```

---

## 重要提醒

- **OpenClaw 配置路径**: /root/.openclaw/
- **工作空间**: /root/.openclaw/workspace/
- **所有操作在 root 用户下进行**
- **服务管理方式**: 使用 systemd（`openclaw-root`）
  - 启动: `systemctl start openclaw-root`
  - 停止: `systemctl stop openclaw-root`
  - 重启: `systemctl restart openclaw-root`
  - 状态: `systemctl status openclaw-root`
- **敏感信息处理**: 禁止明文写入文件，使用环境变量代替
  - 如 API Key、密码等敏感信息存环境变量
  - 文件中用 `$变量名` 占位符
  - 环境变量添加到 ~/.bashrc

---

## 定时任务

### 每日记忆同步

- **时间**: 每天 23:30
- **任务ID**: 8db3e346-1375-4118-8582-7c8ecaf68d70
- **功能**: 自动分析当日工作日志，提取关键信息，更新长期记忆
- **脚本**: /root/.openclaw/workspace/scripts/sync-memory.sh

---

*更新时间：2026-02-27*
